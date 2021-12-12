import { useState, useCallback } from 'react';
import axios from 'axios';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestData = useCallback(async (config, data) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get(config.url);
            
            data(res.data);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }, []);

    return [isLoading, error, requestData];
};

export default useHttp;