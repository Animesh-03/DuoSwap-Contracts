import { ethers } from 'ethers';

interface UsdcToEthConverter {
  convertUSDCtoETH(contractAddress: string, amountUSDC: number, recipient: string): Promise<void>;
  convertETHtoUSDC(amountETH: number, recipient: string): Promise<void>;
}

class UsdcToEthConverterClient implements UsdcToEthConverter {
  private contract: ethers.Contract;
  private usdcToken: ethers.Contract; 

  constructor(contractAddress: string, signer: ethers.Signer, usdcTokenAddress:string) {
    this.contract = new ethers.Contract(contractAddress, ['function convertUSDCtoETH(uint256, address)', 'function convertETHtoUSDC(uint256, address)'], signer);
    this.usdcToken = new ethers.Contract(usdcTokenAddress, ['function approve(address spender, uint256 amount)'], signer); 
  }

  async convertUSDCtoETH(contractAddress: string, amountUSDC: number, recipient: string): Promise<void> {
    const approvalTx = await this.usdcToken.approve(contractAddress, ethers.parseEther(amountUSDC.toString()));
    await approvalTx.wait();

    const conversionTx = await this.contract.convertUSDCtoETH(ethers.parseEther(amountUSDC.toString()), recipient);
    await conversionTx.wait();
  }

  async convertETHtoUSDC(amountETH: number, recipient: string): Promise<void> {
    await this.contract.convertETHtoUSDC(ethers.parseEther(amountETH.toString()), recipient, { value: ethers.parseEther(amountETH.toString()), gasPrice: 20000000000 });
  }
}

class ERC20TokenTransfer {
  private erc20Contract: ethers.Contract;

  constructor(contractAddress: string, signer: ethers.Signer) {
    this.erc20Contract = new ethers.Contract(
      contractAddress,
      ['function transfer(address to, uint256 amount)'],
      signer
    );
  }

  async transferTokens(amount: number, recipient: string): Promise<void> {
    const transferTx = await this.erc20Contract.transfer(recipient, amount);
    await transferTx.wait();
  }
}

// Example usage
const provider = new ethers.JsonRpcProvider('http://localhost:7545'); // Update with your Ganache RPC URL
const signer = new ethers.Wallet('0x87433283ded0bd93f2f048f4aafd573f56108829b46d641543782fa9bf2df35e', provider); // Replace 'your_private_key' with the private key

const erc20TokenAddress = '0x8Ef1AEB9e2D5edD9C1fb6a87C96Ebc8f9A3bB14B'; // Replace with the actual ERC20 token address
const erc20TokenTransfer = new ERC20TokenTransfer(erc20TokenAddress, signer);
// 
const amountToTransfer = 1000000000000000; // Replace with the amount you want to transfer
const recipientAddress = '0x39BB9341AC8b36E69385c3F1Af7E65e5c41AcD7e'; // Replace with the recipient's address
// 
// Transfer ERC20 tokens
erc20TokenTransfer.transferTokens(amountToTransfer, recipientAddress)
  .then(() => console.log('Tokens transferred successfully'))
  .catch(error => console.error('Error transferring tokens:', error));

// const some = new UsdcToEthConverterClient( "0x4821493549ac02967d613de707f0D1076Dd89aA3" , signer, erc20TokenAddress);
// // some.convertETHtoUSDC(1, "0xb2628D7c26Eeca3C33b54757fc1dd7365231741f");
// some.convertUSDCtoETH("0x682868213eAc956f543b4Cb2A4488179ff694142", 1, "0xb2628D7c26Eeca3C33b54757fc1dd7365231741f")
//   .then(() => console.log("USDC CONVERTED TO ETH"))
//   .catch(error => console.error("Error ", error));

export default UsdcToEthConverterClient;
