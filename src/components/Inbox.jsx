import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HTMLReactParser from 'html-react-parser';


const Inbox = () => {

    const navigate = useNavigate()

    const [mail, setMail] = useState([])

    const MailList = (props) => {
        const [status, setStatus] = useState(false)
        const contentHandler = () => {
            setStatus((prev) => !prev)
        }
        return (
            <div className="flex flex-col gap-2 border-b-2 p-2 cursor-pointer" onClick={contentHandler}>
                <div className="flex gap-2 p-2">
                    <p className="font-bold">{props.m.from}</p>
                    <p className="">{props.m.subject}</p>
                </div>
                {status && HTMLReactParser(props.m.content)}
            </div>
        )
    }

    const fetchEachEmail = async (name) => {
        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${name}.json`)
            if (response.ok) {
                const data = await response.json()
                return data
            } else {
                const data = await response.json()
                throw (data.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }

    const fetchMail = async () => {
        const user = localStorage.getItem('MailboxUEmail')

        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${user}/receive.json`)
            if (response.ok) {
                const data = await response.json()
                if (!data) return
                const a = [];
                for (const [key, value] of Object.entries(data)) {
                    try {
                        const result = await fetchEachEmail(value);
                        a.push(result);
                    } catch (error) {
                        console.error(`${error.message}`);
                    }
                }
                if (a.length > 0) setMail(a)

            } else {
                const data = await response.json()
                throw (data.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('MailboxUToken')) {
            navigate('/login')
        } else {
            fetchMail()
        }
    }, [])

    return (
        <>
            {mail && mail.map((m, i) => {
                return <MailList m={m} key={i} />
            })}
            {mail.length === 0 && <p className="flex justify-center font-bold text-2xl">No Messages !!!</p>}
        </>
    )
}



export default Inbox;