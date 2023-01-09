const { ethers } = require('hardhat')
const localContracts = require('./contracts')

async function transferOwnership() {
  let contracts = await localContracts.getContracts()

  // first call setTeam() to change issuer to NodeManager from polkadot apps
  let tx = await contracts.nodeManager.setAcceptOwnership({ value: '1000000000000000000' })
  console.log(`NodeNFT setAcceptOwnership: ${tx.hash}`)
  await tx.wait()

  tx = await contracts.nodeNFT.transferOwnership(contracts.nodeManager.address)
  console.log(`NodeNFT transferOwnership: ${tx.hash}`)
  await tx.wait()
}

async function mint(contracts) {
  // let tx = await contracts.nodeManager.setCurTokenId(1)
  // console.log(`NodeNFT setCurTokenId: ${tx.hash}`)

  let tx = await contracts.nodeManager.mint(contracts.deployer.address, Buffer.from('SuperRare'))
  console.log(`NodeNFT mint: ${tx.hash}`)
  await tx.wait()
}

async function bind(contracts, tokenId) {
  let tx = await contracts.nodeRegistry.bind(tokenId)
  console.log(`NodeRegistry bind: ${tx.hash}`)
}

async function unbind(contracts, tokenId) {
  let tx = await contracts.nodeRegistry.unbind(tokenId)
  console.log(`NodeRegistry unbind: ${tx.hash}`)
}

async function delegate(contracts, collator, tokenId) {
  let tx = await contracts.nodeRegistry.delegate(collator, tokenId)
  console.log(`NodeRegistry delegate: ${tx.hash}`)
}

async function bond(contracts, tokenId, value) {
  let tx = await contracts.nodeStaking.bond(tokenId, { value: value })
  console.log(`NodeStaking bond: ${tx.hash}`)
}

async function unbond(contracts, tokenId, value) {
  let tx = await contracts.nodeStaking.unbond(tokenId, value)
  console.log(`NodeStaking unbond: ${tx.hash}`)
}

async function main() {
  let contracts = await localContracts.getContracts()
  // await transferOwnership()

  await mint(contracts)

  const tokenId = await contracts.nodeManager.curTokenId()
  await bind(contracts, tokenId)
  await delegate(contracts, contracts.deployer.address, tokenId)

  await bond(contracts, tokenId, ethers.utils.parseEther('50'))

  await unbond(contracts, tokenId, ethers.utils.parseEther('10'))

  await unbind(contracts, tokenId)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
