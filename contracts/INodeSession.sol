// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// precompile address: 0x0000000000000000000000000000000000000803
interface INodeSession {
    /**
     * @dev Emitted when `keys` is set
     */
    event SetKeys(address indexed validator, bytes keys);

    /**
     * @dev Emitted when `keys` is purge
     */
    event PurgeKeys(address indexed validator);

    /**
     * @dev Sets the session key(s) of the function caller to `keys`.
     * Allows an account to set its session key prior to becoming a validator.
     *
     * Emits a {SetKeys} event.
     */
    function setKeys(bytes memory keys) external;

    /**
     * @dev Removes any session key(s) of the function caller.
     *
     * Emits a {PurgeKeys} event.
     */
    function purgeKeys() external;
}
