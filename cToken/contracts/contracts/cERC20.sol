//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IHumanboundToken.sol";

contract cERC20 is ERC20, Ownable {
	address humanboundToken;

	modifier onlyHumanboundHolder(address account) {
		require(IHumanboundToken(humanboundToken).balanceOf(account) > 0, "cERC20: account is not humanbound token holder");
		_;
	}

	constructor(string memory name_, string memory symbol_, address humanboundToken_) ERC20(name_, symbol_) Ownable() {
		humanboundToken = humanboundToken_;
	}

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override onlyHumanboundHolder(to) onlyHumanboundHolder(from) {
        super._transfer(from, to, amount);
    }
	
	function _mint(address account, uint256 amount) internal virtual override onlyHumanboundHolder(account) {
        super._mint(account, amount);
    }

	function mint(address account, uint256 amount) public virtual onlyOwner {
		_mint(account, amount);
	}
}
