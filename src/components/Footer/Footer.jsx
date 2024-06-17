import React from 'react';
// import { Col, Row } from 'react-bootstrap';
import './Footer.css';
const Footer = () => {
    return (
        <div>
            {/* <div className='footerFullArea'>
                <Row className='m-0'>
                    <Col className='col-0 col-md-5'></Col>
                    <Col className='col-0 col-md-1'>
                        <a href='https://twitter.com/Scaleswapio' target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
                    </Col>
                    <Col className='col-0 col-md-1'>
                        <a href='https://medium.com/scaleswap' target="_blank" rel="noreferrer"><i className="fa-solid fa-m"></i></a>
                    </Col>
                    <Col className='col-0 col-md-1'>
                        <a href='https://t.me/scaleswap' target="_blank" rel="noreferrer"><i className="fa-solid fa-paper-plane"></i></a>
                    </Col>
                    <Col className='col-0 col-md-5'></Col>
                </Row>

                <div className='FooterText mt-5 pt-2'>
                    <p>© Scaleswap 2021</p>
                </div>

            </div> */}
            <div className='pt-4' style={{backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <div style={{backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <div>
                        <a style={{color: 'white'}} href='https://twitter.com/Scaleswapio' target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>
                    </div>
                    <div className='mx-4'>
                        <a style={{color: 'white'}} href='https://medium.com/scaleswap' target="_blank" rel="noreferrer"><i className="fa-solid fa-m"></i></a>
                    </div>
                    <div>
                        <a style={{color: 'white'}} href='https://t.me/scaleswap' target="_blank" rel="noreferrer"><i className="fa-solid fa-paper-plane"></i></a>
                    </div>
                </div>
                
                <div className='pt-5 pb-5' style={{color: '#777777', fontWeight: 700}}>
                    <p>© Scaleswap 2022</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;