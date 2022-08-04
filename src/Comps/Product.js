import React from 'react';
import { useSelector } from 'react-redux';
import CustomerData from './CustomerData';
import { Link } from "react-router-dom";
import { useEffect,useState } from 'react';
function Product(props) {
  const storeData = useSelector(state => state);
  const [purchase, setPurchase] = useState([])
  useEffect( () =>
  {
    let arr = storeData.purchases
    .filter(x => x.productID === props.data.id)
    .sort(function(a,b){
      return b.date - a.date;
    })
    .filter((value, index, self) =>
    index === self.findIndex((t) => (
       t.customerID === value.customerID
    )))
    setPurchase(arr) 
  },[storeData.purchases])
 
  return (
    <div className='containerT2 leftText'>
      <Link to={'/products/edit/'+props.data.id} className='black'>{props.data.name } </Link><br/>
      Price: {props.data.price } <br/>
      Quantity: {props.data.quantity }   
      {
        storeData.purchases.length >0 &&
        <div>
          <hr/>
          <strong className='margB1'>customers that bought the product:</strong><br/>
          {
            purchase.length>0 &&
            purchase.map(item => 
            {
              return <div className="containerT2 size2" key={item.id}><CustomerData  data={item}/></div>
            })
          }
        </div>
      }  
      
    </div>
  );
}

export default Product;
