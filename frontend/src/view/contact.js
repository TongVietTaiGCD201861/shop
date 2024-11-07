import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Partner from './partner';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log('Thông tin liên hệ:', formData);
    };

    return (
        <>
            <Header />
            <div className="breadcrumb" style={{ width: '70%', marginLeft: '15%' }}>
                <Link to="/home" className="breadcrumb-item-hover">Home</Link>
                <span className="breadcrumb-divider">/</span>
                <span className="breadcrumb-item">Contact</span>
            </div>

            <div style={{ width: '70%', margin: '2% 0 4% 15%' }}>
                <h2>Contact</h2>
                <div style={{ display: 'flex', width: '100%', marginTop: '2%' }}>
                    <div style={{ width: '70%' }}>
                        <div className='contact-container'>
                            <div className='contact-name'>Full name<span className="contact-required">*</span></div>
                            <input
                                name="fullName"
                                className='contact-input'
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='contact-container'>
                            <div className='contact-name'>Email<span className="contact-required">*</span></div>
                            <input
                                name="email"
                                className='contact-input'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='contact-container'>
                            <div className='contact-name'>Description</div>
                            <textarea
                                name="description"
                                className='contact-input'
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ display: 'flex', marginLeft: '25%' }}>
                            <button className='contact-button' onClick={handleSubmit}>
                                Send contact
                            </button>
                        </div>
                    </div>

                    <div style={{ width: '30%', marginTop: '2%' }}>
                        <div style={{ margin: '12px' }}>
                            Maxxshop Vietnam will bring customers exciting online shopping experiences for branded fashion.
                        </div>
                        <div style={{ margin: '12px' }}>
                            <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: '3px' }} />
                            Ladeco Building, 266 Doi Can Street, Ba Dinh District, Ha Noi.
                        </div>
                        <div style={{ margin: '12px' }}>
                            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '3px' }} />
                            19006750
                        </div>
                        <div style={{ margin: '12px' }}>
                            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '3px' }} />
                            support@sapo.vn
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-maps">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8721627804416!2d105.80762371423478!3d21.037800492847122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab145dccbea5%3A0x5db3c457d7e46fd1!2zNDQyIMSQ4buZaSBD4bqlbiwgQ-G7kW5nIFbhu4ssIEJhIMSQw6xuaCwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1471313845826"
                    width="100%" height="450" frameBorder="0" style={{ border: '0' }} allowFullScreen=""
                ></iframe>
            </div>

            <div style={{ width: '90%', marginLeft: '5%' }}>
                <Partner />
            </div>
            <Footer />
        </>
    );
}
