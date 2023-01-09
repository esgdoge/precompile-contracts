const localContracts = require('./contracts')

async function transferOwnership() {
  let contracts = await localContracts.getContracts()

  let tx = await contracts.nodeNFT.transferOwnership(contracts.nodeManager.address)
  console.log(`NodeNFT transferOwnership: ${tx.hash}`)
  await tx.wait()
}

async function mint() {
  let contracts = await localContracts.getContracts()

  let tx = await contracts.nodeManager.setCurTokenId(6)
  console.log(`NodeNFT setCurTokenId: ${tx.hash}`)

  tx = await contracts.nodeManager.mint(contracts.deployer.address, 'SuperRare')
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
  console.log(`NodeRegistry unbind: ${tx.hash}`)
}

async function main() {
  let contracts = await localContracts.getContracts()

  const tokenId = 5
  await bind(contracts, tokenId)
  // await delegate(contracts, contracts.deployer.address, tokenId)
  // await unbind(tokenId)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
