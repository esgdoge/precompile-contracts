const fs = require('fs')
const envfile = require('envfile')
const parsedFile = envfile.parse(fs.readFileSync('./.env').toString())
const { ethers, network } = require('hardhat')

async function getContracts() {
  let privateKey, nodeRegistryAddress, nodeStakingAddress, nodeNFTAddress, nodeSessionAddress, nodeManagerAddress,
    balanceWrapperAddress

  let nodeRegistry, nodeStaking, nodeNFT, nodeSession, nodeManager, balanceWrapper

  ({
      PRIVATE_KEY: privateKey,
      NODE_REGISTRY_ADDRESS: nodeRegistryAddress,
      NODE_STAKING_ADDRESS: nodeStakingAddress,
      NODE_NFT_ADDRESS: nodeNFTAddress,
      NODE_SESSION_ADDRESS: nodeSessionAddress,
      BALANCE_WRAPPER_ADDRESS: balanceWrapperAddress,
      NODE_MANAGER_ADDRESS: nodeManagerAddress,
    }
      = parsedFile
  )

  const [deployer] = await ethers.getSigners()

  console.log(`Deploying contracts to ${network.name} with the account: ${deployer.address}`)
  const balance = (await deployer.getBalance()).toString()
  console.log('Account balance:', balance)
  if (balance === '0') {
    throw(`Not enough eth`)
  }

  nodeRegistry = await ethers.getContractAt('INodeRegistry', nodeRegistryAddress)
  nodeStaking = await ethers.getContractAt('INodeStaking', nodeStakingAddress)
  nodeNFT = await ethers.getContractAt('INodeNFT', nodeNFTAddress)
  nodeSession = await ethers.getContractAt('INodeSession', nodeSessionAddress)
  nodeManager = await ethers.getContractAt('NodeManager', nodeManagerAddress)
  balanceWrapper = await ethers.getContractAt('IBalanceWrapper', balanceWrapperAddress)

  return {
    signer: '0x' + privateKey,
    deployer,
    nodeRegistry,
    nodeStaking,
    nodeNFT,
    nodeSession,
    nodeManager,
    balanceWrapper,
  }
}

module.exports = {
  getContracts: getContracts,
}
