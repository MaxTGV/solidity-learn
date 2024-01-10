import { expect } from "chai"
import { deployments, ethers } from "hardhat"
import { HelloWorldContract } from "../typechain"

describe("HelloWorldContract unit tests", function () {
    let signers: SignerWithAddress[]
    let helloWorld: HelloWorldContract

    beforeEach(async () => {
        signers = await ethers.getSigners()
        const [deployer] = await ethers.getSigners()

        const helloWorldFactory = await ethers.getContractFactory("HelloWorldContract")
        helloWorld = await helloWorldFactory.connect(deployer).deploy()
    })

    it("helloWorld must return Hello, Ethereum!", async function () {
        expect(await helloWorld.helloWorld()).to.be.eq("Hello, Ethereum!")
    })

    it("getNumber must return zero", async function () {
        expect(await helloWorld.getNumber()).to.be.eq(0)
    })

    it("setNumber must set number to 100", async function () {
        await helloWorld.setNumber(100)
        expect(await helloWorld.getNumber()).to.be.eq(100)
    })
})
