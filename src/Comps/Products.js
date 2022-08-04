import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Product from './Product';
function Products() {
  const storeData = useSelector(state => state)



  return (
    <div className="">
         <h1 className='blue'>Products Page</h1>
         <div className='wraperT1 size2'>
            <div className='containerT1'>
                <h3 className='blueTitle title'>Total Amount Of <br/>Purchased Products</h3>
                {storeData.purchases.length}
            </div>
            <div className='containerT1'>
                <h3 className='blueTitle title'>All Products</h3>
                <div className='containerT2'>
                  {
                    storeData.products.map(product=>{
                      return <Product data={product} key={product.id}/>
                    })
                  }
                  
                </div>
            </div>
         </div>
         <div className="back_btn"><Link to='/' className='btnT2'>Back To Menu  </Link> </div>
    </div>
  );
}

export default Products;
