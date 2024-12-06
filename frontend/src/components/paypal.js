import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { PaypalApi } from "../apiServices/paypalApi";

export default function Paypal() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await PaypalApi.get();
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const initialOptions = {
        "client-id": data, 
        currency: "USD",
    };

    const onApprove = async (data) => {
        debugger

        const response = await fetch("https://localhost:7172/api/Checkout/completeOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderID: data.orderID
            })
        });

        const details = await response.json();

        alert(`Transaction completed by ${details.payer.name.given_name}`);
    }

    const createOrder = async () => {
        try {
            const response = await fetch("https://localhost:7172/api/Checkout/createOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart: [{ id: "1", total: 5000 }],
                }),
            });
            const orderData = await response.json();
            if (!orderData.id) {
                const errorDetail = orderData.details[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : "Unexpected error occurred, please try again.";

                throw new Error(errorMessage);
            }

            return orderData.id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const onCancel = (data) => {
        alert("cancel")
    };

    const onError = (err) => {
        alert("error")
    };

    return (
        <div className="App">
            {data && (
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={createOrder}
                        onCancel={onCancel}
                        onError={onError}
                        onApprove={onApprove}
                    />
                </PayPalScriptProvider>
            )}
        </div>
    );
}
