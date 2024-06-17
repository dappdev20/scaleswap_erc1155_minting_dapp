
import { Contract } from '@ethersproject/contracts'

import { tokenABI } from '../../abis/token';
import { tokenContractAddress } from '../../constants/contractAddresses';

const tokenInstance = (account, chainId, library) => {

    if (chainId) {
        return new Contract(tokenContractAddress, tokenABI, library.getSigner(account));
    }
    return null
}

export {
    tokenInstance
}
