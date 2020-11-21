import React from 'react';

//import './App.css';
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

class App extends React.Component {
    state ={
      balance: 10000,
      showBalance: true,
      coinData: [
        /*
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          balance: 0.5,
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          balance: 32.0,
          price: 299.99          
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          balance: 0,
          price: 1.0
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          balance: 1000,
          price: 0.2
        },
        {
          name: 'BitcoinCash',
          ticker: 'BCH',
          balance: 0,
          price: 298.99
        }
        */
      ]
    }
    
    componentDidMount = async () => {
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
      this.setState({coinData: coinPriceData });
    }

    

    handleRefresh = async (valueChangeId) => {     
      const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
      const response = await axios.get(tickerUrl);      
      const newPrice = formatPrice(response.data.quotes.USD.price);
      const newCoinData = this.state.coinData.map( function(values ) {
        let newValues = {...values};      
        if (valueChangeId === values.key){
          newValues.price = newPrice;
        }
        return newValues;
      
      });
    
      this.setState({ coinData: newCoinData});
  }

  handleToggleShowBalance = () => {
    this.setState({showBalance: !this.state.showBalance});
  }

  render(){
    return (
      <DivApp>      
        <Header />
        <AccountBalance 
          amount={this.state.balance} 
          showBalance={this.state.showBalance} 
          handleToggleShowBalance={this.handleToggleShowBalance} />
        <CoinList 
          coinData={this.state.coinData} 
          handleRefresh={this.handleRefresh} 
          showBalance={this.state.showBalance}/>   
      </DivApp>
    );
  }


/*
<table className="coin-table">
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Ticker:</th>
                        <th>Price:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.coinData.map( ({name, ticker, price}) => 
                            <Coin key={ticker} name={name}  ticker={ticker} price={price} />
                        )
                    }                    
                </tbody>
            </table>    */

  /*
  key={value.ticker} -- Unique key or use uuid package
  {
    this.state.coinData.map(value => 
      <Coin key={value.ticker} name={value.name}  ticker={value.thicker} price={value.price} />
    )
  }

  --OR

  this.state.coinData.map(({name, ticker, price}) => 
                <Coin key={value.ticker} name={name}  ticker={ticker} price={price} />
              )
  -----OR
  {
              this.state.coinData.map(value => 
                <Coin key={value.ticker} {...value} />
              )
            }
         
  -- OR          
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[0].ticker} price ={this.state.coinData[0].price} /> 
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[1].ticker} price ={this.state.coinData[1].price} /> 
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[2].ticker} price ={this.state.coinData[2].price} /> 
  <Coin name={this.state.coinData[0].name} ticker={this.state.coinData[3].ticker} price ={this.state.coinData[3].price} /> 
  */
  
  
}

export default App;
