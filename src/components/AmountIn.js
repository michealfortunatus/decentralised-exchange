import React, {useState, useEffect,useRef} from 'react'

import { chevronDown } from '../assets';
import styles from '../styles';
import { useOnClickOutside } from "../utils";

const AmountIn = ({value, onChange,currencyValue, onSelect, currencies, isSwapping}) => {
    const [showList, setshowList] = useState (false);
    const [activeCurrency, setActivecurrency] = useState ("select");
    const ref = useRef();

    useOnClickOutside(ref, ()=> setshowList(false));
    useEffect(() =>{
        if(Object.keys(currencies) .includes(currencyValue)){
            setActivecurrency(currencies[currencyValue])
        }else{
            setActivecurrency("select");
        }
    }, [currencies, currencyValue])

  return (
    <div className={styles.amountContainer}>
        <input placeholder='0.0' type ='number' value = '' disabled = {isSwapping} onChange = {(e) => typeof onchange === "function" && onChange(e.target.value)} className = {styles.amountInput}/>

        <div className='relative' onClick={() => setshowList((prevState) => !prevState)}>
            <button className={styles.currencyButton}>
                {activeCurrency}
                <img src={chevronDown} alt="chevron down" className={"w-4 h-4 object-contain ml-2 ${showList ? 'rotate-180' : 'rotate-0' }"} />

            </button>
            {showList && ( 
                <ul ref= {ref} className={styles.currencyList}>
                    {Object.entries(currencies).map(([token, tokenName], index) => (
                        <li key={index} className={'${styles.currencyListItem} ${activeCurrency === tokenName ? "bg-site-dim2" : ""}cursor-pointer'} onClick={() => {
                            if(typeof onSelect === "function") onSelect(token); setActivecurrency(tokenName);setshowList(false);
                        }}>{tokenName}</li>
                    ))}

                </ul>
            )}

        </div>

    </div>
  )
}

export default AmountIn