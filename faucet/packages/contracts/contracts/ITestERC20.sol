//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface ITestERC20 {
	function mint(address account, uint256 amount) external;
}