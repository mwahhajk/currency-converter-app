import React, { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners';



function CurrencyConverter() {

    const[currencies,setCurrencies]=useState([]);
    const[fromCurrency,setFromCurrency]=useState();
    const[toCurrency,setToCurrency]=useState();
    const [amount, setAmount] = useState();
    const[result,setResult]=useState();
    const[loader,setLoader]=useState(false);

    const convertCurrency=async()=>{
        // console.log(fromCurrency)
        setLoader(true)
        const res=await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`)
        const data=await res.json();
        // console.log(data);
        // console.log(data.date);
       
        console.log(data.rates[toCurrency]);
        setResult("Converted amount is : "+data.rates[toCurrency]+" ")
        
         setLoader(false)
   
    }

    const fromCurrencyHandler=(e)=>{
        console.log(e.target.value);
        setFromCurrency(e.target.value)
        
    }

      const toCurrencyHandler=(e)=>{
        console.log(e.target.value);
        setToCurrency(e.target.value)
        
    }

    const handleAmount = (e) =>{
        console.log(e.target.value);
        setAmount(e.target.value)
        
    }

    const getCurrencies=async()=>{
        const res=await fetch('https://api.frankfurter.dev/v1/currencies')
        const data=await res.json();
        console.log(data);
        setCurrencies(Object.entries(data))
        
    }

    useEffect(()=>{
        getCurrencies()
    },[])
  return (
    <div className='currencyConverter'>
        <div className="container">
            <div className="select-container">
                <div className="select">
                    <p>From</p>
                    <select name="" id="" value={fromCurrency} onChange={fromCurrencyHandler}>
                        {currencies.map(([code, name],index)=>{
                            return(<option key={index} value={code}>{`${code} - ${name}`}</option>)
                        })}
                        
                        
                    </select>
                </div>
                <div className="select">
                    <p>To</p>
                    <select name="" id="" onChange={toCurrencyHandler}>
                       {currencies.map(([code,name],index)=>(
                        <option key={index} value={code}>{name}</option>
                       ))}
                    </select>
                </div>
            </div>

            {/* amount container */}
            <div className="amount-container">
                <p>Amount</p>
                <input type="text" onChange={handleAmount}/>
            </div>

            <div className="result-container">
                <button onClick={convertCurrency}>Convert</button>

                <p>{loader?<PulseLoader color='blue' loading={loader}/>:<p>{result}</p>}</p>
            </div>
        </div>
    </div>
  )
}

export default CurrencyConverter


// https://api.frankfurter.dev/v1/1999-01-04?base=USD&symbols=EUR
// https://api.frankfurter.dev/v1/currencies
// https://api.frankfurter.dev/v1/latest?amount=1?base=USD&symbols=inr
// https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}