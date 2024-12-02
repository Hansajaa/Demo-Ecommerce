import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomeShopAllPage from './pages/HomeShopAllPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage></HomePage>}/>
          <Route path='login' element={<LoginPage></LoginPage>}/>
          <Route path='signup' element={<RegisterPage></RegisterPage>}/>
          <Route path='cart' element={<CartPage></CartPage>}></Route>
          <Route path='checkout' element={<CheckoutPage></CheckoutPage>}></Route>
          <Route path='homeShopAll' element={<HomeShopAllPage></HomeShopAllPage>}></Route>

          {/* 404 page */}
          <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
