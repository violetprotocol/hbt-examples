import type { NextPage } from 'next'
import Link from 'next/link'
import toast from 'react-hot-toast'
import tw from 'twin.macro'
import { useNetwork, useSigner } from 'wagmi'
import Countdown from 'react-countdown'
import { HBTBalance } from '@components/HBTBalance'
import { CenterBody } from '@components/layout/CenterBody'
import { HumanboundTokenGatedFaucet__factory } from '@ethathon/contracts/typechain-types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDeployments } from '@shared/useDeployments'
import { useHbtBalance } from '@shared/useHbtBalance'
import { useHbtFaucet } from '@shared/useHbtFaucet'
import { SupportedNetworks } from '@components/SupportedNetworks'

const Button = tw.button`m-2 rounded-lg border border-current px-2 py-1 font-semibold text-xl text-white disabled:text-gray-400`

const HomePage: NextPage = () => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()
  const { chain } = useNetwork()
  const { hasHbt, hbtBalance, isLoading, isError } = useHbtBalance()
  const { faucetStatus, cooldown, refreshState } = useHbtFaucet()
  // TODO: could be cleaner
  const nativeToken = chain?.id === 80001 ? 'MATIC' : 'ETH'

  const getETH = async () => {
    if (!signer || !contracts) return
    const contract = HumanboundTokenGatedFaucet__factory.connect(
      contracts.HumanboundTokenGatedFaucet.address,
      signer,
    )
    try {
      const tx = await contract.drip()
      const receipt = await tx.wait()
      console.log('Drip successful: ', receipt)
    } catch (e: unknown) {
      console.error(e)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const message = e?.data?.message
      if (message) {
        toast.error(message)
      } else {
        toast.error('Error while trying to get ETH')
      }
    } finally {
      refreshState()
    }
  }

  return (
    <>
      <CenterBody>
        {/* Title */}
        <div tw="flex flex-col items-center text-center">
          <h1 tw="mb-8 font-bold text-3xl tracking-tight">
            Multi-network Faucet For Humanbound Token Holders
          </h1>
          <SupportedNetworks />
          <p tw="mt-1">
            To prevent spam attacks draining the faucet, your address must own a Humanbound Token.
          </p>
          <p tw="mt-1">
            Head over{' '}
            <Link href="https://sandbox.humanbound.xyz/">
              <span tw="underline decoration-white decoration-solid underline-offset-4">here</span>
            </Link>{' '}
            to get one.
          </p>
          <div tw="mt-14 mb-8">
            <HBTBalance
              isError={isError}
              isLoading={isLoading}
              hbtBalance={hbtBalance?.toString()}
            />
          </div>
          {cooldown?.isInCooldown && (
            <div tw="mb-8">
              You reached your quota! Please come back in{' '}
              <Countdown date={cooldown?.endOfCooldownInMs} />
            </div>
          )}
        </div>

        {/* Rainbowkit Connect Button */}
        <ConnectButton />

        {signer && (
          <div tw="mt-6 flex flex-col items-center">
            <Button tw="mb-6" disabled={!hasHbt || cooldown?.isInCooldown} onClick={() => getETH()}>
              GET {nativeToken}
            </Button>
            {faucetStatus?.formattedBalance && (
              <div tw="text-sm">
                Funds left: {faucetStatus?.formattedBalance} {nativeToken}
              </div>
            )}
          </div>
        )}
      </CenterBody>
    </>
  )
}

export default HomePage