import React, { useState, useEffect } from 'react';
import { UnsupportedChainIdError } from '@web3-react/core'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { useSnackbar } from 'notistack';
import { nftInstance } from 'services/nftInstance';
import { tokenInstance } from 'services/tokenInstance';
import { isEmpty, delay } from 'utils/utility';
import { useWalletConnect } from 'utils/hooks';
import BullOne from '../Asset/BullOne.png';
import BullTwo from '../Asset/BullTwo.png';
import BullThree from '../Asset/BullThree.png';
import { whitelist1 } from 'whitelists/whitelist1';
import { whitelist2 } from 'whitelists/whitelist2';
import { whitelist3 } from 'whitelists/whitelist3';
import './BullCards.css';
// import arrow from '../Asset/arrow.png';
import { Accordion, Container } from 'react-bootstrap';
import { formatEther, parseEther } from '@ethersproject/units';
// import { injected } from 'constants/connectors';
import scaIcon from '../Asset/menuicon/icon_sca.svg'

var merkleRoot = []
const whitelistNodes1 = whitelist1.map(addr => keccak256(addr));
merkleRoot[0] = new MerkleTree(whitelistNodes1, keccak256, {sortPairs: true});
console.log("presale merkletree1: ", merkleRoot[0].getHexRoot())
const whitelistNodes2 = whitelist2.map(addr => keccak256(addr));
merkleRoot[1] = new MerkleTree(whitelistNodes2, keccak256, {sortPairs: true});
console.log("presale merkletree2: ", merkleRoot[1].getHexRoot())
const whitelistNodes3 = whitelist3.map(addr => keccak256(addr));
merkleRoot[2] = new MerkleTree(whitelistNodes3, keccak256, {sortPairs: true});
console.log("presale merkletree3: ", merkleRoot[2].getHexRoot())

