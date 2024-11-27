import React, { useEffect, useState } from 'react';
import AdminNavigationBar from '../common/AdminNavigationBar';
import { Label, FileInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Spinner } from 'flowbite-react';

function ItemAddPage(props) {

    const newIdApi = 'http://localhost:8081/api/v1/product/getNewProductID';

    useEffect(()=>{
        getNewProductID();
    },[])

    const [newID, setNewID] = useState();

    const getNewProductID = () => {
        axios.get(newIdApi)
             .then(res => {
                setNewID(res.data);
             })
             .catch(err => console.log(err));
    }

    const [dropDownState, setDropDownState] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitButtonDisable, setSubmitButtonDisable] = useState(false);
    
    const handleState = () => {
        setDropDownState(!dropDownState);
    }

    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    const clearForm = () => {
        reset();
    }

    const handleClick = async (data) => {
        setSubmitButtonDisable(true);
        console.log(data);
        const formData =  await prepareFormData(data);
        addProduct(formData);
    }

    const addProduct = (formData) => {
        axios.post('http://localhost:8081/api/v1/product/add',formData)
        .then(function(response){
            console.log(response);
            clearForm();
            // setImageUrl("");
            setSubmitButtonDisable(false);
            successAlert(response);
            getNewProductID();
        })
        .catch(function(err){
            console.log(err);
            setSubmitButtonDisable(false);
        })
    }

    const successAlert = (response) => {
        Swal.fire({
            title: "Saved!",
            text: `${response.data.name} is Saved`,
            icon: "success"
        });
    }

    const prepareFormData = (product) => {
        const formData = new FormData();
        
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('quantity', product.quantity);
        formData.append('price', product.price);
        formData.append('category', product.category);

        formData.append('file',product.images[0]);

        return formData;
    }


    const prepareImageUrl = (event) => {
        const file = event.target.files[0];
        console.log(file);
        const url = window.URL.createObjectURL(file);
        setImageUrl(url);
    }

    return (
        <React.Fragment>
            <AdminNavigationBar dropDownState={dropDownState}></AdminNavigationBar>
            <div className='flex' onClick={handleState}>

                {/* add product form */}
                <div className='md:w-1/2 w-full flex-col'>
                    

                    <form className='flex flex-col p-10 gap-2 justify-self-end'>
                    <h2 className='text-white font-semibold text-3xl'>Product ID : {newID}</h2>

                        {/* name input */}
                        <input {...register(
                            "name",
                            {
                                required: {
                                    value:true,
                                    message:"* Name is required"
                                }
                            }
                        )} placeholder='product Name' className='rounded-lg p-2 mt-8' type="text" />
                        <span className="text-xs text-[white]">{errors.name?.message}</span>
                        
                        {/* Description Input */}
                        <input {...register(
                            "description",
                            {
                                required: {
                                    value:true,
                                    message:"* Description is required"
                                }
                            }
                        )} placeholder='Product Description' className='rounded-lg p-2 mt-4' type="text" />
                        <span className="text-xs text-[white]">{errors.description?.message}</span>
                        
                        {/* Quantity Input */}
                        <input {...register(
                            "quantity",
                            {
                                required: {
                                    value:true,
                                    message:"* Quantity is required"
                                }, 
                                pattern: {
                                    value:/^0*([^0]\d*)$/,
                                    message:"Invalid Quantity"
                                }
                            }
                        )} placeholder='Quantity' className='rounded-lg p-2 mt-4' type="number" />
                        <span className="text-xs text-[white]">{errors.quantity?.message}</span>
                        
                        {/* Price Input */}
                        <input {...register(
                            "price",
                            {
                                required: {
                                    value:true,
                                    message:"* price is required"
                                }, 
                                pattern: {
                                    value:/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
                                    message:"Invalid price"
                                }
                            }
                        )} placeholder='Price' className='rounded-lg p-2 mt-4' type="text" />
                        <span className="text-xs text-[white]">{errors.price?.message}</span>
                        
                        {/* <input {...register(
                            "category",
                            {
                                required: {
                                    value:true,
                                    message:"* Category is required"
                                }
                            }
                        )} placeholder='Category' className='rounded-lg p-2 mt-8' type="text" />
                        <span className="text-xs text-[white]">{errors.category?.message}</span> */}

                        {/* Catogory Dropdown */}
                        <select name="catogory" className='rounded-lg mt-4' {...register("category", 
                            {
                                required:{
                                    value:true,
                                    message:"* Category is required"
                                }
                            })}>
                            <option value="" selected disabled hidden>Category Choose here</option>
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Kids">Kids</option>
                            <option value="Baby">Baby</option>
                        </select>
                        <span className="text-xs text-[white]">{errors.category?.message}</span>

                    </form>
                    <div className='flex p-10 justify-end -mt-10 gap-5'>
                        <div className="flex-col">
                            <button onClick={clearForm} className='bg-[#15616D] text-white py-2 px-4 rounded-lg hover:scale-105 hover:duration-150'>Clear</button>
                        </div>
                        <div className="flex-col">
                            <button onClick={handleSubmit(handleClick)} className='bg-[#15616D] text-white py-2 px-4 rounded-lg hover:scale-105 hover:duration-150 disabled:scale-100 disabled:bg-[#789ea5]' disabled={isSubmitButtonDisable}>{isSubmitButtonDisable && <Spinner color="info" aria-label="Info spinner example" />}&nbsp; Add Item</button>
                        </div>
                    </div>
                </div>

                {/* file selector */}
                <div className='md:w-1/2 flex-col mt-12 p-5'>
                    
                    <div className="flex flex-row w-full items-center justify-center">
                        <input {
                            ...register("images")
                        } type="file" onChange={prepareImageUrl}/>
                    </div>
                    
                    <div className="flex flex-row mt-5 w-80">
                        {imageUrl !== "" ? <img src={imageUrl}/>:null}
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default ItemAddPage;