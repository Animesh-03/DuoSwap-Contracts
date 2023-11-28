"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var UsdcToEthConverterClient = /** @class */ (function () {
    function UsdcToEthConverterClient(contractAddress, signer, usdcTokenAddress) {
        this.contract = new ethers_1.ethers.Contract(contractAddress, ['function convertUSDCtoETH(uint256, address)', 'function convertETHtoUSDC(uint256, address)'], signer);
        this.usdcToken = new ethers_1.ethers.Contract(usdcTokenAddress, ['function approve(address spender, uint256 amount)'], signer);
    }
    UsdcToEthConverterClient.prototype.convertUSDCtoETH = function (contractAddress, amountUSDC, recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var approvalTx, conversionTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usdcToken.approve(contractAddress, ethers_1.ethers.parseEther(amountUSDC.toString()))];
                    case 1:
                        approvalTx = _a.sent();
                        return [4 /*yield*/, approvalTx.wait()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.contract.convertUSDCtoETH(ethers_1.ethers.parseEther(amountUSDC.toString()), recipient)];
                    case 3:
                        conversionTx = _a.sent();
                        return [4 /*yield*/, conversionTx.wait()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsdcToEthConverterClient.prototype.convertETHtoUSDC = function (amountETH, recipient) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.convertETHtoUSDC(ethers_1.ethers.parseEther(amountETH.toString()), recipient, { value: ethers_1.ethers.parseEther(amountETH.toString()), gasPrice: 20000000000 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UsdcToEthConverterClient;
}());
var ERC20TokenTransfer = /** @class */ (function () {
    function ERC20TokenTransfer(contractAddress, signer) {
        this.erc20Contract = new ethers_1.ethers.Contract(contractAddress, ['function transfer(address to, uint256 amount)'], signer);
    }
    ERC20TokenTransfer.prototype.transferTokens = function (amount, recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var transferTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.erc20Contract.transfer(recipient, amount)];
                    case 1:
                        transferTx = _a.sent();
                        return [4 /*yield*/, transferTx.wait()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ERC20TokenTransfer;
}());
// Example usage
var provider = new ethers_1.ethers.JsonRpcProvider('http://localhost:7545'); // Update with your Ganache RPC URL
var signer = new ethers_1.ethers.Wallet('0x87433283ded0bd93f2f048f4aafd573f56108829b46d641543782fa9bf2df35e', provider); // Replace 'your_private_key' with the private key
var erc20TokenAddress = '0x8Ef1AEB9e2D5edD9C1fb6a87C96Ebc8f9A3bB14B'; // Replace with the actual ERC20 token address
var erc20TokenTransfer = new ERC20TokenTransfer(erc20TokenAddress, signer);
// 
var amountToTransfer = 1000000000000000; // Replace with the amount you want to transfer
var recipientAddress = '0x39BB9341AC8b36E69385c3F1Af7E65e5c41AcD7e'; // Replace with the recipient's address
// 
// Transfer ERC20 tokens
erc20TokenTransfer.transferTokens(amountToTransfer, recipientAddress)
    .then(function () { return console.log('Tokens transferred successfully'); })
    .catch(function (error) { return console.error('Error transferring tokens:', error); });
// const some = new UsdcToEthConverterClient( "0x4821493549ac02967d613de707f0D1076Dd89aA3" , signer, erc20TokenAddress);
// // some.convertETHtoUSDC(1, "0xb2628D7c26Eeca3C33b54757fc1dd7365231741f");
// some.convertUSDCtoETH("0x682868213eAc956f543b4Cb2A4488179ff694142", 1, "0xb2628D7c26Eeca3C33b54757fc1dd7365231741f")
//   .then(() => console.log("USDC CONVERTED TO ETH"))
//   .catch(error => console.error("Error ", error));
exports.default = UsdcToEthConverterClient;
