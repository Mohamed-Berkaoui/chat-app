import React, { useEffect, useRef } from 'react'

function MessagesContainer({messages,selecteduser}) {
      const ref=useRef()
        useEffect(function(){
            ref.current.scrollTop=ref.current.scrollHeight

  },[messages])
  return (
   <div className=" overflow-scroll  h-[calc(100%-96px)]"   ref={ref}>
      {messages.map((msg) => {
        return msg.sender == selecteduser._id ? (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">{msg.createdAt}</time>
            </div>
            <div className="chat-bubble">{msg.message}</div>
          </div>
        ) : (
          <div className="chat chat-end ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full ">
                {/* <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            /> */}
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">{msg.createdAt}</time>
            </div>
            <div className="chat-bubble bg-base-100 text-base-content">
              {msg.message}
            </div>
          </div>
        );
      })}
         <div > </div>
     
      </div>
  )
}

export default MessagesContainer