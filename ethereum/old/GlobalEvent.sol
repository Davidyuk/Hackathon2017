pragma solidity ^0.4.0;

contract GlobalEvent {
    uint32[] eventIds;

    mapping (address => uint32[]) organizerEvents;
    mapping (address => uint32[]) ownerTickets;

    mapping (uint32 => Event) events;
    mapping (uint32 => Hall) halls;
    mapping (uint32 => Ticket) tickets;

    struct Event {
        uint32 id;
        address organizer;
        string eventInfoUrl;
        uint32[] hallIds;
        uint startTime;
        uint endTime;
        bool active;
        uint funds;
    }

    struct Hall {
        uint32 id;
        uint32 quota;
        uint32 registered;
        uint32 price;
        uint32 eventId;
    }

    struct Ticket {
        uint32 id;
        uint32 secret;
        address owner;
        uint32 hallId;
        uint32 buyPrice;
        uint32 sellPrice;
        bool sellable;
        bool physical;
    }

    event MaterializeTicket(uint32 id, uint32 secret);



    function GlobalEvents() {

    }


    function createEvent(string eventInfoUrl, uint startTime, uint endTime) {
        uint32 id = randomId();

        uint32[] empty;
        events[id] = Event(id, msg.sender, eventInfoUrl, empty, startTime, endTime, true, 0);
        organizerEvents[msg.sender].push(id);
    }

    function getEvents() constant returns(uint32[]) {
        return organizerEvents[msg.sender];
    }

    function getEvent(uint32 eventId) constant returns(address, string, uint32[], uint, uint, bool) {
        Event evnt = events[eventId];
        return (evnt.organizer, evnt.eventInfoUrl, evnt.hallIds, evnt.startTime, evnt.endTime, evnt.active);
    }

    function getEventFunds(uint32 eventId) constant returns(uint) {
        Event evnt = events[eventId];
        if (evnt.organizer != msg.sender) throw;

        return evnt.funds;
    }

    function finishEvent(uint32 eventId) {
        Event evnt = events[eventId];
        if (evnt.organizer != msg.sender || now < evnt.endTime) throw;

        evnt.organizer.send(evnt.funds);
        delete events[eventId];
    }


    function addHall(uint32 eventId, uint32 quota, uint32 price) {
        Event evnt = events[eventId];
        if (evnt.organizer != msg.sender) throw;

        uint32 id = randomId();

        halls[id] = Hall(id, quota, 0, price, eventId);
        evnt.hallIds.push(id);
    }

    function getHall(uint32 hallId) constant returns(uint32, uint32, uint32) {
        Hall hall = halls[hallId];
        return (hall.quota, hall.registered, hall.price);
    }

    function buyTicket(uint32 hallId) payable {
        Hall hall = halls[hallId];
        if (hall.quota <= hall.registered && msg.value < hall.price) throw;

        uint32 id = randomId();
        events[hall.eventId].funds += msg.value;
        tickets[id] = Ticket(id, randomId(), msg.sender, hallId, hall.price, hall.price, false, false);
    }

    function makeTicketSellable(uint32 id, uint32 price) {
        Ticket ticket = tickets[id];
        if (ticket.owner != msg.sender) throw;

        ticket.sellable = true;
        ticket.sellPrice = price;
    }

    function buyTicketFromMiddleman(uint32 ticketId) {
        Ticket ticket = tickets[ticketId];
        if (ticket.sellable == false && msg.value < ticket.sellPrice) throw;

        ticket.owner = msg.sender;
        ticket.sellable = false;
        ticket.secret = randomId();
    }

    function materializeTicket(uint32 id) {
        Ticket ticket = tickets[id];
        if (ticket.owner != msg.sender) throw;

        ticket.physical = true;
        ticket.owner = address(0x0);
        ticket.sellable = false;
        ticket.secret = randomId();
        MaterializeTicket(ticket.id, ticket.secret);
    }

    function updateSecret(uint32 id) {
        Ticket ticket = tickets[id];
        if (ticket.owner != msg.sender) throw;

        ticket.secret = randomId();
    }

    function checkTicket(uint32 id, uint32 secret) constant returns(uint32) {
        Ticket ticket = tickets[id];
        if (ticket.secret == secret) return ticket.hallId;
        else return 0;
    }

    function randomId() internal returns(uint32) {
        return uint32(block.blockhash(block.number-1)) % (2**31) + 1;
    }
}
