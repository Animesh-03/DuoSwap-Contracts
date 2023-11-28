// var USDC = artifacts.require("./USDC.sol")
var swap = artifacts.require("./Swap.sol")

module.exports = async function(deployer) { 
    // deployer.deploy(USDC);
    deployer.deploy(swap, "0x8Ef1AEB9e2D5edD9C1fb6a87C96Ebc8f9A3bB14B", "0x39BB9341AC8b36E69385c3F1Af7E65e5c41AcD7e");
}