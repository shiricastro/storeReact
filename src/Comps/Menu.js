import React from 'react';
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <h1 className='blue'>Menu Page</h1>
    <nav className="menu_container">
        <Link to='products' className='btnT1'>Products Page</Link> 
        <Link to='customers' className='btnT1'>Customers Page</Link> 
        <Link to='purchases' className='btnT1'>Purchases Page</Link> 
    </nav>
    </div>
  );
}

export default Menu;
