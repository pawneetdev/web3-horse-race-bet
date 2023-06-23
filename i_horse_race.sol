// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./models/horse_jockey_model.sol";
import "./models/race_model.sol";

abstract contract IHorseRace {
    constructor() {
        owner = msg.sender;
    }

    Horse[] horses;
    Jockey[] jockeys;
    address public owner;
    mapping(uint256 => Race) races;
    uint256 racesCount;

    function createRace(
        uint8 locationId,
        uint[] memory participatingHorses,
        uint[] memory participatingJockeys
    ) public {
        uint256 newRaceId = racesCount + 1;
        uint256[] memory raceResults;
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
        Race memory newRace = Race(
            newRaceId,
            location,
            participatingHorses,
            participatingJockeys,
            RaceState.YET_TO_RACE,
            raceResults
        );
        races[newRaceId] = newRace;
        racesCount = racesCount + 1;
    }

    function addHorse(string memory horseName) internal returns (bool) {
        require(msg.sender == owner, "Only owner can add a horse");
        uint256 horseId = horses.length + 1;
        Horse memory newHorse = Horse(horseId, string(horseName));
        horses.push(newHorse);
        return true;
    }

    function addJockey(string memory jockeyName) internal returns (bool) {
        require(msg.sender == owner, "Only owner can add a jockey");
        uint256 jockeyId = jockeys.length + 1;
        Jockey memory newHorse = Jockey(jockeyId, string(jockeyName));
        jockeys.push(newHorse);
        return true;
    }

    uint256[] rankings;
    function startHorseRace(uint256 raceId)
        public 
    {
        require(msg.sender == owner, "Only owner can start the race");
        require(
            races[raceId].raceId != 0 &&
                races[raceId].raceState == RaceState.YET_TO_RACE,
            "Invalid Race Id or Race might be completed"
        );
        delete rankings;
        races[raceId].raceState = RaceState.IN_PROFRESS;
        for (uint256 i = 0; i < races[raceId].participatingHorses.length; i++) {
            rankings.push(races[raceId].participatingHorses[i]);
        }
        races[raceId].raceResults = rankings;
        races[raceId].raceState = RaceState.COMPLETED;
    }

    function cancelRace(uint256 raceId) internal {
        require(msg.sender == owner, "Only owner can cancel the race");
        require(
            races[raceId].raceId != 0 &&
                races[raceId].raceState == RaceState.YET_TO_RACE,
            "Failed to cancel due to Invalid Race Id or Race might be completed"
        );
        races[raceId].raceState = RaceState.CANCELLED;
    }
}
