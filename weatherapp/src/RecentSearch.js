import React from 'react';

export default function RecentSearch({ recentData, setNewZip }) {
    
    const { zip, city, degrees } = recentData;

    return (
        <div
            className="recentZip"
            onClick={() => setNewZip(zip)}
        >
            {city} {zip}   {degrees}
        </div>  
    )
}
