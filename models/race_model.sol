// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

enum Location {
    NorthAmerica,
    Europe,
    Australia,
    Asia
}

enum RaceState {
    YET_TO_RACE,
    IN_PROFRESS,
    COMPLETED,
    CANCELLED
}

struct Race {
    uint256 raceId;
    Location location;
    uint[] participatingHorses;
    uint[] participatingJockeys;
    RaceState raceState;
    uint256[] horsesInRankOrder; // horses id in ranking order
    uint256[] horseRaceCompletionSeconds;
    uint256 totalBetAmountRecieved;
}
