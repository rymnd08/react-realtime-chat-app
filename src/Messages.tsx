import { Auth } from "firebase/auth";
import { Message } from "./App";

type MessagesProps = {
    messages: Message[] | null
    auth: Auth
}

const Messages = ({messages, auth} : MessagesProps) => {

    // const [firstItem, setFirstItem] = useState(false)

    return ( 
        <div className="flex flex-col-reverse items-start gap-5 p-4 h-full overflow-auto messages">
            {messages && messages.sort().map((message, index) =>(

                <div className={`flex gap-2 justify-start items-center ${index === 0  ? 'mb-24' : ''} ${message.userID === auth.currentUser?.uid ?  'flex-row-reverse self-end' : ''}`} key={message.messageID} >
                    
                    <img src={message.photoUrl ? message.photoUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png'} alt="" className="h-[50px] rounded-full" />

                    <span  className={`py-2 border px-5 bg-white rounded-full `} > {message.message} </span>

                </div>
            ))}
            {messages && messages.length == 0 && 
                <div className="flex items-center justify-center h-full text-white">
                    <h3 className="text-2xl font-semibold">No messages yet</h3>
                </div>
            }
        </div>
     );
}
 
export default Messages;