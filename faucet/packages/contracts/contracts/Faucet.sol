// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';
import {IGetterLogic} from '@violetprotocol/erc721extendable/contracts/extensions/base/getter/IGetterLogic.sol';

/*
  A faucet leveraging Humanbound Tokens (https://humanbound.xyz/) to provide Sybil-resistance.
*/
contract HumanboundTokenGatedFaucet is Ownable {
  // Emitted when someone claim funds from the faucet
  event Dripped(address recipient, uint256 amount);
  // Emitted when an owner withdraw funds
  event Withdrawn(address recipient, uint256 amount);

  // Stored address of the Humanbound Token contract
  address public hbtContract;
  // Amount to drip
  uint128 public dripAmount;
  // Upon a successful drip, an address cannot
  // claim funds again until this time lock has elapsed
  uint128 public timeLockInSeconds;
  // Recording when the last drip happened by address
  mapping(address => uint256) public lastDrip;

  constructor(
    address hbtContract_,
    uint128 dripAmount_,
    uint128 timeLockInSeconds_
  ) payable {
    hbtContract = hbtContract_;
    dripAmount = dripAmount_;
    timeLockInSeconds = timeLockInSeconds_;
  }

  modifier onlyHBTOwners() {
    // Verify HBT ownership
    require(
      IGetterLogic(hbtContract).balanceOf(msg.sender) > 0,
      'Unauthorized: Ownership of a Humanbound Token is required'
    );
    _;
  }

  receive() external payable {}

  fallback() external payable {}

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  function getStatus()
    public
    view
    returns (
      uint256 balance_,
      address hbtContract_,
      uint128 dripAmount_,
      uint128 timeLockInSeconds_
    )
  {
    return (address(this).balance, hbtContract, dripAmount, timeLockInSeconds);
  }

  function drip() external onlyHBTOwners {
    require(
      block.timestamp > lastDrip[msg.sender] + timeLockInSeconds,
      'You reached your quota. Come back after the cooldown period.'
    );
    lastDrip[msg.sender] = block.timestamp;

    (bool sent, ) = msg.sender.call{value: dripAmount}('');
    require(sent, 'Failed to drip ETH. Is there enough funds?');

    emit Dripped(msg.sender, dripAmount);
  }

  function updateHBTContractAddress(address newHBTContractAddress) external onlyOwner {
    hbtContract = newHBTContractAddress;
  }

  function updateDripAmount(uint128 newAmount) external onlyOwner {
    dripAmount = newAmount;
  }

  function updateTimeLock(uint128 newTimeLock) external onlyOwner {
    timeLockInSeconds = newTimeLock;
  }

  function withdraw(uint256 amount) external onlyOwner {
    _withdraw(amount);
  }

  function withdrawAll() external onlyOwner {
    uint256 thisBalance = address(this).balance;

    _withdraw(thisBalance);
  }

  function _withdraw(uint256 amount) private {
    address recipient = msg.sender;

    (bool sent, ) = recipient.call{value: amount}('');
    require(sent, 'Failed withdrawing ETH');

    emit Withdrawn(recipient, amount);
  }
}
