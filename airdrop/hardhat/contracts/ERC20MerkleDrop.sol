// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";

contract ERC20MerkleDrop is ERC20 {
    using BitMaps for BitMaps.BitMap;
    BitMaps.BitMap private claimed;

    bytes32 immutable public root;

    event Claimed(address indexed claimant, uint256 amount, uint256 index);

    constructor(string memory name, string memory symbol, bytes32 merkleroot)
    ERC20(name, symbol)
    {
        root = merkleroot;
    }

    function redeem(address recipient, uint256 amount, bytes32[] calldata merkleProof)
    external
    {
        bytes32 leaf = keccak256(abi.encodePacked(recipient, amount));
        (bool valid, uint256 index) = MerkleProof.verify(merkleProof, root, leaf);
        require(valid, "ERC20MerkleDrop: Valid proof required");
        require(!isClaimed(index), "ERC20MerkleDrop: Tokens already claimed");
        
        claimed.set(index);
        emit Claimed(recipient, amount, index);

        _mint(recipient, amount);
    }

    function isClaimed(uint256 index) public view returns (bool) {
        return claimed.get(index);
    }
}