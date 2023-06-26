// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./race_model.sol";

enum BetType {
    Win,
    Place,
    Show
}

struct Bet {
    uint userId;
    uint256 raceId;
    BetType betType;
    uint256 amount;
    uint horseId;
    uint winningPrize;
}
