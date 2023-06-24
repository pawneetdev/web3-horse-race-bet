// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "hardhat/console.sol";
import "./abstracts/i_betting.sol";

contract HorseRaceBetting is IBetting{

    function addNewHorse(string memory horseName) public returns (bool){
        return addHorse(horseName);
    }

    function addNewJockey(string memory jockeyName) public returns (bool){
        return addJockey(jockeyName);
    }

    function getHorses() public view returns (Horse []memory){
        return horses;
    }

    function getJockeys() public view returns (Jockey []memory){
        return jockeys;
    }

    function createRace(uint locationId,
        uint[] memory participatingHorses,
        uint[] memory participatingJockeys) public {
        Location location;
        if(locationId == 0){
            location = Location.NorthAmerica;
        }else if(locationId == 1){
            location = Location.Europe;
        }else if(locationId == 2){
            location = Location.Australia;
        }else if(locationId == 3){
            location = Location.Asia;
        }
        return createRace(location, participatingHorses, participatingJockeys);
    }

    function cancelRace(uint raceId) public {
        refundRemoveBets(raceId);
        cancelHorseRace(raceId);
    }

    function startRace(uint raceId) public {
        startHorseRace(raceId);
        calculateWinnings(raceId);
        claimWinning(raceId);
    }

    function viewWinners(uint raceId) public view returns (uint[] memory){
        return races[raceId].raceResults;
    }
}
