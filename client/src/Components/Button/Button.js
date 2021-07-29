import React from 'react';
import '../../assets/css/sidebar.css'

const Button = ({text, color, isActive, linkAddress, textColor, onClickHandler,download}) => {
    let onClickLinkHandler;
    if(onClickHandler){
        onClickLinkHandler = () => onClickHandler();
    }
    if(download)
    {
        return (
            <div className="btn" style={{backgroundColor: color}} onClick={onClickLinkHandler}>
                <a className="fa fa-download" ref={linkAddress} style={{fontFamily:"Josefin Sans', sans-serif",color: textColor}}>{"  " + text}</a>
            </div>
        );  
    }
    return (
        <div className="btn" style={{backgroundColor: color}} onClick={onClickLinkHandler}>
            <a href={linkAddress} style={{color: textColor}}>{text}</a>
        </div>
    );
    
}

export default Button;