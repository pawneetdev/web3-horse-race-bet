// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "hardhat/console.sol";
import "i_betting.sol";

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

    function createNewRace() public {
        return createNewRace();
    }

    function startRace() public returns (uint[] memory) {
        return startHorseRace();
    }
}
