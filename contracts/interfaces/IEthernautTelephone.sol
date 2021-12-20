//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IEthernautTelephone {
  address public owner;
  function changeOwner(address _owner) public
}