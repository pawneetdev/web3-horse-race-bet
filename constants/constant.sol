// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

string constant ADD_HORSE        = "addHorse";
string constant ADD_JOCKEY       = "addJockey";
string constant START_HORSE_RACE = "startHorseRace";
string constant CANCEL_HORSE_RACE = "startHorseRace";

string constant ADD_HORSE_ERROR_MESSAGE  = "Only owner can add a horse";
string constant ADD_JOCKEY_ERROR_MESSAGE = "Only owner can add a jockey";
string constant START_RACE_ERROR_MESSAGE = "Only owner can start the race";
string constant CANCEL_RACE_ERROR_MESSAGE = "Only owner can cancel the race";