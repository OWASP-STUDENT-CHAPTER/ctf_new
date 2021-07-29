import "../../assets/css/progressBar.css";
import cirlce from "../../assets/img/gola.png";

function ProgressButton(props)
{

    const clickHandler=()=>
    {
        props.onClickHandler(props.qno);
    }

    return(
        <div className="progress">
            <img src={cirlce} className="circle"></img>
            <button onClick={clickHandler} className={props.status}> {props.qno} </button>
        </div>
    );
}

export default ProgressButton;