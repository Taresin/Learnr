// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Sarsa is ERC1155 {
    // IPFS content for each NFT
    string public symbol;
    mapping(uint256 => string) public images;
    mapping(uint256 => string) public brains;
    uint256 public tokenCount;

    constructor() ERC1155("https://api.opensea.io/api/asset/{id}") {
        tokenCount = 0;
        symbol = "SARSA";
    }

    function mint(
        address account,
        string memory _imageURI,
        string memory _brainURI
    ) public returns (uint256) {
        uint256 newItemId = tokenCount++;
        images[newItemId] = _imageURI;
        brains[newItemId] = _brainURI;

        _mint(account, newItemId, 1, "");
        // _setTokenURI(newItemId, _imageURI); // Set the URI for OpenSea
        return 1;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return images[tokenId];
    }
}
