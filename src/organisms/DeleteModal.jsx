import React, { useContext } from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DeleteModalContext from "../context/DeleteModalContext";
import LoadItemsTableContext from "../context/LoadItemsTableContext";
import axios from "axios";
import Swal from "sweetalert2";

function DeleteModal({handleDeleteModal, product}) {

  const isDeletModalOpen =  useContext(DeleteModalContext);
  const loadItemsTable = useContext(LoadItemsTableContext);

  const handleDelete = () => {
    axios.delete(`http://localhost:8081/api/v1/product/deleteById/${product.id}`)
    .then((res)=>{
        if(res.data){
            loadItemsTable();
            handleDeleteModal();
            successAlert();
        }
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  const successAlert = () => {
    Swal.fire({
      title: "Deleted!",
      text: `${product.name} was successfully Deleted!`,
      icon: "success"
    });
  }
    
  return (
    <div>
      <Modal
        show={isDeletModalOpen}
        size="md"
        onClose={handleDeleteModal}
        popup
      >
        <Modal.Header className="bg-[#15616D]"/>
        <Modal.Body className="bg-[#15616D]">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-50 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button hidden={true} color="gray" onClick={handleDeleteModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DeleteModal;
