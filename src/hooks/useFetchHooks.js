import { useEffect, useState } from "react"

const useFetchHooks = (url)=>{
    const [data,setData] = useState(null)
    const fetching = async ()=>{
        const response = await fetch(url)
        // const data = await response.json()
        setData(response)
    }

    useEffect(()=>{
        fetching()
    },[url])

    return data

}

export default useFetchHooks;