import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import BuyProduct from './BuyProduct';
function Customers() {
  const storeData = useSelector(state => state);
  
  const getProductName = (productID)=>{
    let product = storeData.products.find(x=>x.id === productID);
    return product.name;
  }
  return (
    <div className="">
         <h1 className='blue'>Customers Page</h1>
         <div className='containerT2'>
               <table border="1" width="100%">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Purchases</th>
                    <th>Purchases Dates</th>
                    <th></th>
                  </tr>
                </thead>  
                <tbody style={{'textAlign':'left'}}>
                  {
                    storeData.customers.map(item=>{
                      return <tr key={item.id} >
                          <td>{item.firstName} {item.lastName}</td>
                          <td>
                           { 
                              storeData.purchases.filter(x=>x.customerID === item.id).map(x=>{
                                return <div key={x.id}><Link to={'/products/edit/'+x.productID}>
                                  {getProductName(x.productID)}
                                  </Link></div>
                              })
                            }
                          </td>
                          <td>
                           { 
                              storeData.purchases.filter(x=>x.customerID === item.id).map(x=>{
                                return <div key={x.id}>{new Date(x.date.seconds*1000).toLocaleDateString()}</div>
                              })
                            }
                          </td>
                          <td style={{'textAlign':'center'}}><BuyProduct customer={item.id} label='Buy Product'/></td>
                      </tr>
                    })
                  }
                
                </tbody>
              </table> 
            </div>
         <div className="back_btn"><Link to='/' className='btnT2'>Back To Menu  </Link> </div>
    </div>
  );
}

export default Customers;
