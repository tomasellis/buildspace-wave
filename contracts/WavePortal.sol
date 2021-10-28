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

    constructor() payable {
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
       
        // Set eth to send user after wave 
        uint256 prizeAmount = 0.0001 ether;
        
        // Check if the contract has enough eth to even think about sending
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );

        // If cool, proceed
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        
        // If didn't suceed, tell the blockchain
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return coolPeopleWaves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}