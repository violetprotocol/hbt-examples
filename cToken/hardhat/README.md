# cERC20: Compliant ERC20 Token

This example project implements a basic "compliant" ERC20 token using Humanbound.

It follows all known ERC20 token lifecycles with burning and minting but restricts ownership of the token to only accounts that also own a HumanboundToken. Since the HumanboundToken comes with guarantees of the underlying human being sanction-list compliant, we are able to ensure that any owners of cTokens are also compliant, providing a unique regulatory guarantee of cleanliness.

In this way we can underpin a segregation of DeFi that can be clearly delineated between compliant DeFi (cDeFi) that uses cTokens, and permissionless DeFi that does not have such guarantees.

## Features

Minting recipients are restricted only to Humanbound Token holders.

Transfer senders and recipients are restricted only to Humanbound Token holders. This prevents non HBT holders from being able to own the cToken or for those that have acquired cTokens whilst having a HBT prevents them from being able to transfer them if they no longer have the HBT. Users will have to re-obtain a HBT by proving their compliance before being able to transfer their cTokens. In effect their assets are 'frozen'.

Additionally, we have mapped a wrapping flow where a non-compliant ERC20 token can be converted to a compliant analogue, where a Humanbound token holder, who is verified to be compliant, owns some normal ERC20 tokens, and passes them through the wrapping flow, resulting in the creation of some cERC20.

For demonstration purposes we have included both the minting/burning and the wrapping/unwrapping features in the same contract implementation, but in practice these should remain separate to more easily manage the tokens.

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
```
