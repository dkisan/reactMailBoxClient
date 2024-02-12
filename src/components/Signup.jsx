import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
    const emailRef = useRef('')
    const passRef = useRef('')
    const cnfpassRef = useRef('')

    const navigate = useNavigate()

    const signupHandler = async (event) => {
        event.preventDefault()
        if (emailRef.current.value === '' || passRef.current.value === '' || cnfpassRef.current.value === '') {
            alert('Please fill all fields')
            return
        }
        if (passRef.current.value !== cnfpassRef.current.value) {
            alert('Please Enter same password')
            return
        }

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passRef.current.value,
                    returnSecureToken: true
                })
            })
            if (response.ok) {
                console.log('User Successfully Signup')
                navigate('/login')
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
            <form className="border p-2 bg-white flex flex-col gap-2 w-1/4 rounded-xl" action="" onSubmit={signupHandler}>
                <h1 className="font-bold text-center underline">Signup</h1>

                <label htmlFor="">Email : </label>
                <input ref={emailRef} type="email" name="" />
                <label htmlFor="">Password : </label>
                <input ref={passRef} type="password" name="" />
                <label htmlFor="">Confirm Password : </label>
                <input ref={cnfpassRef} type="password" name="" />
                <button className="p-2 bg-green-600 rounded-md text-white font-bold text-xl">Signup</button>
                <h6>Already Have an Account ? <Link to='/login'>Login</Link></h6>
            </form>
        </div>
    )
}

export default Signup;