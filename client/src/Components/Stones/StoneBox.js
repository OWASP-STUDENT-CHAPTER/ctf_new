import Stone from './Stone';
import StoneModal from './StoneModal';
import { useState } from 'react';

import power from '../../assets/img/stones/power.png';
import space from '../../assets/img/stones/space.png';
import reality from '../../assets/img/stones/reality.png';
import soul from '../../assets/img/stones/soul.png';
import time from '../../assets/img/stones/time.png';
import mind from '../../assets/img/stones/mind.png';

import "../../assets/css/stones.css";



const StoneBox = (props) =>{

    const [aboutStone, setaboutStone] = useState(false);

    const aboutStoneHandler=() => {
        if(aboutStone===true){
            setaboutStone(false);
            
        }
        else{
            setaboutStone(true);
        }
    }


    const [stoneModalOpen, setStoneModalOpen] = useState();

    const abilities=[{name:"Power", ability:"5 Hints"},
    {name:"Space", ability:"Skip 3 Questions"},
    {name:"Reality", ability:"Go invisible from LeaderBoard"},
    {name:"Soul", ability:"Deduct 10% of points from 2 teams of your choice"},
    {name:"Time", ability:"Increase Question Solving time by 30 mins"},
    {name:"Mind", ability:"Unlock Other Stones To Find Out"} ];

    return(
        <div className="stoneBox">
            <h3>Stones</h3>
            <p style={{opacity:"0"}}>This is not the key</p>
            <div className="row1">
                <Stone updateCurrentRound = {() => props.updateCurrentRound()} updateUser = {() => props.updateUser()} fetchNextQuestion={() => props.fetchNextQuestion()} name="Power" isModalOpen={stoneModalOpen==="Power"} openModalHandler={()=>setStoneModalOpen("Power")} closeModalHandler={()=>setStoneModalOpen()} img={power} status={props.currentStones.includes("power") ? "active" : ""} modal={abilities[0]}/>
                <Stone updateCurrentRound = {() => props.updateCurrentRound()} updateUser = {() => props.updateUser()} fetchNextQuestion={() => props.fetchNextQuestion()} name="Space" isModalOpen={stoneModalOpen==="Space"} openModalHandler={()=>setStoneModalOpen("Space")} closeModalHandler={()=>setStoneModalOpen()} img={space} status={props.currentStones.includes("space") ? "active" : ""} modal={abilities[1]}/>
                <Stone updateCurrentRound = {() => props.updateCurrentRound()} updateUser = {() => props.updateUser()} fetchNextQuestion={() => props.fetchNextQuestion()} name="Reality" isModalOpen={stoneModalOpen==="Reality"} openModalHandler={()=>setStoneModalOpen("Reality")} closeModalHandler={()=>setStoneModalOpen()} img={reality} status={props.currentStones.includes("reality") ? "active" : ""} modal={abilities[2]}/>
            </div>
            <div className="row2">
            <Stone updateCurrentRound = {() => props.updateCurrentRound()} updateUser = {() => props.updateUser()} fetchNextQuestion={() => props.fetchNextQuestion()} name="Soul" isModalOpen={stoneModalOpen==="Soul"} openModalHandler={()=>setStoneModalOpen("Soul")} closeModalHandler={()=>setStoneModalOpen()} img={soul} status={props.currentStones.includes("soul") ? "active" : ""} modal={abilities[3]} activateSoulStone={props.activateSoulStone}/>
            <Stone updateCurrentRound = {() => props.updateCurrentRound()} updateUser = {() => props.updateUser()} fetchNextQuestion={() => props.fetchNextQuestion()} name="Time" isModalOpen={stoneModalOpen==="Time"} openModalHandler={()=>setStoneModalOpen("Time")} closeModalHandler={()=>setStoneModalOpen()} img={time} status={props.currentStones.includes("time") ? "active" : ""} modal={abilities[4]}/>
            <Stone updateCurrentRound = {() => props.updateCurrentRound()} updateUser = {() => props.updateUser()} fetchNextQuestion={() => props.fetchNextQuestion()} name="Mind" isModalOpen={stoneModalOpen==="Mind"} openModalHandler={()=>setStoneModalOpen("Mind")} closeModalHandler={()=>setStoneModalOpen()} img={mind} status={props.currentStones.includes("mind") ? "active" : ""} modal={abilities[5]}/>
            </div>
        </div>
    );  
}

export default StoneBox;