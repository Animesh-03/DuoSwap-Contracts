// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Swap {
    IERC20 public usdcToken;
    address contractOwner;

    event Conversion(address indexed user, address indexed recipient, uint256 amountTokenIn, uint256 amountTokenOut, bool isETHtoToken);

    constructor(address _usdcTokenAddress, address initialOwner){
        usdcToken = IERC20(_usdcTokenAddress);
        contractOwner = initialOwner;
    }

    function convertUSDCtoETH(uint256 amountUSDC, address recipient) external  {
        usdcToken.approve(address(this), amountUSDC);
        usdcToken.transferFrom(msg.sender, address(this), amountUSDC);

        uint256 amountETH = amountUSDC / getCurrentUSDCtoETHConversionRate();

        payable(recipient).transfer(amountETH);

        emit Conversion(msg.sender, recipient, amountUSDC, amountETH, false);
    }

    function convertETHtoUSDC(uint256 amountETH, address recipient) external payable  {
        require(msg.value == amountETH, "Incorrect ETH value sent");
        
        uint256 amountUSDC = amountETH * getCurrentETHtoUSDCConversionRate();

        usdcToken.transfer(recipient, amountUSDC);

        emit Conversion(msg.sender, recipient, amountETH, amountUSDC, true);
    }

    function getCurrentUSDCtoETHConversionRate() internal pure returns (uint256) {
        return 2000; // 1 USDC = 1 wei
    }

    function getCurrentETHtoUSDCConversionRate() internal pure returns (uint256) {
        return 2000; // 1 wei = 1 USDC
    }

    receive() external payable {
    }
}
