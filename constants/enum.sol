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