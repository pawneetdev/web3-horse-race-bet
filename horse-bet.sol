// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "hardhat/console.sol";

abstract contract IHorseRace{
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Horse {
        uint256 horseId;
        string horseName;
    }

    struct Jockey {
        uint256 jockeyId;
        string jockeyName;
    }

    Horse[] horses;
    Jockey[] jockeys;

    function addHorse(uint8 horseId, string memory horseName) internal returns (bool) {
        require(msg.sender == owner, "Only owner can add a horse");
        require(!isHorseExists(horseId), "Horse Id exists already!");
        Horse memory newHorse = Horse(horseId, string(horseName));
        horses.push(newHorse);
        return isHorseExists(horseId);
    }

    function isHorseExists(uint8 horseId) internal view returns (bool) {
        for(uint i=0; i<horses.length; i++){
            if(horses[i].horseId == horseId){
                return true;
            }
        }
        return false;
    }

    function addJockey(uint8 jockeyId, string memory jockeyName) internal returns (bool) {
        require(msg.sender == owner, "Only owner can add a jockey");
        require(!isJokeyExists(jockeyId), "Horse Id exists already!");
        Jockey memory newHorse = Jockey(jockeyId, string(jockeyName));
        jockeys.push(newHorse);
        return isJokeyExists(jockeyId);
    }

    function isJokeyExists(uint8 jockeyId) internal view returns (bool) {
        for(uint i=0; i<jockeys.length; i++){
            if(jockeys[i].jockeyId == jockeyId){
                return true;
            }
        }
        return false;
    }

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
        address userWalletAddress;
        uint256 raceId;
        Location location;
        BetType betType;
        uint256 amount;
        uint16 horseNumber;
    }

    uint[] rankings;
    function startHorseRace() internal returns (uint[] memory)  {
        require(msg.sender == owner, "Only owner can start the race");
        delete rankings;
        for (uint i=0; i<horses.length; i++) 
        {
            rankings.push(horses[i].horseId);
        }
        return rankings;
    }
}

contract HorseRaceBetting is IHorseRace{
    function addNewHorse(uint8 horseId, string memory horseName) public returns (bool){
        return addHorse(horseId, horseName);
    }

    function addNewJockey(uint8 jockeyId, string memory jockeyName) public returns (bool){
        return addJockey(jockeyId, jockeyName);
    }

    function getHorses() public view returns (Horse []memory){
        return horses;
    }

    function getJockeys() public view returns (Jockey []memory){
        return jockeys;
    }

    function startRace() public  returns (uint[] memory) {
        return startHorseRace();
    }

    function viewWinners() public view returns (uint[] memory){
        return rankings;
    }
}
