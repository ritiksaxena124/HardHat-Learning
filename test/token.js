const { expect } = require("chai");

/*
describe("Token contract", function () {
  it("Deployment should assign total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    console.log("Signers object: ", owner);

    const Token = await ethers.getContractFactory("Token"); // instance of contract

    const hardhatToken = await Token.deploy(); // deploy contract

    const ownerBalance = await hardhatToken.balanceOf(owner.address); // ownerBalance = 1000
    console.log("Owner Address:", owner.address);

    expect(await hardhatToken.totalTokens()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const [owner, add1, add2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();

    // Transfer 10 tokens from owner to add1
    await hardhatToken.transferToken(add1.address, 10);
    expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);

    // Transfer 5 tokens from add1 to add2
    await hardhatToken.connect(add1).transferToken(add2.address, 5);

    expect(await hardhatToken.balanceOf(add2.address)).to.equal(5);
  });
});
*/
describe("Test Token contract", function () {
  let Token;
  let owner;
  let hardhatToken;
  let addr1, addr2, addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", async function () {
    it("Owner Set", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Supply Transferred", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalTokens()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", async function () {
    it("Tokens transfer from owner to Account", async function () {
      await hardhatToken.transferToken(addr1.address, 5);
      const add1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(add1Balance).to.equal(5);
    });

    it("Tokens transfer from acc-1 to acc-2", async function () {
      await hardhatToken.transferToken(addr1.address, 5);
      await hardhatToken.connect(addr1).transferToken(addr2.address, 5);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(5);
    });
  });
});
