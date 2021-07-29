import React, { useState } from 'react';


const SideNavLink = (props) => {
    const isCompleted=props.isCompleted;
    const isCurrent = props.isCurrent;
    let link;
    if(isCurrent){
        link = <li style={{backgroundColor: "#FCA800"}}><a href="#ques1" style={{color: "white"}}><i className="fas fa-check"></i>{props.text}</a></li>
    }
    else{
        if (!isCompleted){
            link = <li><a href="#ques1"><i className="fas fa-question"></i>{props.text}</a></li>
        }
        else {
            link = <li style={{backgroundColor: "green"}}><a href="#ques1"><i className="fas fa-check"></i>{props.text}</a></li>
        }
    }
    return link;
}

export default SideNavLink;