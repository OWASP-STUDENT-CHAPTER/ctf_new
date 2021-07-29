import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import URL from '../../util/URL';

const  Timer =  ({onTimeUpHandler, redirectURL, hoursMinSecs}) => {

    const {days=0, hours=0, minutes=0, seconds=600} = hoursMinSecs;
    const[[dys, hrs, mins, secs], setTime] = React.useState([days, hours, minutes, seconds]);
    const [data,setData] = useState();
       

    const tick = () => {
        if (hrs === 0 && mins === 0 && secs === 0){
            reset();
        }
        else if(mins === 0 && secs === 0){
            setTime([days, hrs-1, 59, 59]);
        }
        else if(secs === 0){
            setTime([days, hrs, mins-1, 59]);
        }
        else{
            setTime([days, hrs, mins, secs-1]);
        }
    };

    const reset = () => setTime([days, parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    React.useEffect(() => {
        setTime([hoursMinSecs.days, hoursMinSecs.hours, hoursMinSecs.minutes, hoursMinSecs.seconds]);
    },[hoursMinSecs]);

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });
    if((hrs<=0)&&(mins<=0)&&(secs<=0)){
        onTimeUpHandler();
        return <Redirect to={redirectURL} />
   }

    return (
        <div className='timerworking'>
            <p>{`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
        </div>  
    )
}

export default Timer
