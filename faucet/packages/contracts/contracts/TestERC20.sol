//SPDX-License-Identifier: GPL-3.0-later
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import './ITestERC20.sol';

contract TestERC20 is ITestERC20, ERC20 {
	constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {}

	function mint(address account, uint256 amount) public virtual {
		_mint(account, amount);
	}
}