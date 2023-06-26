// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "../../models/bet_model.sol";
import "./i_horse_race.sol";
import "hardhat/console.sol";
import "./i_user_data.sol";
import "../../constants/constant.sol";
import "../../constants/error_message.sol";

abstract contract IBetting is IHorseRace, IUserStorage {
    // {
    //   "raceId": [
    //      Bet
    //   ]
    // }
    mapping(uint256 => Bet[]) raceBets;

    modifier invalidBetAmount() {
        require(msg.value > 0, INVALID_BET_AMOUNT_ERROR_MESSAGE);

        _;
    }

    function transferTo(uint256 userId, uint256 amount) internal {
        console.log("------\n");
        console.log("%s", userId);
        console.log("%s", amount);
        address userAdd = usersData[userId].userWalletAddress;
        payable(userAdd).transfer(amount);
    }

    function placeBet(
        BetType betType,
        uint256 raceId,
        uint256 userId,
        uint256 amount,
        uint256 horseId
    ) internal invalidBetAmount invalidRaceId(raceId) raceCompleted(raceId) {
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
            require(
                false,
                NORTH_AMERICA_SHOW_REQUIREMENT_ERROR_MESSAGE
            );
        }
        if (
            betType == BetType.Place &&
            races[raceId].participatingHorses.length < 3
        ) {
            require(
                false,
                NORTH_AMERICA_PLACE_REQUIREMENT_ERROR_MESSAGE
            );
        }
        Bet memory newBet = Bet(userId, raceId, betType, amount, horseId);
        raceBets[raceId].push(newBet);
    }

    function getBets(uint256 raceId) public view returns (Bet[] memory) {
        return raceBets[raceId];
    }

    function refundRemoveBets(uint256 raceId) internal onlyOwner(REFUND_REMOVE_BETS) invalidRaceId(raceId) raceCompleted(raceId) {
        for (uint256 i = 0; i < raceBets[raceId].length; i++) {
            transferTo(raceBets[raceId][i].userId, raceBets[raceId][i].amount);
        }
        delete raceBets[raceId];
    }

    function verifyBetWinsAndSettleCash(uint256 raceId) internal {
        Bet[] memory bets = raceBets[raceId];
        uint256 winBets = 0;
        uint256 placeBets = 0;
        uint256 showBets = 0;
        for (uint256 i = 0; i < bets.length; i++) {
            if (bets[i].betType == BetType.Win) {
                winBets = winBets + 1;
            }
            if (bets[i].betType == BetType.Place) {
                placeBets = placeBets + 1;
            }
            if (bets[i].betType == BetType.Show) {
                showBets = showBets + 1;
            }
        }
        uint256 winBetCreditProportion = 60;
        uint256 placeBetCreditProportion = 25;
        uint256 showBetCreditProportion = 15;

        if (races[raceId].location != Location.NorthAmerica) {
            winBetCreditProportion = 80;
            placeBetCreditProportion = 20;
            showBetCreditProportion = 0;
        }

        uint totalBetAmount = races[raceId].totalBetAmountRecieved * (90/uint(100));

        if (winBets > 0) {
            winBetCreditProportion =
                ((winBetCreditProportion / uint256(100)) *
                    totalBetAmount) /
                uint256(winBets);
        }
        if (placeBets > 0) {
            placeBetCreditProportion =
                ((placeBetCreditProportion / uint256(100)) *
                    totalBetAmount) /
                uint256(placeBets);
        }
        if (showBets > 0) {
            showBetCreditProportion =
                ((showBetCreditProportion / uint256(100)) *
                    totalBetAmount) /
                uint256(showBets);
        }

        for (uint256 i = 0; i < bets.length; i++) {
            int256 pos = getHorsePos(
                races[raceId].horsesInRankOrder,
                bets[raceId].horseId
            );
            if(pos == -1){
                continue ;
            }
            if (bets[i].betType == BetType.Win) {
                if (pos == 0) {
                    transferTo(bets[i].userId, winBetCreditProportion);
                }
            }
            if (bets[i].betType == BetType.Place) {
                if (races[raceId].location == Location.NorthAmerica) {
                    if (pos <= 1) {
                        transferTo(bets[i].userId, placeBetCreditProportion);
                    }
                } else {
                    if (races[raceId].participatingHorses.length <= 7) {
                        if (pos <= 1) {
                            transferTo(
                                bets[i].userId,
                                placeBetCreditProportion
                            );
                        }
                    } else if (
                        races[raceId].participatingHorses.length > 7 &&
                        races[raceId].participatingHorses.length < 16
                    ) {
                        if (pos <= 2) {
                            transferTo(
                                bets[i].userId,
                                placeBetCreditProportion
                            );
                        }
                    } else {
                        if (pos <= 4) {
                            transferTo(
                                bets[i].userId,
                                placeBetCreditProportion
                            );
                        }
                    }
                }
            }
            if (bets[i].betType == BetType.Show) {
                if (pos <= 2) {
                    transferTo(bets[i].userId, showBetCreditProportion);
                }
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
