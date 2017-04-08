var Registry = artifacts.require("./Registry.sol");
var Auto = artifacts.require("./Auto.sol");

module.exports = function(deployer) {
  deployer.deploy(Registry).then(function() {
    return deployer.deploy(Auto, Registry.address, "qwerty12345", {from: web3.eth.accounts[1]});
  });
};
