import React from 'react'


const CurrencyComponent = () => {

    const [currencyList, setCurrencyList] = React.useState([]);
    const [rates, setRates] = React.useState({});

    const [from, setFrom] = React.useState('USD');
    const [to, setTo] = React.useState('BDT');
    const [fromAmount, setFromAmount] = React.useState(100);
    const [toAmount, setToAmount] = React.useState(0);

    const API = import.meta.env.VITE_CURRENCY_API;
    const KEY = import.meta.env.VITE_CURRENCY_API_KEY;

    const MAIN_URL = `${API}/${KEY}/latest/${from}`;


    const fetchCurrencyData = React.useCallback(async () => {
        try {
            const response = await fetch(MAIN_URL);
            const data = await response.json();

            setCurrencyList(Object.keys(data.conversion_rates));
            setRates(Object.values(data.conversion_rates));

        } catch (error) {
            console.error('Error fetching currency data', error);
        }
    }, []);

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
        fetchCurrencyData();
    }, [fetchCurrencyData]);

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
            {/* <div> */}
            <div className='bg-amber-200 text-amber-800 p-4 border-2 rounded-lg'>
                <div>
                    <h2 className='p-4 text-3xl text-center font-bold'>Currency Converter</h2>
                </div>
                <div className='flex justify-center p-4 '>

                    <input
                        className='w-full p-2 border-2 rounded-lg mx-2 focus:outline-none'
                        type='number'
                        value={fromAmount}
                        min={1}
                        step={1}
                        onChange={(e) => handleFromChange(e)}
                    />
                    <select
                        onChange={(e) => setFrom(e.target.value)}
                        value={from}
                        className='mx-2 border-2 rounded-lg p-2 focus:outline-none'>
                        {
                            currencyList.map((currency, index) => (
                                <option className='bg-amber-200 text-amber-800' key={index} value={currency}>{currency}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='flex justify-center p-4 '>

                    <input
                        className='w-full p-2 border-2 rounded-lg mx-2 focus:outline-none'
                        type='number'
                        value={toAmount}
                        min={1}
                        step={1}
                        onChange={(e) => handleToChange(e)}
                    />
                    <select
                        onChange={(e) => setTo(e.target.value)}
                        value={to}
                        className='mx-2 border-2 rounded-lg p-2 focus:outline-none'>
                        {
                            currencyList.map((currency, index) => (
                                <option className='bg-amber-200 text-amber-800' key={index} value={currency}>{currency}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {/* </div> */}
        </React.Fragment>
    )
}

export default CurrencyComponent;