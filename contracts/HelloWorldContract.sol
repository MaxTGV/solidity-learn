// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;


contract HelloWorldContract {

    int256 public number;

    function helloWorld() public pure returns (string memory) {
        return "Hello, Ethereum!";
    }

    function getNumber() public view returns (int256) {
        return number;
    }

    function setNumber(int256 _number) public {
        number = _number;
    }
}
