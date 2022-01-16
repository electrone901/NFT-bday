// const MyCommunity = artifacts.require('Community')
// const MyRandom = artifacts.require('Random')
const BirthdayCard = artifacts.require('BirthdayCard')

module.exports = function (deployer) {
  deployer.deploy(BirthdayCard)
  // deployer.deploy(MyRandom)
}
