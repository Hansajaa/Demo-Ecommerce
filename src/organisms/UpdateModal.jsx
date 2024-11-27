"use client";
import React, { useContext, useState, useEffect } from "react";
import UpdateModalContext from "../context/UpdateModalContext";
import { X } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import LoadItemsTableContext from "../context/LoadItemsTableContext";

function UpdateModal({ handleUpdateModal, product }) {
  
  const isUpdateOpenModal = useContext(UpdateModalContext);
  const loadItemTable = useContext(LoadItemsTableContext);


  // Initialize local state with the product prop
  const [formData, setFormData] = useState({
    id:0,
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  // Update local state when the product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || 0,
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price || '',
        quantity: product.quantity || '',
      });
    }
  }, [product]);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const updateProduct = () => {
    axios.put('http://localhost:8081/api/v1/product/put',formData)
    .then((res)=>{
        if(res.status === 200){
           handleUpdateModal();
           loadItemTable();
           successAlert(res.data);
        }else{
          handleUpdateModal();
          warningAlert();
        }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const successAlert = (product) => {
    Swal.fire({
      title: "Updated!",
      text: `${product.name} is Successfully Updated.`,
      icon: "success"
    });
  }

  const warningAlert = () => {
    Swal.fire({
      title: "Not Updated!",
      text: `${formData.name} is Not Updated.`,
      icon: "warning"
    });
  }

  return (
    <div>
      {isUpdateOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
          <div className="mt-2 flex flex-col gap-5 text-white">
            <button className="place-self-end" onClick={handleUpdateModal}>
              <X size={30} />
            </button>
            <div className="bg-[#15616D] rounded-xl px-20 py-7 flex flex-col gap-5 items-center mx-4">
              <h4 className="text-2xl font-bold -translate-y-3">
                Update product ({product.id})
              </h4>
              <div className="flex flex-row">
                <form className="flex flex-col gap-3">
                  <label htmlFor="name">Product Name</label>
                  <input
                    className="w-full px-10 py-2 text-black rounded-md"
                    value={formData.name}
                    id="name"
                    type="text"
                    onChange={handleInputChange}
                  />

                  <label htmlFor="name">Product Description</label>
                  <input
                    className="w-full px-10 py-2 text-black rounded-md"
                    value={formData.description}
                    id="description"
                    type="text"
                    onChange={handleInputChange}
                  />

                  <label htmlFor="name">Category</label>
                  <input
                    className="w-full px-10 py-2 text-black rounded-md"
                    value={formData.category}
                    id="category"
                    type="text"
                    onChange={handleInputChange}
                  />

                  <label htmlFor="name">Price (Rs.)</label>
                  <input
                    className="w-full px-10 py-2 text-black rounded-md"
                    value={formData.price}
                    id="price"
                    type="text"
                    onChange={handleInputChange}
                  />

                  <label htmlFor="name">Quantity</label>
                  <input
                    className="w-full px-10 py-2 text-black rounded-md"
                    value={formData.quantity}
                    id="quantity"
                    type="number"
                    onChange={handleInputChange}
                  />
                </form>
              </div>

              <div className="place-self-end">
                <button className="bg-[#000814] px-4 py-2 rounded-md hover:bg-[#152235]" onClick={updateProduct}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateModal;
