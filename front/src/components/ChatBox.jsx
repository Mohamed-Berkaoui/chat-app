import React, { useContext, useEffect, useRef } from "react";
import { userStore } from "../context/UserContext";
import appAxios from "../lib/appAxios";
import MessagesContainer from "./MessagesContainer";

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
   <MessagesContainer  messages={messages} selecteduser={selecteduser}/>
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
