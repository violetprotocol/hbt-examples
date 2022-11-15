import { utils } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import hbtAddresses from '../config/hbtContractAddresses'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log(`Deploying as ${deployer}…`)

  const initialFunding = parseEther('0.03')

  const dripAmount = utils.parseEther('0.01')
  const timeLock = 60 * 60 * 24 // 24 hours

  let hbtContract
  if (hre.network.live) {
    const chainId = await hre.getChainId()
    if (!(chainId in hbtAddresses)) {
      throw new Error('Deploying to a network for which an HBT address is not specified')
    }
    hbtContract = hbtAddresses[chainId]
  } else {
    const mockHbt = await deployments.get('MockHBT')
    hbtContract = mockHbt.address
  }

  const deployResult = await deploy('HumanboundTokenGatedFaucet', {
    from: deployer,
    args: [hbtContract, dripAmount, timeLock],
    value: initialFunding,
    log: true,
  })
  if (deployResult.newlyDeployed) {
    console.log(`Faucet deployed at ${deployResult.address} using HBT address: ${hbtContract}`)
  }
}
func.tags = ['HumanboundTokenGatedFaucet', 'local', 'public']
export default func
