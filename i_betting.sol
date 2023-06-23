// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./models/bet_model.sol";
import "./i_horse_race.sol";
import "hardhat/console.sol";
import "./i_user_data.sol";

abstract contract IBetting is IHorseRace, IUserStorage{
    // {
    //   "raceId": [
    //      Bet
    //   ]
    // }
    mapping(uint => Bet[]) raceBets;

    function placeBet(uint raceId, uint userId, uint horseId, uint betType) public payable {
        require(
            races[raceId].raceId != 0 &&
                races[raceId].raceState == RaceState.YET_TO_RACE,
            "Failed to cancel due to Invalid Race Id or Race might be completed"
        );
        BetType newBetType;
        if(betType == 0){
            newBetType = BetType.Win;
        }else if(betType == 1){
            newBetType = BetType.Place;
        }else if(betType == 2){
            newBetType = BetType.Show;
        }
        Bet memory newBet = Bet(userId, raceId, newBetType, msg.value, horseId);
        raceBets[raceId].push(newBet);
    }

    function raceCancelled(uint raceId) internal {
        require(msg.sender == owner, "Only owner can refund");
        require(
            races[raceId].raceId != 0 &&
                races[raceId].raceState == RaceState.YET_TO_RACE,
            "Failed to refund due to Invalid Race Id or Race might be completed"
        );
        for (uint i=0; i<raceBets[raceId].length; i++) 
        {
            address userAdd = usersData[raceBets[raceId][i].userId].userWalletAddress;
            payable(userAdd).transfer(raceBets[raceId][i].amount);
        }
        delete raceBets[raceId];
    }

    function claimWinning() internal {

    }

    function calculateWinnings() internal {

    }
}