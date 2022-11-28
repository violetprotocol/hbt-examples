import { FC } from 'react'
import 'twin.macro'
import { env } from '@shared/environment'
import { networks } from 'config/networks'

const isKnownNetwork = (chainId: number): chainId is keyof typeof networks => {
  return Object.keys(networks).includes(chainId.toString())
}

export const SupportedNetworks: FC = () => {
  if (!env.supportedChains) return null

  const supportedChains = env.supportedChains.reduce((prev, id) => {
    if (isKnownNetwork(id)) {
      prev.push(networks[id].name)
    }

    return prev
  }, [] as string[])

  return <div tw="mb-2">Supported Networks: {supportedChains.join(', ')}</div>
}
