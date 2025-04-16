import React from 'react';
import useSWR from 'swr';
import ReactApexChart from 'react-apexcharts';

const StockPriceComponent = () => {
    const BASE_URL = import.meta.env.VITE_TWELVE_DATA_LOCAL;
    const [stockSymbol, setStockSymbol] = React.useState('AAPL');
    const [interval, setInterval] = React.useState('1day');
    const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;
    // const [stockData, setStockData] = React.useState({
    //     prices: [],
    //     metadata: null,
    //     status: null
    // });

    const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'INTC', 'AMD'];

    const fetcher = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'error') {
            throw new Error(data.message);
        }
        return data;
    };

    const { data: stockData, error, isLoading } = useSWR(
        `${BASE_URL}/time_series?symbol=${stockSymbol}&interval=${interval}&apikey=${API_KEY}&outputsize=${30}`,
        fetcher
    );

    // React.useEffect(() => {
    //     if (data) {
    //         setStockData({
    //             prices: data.values.reverse(),
    //             metadata: data.meta,
    //             status: data.status
    //         });
    //     }
    // }, [data, error, isLoading]);

    const candlestickSeries = [{
        name: 'Price',
        data: stockData?.values.map(price => ({
            x: new Date(price.datetime).getTime(),
            y: [
                parseFloat(price.open),
                parseFloat(price.high),
                parseFloat(price.low),
                parseFloat(price.close)
            ]
        }))
    }];

    const candlestickOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
            id: 'candles',
            toolbar: {
                autoSelected: 'pan',
                show: true
            },
            zoom: {
                enabled: true
            },
        },
        title: {
            text: `${stockSymbol} Stock Price (${interval})`,
            align: 'center'
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: true
            }
        },
        yaxis: {
            tooltip: {
                enabled: true
            },
            title: {
                text: 'Price (USD)'
            }
        },
        grid: {
            borderColor: '#D4D4D8',
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5
            }
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#04823D',
                    downward: '#DD1D28'
                },
                wick: {
                    useFillColor: true,
                }
            }
        },
        tooltip: {
            enabled: true,
            shared: true,
            custom: ({ seriesIndex, dataPointIndex, w }) => {
                const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                const date = new Date(data.x).toLocaleDateString();

                return `
                <div class="apexcharts-tooltip-box">
                    <div class="apexcharts-tooltip-title">${date}</div>
                    <div>Open: <span>${data.y[0]}</span></div>
                    <div>High: <span>${data.y[1]}</span></div>
                    <div>Low: <span>${data.y[2]}</span></div>
                    <div>Close: <span>${data.y[3]}</span></div>
                </div>
                `;
            }
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto my-8 p-4 w-[360px] md:w-[600px] lg:w-[900px] text-sm box-border border-2 rounded-lg bg-zinc-300 border-slate-700">
                <div className="text-center text-slate-700">Loading stock data...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="container mx-auto my-8 p-4 w-[360px] md:w-[600px] lg:w-[900px] text-sm box-border border-2 rounded-lg bg-zinc-300 border-slate-700">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error.message}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-8 p-4 w-[360px] md:w-[600px] lg:w-[900px] text-sm box-border border-2 rounded-lg bg-zinc-300 border-slate-700">
            <div className="flex flex-row justify-between mb-4">
                <select
                    id="stock-symbol"
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value)}
                    className="md:mb-0 mx-4 p-2 text-center bg-zinc-300 text-slate-700 border-2 border-slate-700 rounded-lg focus:outline-none"
                >
                    {popularStocks.map(stock => (
                        <option key={stock} value={stock}>
                            {stock}
                        </option>
                    ))}
                </select>

                <select
                    id='interval'
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                    className="mx-4 p-2 text-center bg-zinc-300 text-slate-700 border-2 border-slate-700 rounded-lg focus:outline-none"
                >
                    <option value="1min">1 Minute</option>
                    <option value="1h">1 Hour</option>
                    <option value="1day">1 Day</option>
                    <option value="1week">1 Week</option>
                    <option value="1month">1 Month</option>
                </select>
            </div>

            {
                !isLoading && !error && stockData.values.length > 0 && (
                    <div className="charts-container">
                        <div className="mb-4">
                            <ReactApexChart
                                options={candlestickOptions}
                                series={candlestickSeries}
                                type="candlestick"
                                height={350}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default StockPriceComponent;