import React, { useContext, useEffect, useState } from 'react';
import { InvoiceContext } from './Contexts/InvoiceContext';

import { useParams } from "react-router-dom";
import { InvoiceInfo } from './Contexts/InvoiceInfo';



interface Params extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    date: string;
    generatedId: number;
    packageId: any;
    weight: number;
    price: number;
}




const Invoice: React.FC<Params> = ({ date, generatedId, packageId, weight, price }) => {
    const { appData }: any = useContext(InvoiceContext);

    //get customer ID from url
 
    const { setId }: any = useContext(InvoiceInfo);
    const { id }:any = useParams();
    
    
    const {customerName,setCustomerName}:any = useContext(InvoiceInfo);
    const {totalWeight,setTotalWeight}:any = useContext(InvoiceInfo);
    const {totalPrice,setTotalPrice}:any = useContext(InvoiceInfo);

    const current = new Date();
    date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    generatedId = 1;
    const customerData: any = appData.customers.find((customerId: any) => customerId.id == id)
    console.log(customerData);
    
    
    

    const customerPackage: any = appData.packages.filter((customerId: any) => customerId.customerid == id)
  
    const parseWeight = (weightStr: string): number => {
        const weightNumber = parseInt(weightStr, 10);
        return isNaN(weightNumber) ? 0 : weightNumber;
    };

    useEffect(()=> {
        setId(id);
        setCustomerName(customerData.name);
        setTotalWeight(() => customerPackage.reduce((sum: any, item: any) => sum + parseWeight(item.weight), 0) + 'kg') 
        setTotalPrice(() => customerPackage.reduce((sum: any, item: any) => sum + Number(item.price), 0)) 
    },[customerPackage])
  
    
    
    return (
       
        <body>
            <div id='section-to-print' className='inv-body'>
                <div className='inv-header'>
                    <div className='inv-col'>
                        <span>{date}</span>
                        <span>{customerName}</span>
                    </div>
                    <div className='inv-col'>
                        <span>Invoice</span>
                        <span>{generatedId}</span>
                    </div>
                </div>
                <div className='inv-info' >
                    <div className='inv-info-row'>
                        <span>ID</span>
                        <span>Weight</span>
                        <span style={{ fontWeight: '500' }}>Price</span>
                    </div>
                    {customerPackage.map((pkg: any) => (
                        <div className='inv-info-row' key={pkg.id}>
                            <span>{pkg.id}</span>
                            <span>{pkg.weight}</span>
                            <span>{pkg.price}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: '10%', marginLeft: '7%', marginBottom: '5%' }} className='inv-info-row'>
                        <span></span>
                        <span style={{ fontWeight: 'bold' }}>{totalWeight}</span>
                        <span style={{ fontSize: 'large', fontWeight: '600' }}>Total: {totalPrice}</span>
                    </div>
                </div>
                <div>
                    <p>
                        You received {customerPackage.length} packages<br />Thank you for using our services
                    </p>
                </div>
            </div>
        </body>
  
    );
}

export default Invoice