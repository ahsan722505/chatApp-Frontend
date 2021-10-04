import styles from "./Message.module.css"
const Message=(props)=>{
    return(
        <li className={styles.messageCont} style={{justifyContent : props.position}}>
            <div className={styles.dataHolder} >
            <p className={styles.name}>{props.name}</p>
            <p className={styles.message}>{props.message}</p>

            </div>
        </li>
    )
}
export default Message;