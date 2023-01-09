// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "./INodeNFT.sol";

pragma solidity ^0.8.0;

contract NodeManager is Ownable {
    INodeNFT public node;

    uint256 public curTokenId;

    constructor() {
        node = INodeNFT(0x0000000000000000000000000000000000000802);
    }

    function setCurTokenId(uint256 _tokenId) external onlyOwner {
        curTokenId = _tokenId;
    }

    function mint(address to, bytes calldata role) external onlyOwner {
        curTokenId++;
        node.mint(to, curTokenId);
        node.setAttribute(curTokenId, bytes("role"), role);
    }

    function transferUniqueOwnership(address newOwner) external onlyOwner {
        node.transferOwnership(newOwner);
    }

    function setAcceptOwnership() external payable onlyOwner {
        node.setAcceptOwnership();
    }
}
