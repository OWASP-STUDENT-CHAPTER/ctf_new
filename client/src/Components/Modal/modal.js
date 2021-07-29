import '../../assets/css/style.css'
function Modal(props)   
{
    function cancelHandler()
    {
        props.onCancel();
    }
    function submitHandler()
    {
        props.onSubmit();
    }
    let inputField;
    if (props.takeInput){
        inputField = <input placeholder="Enter your input" />
    }
    return(
        <div>
            <div className="modal animate__animated animate__bounce">   
            <form>
            <p> {props.text} </p>
            {inputField}
            <div className="ques">
                <button className="btn btn--alt" onClick={cancelHandler}>Cancel</button>
                <button className="btn" onClick={submitHandler}>Yes</button>
            </div>
            </form>
            </div>
        </div>
    );
}
export default Modal;