const { ethers } = require("ethers");
// Подключаемся к локальной сети Ganache
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = provider.getSigner()

// Приватный ключ одного из аккаунтов Ganache
const privateKey = "0x256bbbcde1994cba30982873a4d4667eeac72ba2349163eb0f8bb54e0dfda582"; // Вставьте сюда ключ из Ganache
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "0x24254CAcCB02Fc0eca24B3643bBA5427e28654D4"; // Адрес вашего развернутого контракта
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "payForItem",
        "outputs": [],
        "stateMutability": "payable",
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
        "name": "payments",
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
        "name": "withdrawAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, abi, wallet);
const contractWalletAddress = wallet.address;

export async function getBalance() {
    try {
        // Получаем баланс
        const balance = await provider.getBalance(contractWalletAddress);
        // Форматируем баланс в эфиры и выводим
        const formattedBalance = ethers.formatEther(balance)
        return formattedBalance
    } catch (error) {
        console.error("Ошибка при получении баланса:", error);
    }
}
async function getInfo() {
    try {
        const balanceInEther = await getBalance()
        console.log(`Ваш баланс в ETH: ${balanceInEther}`);
    } catch (error) {
        console.log('ошибка при получении информации')
    }
}

// getBalance();
// console.log()
// getInfo()