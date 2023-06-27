// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "../../models/bet_model.sol";
import "./i_horse_race.sol";
import "hardhat/console.sol";
import "./i_user_data.sol";
import "../../constants/constant.sol";
import "../../constants/error_message.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract IBetting is IHorseRace, IUserStorage {
    // {
    //   "raceId": [
    //      Bet
    //   ]
    // }
    mapping(uint256 => Bet[]) raceBets;
    IERC20 raceToken;

    modifier invalidBetAmount(uint256 userBalance, uint256 amountRequired) {
        require(
            amountRequired <= userBalance,
            INVALID_BET_AMOUNT_ERROR_MESSAGE
        );

        _;
    }

    function transferTo(uint256 userId, uint256 amount) internal {
        address to = usersData[userId].userWalletAddress;
        uint256 erc20balance = raceToken.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        raceToken.transferFrom(address(this), to, amount);
    }

    function placeBet(
        BetType betType,
        uint256 raceId,
        uint256 userId,
        uint256 horseId
    )
        internal
        invalidBetAmount(
            raceToken.balanceOf(msg.sender),
            races[raceId].betAmount
        )
        invalidRaceId(raceId)
        raceCompleted(raceId)
    {
        if (
            betType == BetType.Show &&
            races[raceId].location != Location.NorthAmerica
        ) {
            require(false, NORTH_AMERICA_SHOW_ERROR_MESSAGE);
        }
        if (
            races[raceId].location == Location.NorthAmerica &&
            betType == BetType.Show &&
            races[raceId].participatingHorses.length < 4
        ) {
            require(false, NORTH_AMERICA_SHOW_REQUIREMENT_ERROR_MESSAGE);
        }
        if (
            betType == BetType.Place &&
            races[raceId].participatingHorses.length < 3
        ) {
            require(false, NORTH_AMERICA_PLACE_REQUIREMENT_ERROR_MESSAGE);
        }
        raceToken.transferFrom(
            msg.sender,
            address(this),
            races[raceId].betAmount
        );
        Bet memory newBet = Bet(
            userId,
            raceId,
            betType,
            races[raceId].betAmount,
            horseId,
            0
        );
        raceBets[raceId].push(newBet);
        races[raceId].totalBetAmountRecieved =
            races[raceId].totalBetAmountRecieved +
            races[raceId].betAmount;
    }

    function refundRemoveBets(uint256 raceId)
        internal
        onlyOwner(REFUND_REMOVE_BETS)
        invalidRaceId(raceId)
        raceCompleted(raceId)
    {
        for (uint256 i = 0; i < raceBets[raceId].length; i++) {
            transferTo(raceBets[raceId][i].userId, raceBets[raceId][i].amount);
        }
        delete raceBets[raceId];
    }

    Bet[] winBets;
    Bet[] placeBets;
    Bet[] showBets;

    function verifyBetWinsAndSettleCash(uint256 raceId) internal {
        delete winBets;
        delete placeBets;
        delete showBets;
        Bet[] memory bets = raceBets[raceId];
        for (uint256 i = 0; i < bets.length; i++) {
            int256 pos = getHorsePos(
                races[raceId].horsesInRankOrder,
                bets[i].horseId
            );
            if (pos == -1) {
                continue;
            }
            if (bets[i].betType == BetType.Win && pos == 0) {
                winBets.push(bets[i]);
            }
            if (bets[i].betType == BetType.Place) {
                if (races[raceId].location == Location.NorthAmerica) {
                    if (pos <= 1) {
                        placeBets.push(bets[i]);
                    }
                } else {
                    if (races[raceId].participatingHorses.length <= 7) {
                        if (pos <= 1) {
                            placeBets.push(bets[i]);
                        }
                    } else if (
                        races[raceId].participatingHorses.length > 7 &&
                        races[raceId].participatingHorses.length < 16
                    ) {
                        if (pos <= 2) {
                            placeBets.push(bets[i]);
                        }
                    } else {
                        if (pos <= 4) {
                            placeBets.push(bets[i]);
                        }
                    }
                }
            }
            if (bets[i].betType == BetType.Show && pos <= 2) {
                showBets.push(bets[i]);
            }
        }
        uint256 winBetCreditProportion = 5;
        uint256 placeBetCreditProportion = 3;
        uint256 showBetCreditProportion = 2;

        if (races[raceId].location != Location.NorthAmerica) {
            winBetCreditProportion = 8;
            placeBetCreditProportion = 2;
            showBetCreditProportion = 0;
        }

        uint256 totalBetAmount = (races[raceId].totalBetAmountRecieved * 9) /
            10;

        if (winBets.length > 0) {
            winBetCreditProportion =
                ((winBetCreditProportion * totalBetAmount) / 10) /
                winBets.length;
        } else {
            winBetCreditProportion = 0;
        }
        if (placeBets.length > 0) {
            placeBetCreditProportion =
                ((placeBetCreditProportion * totalBetAmount) / 10) /
                placeBets.length;
        } else {
            placeBetCreditProportion = 0;
        }
        if (showBets.length > 0) {
            showBetCreditProportion =
                ((showBetCreditProportion * totalBetAmount) / 10) /
                showBets.length;
        } else {
            showBetCreditProportion = 0;
        }

        for (uint256 i = 0; i < winBets.length; i++) {
            awardWiningPrize(
                winBetCreditProportion,
                winBets[i].userId,
                raceId,
                winBets[i].betType,
                winBets[i].horseId
            );
        }
        for (uint256 i = 0; i < placeBets.length; i++) {
            awardWiningPrize(
                placeBetCreditProportion,
                placeBets[i].userId,
                raceId,
                placeBets[i].betType,
                placeBets[i].horseId
            );
        }
        for (uint256 i = 0; i < showBets.length; i++) {
            awardWiningPrize(
                showBetCreditProportion,
                showBets[i].userId,
                raceId,
                showBets[i].betType,
                showBets[i].horseId
            );
        }
    }

    function awardWiningPrize(
        uint256 prizeAmount,
        uint256 userId,
        uint256 raceId,
        BetType betType,
        uint256 horseId
    ) internal {
        for (uint256 i = 0; i < raceBets[raceId].length; i++) {
            if (
                raceBets[raceId][i].userId == userId &&
                raceBets[raceId][i].betType == betType &&
                raceBets[raceId][i].horseId == horseId && raceBets[raceId][i].winningPrize == 0
            ) {
                transferTo(userId, prizeAmount);
                raceBets[raceId][i].winningPrize = prizeAmount;
                break;
            }
        }
    }

    function getHorsePos(uint256[] memory horses, uint256 horseId)
        internal
        pure
        returns (int256)
    {
        for (uint256 i = 0; i < horses.length; i++) {
            if (horses[i] == horseId) {
                return int256(i);
            }
        }
        return -1;
    }
}
