import React, { useEffect, useState } from "react";
import AdminNavigationBar from "../common/AdminNavigationBar";
import ItemsTable from "../organisms/ItemsTable";
import axios from "axios";
import UpdateModalContext from "../context/UpdateModalContext";
import DeleteModalContext from "../context/DeleteModalContext";
import LoadItemsTableContext from "../context/LoadItemsTableContext";

function ItemsPage(props) {
  const [products, setProducts] = useState([]);
  const [isUpdateOpenModal, setIsUpdateModalOpen] = useState(false);
  const [isDeleteOpenModal, setIsDeleteModalOpen] = useState(false);

  const getAllProducts = () => {
    axios
      .get("http://localhost:8081/api/v1/product/get-all")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleUpdateModal = () => {
    setIsUpdateModalOpen(!isUpdateOpenModal);
  };

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteOpenModal);
  };

  return (
    <div>
      <AdminNavigationBar></AdminNavigationBar>

      <div className="p-5">
        <UpdateModalContext.Provider value={isUpdateOpenModal}>
          <DeleteModalContext.Provider  value={isDeleteOpenModal}>
            <LoadItemsTableContext.Provider value={getAllProducts}>
              <ItemsTable
                products={products}
                handleUpdateModal={handleUpdateModal}
                handleDeleteModal={handleDeleteModal}
              ></ItemsTable>
            </LoadItemsTableContext.Provider>
          </DeleteModalContext.Provider>
        </UpdateModalContext.Provider>
      </div>
    </div>
  );
}

export default ItemsPage;
