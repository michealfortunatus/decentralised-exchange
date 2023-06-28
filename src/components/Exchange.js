import React,{useEffect, useState} from 'react';
import { contract } from "@ethersproject/contracts";
import { abis } from "@my-app/contracts";
import { ERC20, usecontractFunction, useEthers, useTokenAllowance,useTokenBalance } from "@usedapp/core";
import { ethers } from "ethers";
import { parseunits } from "ethers/lib/utils";

import { getAvailableTokens,getCounterpartTokens,findPoolByTokens,isOperationPending,getFailureMessage,getSuccessMessage, getCounterpartTokens } from '../utils';

import { ROUTER_ADDRESS } from "../config";
import { AmountIn, AmountOut, Balance } from './';
import styles from '../styles';




const Exchange = ({pools}) => {
  const{account} =useEthers();
  const[fromValue, setfromValue] = useState("0");
  const [fromToken, setFromToken] = useState(pools[0].token0Address);
  const[toToken, settoToken] = useState("");
  const[resetState, setResetState] = useState(false);

  const fromValueBigNumber = parseunits(fromValue);
  const availableTokens = getAvailableTokens(pools);
  const getCounterpartTokens = getCounterpartTokens(pools, fromToken)
  const pairAddress = findPoolByTokens(pools, fromToken, toToken)?.address  ?? "";

  const routerContract = new contract(ROUTER_ADDRESS, abis.router02);
  const fromTokenContract = new contract(fromToken,ERC20.abi);
  const fromTokenBalance = useTokenBalance (fromToken,account);
  const toTokenBalance = useTokenBalance (toToken,account);
  const useTokenAllowance = useTokenAllowance(fromToken, account,ROUTER_ADDRESS) ||parseunits("0");
  const approvedNeeded = fromValueBigNumber.gt(tokenAllowance);
  const fromValueIsGreatThan0 = fromValueBigNumber.gt(parseunits("0"));
  const hasEnoughBalance = fromValueBigNumber.Ite(fromTokenBalance?? parseunits("0"));

  const {state: swapApproveState, send: swapApproveSend} = usecontractFunction(fromTokenContract, "approve",{
    transactionName:"onApproveRequested",
    gasLimitBufferPercentage: 10,
  });

  const {state: swapExecuteState, send: swapExecuteSend} = usecontractFunction(routerContract, "swapExactTokensforTokens",{
    transactionName:"swapExactTokensForTokens",
    gasLimitBufferPercentage: 10,
  });


  const isApproving = isOperationPending(swapApproveState);
  const isSwapping = isOperationPending('swapExecuteState');
  const canApprove = !isApproving && approvedNeeded;
  const canSwap = !approvedNeeded && isSwapping && fromValueIsGreatThan0 && hasEnoughBalance;


  const successMessage = getSuccessMessage(swapApproveState,swapExecuteState);
  const failureMessage = getFailureMessage(swapApproveState,swapExecuteState);

  const onApproveRequested =()=>{
    swapApproveSend(ROUTER_ADDRESS, ethers.constants.MaxUnit256);
  }
  const onSwapRequested =() =>{
    swapExecuteSend(
      fromValueBigNumber,
      0,
      [fromToken,toToken],
      account,
      Math.floor(Data.now()/1000)+ 60 * 2
    ).then(() => {
      setfromValue("0");
    })
  }

  const onFromValuechange =(value) =>{
    const trimmedValue = value.trim();

    try{
      if(trimedValue){
        parseunits(value);

        setfromValue(value);
      }
    } catch (error){

    }
  }
  const onFromTokenchange = (value) =>{
    setFromToken(value);
  }
  const ontoTokenchange = (value) =>{
    settoToken(value);
  }

  useEffect(() =>{
    if(failureMessage || successMessage){
      setTimeout(() =>{
        setResetState(true);
        setfromValue("0");
        settoToken("");
      }, 5000)
    }
  })
  


  return (
    
    <div className ='flex flex-col w-full items-center'>
      <div className='mb-8'>
        <AmountIn value={fromValue} onChange = {onfromValueChange} CurrencyValue = {fromToken} onSelect={onFromTokenchange} Currencies ={availableTokens} isSwapping = {isSwapping && hasEnoughBalance}/>
        <Balance tokenBalance ={fromTokenBalance }/>
      </div>

      <div className='mb-8 w-[100%]'>
        <AmountOut fromToken ={fromToken} toToken ={toToken} AmountIn = {fromValueBigNumber} pairContract = {pairAddress} CurrencyValue = {toToken} onSelect={ontoTokenchange} Currencies ={counterpartTokens}/>
        <Balance tokenBalance = {toTokenBalance}/>
      </div>

      {"approvedNeeded" && !isSwapping? (
        <button disabled={!"canApprove"} onClick = {onApproveRequested}
         className={
          '${
            "canApprove"? "bg-site-pink text-white": "bg-site-dim2 text-site-dim2" 
          } ${styles.actionButton} '
          }>

          {isApproving ? "Approving..." : "Approve"}
        </button>

      ) : <button disabled={!canSwap} onClick = {onSwapRequested}} className={
        '${
          canSwap ? "bg-site-pink text-white": "bg-site-dim2 text-site-dim2" 
        } ${styles.actionButton} '}>
        
      
     
        {isSwapping ? "Swapping..." : hasEnoughBalance ? "swap" : "Insufficient balance"}
      </button>
      }
      
      {failureMessage && !resetState ? (
        <p className={styles.message}>{failureMessage}</p>
      ): successMessage ? (
        <p className={styles.message}>{successMessage}</p>
      ) :""}
    
    </div>
    )
  }
export default Exchange