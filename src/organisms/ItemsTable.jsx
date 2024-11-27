import {useState} from 'react'
import { Table } from "flowbite-react";
import ModalPopup from "./UpdateModal";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

function ItemsTable({ products, handleUpdateModal, handleDeleteModal }) {
  
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    category: "",
    price: 0.0,
    quantity: 0,
  });

  const handleUpdateModalState = (selectedProduct) => {
    setProduct(selectedProduct);
    handleUpdateModal();
  };

  const handleDeleteModalState = (selectedProduct) => {
    setProduct(selectedProduct);
    handleDeleteModal();
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
              Product name
            </Table.HeadCell>
            <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
              Description
            </Table.HeadCell>
            <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
              Category
            </Table.HeadCell>
            <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
              Price
            </Table.HeadCell>
            <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {Array.isArray(products) &&
              products.map((p) => (
                <Table.Row className="bg-swhite border-gray-600 bg-gray-700 hover:bg-gray-500">
                  <Table.Cell className="whitespace-nowrap font-bold text-white">
                    {p.name}
                  </Table.Cell>
                  <Table.Cell className="text-white font-extralight">
                    {p.description}
                  </Table.Cell>
                  <Table.Cell className="text-white font-extralight">
                    {p.category}
                  </Table.Cell>
                  <Table.Cell className="text-white font-extralight">
                    Rs.{p.price}
                  </Table.Cell>
                  <Table.Cell className="text-white font-extralight">
                    {p.quantity}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => {
                      handleUpdateModalState(p);
                    }}
                  >
                    <a
                      href="#"
                      className=" text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      <AiOutlineEdit size={20}></AiOutlineEdit>
                    </a>
                  </Table.Cell>

                  <Table.Cell onClick={()=>{handleDeleteModalState(p)}}>
                    <a
                      href="#"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      <AiOutlineDelete size={20}></AiOutlineDelete>
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>

      {/* Product Update Modal */}
      <UpdateModal handleUpdateModal={handleUpdateModal}  product={product}></UpdateModal>

      {/* Product Delete Modal */}
      <DeleteModal handleDeleteModal={handleDeleteModal} product={product}></DeleteModal>
    </div>
  );
}

export default ItemsTable;
