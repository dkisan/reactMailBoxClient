import { useState } from "react";
import SendBox from "./SendBox";
import Inbox from "./Inbox";

const Home = () => {
    const [btn, setBtn] = useState('Inbox')
    const c = "bg-blue-600 text-white font-bold py-6 rounded-md text-xl"

    const btnHandler = (event) => {
        setBtn(event.target.innerHTML)
    }

    return (
        <div className="flex flex-col h-[100vh]">
            <div className='w-full h-max p-2 border'>
                <h1 className='font-bold'>Welcome to your MailBox</h1>
            </div>
            <div className="w-full flex gap-2 flex-1">
                <div className="w-1/6 bg-gray-100 flex flex-col pt-5 gap-2">
                    <button className={btn === 'Compose' ? c : ''} onClick={btnHandler}>Compose</button>
                    <button className={btn === 'Inbox' ? c : ''} onClick={btnHandler}>Inbox</button>
                    <button className={btn === 'Sent' ? c : ''} onClick={btnHandler}>Sent</button>
                </div>
                <div className="w-5/6">
                    {btn === 'Compose' && < SendBox />}
                    {btn === 'Inbox' && < Inbox />}
                </div>

            </div>
            {/* <div>
        <SendBox/>
        </div> */}
        </div>
    )
}

export default Home;