# Multi-network Faucet protected by Humanbound Tokens

![Typescript](https://img.shields.io/badge/Typescript-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-yellow)
![Next.js](https://img.shields.io/badge/Next.js-gray)
![Tailwind](https://img.shields.io/badge/Tailwind-pink)

This faucet provides ETH / MATIC used on test networks such as Optimism Goerli, Arbitrum Goerli, Polygon Mumbai...
<br/>
A "mock ERC20 contract" can also be plugged to this faucet to distribute a certain amount of test ERC20 tokens.

In order to avoid Sybil attacks, which would drain the faucet, addresses that wish to claim test ETH/MATIC are required to hold a [Humanbound Token](https://humanbound.xyz/). When claiming, the timestamp associated with the transaction is recorded on-chain by address (as `lastDrip`). This allows us to enforce a cooldown period, preventing addresses to claim ETH/MATIC too frequently.


The amount of native tokens, ERC20 tokens to drip as well as the cooldown time are all configurable (see `Faucet.sol`).


The network supported are defined as environment variable by `NEXT_PUBLIC_SUPPORTED_CHAINS`

## Getting Started

```bash
# Install pnpm
npm i -g pnpm

# Install dependencies
pnpm install

# Copy & fill environments
cp packages/frontend/.env.local.example packages/frontend/.env.local
cp packages/contracts/.env.example packages/contracts/.env
```


```bash
# Generate contract-types, start local hardhat node, and start frontend with turborepo
pnpm dev

# Only start frontend
pnpm frontend:dev
```

## Deployments

This app uses hardhat-deploy.
To deploy run one of the commands:
```bash
 pnpm deploy:<network>
```

This will populate the `packages>contracts>deployments` with the details of the deployment, including the address the contract was deployed to.
⚠️ Re-deploying will override these files. ⚠️


## Credit
- [Ethathon Boilerplate](https://github.com/scio-labs/ethathon)