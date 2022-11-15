//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IHumanboundToken.sol";

contract cERC20 is ERC20 {
	address humanboundToken;

	address noncompliantERC20;
	uint256 public tokensWrapped;

	modifier onlyHumanboundHolder(address account) {
		require(IHumanboundToken(humanboundToken).balanceOf(account) > 0, "cERC20: account is not humanbound token holder");
		_;
	}

	constructor(string memory name_, string memory symbol_, address humanboundToken_, address noncompliantERC20_) ERC20(name_, symbol_) {
		humanboundToken = humanboundToken_;
		noncompliantERC20 = noncompliantERC20_;
	}

	function wrap(uint256 amount) public virtual onlyHumanboundHolder(msg.sender) {
		IERC20(noncompliantERC20).transferFrom(msg.sender, address(this), amount);
		tokensWrapped += amount;

		_mint(msg.sender, amount);
	}

	function unwrap(uint256 amount) public virtual onlyHumanboundHolder(msg.sender) {
		require(tokensWrapped >= amount, "cERC20_unwrap: amount to unwrap exceeds total wrapped");
		_burn(msg.sender, amount);

		IERC20(noncompliantERC20).transfer(msg.sender, amount);
		tokensWrapped -= amount;
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

	function mint(address account, uint256 amount) public virtual {
		_mint(account, amount);
	}
}
