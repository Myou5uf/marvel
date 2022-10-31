import {useCallback, useState} from "react";

export const useHttp = (callback) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = useCallback(async (...args) => {
        try {
            setLoading(true);
            await callback(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [])

    const clearError = useCallback(() => setError(""), []);

    return [fetching, loading, error, clearError];
}