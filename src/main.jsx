import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import ErrorBoundary from './Components/ErrorBoundary.jsx'
import Offers from './pages/Offers.jsx'
import WishList from './pages/WishList.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Shop from './pages/Shop.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Cart from './pages/Cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
        <Routes>
          <Route path="/" element={<App />}  errorElement = {<ErrorBoundary/>} >
            <Route path="/" element={<Home/>}  errorElement = {<ErrorBoundary/>} />
            <Route path="category/:categoryName" element={<Category />} errorElement = {<ErrorBoundary/>}>
             <Route path="product/:productName" element={<ProductPage />} errorElement = {<ErrorBoundary/>} /> 
            </Route> 
            <Route path="Offers" element={<Offers />} errorElement = {<ErrorBoundary/>} /> 
            <Route path="WishList" element={<WishList />} errorElement = {<ErrorBoundary/>} /> 
            <Route path="ContactUs" element={<ContactUs />} errorElement = {<ErrorBoundary/>} /> 
            <Route path="Shop" element={<Shop />} errorElement = {<ErrorBoundary/>} /> 
            <Route path="cart" element={<Cart />} errorElement = {<ErrorBoundary/>} /> 
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
