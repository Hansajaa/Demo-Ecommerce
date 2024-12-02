import registerImage from "../assets/login_page_asserts/login_page_side_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {basicSchema} from '../schemas/register/RegisterSchemas'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerNewUser } from "../feature/users/UserSlice";
import { useDispatch } from "react-redux";


function RegisterPage(props) {

    const dispatch = useDispatch();

    let navigate = useNavigate();

    

    const notifySuccess = (name) => {
        toast.success(`Successfully registered ${name}!`, {
            autoClose:3000
        });

        // navigate("/login");
    }
    
    const onSubmit = (values, actions) => {
        dispatch(registerNewUser(values));
        actions.resetForm();
        notifySuccess(values.name);
    }

    const {values, handleChange, errors, handleSubmit} = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:""
        },
        validationSchema: basicSchema,
        onSubmit
    })

    

    //-----------------------------------------------------------------------------

    // function saveUser(user){
    //     axios.post('http://localhost:8080/api/v1/user/add', user)
    //     .then(function (response){
    //         if(response !== null){
    //             reset();
    //             successAlert(response.data);
    //         }
    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })
    // }

    // function successAlert(username){
    //     Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: `You're Successfully Registered ${username}`,
    //         showConfirmButton: false,
    //         timer: 1500
    //     });
    //     navigate("/login");
    // }

    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                {/* register container */}
                <div className="bg-gray-100 flex shadow-2xl max-w-3xl md:p-0 p-10 items-center rounded-2xl">

                    {/* form */}
                    <div className="md:w-1/2 p-2">
                        <h2 className="font-bold text-2xl mt-3 text-center text-[#17396d]">Register</h2>
                        <p className="mt-3 text-center text-[#17396d]">
                            Welcome to Clothify Store
                        </p>

                        <form action="" className="flex flex-col p-3 gap-4" noValidate>
                            
                            {/* Name field*/}
                            <input id="name" value={values.name} onChange={handleChange} className={`p-2 rounded-xl ${errors.name ? `focus:border-red-700 focus:ring-red-700`:`focus:border-blue-700 focus:ring-blue-700`}`} type="text" placeholder="* Enter Name"/>
                            {errors.name && <span className="-mt-3 text-[red] text-xs">{errors.name}</span>}
                            
                            {/* email field */}
                            <input id="email" value={values.email} onChange={handleChange} className={`p-2 rounded-xl ${errors.email ? `focus:border-red-700 focus:ring-red-700`:`focus:border-blue-700 focus:ring-blue-700`}`} type="email" placeholder="Enter E-mail" />
                            {errors.email && <span className="-mt-3 text-xs text-[red]">{errors.email}</span>}
                            
                            {/* password field */}
                            <div className="relative">
                                <input id="password" value={values.password} onChange={handleChange} className={`p-2 rounded-xl w-full ${errors.password ? `focus:border-red-700 focus:ring-red-700`:`focus:border-blue-700 focus:ring-blue-700`}`} type="password" placeholder="Enter Password"/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-2" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            </div>
                            {errors.password && <span className="-mt-3 text-xs text-[red]">{errors.password}</span>}
                            
                            {/* Register button */}
                            <button className="bg-[#17396d] py-2 rounded-xl text-white hover:scale-105 duration-300" onClick={handleSubmit}>Sign Up</button>
                        </form>

                        <div className="grid grid-cols-3 text-gray-400 mt-5 w-5/6 ml-7">
                            <hr className="border-gray-400 mt-2" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-400 mt-2"/>
                        </div>
                    
                        {/* google login button */}
                        <div className="p-3">
                        <button className="mt-3 py-2 bg-black text-white px-10 rounded-xl w-full flex justify-center text-sm items-center hover:scale-105 duration-300">
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Sign Up with google
                        </button>
                        </div>

                        {/* navigate to the login page */}
                        <div className="flex justify-between text-sm item-center mt-4">
                            <p className="mt-2">You already Have an account? </p>
                            <Link to={"/login"} className="bg-white px-5 py-2 border rounded-xl mb-3 mr-4 hover:scale-110 duration-300">Login</Link>
                        </div>
                        
                    </div>

                    {/* image */}
                    <div className="w-1/2 p-3 md:block hidden">
                        <img className="rounded-2xl" src={registerImage} alt="" />
                    </div>
                </div>
            </section>

            <ToastContainer />
        </div>
    );
}

export default RegisterPage;