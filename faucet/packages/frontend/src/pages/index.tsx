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
import { formatSeconds } from '@shared/formatSeconds'
import { useEffect, useState } from 'react'
import { Footer } from '@components/layout/Footer'
import { StyledLinkContent } from '@components/StyledLink'

const Button = tw.button`m-2 rounded-lg border border-current px-2 py-1 font-semibold text-xl text-white disabled:text-gray-400`

const HomePage: NextPage = () => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()
  const { chain } = useNetwork()
  const [currentChainId, setCurrentChainId] = useState(chain?.id)
  const { hasHbt, hbtBalance, isLoading, isError } = useHbtBalance()
  const { faucetStatus, cooldown, getCooldownStatus } = useHbtFaucet()
  // TODO: could be cleaner
  const nativeToken = chain?.id === 80001 ? 'MATIC' : 'ETH'

  useEffect(() => {
    if (!currentChainId && chain?.id) {
      setCurrentChainId(chain.id)
    } else if (chain?.id !== currentChainId) {
      window.location.reload()
    }
  }, [chain?.id])

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
      await getCooldownStatus()
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
          <Link tw="mt-8" href="https://docs.humanbound.xyz/" target="_blank">
            <span tw="text-pink-400 underline underline-offset-2">
              What&lsquo;s a Humanbound Token?
            </span>
          </Link>
          <p tw="mt-2">
            To prevent spam attacks draining the faucet,{' '}
            <b>your address must own a Humanbound Token</b>.
          </p>
          <p tw="mt-2">
            Head over{' '}
            <Link href="https://sandbox.humanbound.xyz/">
              <StyledLinkContent>here</StyledLinkContent>
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
            <Button tw="mb-7" disabled={!hasHbt || cooldown?.isInCooldown} onClick={() => getETH()}>
              GET {nativeToken}
            </Button>
            <>
              {faucetStatus?.formattedDripAmount && faucetStatus.timeLockInSeconds && (
                <div tw="mb-2">
                  This faucet allows you to get {faucetStatus.formattedDripAmount} {nativeToken}{' '}
                  with a cooldown period of{' '}
                  {formatSeconds(faucetStatus.timeLockInSeconds?.toNumber())}.
                </div>
              )}
              {faucetStatus?.formattedBalance && (
                <div>
                  Funds left: {faucetStatus?.formattedBalance} {nativeToken}
                </div>
              )}
            </>
          </div>
        )}
      </CenterBody>
      <Footer>
        <div tw="my-6 text-center">
          Disclaimer: No warranty is made of any kind. See more{' '}
          <Link href="https://github.com/violetprotocol/hbt-examples/blob/main/faucet/LICENSE.md">
            <StyledLinkContent>here</StyledLinkContent>
          </Link>
          .
        </div>
      </Footer>
    </>
  )
}

export default HomePage
