// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "../models/user_model.sol";

abstract contract IUserStorage {
    mapping(uint256 => User) usersData;
    uint256 usersCount;

    function createUser(string memory name, address walletAddress)
        public
        returns (User memory)
    {
        uint256 newUserId = usersCount + 1;
        User memory newUser = User(newUserId, walletAddress, name);
        usersData[newUserId] = newUser;
        usersCount = usersCount + 1;
        return newUser;
    }

    function logInUser()
        public
        view
        returns (User memory)
    {
        User memory loginUserModel;
        for (uint256 i = 0; i < usersCount; i++) {
            if (usersData[i + 1].userWalletAddress == msg.sender) {
                loginUserModel = usersData[i + 1];
                break ;
            }
        }
        return loginUserModel;
    }
}
