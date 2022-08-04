
const appReducer = (state = { products : [],customers:[],purchases:[]} , action) =>
{
    switch(action.type)
    {
        case "LOAD" : 
            return {...state, products : action.payload.products,customers:action.payload.customers,purchases:action.payload.purchases}
        case "ADD_PURCHASE":
            return {...state, purchases : [...state.purchases, action.payload ]}
        case "UPDATE_PRODUCT":
            let productObj = action.payload;
            let productsArr = state.products;
            let productIndex = productsArr.findIndex(x => x.id === productObj.id);
            if(productIndex >= 0)
            {                           
                productsArr[productIndex] = productObj;
            }
            return {...state, products : productsArr}
        case "DELETE_PRODUCT" : 
            let productId = action.payload;
            let productArr = state.products.filter(x => x.id !== productId);
            let purchasesArr = state.purchases.filter(x=>x.productID !== productId);

            return {...state, products : productArr,purchases:purchasesArr}
        case "UPDATE_CUSTOMER":
            let customerObj = action.payload;
            let customersArr = state.customers;
            let customerIndex = customersArr.findIndex(x => x.id === customerObj.id);
            if(customerIndex >= 0)
            {                           
                customersArr[customerIndex] = customerObj;
            }
            return {...state, customers : customersArr}
        case "DELETE_CUSTOMER" : 
            let customerId = action.payload;
            let customerArr = state.customers.filter(x => x.id !== customerId);
            let purchasesArr2 = state.purchases.filter(x=>x.customerID !== customerId);

            return {...state, customers : customerArr,purchases:purchasesArr2}
    

        case "UPDATE" : 
            let obj = action.payload;
            let arr2 = state.products;

            let index2 = arr2.findIndex(x => x.id === obj.id);
            if(index2 >= 0)
            {   
                if( obj.status !== "NEW")
                {
                    obj.status = "UPDATED";
                }                          
                arr2[index2] = obj;
            }

            return {...state, products : arr2}


        case "DELETE" : 
            let id = action.payload;
            let arr = state.products;

            let index = arr.findIndex(x => x.id === id);
            if(index >= 0)
            {
                arr[index].status = "DELETED"
            }

            return {...state, products : arr}

        default:
            return state;
    }
}


export default appReducer