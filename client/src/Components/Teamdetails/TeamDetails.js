import '../../assets/css/TeamDetails.css';
import { useState,useEffect } from 'react';
import URL from "../../util/URL";

const TeamDetails = (props) =>
{
    const [myTeam, setMyTeam] = useState({teamName: "Loading...", members: []});

    async function getMyTeam() {
      await fetch(`${URL}/api/team/myTeam`, {credentials: "include"})
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw response;
      })
      .then(data => setMyTeam(data))
      .catch(error => {
        console.error("Unable to fetch "+error);
      });
    }
    useEffect(() => {
        getMyTeam();
      }, []);
    return (
        <div className="team-details">
            <h2>{myTeam.teamName}</h2>
            <div className="team-members">
                {/* <h3>{props.team.members[0]}</h3>
                <h3>{props.team.members[1]}</h3>
                <h3>{props.team.members[2]}</h3> */}
                {
                    myTeam.members.map((member)=>{
                        return(<h3>{member.name}</h3>);
                    })
                }
                  
            </div>
            <div className="team-points">
                <p>Points : </p> <span className="points">{props.points}</span>
            </div>
        </div>
    );
}

export default TeamDetails;