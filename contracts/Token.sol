// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

contract Token {
    uint256 public totalTokens = 1000;
    address public owner;

    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalTokens;
    }

    // TRANFERS AMOUNT OF TOKEN, TO THE ADDRESS PASSED AS PARAMETER
    function transferToken(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not Enough Balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    //  RETURNS THE BALANCE OF ACCOUNT PASSED
    function balanceOf(address acc) public view returns (uint256) {
        return balances[acc];
    }
}
