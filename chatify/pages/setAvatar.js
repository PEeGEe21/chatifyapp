import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import styles from '../styles/Login.module.css'
import toast, { Toaster } from 'react-hot-toast';
import {setAvatarRoute} from '../components/routes'
import axios from 'axios'
import { useRouter } from 'next/router';
import { Buffer } from 'buffer';
import { AvatarData } from '../data';
import { FaSpinner } from 'react-icons/fa';



const SetAvatar = () => {
    const api = 'https://api.multiavatar.com/4568945';
    const router = useRouter();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        duration: 8000,
        position: 'bottom-right',
        // Styling
        style: {},
        className: '',
        // Custom Icon
        // icon: '👏',
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: 'red',
            secondary: '#fff',
        },
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    }

    useEffect(()=>{
        const getUser = async ()=>{
            try{
                if (!localStorage.getItem('chatify-user'))
                    router.push("/login");

            }catch(err){}
        };
        getUser()
    }, [])



      const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
          toast.error("Please select an avatar", toastOptions);
        } else {
          const user = await JSON.parse(
            localStorage.getItem("chatify-user")
          );
          console.log(selectedAvatar.avatar);
          const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar],
          });
    
          if (data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem(
              "chatify-user",
              JSON.stringify(user)
            );
            router.push("/");
          } else {
            toast.error("Error setting avatar. Please try again.", toastOptions);
          }
        }
      };

      const handleNext =(e)=>{
          e.preventDefault();

          router.push("/");
      }

    //   useEffect(async () => {
    //     const data = [];
    //     for (let i = 0; i < 4; i++) {
    //       const image = AvatarData.sort(()=>Math.round(Math.random() * 1000));
    //     //   const image = await axios.get(
    //     //     `${api}/${Math.round(Math.random() * 1000)}`
    //     //   );
            
    //       const buffer = new Buffer(image.data);
    //       data.push(buffer.toString("base64"));
    //     }
    //     setAvatars(data);
    //     setIsLoading(false);
    //   }, []);

    //   useEffect(async () => {
    //     const data = [];
    //     for (let i = 0; i < 4; i++) {
    //       const image = await axios.get(
    //         `${api}/${Math.round(Math.random() * 1000)}`
    //       );
            
    //       const buffer = new Buffer(image.data);
    //       data.push(buffer.toString("base64"));
    //     }
    //     setAvatars(data);
    //     setIsLoading(false);
    //   }, []);


    // useEffect(()=>{
    //     const CancelToken = axios.CancelToken;
    //     const source = CancelToken.source();
    //     const getData = async ()=>{
    //         try{
    //             const data = [];
    //             for (let i = 0; i < 4; i++) {
    //                 const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
    //                 console.log(image.data);
    //                 const buffer = new Buffer(image.data);
    //                 data.push(buffer.toString("base64"));
    //             }
    //             setAvatars(data);
    //             // console.log(avatars)
    //             setIsLoading(false);
    //         }catch(err){
    //             if(axios.isCancel(err)){
    //                 console.log("cancelled");
    //             } else{
    //                 throw err
    //             }
    //         }

    //     }
    //     getData();
    //         return () => {
    //             source.cancel();
    //         }

    // }, []);




useEffect(() => {
    async function fetchData() {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        console.log(avatars)
        setIsLoading(false);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <>

        <Toaster/>
        <div className="h-screen bg-fuscia-700 flex items-center justify-center flex-col gap-[3rem]">
            <div> <h1 className="text-3xl">Please Set a Profile Image</h1></div>
            
                {isLoading ?
                <div className="flex items-center justify-center gap-[2rem] flex-wrap px-2 md:px-0">
                                <span>
                                    <FaSpinner className="animate-spin" />
                                </span>
                                </div>
                                :
                            
                           
                
            
            
                                <div className="flex items-center justify-center gap-[2rem] flex-wrap px-2 md:px-0">
                                    {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar-img rounded-full h-24 flex items-center justify-center cursor-pointer ${
                    selectedAvatar === index ? "selected" : ""
                  }`} 
                  key={index}
                  id={avatar.id}

                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    // src={`${avatar.avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                    className="h-full rounded-full object-cover "
                  />
                </div>
              )
            })}</div>

            }

            {/* {AvatarData.sort(()=>Math.round(Math.random() * 1000)).slice(0, 4).map((avatar, index) => {
              return (
                <div
                  className={`avatar-img rounded-full h-24 flex items-center justify-center cursor-pointer ${
                    selectedAvatar === avatar ? "selected" : ""
                  }`} 
                  key={avatar.id}
                  id={avatar.id}

                >
                  <img
                    // src={`data:image/svg+xml;base64,${avatar}`}
                    src={`${avatar.avatar}`}
                    alt="avatar"
                    // key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar)}
                    className="h-full rounded-full object-cover "
                  />
                </div>
              );
            })} */}

            {/* {avatars.map((avatar, index) => {
              return (
                <div
                  className={`rounded-full h-22 flex items-center justify-center ${
                    selectedAvatar === index ? "selected" : ""
                  }`}

                  key={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                    className="h-full rounded-full object-cover"
                  />
                </div>
              );
            })} */}

            {/* ;border-[#0070f3] */}
                
                
            {/* </div> */}
            <div className=" mt-5">
                <button className="w-full bg-gray-600 h-12 block rounded-md px-5 text-white duration-300" onClick={setProfilePicture}>Set a Profile Picture</button>

                    <div className="flex items-center justify-between flex-row mt-4">
                        <span className="w-1/5 border-b border-gray-400 md:w-1/3"></span>
                            <span className="text-xs text-gray-500 uppercase dark:text-gray-400 ">or</span>
                        <span className="w-1/5 border-b border-gray-400 md:w-1/3"></span>
                    </div>

                <button className="w-full border-gray-600 h-12 block rounded-md px-5 mt-4 hover:text-white  border duration-300 hover:bg-gray-600" onClick={(e)=>handleNext(e)}>Skip</button>
            </div>

        </div>
    </>
  )
}

export default SetAvatar