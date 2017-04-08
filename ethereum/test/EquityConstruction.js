var EquityConstruction = artifacts.require("./EquityConstruction.sol");
var EquityLoan = artifacts.require("./EquityLoan.sol");

contract('EquityConstruction', function(accounts) {
  var c = EquityConstruction.deployed();
  var cc = EquityLoan.deployed();

  console.log(accounts)

  it("bank addess", function() {
    return c.then(i => i.bank()).then(i => assert.equal(i, accounts[0]));
  });

  it("tax", function() {
    return c.then(i => i.tax()).then(i => i.toNumber()).then(i => assert.equal(i, web3.toWei(1, "ether")));
  });

  it("set construction", function() {
    return c.then(i => i.address).then(i => {
      console.log(i);
      cc.then(i => i.setEquityConstruction(i, {from: accounts[1]}));
    })
  });

  it("set loan", function() {
    return cc.then(i => i.address).then(i => {
      console.log(i);
      c.then(i => i.setLoan(i));
    });
  });

  it("construction", function() {
    return c.then(i => i.loanAddress()).then(i => {
      console.log(i);
    })
  });

  it("loan", function() {
    return cc.then(i => i.equityConstructionAddress()).then(i => {
      console.log(i);
    })
  });
});
