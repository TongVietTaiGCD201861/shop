import React from 'react';

const statusMapping = {
    1: { text: 'Preparing goods', color: 'orange' },
    2: { text: 'In transit', color: 'blue' },
    3: { text: 'Delivered successfully', color: 'green' },
    4: { text: 'Return', color: 'red' },
    5: { text: 'Delivery failed', color: 'purple' }
};

const OrderStatus = ({ status }) => {
    const statusText = statusMapping[status].text;
    const statusColor = statusMapping[status].color;

    return (
        <span style={{ color: statusColor, backgroundColor: 'lightgray', padding: '4px', borderRadius: '4px', width: '150px', display: 'inline-block', textAlign: 'center' }}>
            {statusText}
        </span>
    );
};

export default OrderStatus;
