import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/' + fromCurrency)
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate != null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          className="input"
          value={amount}
          onChange={handleFromAmountChange}
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="select"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span className="equals">=</span>
        <input
          type="text"
          className="input"
          value={convertedAmount}
          readOnly
        />
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="select"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
