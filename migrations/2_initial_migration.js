const HealthRecordSystem = artifacts.require("HealthRecordSystem.sol");

module.exports = function(deployer) {
  deployer.deploy(HealthRecordSystem);
};
