const CMTAT = artifacts.require('CMTAT')
const PauseModuleCommon = require('../../common/PauseModuleCommon')
const { ZERO_ADDRESS } = require('../../utils')
contract(
  'Standard - PauseModule',
  function ([_, admin, address1, address2, address3]) {
    beforeEach(async function () {
      this.flag = 5
      this.cmtat = await CMTAT.new(_, false, admin, 'CMTA Token', 'CMTAT', 'CMTAT_ISIN', 'https://cmta.ch', ZERO_ADDRESS, 'CMTAT_info', this.flag, { from: admin })
      // Mint tokens to test the transfer
      await this.cmtat.mint(address1, 20, {
        from: admin
      })
    })

    PauseModuleCommon(admin, address1, address2, address3)
  }
)
