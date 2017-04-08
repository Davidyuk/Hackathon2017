pragma solidity ^0.4.0;

contract Conference { 
  address public organizer;
  mapping (address => uint) public registrantsPaid;
  uint public numRegistrants;
  uint public quota;
  // so you can log these events
  event Deposit(address _from, uint _amount); 
  event Refund(address _to, uint _amount);
  
  function Conference() { // Constructor
    organizer = msg.sender;
    quota = 500;
    numRegistrants = 0;
  }
  function buyTicket() payable returns (bool success) { 
    if (numRegistrants >= quota) { throw; } // see footnote
     registrantsPaid[msg.sender] = msg.value;
     numRegistrants++;
     Deposit(msg.sender, msg.value);
     return true;
  }
  function changeQuota(uint newquota) {
    if (msg.sender != organizer) { throw; }
    quota = newquota;
  }
  function refundTicket(address recipient, uint amount) {
    if (msg.sender != organizer) { throw; }
    if (registrantsPaid[recipient] == amount) {
      address myAddress = this;
      if (myAddress.balance >= amount) {
        recipient.send(amount);
        registrantsPaid[recipient] = 0;
        numRegistrants--;
        Refund(recipient, amount);
      }
     }
  }
  function destroy() { // so funds not locked in contract forever
    if (msg.sender == organizer) {
      suicide(organizer); // send funds to organizer
    }
  }
}
