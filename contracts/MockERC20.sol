// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MockERC20 {
    function allowance(address owner, address spender) public view returns (uint256) {
        return 1000;
    }

    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        return false;
    }
}
