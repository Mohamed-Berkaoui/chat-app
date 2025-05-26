import React from "react";

function Sidebar({ users,setSelectedUser,selectedUser }) {
  return (
    <div className=" w-3xs bg-base-100 flex flex-col gap-6  h-full overflow-y-scroll">
      <h2>users</h2>
      <div className="flex flex-col gap-2 ">
        {users?.map((user) => {
          return (
            <div onClick={()=>setSelectedUser(user)} style={{backgroundColor:selectedUser?._id==user._id?"green":"transparent"}}  className="h-14 flex items-center gap-1 border-b-2 border-base-300"  >
              <img src="/avatar.png" alt="" className="h-3/4" />
              <h2>{user.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
