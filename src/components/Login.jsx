import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const emailRef = useRef('')
    const passRef = useRef('')

    const navigate = useNavigate()

    const loginHandler = async (event) => {
        event.preventDefault()
        if (emailRef.current.value === '' || passRef.current.value === '') {
            alert('Please fill all fields')
            return
        }

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passRef.current.value,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json()
                const email = data.email.split('@')[0]
                localStorage.setItem('MailboxUToken', data.idToken)
                localStorage.setItem('MailboxUEmail', email)
                navigate('/')
            } else {
                const data = await response.json()
                throw data.error
            }

        }
        catch (err) {
            alert(err.message)
        }

    }

    return (
        <div className="w-[100vw] h-[100vh] bg-slate-500 bg-opacity-50 flex rounded-lg justify-center items-center">
            <form className="border p-2 bg-white flex flex-col gap-2 w-1/4 rounded-xl" action="" onSubmit={loginHandler}>
                <h1 className="font-bold text-center underline">Login</h1>

                <label htmlFor="">Email : </label>
                <input ref={emailRef} type="email" name="" />
                <label htmlFor="">Password : </label>
                <input ref={passRef} type="password" name="" />
                <button className="p-2 bg-green-600 rounded-md text-white font-bold text-xl">Login</button>
                <Link className="text-blue-600 font-bold" to='/forgotpassword'>Forgot Password</Link>
                <h6>Don't Have an Account ? <Link to='/signup'>SignUp</Link></h6>
            </form>
        </div>
    )
}

export default Login;