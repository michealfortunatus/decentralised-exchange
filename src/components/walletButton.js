import React, {useState, useEffect} from 'react'
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";

import styles from '../styles';

const walletButton = () => {
  const[accountAddress, setAccountAddress] = useState('')
  const{ens} = useLookupAddress(); 
  const{account, activateBrowserwallet, deactivate}=useEthers();

  useEffect(() => {
    if (ens){
      setAccountAddress(ens);
    }else if(account){
      setAccountAddress(shortenAddress(account));
    }else{
      setAccountAddress('')
    }

  }, [account,ens, setAccountAddress])


  return (
    <button onClick={() => { if (!account) {activateBrowserwallet();}else{deactivate(); }}} 
    className ={styles.walletButton}>
      {accountAddress || "connect wallet"}

    </button>
  )
}

export default walletButton