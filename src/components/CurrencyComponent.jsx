import React from 'react'
import useSWR from 'swr';

const CurrencyComponent = () => {

    const [currencyList, setCurrencyList] = React.useState([]);
    const [rates, setRates] = React.useState({});

    const [from, setFrom] = React.useState('USD');
    const [to, setTo] = React.useState('BDT');
    const [fromAmount, setFromAmount] = React.useState(100);
    const [toAmount, setToAmount] = React.useState(0);

    // const API = import.meta.env.VITE_CURRENCY_API;
    // const KEY = import.meta.env.VITE_CURRENCY_API_KEY;

    const API = import.meta.env.VITE_CURRENCY_LOCAL;
    const KEY = import.meta.env.VITE_CURRENCY_LOCAL_KEY;

    const MAIN_URL = `${API}/${KEY}/latest/${from}`;


    const fetchCurrencyData = async () => {
        try {
            const response = await fetch(MAIN_URL);
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching currency data', error);
        }
    };

    const { data } = useSWR(MAIN_URL, fetchCurrencyData);
    React.useEffect(() => {
        if (data) {
            setCurrencyList(Object.keys(data.conversion_rates));
            setRates(Object.values(data.conversion_rates));
        }
    }, [data]);

    function convertFrom() {
        const fromRate = rates[currencyList.indexOf(from)];
        const toRate = rates[currencyList.indexOf(to)];

        let amount = ((fromAmount / fromRate) * toRate);
        setToAmount(amount);
    }
    function convertTo() {
        const fromRate = rates[currencyList.indexOf(from)];
        const toRate = rates[currencyList.indexOf(to)];

        let amount = ((toAmount / toRate) * fromRate);
        setFromAmount(amount);
    }

    function handleFromChange(e) {
        setFromAmount(e.target.value);
    }

    function handleToChange(e) {
        setToAmount(e.target.value);
    }

    React.useEffect(() => {
        convertFrom();
    }, [from, fromAmount]);

    React.useEffect(() => {
        convertTo();
    }, [to, toAmount]);

    // console.log(currencyList[0]);
    // console.log(rates[0]);
    // console.log(from);
    // console.log(to);




    return (
        <React.Fragment>
            <div className='flex flex-col justify-center items-center my-8'>
                <div className='w-[360px] md:w-[600px] text-sm md:text-lg bg-amber-200 text-amber-800 p-2 md:p-4 border-2 rounded-lg box-border'>
                    <div>
                        <h2 className='p-2 md:p-4 text-xl md:text-2xl text-center font-bold'>Currency Converter</h2>
                    </div>
                    <div className='flex justify-center p-2 md:p-4 '>

                        <input
                            id='fromAmount'
                            className='w-full p-1 md:p-2 border-1 md:border-2 rounded-lg mx-1 md:mx-2 focus:outline-none'
                            type='number'
                            value={fromAmount}
                            min={1}
                            step={1}
                            onChange={(e) => handleFromChange(e)}
                        />
                        <select
                            id='from    '
                            onChange={(e) => setFrom(e.target.value)}
                            value={from}
                            className='w-[120px] mx-1 md:mx-2 border-1 md:border-2 rounded-lg p-1 md:p-2 focus:outline-none'>
                            {
                                currencyList.map((currency, index) => (
                                    <option className='text-center bg-amber-200 text-amber-800' key={index} value={currency}>{currency}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='flex justify-center p-2 md:p-4 '>

                        <input
                            id='toAmount'
                            className='w-full p-1 md:p-2 border-1 md:border-2 rounded-lg mx-1 md:mx-2 focus:outline-none'
                            type='number'
                            value={toAmount}
                            min={1}
                            step={1}
                            onChange={(e) => handleToChange(e)}
                        />
                        <select
                            id='to'
                            onChange={(e) => setTo(e.target.value)}
                            value={to}
                            className='w-[120px] mx-1 md:mx-2 border-1 md:border-2 rounded-lg p-1 md:p-2 focus:outline-none'>
                            {
                                currencyList.map((currency, index) => (
                                    <option className='text-center bg-amber-200 text-amber-800' key={index} value={currency}>{currency}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CurrencyComponent;