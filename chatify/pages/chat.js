import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { v4 as uuidv4 } from "uuid";
// import ChatInput from '../components/ChatInput';
import styles from './Home.module.css'
import axios from 'axios'
import { getMessageRoute, sendMessageRoute } from '../components/routes';

// import dynamic from "next/dynamic";
const ChatInput = dynamic(() => import("../components/ChatInput"), {
  ssr: false,
});


// const ChatInput = dynamic(
//     () => import('../components/ChatInput'),
//     {ssr: false}
// )

// const [ChatInput ] = [
//     dynamic(() => import('../components/ChatInput')),
//     // dynamic(() => import('../styles/Home.module.css')),
//     {ssr: false}
//   ];
const Chat = ({currentUser, currentUserName, currentUserImage, currentChat, socket }) => {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");

    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const ref= useRef()
    const [showFriendMenu, setShowFriendMenu] = useState(false);
  
  useEffect(()=>{
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getUser = async ()=>{
        try{
          const data = await JSON.parse(
            localStorage.getItem('chatify-user')
          );
          setUserImage(data.avatarImage)
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

}, [currentChat]);


    useEffect(() => {
        const getMessages = async ()=>{
            const data = await JSON.parse(
                localStorage.getItem('chatify-user')
            );
            const response = await axios.post(getMessageRoute, {
                from: data._id,
                to: currentChat._id,
            });
            setMessages(response.data);
            // console.log(messages, "messsageeess")
        }
        getMessages();
      
    }, [currentChat]);

  
    // console.log(currentChat, "CURNERVJNIN")
    useEffect(() => {
      const getCurrentChat = async () => {
          try{
              if (currentChat) {

          await JSON.parse(
            localStorage.getItem('chatify-user')
          )._id;
        }
          }catch(err){

          }
        
      };
      getCurrentChat();
    }, [currentChat]);

  const handleShowFriendMenu= () =>{
    setShowFriendMenu(!showFriendMenu)
  }

//   const handleSendMsg = async (msg) => {
//     setMsg(msg);
//   };


  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem('chatify-user')
    );
    // console.log(data, "data-inside-chat")

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat.   _id,
      from: data._id,
      msg,
    });
    
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    

        <div className={`container-bx ${styles.container}`}>
        <div className="w-full  absolute py-4 bg-fuchsia-100 shadow px-2 z-10 hidden md:block ">
      
      <div className="flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
              <div className="relative inline-block ">


              <div  className="relative z-10 flex items-center px-2 py-1 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none w-32" >
                              <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                                  {/* <img src={(singleUser.avatar) ? `${singleUser.avatar}` :  `/users/default.jpg`} className="object-cover w-full h-full" alt="avatar"/> */}

                                  {currentChat === undefined ? <img src={`/users/default.jpg`} className="object-cover w-full h-full" alt="avatar"/>  :

                                      <img
                                      src={ currentChat.avatarImage ? `data:image/svg+xml;base64,${currentChat.avatarImage}` : `/users/default.jpg`}
                                      className="object-cover w-full h-full" alt="avatar"
                                      />
                                  }
                                  
                              </div>

                              {/* {singleUserData.map(({id, avatar, name }) => (
                                  <span className="mx-1">{name}</span>

                              ))} */}
                  {/* <span className="mx-1">{singleUser.name ? singleUser.name : "no name" }</span> */}
                  {
                  currentChat === undefined ? 
                  <span className="mx-1">Username</span>
                      :
                  <span className="mx-1">{currentChat.username}</span>
                  }
              </div>

              </div>
          </div>

          <div className="flex-1 flex items-center justify-end">
              {/* <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
                  <a href="#" className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">Join Slack</a>
              </div> */}










              <div className="flex items-center mt-4 md:mt-0">
                  {/* <button className="hidden text-gray-600 transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none hover:bg-gray-300 rounded-lg p-2" aria-label="show notifications" onClick={handleShowNotifications}>
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </button>
                  
                  <button className="hidden mx-2 text-gray-600 transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none hover:bg-gray-300 rounded-lg p-2" aria-label="show notifications" onClick={handleShowNotifications}>
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </button> */}


                  <div className="relative inline-block ">
                      <button className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none" onClick={handleShowFriendMenu} ref={ref}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                      </button>

                      {showFriendMenu && 
                          <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800 " ref={ref}>
                              <a href="#" className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                  <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" fill="currentColor"></path>
                                      <path d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z" fill="currentColor"></path>
                                  </svg>
                                  
                                  <span className="mx-1">
                                      view profile
                                  </span>
                              </a>
                              
                              <a href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                  <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z" fill="currentColor"></path>
                                  </svg>

                                  <span className="mx-1">
                                      Settings
                                  </span>
                              </a>

                          

                              
                              <hr className="border-gray-200 dark:border-gray-700 "/>
                              
                              <a href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                  <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 22C6.47967 21.9939 2.00606 17.5203 2 12V11.8C2.10993 6.30452 6.63459 1.92794 12.1307 2.00087C17.6268 2.07379 22.0337 6.56887 21.9978 12.0653C21.9619 17.5618 17.4966 21.9989 12 22ZM11.984 20H12C16.4167 19.9956 19.9942 16.4127 19.992 11.996C19.9898 7.57928 16.4087 3.99999 11.992 3.99999C7.57528 3.99999 3.99421 7.57928 3.992 11.996C3.98979 16.4127 7.56729 19.9956 11.984 20ZM13 18H11V16H13V18ZM13 15H11C10.9684 13.6977 11.6461 12.4808 12.77 11.822C13.43 11.316 14 10.88 14 9.99999C14 8.89542 13.1046 7.99999 12 7.99999C10.8954 7.99999 10 8.89542 10 9.99999H8V9.90999C8.01608 8.48093 8.79333 7.16899 10.039 6.46839C11.2846 5.76778 12.8094 5.78493 14.039 6.51339C15.2685 7.24184 16.0161 8.57093 16 9.99999C15.9284 11.079 15.3497 12.0602 14.44 12.645C13.6177 13.1612 13.0847 14.0328 13 15Z" fill="currentColor"></path>
                                  </svg>

                                  <span className="mx-1">
                                      Help
                                  </span>
                              </a>
                          </div>
                      }
                  </div>

              </div>

          </div>

      </div>


  </div>
            
            <div className={`inner-container ${styles.inner_container}`}>
        <main className={styles.main}>
        <div className={styles.inner_box}>

        {messages.map((message) => {
          return (
            // <div ref={scrollRef} >
              <div
                className={`message ${
                  message.fromSelf ? `${styles.sender_card}` : `${styles.receiver_card}`
                }`} 
                ref={scrollRef} 
                key={uuidv4()}
              >
                    <div className={`${message.fromSelf ? "avatar" : "grid_receiver_avatar"}`}>
                        <img
                            src={message.fromSelf ? `data:image/svg+xml;base64,${userImage}` : `data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            className="object-cover w-full h-full" alt="avatar"
                            />
                        
                    </div>

                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            // </div>
          );
        })}








        </div>


       


        </main>
        
        </div>
        <footer className={styles.footer}>
        <ChatInput handleSendMsg={handleSendMsg}/>
  
        </footer>
        </div>

        
</>
  )
}

Chat.getInitialProps = ({query}) => {
  

}

export default Chat;
