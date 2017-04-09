pragma solidity ^0.4.0;

import "./EquityLoan.sol";

contract EquityConstruction {
    address public bank;
    address public loanAddress;
    uint public fund;
    uint public tax;

    uint32 userCount;
    uint32 userConsentCount;

    mapping (address => uint) userInvests;
    mapping (address => bool) userConsents;
    mapping (string => uint) documentHashs;

    function EquityConstruction(uint _tax) {
        bank = msg.sender;
        tax = _tax;
        fund = 0;
    }

    function invest() payable {
        if (msg.value == 0 || loanAddress == address(0x0)) throw;

        userInvests[msg.sender] = msg.value;
        fund += msg.value;
        userCount++;

        EquityLoan el = EquityLoan(loanAddress);
        el.sendInvestion(msg.value - tax);
    }

    function agree(string passport, uint documentsHash) {
        if (msg.sender != loanAddress) throw;

        documentHashs[passport] = documentsHash;
        userConsentCount++;
    }

    function checkAgreement(string passport, uint documentsHash) constant returns (bool, bool) {
        uint hash = documentHashs[passport];
        if (hash == uint(0x0)) return (false, false);
        else if (hash == documentsHash) return (true, true);
        else return (true, false);
    }

    function setLoan(address _loanAddress) {
        loanAddress = _loanAddress;
    }

    function finish() isBank {
        if (userConsentCount < userCount / 3 * 2) throw;
        bank.send(fund);
    }

    modifier isBank() {
        if (bank != msg.sender) throw;
        _;
    }
}
