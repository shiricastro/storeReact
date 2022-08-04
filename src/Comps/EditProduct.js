import React from 'react';
import { useSelector } from 'react-redux';
import { Link ,useParams,useNavigate} from "react-router-dom";
import { useEffect,useState } from 'react';
import CustomerData from './CustomerData';
import firebase from '../Utils/firebaseApp'
import { useDispatch } from 'react-redux';

function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const storeData = useSelector(state => state);
  const [product, setProduct] = useState({id:'',name:'',price:0,quantity:0})
  const [customers, setCustomers] = useState([])
  const [status,setStatus]= useState({delete:false,update:false})
  
  useEffect( () =>
  {
    let products = storeData.products.find(x => x.id === params.id)
    setProduct(products);
    let customersArr = storeData.purchases
    .filter(x => x.productID === params.id)
    .map(x=>{return {'customerID':x.customerID}})
    .filter((value, index, self) =>
    index === self.findIndex((t) => (
       t.customerID === value.customerID
    )))
    setCustomers(customersArr) 
  },[storeData])
  const updateProduct = async(e) =>
  {
    e.preventDefault();
    setStatus({...status,update:true});
    //Update firebase - Product Collection
    await firebase.firestore().collection('products').doc(product.id).set({name:product.name,price:product.price,quantity:product.quantity});
    //Update redux - Product 
    dispatch({ type : "UPDATE_PRODUCT", payload :product})
    setTimeout(() => {
      setStatus({...status,update:false});
    }, 1000);
    
  }
  const deleteProduct = async(e) =>
  {
    e.preventDefault();
    setStatus({...status,delete:true});
    //Delete firebase - Product Collection
    await firebase.firestore().collection('products').doc(product.id).delete();
    //Delete firebase - Purchases Collection
    const purchasesDelete = await firebase.firestore().collection('purchases').where("productID", "==", product.id).get()
    const batch = firebase.firestore().batch();
    purchasesDelete.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    //Delete redux - Product & purchases 
    dispatch({ type : "DELETE_PRODUCT", payload :product.id})
    navigate('/products');
  }
  
  return (
    <div className="">
         <h1 className='blue'>Edit Product Page</h1>
         <div className='wraperT1'>
          <div className='containerT1 '>
            <h3 className='blueTitle title'>Modify Product</h3>
            <div className="leftText">
              {
                product && 
                <form onSubmit={e => updateProduct(e)}>
                Name: <input type="text" name="name" value={product.name} onChange={(x)=>setProduct({...product,name:x.target.value})}/>
                <br/>
                Price: <input type="text" name="price" value={product.price} onChange={(x)=>setProduct({...product,price:x.target.value})}/>
                <br/>
                Quantity: <input type="number" name="quantity" value={product.quantity} onChange={(x)=>setProduct({...product,quantity:x.target.value})}/>
                <div className="margT1 btns">
                  <div className="wraperT2">
                    <input type="submit" className='btnT1 margR1' value="Update"/>
                    <input type="button" className='btnT1 ' value="Delete" onClick={e => deleteProduct(e)}/>
                  </div>
                  {
                    (status.update ||status.delete) && <div className="labelT1">{status.update ? 'Updated!' : status.delete ? 'Deleted!' : ''}</div>
                  }
                  
                </div>
                
              </form>
              }
              
            </div>
          </div>
          <div className='containerT1'>
            <h3 className='blueTitle title'>Customers</h3>
            <div className="leftText">
            {
              customers.map((item,index)=>{
                return <CustomerData key={index} data={item} />
              })
            }
            </div>
          
          </div>
         </div>
         <div className="back_btn"><Link to='/' className='btnT2'>Back To Menu  </Link> </div>
    </div>
  );
}

export default EditProduct;
