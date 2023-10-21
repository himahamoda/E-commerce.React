import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/Cartcontext'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Cart() {
  
const [cartITems, setCartITems] = useState(null)
const [loaing, setLoaing] = useState(true)
  let{getCart , removeCartItem , updateCart }= useContext(CartContext)



  async  function removeItem (id){
let {data} =await removeCartItem(id) 
console.log(data)
setCartITems(data)
  }

  async  function UpdateCount (id , count){
    let {data} =await updateCart(id,count) 
    console.log(data)
    setCartITems(data)
      }

      
async function getCartitems(){
let {data} = await getCart()
console.log(data);
setCartITems(data)
setLoaing(false)
}

useEffect(()=>{
  getCartitems()
},[])
  return (
  <>
   {loaing? <div className="vh-100 w-100 d-flex justify-content-center align-items-center">

   <BallTriangle
       height={100}
       width={100}
       radius={5}
       color='#4fa94d'
       wrapperClass={{}}
       wrapperStyle=""
       visible={true}

   />
</div> :<div className=" bg-main-light p-4">
    <h2>shop cart</h2>
    <h2 className='h6 text-main fw-bold '>Total price:{cartITems.data.totalCartPrice} </h2>
    {/* <h2 className='h6 text-main fw-bold'>Total items:{cartITems.numOfCartItems} </h2> */}


{cartITems.data.products.map((products)=> 
<div key={products} className="row border-bottom py-4">
  <div className="col-md-1">
    <img src={products.product.imageCover} className='w-100' alt="" />
  </div>
  <div className="col-md-11 d-flex justify-content-between"> 

 <div>
  <h3 className='h6 fw-bold'>title{products.product.title.split(' ').slice(0.7).join(' ')}</h3>
  <h3 className='h6 text-main '>price : {products.price}EGP</h3>
  <button onClick={()=>removeItem(products.product.id)} className='btn p-0'> <i className='fas fa-trash-can text-main'></i> Remove</button>
  </div>
 
<div className="">
  <button  onClick={()=>UpdateCount(products.product.id, products.count +1 )}  className='btn btn-sm border me-1'>+</button>
  <span>{products.count}</span>
  <button  onClick={()=>UpdateCount(products.product.id, products.count -1 )} className='btn btn-sm border ms-1'>-</button>
</div>
</div>
</div>

)}
<Link to={`/checkout/${cartITems.data._id}`} >
<button className='btn bg-main text-white'>checkout</button>

</Link>
</div>
}
</> )
}



























// import axios from 'axios'
// import React, { useContext, useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { Link, useNavigate } from 'react-router-dom'
// function Cart() {

//   let [totalCartPrice, setTotalCartPrice] = useState(0)
//   let [numOfCartItems, setNumOfCartItems] = useState(0)
//   let [products, setProducts] = useState([])
//   let [cartId, setCartId] = useState("")
//   let [errorMessage, setErrorMessage] = useState("")
//   let [reqInterval, setReqInterval] = useState()
//   let navigate = useNavigate()
//   let { userToken, setUser } = useContext()
//   useEffect(() => {
//     getUserCartProducts()
//   }, [])


//   async function getUserCartProducts() {
//     let res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
     
//         token: localStorage.getItem("token")
      
//     }).catch((err) => {
//       console.log(err.response.data.message);
//       setErrorMessage(err.response.data.message)
//     })

//     console.log(res);
//     if (res) {
//       setTotalCartPrice(res?.data.data.totalCartPrice)
//       setProducts(res?.data.data.products)
//       setCartId(res?.data.data._id)
//       setNumOfCartItems(res?.numOfCartItems)
//     }

//   }

//   async function removeCartProduct(productId) {
//     let res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
//       headers: {
//         token: localStorage.getItem("token")
//       }
//     }).catch((err) => {
//       console.log(err.response.data.message);
//       toast.error(err.response.data.message)
//       localStorage.removeItem("token")
//       setIsUserLoggedIn(false)
//       navigate("/login")
//     })

//     console.log(res);
//     if (res) {
//       setTotalCartPrice(res?.data.data.totalCartPrice)
//       setProducts(res?.data.data.products)
//       setNumOfCartItems(res?.numOfCartItems)
//     }

//   }

//   async function clearCartProduct() {
//     let res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/", {
//       headers: {
//         token: localStorage.getItem("token")
//       }
//     })

//     console.log(res?.data);
//     if (res?.data.message == 'success') {
//       setTotalCartPrice(0)
//       setProducts([])
//       setNumOfCartItems(0)
//     }

//   }



//   async function updateProductCount(productId, count, index) {


//     let newProducts = [...products]
//     newProducts[index].count = count

//     setProducts(newProducts)


//     clearTimeout(reqInterval)
//     setReqInterval(setTimeout(async () => {
//       let res
//       if (count == 0) {
//         removeCartProduct(productId)
//       } else {
//         res = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
//           count
//         }, {
//           headers: {
//             token: localStorage.getItem("token")
//           }
//         })

//       }

//       if (res) {
//         setTotalCartPrice(res?.data.data.totalCartPrice)
//         setProducts(res?.data.data.products)
//         setNumOfCartItems(res?.numOfCartItems)
//       }
//       console.log(res);
//     }, 500))



//   }




//   return (
//     <>
//       <button onClick={clearCartProduct} className='btn btn-outline-danger d-block ms-auto my-3'>Clear Cart</button>
//       {errorMessage ?
//         <div className='alert alert-warning text-center'>
//           <h3>No products in your cart</h3>
//         </div> :
//         products.map((product, index) => {
//           return <div className="row p-2 my-3 shadow rounded-2 align-items-center">
//             <div className="col-md-2">
//               <img className='w-100' src={product.product.imageCover} alt="" />
//             </div>
//             <div className="col-md-8">
//               <h2>{product.product.title}</h2>
//               <h5 className='font-sm text-main'>{product.product.category.name}</h5>
//               <p>
//                 <span className='mx-3'>Price: {product.price}EGP</span>
//                 <span className='mx-3'><i className='fas fa-star text-main'></i>{product.product.ratingsAverage}</span>
//               </p>
//             </div>
//             <div className="col-md-2">
//               <button onClick={() => removeCartProduct(product.product._id)} className='btn text-danger d-block mb-5'>Remove</button>
//               <div className="d-flex align-items-center">
//                 <button onClick={() => updateProductCount(product.product._id, product.count - 1, index)} className='btn bg-main mx-2 text-white'>-</button>
//                 <span>{product.count}</span>
//                 <button onClick={() => updateProductCount(product.product._id, product.count + 1, index)} className='btn bg-main mx-2 text-white'>+</button>
//               </div>
//             </div>
//           </div>
//         })
//       }

//       <div className='text-end my-5 d-flex justify-content-between'>
//         <Link to={'/address/'+ cartId} className='btn bg-main text-white'>Checkout</Link>
//         <p><span className='fw-bolder'>Total Cart Price:</span> {totalCartPrice}EGP</p>
//       </div>
//     </>
//   )
// }

// export default Cart