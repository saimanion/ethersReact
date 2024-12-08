import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";


// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
// const signer = provider.getSigner()
const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "eventOutput",
                "type": "string"
            }
        ],
        "name": "myEventTest",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "get",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "myText",
                "type": "string"
            }
        ],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "storedData",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const TOKEN_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
const TOKEN_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ECDSAInvalidSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "length",
                "type": "uint256"
            }
        ],
        "name": "ECDSAInvalidSignatureLength",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "ECDSAInvalidSignatureS",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "ERC2612ExpiredSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "signer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC2612InvalidSigner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "currentNonce",
                "type": "uint256"
            }
        ],
        "name": "InvalidAccountNonce",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidShortString",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "str",
                "type": "string"
            }
        ],
        "name": "StringTooLong",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "EIP712DomainChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
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
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
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
                "name": "account",
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
        "name": "eip712Domain",
        "outputs": [
            {
                "internalType": "bytes1",
                "name": "fields",
                "type": "bytes1"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "version",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "chainId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "verifyingContract",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            },
            {
                "internalType": "uint256[]",
                "name": "extensions",
                "type": "uint256[]"
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
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "nonces",
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
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
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
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
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
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
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
    }
]

function SimpleStore() {


    const [provider, setProvider] = useState()
    const [signer, setSigner] = useState()



    const [page, setPage] = useState(1)
    const [privateKeyInputValue, setPrivateKeyInputValue] = useState('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')
    const [userWallet, setUserWallet] = useState(undefined)
    const [userBalance, setUserBalance] = useState(undefined)
    const [userWalletAddress, setUserWalletAddress] = useState()
    const [recipientAddressInputValue, setRecipientAddressInputValue] = useState('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')
    const [amountToSendInputValue, setAmountToSendInputValue] = useState(1)
    const [contractABI, setContractABI] = useState(CONTRACT_ABI)
    const [contractAddress, setContractAddress] = useState(CONTRACT_ADDRESS)
    const [contract, setContract] = useState(undefined)
    const [contractData, setContractData] = useState()
    const [inputContractSetValue, setInputContractSetValue] = useState()
    const [tokenBalance, setTokenBalance] = useState();

    const handleGetTokenBalance = async () => {
        const balance = await getTokenBalance(userWalletAddress);
        if (balance) setTokenBalance(balance);
    };

    // Contract
    const [tokenAddress, setTokenAddress] = useState(TOKEN_ADDRESS)
    const [tokenAbi, setTokenAbi] = useState(TOKEN_ABI)
    const _tokenContract = new ethers.Contract( tokenAddress , tokenAbi , signer  )
    const [tokenContract, setTokenContract] = useState(_tokenContract);


    useEffect(() => {
        const _provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        if (_provider) { console.log("Провайдер инициализирован!") }
        setProvider(_provider);

        // Создаем локального signer только после инициализации провайдера
        const _signer = new ethers.Wallet(privateKeyInputValue, _provider); // Используем Wallet с приватным ключом
        if (_signer) { console.log("Signer инициализирован!") }
        setSigner(_signer);

        const simpleStorageContract = new ethers.Contract(contractAddress, contractABI, _signer); // Передаем signer
        if (simpleStorageContract) { console.log("Contract инициализирован!", simpleStorageContract) }
        setContract(simpleStorageContract);
    }, [privateKeyInputValue]); // Добавляем зависимость от privateKeyInputValue, чтобы обновить signer при его изменении.

    const handleSetContractData = async () => {
        try {
            // Убедитесь, что вы используете signer для транзакции (не просто вызов get/set)
            const val = inputContractSetValue
            const tx = await contract.set(val); // Отправляем транзакцию
            await tx.wait();
            console.log(`Вы установили в контракт значение: ${inputContractSetValue}`)
        } catch (e) {
            console.log(e);
        }
    }
    const handleGetContractData = async () => {
        try {
            let currentData = await contract.get();

            if (currentData){
                console.log("Raw data from contract:", currentData);
                console.log("Type of data:", typeof currentData);
            }


            // Преобразование currentData в строку, если это необходимо
            const dataString = currentData ? currentData.toString() : "No data";

            setContractData(dataString);
        } catch (e) {
            console.log('Error while fetching contract data:', e);
        }
    }






    async function getBalance(walletAddress) {
        try {
            // Получаем баланс
            const balance = await provider.getBalance(walletAddress);
            // Форматируем баланс в эфиры и выводим
            return ethers.formatEther(balance)
        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    }

    const sendEther = async (wallet, addressSendTo, amount) => {
        try {
            // Убедимся, что amount является строкой, перед тем как передать в ethers.parseEther
            const amountInEther = amount.toString().trim(); // Преобразуем значение в строку и убираем лишние пробелы
            const tx = {
                to: addressSendTo, // Адрес получателя
                value: ethers.parseEther(amountInEther), // Преобразуем количество эфира в Wei
            };

            const transaction = await wallet.sendTransaction(tx);
            console.log("Хэш транзакции:", transaction.hash);
            await transaction.wait(); // Ждем подтверждения транзакции
            console.log("Транзакция подтверждена!");
        } catch (error) {
            console.error("Ошибка при отправке транзакции:", error);
        }
    };

    const connectWalletHandler = ()=>{
        const wallet = new ethers.Wallet(privateKeyInputValue, provider)
        setUserWallet(wallet)
        setUserWalletAddress(wallet.address)
    }

    const handlePrivateKeyInputValue = (event) => {
        setPrivateKeyInputValue(event.target.value); // Обновляем состояние
    };
    const handleRecipientAddressInputValue = (event) => {
        setRecipientAddressInputValue(event.target.value); // Обновляем состояние
    };
    const handleAmountToSendInputValue = (event) => {
        setAmountToSendInputValue(event.target.value); // Обновляем состояние
    };
    const handleInputContractSetValue = (event) => {
        setInputContractSetValue(event.target.value); // Обновляем состояние
    };

    const walletBalanceHandler = async ()=>{
        const balance = await getBalance(userWalletAddress)
        if(balance){
            setUserBalance(balance)
        }
    }

    const handleSend = ()=>{
        sendEther(userWallet, recipientAddressInputValue, amountToSendInputValue)
    }

    const getTokenBalance = async (address) => {
        try {
            if (!tokenContract) {
                console.error("Контракт токена не инициализирован!");
                return;
            }
            const balance = await tokenContract.balanceOf(address); // Вызов метода balanceOf
            console.log("Баланс токена:", ethers.formatEther(balance)); // Выводим баланс в консоль
            return ethers.formatEther(balance); // Преобразуем баланс в удобный формат
        } catch (error) {
            console.error("Ошибка при получении баланса токена:", error);
        }
    };
    return (
        <div>
            {page === 1 &&
                <>
                    <h3>Вы хотите подключиться к кошельку в нашей локальной сети эфира? 0_0</h3>
                    <p>Тогда мне нужен вашь приватный ключ:</p>
                    <input style={{width: "100%"}} onChange={handlePrivateKeyInputValue} value={privateKeyInputValue} type="text"/>
                    <button style={{padding: "12px"}} onClick={connectWalletHandler}>Подключить кошелёк</button>
                    {userWallet && <>
                        Вы подключили свой кошелёк, адрес которого: {userWallet.address}
                        <div>Не хотите перейти в таком случае на страницу для работы с вашим кошельком?</div>
                        <button onClick={()=>{setPage(2)}}>Перейти</button>
                    </>}
                </>}
            {page === 2 && <div>
                <div>Хотите узнать баланс?</div>
                <button onClick={
                    walletBalanceHandler
                }>Узнать баланс кошелька
                </button>
                <div> Баланс вашего кошелька: {userBalance} ETH</div>
                <hr/>
                <div>Хотите отправить крипту?</div>
                <div>Введите адрес получателя:</div>
                <input style={{width: "30vw"}} onChange={handleRecipientAddressInputValue}
                       value={recipientAddressInputValue} type="text"/>
                <div>Введите колличество ETH для отправки:</div>
                <input style={{width: "30vw"}} onChange={handleAmountToSendInputValue}
                       value={amountToSendInputValue} type="text"/>
                <button onClick={handleSend}>Отправить шекели!</button>
                <hr/>
                <div>Наигрался с кошельком? Время перейти к работе с контрактом!</div>
                <button onClick={() => {
                    setPage(3)
                }}>Перейти
                </button>
            </div>}
            {page === 3 && <div>
                Это страиница контракта Storage!
                Поместить значение в контракт:
                <input type="text" value={inputContractSetValue} onChange={handleInputContractSetValue}/>
                <button onClick={handleSetContractData}>Поместить строку в контракт</button>
                <hr/>
                <div>Получить строку из контракта</div>
                <button onClick={handleGetContractData}>Получить!</button>
                {contractData}
                <hr/>
                <div>Контракт работает, значит можно переходить к следующей странице</div>
                <button onClick={() => {
                    setPage(4)
                }}>Перейти
                </button>
            </div>}
            {page === 4 && <div>

                <div>Тут токен:</div>
                <button onClick={handleGetTokenBalance}>Узнать баланс токена</button>
                <p>Баланс токена: {tokenBalance || "Неизвестно"}</p>
            </div>}
        </div>
    );
}

export default SimpleStore;