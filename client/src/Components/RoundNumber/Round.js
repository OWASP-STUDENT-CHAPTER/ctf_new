import React, { useEffect } from 'react'
import '../../assets/css/topnav.css';

const Round = (props) => {
    let round="Loading...";
    if(props.roundNumber!==undefined)
    {
        round=props.roundNumber.toString();
    }
    const roundNames = ["Xandar", "Space", "Knowhere", "Vormir", "Titan", "Wakanda"];
    const roundNum="Round "+round;
    return (
        <div>
            <p className="round">{roundNum + ": "}{roundNames[round-1]}</p>
        </div>
    )
}

export default Round
