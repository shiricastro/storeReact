import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import firebase from '../Utils/firebaseApp'
import { useDispatch } from 'react-redux';

function BuyProduct(props) {
  const dispatch = useDispatch();
  const storeData = useSelector(state => state)
  const [active, setActive] = useState(false)
  const [product, setProduct] = useState('')

  const buyProduct = async(e) =>
  {
    e.preventDefault();

    if(product !== ''){
      
      let objPurchase ={
        'customerID':props.customer,
        'productID':product,
         'date':firebase.firestore.Timestamp.now()
        }
      //Update firebase - Purchases Collection
      let purchaseId = await firebase.firestore().collection('purchases').add(objPurchase);
      objPurchase['id']=purchaseId;
      //Update redux - Purchase 
      dispatch({ type : "ADD_PURCHASE", payload :objPurchase})

      //Update firebase - Product Collection
      let objProduct =storeData.products.find(x=>x.id === product);
      objProduct.quantity = objProduct.quantity -1;
      await firebase.firestore().collection('products').doc(product).set({name:objProduct.name,price:objProduct.price,quantity:objProduct.quantity});
      //Update redux - Product 
      dispatch({ type : "UPDATE_PRODUCT", payload :objProduct})
      setActive(false)
      setProduct('');
      
    }
  }
  return (
    <div className="">
      {
        !active &&
        <button className='btnT2 ' onClick={()=>setActive(true)}>{props.label ? props.label : 'Add'}</button>
      }
      {
        active &&
        
        <div className={`containerT2 size2 ${props.label ? "" : " margT1"}`}>
        <button className='btn_close ' onClick={()=>setActive(false)}>X</button>

        <form onSubmit={e => buyProduct(e)}>
          <div className='wraperT2'>
          <select name="product" className='margR1' onChange={(x)=>setProduct(x.target.value)}>
            <option value="" defaultValue>Select Product</option>
            {
              storeData.products.filter(x=>x.quantity >0).map(item=>{
                return <option key={item.id} value={item.id}>{item.name}</option>
              })
            }
          </select>
          <input type="submit" className='btnT1 size2' value="Save"/>
          </div>
        </form>
        </div>
      }
        
    </div>
  );
}

export default BuyProduct;
