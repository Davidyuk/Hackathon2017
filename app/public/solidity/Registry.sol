pragma solidity ^0.4.0;

contract Registry {
    struct Service {
        string name;
        uint32 typeId;
    }

    address public owner;
    string[] public serviceTypes;
    mapping (address => Service) public services;

    function Registry() {
        owner = msg.sender;
    }

    modifier isOwner() {
        if (msg.sender != owner) throw;
        _;
    }

    function addServiceType(string serviceTypeName) isOwner {
        if (bytes(serviceTypeName).length == 0) throw;
        serviceTypes.push(serviceTypeName);
    }

    function addService(address serviceAddress, string serviceName, uint32 serviceTypeId) isOwner {
        if (bytes(serviceName).length == 0 || serviceTypeId >= serviceTypes.length) throw;
        services[serviceAddress] = Service(serviceName, serviceTypeId);
    }

    function checkOperation(address serviceAddress, uint32 serviceTypeId) constant returns(bool) {
        return bytes(services[serviceAddress].name).length == 0 &&
            serviceTypeId <= serviceTypes.length;
    }
}
