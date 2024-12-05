import './App.css';
import { getBalance } from "./main";
import { useEffect, useState } from "react";
import cls from './App.module.css'
function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        console.log("balance", typeof balance)
        // const rounded = parseInt(balance).toFixed(14);
        // console.log("rounded", rounded)
        setBalance(balance); // обновляем состояние после получения значения
      } catch (e) {
        console.error(e);
      }
    };
    fetchBalance();
  }, []);
  return (
      <div className="App">
        <div className={cls.balance}>Баланс вашего кошелька: {balance} ETH</div>
      </div>
  );
}

export default App;
