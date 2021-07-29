import '../../assets/css/style.css'
import cross from "../../assets/img/cross.png"
import tick from "../../assets/img/tick.gif"

function InfoModal(props)   
{
    function cancelHandler()
    {
        props.onCancel();
    }
    let inputField;
    if (props.takeInput){
        inputField = <input placeholder="Enter your input" />
    }
    let status;
    if(props.isWrongAns)
    {
        status= <img style={{alignItems:'center'}}style={{maxHeight:"40px",maxWidth:"40px"}} src={cross}></img> 
    }
    else{
        status= <img style={{maxHeight:"40px",maxWidth:"40px"}} src={tick}></img> 
    }
    return(
        <div>
            <div className="modal animate__animated animate__bounce">   
            <form>
            <p> {props.text} </p>
            {inputField}
            <div className="ques">
                {status}
                <button className="btn btn--alt" onClick={cancelHandler}>{props.buttonText}</button>
            </div>
            </form>
            </div>
        </div>
    );
}
export default InfoModal;