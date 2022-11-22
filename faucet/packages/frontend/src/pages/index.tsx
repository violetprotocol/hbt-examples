import type { NextPage } from 'next'
import Link from 'next/link'
import toast from 'react-hot-toast'
// This import of tw is needed
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
import { Spinner } from '@components/Spinner'
import { Button } from '@components/Button'

const HomePage: NextPage = () => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()
  const { chain } = useNetwork()
  const [currentChainId, setCurrentChainId] = useState(chain?.id)
  const { hasHbt, hbtBalance, isLoading, isError } = useHbtBalance()
  const { faucetStatus, cooldown, getCooldownStatus, getStatus } = useHbtFaucet()
  const [isDrippingNativeToken, setIsDrippingNativeToken] = useState(false)
  const [isDrippingERC20, setIsDrippingERC20] = useState(false)
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
    try {
      setIsDrippingNativeToken(true)
      const contract = HumanboundTokenGatedFaucet__factory.connect(
        contracts.HumanboundTokenGatedFaucet.address,
        signer,
      )
      const tx = await contract.dripNativeTokens()
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
      setIsDrippingNativeToken(false)
      await getCooldownStatus()
    }
  }

  const getTestUSDC = async () => {
    if (!signer || !contracts) return
    try {
      setIsDrippingERC20(true)
      const contract = HumanboundTokenGatedFaucet__factory.connect(
        contracts.HumanboundTokenGatedFaucet.address,
        signer,
      )
      const tx = await contract.dripERC20Tokens()
      const receipt = await tx.wait()
      console.log('ERC20 Drip successful: ', receipt)
    } catch (e: unknown) {
      console.error(e)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const message = e?.data?.message
      if (message) {
        toast.error(message)
      } else {
        toast.error('Error while trying to get Test USDC')
      }
    } finally {
      setIsDrippingERC20(false)
      await getStatus()
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
            In order to get {nativeToken}, <b>your address must own a Humanbound Token</b> (this
            doesn&lsquo;t apply for Test USDC).
          </p>
          <p tw="mt-2">
            Head over{' '}
            <Link href="https://sandbox.humanbound.xyz/">
              <StyledLinkContent>here</StyledLinkContent>
            </Link>{' '}
            to get one.
          </p>
          <div tw="mt-14 mb-8 flex flex-col items-center">
            {/* Rainbowkit Connect Button */}
            <ConnectButton />
            <HBTBalance isError={isError} isLoading={isLoading} hbtBalance={hbtBalance} tw="mt-4" />
          </div>
        </div>

        {signer && !chain?.unsupported && (
          <div tw="mt-14 flex">
            <div id="left-container" tw="flex flex-1 flex-col justify-start px-12 text-center">
              <Button
                tw="mx-auto mb-6"
                disabled={!hasHbt || cooldown?.isInCooldown}
                onClick={() => getETH()}
              >
                {cooldown?.isInCooldown ? (
                  <Countdown date={cooldown?.endOfCooldownInMs} />
                ) : isDrippingNativeToken ? (
                  <Spinner />
                ) : (
                  <>GET {nativeToken}</>
                )}
              </Button>

              <div tw="max-w-lg">
                {faucetStatus?.formattedNativeTokenDripAmount && faucetStatus.timeLockInSeconds && (
                  <div tw="mb-4">
                    Dripping {faucetStatus.formattedNativeTokenDripAmount} {nativeToken} with a
                    cooldown period of {formatSeconds(faucetStatus.timeLockInSeconds?.toNumber())}.
                  </div>
                )}
                {faucetStatus?.formattedBalance && (
                  <div>
                    Funds left: {faucetStatus?.formattedBalance} {nativeToken}
                  </div>
                )}
              </div>
            </div>
            <div id="right-container" tw="flex flex-1 flex-col justify-start px-12 text-center">
              <Button tw="mx-auto mb-6" onClick={() => getTestUSDC()}>
                {isDrippingERC20 ? <Spinner /> : 'Get tUSDC'}
              </Button>
              <div tw="max-w-lg">
                {faucetStatus?.formattedErc20TokenDripAmount && (
                  <>
                    Dripping {faucetStatus?.formattedErc20TokenDripAmount} Test USDC (ERC20) with no
                    cooldown period. No HBT required.
                  </>
                )}
                {faucetStatus?.erc20ContractAddress && (
                  <div tw="mt-4">Test USDC contract: {faucetStatus?.erc20ContractAddress}</div>
                )}
              </div>
            </div>
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
