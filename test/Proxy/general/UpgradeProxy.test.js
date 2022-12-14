const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const { should } = require("chai").should();

const {
  deployProxy,
  upgradeProxy,
  erc1967,
} = require("@openzeppelin/truffle-upgrades");
const CMTAT1 = artifacts.require("CMTATV1");
const CMTAT2 = artifacts.require("CMTAT");

contract("UpgradeableCMTAT - Proxy", function ([_, owner, address1]) {
  it("should increment the balance value", async function () {
    // With the first version of CMTAT
    this.upgradeableCMTATInstance = await deployProxy(
      CMTAT1,
      [owner, _, "CMTA Token", "CMTAT", "CMTAT_ISIN", "https://cmta.ch"],
      { initializer: "initialize", constructorArgs: [] }
    );
    (
      await this.upgradeableCMTATInstance.balanceOf(owner)
    ).should.be.bignumber.equal("0");
    const implementationContractAddress1 = erc1967.getImplementationAddress(
      this.upgradeableCMTATInstance.address,
      {
        from: owner,
      }
    );

    // Issue 20 and check balances and total supply
    ({ logs: this.logs1 } = await this.upgradeableCMTATInstance.mint(
      address1,
      20,
      {
        from: owner,
      }
    ));
    (
      await this.upgradeableCMTATInstance.balanceOf(address1)
    ).should.be.bignumber.equal("20");
    (
      await this.upgradeableCMTATInstance.totalSupply()
    ).should.be.bignumber.equal("20");

    // With the new version
    // With the first version of CMTAT
    this.upgradeableCMTATV2Instance = await upgradeProxy(
      this.upgradeableCMTATInstance.address,
      CMTAT2,
      { constructorArgs: [] }
    );
    // Get the new implementation contract address
    const implementationContractAddress2 = erc1967.getImplementationAddress(
      this.upgradeableCMTATInstance.address,
      {
        from: owner,
      }
    );
    // The address of the implementation contract has changed
    implementationContractAddress1.should.not.be.equal(
      implementationContractAddress2
    );

    (
      await this.upgradeableCMTATV2Instance.balanceOf(address1)
    ).should.be.bignumber.equal("20");

    // Issue 20 and check balances and total supply
    ({ logs: this.logs1 } = await this.upgradeableCMTATV2Instance.mint(
      address1,
      20,
      {
        from: owner,
      }
    ));
    (
      await this.upgradeableCMTATV2Instance.balanceOf(address1)
    ).should.be.bignumber.equal("40");
    (
      await this.upgradeableCMTATV2Instance.totalSupply()
    ).should.be.bignumber.equal("40");
  });
});
