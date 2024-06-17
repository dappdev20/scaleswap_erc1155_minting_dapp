import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Dropdown } from 'react-bootstrap';
import { useWalletConnect } from 'utils/hooks';

import './NavigationBar.css';
import logoImage from '../Asset/Logo.png';
import logoOne from '../Asset/logoOne.png';
// import arrow from '../Asset/arrow.png';
import nft from '../Asset/NFT.png';
import matic from '../Asset/matic.svg';
import wallet from '../Asset/walet.png';
import green from '../Asset/green.png';

// import iconOne from '../Asset/menuicon/one.png';
import iconTwo from '../Asset/menuicon/two.png';
import iconThree from '../Asset/menuicon/three.png';
import iconFour from '../Asset/menuicon/four.png';
// import iconFive from '../Asset/menuicon/five.png';
import iconSix from '../Asset/menuicon/six.png';
// import iconSeven from '../Asset/menuicon/seven.png';
import sideArrow from '../Asset/menuicon/sidearrow.png';
import binance from '../Asset/menuicon/binance.svg';
import copyWhite from '../Asset/menuicon/copy-white.svg';
import fantom from '../Asset/menuicon/fantom.svg';
import harmony from '../Asset/menuicon/harmony.svg';
import scaIcon from '../Asset/menuicon/icon_sca.svg'
import scaIconBlack from '../Asset/menuicon/icon_sca_black.svg'
import walletConnectWhite from '../Asset/menuicon/wallet-connect-white.svg';
import weth from '../Asset/menuicon/weth.svg';
import { Modal } from 'react-bootstrap';
import { injected } from 'constants/connectors';
import { isEmpty } from 'utils/utility';
import { formatEther } from '@ethersproject/units';
// import {useEthBalance} from 'utils/useEthBalance'

