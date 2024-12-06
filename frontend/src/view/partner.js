import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Partner() {
    return (
        <>
            <div className="tab-title" style={{ width: '70%', marginLeft: '15%' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <h2 className="h2-title">
                        <FontAwesomeIcon icon={faStar} />
                    </h2>
                    PARTNERS
                </div>
            </div>
            <div style={{ width: '70%', marginLeft: '15%', marginTop: '15px', marginBottom: '15px' }}>
                <div className="main-brand-box"  style={{ display: 'flex' }}>
                    <div className="brand-carousel owl-carousel owl-theme" style={{ display: 'flex' }}>
                        <div className="owl-wrapper-outer"><div className="owl-wrapper" style={{ display: 'flex' }}><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_1.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_2.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_3.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_4.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_5.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_6.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_7.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div><div className="owl-item" style={{ width: '190px' }}><div className="item">
                            <a href="#"><img src="//bizweb.dktcdn.net/100/113/556/themes/161811/assets/brand_8.png?1676963410531" alt="Maxxshop" /></a>
                        </div></div></div></div>
                        <div className="owl-controls clickable"><div className="owl-buttons"><div className="owl-prev"></div><div className="owl-next"></div></div></div></div>
                </div>
            </div>
        </>
    );
}