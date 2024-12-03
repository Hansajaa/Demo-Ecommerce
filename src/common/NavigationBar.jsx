import { useEffect, useState } from "react";
import user_icon from "../assets/navigation_bar_asserts/user_img.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentLogUser, setCurrentLoginUser } from "../feature/users/UserSlice";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavigationBar(dropdownState) {
  const [isUserMenuOpen, setUserMenu] = useState(false);
  const [isMainMenuOpen, setMainMenu] = useState(false);
  const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const currentLogUser = useSelector(selectCurrentLogUser);
  const dispatch =useDispatch();
  const navigate = useNavigate();


  function handleMainMenu() {
    setMainMenu(!isMainMenuOpen);
    setUserMenu(false);
    setCategoryMenuOpen(false);
  }

  function handleUserMenu() {
    if(currentLogUser){
      setUserMenu(!isUserMenuOpen);
      setMainMenu(false);
      setCategoryMenuOpen(false);
    }else{
      navigate('/login');
    }
  }

  function handleCategoryMenu() {
    setCategoryMenuOpen(!isCategoryMenuOpen);
    setMainMenu(false);
    setUserMenu(false);
  }

  const notifySuccessLogout = () => {
    toast.success("Successfully Logout!", {
        autoClose:3000,
        position: "top-center"
    });
}

  function handleLogout(){
     dispatch(setCurrentLoginUser(""));
     setUserMenu(false);
     notifySuccessLogout();
  }

  useEffect(() => {
    setUserMenu(false);
    setMainMenu(false);
    setCategoryMenuOpen(false);
  }, [dropdownState]);

  return (
    <div>
      <nav className="bg-[#15616D] border-gray-200 dark:bg-[#15616D] rounded-full w-3/4 ml-auto mt-3 mr-3">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1.5">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img
              src={logo}
              className="h-10"
              alt="Clothify Logo"
            /> */}
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
            {/* Cart Button */}
            <Link
              to={"/cart"}
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-[#15616D] dark:focus:ring-gray-600"
              aria-expanded="false"
              data-dropdown-toggle="cart"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Navigate Cart</span>
              <img
                className="h-11 w-11 rounded-full p-1"
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/shopping-cart--v1.png"
                alt="shopping-cart--v1"
              />
              <span className="bg-blue-50 rounded-full h-5 w-5 text-center">{currentLogUser ? currentLogUser.cartItems.length : 0}</span>
            </Link>

            {/* User Dropdown button */}
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-[#15616D] dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={handleUserMenu}
            >
              <span className="sr-only">Open user menu</span>
              <img width="48" height="48" src={user_icon} alt="" />
            </button>

            {/* User Dropdown menu  */}
            {isUserMenuOpen && (

                <div
                  className="z-50 absolute top-16 right-4  my-4 text-base list-none bg-[#15616D] divide-y divide-gray-100 rounded-lg shadow dark:bg-[#15616D] dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-white dark:text-white">
                      Hi, {currentLogUser.name}
                    </span>
                    <span className="block text-sm text-white dark:text-white mt-2">
                      {currentLogUser.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-white hover:bg-[#0e4047] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-white hover:bg-[#0e4047] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Points
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-white hover:bg-[#0e4047] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-white hover:bg-[#0e4047] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
            )}

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden hover:bg-[#133035] focus:outline-none focus:ring-2 focus:ring-[#15616D] dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={handleMainMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Dropdown */}
          {isMainMenuOpen && (
            <div
              className="z-50 items-end absolute top-14 translate-x-10 right-5 justify-end w-full p-2 md:hidden md:order-1 ml-auto mr-5"
              id="navbar-user"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-[#15616D] rounded-lg bg-[#15616D] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#15616D] dark:bg-gray-800 md:dark:bg-[#15616D] dark:border-gray-700">
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 px-3 text-white rounded hover:bg-[#0e4047] md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleCategoryMenu}
                    className="block py-2 px-3 text-white rounded hover:bg-[#0e4047] md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded hover:bg-[#0e4047] md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div className="items-end hidden justify-end w-full md:flex md:w-auto md:order-1 ml-auto mr-5">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#15616D] dark:bg-gray-800 md:dark:bg-[#15616D] dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleCategoryMenu}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Category
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* category dropdown */}
          {isCategoryMenuOpen && (
            <div
              className="z-50 items-end absolute top-16 translate-x-10 right-5 justify-end w-full p-2 ml-auto mr-5"
              id="navbar-user"
            >
              <ul className="flex flex-col font-medium p-4  mt-4 border border-[#15616D] rounded-lg bg-[#15616D]  rtl:space-x-reverse  dark:bg-gray-800  dark:border-gray-700">
                <li>
                  <Link
                    className="block py-2 px-3 text-white rounded hover:bg-[#0e4047]   dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700"
                    aria-current="page"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-3 text-white rounded hover:bg-[#0e4047] dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-3 text-white rounded hover:bg-[#0e4047]  dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700"
                  >
                    Baby
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-3 text-white rounded hover:bg-[#0e4047]  dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700"
                  >
                    Kids
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
