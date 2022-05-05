
import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "../Navbar/navbar";
import Head from "next/head";
import {allUsersRoute, host} from '../../components/routes'
// const MyContext = React.createContext();
// import { deviceType, eventEmitter } from "../../utils/index";
import { io } from "socket.io-client";

import { SideBar } from "../Sidebar/SideBar";
import {useRouter} from 'next/router';
import Login from "../../pages/login";
import axios from 'axios'
import Chat from '../../pages/chat'
import Welcome from "../welcome";
// import { Chat } from "../../pages/chat";



const Layout = ({children}) => {
  const router = useRouter();
  const socket = useRef();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const scrollRef = useRef();
  const {Provider, Consumer } = React.createContext()
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);


    // useEffect(() => {
    //   async function checkUser() {
    //       if (!localStorage.getItem('chatify-user'))
    //           router.push("/login");
    //   }
    //   checkUser();
    // }, []); 

    useEffect(() => {
      async function checkUser() {
        if (!localStorage.getItem(('chatify-user'))) {
          router.push("/login");
        } else {
          setCurrentUser(
            await JSON.parse(
              localStorage.getItem(('chatify-user'))
            )
          );
        }
      }
      checkUser();
    }, []); 


  //   useEffect(()=>{
  //     const CancelToken = axios.CancelToken;
  //     const source = CancelToken.source();
  //     const getUserData = async ()=>{
  //         try{
  //           const data = await JSON.parse(
  //             localStorage.getItem('chatify-user')
  //           );
  //           if(data){
  //             // console.log(data)
  //               setCurrentUser(data);
  //               // console.log(currentUser._id, "currentUsekenckeckecr")
  //           }
  //         }catch(err){
  //             if(axios.isCancel(err)){
  //                 console.log("cancelled");
  //             } else{
  //                 throw err
  //             }
  //         }

  //     }
  //     getUserData();
  //         return () => {
  //             source.cancel();
  //         }

  // }, []);




    useEffect(()=>{
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const getUser = async ()=>{
            try{
              const data = await JSON.parse(
                localStorage.getItem('chatify-user')
              );
              if(data){
                  // setCurrentUser(data)
                  // console.log(currentUser, "----- currrent user")
                  setCurrentUserName(data.username);
                  // console.log(currentUserName, "currentUserName")
                  setCurrentUserImage(data.avatarImage);
              }else{
                if (!localStorage.getItem(('chatify-user'))) {
                  router.push("/login");
                } else {
                  setCurrentUser(
                    await JSON.parse(
                      localStorage.getItem(('chatify-user'))
                    )
                  );
                }
              }
            }catch(err){
                if(axios.isCancel(err)){
                    console.log("cancelled");
                } else{
                    throw err
                }
            }

        }
        getUser();
            return () => {
                source.cancel();
            }

    }, []);


    useEffect(() => {
      // async function socketFunction() {

      if (currentUser) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }

    // }
    // socketFunction();
    }, [currentUser]);

    useEffect(() => {
      async function checkCurrentUser() {
        try{
          // if (currentUser) {
          // console.log(currentUser, "currentUserrrrckejckeecmecmojeocjeojocoweinr")
          // if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
            // console.log(contacts)
           
          // }
        }catch(err){

        }
        
      }
      checkCurrentUser()
    }, [currentUser]); 




  

 

    const handleChatChange = (chat) => {
      setCurrentChat(chat);
    };

    const handleShowMobileMenu = () =>{
      setShowMobileMenu(!showMobileMenu)
      // scrollRef.current?.scrollIntoView({ behavior: "smooth" });

      // console.log("workinggggg")
  }


  return (
        <>
        <Head>
            <title>Chatify</title>
            <meta name="description" content="Text" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

      
        <div className="md:overflow-y-hidden h-screen flex flex-col max-w-[1300px] mx-auto rounded ">
          {/* <header
            className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase"
          >
            Next.js sidebar menu max-h-screen
          </header> */}

          <Navbar handleShowMobileMenu={handleShowMobileMenu} currentUser={currentUser} currentUserName={currentUserName} currentUserImage={currentUserImage}/>
          <div className="flex flex-col md:flex-row flex-1 full_wrapper">
            <SideBar showMobileMenu={showMobileMenu} contacts={contacts} changeChat={handleChatChange}/>
            
            <main className="flex-1 mb-5">
                {currentChat === undefined ? (
                  <Welcome currentUserName={currentUserName} />
                    ) : ( 
                  <Chat currentChat={currentChat} socket={socket}/>      
                )} 
         {/* <Chat currentUser={currentUser} currentUserName={currentUserName} currentChat={currentChat} currentUserImage={currentUserImage} /> */}
              {/* {children} */}
            {/* <Provider value={currentUserName}>
              
              
            </Provider> */}
              </main>


          </div>
        </div>
        
             
                {/* {children} */}
            {/* <Footer/> */}
        </>
  )
}

export default Layout;
