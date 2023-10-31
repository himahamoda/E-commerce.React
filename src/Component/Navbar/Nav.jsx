import { Link , useNavigate } from 'react-router-dom'

import Home from '../Home/Home'
import Cart from '../Cart/Cart'
import Wishlist from '../Wishlist/Wishlist'
import Products from '../Prudoct/Products'
import Categories from '../categories/Categories'
import Brands from '../Brands/Brands'
import { UserContext } from '../../Context/UserContext'
import { useContext } from 'react'




export default function Nav() {

  let { userToken, setUserToken } = useContext(UserContext)
  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem('userToken');
    setUserToken(null)
    navigate('/Login')
  }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to={'/'}> <i class="fas fa-cart-shopping"  ></i>FrechCart</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {userToken !== null ? <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'Cart'}>Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'Wishlist'}>Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'Products'}>products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'Categories'}>Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'Brands'}>Brands</Link>
              </li>
            </> : ''}
          </ul>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item d-flex align-items-center m-3'>
              <i className='fab fa-facebook mx-1'></i>
              <i className='fab fa-youtube mx-1'></i>
              <i className='fab fa-instagram mx-1'></i>
              <i className='fab fa-twitter mx-1'></i>
              <i className='fab fa-tiktok mx-1'></i>
            </li>
            {userToken !== null ? <>
              <li className="nav-item">
                <span onClick={() => logout()} className="nav-link cursor-pointer" to={'Logout'}>Logout</span>
              </li>

            </> : <>

              <li className="nav-item">
                <Link className="nav-link" to={'Login'}>Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={'Register'}>Register</Link>
              </li>
            </>}






          </ul>
        </div>
      </div>
    </nav>
  </>
}
