import "../../assets/css/leaderboard.css";
import {GrClose} from 'react-icons/gr';
import Row from "./Row";
import { useEffect, useState } from "react";
import URL from "../../util/URL";
import swal from 'sweetalert';
import "../../assets/css/loader.css";

const SoulStoneTeamsPicker =(props)=>{
  
  const [teams, setTeams] = useState([{"teamName": "Loading...", "points": "Loading..."}]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [loading, setLoading] = useState(false);

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

  async function activateSoul() {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'teams': selectedTeams}),
      credentials: "include"
      };
    await fetch(`${URL}/api/stones/activateSoul`, requestOptions)
    .then(async response => {
      if(response.ok){
        swal({
          title: "Congratulations!",
          text: `Soul Stone's Abilities Are Active`,
          icon: "success",
          });
          setLoading(false);
          props.onClose();
          await props.updateUser();
          return response.json();
      }
      throw response;
    })
    .catch(async error => {
      const errorMessage = await error;
      console.log(errorMessage);
      swal({
        title: "OOPS!",
        text: "You don't seem to have a Soul Stone in your Gauntlet",
        icon: "error",
    })
    props.onClose();
    setLoading(false);
    });
  }

  useEffect(() => {
    getLeaderboard();
  }, []);

  const onTeamSelectHandler = (teamId) => {
    setSelectedTeams([...selectedTeams, teamId])
  }

  const onTeamDeselectHandler = (teamId) => {
    var array = [...selectedTeams];
    var index = array.indexOf(teamId); 
    if (index !== -1) {
      array.splice(index, 1);
      setSelectedTeams(array);
    }
  }
  let className = "usestone disabled-button"
  if(selectedTeams.length==2){
    className = "usestone selected-button"
  }
  let sno=1;
  return(
    <div className="leaderboard">
        <GrClose className="close-icon" onClick={props.onClose}/>
        <h2 className="leaderboard-heading">Pick 2 teams to deduct 10% of their points</h2>
        <table id="leaderboard-table">
          <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Team Name</th>
                <th scope="col">Points</th>
                <th scope="col">Select</th>
              </tr>
          </thead>
          <tbody>
            {
              teams.map((team)=>{
                  return(
                    <Row onSelectHandler={onTeamSelectHandler} 
                    onDeselectHandler={onTeamDeselectHandler} 
                    isGreyedOut={(selectedTeams.length==2)&&(!selectedTeams.includes(team._id))}
                    rank={sno++} 
                    team={team}/>
                  );
              })
            }
          </tbody>
        
        </table>
        <button disabled={selectedTeams.length!=2} onClick={() => activateSoul()} className={className}>Use Stone</button>
        {
        loading?
        <div className="lds-ring stoneLoader"><div></div><div></div><div></div><div></div></div>
        :null}
    </div>
  );
}

export default SoulStoneTeamsPicker;