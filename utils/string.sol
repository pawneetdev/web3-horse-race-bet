// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

library StringUtils {
    function stringCompare(string memory str1, string memory str2) public pure returns(bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function concatenate(string memory s1, string memory s2) public pure returns (string memory) {
        return string.concat(s1,s2);
    }
}