// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] coolPeople;

    constructor() {
        console.log("Beeg wave");
    }

    function wave() public {
        totalWaves += 1;
        coolPeople.push(msg.sender);
        
        for (uint i=0; i < coolPeople.length; i++) {
            if(i == coolPeople.length - 1){
                console.log("Welcome to the cool people club, %s!", coolPeople[i]);
            } else {
                console.log("Sup' %s", coolPeople[i]);
            }
        }

    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}