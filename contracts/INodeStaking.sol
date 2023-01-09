// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// precompile address: 0x0000000000000000000000000000000000000801
interface INodeStaking {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Bonded(address indexed from, uint256 indexed tokenId, uint256 value);

    event Unbonded(
        address indexed from,
        uint256 indexed tokenId,
        uint256 value
    );

    function bond(uint256 tokenId) external payable;

    function unbond(uint256 tokenId, uint256 value) external;

    /**
     * @dev Claim the mining rewards of the era index.
     *
     * Requirements:
     *
     * - `validator` cannot be the zero address.
     * - `eraIndex` is an era that has already been settled.
     *
     * Emits a {Transfer} event.
     */
    function payout(address validator, uint256 eraIndex) external;
}
