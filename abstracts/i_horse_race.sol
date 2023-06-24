// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "../models/horse_jockey_model.sol";
import "../models/race_model.sol";
import "../constants/constant.sol";

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
        Location location,
        uint[] memory participatingHorses,
        uint[] memory participatingJockeys
    ) internal {
        uint256 newRaceId = racesCount + 1;
        uint256[] memory raceResults;
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

    function stringCompare(string memory str1, string memory str2) public pure returns(bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    modifier onlyOwner(string memory methodName) {
        if (stringCompare(methodName, ADD_HORSE)) {
            require(msg.sender == owner, ADD_HORSE_ERROR_MESSAGE);
        } else if(stringCompare(methodName, ADD_JOCKEY)) {
            require(msg.sender == owner, ADD_JOCKEY_ERROR_MESSAGE);
        } else if(stringCompare(methodName, START_HORSE_RACE)) {
            require(msg.sender == owner, START_RACE_ERROR_MESSAGE);
        } else if(stringCompare(methodName, CANCEL_HORSE_RACE))
        require(msg.sender == owner, CANCEL_RACE_ERROR_MESSAGE);

        _;
    }

    function addHorse(string memory horseName) internal onlyOwner(ADD_HORSE_ERROR_MESSAGE) returns (bool) {
        uint256 horseId = horses.length + 1;
        Horse memory newHorse = Horse(horseId, string(horseName));
        horses.push(newHorse);
        return true;
    }

    function addJockey(string memory jockeyName) internal onlyOwner(ADD_JOCKEY_ERROR_MESSAGE) returns (bool) {
        uint256 jockeyId = jockeys.length + 1;
        Jockey memory newHorse = Jockey(jockeyId, string(jockeyName));
        jockeys.push(newHorse);
        return true;
    }

    uint256[] rankings;
    function startHorseRace(uint256 raceId) internal onlyOwner(START_HORSE_RACE)
    {
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

    function cancelHorseRace(uint256 raceId) public onlyOwner(CANCEL_HORSE_RACE) {
        require(
            races[raceId].raceId != 0 &&
                races[raceId].raceState == RaceState.YET_TO_RACE,
            "Failed to cancel due to Invalid Race Id or Race might be completed"
        );
        races[raceId].raceState = RaceState.CANCELLED;
    }
}
