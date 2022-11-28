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

  // SET THE FOLLOWING PARAMETERS
  const initialFunding = parseEther('0.02')
  const nativeTokenDripAmount = utils.parseEther('0.01')
  const erc20TokenDripAmount = utils.parseEther('10000')
  const timeLock = 60 * 60 * 24 * 14 // 14 days

  // GET HBT contract address
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

  // Get ERC20 contract address
  let erc20ContractAddress
  try {
    const erc20Contract = await deployments.get('TestERC20')
    erc20ContractAddress = erc20Contract.address
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get TestERC20 contract address')
  }

  const deployResult = await deploy('HumanboundTokenGatedFaucet', {
    from: deployer,
    args: [
      hbtContract,
      erc20ContractAddress,
      nativeTokenDripAmount,
      erc20TokenDripAmount,
      timeLock,
    ],
    value: initialFunding,
    log: true,
  })
  if (deployResult.newlyDeployed) {
    console.log(`Faucet deployed at ${deployResult.address} using HBT address: ${hbtContract}`)
  }
}
func.tags = ['HumanboundTokenGatedFaucet', 'local', 'public']
export default func
