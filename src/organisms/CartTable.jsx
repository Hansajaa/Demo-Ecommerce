import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'
import { itemQtyHandler, deleteItem } from '../feature/cart/cartSlice'
import { CART_ITEM_QTY_DECREMENT, CART_ITEM_QTY_INCREMENT } from '../types/cartQtyType';
import CartPageAnimation from '../atoms/animations/CartPageAnimation';
import { useNavigate } from 'react-router-dom';

const CartTable = () => {
    const cartItems = useSelector((state) => state.cartItems);
    const cartItemCount = useSelector((state) => state.cartItemCount);
    const navidate = useNavigate()
    const dispatch = useDispatch();


    const incrementQty = (productID) => {
        dispatch(itemQtyHandler({ productID: productID, type: CART_ITEM_QTY_INCREMENT }));
    }

    const decrementQty = (productID) => {
        dispatch(itemQtyHandler({ productID: productID, type: CART_ITEM_QTY_DECREMENT }));
    }

    const handleCartItemDelete = (productID) => {
        dispatch(deleteItem({ productID: productID }));
    }

    return (
        <div className="overflow-x-auto">
            {cartItemCount > 0 ? <div>
                <Table>
                    <Table.Head>
                        <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
                            Product Code
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
                            product name
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
                            Quantity
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
                            price
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white border-gray-700 bg-gray-800">
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {Array.isArray(cartItems) && cartItems.map((p, index) => (
                            <Table.Row key={index} className="bg-swhite border-gray-600 bg-gray-700 hover:bg-gray-600">
                                <Table.Cell className="whitespace-nowrap font-bold text-white">
                                    {p.productID}
                                </Table.Cell>
                                <Table.Cell className="text-white font-extralight">
                                    {p.name}
                                </Table.Cell>
                                <Table.Cell className="text-white font-extralight">
                                    <Button.Group className="flex gap-2">
                                        <Button className="rounded-lg" color="info" onClick={() => decrementQty(p.productID)}>-</Button>
                                        <p className="bg-white text-black p-2 px-4 rounded-md">{p.cartQty}</p>
                                        <Button className="rounded-lg" color="info" onClick={() => incrementQty(p.productID)}>+</Button>
                                    </Button.Group>
                                </Table.Cell>
                                <Table.Cell className="text-white font-extralight">
                                    Rs.{p.cartPrice}
                                </Table.Cell>

                                <Table.Cell onClick={null}>
                                    <a
                                        href="#"
                                        onClick={() => handleCartItemDelete(p.productID)}
                                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                                    >
                                        <AiOutlineDelete size={20}></AiOutlineDelete>
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <div className='flex flex-row justify-end m-4'>
                    <button onClick={()=>{
                        navidate('/checkout')
                    }} className='bg-[#0c353b] px-5 py-2 rounded-md text-white font-semibold mt-5 hover:bg-[#216874]'>Checkout</button>
                </div>
            </div> : <CartPageAnimation />}
        </div>
    )
}

export default CartTable