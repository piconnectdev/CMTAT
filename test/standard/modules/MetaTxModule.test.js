const CMTAT = artifacts.require('CMTAT')
const MinimalForwarderMock = artifacts.require('MinimalForwarderMock')
const MetaTxModuleCommon = require('../../common/MetaTxModuleCommon')
const { ZERO_ADDRESS } = require('../../utils')

contract(
  'Standard - MetaTxModule',
  function ([
    _,
    admin,
    address1
  ]) {
    beforeEach(async function () {
      this.flag = 5
      this.trustedForwarder = await MinimalForwarderMock.new()
      this.trustedForwarder.initialize()
      this.cmtat = await CMTAT.new(this.trustedForwarder.address, false, admin, 'CMTA Token', 'CMTAT', 'CMTAT_ISIN', 'https://cmta.ch', ZERO_ADDRESS, 'CMTAT_info', this.flag, { from: admin })
    })

    MetaTxModuleCommon(admin, address1)
  }
)
