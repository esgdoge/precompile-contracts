const { ethers } = require('hardhat')
const localContracts = require('./contracts')

// const NewCollatorPrivateKey = "10771b1c06e52bec6cca5fc8d6d144526edcafc39a89e14b8a1a19166c98b306"
// const NewCollatorAddress = '0x2DB8E5B7FAf3680dC6f83e576e2caF5054bca600'

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

async function mint(contracts, to, role) {
  // let tx = await contracts.nodeManager.setCurTokenId(1)
  // console.log(`NodeNFT setCurTokenId: ${tx.hash}`)

  let tx = await contracts.nodeManager.mint(to, Buffer.from(role))
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

async function setSessionKey(contracts, key) {
  let tx = await contracts.nodeSession.setKeys(key)
  console.log(`NodeSession setKeys: ${tx.hash}`)
}

// must new wallet call
async function collatorActions(to) {
  let contracts = await localContracts.getContracts()

  await setSessionKey(contracts, '0x5e0de8b3ecbf1d142dbd709c3b9c0d2cbf137258e206305f3dd84c0046c78d7' +
    '05b5cb4e51602558225dc4ca905d0d848be58f3ddf02ada94f56ace812a1feaf108bcf30f383bdcb21cf58693543d190363d' +
    '8d5a513d98f877698e419b8f7121cca7a89829d809c2f5589b8ae999d578d5fbc43106ae4309833068230202c5a35')

  const tokenId = await contracts.nodeManager.curTokenId()
  await bind(contracts, to, tokenId)

  await bond(contracts, tokenId, ethers.utils.parseEther('50'))
}

async function delegateActions() {
  let contracts = await localContracts.getContracts()

  await mint(contracts, 'Rare')

  const tokenId = await contracts.nodeManager.curTokenId()
  await delegate(contracts, contracts.deployer.address, tokenId)

  await bond(contracts, tokenId, ethers.utils.parseEther('30'))
}

async function unbondActions() {
  let contracts = await localContracts.getContracts()
  const tokenId = await contracts.nodeManager.curTokenId()
  await unbond(contracts, tokenId, ethers.utils.parseEther('10'))
  await unbind(contracts, tokenId)
}

async function main() {
  let contracts = await localContracts.getContracts()
  // await mint(contracts, contracts.deployer.address, 'SuperRare')

  await delegateActions(contracts.deployer.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
