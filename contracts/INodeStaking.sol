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
    event Rewarded(address indexed who, uint256 era, uint256 reward);

    event Bonded(address indexed who, uint256 tokenId, uint256 value);

    event Rebonded(address indexed who, uint256 tokenId, uint256 value);

    event Unbonded(address indexed who, uint256 tokenId, uint256 value);

    function bond(uint256 tokenId) external payable;

    function rebond(uint256 tokenId, uint256 value) external;

    function unbond(uint256 tokenId, uint256 value) external;

    function claimEra(address staker, uint256 eraIndex) external;

    function claimAll(address staker) external;

    function stakingEraReward(
        address staker,
        uint256 eraIndex
    ) external view returns (uint256 reward);

    function stakingUnclaimedReward(
        address staker
    ) external view returns (uint256 reward);
}
