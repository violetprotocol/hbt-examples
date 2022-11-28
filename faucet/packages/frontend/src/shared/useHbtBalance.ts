import hbtContractAddresses from 'config/hbtContractAddresses'
import { BigNumber, ethers, Contract } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { env } from './environment'
import { useDeployments } from './useDeployments'

const abi = ['function balanceOf(address owner) view returns (uint256)']

export const useHbtBalance = () => {
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const { contracts } = useDeployments()
  const { chain } = useNetwork()

  const [hbtContractAddress, setHbtContractAddress] = useState<undefined | string>(undefined)
  const [contract, setContract] = useState<Contract | null>(null)
  const [hbtBalance, setHbtBalance] = useState<BigNumber | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const hasHbt = hbtBalance && hbtBalance.gt(0)

  const getBalanceOf = useCallback(
    async (address: string) => {
      if (!contract) return null
      setIsLoading(true)

      try {
        const balance = await contract.balanceOf(address)
        setHbtBalance(balance)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setIsError(true)
        console.error(err)
      }
    },
    [contract],
  )

  useEffect(() => {
    if (!chain || chain?.unsupported || !contracts) return

    let hbtContractAddress
    if (chain?.id == env.localChain) {
      if (!contracts.MockHBT) {
        console.error('Trying to fetch HBT Balance but no mockHBT contract was found')
        return
      }
      hbtContractAddress = contracts.MockHBT.address
    } else if (!!chain?.id && Object.keys(hbtContractAddresses).includes(chain.id.toString())) {
      hbtContractAddress = hbtContractAddresses[chain.id]
    } else {
      throw new Error('Invalid chain ID. Failed to get HBT contract address.')
    }

    setHbtContractAddress(hbtContractAddress)
  }, [chain, contracts])

  useEffect(() => {
    if (hbtContractAddress && signer?.provider) {
      const hbtContract = new ethers.Contract(hbtContractAddress, abi, signer.provider)

      setContract(hbtContract)
    }
  }, [hbtContractAddress, signer])

  useEffect(() => {
    if (!address || !contract) return

    getBalanceOf(address)
  }, [contract, address])

  return { hasHbt, hbtBalance, isLoading, isError }
}
