import { useEffect, useState } from "react";

const useGetMessages = (userid) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (!userid) return;
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/messages/${userid}`, {
                    credentials: 'include'
                });
                const messages = await res.json();
                setData(messages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [userid]);
    return { loading, data}
}

export default useGetMessages;
