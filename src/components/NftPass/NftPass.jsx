import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './NftPass.css';

const NftPass = () => {
    return (
        <div style={{marginTop: '150px'}}>
            <div className='Nft-text-area'>
                <h1><span className='pe-md-3'>ScaleALPHA -</span>EYWA</h1>
                <div className=''>
                    <Row className='m-0'>
                        <Col className='col-0 col-md-2'></Col>
                        <Col className='col-0 col-md-2'><hr className='oneHr'/></Col>
                        <Col className='col-0 col-md-4'></Col>
                        <Col className='col-0 col-md-2'><hr  className='oneHr'/></Col>
                        <Col className='col-0 col-md-2'></Col>
                    </Row>
                </div>
                <h2 className='ps-md-5'>MINT  <span className='ps-md-2'>NFTS</span> DIRECTLY</h2>
                <p className='pt-5 mx-auto' style={{ fontWeight: '800'}}>ScaleALPHA - the first pre-IDO pool where the IDO community can obtain projects’ tokens under the same conditions as big VCs.</p>
                <p className='pt-1 mx-auto'>Only holders of ScaleALPHA NFT with KYC successfully passed will be able to participate in EYWA's ScaleALPHA pool.</p>
                <p className='pt-1 mx-auto'>There are three types of NFTs.</p>
                <p className='mx-auto'>"Scaleswapper" - for participants with ScaleScore >2700<br/>"EYWA's community Pass" - for selected EYWA community members<br/>"Exclusive NFT Pass" - can only be acquired for 10000 SCA, but it's open for everyone who wants to participate</p>
                <p className='pt-1 mx-auto'>Claim the correct one depending on which of them is relevant to you. Kindly notice that number of each type of NFT pass is limited.</p>
                {/* <div className='py-5'>
                    <Row className='m-0'>
                        <Col className='col-0 col-md-2'></Col>
                        <Col className='col-0 col-md-2'><hr  className='TwoHr'/></Col>
                        <Col className='col-0 col-md-4'>
                            <div className='d-flex togolWraper'>
                                <div className="switch-button">
                                    <input className="switch-button-checkbox" type="checkbox"></input>
                                    <label className="switch-button-label" htmlFor=""><span className="switch-button-label-span text-dark liveButoon"><span className='liveButoon'>LIVE</span></span></label>
                                </div>
                                <i className="fa-solid fa-magnifying-glass ps-2 fs-3" style={{cursor:'pointer'}}></i>
                            </div>
                        </Col>
                        <Col className='col-0 col-md-2'><hr  className='TwoHr'/></Col>
                        <Col className='col-0 col-md-2'></Col>
                    </Row>
                </div> */}
                <div className='py-5'>
                    <div className=''>
                        <Row className='m-0'>
                            <Col className='col-0 col-md-1'></Col>
                            <Col className='col-0 col-md-2'><hr className='oneHr'/></Col>
                            <Col className='col-0 col-md-6'></Col>
                            <Col className='col-0 col-md-2'><hr  className='oneHr'/></Col>
                            <Col className='col-0 col-md-1'></Col>
                        </Row>
                    </div>
                    <h2 className=''>LIVE ON MONDAY 06 JUNE AT 16:00 GMT</h2>
                </div>
            </div>
            
        </div>
    );
};

export default NftPass;