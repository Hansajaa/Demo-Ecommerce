import { Breadcrumb } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiHome } from "react-icons/hi";

const MensBreadCrumbs = () => {
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/')
    }

    return (
        <div className='ml-3 mt-10'>
            <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item icon={HiHome} onClick={handleClick} className='cursor-pointer'>
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item>Catogory</Breadcrumb.Item>
                <Breadcrumb.Item>Mens</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default MensBreadCrumbs