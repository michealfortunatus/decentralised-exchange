import web3 from 'web3';
import { useState,useEffect } from "react";
import { useConfig } from "@usedapp/core";

import { ROUTER_ADDRESS } from '../config';
import { getFactoryInfo, getRouterInfo } from ".../utils";

export const loadPools = async(providerUrl) => {
    const provider = new web3.providers.HttpProvider(providerUrl);
    const Web3 = new Web3(provider);

    const routerInfo = await getRouterInfo(ROUTER_ADDRESS, web3);
    const factoryInfo = await getFactoryInfo(routerInfo.factory,web3);

    return factoryInfo.pairsInfo;
}

export const usePools =() =>{
    const {readonlychainId, readonlyUrls} =useConfig();
    const [loading, setLoading] = useState(true);
    const [pools, setPools] =useState({});

    useEffect(() => {
        loadPools(readonlyUrls [readonlychainId])
        .then((pools) =>{
            setPools(pools)
            setLoading(false);

        })

    }, [readonlyUrls, readonlychainId])
    return[loading,pools];
}