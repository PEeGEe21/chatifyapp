import React from 'react'
import { useRouter } from "next/router";
import axios from "axios";
import { logoutRoute } from "../components/routes";

const Logout = () => {
    const router = useRouter();
    const handleClick = async () => {
      localStorage.clear();
      router.push("/login");
    };
    // const handleClick = async () => {
    //   const id = await JSON.parse(
    //     localStorage.getItem('chatify-user')
    //   )._id;

    //   console.log(id);
    //   const data = await axios.get(`${logoutRoute}/${id}`);
      
    //   console.log(data)
    //   if (data.data.status === 200) {
    //     localStorage.clear();
    //     router.push("/login");
    //   }
    // };
    return (
        <>
            <button className="w-full flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleClick}>
                <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z" fill="currentColor"></path>
                </svg>

                <span className="mx-1">
                    Sign Out
                </span>
            </button>
      </>
    );
}

export default Logout