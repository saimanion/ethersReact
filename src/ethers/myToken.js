const { ethers } = require("ethers");
const tokenAddress = "0x364fB667628AfbcD0Cb20BFC9Fe234F4e91442D90"; // Замените на ваш адрес контракта
const tokenABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_initialSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
// const walletAddress = "0x736a40791b2aFF830599d52580461472e31Ef4Ec"
const walletPrivateKey = '0x2583a82b9935c5e10a563f04230b8fa75e93e6ec8ec206fbd1d866b1d6021602'
const ganacheUrl = "http://127.0.0.1:7545"
const provider = new ethers.JsonRpcProvider(ganacheUrl)
const wallet = new ethers.Wallet(walletPrivateKey, provider);
const contract = new ethers.Contract(tokenAddress, tokenABI, wallet);
const signer = provider.getSigner()
 async function getBalance() {
    try {
        // Получаем баланс
        const balance = await provider.getBalance(wallet.address);
        // Форматируем баланс в эфиры и выводим
        const formattedBalance = ethers.formatEther(balance)
        console.log(formattedBalance)
        return formattedBalance
    } catch (error) {
        console.error("Ошибка при получении баланса:", error);
    }
}
// getBalance()

 async function sendTokens(signer,to, amount) {
    try {
        // const tx = await contract.transfer(to, ethers.parseUnits(amount, 18));
        const tx = signer.transfer ({
            to: to,
            value: ethers.parseUnits(amount, 18)
        });// Указываем количество в 18 десятичных знаков
        console.log("Транзакция отправлена:", tx.hash);
        await tx.wait();  // Ожидаем завершения транзакции
        console.log("Транзакция завершена!");
    } catch (error) {
        console.error("Ошибка при отправке токенов:", error);
    }
}
const toAddr = "0xf94D6008b290309F6D737e817f48a004F78af091"
// sendTokens(toAddr, "10");  // Отправить 10 токенов на указанный адрес

async function SendTo (sendToAddress,amount) {
    const tx = {
        to: sendToAddress,
        value: ethers.parseEther(amount.toFixed(1))
    };

    try{
        const signerObj = await signer
        await signerObj.sendTransaction(tx)

    } catch (e){
        console.log(e)
    }

}
// SendTo('0xf94D6008b290309F6D737e817f48a004F78af091', 1)
getBalance()