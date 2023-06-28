import {abis} from '@my-app/contracts';


export const getPairsinfo = async (pairAddresses, web3) => {
    const pairsInfo =[];
    const pairABI = abis.pair;
    const tokenABI = abis.erc20.abi;

    for (let i = 0; i < pairAddresses.length; i++){
        const pairAddress = pairAddresses[i];
        const pair = new web3.eth.contract(pairABI, pairAddress);

        const token0Address = await pair.methods.token0().call();
        const token1Address = await pair.methods.token1().call();

        const token0contract = new web3.eth.contract(tokenABI,token0Address);
        const token1contract = new web3.eth.contract(tokenABI,token1Address);

        const token0Name = await token0contract.methods.name().call();
        const token1Name = await token1contract.methods.name().call();

        pairsInfo.push({
            address:pairAddress,
            token0Address,
            token1Address,
            token0Name,
            token1Name

        })
    }
    return pairsInfo;
    
}