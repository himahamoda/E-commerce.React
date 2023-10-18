import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {

    let userToken = localStorage.getItem('userToken')
    let headers = {
        token: userToken
    }
    function AddtoCart(id) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id
        }, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }


    function getCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((res) => res)
            .catch((err) => err)
    }
    function removeCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers
        }).then((res) => res)
            .catch((err) => err)
    }

    function updateCart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count
        }, {
            headers
        }).then((res) => res)
            .catch((err) => err)

    }
    function OnlinePyment(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress: shippingAddress
        }, {
            headers
        }).then((res) => res)
            .catch((err) => err)

    }

    return <CartContext.Provider value={{ OnlinePyment, AddtoCart, getCart, updateCart, removeCartItem }} >
        {props.children}
    </CartContext.Provider>
}