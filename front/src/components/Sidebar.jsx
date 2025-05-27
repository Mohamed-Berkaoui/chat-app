import React, { useContext, useEffect } from "react";
import { userStore } from "../context/UserContext";

function Sidebar({ users,setSelectedUser,selectedUser }) {
  const {user}=useContext(userStore)

  console.log(user)
  return (
    <div className=" w-3xs bg-base-100 flex flex-col gap-6  h-full overflow-y-scroll">
      <h2>users</h2>
      <div className="flex flex-col gap-2 ">
        {users?.map((friend) => {
          return (
            <div onClick={()=>setSelectedUser(friend)} style={{backgroundColor:selectedUser?._id==friend._id?"green":"transparent"}}  className="h-14 flex items-center gap-1 border-b-2 border-base-300"  >
              <img src="/avatar.png" alt="" className="h-3/4" />
              <h2>{friend.name}</h2>
              <p className={`${user?.onLineUsers?.find(onlineUser=>onlineUser==friend._id)?"block":"hidden"}`}>online</p>
            </div>

          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
