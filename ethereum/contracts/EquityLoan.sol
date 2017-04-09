pragma solidity ^0.4.0;

import "./EquityConstruction.sol";

contract EquityLoan {
    address public builder;
    address public equityConstructionAddress;

    uint public allFund;
    uint public availableFund;

    function EquityLoan(address _builder) payable {
        builder = _builder;
        allFund = msg.value;
        availableFund = 0;
    }

    function setEquityConstruction(address _equityConstructionAddress) isBuilder {
        equityConstructionAddress = _equityConstructionAddress;
    }

    function sendInvestion(uint investion) {
        if (msg.sender != equityConstructionAddress) throw;

        availableFund += investion;
    }

    function getInvestion(uint amount) isBuilder {
        if (amount > availableFund || amount > allFund) throw;

        builder.send(amount);
        availableFund -= amount;
        allFund -= amount;
    }

    function sendAgree(string passport, uint documentsHash) isBuilder {
        EquityConstruction ec = EquityConstruction(equityConstructionAddress);
        ec.agree(passport, documentsHash);
    }

    modifier isBuilder() {
        if (builder != msg.sender) throw;
        _;
    }
}
