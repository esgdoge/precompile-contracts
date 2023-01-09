const fs = require('fs')
const envfile = require('envfile')
const parsedFile = envfile.parse(fs.readFileSync('./.env').toString())
const { ethers, network } = require('hardhat')

const deployContract = async function(contractName, constructorArgs) {
  // We get the contract to deploy
  let factory = await ethers.getContractFactory(contractName)
  console.log(`Deploying ${contractName}...`)
  let contract = await factory.deploy(...(constructorArgs || []))
  await contract.deployed()
  console.log(`${contractName} deployed at: ${contract.address}`)
  return contract
}

async function main() {
  let nodeManagerAddress, nodeManager

  ({
    NODE_MANAGER_ADDRESS: nodeManagerAddress,
  } = parsedFile)

  const [deployer] = await ethers.getSigners()

  console.log(`Deploying contracts to ${network.name} with the account: ${deployer.address}`)
  const balance = (await deployer.getBalance()).toString()
  console.log('Account balance:', balance)
  if (balance === '0') {
    throw(`Not enough eth`)
  }

  if (nodeManagerAddress) {
    nodeManager = await (await ethers.getContractFactory('NodeManager')).attach(nodeManagerAddress)
    console.log(`NodeManager address ${nodeManagerAddress} is already set.`)
  } else {
    nodeManager = await deployContract('NodeManager', [])
    nodeManagerAddress = nodeManager.address
  }

  parsedFile.NODE_MANAGER_ADDRESS = nodeManagerAddress
  fs.writeFileSync('./.env', envfile.stringify(parsedFile))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
