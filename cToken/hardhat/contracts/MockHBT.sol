// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockHBT is ERC721 {
    constructor() ERC721("MockHBT", "MHBT") {}

    function safeMint(address to, uint256 tokenId) public {
        require(balanceOf(to) == 0, "Address already owns an HBT.");
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }
}