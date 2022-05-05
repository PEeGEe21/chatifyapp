import React, {useState} from 'react'
import { BsEmojiSmileFill } from "react-icons/bs";
// import Picker from "emoji-picker-react";
import { FaRegSmile } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { IoMdSend } from "react-icons/io";

import dynamic from "next/dynamic";

const Picker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });


const ChatInput = ({handleSendMsg}) => {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
        }
    };

  return (
    <>
        <div className="w-full h-full px-2">
            <form className="flex items-center justify-between w-full h-full relative" onSubmit={(event) => sendChat(event)}>
                <input type="text" className=" w-[90%] h-10 md:h-14 rounded-md" onChange={(e) => setMsg(e.target.value)}
          value={msg}/>

                <div className="button-container mx-2">
                    <div className="emoji">
                    <FaRegSmile onClick={handleEmojiPickerhideShow} className="hover:bg-gray-300 rounded-lg" />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                    </div>
                </div>

                <button type="submit" className="w-[10%] bg-indigo-600 h-10 md:h-14  text-white transition-colors duration-300 transform dark:text-white rounded-md flex items-center justify-center" onClick={(event) => sendChat(event)}><span className="hidden lg:block text-sm">Send</span> <FiSend className="ml-0 lg:ml-1"/></button>
            </form>
        </div>
    
    </>
  )
}

export default ChatInput;

