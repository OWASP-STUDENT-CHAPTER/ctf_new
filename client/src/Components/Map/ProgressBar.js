import "../../assets/css/progressBar.css";
import ProgressButton from "./ProgressButton";
import { useState,useEffect } from "react";
import URL from "../../util/URL";
import { Redirect } from "react-router-dom";


const ProgressBar=(props)=>{
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [roundExists, setRoundExists] = useState(true);
    async function getNoOfQuestions() {
        await fetch(`${URL}/api/question/noOfQuestions`, {credentials: "include"})
        .then(response => {
          if(response.ok){
            return response.json();
          }
          if(response.status===404){
            setRoundExists(false);
          };
          throw response.json();
        })
        .then(data=> setNoOfQuestions(data))
        .catch(async error => {
          if(await error.error === "You Have Completed The Event")
          {
            console.log("Inside");
          }
          console.error("Unable to fetch "+error);
        });
      }
      useEffect(() => {
        getNoOfQuestions();
      }, [props.question.roundNumber]);

    let questionsSolved = props.question.questionNumber-1;
    let status;

    let i=1;
    let qarray=[];
    let length=Number(noOfQuestions);
    for(i=1;i<=length;i++)
    {
        qarray.push(`${i}`);
    }
    let redirect=null;
    if(!roundExists){
      redirect = <Redirect to ="/end"></Redirect>
    }
    return(
        <div className="progressbar">
          {redirect}
            { 
                qarray.map((quesno)=>{

                    length--;
                    if(questionsSolved)
                    {
                      status="solved";
                      --questionsSolved;
                    }
                    else
                    {
                      status="";
                    }
                    
                    return(
                        <>
                            <ProgressButton qno={quesno} onClickHandler={props.modalUpdater} status={status} />
                            {
                                length?
                                <div className="line"></div>
                                :null
                            }
                        </>
                    );
                    
                    
                })
                
            }
           

        </div>     
    );
}

export default ProgressBar;