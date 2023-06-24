// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "../models/horse_jockey_model.sol";
import "../models/race_model.sol";
import "hardhat/console.sol";

abstract contract IHorseRace {
    constructor() {
        owner = msg.sender;
    }

    Horse[] horses;
    Jockey[] jockeys;
    address public owner;
    mapping(uint256 => Race) races;
    uint256 racesCount;

    function createNewRace(
        Location location,
        uint256[] memory participatingHorses,
        uint256[] memory participatingJockeys
    ) internal {
        require(participatingHorses.length >= 2, "Min 2 horses required to race");
        uint256 newRaceId = racesCount + 1;
        uint256[] memory horsesInRankOrder;
        uint256[] memory horseRaceCompletionSeconds;
        Race memory newRace = Race(
            newRaceId,
            location,
            participatingHorses,
            participatingJockeys,
            RaceState.YET_TO_RACE,
            horsesInRankOrder,
            horseRaceCompletionSeconds,
            0
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

    uint private nonce;

    function generateRandomNumber() internal returns (uint) {
        uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp, nonce))) % 41 + 20;
        nonce++;
        return randomNumber;
    }

    function sortAscending(uint[] memory horseRaceDur, uint[] memory horseIds) internal pure returns (uint[] memory) {
        uint[] memory horseRaceDurSorted = horseRaceDur;
        uint[] memory horseIdsSorted = horseIds;

        // Perform a simple bubble sort algorithm
        for (uint i = 0; i < horseRaceDurSorted.length - 1; i++) {
            for (uint j = 0; j < horseRaceDurSorted.length - i - 1; j++) {
                if (horseRaceDurSorted[j] > horseRaceDurSorted[j + 1]) {
                    // Swap elements
                    (horseRaceDurSorted[j], horseRaceDurSorted[j + 1]) = (horseRaceDurSorted[j + 1], horseRaceDurSorted[j]);
                    (horseIdsSorted[j], horseIdsSorted[j + 1]) = (horseIdsSorted[j + 1], horseIdsSorted[j]);
                }
            }
        }

        return horseIdsSorted;
    }

    uint256[] horseRaceCompletionDur;
    function startHorseRace(uint256 raceId) internal {
        require(msg.sender == owner, "Only owner can start the race");
        require(
            races[raceId].raceId != 0 &&
                races[raceId].raceState == RaceState.YET_TO_RACE,
            "Invalid Race Id or Race might be completed"
        );
        delete horseRaceCompletionDur;
        races[raceId].raceState = RaceState.IN_PROFRESS;
        for (uint256 i = 0; i < races[raceId].participatingHorses.length; i++) {
            horseRaceCompletionDur.push(generateRandomNumber());
        }
        races[raceId].horseRaceCompletionSeconds = horseRaceCompletionDur;
        races[raceId].horsesInRankOrder = sortAscending(horseRaceCompletionDur, races[raceId].participatingHorses);
        races[raceId].raceState = RaceState.COMPLETED;
    }

    function cancelHorseRace(uint256 raceId) internal {
        require(msg.sender == owner, "Only owner can cancel the race");
        require(
            races[raceId].raceId != 0 &&
                races[raceId].raceState == RaceState.YET_TO_RACE,
            "Failed to cancel due to Invalid Race Id or Race might be completed"
        );
        races[raceId].raceState = RaceState.CANCELLED;
    }
}
