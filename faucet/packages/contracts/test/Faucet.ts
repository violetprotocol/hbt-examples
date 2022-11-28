import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { HumanboundTokenGatedFaucet__factory, MockHBT__factory } from '../typechain-types'
import { BigNumber } from 'ethers'

const { utils } = ethers

const QUOTA_REACHED_ERROR = 'You reached your quota. Come back after the cooldown period.'
const HBT_OWNERSHIP_REQUIRED_ERROR = 'Unauthorized: Ownership of a Humanbound Token is required'

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployFaucetFixture() {
    const ONE_DAY_IN_SECS = 24 * 60 * 60

    const dripAmount = utils.parseEther('0.5')
    const timeLock = ONE_DAY_IN_SECS
    const initialBalance = utils.parseEther('10')

    // Contracts are deployed using the first signer/account by default
    const [owner, accountWithHBT] = await ethers.getSigners()

    // Deploy mock HBT
    const mockHBTFactory = new MockHBT__factory()
    const mockHBT = await mockHBTFactory.connect(owner).deploy()
    const hbtAddress = mockHBT.address

    // Mint a HBT to `accountWithHBT`
    await mockHBT.safeMint(accountWithHBT.address, BigNumber.from('1'))

    // Deploy Faucet
    const Faucet = new HumanboundTokenGatedFaucet__factory()
    const faucet = await Faucet.connect(owner).deploy(hbtAddress, dripAmount, timeLock, {
      value: initialBalance,
    })

    return { faucet, timeLock, dripAmount, owner, accountWithHBT, initialBalance, hbtAddress }
  }

  describe('Deployment', function () {
    it('Should set the right HBT Contract address', async function () {
      const { faucet, hbtAddress } = await loadFixture(deployFaucetFixture)

      expect(await faucet.hbtContract()).to.equal(hbtAddress)
    })

    it('Should set the right timeLock', async function () {
      const { faucet, timeLock } = await loadFixture(deployFaucetFixture)

      expect(await faucet.timeLockInSeconds()).to.equal(timeLock)
    })

    it('Should set the right dripAmount', async function () {
      const { faucet, dripAmount } = await loadFixture(deployFaucetFixture)

      expect(await faucet.dripAmount()).to.equal(dripAmount)
    })

    it('Should set the right owner', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)

      expect(await faucet.owner()).to.equal(owner.address)
    })

    it('Should return the contract balance', async function () {
      const { faucet, initialBalance } = await loadFixture(deployFaucetFixture)

      expect(await faucet.getBalance()).to.equal(initialBalance)
    })

    it('Should return the contract status', async function () {
      const { faucet, initialBalance, hbtAddress, dripAmount, timeLock } = await loadFixture(
        deployFaucetFixture,
      )
      const [initialBalance_, hbtAddress_, dripAmount_, timeLock_, ...rest] =
        await faucet.getStatus()

      expect(initialBalance_).to.eq(initialBalance)
      expect(hbtAddress_).to.eq(hbtAddress)
      expect(dripAmount_).to.eq(dripAmount)
      expect(timeLock_).to.eq(BigNumber.from(timeLock))
    })
  })

  describe('Deposits', function () {
    it('Should allow deposits', async function () {
      const { faucet, accountWithHBT, initialBalance } = await loadFixture(deployFaucetFixture)
      const depositAmount = utils.parseEther('1.53242')

      await accountWithHBT.sendTransaction({ to: faucet.address, value: depositAmount })

      expect(await faucet.getBalance()).to.equal(initialBalance.add(depositAmount))
    })
  })

  describe('Owner restricted actions', function () {
    it('Should let owners update the HBT Contract address', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)
      const newAddy = '0x41Be3A6C17cf76442d9E7B150de4870027D36f52'

      await faucet.connect(owner).updateHBTContractAddress(newAddy)

      expect(await faucet.hbtContract()).to.equal(newAddy)
    })

    it('Should ONLY let owners update the timeLock period', async function () {
      const { faucet, accountWithHBT } = await loadFixture(deployFaucetFixture)
      const newAddy = '0x41Be3A6C17cf76442d9E7B150de4870027D36f52'

      await expect(
        faucet.connect(accountWithHBT).updateHBTContractAddress(newAddy),
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('Should let owners update the timeLock period', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)
      const newTimeLock = 2 * 24 * 60 * 60

      await faucet.connect(owner).updateTimeLock(newTimeLock)

      expect(await faucet.timeLockInSeconds()).to.equal(newTimeLock)
    })

    it('Should ONLY let owners update the timeLock period', async function () {
      const { faucet, accountWithHBT } = await loadFixture(deployFaucetFixture)
      const newTimeLock = 2 * 24 * 60 * 60

      await expect(faucet.connect(accountWithHBT).updateTimeLock(newTimeLock)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      )
    })

    it('Should let owners update the dripAmount', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)
      const newDripAmount = utils.parseEther('0.1')

      await faucet.connect(owner).updateDripAmount(newDripAmount)

      expect(await faucet.dripAmount()).to.equal(newDripAmount)
    })

    it('Should ONLY let owners update the dripAmount', async function () {
      const { faucet, accountWithHBT } = await loadFixture(deployFaucetFixture)
      const newDripAmount = utils.parseEther('0.1')

      await expect(
        faucet.connect(accountWithHBT).updateDripAmount(newDripAmount),
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })

    describe('Withdrawals', function () {
      const withdrawalAmount = BigNumber.from(utils.parseEther('5'))

      it('Should let owners withdraw some', async function () {
        const { faucet, owner } = await loadFixture(deployFaucetFixture)

        const balanceBefore = await faucet.getBalance()

        await faucet.connect(owner).withdraw(withdrawalAmount)

        const balanceAfter = await faucet.getBalance()

        expect(balanceBefore.sub(withdrawalAmount)).to.eq(balanceAfter)
      })

      it('Should emit a Withdrawn event when withdrawing some', async function () {
        const { faucet, owner } = await loadFixture(deployFaucetFixture)

        expect(await faucet.connect(owner).withdraw(withdrawalAmount))
          .to.emit(faucet, 'Withdrawn')
          .withArgs(owner.address, withdrawalAmount)
      })

      it('Should ONLY let owners withdraw some', async function () {
        const { faucet, accountWithHBT } = await loadFixture(deployFaucetFixture)

        await expect(faucet.connect(accountWithHBT).withdraw(withdrawalAmount)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        )
      })

      it('Should let owners withdraw all', async function () {
        const { faucet, owner } = await loadFixture(deployFaucetFixture)

        await faucet.connect(owner).withdrawAll()

        const balanceAfter = await faucet.getBalance()

        expect(balanceAfter).to.eq(0)
      })

      it('Should emit a Withdrawn event when withdrawing all', async function () {
        const { faucet, owner, initialBalance } = await loadFixture(deployFaucetFixture)

        expect(await faucet.connect(owner).withdrawAll())
          .to.emit(faucet, 'Withdrawn')
          .withArgs(owner.address, initialBalance)
      })

      it('Should ONLY let owners withdraw all', async function () {
        const { faucet, accountWithHBT } = await loadFixture(deployFaucetFixture)

        await expect(faucet.connect(accountWithHBT).withdrawAll()).to.be.revertedWith(
          'Ownable: caller is not the owner',
        )
      })
    })
  })

  describe('Drip', function () {
    describe('Validations', function () {
      it('Should revert if the caller does not have an HBT', async function () {
        const { faucet, owner } = await loadFixture(deployFaucetFixture)

        // Call as owner which does not have an HBT
        await expect(faucet.connect(owner).drip()).to.be.revertedWith(HBT_OWNERSHIP_REQUIRED_ERROR)
      })

      it('Should revert if the contract does not have enough funds', async function () {
        const { faucet, owner, accountWithHBT } = await loadFixture(deployFaucetFixture)

        await faucet.connect(owner).withdrawAll()

        await expect(faucet.connect(accountWithHBT).drip()).to.be.revertedWith(
          'Failed to drip ETH. Is there enough funds?',
        )
      })

      it('Should revert when calling drip() during the time lock period', async function () {
        const { accountWithHBT, faucet } = await loadFixture(deployFaucetFixture)
        // 1st call
        await faucet.connect(accountWithHBT).drip()
        // 2nd call
        await expect(faucet.connect(accountWithHBT).drip()).to.be.revertedWith(QUOTA_REACHED_ERROR)
      })

      it("Shouldn't fail after the time lock", async function () {
        const { faucet, accountWithHBT, timeLock } = await loadFixture(deployFaucetFixture)

        await faucet.connect(accountWithHBT).drip()

        // Increase time by the timeLock value from the latest mined block
        await time.increase(timeLock)

        await expect(await faucet.connect(accountWithHBT).drip()).not.to.be.reverted
      })

      it('Should fail before the time lock ends', async function () {
        const { faucet, accountWithHBT, timeLock } = await loadFixture(deployFaucetFixture)

        await faucet.connect(accountWithHBT).drip()

        await time.increase(timeLock - 20)

        await expect(faucet.connect(accountWithHBT).drip()).to.be.revertedWith(QUOTA_REACHED_ERROR)
      })
    })

    it('Should drip the right amount', async function () {
      const { faucet, accountWithHBT, dripAmount, initialBalance } = await loadFixture(
        deployFaucetFixture,
      )

      const accountWithHBTBalanceBefore = await accountWithHBT.getBalance()

      const tx = await faucet.connect(accountWithHBT).drip()
      const receipt = await tx.wait()

      const accountWithHBTBalanceAfter = await accountWithHBT.getBalance()
      const faucetBalanceAfter = await faucet.getBalance()

      expect(accountWithHBTBalanceAfter).to.be.closeTo(
        accountWithHBTBalanceBefore.add(dripAmount).sub(receipt.cumulativeGasUsed),
        utils.parseEther('0.001'),
      )
      expect(faucetBalanceAfter).to.eq(initialBalance.sub(dripAmount))
    })

    it('Should emit a Dripped event', async function () {
      const { faucet, accountWithHBT, dripAmount } = await loadFixture(deployFaucetFixture)
      expect(await faucet.connect(accountWithHBT).drip())
        .to.emit(faucet, 'Dripped')
        .withArgs(accountWithHBT.address, dripAmount)
    })

    it('Should record the last drip', async function () {
      const { faucet, accountWithHBT } = await loadFixture(deployFaucetFixture)

      await faucet.connect(accountWithHBT).drip()
      const timestampOfLatestBlock = await time.latest()
      const lastDrip = await faucet.lastDrip(accountWithHBT.address)

      expect(lastDrip).to.eq(timestampOfLatestBlock)
    })
  })
})
