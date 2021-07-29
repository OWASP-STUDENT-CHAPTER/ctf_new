import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/css/pacman.css";
import Timer from "../Components/Timer/Timer";
import URL from "../util/URL";

const Transition =()=>{

    const [timeRemaining, setTimeRemaining] = useState(null);

  async function getCurrentRoundDetails() {
    await fetch(`${URL}/api/event/roundDetails`, {credentials: "include"})
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw response;
    })
    .then(data=> {
      console.log(data.nextRoundStartTime);
      setTimeRemaining(data.nextRoundStartTime);
    })
    .catch(error => {
      setTimeRemaining({hours:0, minutes: 0, seconds: 5});
    });
  }

  useEffect(() => {
    getCurrentRoundDetails();
  },[]);
    
    return(

        <div className="pacman-container" >
            <div className="pacman-header">
                <h2 className="pacman-heading">Next Round starts in <span>
                    {
                        timeRemaining?
                        <Timer onTimeUpHandler={() => console.log("Time Up!")} redirectURL="/dashboard" hoursMinSecs={timeRemaining}/>
                        :null
                    }
                    </span></h2>
                <p className="pacman-p">Till then, enjoy a game of pacman!</p>
            </div>
            <iframe 
            className="pacman"
            src="https://funhtml5games.com?embed=pacman" 
            frameborder="0" 
            scrolling="no"></iframe>
        </div>
    );
    
}

export default Transition;