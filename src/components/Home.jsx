import SendBox from "./SendBox";

const Home = () => {
    return (
        <>
        <div className='w-full h-max p-2 border'>
            <h1 className='font-bold'>Welcome to your MailBox</h1>
        </div>
        <div>
        <SendBox/>
        </div>
        </>
    )
}

export default Home;