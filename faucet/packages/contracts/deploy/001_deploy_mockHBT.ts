import { BigNumber } from 'ethers'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const hbtRecipient = null

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre
  const { deploy, execute } = deployments

  const { deployer } = await getNamedAccounts()
  console.log(`Deploying as ${deployer}…`)
  hre.hardhatArguments
  const deployResult = await deploy('MockHBT', {
    from: deployer,
    log: true,
  })

  if (deployResult.newlyDeployed) {
    console.log(`Mock HBT deployed at ${deployResult.address}`)
  }

  if (hbtRecipient) {
    // Mint a mock HBT
    const receipt = await execute('MockHBT', { from: deployer }, 'safeMint', hbtRecipient, 1)
    console.log('MINTED MOCK HBT. Receipt Events: ', receipt.events)

    // Send Eth for gas
    const [firstSigner] = await ethers.getSigners()
    const res = await firstSigner.sendTransaction({
      value: BigNumber.from(ethers.utils.parseEther('1')),
      to: hbtRecipient,
    })
    console.log(res)
    const balance = await ethers.provider.getBalance(hbtRecipient)

    console.log(`New balance of ${hbtRecipient}: `, ethers.utils.formatEther(balance), 'ETH')
  }
}
func.tags = ['HumanboundTokenGatedFaucet', 'local']
export default func
