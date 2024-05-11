const PharmaCeuticalChain = artifacts.require("PharmaChain.sol");

module.exports = function(deployer) {
  deployer.deploy(PharmaCeuticalChain);
};