const BullCard = ({context}) => {
    const { account, chainId, library, error } = context
    const [mintNum, setMintNum] = useState([0,0,0]);
    const [isWhitelist, setIsWhitelist] = useState([false, false, false])
    const [maxSupply, setMaxSupply] = useState([0,0,0])
    const [totalMinted, setTotalMinted] = useState([0,0,0])
    const [mintPrice, setMintPrice] = useState([0,0,0])
    const [maxMintPerWallet, setMaxMintPerWallet] = useState([0,0,0])
    const [balanceForNFT, setBalanceForNFT] = useState([0,0,0])
    const [isApproved, setIsApproved] = useState(false)
    const [pending, setPending] = useState([false, false, false])
    const [isApproving, setIsApproving] = useState(false)
    const [tokenBalance, setTokenBalance] = useState(0)
    // const [hide , setHide]=useState(0)

    const { enqueueSnackbar } = useSnackbar();

    const claimingAddress = keccak256(account);
    const nft = nftInstance(account, chainId, library);
    const token = tokenInstance(account, chainId, library);
    const {connect} = useWalletConnect()
    
    const renderStateMessage = (index) => {
        if(!!error) {
            if (error instanceof NoEthereumProviderError) {
                return <p className="card-text RedText">No browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.</p>
            } else if (error instanceof UnsupportedChainIdError || !error) {
                return <p className="card-text RedText">You're connected to an unsupported network. Please change network as Polygon</p>
            } else if (
                error instanceof UserRejectedRequestErrorInjected ||
                error instanceof UserRejectedRequestErrorWalletConnect ||
                error instanceof UserRejectedRequestErrorFrame
            ) {
                return <p className="card-text RedText">Please authorize this website to access your Polygon account.</p>
            } else {
                console.error(error)
                return <p className="card-text RedText">An unknown error occurred. Check the console for more details.</p>
            }
        }

        if(isEmpty(account)) {
            return <p className="card-text RedText">Please connect the metamask to this website first.</p>
        }

        if(!isWhitelist[index]) {
            return <p className="card-text RedText">Sorry, but seems you are <br /> not in the whitelist!</p>
        } else {
            return <p className="card-text GreenText">Congrats! <br /> You are in the whitelist!</p>
        }
    }
    const renderMintNumPart = (index) => {
        if(isWhitelist[index]) {
            return <div className='increase-decrease-wraper py-4'>
                    <button className='Increase-Decrease' onClick={() => decrease(index)}>-</button>

                    {/* <input type="number" className='valueUpDown' id='inputValue' value={mintNum[index]} onChange={() => {}} /> */}
                    <div className='valueUpDown'>{mintNum[index]}</div>
                    <button className='Increase-Decrease' onClick={() => increase(index)}>+</button>
                </div>
        } else {
        }
    }
    const renderSupplyPart = (index) => {
        return <div className='TwoNumber'>
            <div className='OneButton'>
                <small>SUPPLY</small>
                <h4>{maxSupply[index]}</h4>
            </div>
            <div className='OneButton'>
                <small>MINTED</small>
                <h5>{totalMinted[index]}</h5>
            </div>
        </div>
    }
    const renderDetailPart = (index) => {
        return <div className='px-2 pt-3 fullDetailArea'>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='detailName'>Details</Accordion.Header>
                    <Accordion.Body>
                        <div className='totalDetailFlex'>
                            <div className='detailFlex'>
                                <p>Your Balance</p>
                                <p>{`${balanceForNFT[index]} Item(s)`}</p>
                            </div>
                            <div className='detailFlex detailflexTwo'>
                                <p>Max. Mint</p>
                                <p>{`${maxMintPerWallet[index]} Item(s)`}</p>
                            </div>
                            {/* <div className='detailFlex'>
                                <p>Max. Wallet</p>
                                <p>5 Item(s)</p>
                            </div> */}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    }
    const renderMintPricePart = (index) => {
        return <p className='text-p mt-4'>{`${mintPrice[index]} SCA per ITEM`}</p>
    }
    const renderMintButton = (index) => {
        const disabledMintButton = mintNum[index] <= 0 || !isWhitelist[index] || maxMintPerWallet[index] <= balanceForNFT[index]
        const limited = maxMintPerWallet[index] <= balanceForNFT[index]
        let mintButtonText = limited ? 'Max amount minted' : pending[index] ? 'Minting...' : 'Mint now'
        if(!!error || isEmpty(account)) {
            return <div>                                        
                <button className='MintNow' onClick={() => connectWallet()}>Connect Wallet</button>
            </div>    
        } else {
            if(index === 2 && !isApproved) {
                return <div>                                        
                    <button className='MintNow' onClick={() => handleApproved()}>{isApproving ? 'Approving...' : 'Approve'}</button>
                </div>  
            } else {
                return <div>                                        
                    <button className='MintNow' disabled={disabledMintButton} onClick={() => handleMint(index)}>{mintButtonText}</button>
                    {/* <button className='MintNow' onClick={() => handleMint(index)}>Mint now</button> */}
                </div>  
            }   
        } 
    }
    const renderInsufficientPart = () => {
        if(tokenBalance < mintNum[2] * mintPrice[2]) {
            return <div className='insufficientBack'>
                <p className='insufficient-text'>Insufficient SCA</p>
                
                <a href="https://quickswap.exchange/#/swap?inputCurrency=ETH&outputCurrency=0x11a819beb0aa3327e39f52f90d65cc9bca499f33" target="_blank" rel='noreferrer'>
                    <button className='insufficient-buy'>
                        <img src={scaIcon} alt="" className='insufficientIcon' />
                        Buy SCA
                    </button>
                </a>

            </div>
        } else {
        } 
    }

    const fetchIsWhitelist = async () => {
        try {                
            const hexProof1 = merkleRoot[0].getHexProof(claimingAddress);
            const _isWhitelist1 = await nft.checkWhitelist(account, 1, hexProof1)
            const hexProof2 = merkleRoot[1].getHexProof(claimingAddress);
            const _isWhitelist2 = await nft.checkWhitelist(account, 2, hexProof2)
            const hexProof3 = merkleRoot[2].getHexProof(claimingAddress);
            const _isWhitelist3 = await nft.checkWhitelist(account, 3, hexProof3)

            setIsWhitelist([_isWhitelist1, _isWhitelist2, _isWhitelist3])
        } catch (error) {
            console.log(error)
        }
    }
    const fetchMaxSupply = async () => {
        try {
            const _maxSupply1 = await nft.maxSupply(0)
            const _maxSupply2 = await nft.maxSupply(1)
            const _maxSupply3 = await nft.maxSupply(2)
            setMaxSupply([_maxSupply1.toNumber(), _maxSupply2.toNumber(), _maxSupply3.toNumber()])
        } catch (error) {
            console.log(error)
        }
    }
    const fetchTotalMinted = async () => {
        try {
            const _totalMinted1 = await nft.totalMinted(0)
            const _totalMinted2 = await nft.totalMinted(1)
            const _totalMinted3 = await nft.totalMinted(2)
            setTotalMinted([_totalMinted1.toNumber(), _totalMinted2.toNumber(), _totalMinted3.toNumber()])
        } catch (error) {
            console.log(error)
        }
    }        
    const fetchMintPrice = async () => {
        try {
            const _mintPrice1 = await nft.mintPrice(0)
            const _mintPrice2 = await nft.mintPrice(1)
            const _mintPrice3 = await nft.mintPrice(2)
            setMintPrice([formatEther(_mintPrice1), formatEther(_mintPrice2), formatEther(_mintPrice3)])
        } catch (error) {
            console.log(error)
        }
    }    
    const fetchMaxMintPerWallet = async () => {
        try {
            const _maxMintPerWallet1 = await nft.maxMintPerWallet(0)
            const _maxMintPerWallet2 = await nft.maxMintPerWallet(1)
            const _maxMintPerWallet3 = await nft.maxMintPerWallet(2)
            setMaxMintPerWallet([_maxMintPerWallet1.toNumber(), _maxMintPerWallet2.toNumber(), _maxMintPerWallet3.toNumber()])
        } catch (error) {
            console.log(error)
        }
    }
    const fetchBalanceForNFT = async () => {
        try {
            const _balanceBatch = await nft.balanceOfBatch([account,account,account], [1,2,3])
            setBalanceForNFT([_balanceBatch[0].toNumber(), _balanceBatch[1].toNumber(), _balanceBatch[2].toNumber()])
        } catch (error) {
            console.log(error)
        }
    }
    const fetchIsApproved = async () => {
        try {
            const _approvedAmount = await token.allowance(account, nft.address)
            if(formatEther(_approvedAmount) > 1000000) 
                setIsApproved(true)
            else 
                setIsApproved(false)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchTokenBalance = async () => {
        try {
            const _tokenBalance = await token.balanceOf(account)
            setTokenBalance(formatEther(_tokenBalance))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!isEmpty(account)) {
            fetchIsWhitelist()
            fetchMaxSupply()
            fetchTotalMinted()
            fetchMintPrice()
            fetchMaxMintPerWallet()
            fetchBalanceForNFT()
            fetchIsApproved()
            fetchTokenBalance()
        }
    }, [account])

    const increase = (index) => {
        var _mintNum = mintNum[index]
        if(_mintNum + 1 > maxMintPerWallet[index] - balanceForNFT[index]) return
        _mintNum = _mintNum + 1
        var newMintNum = mintNum.slice()
        newMintNum[index] = _mintNum

        setMintNum(newMintNum)
    }
    const decrease = (index) => {
        var _mintNum = mintNum[index]
        if(_mintNum <= 0) return

        _mintNum = _mintNum - 1
        var newMintNum = mintNum.slice()
        newMintNum[index] = _mintNum

        setMintNum(newMintNum)
    }

    const handleMint = async (index) => {
        try {
            let loop = true
            let tx = null
            if(index === 2) {   
                console.log("balance: ", tokenBalance)             
                if(tokenBalance < mintNum[index] * mintPrice[index]) {
                    enqueueSnackbar(`Insufficient token balance.`, { variant: 'error' });
                    return
                }
            }
            let _pending = pending.slice()
            _pending[index] = true
            setPending(_pending)
            const hexProof = merkleRoot[index].getHexProof(claimingAddress);
            const { hash: mintHash } = await nft.mint(mintNum[index], index + 1, hexProof)
            while(loop) {
              tx = await library.getTransactionReceipt(mintHash)
              if(isEmpty(tx)) {
                  await delay(300)
              } else {
                loop = false
              } 
            }
            let _pending1 = pending.slice()
            _pending1[index] = false
            fetchBalanceForNFT()
            fetchTotalMinted()
            setPending(_pending1)
        } catch (error) {
            console.log(error)
            let _pending = pending.slice()
            _pending[index] = false
            setPending(_pending)
        } 
    }

    const handleApproved = async () => {
        try {
            let loop = true
            let tx = null
            setIsApproving(true)            
            const { hash: approveHash } = await token.approve(nft.address, parseEther("100000000000000000000000"))
            while(loop) {
              tx = await library.getTransactionReceipt(approveHash)
              if(isEmpty(tx)) {
                  await delay(300)
              } else {
                loop = false
              } 
            }
            fetchIsApproved()
            setIsApproving(false)
        } catch (error) {
            console.log(error)
            setIsApproving(false)
        } 
    }
    
    const connectWallet = async () => {
        connect()
    }

    return (
        <div>
            <Container>
                <div className="row row-cols-1 row-cols-md-3 g-md-0 ms-md-5 mb-5 pb-5">
                    {/* card one --------------------------------------- */}
                    <div>
                        <div align='center' className="col">
                            <div className="card h-100">
                                <img src={BullOne} className="card-img-top cardImgArea" alt="" />
                                <div className="card-body">
                                    <h4 className='cardTopTextOne'>Scaleswapper</h4>
                                    <h5 className="card-title cardTopTextTwo">Pass</h5>
                                    {renderMintPricePart(0)}
                                    {renderSupplyPart(0)}
                                    {renderMintNumPart(0)}
                                    {renderStateMessage(0)}
                                    {renderMintButton(0)}                          
                                    {renderDetailPart(0)}
                                </div>
                            </div>
                            {/* <div className='lastTextOfCard mt-4' style={{

                            }}>
                                <p>User connects the wallet but,<br />
                                    ups! seems he/she’s not in the whitelist</p>
                            </div> */}
                        </div>
                    </div>
                    {/* card two --------------------------------------------------- */}
                    <div>
                        <div align='center' className="col">
                            <div className="card h-100">
                                <img src={BullTwo} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h4 className='cardTopTextOne'>EYWA Community</h4>
                                    <h5 className="card-title cardTopTextTwo">Pass</h5>
                                    {renderMintPricePart(1)}
                                    {renderSupplyPart(1)}
                                    {renderMintNumPart(1)}
                                    {renderStateMessage(1)}
                                    {renderMintButton(1)}                               
                                    {renderDetailPart(1)}
                                </div>

                            </div>
                            {/* <div className='lastTextOfCard ms-4 mt-4'>
                                <p>User connects the wallet but,<br />
                                    and Hurray! He/she’s in the whitelist and can start minting this NFT
                                    (Details are displayed)</p>
                            </div> */}
                        </div>
                    </div>
                    {/* card three ------------------------------- */}
                    <div>
                        <div align='center' className="col">
                            <div className="card h-100">
                                <img src={BullThree} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h4 className='cardTopTextOne'>Exclusive NFT</h4>
                                    <h5 className="card-title cardTopTextTwo">Pass</h5>
                                    {renderMintPricePart(2)}
                                    {renderSupplyPart(2)}
                                    {renderMintNumPart(2)}
                                    {renderStateMessage(2)}
                                    {renderMintButton(2)}   
                                    {renderInsufficientPart()}                          
                                    {renderDetailPart(2)}
                                </div>
                            </div>
                            {/* <div className='lastTextOfCard  ms-4 mt-4'>
                                <p>User indicated that want to <br /> mint 112 NFTs and this will cost <br /> 2345 SCA. He/she can start <br /> minting the NFT</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BullCard;