const NavigationBar = ({context}) => {
    const { account, library } = context
    const { deactivate } = useWeb3React()
    const [show, setShow] = useState(false);
    const [maticBalance, setMaticBalance] = useState(0)

    const {connect} = useWalletConnect()

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    
    useEffect(() => {
        const getMaticBalance = async () => {
            try {             
                const _balance = await library.getSigner(account).getBalance()
                setMaticBalance(formatEther(_balance))   
            } catch (error) {
                console.log(error)
            }
        }

        if(account && library) {
            getMaticBalance()
        }
    }, [account, library])

    const connectWallet = async () => {
        // activate(injected)
        connect()
    }

    const onDisconnect = async () => {
        deactivate(injected)
    }

    const onCopy = async () => {
        if (navigator.clipboard && navigator.permissions) {
            navigator.clipboard.writeText(account)
        } else if (document.queryCommandSupported('copy')) {
            const ele = document.createElement('textarea')
            ele.value = account
            document.body.appendChild(ele)
            ele.select()
            document.execCommand('copy')
            document.body.removeChild(ele)
            // displayTooltip()
        }
    }
    
    return (
        <div className='menuBar'>
            <div className='fullNavArea'>
                <nav>
                    <input  type="checkbox" id="sort-menu" />
                    <label htmlFor="sort-menu">
                        <i id="sign-1" className="fas fa-bars"></i>
                        <i id="sign-2" className="fas fa-times"></i>
                    </label>

                    <a href="https://scaleswap.io" target="_blank" rel='noreferrer'><img src={logoImage} alt="" className='p-md-3 ps-md-5 logoImage' /></a>
                    <img src={logoOne} alt="" className='LogoOne' />

                    {/* for mobile menu --------------------------- */}
                    <div className='mobileSearchIcon'>
                        {/* <i style={{cursor:'pointer'}} onClick={handleShow} className="fa-solid fa-magnifying-glass"></i> */}
                        <img src={green} alt="" className='' />
                    </div>

                    {/* ===============================modal  */}
                    <Modal className='search-modal' show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <input className='input-modal' type="text" placeholder='Search' />
                            </Modal.Header>
                    </Modal>

                    {/* end------------------------- */}

                    <ul className='forDesktop'>

                        <li><a href="https://nft.scaleswap.io/" target="_blank" rel='noreferrer'><button className='menuButton'><i className="fa-solid fa-rocket"></i> NFT Launch</button></a></li>

                        <li>
                            <a href="https://quickswap.exchange/#/swap?inputCurrency=ETH&outputCurrency=0x11a819beb0aa3327e39f52f90d65cc9bca499f33" target="_blank" rel='noreferrer'>
                                <button className='menuButton'>
                                    <img src={scaIcon} alt="" className='menuLeftSideArrow' />
                                    Buy SCA
                                </button>
                            </a>
                        </li>

                        <li><button className='menuButton'><img src={nft} alt="" /> NFT Pass</button></li>

                        {/* <li><a href="#roadmap"><button><img src={oneTwoT} alt="" /> 134</button></a></li> */}

                        <li>
                            {/* <button className='menuButton'>
                                <i className="fa-solid fa-arrow-right-arrow-left"></i> 
                                Bridge
                                <img src={sideArrow} alt="" className='ps-2' />
                            </button> */}
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='menuButton'>                                    
                                    <i className="fa-solid fa-arrow-right-arrow-left"></i> 
                                    Bridge
                                    {/* <img src={sideArrow} alt="" className='ps-2' /> */}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='menuBack'>
                                    <Dropdown.Item href="https://wallet.matic.network/bridge/" target="_blank" className='menuItem'>
                                        <img src={weth} alt="" className='menuLeftSideArrow' />
                                        Polygon Bridge
                                        <img src={sideArrow} alt="" className='menuRightSideArrow' />
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="https://spookyswap.finance/bridge" target="_blank" className='menuItem'>
                                    <img src={fantom} alt="" className='menuLeftSideArrow' />
                                        Fantom Bridge
                                        <img src={sideArrow} alt="" className='menuRightSideArrow' />
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="https://bridge.harmony.one/" target="_blank" className='menuItem'>
                                        <img src={harmony} alt="" className='menuLeftSideArrow' />
                                        Harmony Bridge
                                        <img src={sideArrow} alt="" className='menuRightSideArrow' />
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="https://cbridge.celer.network/#/transfer" target="_blank" className='menuItem'>
                                        <img src={binance} alt="" className='menuLeftSideArrow' />
                                        BSC and others Bridge
                                        <img src={sideArrow} alt="" className='menuRightSideArrow' />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>


                        <li>
                            <div className='d-flex fantomButn'>
                                <button style={{marginLeft: '20px', marginRight: '20px'}}>{Number.parseFloat(maticBalance).toFixed(3)}</button>
                                <button>
                                    <img src={matic} width="25px" alt="" className='pe-2' />
                                    Polygon
                                    {/* <img src={arrow} alt="" className='ps-2' /> */}
                                </button>
                            </div>
                        </li>

                        {isEmpty(account) && <li>
                                <button className='menuButton' onClick={connectWallet}>
                                    <img src={wallet} alt="" /> Connect Wallet
                                </button>
                            </li>
                        }

                        {!isEmpty(account) && <li>
                                {/* <button className='menuButton' onClick={connectWallet}>
                                    <img src={wallet} alt="" /> {`${account.substring(0, 14)}...`}
                                    <img src={arrow} alt="" className='ps-2' />
                                </button> */}
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='menuButton'>      
                                        <img src={wallet} alt="" />
					                {/* Wallet address with last characters */}
                                        {`${account.substring(0, 8)}...${account.substring(38, 42)}`}
                                        {/* <img src={sideArrow} alt="" className='ps-2' /> */}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='menuBack'>
                                        <Dropdown.Item className='menuItem' onClick={onCopy}>
                                            <img src={copyWhite} alt="" className='menuLeftSideArrow' />
                                            Copy
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className='menuItem' onClick={onDisconnect}>
                                            <img src={walletConnectWhite} alt="" className='menuLeftSideArrow' />
                                            Disconnect
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="https://polygonscan.com/" target="_blank" className='menuItem'>
                                            <img src={weth} alt="" className='menuLeftSideArrow' />
                                            Explorer
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        }



                        
                            
                    </ul>


                    {/* for mobile version  ------------------------------------------*/}


                    <ul className='mobileMenu py-3 px-0'>
                        {/* <li className='iconOnebtn'>
                            <a href="https://nft.scaleswap.io/" target="_blank" rel='noreferrer'>
                                <button className='menuButton' style={{ fontWeight: '900', marginTop: '-10%' }}>
                                    <img src={iconOne} alt="" className='me-3' />
                                    <span style={{ color: '#B5B5B5' }}>Scalescore</span> | 129
                                </button>
                            </a>
                        </li> */}

                        {isEmpty(account) && <li>
                                <button className='icontwoBtn' onClick={connectWallet}>
                                    <img src={iconTwo} alt="" className=' ms-2 me-3' />
                                    Connect Wallet
                                </button>
                            </li>
                        }
                        {!isEmpty(account) && <li>
                            <button className='icontwoBtn' onClick={onCopy}>
                                <img src={iconTwo} alt="" className=' ms-2 me-3' />
                                {`${account.substring(0, 14)}...`} 
                                {/* <img src={sideArrow} alt="" className='sideArrrowIcon ms-5 ps-4' /> */}
                                </button>
                            </li>
                        }
                        <hr />

                        {!isEmpty(account) && <li>
                                <button className='icontwoBtn'>
                                    <img src={iconThree} alt="" className=' ms-2 me-3' />
                                    {Number.parseFloat(maticBalance).toFixed(3)} 
                                    {/* <img src={sideArrow} alt="" className='sideArrrowIconTW ms-5 ps-5' /> */}
                                </button>
                            </li>
                        }
                        {!isEmpty(account) && <hr />}

                        <li>
                            <a className='icontwoBtn' style={{fontWeight: '700', color: '#B5B5B5', width: '100%'}} href='https://wallet.matic.network/bridge/' target="_blank" rel='noreferrer'>
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>                                        
                                    <div>
                                        <img src={iconFour} alt="" className=' ms-2 me-3' /> 
                                        Polygon Bridge 
                                    </div>
                                    <img src={sideArrow} alt="" className='sideArrrowIconTW ms-5 ps-5' /> 
                                </div>
                                {/* <img src={arrow} alt="" className='sideArrrowIconTH ms-5 ps-5' /> */}
                            </a>
                        </li>
                        <hr />

                        {/* <li>
                            <button className='icontwoBtn' style={{fontWeight: '700', color: '#B5B5B5'}}>
                                <img src={iconFive} alt="" className=' ms-2 me-3' />
                                NFT Pass 
                                <img src={sideArrow} alt="" className='sideArrrowIconFO ms-5 ps-5' /> 
                                <img src={arrow} alt="" />
                            </button>
                        </li>
                        <hr /> */}

                        <li>
                            <a className='icontwoBtn' style={{fontWeight: '700', color: '#B5B5B5', width: '100%'}} href='https://wallet.matic.network/bridge/' target="_blank" rel='noreferrer'>
                                                                
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>                                        
                                    <div>
                                        <img src={iconSix} alt="" className=' ms-2 me-3' /> 
                                        NFT Launch
                                    </div>
                                    <img src={sideArrow} alt="" className='sideArrrowIconTW ms-5 ps-5' /> 
                                </div>
                                {/* <img src={arrow} alt="" className='sideArrrowIconTH ms-5 ps-5' /> */}
                            </a>
                        </li>
                        <hr />
                        <li>
                            <a className='icontwoBtn' style={{fontWeight: '700', color: '#B5B5B5', width: '100%'}} href='https://quickswap.exchange/#/swap?inputCurrency=ETH&outputCurrency=0x11a819beb0aa3327e39f52f90d65cc9bca499f33' target="_blank" rel='noreferrer'>
                                
                                                        
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>                                        
                                    <div>
                                        <img src={scaIconBlack} alt="" className=' ms-2 me-3 menuLeftSideArrow' /> 
                                        Buy SCA
                                    </div>
                                    <img src={sideArrow} alt="" className='sideArrrowIconTW ms-5 ps-5' />   
                                </div>
                                {/* <img src={arrow} alt="" className='sideArrrowIconTH ms-5 ps-5' /> */}
                            </a>
                        </li>
                        <hr />
                        {!isEmpty(account) && <li>
                                <button className='icontwoBtn' onClick={onDisconnect}>
                                    <img src={iconTwo} alt="" className=' ms-2 me-3' />
                                    Wallet Disconnect
                                </button>
                            </li>
                        }

                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default NavigationBar;