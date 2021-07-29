import React from "react";
import "../assets/css/MainPage.css";
import TeamDetails from "../Components/Teamdetails/TeamDetails";
import StoneBox from "../Components/Stones/StoneBox";
import TopNav from "../Components/TopNav/TopNav";
import Leaderboard from "../Components/Leaderboard/leaderboard";
import SoulStoneTeamsPicker from "../Components/SoulStoneTeamsPicker/SoulStoneTeamsPicker";
import { useQuery } from "react-query";
import axios from "../util/axios";
import Map from "../Components/Map/Map";
import Round from "../Components/RoundNumber/Round";
import { useState,useEffect } from "react";
import URL from "../util/URL";
import { Redirect } from "react-router-dom";


const Dashboard = () => {

  const [currentQuestion, setCurrentQuestion] = useState({"title": "Loading..."});
  const [user, setUser] = useState({"status": "Loading"});
  const [isSolved, setIsSolved] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState();
  const [soulStoneActive, setSoulStoneActive] = useState(false);

  async function getCurrentRoundDetails() {
    await fetch(`${URL}/api/event/roundDetails`, {credentials: "include"})
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw response;
    })
    .then(data=> {
      setTimeRemaining(data.timeRemaining);
    })
    .catch(error => {
      setTimeRemaining({hours:0, minutes: 0, seconds: 5});
    });
  }

  async function getUser() {
    await fetch(`${URL}/api/participants/profile`, {credentials: "include"})
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw response;
    })
    .then(data=> {
      setUser(data);
    })
    .catch(error => {
      setUser(null);
    });
  }

  useEffect(() => {
    getCurrentRoundDetails();
    getUser();
  },[])

  useEffect(() => {
    getUser();
  },[isSolved])

  async function getNextQuestion() {
    await fetch(`${URL}/api/question/nextQuestion`, {credentials: "include"})
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw response.json();
    })
    .then(data=> setCurrentQuestion(data))
    .catch(async error => {
      console.error("Unable to fetch "+error);
    });
  }

  useEffect(() => {
    getNextQuestion();
  }, []);

  useEffect(() => {
    getNextQuestion();
    setIsSolved(false);
  }, [isSolved]);


  const[leaderboard, setLeaderboard]=useState(false);
  
  const leaderboardHandler=()=>{
    if(leaderboard)
    setLeaderboard(false);

    else
    setLeaderboard(true);
  }
  const updatePoints = () => {
    console.log("Trying to fetch points again");
    getUser();
  }

  if(user) {
    if(user.status === "Loading"){
      return(
        <div style={{color:"white",fontSize:"50px",marginTop:"150px",fontFamily:"Barcade"}}>
            Waiting For Heimdall To Open Bitfrost !
      </div>
      )
    }
  }
  else{
    return <Redirect to="/" />
  }

    return ( <div >
            
            {
              leaderboard?
              <Leaderboard onClose={leaderboardHandler}/>
              :null
            }
            {
              soulStoneActive?
              <SoulStoneTeamsPicker onClose={() => setSoulStoneActive(false)} updateUser = {() => getUser()}/>
              :null
            }
            {
              timeRemaining?
              <TopNav roundNumber = {user.progress.roundNumber} stonesActive = {user.stoneActive} leaderboardHandler={leaderboardHandler} timeRemaining={timeRemaining} />
              :null
            }
            <div  className = "main-wrapper" >
                <div className = "left" >
                  <Round roundNumber={currentQuestion.roundNumber} />
                    <Map 
                    updatePoints={() => updatePoints()}
                    question={currentQuestion} 
                    onSolve={() => setIsSolved(true)} 
                    questionBackend={currentQuestion} 
                    roundNumber={currentQuestion.roundNumber}
                    updateCurrentRound = {() => getCurrentRoundDetails()}/>  
                  </div> 
                <div className = "right" >
                  <TeamDetails points = {user.points}/>
                  <StoneBox activateSoulStone={() => setSoulStoneActive(true)} updateCurrentRound = {() => getCurrentRoundDetails()} updateUser = {() => getUser()} fetchNextQuestion ={() => getNextQuestion()}currentStones={user.stones} />
                  <p style={{display:"none" }}>"The flag for this question is : qwerty"</p>
                </div> 
            </div >
</div>);
};

export default Dashboard;