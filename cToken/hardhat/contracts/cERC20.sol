//SPDX-License-Identifier: GPLv3
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IHumanboundToken.sol";

/**
 * Compliant ERC20 Token
 * Example implementation of using Humanbound Token to gate token access to verified users
 * 
 * @dev `onlyHumanboundHolder` is the key modifier to be used in your token
 * @notice The below implementation gives an example of how to use the `onlyHumanboundHolder` modifier to restrict
 * usage of the token. This can be applied to ERC20, ERC223, ERC721 among many other token standards to achieve a
 * compliant token.
 *
 * Example use cases include compliant stablecoins (cUSDC, cDAI), compliant NFT drops, compliant governance tokens etc.
 */

contract cERC20 is ERC20 {
	address humanboundToken;

	modifier onlyHumanboundHolder(address account) {
		require(IHumanboundToken(humanboundToken).balanceOf(account) > 0, "cERC20: account is not humanbound token holder");
		_;
	}

	constructor(string memory name_, string memory symbol_, address humanboundToken_, address noncompliantERC20_) ERC20(name_, symbol_) {
		humanboundToken = humanboundToken_;
		noncompliantERC20 = noncompliantERC20_;
	}

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override onlyHumanboundHolder(to) onlyHumanboundHolder(from) {
        super._transfer(from, to, amount);
    }

    // Features for a standard minting flow for cERC20
	// Simple unpermissioned minting of new cERC20 tokens that can only be minted to HBT holders
	function _mint(address account, uint256 amount) internal virtual override onlyHumanboundHolder(account) {
        super._mint(account, amount);
    }

	function mint(address account, uint256 amount) public virtual {
		_mint(account, amount);
	}

    // Features for a wrapping/unwrapping flow
	// Takes a non-compliant ERC20 token, and converts it to compliant cERC20 through wrapping process
	// Wrapping can only be performed by HBT holders
	address noncompliantERC20;
	uint256 public tokensWrapped;
	
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
}
