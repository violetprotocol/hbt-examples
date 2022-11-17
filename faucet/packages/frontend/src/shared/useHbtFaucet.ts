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
  formattedBalance: string | null
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
  const timeLockAsString = faucetStatus?.timeLockInSeconds.toString()

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
    console.log('status', status)
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
    console.log('called cooldown')
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
  }, [address, contract, timeLockAsString])

  const refreshState = useCallback(() => {
    if (!contract || chain?.unsupported) return

    getStatus()
      .then(() => {
        getCooldownStatus()
      })
      .catch((e) => console.error(e))
  }, [getStatus, getCooldownStatus, chain])

  useEffect(() => {
    refreshState()
  }, [refreshState])

  return { faucetStatus, cooldown, refreshState }
}
