import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PurchaseProduct, Shirt } from '../apiServices';
import { Brand } from '../apiServices/brand';
import { Discount } from '../apiServices/discountApiEndPoint';
import Carousels from './carousel';
import CouponList from './couponList';
import Footer from './footer';
import Header from './header';
import Partner from './partner';
import ProductHome from './product';

export default function Home() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [dataBrand, setDataBrand] = useState(null);
    const [dataOrder, setDataOrder] = useState(null);
    const [dataDiscounts, setDataDiscounts] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useSelector(state => state.user);
    const role = useSelector(state => state.user.role);
    const email = useSelector(state => state.user.email);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetchDataOrder();
        fetchDataBrand();
        fetchDataDiscount();
        setTimeout(() => setIsLoading(false), 300);
    }, []);

    const fetchDataBrand = async () => {
        setIsLoading(true);
        try {
            const params = {
                Name:  null,
                OperatingStatus: 1,
            };
            const response = await Brand.get(token, params);
            setDataBrand(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const fetchDataOrder = async () => {
        setIsLoading(true);
        try {
            const responseOrder = await PurchaseProduct.getOrder(token, email);
            setDataOrder(responseOrder.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    const fetchDataDiscount = async () => {
        setIsLoading(true);
        try {
            const params = {
                Name: null,
                Code: null,
                Reduced: 0,
                FromDate: null,
                ToDate: null,
                ExpiryDate: null,
            };
            const responseDiscount = await Discount.get(token, params);
            setDataDiscounts(responseDiscount.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <>
            {/* header */}
            <Header ></Header>

            {/* slide */}
            <Carousels></Carousels>

            {/* coupon */}
            <CouponList dataDiscounts={dataDiscounts} ></CouponList>

            {/* product */}
            <ProductHome dataBrands={dataBrand}></ProductHome>

            {/* partner */}
            <Partner></Partner>

            {/* footer */}
            <Footer></Footer>
        </>
    );
}
