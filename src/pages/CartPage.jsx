import NavigationBar from '../common/NavigationBar'
import CartTable from '../organisms/CartTable'

const CartPage = () => {

    return (
        <div>
            <NavigationBar></NavigationBar>

            <h1 className='text-white text-center text-3xl m-10 font-semibold'>Cart</h1>
            
            <div className='m-3'>
                <CartTable />
            </div>
        </div>
    )
}

export default CartPage