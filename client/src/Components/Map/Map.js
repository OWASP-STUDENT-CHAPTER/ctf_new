import "../../assets/css/MainPage.css";
import QuestionModal from "../Questions/QuestionModal";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Round from "../RoundNumber/Round";
import Snap from "./Snap";

const Map=(props)=>{
    
    const [qUpdate,setQUpdate]= useState(1);
    const qUpdater=(val)=>
    {
        setQUpdate(val);
    }

    let snap = false;   // set true after team clears round 6
    const [snapStatus,setSnapStatus] = useState(false);
    const snappedStatus = () => {
        setSnapStatus(true);
    }
    return(
        <div className="map">

            {!snapStatus?
                <>
                    
                    <ProgressBar question={props.question} modalUpdater={qUpdater} />
                    <QuestionModal updateCurrentRound = {() => props.updateCurrentRound()} snapStatus = {() => snappedStatus()} updatePoints={() => props.updatePoints()} onSolve={() => props.onSolve()} question={props.questionBackend}/>
                </>
                :
                <Snap/>
            }
        </div>
    );
}

export default Map;