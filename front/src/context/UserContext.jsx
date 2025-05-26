import { createContext, useState } from "react";
import appAxios, { baseURL } from "../lib/appAxios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const userStore = createContext();

function UserContext({ children }) {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState({
    token: localStorage.getItem("token") || "",
    userInfos: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null,
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
          isLoading: false,
        }));
        const socket = io(baseURL);
        console.log(socket)
        socket.on("connect", () => {
          console.log('dqs')
          console.log(socket.id)
        });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("user loged in");
      })
      .catch((e) => {
        setUser({ ...user, error: e.response.data.message, isLoading: false });
        toast.error(e.response.data.message);
      });

    console.log(user);
  }

  return (
    <userStore.Provider
      value={{
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
