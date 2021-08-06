import React, { useEffect } from 'react';

export default function Error({ error, setError }) {
    useEffect(() => {
        const errorMessage = setTimeout(() => {
            setError('');
        }, 2000)
        return () => {
            clearTimeout(errorMessage);
        }
    })
    return (
        <div>
            {error && <div style={{ color: 'red', fontSize: '1.5em' }}>{error}</div>}
        </div>
    )
}
