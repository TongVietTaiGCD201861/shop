import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const CouponList = ({ dataDiscounts }) => {
    const [startIndex, setStartIndex] = useState(0);

    const itemsPerPage = 4;

    const handleNext = () => {
        if (startIndex + itemsPerPage < dataDiscounts.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleCopyCode = (code) => {
        const tempInput = document.createElement('input');
        tempInput.value = code;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand('copy');

        document.body.removeChild(tempInput);
    };

    return (
        <div className="mg-tb-30">
            <div className="container-discount">
                <div className="wd-top-title">
                    <h2 className="title-section bd-left">
                        <span>OFFER FOR YOU</span>
                    </h2>
                </div>
                {dataDiscounts && dataDiscounts.length > 0 && (
                    <div className="pagination-controls" style={{ display: 'flex', width: '100%' }}>
                        <div style={{ display: 'flex', width: '50%' }}>
                            <button onClick={handlePrev} disabled={startIndex === 0} >
                                <FontAwesomeIcon icon={faChevronLeft} style={{ cursor: 'pointer', padding: '10px 15px' }} />
                            </button>
                        </div>
                        <div style={{ display: 'flex', width: '50%', justifyContent: 'flex-end' }}>
                            <button
                                onClick={handleNext}
                                disabled={startIndex + itemsPerPage >= (dataDiscounts?.length || 0)}
                            >
                                <FontAwesomeIcon icon={faChevronRight} style={{ cursor: 'pointer', padding: '10px 15px' }} />
                            </button>
                        </div>
                    </div>
                )}
                <div className="wd-list-coupon d-flex">
                    {dataDiscounts && dataDiscounts.length > 0 ? (
                        dataDiscounts?.slice(startIndex, startIndex + itemsPerPage).map((dataDis, indexDis) => (
                            <div className="item" key={indexDis}>
                                <div className="wd-coupon d-flex">
                                    <div className="wd-coupon-left d-flex">
                                        <strong>{dataDis?.code}</strong>
                                    </div>
                                    <div className="wd-coupon-right d-flex">
                                        <div className="wd-coupon-right-top">
                                            <div className="coupon_title">
                                                <span className="big-bold">{dataDis?.name}</span>
                                            </div>
                                            <small>{dataDis?.description}</small>
                                        </div>
                                        <div className="wd-coupon-right-bottom d-flex d-flex-center">
                                            <div className="wd-coupon-detail d-flex">
                                                <span>Code: <strong>{dataDis?.code}</strong></span>
                                                <span>EXPIRY: {new Date(dataDis?.expiry).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                            <div className="wd-coupon-copy">
                                                <button
                                                    data-code={dataDis?.code}
                                                    className="clone-coupon"
                                                    type="button"
                                                    onClick={() => handleCopyCode(dataDis?.code)}
                                                >
                                                    Copy code
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) : (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '35px 0px 35px 40%' }}>
                            There are currently no discounts available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CouponList;
