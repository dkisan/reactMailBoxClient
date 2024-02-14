import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

import { useRef, useState } from 'react'
import HTMLReactParser from 'html-react-parser'


const SendBox = () => {
    const toRef = useRef()
    const subjectRef = useRef()

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );

    const myEmailHandler = async (name, to) => {
        const tto = to.split('@')[0]
        const user = localStorage.getItem('MailboxUEmail')
        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${user}/send.json`, {
                method: 'POST',
                body: JSON.stringify(name),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                const res = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${tto}/receive.json`, {
                    method: 'POST',
                    body: JSON.stringify({ name: name, read: 0 }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok) {
                    toRef.current.value = ''
                    subjectRef.current.value = ''
                    setEditorState(EditorState.createEmpty())
                    alert('Mail Sent Successfully')
                } else {
                    const data = await res.json()
                    throw (data.error)
                }

            } else {
                const data = await response.json()
                throw (data.error)
            }
        }
        catch (err) {
            await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${name}.json`, {
                method: 'DELETE',
                body: JSON.stringify(name),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox/${user}/send/${name}.json`, {
                method: 'DELETE',
                body: JSON.stringify(name),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log(err.message)
        }
    }

    const sendEmailHandler = async (event) => {
        event.preventDefault()

        const a = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        const obj = {
            from: localStorage.getItem('MailboxUEmail'),
            to: toRef.current.value,
            subject: subjectRef.current.value,
            content: a
        }

        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/mailbox.json`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                const data = await response.json()
                myEmailHandler(data.name, toRef.current.value)

            } else {
                const data = await response.json()
                throw (data.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }


    return (
        <>
            <form action="" className='flex flex-col p-4 gap-2 min-h-[90vh] border' onSubmit={sendEmailHandler}>
                <div className='flex gap-2 items-center leading-8'>
                    <label htmlFor="">To</label>
                    <input ref={toRef} type="text" className='border w-full' />
                </div>
                <div className='flex gap-2 items-center leading-8'>
                    <label htmlFor="">Subject</label>
                    <input ref={subjectRef} type="text" className='border w-full' />
                </div>
                <Editor
                    editorState={editorState}
                    editorStyle={{ border: '1px solid rgba(0,0,0,.1' }}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(c) => setEditorState(c)}
                />
                <button className='bg-blue-600 font-bold text-white p-2 rounded-md w-max'>Send</button>
            </form>
        </>

    )
}


export default SendBox;