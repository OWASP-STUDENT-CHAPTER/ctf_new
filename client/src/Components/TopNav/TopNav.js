import '../../assets/css/topnav.css';
import logo from "../../assets/img/logo.png"
import Timer from '../Timer/Timer';
import { Link } from 'react-router-dom';
// import axios from '../../util/axios';
import URL from "../../util/URL";


const TopNav = (props) =>
{
    // const hoursMinSecs = {hours:0, minutes: 0, seconds: 5}
    // const logoutHandle=async ()=>{
    //     const res=await axios.get('/auth/logout')
    //     console.log(res);
    // }
    const deactivateTimeStone = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include"
          };
      const response = await fetch(`${URL}/api/stones/deactivateTime`, requestOptions );
    }
    const propsHandler = () =>
    {
        if(props.stonesActive.includes("time"))
        {
            deactivateTimeStone();
        }
    }
    let redirect;
    if(props.roundNumber===5)
    {
        redirect="/end"
    }
    else
    {
        redirect="/game"
    }
    return (
        <div className="top-nav">
            <img className="logoNav" src={logo}/>
            <div className='timer'>
                    <Timer onTimeUpHandler={() => propsHandler()} redirectURL= {redirect} hoursMinSecs={props.timeRemaining}/>
            </div>
            <div className="buttons">  
                <button onClick={props.leaderboardHandler}>Leaderboard</button>
                {/* <Link to={`${URL}/api/auth/logout`}> */}
                    <a href={`${URL}/api/auth/logout`}><button >Sign Out</button> </a> 
                {/* </Link> */}
            </div>
            
        </div>
    );
}

export default TopNav;