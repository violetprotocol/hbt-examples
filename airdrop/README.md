# Sybil-resistant Airdrop with Humanbound Tokens

This is a proof of concept of an airdrop with Sybil-resistance built-in. Leveraging [Humanbound Tokens](https://humanbound.xyz/), it
allows administrators to set a limit on the number of eligible addresses one single human can claim an airdrop for.

This airdrop was designed to work in 2 phases: a registration period and a claiming period.

During the registration period, any address holding a Humanbound Token can register up to X eligible addresses (X being a number that can be configured in `shared -> config -> sharedConfig.ts`) for the airdrop. These addresses get added to a database along with how much token they’re entitled to claim. Signatures from both the HBT-holding address (via SIWE) and the future airdrop recipient need to be provided for a registration to complete.

Once the registration period is closed, the “administrator” generates a Merkle tree with all these registered addresses and their respective amount. The ERC20MerkleDrop smart contract is then deployed with the root of this Merkle tree.

Then, the claiming period begins. The frontend exposes a new page where users can claim their airdrop. Users can connect with an address which was registered, receive a Merkle proof from the backend and submit it to claim their airdrop.

## Notes

- The security of the system relies heavily on the entries in the database, containing addresses and amounts, being correct at the time of creation of the Merkle tree.
  If the database is compromised, an attacker could insert claims with their addresses and arbitrary amounts of token.
- The backend provides an endpoint to retrieve a Merkle proof out of convenience. The Merkle tree could very well be made public. This way users could construct their own proofs and potentially interact with the smart contract directly.

# Testing locally

## Requirements

It's required that you have `yarn` installed. If you don't, simply run `npm i -g yarn`.

Additionally, an instance of MongoDB should be running locally on `"mongodb://localhost:27017`.

If you don't have MongoDB installed, please install it locally.


<details>
<summary>Mac OS installation steps with Homebrew</summary>
Run the following commands:
<br/>
<code style="white-space:nowrap;">brew tap mongodb/brew</code>
<br/>
<code style="white-space:nowrap;">brew update</code>
<br/>
<code style="white-space:nowrap; margin-top: 2px;">brew install mongodb-community@6.0</code>
<br/><br/>
Start mongo with:
<code style="white-space:nowrap;">brew services start mongodb-community@6.0</code>
<br/>
</details>
<br/>
<details>
<summary>Alternative installation</summary>
Follow the instructions here: https://www.mongodb.com/docs/manual/installation/
</details>

<br/>

## Setup

At the root of the project, install all the dependencies:

```
yarn install
```

Let’s make sure the types generated by typechain (smart contract typing) are copied in the backend and frontend. Inside the `hardhat` folder, run:

```solidity
yarn run typechain
```

Then, you can run the backend, frontend, and local blockchain node all from 1 single terminal instance.
To do so, run the following command from the project's root directory.

```bash
yarn dev
```

This uses a package called `concurrently` that allows you to concurrently run all instances from a single terminal.

Once the app is running, you can view at:

- Frontend [http://localhost:3000](http://localhost:3000/)
- Backend [http://localhost:5000](http://localhost:5000/)

It also starts a [local network with Hardhat](https://hardhat.org/hardhat-network/docs/overview). You can connect to it via Metamask using this RPC url: [`http://127.0.0.1:8545`](http://127.0.0.1:8545/)

You'll need funds for your address to interact with the smart contracts locally, so in the `hardhat` folder run:

```bash
npx hardhat --network localhost fund --to <your-address>
```

Now in the same folder, deploy the mock Humanbound Token contract by running:

```bash
npx hardhat run --network localhost scripts/deploy-mock-hbt.ts
```

This will print out the address the mock HBT contract is deployed to. Make sure it’s the same in `shared > config > hbtContracts` for `Web3ChainReference.EIP155_HARDHAT_LOCAL`.

We’re ready to go! 🚀

## Phase 1: Registration

### 1.1 Getting an HBT

Go to the hidden page [http://localhost:3000/mint-hbt](http://localhost:3000/mint-hbt) 🤫  to mint yourself a “mock HBT”.
Note: This mock HBT is a simple ERC721 token contract which provides the interface necessary for this demo. In reality, HBTs are not so easily transferable and unique to a human.

### 1.2 Address regisration

Now it’s time to register some addresses for the airdrop!

In order to demonstrate the concept of Sybil resistance, the project is configured such that **any address** is eligible to a minimum of  5 tokens. (This value can be changed in shared → config → sharedConfig.ts)

Click on “Register” in the Nav bar to head over to http://localhost:3000/eligible.

Follow the instructions to register some addresses.

### 1.3 Merkle tree generation

Next, we can generate the merkle tree. In the backend folder run:

```bash
yarn generate-merkle-tree
```

This should save a file called `merkle.json` at the root of the `shared` folder.

### 1.4 Deployment

Then, deploy the smart contract with the tokens to aidrop. In the `hardhat` folder run

```bash
npx hardhat run --network localhost scripts/deploy-merkle-drop.ts
```

This outputs the address the contract was deployed. Make sure the same address is provided in `shared > config > sharedConfig` as `merkleDropContractAddress`.

## Phase 2: Claiming

### 2.0 Start the claiming phase

Enable the “claiming phase” by changing the value of `NEXT_PUBLIC_CLAIMING_PERIOD_STARTED` to “true” in `frontend > .env`.

### 2.1 Claiming tokens

Thanks to Next.js fast refresh feature, the frontend should automatically refresh and a new page at [`http://localhost:3000/claim`](http://localhost:3000/claim) should now be accessible.

Click on the “claim” button and submit the transaction to claim an airdrop.

And voilà!

## Troubleshooting

- Balances appearing incorrect

⇒ Switch network on your wallet and switch back to the local network.

- "Received invalid block tag X. Latest block number is Y”

⇒ Switch network with your wallet and switch back to the local network. See [this answer](https://ethereum.stackexchange.com/a/112214).

- Issue with nonces

⇒ Enable custom nonces in Metamask and manually enter the right nonce value when submitting a transaction.

# Credits

- [create-ether-dapp](https://github.com/adriandelgg/create-ether-dapp)
- [nft-merkle-drop](https://github.com/OpenZeppelin/workshops/tree/master/06-nft-merkle-drop)
- [merkle-airdrop-starter](https://github.com/Anish-Agnihotri/merkle-airdrop-starter)
