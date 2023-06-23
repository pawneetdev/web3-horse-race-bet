// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract HorseRaceBetting {
    enum Location{
        NorthAmerica, // default
        Europe,
        Australia,
        Asia
    }
    
    enum BetType {
        Win,
        Place,
        Show
    }

    struct Bet {
        address user;
        uint256 raceId;
        Location location;
        BetType betType;
        uint256 amount;
        uint16 horseNumber;
    }

    address payable public raceOrganiser;

    constructor() {

    }

    function startRace() internal returns (uint16) {

    }

    function cancelRace() internal {

    }

    function placeBet() public payable {
    }

    function claimWinning() public {

    }

    function calculateWinnings() internal returns (uint256) {

    }
}