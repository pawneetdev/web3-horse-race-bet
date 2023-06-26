// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "hardhat/console.sol";
import "./abstracts/i_betting.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
contract HorseRaceBetting is IBetting{

    event HorseAdded(address indexed sender, string message);
    event JockeyAdded(address indexed sender, string message);
    event RaceCreated(address indexed sender, string message);
    event RaceStarted(address indexed sender, uint raceId, string message);
    event RaceCancelled(address indexed sender, uint raceId, string message);
    event BetReceived(address indexed sender, string betType, uint raceId, uint userId, uint horseId);

    function addNewHorse(string memory horseName) public returns (bool){
        bool isHorseAdded = addHorse(horseName);
        if(isHorseAdded) {
            emit HorseAdded(msg.sender, string.concat(horseName, " horse has been added"));
        }
        return isHorseAdded;
    }

    function addNewJockey(string memory jockeyName) public returns (bool){
        bool isJockeyAdded = addJockey(jockeyName);
        if(isJockeyAdded) {
            emit JockeyAdded(msg.sender, string.concat(jockeyName, " jockey has been added"));
        }
        return isJockeyAdded;
    }

    function getHorses() public view returns (Horse []memory){
        return horses;
    }

    function getJockeys() public view returns (Jockey []memory){
        return jockeys;
    }

    function createRace(string memory locationId,
        uint[] memory participatingHorses,
        uint[] memory participatingJockeys) public {
        Location location;
        if(keccak256(bytes(locationId)) == keccak256("northamerica")){
            location = Location.NorthAmerica;
        }else if(keccak256(bytes(locationId)) == keccak256("europe")){
            location = Location.Europe;
        }else if(keccak256(bytes(locationId)) == keccak256("australia")){
            location = Location.Australia;
        }else if(keccak256(bytes(locationId)) == keccak256("asia")){
            location = Location.Asia;
        }
        createNewRace(location, participatingHorses, participatingJockeys);
        emit RaceCreated(msg.sender, "race has been created");

    }

    function cancelRace(uint raceId) public {
        refundRemoveBets(raceId);
        cancelHorseRace(raceId);
        emit RaceCancelled(msg.sender, raceId, "race has been cancelled");

    }

    function placeNewBet(string memory betType, uint raceId, uint userId, uint horseId) public payable {
        BetType newBetType;
        if(keccak256(bytes(betType)) == keccak256("win")){
            newBetType = BetType.Win;
        }else if(keccak256(bytes(betType)) == keccak256("place")){
            newBetType = BetType.Place;
        }else if(keccak256(bytes(betType)) == keccak256("show")){
            newBetType = BetType.Show;
        }
        placeBet(newBetType, raceId, userId, msg.value, horseId);
        emit BetReceived(msg.sender, betType, raceId, userId, horseId);
    }

    function performRace(uint raceId) public {
        emit RaceStarted(msg.sender, raceId, "race is getting started");
        startHorseRace(raceId);
        verifyBetWinsAndSettleCash(raceId);
    }
}
