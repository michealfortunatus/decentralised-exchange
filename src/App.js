import React from "react"
import { useEthers } from "@usedapp/core";

import { usePools } from "./hooks";

import styles from './styles';
import {uniswapLogo  } from "./assets";
import { Exchange, Loader, walletButton } from "./components";

const App = () => {
  const{account} = useEthers();
  const [loading, pools] = usePools();

  
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className="styles.header">
          <img src={uniswapLogo} alt='uniswap logo' className="w-16 h-16 object-contain"/>
          <walletButton/>
        </header>
        <div className={styles.exchangeContainer}>
         {/* <h1 className={styles.headTitle}>Anchor Finance</h1> */}
          <h1 className={styles.headTitle}>Anchor Finance</h1> 

         {/* <h1 className={styles.headTitle}>Anchor Finance</h1> */}

         <p className={styles.subTitle}>Exchange tokens in seconds</p>

         <div className={styles.exchangeBoxWrapper}>
          <div className={styles.exchangeBox}>
            <div className="pink_gradient"/>
            <div className={styles.exchange}>
              {account ? (loading ?(
                <Loader title="loading pools , please wait!"/>
                ): <Exchange pools = {pools}/>
                ):<Loader title="please connect your wallet"/>}
            </div>
            <div className="blue_gradient"/>

          </div>

         </div>

        </div>
      </div>
    </div>
  )
}

export default App;