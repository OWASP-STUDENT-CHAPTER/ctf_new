import "../../assets/css/stones.css";
import StoneModal from "./StoneModal";
import {useState, useEffect} from 'react';


const Stone = (props) => {
  
  const isOpen = props.isModalOpen;

  let className = "stone " + props.status;
  let imgClass= "stoneImg";
  
  let activeButton;
  if(props.status ==="active")
  {
    imgClass = "stoneImg " + props.name;
    activeButton=true;
  }
 

  return (
    <div className="stoneWrapper">
      {isOpen ? <StoneModal activateSoulStone={props.activateSoulStone} updateCurrentRound = {() => props.updateCurrentRound()} updateUser = {() => props.updateUser()} fetchNextQuestion={() => props.fetchNextQuestion()} stoneName={props.modal.name} isButtonActive= {activeButton}stoneAbility={props.modal.ability} onCloseModal={props.closeModalHandler}/> : null}  
      
      <div className={className} onClick={props.openModalHandler}>
        <img className={imgClass} src={props.img} />
        <p className="stoneName">{props.name}</p>
      </div>
    </div>
  );
};

export default Stone;
