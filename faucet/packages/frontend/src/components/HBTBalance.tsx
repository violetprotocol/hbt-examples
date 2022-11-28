import { BigNumber } from 'ethers'
import { FC } from 'react'
import 'twin.macro'

export type HBTBalanceProps = {
  isLoading: boolean
  isError: boolean
  hbtBalance: BigNumber | undefined
}

export const HBTBalance: FC<HBTBalanceProps> = ({ isError, isLoading, hbtBalance, ...props }) => {
  const renderText = () => {
    if (hbtBalance?.gt(0)) {
      return `Your currently connected address owns a HBT!`
    } else if (hbtBalance?.eq(0)) {
      return `Your currently connected address does not own a HBT.`
    } else if (!hbtBalance || isError) {
      return 'An error occured while fetching your HBT balance.'
    } else {
      return ''
    }
  }

  return <p {...props}>{renderText()}</p>
}
