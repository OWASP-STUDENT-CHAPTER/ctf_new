import { useEffect, useState } from "react";
import "../../assets/css/leaderboard.css";

const Row=(props)=>{
    const [isSelected, setIsSelected] = useState(false);
    let className = "usestone"
    if(isSelected){
        className = "usestone selected-button"
    }
    if(props.isGreyedOut){
        className = "usestone disabled-button"
    }

    const handleSelect = () => {
        if(!props.isGreyedOut){
            setIsSelected(!isSelected);
        }
    }

    useEffect(() => {
        if(isSelected){
            props.onSelectHandler(props.team._id);
        }
        else{
            props.onDeselectHandler(props.team._id)
        }
    }, [isSelected]);
    let text="Select";
    if(isSelected){
        text = "Selected"
    }
    return(
        <tr>
            <td>{props.rank}</td>
            <td>{props.team.teamName}</td>
            <td>{props.team.points}</td>
            <td><button disabled={props.isGreyedOut} onClick={handleSelect} className={className}>{text}</button></td>
        </tr>
    );
}

export default Row;