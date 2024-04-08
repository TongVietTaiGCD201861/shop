import React from 'react';

const Instructions = ({ isPopupVisible, togglePopup }) => {
    return (
        <>
            <div className="popup-container">
                <div style={{ display: 'flex' }} >
                    <h4 className="modal-title">GUIDE TO SELECTING SIZE </h4>
                    <span style={{ position: 'absolute', top: '5px', right: '10px', cursor: 'pointer' }} onClick={togglePopup}>
                        X
                    </span>
                </div>
                <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '0%' }}></div>


                <span style={{ fontSize: '14px' }}>If you're wondering which size to choose for your weight and height, don't worry! Please see the size selection guide below for&nbsp;<span style={{ color: 'rgb(255, 0, 0)' }}>T-SHIRT</span>&nbsp;personal advice for you</span>

                <div style={{ paddingTop: '3%', paddingBottom: '4%' }}>
                    <img className="image-instruction" src={require("../image/home/introtion1.png")} alt="Shirt Store Logo" />
                    <img className="image-instruction" src={require("../image/home/introtion2.png")} alt="Shirt Store Logo" />
                </div>
                <div style={{ width: '90%', marginLeft: '5%' ,paddingBottom:'3%'}}>
                    <span style={{ fontSize: '14px' }}>The size selection guide above is a guide based on T-SHIRT's many years of experience according to a survey of customer needs and preferences. Of course, it is not absolute, there will be exceptions depending on body shape. , each person's preferences. For example, some people like to wear tight clothes, some people like to wear loose clothes...</span>
                    <span style={{ fontSize: '14px' }}><br></br> <br></br>If you still have questions and concerns that need to be answered? Please contact T-SHIRT Customer Care Department immediately via&nbsp;Hotline <strong>(08)68 444 644</strong>&nbsp;for further support.</span>

                </div>

                <button onClick={togglePopup} className='btn-instruction'>Close</button>
            </div>
        </>
    );
};

export default Instructions;
