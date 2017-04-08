import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var raddress = '0xe8379420436fa050643c8aa69a55767f76881afd';

var Registry = web3.eth
  .contract([{"constant":false,"inputs":[{"name":"description","type":"string"}],"name":"addOperationType","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"performer","type":"address"},{"name":"operation","type":"uint32"}],"name":"verifyOperation","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"operationTypes","outputs":[{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"performer","type":"address"},{"name":"rating","type":"uint8"},{"name":"description","type":"string"}],"name":"addPerformer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"touch","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint32"}],"name":"removeOperationType","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"performers","outputs":[{"name":"rating","type":"uint8"},{"name":"description","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"performer","type":"address"}],"name":"removePerformer","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}])
  .at(raddress);

console.log(Registry);
