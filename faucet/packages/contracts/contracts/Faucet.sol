// SPDX-License-Identifier: GPL-3.0-later
pragma solidity ^0.8.14;

import '@openzeppelin/contracts/access/Ownable.sol';
import {IGetterLogic} from '@violetprotocol/erc721extendable/contracts/extensions/base/getter/IGetterLogic.sol';
import './ITestERC20.sol';

/*
  A faucet leveraging Humanbound Tokens (https://humanbound.xyz/) to provide Sybil-resistance.
*/
contract HumanboundTokenGatedFaucet is Ownable {
  // Emitted when someone claim funds from the faucet
  event Dripped(address recipient, uint256 amount, bool isNativeToken);
  // Emitted when an owner withdraw native tokens
  event Withdrawn(address recipient, uint256 amount);

  // Address of the Humanbound Token contract
  address public hbtContract;
  // Address of the test ERC20 tokens
  ITestERC20 public erc20Contract;
  // Amount of native tokens to drip
  uint128 public nativeTokendDripAmount;
  // Amount of ERC20 tokens to drip
  uint128 public erc20TokendDripAmount;
  // Upon a successful drip of native tokens, an address cannot
  // claim funds again until this time lock has elapsed
  uint128 public timeLockInSeconds;
  // Recording when the last drip of native tokens happened by address
  mapping(address => uint256) public lastDrip;

  constructor(
    address hbtContract_,
    address erc20Contract_,
    uint128 nativeTokendDripAmount_,
    uint128 erc20TokenDripAmount_,
    uint128 timeLockInSeconds_
  ) payable {
    hbtContract = hbtContract_;
    erc20Contract = ITestERC20(erc20Contract_);
    nativeTokendDripAmount = nativeTokendDripAmount_;
    erc20TokendDripAmount = erc20TokenDripAmount_;
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

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getStatus()
    public
    view
    returns (
      uint256 balance_,
      address erc20Contract_,
      uint128 nativeTokendDripAmount_,
      uint128 erc20TokendDripAmount_,
      uint128 timeLockInSeconds_
    )
  {
    return (
      address(this).balance,
      address(erc20Contract),
      nativeTokendDripAmount,
      erc20TokendDripAmount,
      timeLockInSeconds
    );
  }

  function dripNativeTokens() external onlyHBTOwners {
    require(
      block.timestamp > lastDrip[msg.sender] + timeLockInSeconds,
      'You reached your quota. Come back after the cooldown period.'
    );
    lastDrip[msg.sender] = block.timestamp;

    (bool sent, ) = msg.sender.call{value: nativeTokendDripAmount}('');
    require(sent, 'Failed to drip ETH. Is there enough funds?');

    emit Dripped(msg.sender, nativeTokendDripAmount, true);
  }

  function dripERC20Tokens() external {
    erc20Contract.mint(msg.sender, erc20TokendDripAmount);

    emit Dripped(msg.sender, erc20TokendDripAmount, false);
  }

  function updateHBTContractAddress(address newHBTContractAddress) external onlyOwner {
    hbtContract = newHBTContractAddress;
  }

  function updateERC20ContractAddress(address newERC20ContractAddress) external onlyOwner {
    erc20Contract = ITestERC20(newERC20ContractAddress);
  }

  function updateNativeTokenDripAmount(uint128 newAmount) external onlyOwner {
    nativeTokendDripAmount = newAmount;
  }

  function updateERC20TokenDripAmount(uint128 newAmount) external onlyOwner {
    erc20TokendDripAmount = newAmount;
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
