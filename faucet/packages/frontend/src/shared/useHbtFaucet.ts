import { useCallback, useEffect, useState } from 'react'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { useDeployments } from './useDeployments'
import {
  HumanboundTokenGatedFaucet,
  HumanboundTokenGatedFaucet__factory,
} from '@ethathon/contracts/typechain-types'
import { BigNumber, utils } from 'ethers'

type FaucetStatus = {
  balance: BigNumber
  hbtContractAddress: string
  dripAmount: BigNumber
  timeLockInSeconds: BigNumber
}

export const useHbtFaucet = () => {
  const { chain } = useNetwork()
  const { contracts } = useDeployments()
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const [contract, setContract] = useState<HumanboundTokenGatedFaucet | null>(null)
  const [faucetStatus, setFaucetStatus] = useState<FaucetStatus | null>(null)

  const [cooldown, setCooldown] = useState<{ isInCooldown?: boolean; endOfCooldownInMs?: number }>(
    {},
  )

  useEffect(() => {
    if (!contracts || !signer) return

    const contract = HumanboundTokenGatedFaucet__factory.connect(
      contracts.HumanboundTokenGatedFaucet.address,
      signer,
    )
    setContract(contract)

    return () => {
      setContract(null)
    }
  }, [contracts, signer, chain])

  const getStatus = useCallback(async () => {
    if (!contract) return null

    const status = await contract
      .getStatus()
      .then((b) => b)
      .catch((e) => console.error(e))

    if (status) {
      const [balance_, hbtAddress_, dripAmount_, timeLock_, ..._rest] = status
      const faucetStatus = {
        balance: balance_,
        formattedBalance: balance_ ? utils.formatEther(balance_) : null,
        hbtContractAddress: hbtAddress_,
        dripAmount: dripAmount_,
        timeLockInSeconds: timeLock_,
      }
      setFaucetStatus(faucetStatus)
    }
  }, [signer, contract])

  const getCooldownStatus = useCallback(async () => {
    if (!contract || !address || address == '0x') return null

    const lastDrip = await contract
      .lastDrip(address)
      .then((res) => res)
      .catch((e) => console.error(e))

    if (!lastDrip) return

    if (lastDrip.eq(0)) {
      setCooldown({ isInCooldown: false })
      return
    }
    const timeLock = await contract.timeLock()
    const nextDripPossibleFrom = lastDrip.add(timeLock).toNumber() * 1000
    const now = new Date().getTime()

    if (now < nextDripPossibleFrom) {
      setCooldown({ isInCooldown: true, endOfCooldownInMs: nextDripPossibleFrom })
    } else {
      setCooldown({ isInCooldown: false })
    }
  }, [address, contract])

  const refreshState = useCallback(() => {
    if (!contract || chain?.unsupported) return

    getStatus()
    getCooldownStatus()
  }, [getStatus, getCooldownStatus, chain])

  useEffect(() => {
    refreshState()
  }, [refreshState])

  return { faucetStatus, cooldown, refreshState }
}
