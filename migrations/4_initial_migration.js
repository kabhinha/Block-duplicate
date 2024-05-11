const EHRSupplychain = artifacts.require("EHRSupplychain.sol");

module.exports = function(deployer) {
  deployer.deploy(EHRSupplychain);
};
