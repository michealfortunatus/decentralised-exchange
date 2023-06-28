import {abis} from '@my-app/contracts';
export const getRouterinfo = async (routerAddress,web3) => {
    const router = new web3.eth.contract(abis.route02,routerAddress);

    return{
        factory: await router.methods.factory().call(),
    }
    
}