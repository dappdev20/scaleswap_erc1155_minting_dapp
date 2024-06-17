
import { useState, useEffect, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected, changeNetwork } from 'constants/connectors';

const useWalletConnect = () => {    
    const { activate, active } = useWeb3React()

    const connect = useCallback(async() => {
        await changeNetwork()
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    // setTried(true)
                })
            } else {
                // setTried(true)
            }
        })
    }, [activate])
    return {connect}
}

const useEagerConnect = () => {
    const { activate, active } = useWeb3React()

    const [tried, setTried] = useState(false)

    useEffect(async() => {
        await changeNetwork()
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, [activate])

    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])

    return tried
}

const useInactiveListener = (suppress) => {
    const { active, error, activate, deactivate } = useWeb3React()

    useEffect(async() => {
        const { ethereum } = window
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = async () => {
                console.log("Handling 'connect' event")
                // await changeNetwork()
                activate(injected)
            }
            const handleChainChanged = async (chainId) => {
                console.log("Handling 'chainChanged' event with payload", chainId)
                // await changeNetwork()
                activate(injected)
            }
            const handleAccountsChanged = async (accounts) => {
                console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    // await changeNetwork()
                    activate(injected)
                }
            }
            const handleNetworkChanged = async (networkId) => {
                console.log("Handling 'chainChanged' event with payload", networkId)
                // await changeNetwork()
                activate(injected)
            }
            const closeWallet = async () => {
                console.log("Handling 'disconnect' event")
                // await changeNetwork()
                deactivate(injected)
            }

            ethereum.on('connect', handleConnect)
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.on('chainChanged', handleNetworkChanged)
            ethereum.on('disconnect', closeWallet)
            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                    ethereum.removeListener('chainChanged', handleNetworkChanged)
                    ethereum.on('disconnect', closeWallet)
                }
            }
        }
    }, [active, error, suppress, activate, deactivate])
}

export {
    useEagerConnect,
    useInactiveListener,
    useWalletConnect
};
