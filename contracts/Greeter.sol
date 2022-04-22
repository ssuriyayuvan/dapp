//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    struct User {
        string name;
        uint8 age;
    }

    mapping(address => uint) balances;

    User[] public users;

    event UserAdded(string indexed name, uint indexed age);

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function getBalance(address _user) external view returns(uint) {
        return balances[_user];
    }

    function addUser(string memory _name, uint8 _age) external {
        users.push(User(_name, _age));
        emit UserAdded(_name, _age);
    }

    function deleteUser(uint index) external {
        delete users[index];
    }

    function updateUser(string memory _name, uint8 _age, uint index) external {
        users[index].name = _name;
        users[index].age = _age;
    }

    function returnUsers() external view returns(User[] memory) {
        return users;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
