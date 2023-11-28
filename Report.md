# DuoSwap
DuoSwap is a decentralized blockchain application (DApp) that facilitates transactions within a Ethereum-like blockchain network provided by Ganache. It can be used to transfer ETH and USDC between users in the blockchain network.

## Application

### Uniswap
Uniswap is a decentralized finance protocol built on the Ethereum network. It helps automate token swaps between ERC20 tokens without the need for centralized exchange.

### ERC20
ERC20 is a standard for tokens created in the Ethereum blockchain. It defines a set of rules and functionalities that Ethereum-based tokens should follow to ensure compatibility with the broader Ethereum ecosystem.

### USDC
USDC or USD Coin is a blockchain currency like Ethereum and Bitcoin. The currency is updated based on the value of the US Dollar on a given day using an oracle, in a practical implementation of the blockchain. USDC is more stable compared to popular blockchain currencies like Ethereum and Bitcoin, which change largely in a short span of time.

We have used our own implementation of USDC for simulation purposes.

### Truffle and Ganache
Truffle is a development framework for Ethereum-based blockchain networks. It provides tools for smart contract development, deployment and testing.

Ganache is a personal blockchain that emulates Ethereum, popularly used by developers to build applications that emulate or are based on Ethereum. It developers to create multiple accounts with predefined balances, making it easy to simulate various scenarios during development.

## Implementation
A frontend is built in Next that acts as the interface to interact with the blockchain. Metamask serves both as the wallet and the intermediary that connects the frontend and Ganache to complete the transaction and update the balances in the wallets of the sender and recepient. The smart contracts that determine the logic and operations for the transactions have been written in Solidity.

For simulation purposes, we have hardcoded the conversion between ETH and USDC as **1 ETH = 2000 USDC**, instead of using an oracle to fetch the current value of the US Dollar.

### Swap Contract
A smart contract has been written in Solidity to facilitate the transaction between the sender and recipient. The sender's and recipient's address is taken by the contract initially. Then the sender specifies the amount of ETH or USDC to be transferred, and a conversion is done appropriately from USDC to ETH, or from ETH to USDC.

## Workflow
1. USDC is first migrated or deployed onto the blockchain.
2. The swap contract is then deployed onto the blockchain.
3. The addresses of USDC and the other account chosen for transaction are taken and updated within the application for facilitating transaction.
4. The swap contract is provided with sufficient ETH and USDC to allow exchange between the currencies.
5. The sender then specifies the amount of USDC or ETH to be transferred to the recipient's wallet.
6. If the sender wishes to trade USDC for ETH, an extra confirmation is required on Metamask to approve the transaction.
7. Upon confirming the transaction, ETH and USDC exchange happens between the sender and recipient, and both the wallets are updated with the new values.

## Images of the working application
<img src='./DuoSwap_Contracts/images/application-frontend.jpeg'>

<img src='./DuoSwap_Contracts/images/ganache.jpeg'>

<img src='./DuoSwap_Contracts/images/wallet.jpeg'>

<img src='./DuoSwap_Contracts/images/application-frontend-with-wallet.jpeg'>


## Team Members
- Animesh AV - 2020A7PS0193H
- Ishan Chhangani - 2020A7PS0230H
- Kartikeya Dubey - 2020A7PS0031H
- Shivansh Shrivastava - 2020A7PS2095H
- Sriram Balasubramanian - 2020A7PS0002H