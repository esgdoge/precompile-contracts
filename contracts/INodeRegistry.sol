// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// precompile address: 0x0000000000000000000000000000000000000800
interface INodeRegistry {
    /**
     * @dev Emitted when `tokenIds` tokens is bound to `validator`.
     */
    event Bind(
        address indexed collator,
        address indexed delegate,
        uint256 tokenId
    );

    /**
     * @dev Emitted when `tokenIds` tokens unbind from `validator`.
     */
    event Unbind(address indexed delegate, uint256 tokenId);

    /**
     * @dev Bind the node tokens to the validator node.
     *
     * Requirements:
     *
     * - `tokenId` must be owned by the caller.
     *
     * Emits a {Bind} event.
     */
    function bind(uint256 tokenId) external;

    /**
     * @dev Bind the node tokens to the validator node.
     *
     * Requirements:
     *
     * - `tokenId` must be owned by the caller.
     *
     * Emits a {Bind} event.
     */
    function delegate(address collator, uint256 tokenId) external;

    /**
     * @dev Unbind the node tokens from the validator node.
     *
     * Requirements:
     *
     * - `tokenId` must be owned by the caller.
     *
     * Emits a {Unbind} event.
     */
    function unbind(uint256 tokenId) external;
}
