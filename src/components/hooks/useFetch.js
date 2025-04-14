import { useEffect, useState } from "react";


const useFetch = (url, trigger = null) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    const fetchData = async () => {

        setLoading(true);
        
        try{

            const res = await fetch(url);

            if (res.status === 404) {
                setData([]);  // Empty array for empty cart
                setLoading(false);
                return;
              }

            if(!res.ok){
                setError("Falied to fetch Data");
            }

            const result = await res.json();
            setData(result.data);
            setLoading(false);

        }catch(error){

            setError(error.message);
            setLoading(false)

        }
    }

        fetchData()

    },[url, trigger]);
    
    return {
        data,
        error,
        loading
    };

};

export default useFetch;