import React, { Component } from 'react';
import Web3 from 'web3';

class App extends Component {
  render() {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var registryAddress = '0xe8379420436fa050643c8aa69a55767f76881afd';
    var autoAddress = '0x9712ed53de5b9296f75df2d363ea0f27c1735166';
    var registryAbi = [{"constant":false,"inputs":[{"name":"description","type":"string"}],"name":"addOperationType","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"performer","type":"address"},{"name":"operation","type":"uint32"}],"name":"verifyOperation","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"operationTypes","outputs":[{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"performer","type":"address"},{"name":"rating","type":"uint8"},{"name":"description","type":"string"}],"name":"addPerformer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"touch","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint32"}],"name":"removeOperationType","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"performers","outputs":[{"name":"rating","type":"uint8"},{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"performer","type":"address"}],"name":"removePerformer","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
    var autoAbi = [{"constant":false,"inputs":[{"name":"id","type":"uint32"},{"name":"notes","type":"string"}],"name":"makeOperation","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOperationsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"makePrivate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint32"}],"name":"getOperation","outputs":[{"name":"","type":"uint32"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"touch","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"r","type":"address"}],"name":"setRegistry","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"hidden","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"makePublic","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"r","type":"address"},{"name":"_id","type":"string"}],"payable":false,"type":"constructor"}];

    var Registry = web3.eth.contract(registryAbi).at(registryAddress);
    var Auto = web3.eth.contract(autoAbi).at(autoAddress);

    var performer = Registry.performers(web3.eth.accounts[4]);
    performer[0] = performer[0].toString(10);
    console.log(performer);
    console.log(Auto.registry());

    return <div></div>;
  }
}

export default App;
