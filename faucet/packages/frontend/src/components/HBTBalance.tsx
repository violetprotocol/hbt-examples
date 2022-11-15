import { FC } from 'react'
import 'twin.macro'

export type HBTBalanceProps = {
  isLoading: boolean
  isError: boolean
  hbtBalance: string | undefined
}

export const HBTBalance: FC<HBTBalanceProps> = ({ isError, isLoading, hbtBalance }) => {
  if (hbtBalance) {
    return <p>Your HBT Balance: {hbtBalance}</p>
  } else if (isError) {
    return <p>An error occured while fetching your HBT balance.</p>
  } else {
    return <p></p>
  }
}
