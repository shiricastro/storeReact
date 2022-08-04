import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState ,useEffect} from 'react';
function Purchases() {
  const storeData = useSelector(state => state)
  const [purchases, setPurchases] = useState([])
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState({})
  const [search,setSearch] =  useState(false)
  
  useEffect( () =>
  {
    let data = storeData.customers.map(x=>{
      let p = storeData.purchases.filter(y=>y.customerID === x.id).map(y=>{
        let product = storeData.products.find(c=>c.id === y.productID);
        let productName = product.name;
        return{productID:y.productID,productName:productName,date:y.date}
      });
      return {id:x.id,name:x.firstName + ' ' + x.lastName,purchases:p}
    })
    setData(data);
    setPurchases(data);
  },[storeData])
  const searchPurchases = (e) =>
  {
    e.preventDefault();
 
    if(searchData.customer || searchData.product || searchData.date){
      let arr = [...data];
      if(searchData.customer){
        arr = arr.filter(x=>x.id === searchData.customer);
      }
      if(searchData.product){
        arr = arr.map(x=>{
          return {...x,purchases:x.purchases.filter(p=>p.productID === searchData.product)}
        })
        arr = arr.filter(x=>x.purchases.length>0)
      }
      if(searchData.date){
        arr = arr.map(x=>{
          return {...x,purchases:x.purchases.filter(p=>(new Date(p.date.seconds*1000).toDateString()) === searchData.date)}
        })
        arr = arr.filter(x=>x.purchases.length>0)
      }
      setPurchases(arr);
      setSearch(true);
    }
   
  }
  const clearSearch = (e) =>
  {
    e.preventDefault();
    setPurchases(data);
    setSearchData({})
    setSearch(false);
    document.getElementById("form").reset();
  }
  
  return (
    <div className="">
         <h1 className='blue'>Purchases Page</h1>
         <div className='containerT2'>
          <div className='search_container margB1'>
            <form onSubmit={e => searchPurchases(e)} id="form">
              <div className='form_item'>
                <label htmlFor="product">Product: </label>
                <select name="product" onChange={(x)=>setSearchData({...searchData,product:x.target.value})}>
                  <option value="" defaultValue></option>
                  {
                    storeData.products.map(item=>{
                      return <option key={item.id} value={item.id}>{item.name}</option>
                    })
                  }
                </select>
              </div>
              <div className='form_item'>
                <label htmlFor="customer">Customer: </label>
                <select name="customer" onChange={(x)=>setSearchData({...searchData,customer:x.target.value})}>
                  <option value="" defaultValue></option>
                  {
                    storeData.customers.map(item=>{
                      return <option key={item.id} value={item.id}>{item.firstName} {item.lastName}</option>
                    })
                  }
                </select>
              </div>
              <div className='form_item'>
                <label htmlFor="date">Purchased date: </label>
                <input type="date" name="date" id="date" onChange={(x)=>setSearchData({...searchData,date:(new Date(x.target.value)).toDateString()})}/>
              </div>
              <input type="submit" className=' btnT1' value='Search'/>
              {
                search &&
                <input type="button" className='btn btnT1' value='Clear Search' onClick={e => clearSearch(e)}/>
              }
            </form>
            
          </div>
          <div className='margB1' style={{'display':'block'}}>
          <table border="1" width='100%' className='purchases_table' >
            <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Purchased Products</th>
                  <th>Purchased Dates</th>
                </tr>
            </thead>
            <tbody style={{'textAlign':'left'}}>
              {
                purchases.map(x=>{
                  return <tr key={x.id}>
                      <td>{x.name}</td>
                      <td>
                        {
                          x.purchases.map((p,index)=>{
                            return <div key={index}>{p.productName}</div>
                          })
                        }
                      </td>
                      <td>
                        {
                          x.purchases.map((p,index)=>{
                            return <div key={index}>{new Date(p.date.seconds*1000).toLocaleDateString()}</div>
                          })
                        }
                      </td>
                  </tr>
                })
              }
              <tr></tr>
            </tbody>
          </table>
          </div>
          
         </div>
         <div className="back_btn"><Link to='/' className='btnT2'>Back To Menu  </Link> </div>
    </div>
  );
}

export default Purchases;
