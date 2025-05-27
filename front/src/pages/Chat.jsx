import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import appAxios from "../lib/appAxios";
import { toast } from "react-toastify";
import { userStore } from "../context/UserContext";
import Chatplaceholder from "../components/Chatplaceholder";

function Chat() {
  const [users, setUsers] = useState([]);
  const [selecteduser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const { user, getNewMessage,stopMessages,getOnlineUsers } = useContext(userStore);
  useEffect(function () {
    appAxios
      .get("/message/getusers", {
        headers: { authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((e) => {
        toast.error("error ");
      });
      getOnlineUsers()
  }, [user]);
  useEffect(
    function () {
      if (!selecteduser) return;
      appAxios
        .get("/message/getMessages/" + selecteduser._id, {
          headers: { authorization: `Bearer ${user.token}` },
        })

        .then((res) => {
          setMessages(res.data.data);
        })
        .catch((e) => {
          toast.error("error ");
        });
      getNewMessage(setMessages,selecteduser._id);
      return ()=>stopMessages()
    },
    [selecteduser?._id,selecteduser]
  );


  return (
    <div className="flex  w-3/4 h-[500px] bg-base-200 mx-auto m-4 border p-2 border-neutral rounded gap-2">
      <Sidebar
        users={users}
        setSelectedUser={setSelectedUser}
        selectedUser={selecteduser}
      />
     { selecteduser ?(
      <ChatBox
        messages={messages}
        setMessages={setMessages}
        selecteduser={selecteduser}
      />)
      :(
      <Chatplaceholder/>)}
        
    
    </div>
  );
}

export default Chat;
