import { useState } from "react";
import SendBox from "./SendBox";
import Inbox from "./Inbox";
import { useSelector } from "react-redux";

const Home = () => {
    const [btn, setBtn] = useState('Inbox')
    // const [unread, setUnread] = useState(0)
    const c = "bg-blue-600 text-white font-bold py-6 rounded-md text-xl"

    const unread = useSelector(state => state.mail.unread)

    const btnHandler = (event) => {
        setBtn(event.target.innerHTML.split(' ')[0])
    }


    return (
        <div className="flex flex-col h-[100vh]">
            <div className='w-full h-max p-2 border flex justify-between items-center'>
                <h1 className='font-bold'>Welcome to your MailBox</h1>
                <h6 className="bg-red-300 rounded-md text-white p-1">{localStorage.getItem('MailboxUEmail')}</h6>
            </div>
            <div className="w-full flex gap-2 flex-1">
                <div className="w-1/6 bg-gray-100 flex flex-col pt-5 gap-2">
                    <button className={btn === 'Compose' ? c : ''} onClick={btnHandler}>Compose</button>
                    <button className={btn === 'Inbox' ? c : ''} onClick={btnHandler}>Inbox {unread > 0 && unread}</button>
                    <button className={btn === 'Sent' ? c : ''} onClick={btnHandler}>Sent</button>
                </div>
                <div className="w-5/6">
                    {btn === 'Compose' && < SendBox />}
                    {btn === 'Inbox' && < Inbox />}
                </div>

            </div>
        </div>
    )
}

export default Home;