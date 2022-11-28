import { useCallback, useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { useDeployments } from './useDeployments'
import {
  HumanboundTokenGatedFaucet,
  HumanboundTokenGatedFaucet__factory,
} from '@hbt-faucet/contracts/typechain-types'
import { BigNumber, utils } from 'ethers'

type FaucetStatus = {
  balance: BigNumber
  formattedBalance: string | null
  erc20ContractAddress: string
  nativeTokenDripAmount: BigNumber
  formattedNativeTokenDripAmount: string | null
  erc20TokenDripAmount: BigNumber
  formattedErc20TokenDripAmount: string | null
  timeLockInSeconds: BigNumber
}

export const useHbtFaucet = () => {
  const { contracts } = useDeployments()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const [contract, setContract] = useState<HumanboundTokenGatedFaucet | null>(null)
  const [faucetStatus, setFaucetStatus] = useState<FaucetStatus | null>(null)
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false)
  const [cooldown, setCooldown] = useState<{
    isInCooldown?: boolean
    endOfCooldownInMs?: number
  } | null>({})
  const timeLockAsString = faucetStatus?.timeLockInSeconds.toString()
  const faucetAddress = contract?.address

  useEffect(() => {
    if (!contracts || !signer) return
    const contract: HumanboundTokenGatedFaucet = HumanboundTokenGatedFaucet__factory.connect(
      contracts.HumanboundTokenGatedFaucet.address,
      signer,
    )
    setContract(contract)
  }, [contracts, signer])

  const getStatus = useCallback(async () => {
    if (!contract || isLoadingStatus) return null
    let active = true
    setIsLoadingStatus(true)
    const status = await contract
      .getStatus()
      .then((b) => b)
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoadingStatus(false)
      })

    if (status && active) {
      const [
        balance_,
        erc20ContractAddress_,
        nativeTokenDripAmount_,
        erc20TokenDripAmount_,
        timeLock_,
        ..._rest
      ] = status
      const faucetStatus = {
        balance: balance_,
        formattedBalance: balance_ ? utils.formatEther(balance_) : null,
        erc20ContractAddress: erc20ContractAddress_,
        nativeTokenDripAmount: nativeTokenDripAmount_,
        formattedNativeTokenDripAmount: nativeTokenDripAmount_
          ? utils.formatEther(nativeTokenDripAmount_)
          : null,
        erc20TokenDripAmount: erc20TokenDripAmount_,
        formattedErc20TokenDripAmount: erc20TokenDripAmount_
          ? utils.formatEther(erc20TokenDripAmount_)
          : null,
        timeLockInSeconds: timeLock_,
      }

      setFaucetStatus(faucetStatus)
    }

    return () => {
      active = false
    }
  }, [contract, isLoadingStatus, setIsLoadingStatus])

  const getCooldownStatus = useCallback(async () => {
    if (!contract || !faucetStatus?.timeLockInSeconds || !address || address == '0x') return null

    const lastDrip = await contract
      .lastDrip(address)
      .then((res) => res)
      .catch((e) => console.error(e))

    if (!lastDrip) return

    if (lastDrip.eq(0)) {
      setCooldown({ isInCooldown: false })
      return
    }

    const nextDripPossibleFrom = lastDrip.add(faucetStatus.timeLockInSeconds).toNumber() * 1000
    const now = new Date().getTime()

    if (now < nextDripPossibleFrom) {
      setCooldown({ isInCooldown: true, endOfCooldownInMs: nextDripPossibleFrom })
    } else {
      setCooldown({ isInCooldown: false })
    }
  }, [contract, address, timeLockAsString])

  useEffect(() => {
    getStatus()
  }, [contract])

  useEffect(() => {
    getCooldownStatus()
  }, [contract, timeLockAsString])

  return { faucetStatus, cooldown, getCooldownStatus, getStatus, faucetAddress }
}
