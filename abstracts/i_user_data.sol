// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "../models/user_model.sol";

abstract contract IUserStorage {
    mapping(uint256 => User) usersData;
    uint256 usersCount;

    function createUser(string memory name, address walletAddress) public {
        uint256 newUserId = usersCount + 1;
        User memory newUser = User(newUserId, walletAddress, name);
        usersData[newUserId] = newUser;
        usersCount = usersCount + 1;
    }

    function logInUser(uint256 userId) public view returns (User memory) {
        return usersData[userId];
    }
}
