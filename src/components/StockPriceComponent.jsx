import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';


function StockPriceComponent() {
    const [stockData, setStockData] = useState({});
    const ALPHA_VANTAGE_API_KEY = '3L6UBQGXFTSK0Y3Y';
    const stockApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${ALPHA_VANTAGE_API_KEY}`;
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(stockApiUrl);
                // Process and set stock data
                setStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data', error);
            }
        };

        fetchStockData();
    }, []);

    console.log(stockData);

    return (
        <div>
            <h2>Stock Price</h2>
            {/* {
                stockData.map((stock, index) => (
                    <div key={index}>
                        <h3>{stock.name}</h3>
                        <p>Symbol: {stock.symbol}</p>
                        <p>Current Price: ${stock.price}</p>
                        <p>High: ${stock.high}</p>
                        <p>Low: ${stock.low}</p>
                        <p>Open: ${stock.open}</p>
                        <p>Close: ${stock.close}</p>
                    </div>
                ))
            } */}
            {
                Object.keys(stockData).length > 0 && (
                    <p>{stockData['Time Series (Daily)']}</p>
                )
            }
        </div>
    );
}

export default StockPriceComponent;

// Similar components for Currency and Crypto