// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Sarsa is ERC1155 {
    // IPFS content for each NFT
    string public symbol;
    mapping(uint256 => string) public images;
    mapping(uint256 => string) public brains;
    uint256 public tokenCount;
    uint256 public x = 48;

    constructor() ERC1155("https://api.opensea.io/api/asset/{id}") {
        tokenCount = 0;
        symbol = "SARSA";
    }

    function testNoParams() public returns (string memory) {
        return "Hello, World!";
    }

    function testUint256Params(uint256 v) public returns (uint256) {
        return v + 2;
    }

    function testModify(uint256 v) public returns (uint256) {
        x = v + 32;
        return v + 2;
    }

    function createBot(
        string memory _imageURI,
        string memory _brainURI
    ) public returns (uint256) {
        uint256 newItemId = tokenCount++;
        images[newItemId] = _imageURI;
        brains[newItemId] = _brainURI;

        _mint(msg.sender, newItemId, 1, "");
        return newItemId;
    }

    function updateBrain(uint256 tokenId, string memory _brainURI) public {
        brains[tokenId] = _brainURI;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return images[tokenId];
    }
}
