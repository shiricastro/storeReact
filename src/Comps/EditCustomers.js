import React from 'react';
import { useSelector } from 'react-redux';
import { Link ,useParams,useNavigate} from "react-router-dom";
import { useEffect,useState } from 'react';
import firebase from '../Utils/firebaseApp'
import { useDispatch } from 'react-redux';

function EditCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const storeData = useSelector(state => state);
  const [customer, setCustomer] = useState({id:'',firstName:'',lastName:'',city:''})
  const [purchases, setPurchases] = useState([])
  const [status,setStatus]= useState({delete:false,update:false})
  
  useEffect( () =>
  {
    let customers = storeData.customers.find(x => x.id === params.id)
    setCustomer(customers);
    let purchasesArr = storeData.purchases
    .filter(x => x.customerID === params.id)
    .filter((value, index, self) =>
    index === self.findIndex((t) => (
       t.productID === value.productID
    )))
    setPurchases(purchasesArr) 
  },[storeData.customers])
  const getProductName = (productID)=>{
    let product = storeData.products.find(x=>x.id === productID);
    console.log(product)
    return product.name;
  }
  const updateCustomer = async(e) =>
  {
    e.preventDefault();
    setStatus({...status,update:true});
    //Update firebase - Customers Collection
    await firebase.firestore().collection('customers').doc(customer.id).set({firstName:customer.firstName,lastName:customer.lastName,city:customer.city});
    //Update redux - Customers 
    dispatch({ type : "UPDATE_CUSTOMER", payload :customer})
    setTimeout(() => {
      setStatus({...status,update:false});
    }, 1000);
    
  }
  const deleteCustomer = async(e) =>
  {
    e.preventDefault();
    setStatus({...status,delete:true});
    //Delete firebase - Customers Collection
    await firebase.firestore().collection('customers').doc(customer.id).delete();
    //Delete firebase - Customers Collection
    const purchasesDelete = await firebase.firestore().collection('purchases').where("customerID", "==", customer.id).get()
    if(purchasesDelete){
      const batch = firebase.firestore().batch();
      purchasesDelete.forEach(doc => {
          batch.delete(doc.ref);
      });
      await batch.commit();
    }
    //Delete redux - Customers & purchases 
    dispatch({ type : "DELETE_CUSTOMER", payload :customer.id})
    navigate('/customers');
  }
  
  return (
    <div className="">
         <h1 className='blue'>Edit Customer Page</h1>
         <div className='wraperT1'>
          <div className='containerT1 '>
            <h3 className='blueTitle title'>Modify Customer</h3>
            <div className="leftText">
              {
                customer && 
                <form onSubmit={e => updateCustomer(e)}>
                First Name: <input type="text" name="firstName" value={customer.firstName} onChange={(x)=>setCustomer({...customer,firstName:x.target.value})}/>
                <br/>
                Last Name: <input type="text" name="lastName" value={customer.lastName} onChange={(x)=>setCustomer({...customer,lastName:x.target.value})}/>
                <br/>
                City: <input type="text" name="city" value={customer.city} onChange={(x)=>setCustomer({...customer,city:x.target.value})}/>
                <div className="margT1 btns">
                  <div className="wraperT2">
                    <input type="submit" className='btnT1 margR1' value="Update"/>
                    <input type="button" className='btnT1 ' value="Delete" onClick={e => deleteCustomer(e)}/>
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
            <h3 className='blueTitle title'>Purchases</h3>
            <div className="leftText">
            {
              purchases.map(item=>{
                return  <Link key={item.id} to={'/products/edit/'+item.productID} className='black'>{getProductName(item.productID)}  </Link>

              })
            }
            </div>
          
          </div>
         </div>
         <div className="back_btn"><Link to='/' className='btnT2'>Back To Menu  </Link> </div>
    </div>
  );
}

export default EditCustomer;
