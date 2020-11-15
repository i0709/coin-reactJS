import React from 'react';

//import './App.css';
import Header from './components/Header/Header';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';

const DivApp = styled.div
`
  text-align: center;
  background-color: rgb(78, 59, 97);
  color: #cccccc;
`;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      balance: 10000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: 1.0
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          price: 0.2
        },
        {
          name: 'BitcoinCash',
          ticker: 'BCH',
          price: 298.99
        }
      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh(valueChangeticker){
    const newCoinData = this.state.coinData.map( function({ticker,name, price} ) {
      let newPrice = price;
      
      if (valueChangeticker === ticker){
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage; 
        console.log(newPrice); 
      }
      return {
        ticker,
        name, 
        price: newPrice
      }
      
    });
    
    this.setState({ coinData: newCoinData});
  }

  render(){
    return (
      <DivApp>      
        <Header />
        <AccountBalance amount={this.state.balance} />
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh}/>   
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
