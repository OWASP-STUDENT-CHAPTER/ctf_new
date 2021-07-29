import { useState,useEffect } from "react";
import "../../assets/css/questionModal.css";
import Modal from "../Modal/modal";
import HintModal from "./HintModal";
import swal from 'sweetalert';
import URL from "../../util/URL";
import "../../assets/css/loader.css";
import { Redirect } from "react-router";



const QuestionModal =(props) =>{

    const [currrentAnswer,setCurrentAnswer] = useState("");
    const[powerHint,setPowerHint] = useState(0);
    const [currentHint, setCurrentHint] = useState("Loading...");
    const [loading, isLoading] = useState(false);
    const [currentHintCost, setCurrentHintCost]= useState('');

    async function getQuestionHintCost() {
      await fetch(`${URL}/api/question/questionHintCost/`+`${props.question._id}` , {credentials: "include"})
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw response;
      })
      .then(
        (data) => {
          setCurrentHintCost(data.questionHintCost);
      },
      (error) => {
        console.error("Unable to fetch "+error);
      });
    }

  useEffect(() => {
    if(props.question._id){
      getQuestionHintCost();
    }
  },[props.question._id]);

  async function getQuestionHint() {
    await fetch(`${URL}/api/question/questionHint/`+`${props.question._id}` , {credentials: "include"})
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw response;
    })
    .then(
      (data) => {
       setCurrentHint("Hint: "+data.questionHint.text);
        setPowerHint(data.powerHint);
    },
    (error) => {
      console.log(error.status);
      console.error("Unable to fetch "+error);
    });
  }
  
//   useEffect(() => {
//     console.log("fired");   
//     getQuestionHint();
//     console.log(currentHint);
//   }, []);

    // const [hint, setHint] = useState();

    const [hintModal, setHintModal] = useState(false);
    const [finishStatus,setFinishStatus] = useState(false);
    const [snapStatus,setSnapStatus] = useState(null);
    const hintModalHandler=()=>{
        if(hintModal===false){
            setHintModal(true);
        }
        else{
            setHintModal(false);
        }
    }

    const hintHandler = async ()=>{
        await getQuestionHint();
        props.updatePoints();
    }
    const handleSubmit = async (event) => {
          if(currrentAnswer !== "")
          {
              isLoading(true);
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'answer': currrentAnswer.toLowerCase()}),
                credentials: "include"
                };
            const response = await fetch(`${URL}/api/question/submitAnswer/`+`${props.question._id}`, requestOptions );
            const data = await response.json();
            isLoading(false);
            setFinishStatus(data.finishStatus.finished);  
            setSnapStatus(data.finishStatus.snap);
            if(data.data.correct === true){
                props.onSolve();
                // Correct Ans Modal
                swal({
                    title: "Congratulations!",
                    text: "You answered correctly",
                    icon: "success",
                  });
                setCurrentHint("");
                setCurrentAnswer("");
                props.updateCurrentRound();
              } 
            else
            {
             
                // wrong ans modal
                swal({
                    title: "OOPS!",
                    text: "Incorrect answer",
                    icon: "error",
                  });
            }
          }
      }
    let redirect= null;
    useEffect(() => {
      if(snapStatus)
      {
        props.snapStatus();
      }
    }, [snapStatus]);

    const handleAnswerUpdate = (event) => {
        setCurrentAnswer(event.target.value);
      }
      
      const downloadBtn=()=>{
        if(props.question.filesAssociated !== " ")
        return(<a href={props.question.filesAssociated} target="blank"><button className="quesLink">Download</button></a>)
        else
        return(<button className="quesLink disabled" disabled>Download</button>)
      }
      
    return(
          <>
          {
           finishStatus && (snapStatus===false)?  
          <Redirect to="/end" />
          :null
          }
              <div className="quesModal"> 
            <h2 className="quesNumber">Question: {props.question.questionNumber}</h2>
            <p style={{color:"rgb(123, 201, 204)" , textAlign: "center", marginBottom: "10px", opacity:"1"}}> Question Points: {props.question.points} pts</p>

            <p className="quesBody">{props.question.title}</p>
            <p className="quesBody">{props.question.body}</p>
            <div className="quesButtons">
                {
                  downloadBtn()
                }
              
                <button className="hintButton" onClick={hintModalHandler}>Hint</button>
            </div>
            {
              powerHint ? <div className ="powerHint">Free Hints Remaining: {powerHint} </div> : null
            }
            
            {
                currentHint!=="Loading..." ? <span className="hint">{currentHint}</span>: null
            }
            <div className="answer">
                <input type="text" placeholder="Enter your answer" onChange={handleAnswerUpdate} value={currrentAnswer}></input>
                <a>
                <button className="submitAnswer" type="submit" onClick={handleSubmit} >Submit</button>
                </a>
                {
                  loading?
                  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                  :null
                }
            </div>  
            {
                hintModal?<HintModal hintHandler={hintHandler} modalHandler={hintModalHandler} hintCost={currentHintCost} powerHint={powerHint}/>:null
            }
        </div>
      </>
    );

}

export default QuestionModal;