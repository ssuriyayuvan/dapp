const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");

    const setGreetingName = await greeter.setGreeting("hello suriya");

    await setGreetingName.wait();

    expect(await greeter.greet()).to.equal("hello suriya");
  });
});

describe("User", async ()=> {
  const Greeter = await ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy("hello");
  await greeter.deployed();
  it("should return type array", async ()=> {
    const getUser = await greeter.returnUsers();
    console.log('getUser', getUser)
    expect(getUser).to.eql([])
  });

  await greeter.addUser('suriya',10);
  await greeter.addUser('solidity',14);
  const getUser = await greeter.returnUsers();
  console.log('getUser', getUser)


})
