// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Interface for OpenSea
interface IERC1155MetadataURI {
    function uri(uint256 _id) external view returns (string memory);
}

contract NFT is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // IPFS content for each NFT
    mapping(uint256 => string) public images;
    mapping(uint256 => string) public brains;

    constructor() ERC1155("https://api.opensea.io/api/asset/{id}") {}

    function mint(
        address account,
        string memory _imageURI,
        string memory _brainURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        images[newItemId] = _imageURI;
        brains[newItemId] = _brainURI;

        _mint(account, newItemId, 1, "");
        _setTokenURI(newItemId, _imageURI); // Set the URI for OpenSea
        return newItemId;
    }

    // Override function to include URI for OpenSea
    function uri(uint256 _id) public view override returns (string memory) {
        require(
            _exists(_id),
            "ERC1155Metadata: URI query for nonexistent token"
        );
        return super.uri(_id);
    }
}
