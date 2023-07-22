import React from 'react'

const Invoice = () => {
    return (
        <div className='inv-body'>

            <div className='inv-header'>

                <div className='inv-col'>
                    <span>date</span>
                    <span>CustomerName</span>
                </div>
                <div className='inv-col'>
                    <span>Invoice</span>
                    <span>No.generate id</span>
                </div>
            </div>

            <div className='inv-info'>
                <div className='inv-info-col'>
                    <span>ID</span>
                    <span>package id</span>
                </div>
                <div className='inv-info-col'>
                    <span>Weight</span>
                    <span>weight</span>
                    <span style={{ paddingTop: '200px' }}>total weight</span>
                </div>
                <div className='inv-info-col' style={{ background: 'lightgray', paddingLeft: '1.5%', paddingRight: '1.5%' }}>
                    <span style={{ fontWeight: '500' }}>Price</span>
                    <span>price</span>
                    <span style={{ fontSize: 'large', fontWeight: '600', paddingTop: '200px' }}>Total: total</span>
                </div>
            </div>
            <div>

                <p>
                    You received package count packages<br />Thank for using our services
                </p>
            </div>
        </div>
    )
}

export default Invoice