import {useState} from 'react'
import axios from 'axios'
export default function useRequest({url, method, body, onSuccess}){
        const [errors, setErrors] = useState(null)

    const doRequest = async() => {
        setErrors(null)
        try{
            const res = await axios[method](url, body);

                if(onSuccess) onSuccess(res.data)

            return res.data;
            
        }catch(err){
            console.log(err);
            //if(err.response.status === 404) return setErrors(<div className="alert alert-danger"><h5>Network Error</h5></div>)

            setErrors(
            <div className="alert alert-danger">
                <h4>Ooops....</h4>
                <ul className="my-0">
                    {err.response.data.errors.map((err) => (
                    <li key={err.message}>{err.message}</li>
                    ))}
                </ul>
            </div>
            )
        }
    }

    return {doRequest, errors}


}