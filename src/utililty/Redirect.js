import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Redirect() {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('cs_tn');
        if (token == null || undefined) {
            history.push('/login');
        }
    });
    
    return (
        <>
        </>
    );
};