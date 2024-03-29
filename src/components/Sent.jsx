import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HTMLReactParser from 'html-react-parser';
import { useDispatch, useSelector } from "react-redux";
import { mailactions } from "../store/mailSlice";
import useFetchHooks from "../hooks/useFetchHooks";


const Sent = (props) => {
    const navigate = useNavigate()

    const mail = useSelector(state => state.mail.sentMail)
    const user = useSelector(state => state.mail.user)


    const dispatch = useDispatch()

    const MailList = (props) => {
        const deleteHandler = async (event) => {
            event.stopPropagation()
            try {
                const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${user}/send/${props.m.key}.json`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    // const res = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${props.m.name}.json`, {
                    //     method: 'DELETE'
                    // })
                    // if (res.ok) {
                    dispatch(mailactions.deleteSendMail(props.m.key))
                    // } else {
                    //     const data = await response.json()
                    //     throw data.error
                    // }
                } else {
                    const data = await response.json()
                    throw data.error
                }

            }
            catch (err) {
                alert('some error occured')
            }
        }

        const contentHandler = async () => {
            dispatch(mailactions.showdecreaseSentMailHandler(props.m.key))
        }

        return (
            <div className="flex flex-col gap-2 border-b-2 p-2 cursor-pointer" onClick={contentHandler}>
                <div className="flex gap-2 p-2 items-center">
                    {props.m.read === 0 && <p className="bg-red-400 rounded-full text-red-400 p-1">.</p>}
                    <p className="font-bold">{props.m.to}</p>
                    <p className="">{props.m.subject}</p>
                    <button onClick={deleteHandler} className="ml-auto hover:font-bold bg-red-600 text-white p-1 rounded-md">Delete</button>
                </div>
                {props.m.showcontent && HTMLReactParser(props.m.content)}
            </div>
        )
    }

    const fetchEachEmail = async (name) => {
        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${name}.json`)
            console.log(response)
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

        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${user}/send.json`)
            if (response.ok) {
                const data = await response.json()
                if (!data) return
                const a = [];
                let unread = 0
                for (const [key, value] of Object.entries(data)) {
                    try {
                        if (value.read === 0) unread++
                        const result = await fetchEachEmail(value);
                        result.name = value
                        result.key = key
                        result.showcontent = false
                        a.push(result);
                    } catch (error) {
                        console.error(`${error.message}`);
                    }
                }
                // if (a.length > 0) setMail(a)
                if (a.length > 0) dispatch(mailactions.setSentMail(a))
                dispatch(mailactions.setUnread(unread))
                // props.setUnread(unread)

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



export default Sent;