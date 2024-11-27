import React, { useContext, useEffect, useState } from 'react'
import TextFieldRegisterContext from '../../../context/checkoutPage/TextFieldRegisterContext';

const TextField = ({placeholder, type, name}) => {
  
  const changeInputHandler = useContext(TextFieldRegisterContext);
  const [value, setValue] = useState({name:null});

  const handleChange = (e)=>{
      const {name, value} = e.target;
      setValue((prevValue)=>({
        ...prevValue,
        [name]:value
      }))
      changeInputHandler(name,value);
  }

  return (
    <div className='mt-3'>
        <input name={name} value={value.name} type={type} placeholder={placeholder} className='flex bg-[#000814] w-full border-t-[#000814] border-l-[#000814] border-r-[#000814] text-white focus:outline-none focus:ring-0 focus:border-transparent focus:border-b-white mt-5' onChange={handleChange}/>
    </div>
  )
}

export default TextField