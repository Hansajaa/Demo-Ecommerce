import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MenCategorySection from './pages/MenCategorySection'
import RegisterPage from './pages/RegisterPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WomenCategorySection from './pages/WomenCategorySection'
import ItemAddPage from './pages/ItemAddPage'
import BabyCategorySection from './pages/BabyCategorySection'
import KidsCategorySection from './pages/KidsCategorySection'
import ItemsPage from './pages/ItemsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage></HomePage>}/>
          <Route path='login' element={<LoginPage></LoginPage>}/>
          <Route path='signup' element={<RegisterPage></RegisterPage>}/>
          <Route path='menCategory' element={<MenCategorySection></MenCategorySection>}></Route>
          <Route path='womenCategory' element={<WomenCategorySection></WomenCategorySection>}></Route>
          <Route path='addItem' element={<ItemAddPage></ItemAddPage>}></Route>
          <Route path='babyCategory' element={<BabyCategorySection></BabyCategorySection>}></Route>
          <Route path='kidsCategory' element={<KidsCategorySection></KidsCategorySection>}></Route>
          <Route path='items' element={<ItemsPage></ItemsPage>}></Route>
          <Route path='cart' element={<CartPage></CartPage>}></Route>
          <Route path='checkout' element={<CheckoutPage></CheckoutPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
