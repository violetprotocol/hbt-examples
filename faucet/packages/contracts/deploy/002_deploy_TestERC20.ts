import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

const TOKEN_NAME = 'Test USDC'
const TOKEN_SYMBOL = 'tUSDC'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log(`Deploying as ${deployer}…`)

  const deployResult = await deploy('TestERC20', {
    from: deployer,
    args: [TOKEN_NAME, TOKEN_SYMBOL],
    log: true,
  })

  if (deployResult.newlyDeployed) {
    console.log(`Test ERC20 deployed at ${deployResult.address}`)
  }
}
func.tags = ['TestERC20', 'local', 'public']
export default func
