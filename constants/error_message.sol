// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// HORSE RACE
string constant ADD_HORSE_ERROR_MESSAGE          = "Only owner can add a horse";
string constant ADD_JOCKEY_ERROR_MESSAGE         = "Only owner can add a jockey";
string constant START_RACE_ERROR_MESSAGE         = "Only owner can start the race";
string constant CANCEL_RACE_ERROR_MESSAGE        = "Only owner can cancel the race";
string constant REFUND_ERROR_MESSAGE             = "Only owner can refund";
string constant MIN_HORSES_ERROR_MESSAGE         = "Min 2 horses required to race";

// BET
string constant INVALID_BET_AMOUNT_ERROR_MESSAGE              = "Invalid bet amount";
string constant NORTH_AMERICA_SHOW_ERROR_MESSAGE              = "Show bets can be only places in North America";
string constant NORTH_AMERICA_SHOW_REQUIREMENT_ERROR_MESSAGE  = "Show bets can be accepted only if horses participating in race greater than or equal to 4";
string constant NORTH_AMERICA_PLACE_REQUIREMENT_ERROR_MESSAGE = "Place bets can be accepted only if horses participating in race g  ater than or equal to 3";

// COMMON
string constant INVALID_RACE_ID_ERROR_MESSAGE    = "Invalid Race Id";
string constant RACE_COMPLETED_ERROR_MESSAGE     = "Race might be completed";