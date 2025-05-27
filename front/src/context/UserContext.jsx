import { createContext, useState } from "react";
import appAxios, { baseURL } from "../lib/appAxios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const userStore = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState({
    token: localStorage.getItem("token") || "",
    userInfos: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null,
    socket: null,
    onLineUsers: [],
  });

  function registerUser(data) {
    setUser({ ...user, isLoading: true });
    appAxios
      .post("/auth/register", data)
      .then((res) => toast.success("user Created"))
      .catch((e) => {
        console.log(e);
        setUser({ ...user, error: e.response.data.message });
        toast.error(e.response.data.message);
      })
      .finally((res) => setUser({ ...user, isLoading: false }));
  }

  function loginUser(data) {
    setUser({ ...user, isLoading: true });

    appAxios
      .post("/auth/login", data)
      .then((res) => {
        console.log(res.data);
        setUser((state) => ({
          ...state,
          token: res.data.data.token,
          userInfos: res.data.data.user,
          onLineUsers:res.data.data.connectedUsers,
          isLoading: false,
        }));

        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("user loged in");
        getOnlineUsers()
      })
      .catch((e) => {
        setUser({ ...user, error: e.response.data.message, isLoading: false });
        toast.error(e.response.data.message);
      });

    console.log(user);
  }
  function connectToSocket() {
    if (user.socket?.connected) return;
    const socket = io(baseURL, { query: { userId: user.userInfos._id } });
    socket.connect();
    socket.on("connect", () => {});
    setUser({ ...user, socket: socket });
  }

  function disconnectFromSocket() {
    if (user.socket.connected) user.socket.disconnect();
  }
  function getOnlineUsers() {
    user?.socket?.on("onlineUsers", (users) => {
      console.log(users);
      setUser({ ...user, onLineUsers: users });
    });
    console.log(user);
  }

  function getNewMessage(setMessages, selectedUser) {
    user?.socket?.on("newMessage", (message) => {
      console.log(message.sender == selectedUser);

      if (message.sender == selectedUser) {
        setMessages((state) => [...state, message]);
      }
    });
  }

  function stopMessages() {
    user.socket.off("newMessage");
  }
  return (
    <userStore.Provider
      value={{
        getOnlineUsers,
        stopMessages,
        getNewMessage,
        connectToSocket,
        isLoading: user.isLoading,
        registerUser,
        setUser,
        loginUser,
        user,
      }}
    >
      {children}
    </userStore.Provider>
  );
}

export default UserContext;
