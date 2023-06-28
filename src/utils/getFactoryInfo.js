import {abis} from '@my-app/contracts';
import { getPairsInfo } from './getPairsInfo';

export const getFactoryinfo = async (factoryAddress,web3) => {
    const factory = new web3.eth.contract(abis.factory,factoryAddress);

    const factoryInfo = {
        fee:await factory.methods.feeTo().call(),
        feeToSetter: await factory.methods.feeToSetter().call(),
        allPairsLength:await factory.methods.allPairsLength().call(),
        allPairs:[],
    }

    for (let i = 0; i < factoryInfo.allPairsLength; i++){
        factoryInfo.allPairs[i] = await factory.methods.allPairs(i).call();
    }

    factoryInfo.PairsInfo = await getPairsInfo(factoryInfo.allPairs, web3);

  return factoryInfo;  
}