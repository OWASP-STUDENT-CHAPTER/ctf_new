import "../../assets/css/leaderboard.css";
import {GrClose} from 'react-icons/gr';
import Row from "./Row";
import { useEffect, useState } from "react";
import URL from "../../util/URL";

const Leaderboard =(props)=>{
  
  const [teams, setTeams] = useState([{"teamName": "Loading...", "points": "Loading..."}]);

  async function getLeaderboard() {
    await fetch(`${URL}/api/participants/leaderboard`, {credentials: "include"})
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw response;
    })
    .then(teams=> {
      setTeams(teams.sort((a,b)=> b.points-a.points));
    })
    .catch(error => {
      console.log(error);
      setTeams([]);
    });
  }

  useEffect(() => {
    getLeaderboard();
  }, []);

  let sno=1;
  return(
    <div className="leaderboard">
        <GrClose className="close-icon" onClick={props.onClose}/>
        <h2 className="leaderboard-heading">Leaderboard</h2>
        <table id="leaderboard-table">
          <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Team Name</th>
                <th scope="col">Points</th>
              </tr>
          </thead>
          <tbody>
            {
              teams.map((team)=>{
                  return(
                    <Row rank={sno++} team={team}/>
                  );
              })
            }
          </tbody>
        
        </table>
    </div>
  );
}

export default Leaderboard;