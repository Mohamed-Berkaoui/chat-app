import React, { useContext } from "react";
import { userStore } from "../context/UserContext";
import appAxios from "../lib/appAxios";

function ChatBox({ messages, setMessages, selecteduser }) {
  const { user } = useContext(userStore);
  function handleSendMessage(e) {
    e.preventDefault();
    appAxios
      .post(
        "/message/sent-message/" + selecteduser._id,
        { message: e.target.message.value },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => setMessages([...messages, res.data.data]))
      .catch((e) => console.log(e));
  }
  return (
    <div className="grow relative">
      <div className="h-14 bg-base-100">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl">{selecteduser?.name}</h2>
          <p>status</p>
        </div>
      </div>
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
      <form
        action=""
        onSubmit={handleSendMessage}
        className="absolute bottom-0 w-full border h-9  p-1 flex "
      >
        <input
          placeholder="enter you message"
          type="text"
          className=" w-full focus:outline-0"
          name="message"
        />
        <button className="bg-accent p-1 flex justify-center items-center">
          submit
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
