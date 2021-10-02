// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    struct Wave {
        address waver; 
        string message; 
        uint256 timestamp; 
    }


    Wave[] coolPeopleWaves;

    constructor() {
        console.log("Beeg wave");
    }

    event NewWave(address indexed from, uint256 timestamp, string message);

    


    function wave(string memory _message) public {
        // First increase the total
        totalWaves += 1;

        // Add a new wave
        coolPeopleWaves.push(Wave(msg.sender, _message, block.timestamp));
        
        // Tell everyone we've just been waved at
        emit NewWave(msg.sender, block.timestamp, _message);
        
        // for (uint i=0; i < coolPeople.length; i++) {
        //     if(i == coolPeople.length - 1){
        //         console.log("Welcome to the cool people club, %s!", coolPeople[i]);
        //     } else {
        //         console.log("Sup' %s", coolPeople[i]);
        //     }
        // }
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return coolPeopleWaves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}