import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import BuyProduct from './BuyProduct';

function CustomerData(props) {
  const storeData = useSelector(state => state)
  const getName = (customerID)=>{
    let customer = storeData.customers.find(x=>x.id === customerID);
    return customer.firstName + ' ' + customer.lastName;
  }

  return (
    <div>
      {
        props.data.date &&
        <span>Customer Name:</span>
      }
      <Link to={'/customers/edit/'+props.data.customerID} className='black'>{getName(props.data.customerID)}  </Link><br/>
      {
        props.data.date && 
        <div>
          Purchased Date: {new Date(props.data.date.seconds*1000).toLocaleDateString()}<br/>
          <BuyProduct customer={props.data.customerID}/>
        </div>
      }
           

        
    </div>
  );
}

export default CustomerData;
