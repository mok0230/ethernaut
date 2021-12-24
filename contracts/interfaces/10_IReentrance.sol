//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IReentrance {
  function withdraw(uint _amount) external;
}