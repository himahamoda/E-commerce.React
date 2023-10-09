import axios from "axios";
import { createContext } from "react";



export let WishContext = createContext()

export function WishContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    async function AddWish(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId
        },
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function getwish(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers
        })
        .then((res) => res)
        .catch((err) => err)
    }

    function removeWishItem (id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {
            headers
        }).then((res)=>res)
        .catch((err)=>err)
    }
    return <WishContext.Provider value={{ AddWish , getwish , removeWishItem }}>
        {props.children}
    </WishContext.Provider>
}