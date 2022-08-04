import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Menu from './Comps/Menu';
import Products from './Comps/Products';
import Customers from './Comps/Customers';
import Purchases from './Comps/Purchases';
import EditCustomers from './Comps/EditCustomers';
import EditProduct from './Comps/EditProduct';

import { useEffect } from 'react';
import firebase from './Utils/firebaseApp'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect( () =>
  {
    async function getData(){
      let productsDB = await firebase.firestore().collection('products').get();
      let products = [];
      productsDB.forEach(doc =>
      {
        let product = {id : doc.id, name : doc.data().name,price : doc.data().price,quantity : doc.data().quantity};
        products.push(product);
      })
      let customersDB = await firebase.firestore().collection('customers').get();
      let customers = [];
      customersDB.forEach(doc =>
      {
        let customer = {id : doc.id, firstName : doc.data().firstName, lastName : doc.data().lastName, city : doc.data().city};
        customers.push(customer);
      })
      let purchasesDB = await firebase.firestore().collection('purchases').get();
      let purchases = [];
      purchasesDB.forEach(doc =>
      {
        let purchase = {id : doc.id, customerID : doc.data().customerID, productID : doc.data().productID, date : doc.data().date};
        purchases.push(purchase);
      })
        dispatch({ type : "LOAD", payload :{'products':products,'customers':customers,'purchases':purchases}})
    }
    
    getData();  
  })

  return (
    <div className="App">
          <Routes>
            <Route path="/" element={ <Menu/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/products/edit/:id' element={<EditProduct/>}/>
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/customers/edit/:id' element={<EditCustomers/>}/>
            <Route path='/purchases' element={<Purchases/>}/>
          </Routes>
    </div>
  );
}

export default App;
