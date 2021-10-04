import styles from "./Name.module.css";
import { useRef,useState } from "react";
const Name=(props)=>{
    const [error,setError]=useState(null);
    const nameEl=useRef();
    const submitHandler=(e)=>{
        e.preventDefault();
        if(nameEl.current.value.trim().length === 0) return;
        if(nameEl.current.value.trim().length>20){
            setError("Name cannot have more than 20")
            return;
        }
        props.onAddUser(nameEl.current.value.trim())
    }
    return(
        <div className={styles.nameCont}>
            <h1>Welcome to Ahsan-Chat</h1>
            <form onSubmit={submitHandler}>
                
                <input placeholder="Enter your name" type="text" ref={nameEl} />
                { error && <p style={{color : "red"}}>{error}</p>}
                <button type="submit">Hell Yeah</button>
            </form>
        </div>
    )
}
export default Name;