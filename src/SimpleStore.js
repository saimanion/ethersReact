import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";


// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
// const signer = provider.getSigner()




function SimpleStore() {


    const [provider, setProvider] = useState()
    const [signer, setSigner] = useState()



    const [page, setPage] = useState(1)
    const [privateKeyInputValue, setPrivateKeyInputValue] = useState('0x36880e39d3572296cd7265693f13910167bcc55139be0f630b7b89d1c7559828')
    const [userWallet, setUserWallet] = useState(undefined)
    const [userBalance, setUserBalance] = useState(undefined)
    const [userWalletAddress, setUserWalletAddress] = useState()
    const [recipientAddressInputValue, setRecipientAddressInputValue] = useState('0x621246a2bEe0FEb54C4D0B6F7e86c325cdf5c6c5')
    const [amountToSendInputValue, setAmountToSendInputValue] = useState(1)
    const [contractABI, setContractABI] = useState([
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
    ])
    const [contractAddress, setContractAddress] = useState("0x54D0ac024bB4b530036Ce35b0f08dfA93D3bE8a0")
    const [contract, setContract] = useState(undefined)
    const [contractData, setContractData] = useState()
    const [inputContractSetValue, setInputContractSetValue] = useState()
    useEffect(() => {
        const _provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
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
            </div>}
        </div>
    );
}

export default SimpleStore;