var GlobalEvent = artifacts.require("./GlobalEvent.sol");

contract('GlobalEvent', function(accounts) {
  var c = GlobalEvent.deployed();

  it("events", function() {
    c.then(i => i.createEvent("test://url", {from: accounts[0]}));
    c.then(i => i.createEvent("test://url2", {from: accounts[0]}));

    c.then(i => i.getEvents({from: accounts[0]}))
      .then(es => {
        assert.equal(es.length, 2);

        eventId = es[0].toNumber();
        c.then(i => i.getEvent(eventId))
        .then(e => {
          assert.equal(e[0], accounts[0]);
          assert.equal(e[1], "test://url");
          assert.equal(e[2].length, 0);
          assert.equal(e[3], true);
        })
    });
  });

  it("halls", function() {
    c.then(i => i.getEvents({from: accounts[0]}))
      .then(es => {

        eventId = es[0].toNumber();
        c.then(i => i.addHall(eventId, 500, web3.toWei(10, "ether"), {from: accounts[0]}))
        c.then(i => i.addHall(eventId, 50, 3000, {from: accounts[0]}))
        c.then(i => i.addHall(eventId, 100, web3.toWei(2, "ether"), {from: accounts[0]}))

        c.then(i => i.getEvent(eventId))
        .then(e => {
          var hallId = e[2][1].toNumber();

          c.then(i => i.getHall(hallId))
          .then(h => {
            assert.equal(h[0].toNumber(), 50);
            assert.equal(h[1].toNumber(), 0);
            assert.equal(h[2].toNumber(), 3000);
          })
        })
    });
  });
});
