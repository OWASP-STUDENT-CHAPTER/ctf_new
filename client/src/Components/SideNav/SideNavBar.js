import React from 'react';
import bg from '../../assets/img/jarvis.png';
import SideNavLink from './SideNavLink';
import Button from '../Button/Button';


const SideNavBar = ({currentQuestionNumber}) => {
    const questionCount = 10;
    let questionElements = [];
    let element;
    console.log(questionElements);
    for (let i=0; (i<questionCount); i++){
        element = (<SideNavLink isCompleted={currentQuestionNumber>(i+1)} isCurrent={currentQuestionNumber===i+1} text={"Ques" + (i+1)} currentQuestionNumber={currentQuestionNumber} /> );
        questionElements.push(element);
    }
    return (
        <div className="wrapper-sidebar">
            <div className="sidebar-event">
                {/* <h2>J.AR.VIS</h2> */}
                <img src={bg} width='300px'></img>
                <ul>
                    {questionElements}
                </ul>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-warning">
                            <a href ="/">Sign Out</a>
                            </button>
                        </div>
                        <div className="col-md-6">
                        <button className="btn btn-warning">
                            <a href="/leaderboard">Leaderboard</a>
                        </button>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
     
    );
}

export default SideNavBar;