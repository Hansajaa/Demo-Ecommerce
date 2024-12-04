import React, { useEffect } from 'react'
import { useState } from 'react';
import Navigation from '../common/NavigationBar';
import ItemCard from '../molecules/ItemCard';
import MensBreadCrumbs from '../atoms/breadcrumbs/MensBreadCrumbs';
import { selectMensProducts } from '../feature/products/ProductsSlice';
import { useSelector } from 'react-redux';
import FooterSection from '../common/FooterSection';
import ItemsNotMatch from '../atoms/animations/ItemsNotMatchAnimation';

const HomeShopAllPage = () => {

    const [productsArray, setProductsArray] = useState([]);

    const [dropdownState, setDropdownState] = useState(false);
    const mensProducts = useSelector(selectMensProducts);

    const handleClick = () => {
        setDropdownState(!dropdownState);
    }

    useEffect(()=>{
        setProductsArray(mensProducts);
    },[])

    const handleChange = (e) => {
        const searchWords = e.target.value;

        if(searchWords == ""){
            setProductsArray(mensProducts);
        }else{
            let filteredProducts = []
            for (let index = 0; index < mensProducts.length; index++) {
                if(mensProducts.at(index).name.startsWith(searchWords)){
                    filteredProducts.push(mensProducts.at(index));
                }          
            }
            setProductsArray(filteredProducts);
        }

    }


    return (

        <div>
            <Navigation dropdownState={dropdownState}></Navigation>

            <div className='grid grid-cols-5' onClick={handleClick}>
                {/* filters column*/}
                <div>
                    <div className='hidden lg:block'>
                        <MensBreadCrumbs></MensBreadCrumbs>
                    </div>
                </div>

                {/* items */}
                <div className='col-span-4'>

                    {/* search field */}
                    <div className='flex items-end'>
                        <input onKeyUp={handleChange} id="search" className={'p-2 mt-8 ml-auto mr-5 rounded-full border-10 focus:border-[#15616D] focus:ring-[#15616D] w-96'} type="text" placeholder="search" />
                    </div>

                    {/* items columns */}
                    <div className='grid grid-flow-row'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                            {
                                productsArray.length != 0 ? productsArray.map((item, i)=>(
                                    <ItemCard key={i} product={item} name={item.name} imageUrl={item.image_url} price={item.price} quantity={item.quantity}></ItemCard>
                                ))  :  
                                <div className='col-span-3'>
                                    <ItemsNotMatch/>
                                </div>
                            }
                        </div>
                    </div>

                </div>

            </div>

            <div className='p-2'>
                <FooterSection></FooterSection>
            </div>
        </div>
    )
}

export default HomeShopAllPage