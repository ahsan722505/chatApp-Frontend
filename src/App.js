
import Name from "./components/Name";
import Chat from "./components/Chat";
import { useState } from "react";

function App() {
  const[username,setUsername]=useState("");
  const usernameHandler=(name)=>{
      setUsername(name);
  }
  return (
    <div className="App">
      { !username && <Name onAddUser={usernameHandler}/>}
      { username && <Chat username={username}/>}
    </div>
  );
  }

export default App;
