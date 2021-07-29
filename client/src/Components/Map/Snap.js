import { useState } from "react";
import hand from "../../assets/img/snap/hand.gif";
import snap from "../../assets/img/snap/snap.gif";
import powers from "../../assets/img/snap/powers.gif";
import  "../../assets/css/snap.css";
import { Redirect } from "react-router-dom";



const Snap=()=>{

    const [isSnap, setIsSnap]=useState(false);
    const [redirect,setRedirect] = useState(null);

    const snapHandler=()=>{
        setIsSnap(true);
       setTimeout(() => {
            setRedirect(<Redirect to ="/end"></Redirect>);
        }, 10000);
    }
    return(
        <div className="snap-div">
            {redirect}
            { 
                !isSnap?
                <>
                <img src={hand} onClick={snapHandler} className="hand"/>
                <p>Click the gauntlet to snap</p>
                </>
                :
                <img src={snap}/>
            }
        </div>
    )
}

export default Snap;