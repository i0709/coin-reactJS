import React,{useState} from 'react';
import Header from './components/Header/Header';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';
import axios from 'axios';

const DivApp = styled.div
`
  text-align: center;
  background-color: rgb(78, 59, 97);
  color: #cccccc;
`;

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {   

    /*hooks rewrite */
    const [balance,setBalance] = useState(10000);
    const [showBalance, setShowBalance] = useState(true);
    const [coinData,setCoinData] = useState([]);
    
    /* or 
        (Becareful to overwite variable state) 
        create a copy of variables ( ...oldstate)
        overwrite variable for new valuable (11200)
       --- Just because we have a helicopter money ;p ---
    */
    /*
    const [state, setState] =useState({
      balance: 10000,
      showBalance: true,
      coinData: []
    });
    setState(oldState =>({...oldState, balance: 112000}));
    */
    
     

    const componentDidMount = async () => {
      const response = await axios.get('https://api.coinpaprika.com/v1/coins')    
      const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);      
      const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
      const promises = coinIds.map(id => axios.get(tickerUrl + id));
      const coinData = await Promise.all(promises);   
      const coinPriceData = coinData.map(function(response) {
        const coin = response.data;
        return{
          key: coin.id,
          name: coin.name,
          ticker: coin.symbol,
          balance: 0,
          price: formatPrice(coin.quotes['USD'].price)
        }
      });
      //Retrive the prices        
      setCoinData(coinPriceData);
    }   

    const handleRefresh = async (valueChangeId) => {     
      const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
      const response = await axios.get(tickerUrl);      
      const newPrice = formatPrice(response.data.quotes.USD.price);
      const newCoinData = coinData.map( function(values ) {
        let newValues = {...values};      
        if (valueChangeId === values.key){
          newValues.price = newPrice;
        }
        return newValues;
      
      });     
      setCoinData(newCoinData);
  }

  const handleToggleShowBalance = () => {   
    setShowBalance( showBalance => !showBalance);
  }

  
  return (
    <DivApp>      
      <Header />
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleToggleShowBalance={handleToggleShowBalance} />
      <CoinList 
        coinData={coinData} 
        handleRefresh={handleRefresh} 
        showBalance={showBalance}/>   
    </DivApp>
  );
  
 
}

export default App;
