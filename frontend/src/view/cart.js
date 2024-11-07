import React from 'react';
import Header from './header';
import { Link } from 'react-router-dom';

export default function Cart() {

    return (
        <>
            <Header></Header>
            <div style={{width: '70%', marginLeft: '15%'}}>
                <div className="breadcrumb">
                    <Link to="/home" className="breadcrumb-item-hover">Home</Link>
                    <span className="breadcrumb-divider">/</span>
                    <span className="breadcrumb-item">Carts</span>
                </div >
            </div>
        </>
    )
}