import "../../assets/css/stones.css";
import StoneBox from "./StoneBox";
import URL from "../../util/URL";
import swal from 'sweetalert';
import { useState } from "react";
import "../../assets/css/loader.css";


const StoneModal =(props) =>{
    const [data,setData] =  useState();
    const [loading, setLoading] = useState(false);
    let button= undefined;
    const stoneAbilityHandler = async (stoneName) =>
    {
        setLoading(true);
        if(stoneName === "Soul"){
            props.activateSoulStone();
            setLoading(false);
            return;
        }
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
        };
        fetch(`${URL}/api/stones/activate${stoneName}`, requestOptions )
        .then(async response => {
            if(response.ok){
                setData(response.json());
                swal({
                    title: "Congratulations!",
                    text: `${stoneName} Stone's Abilities Are Active`,
                    icon: "success",
                    });
                await props.fetchNextQuestion();
                await props.updateUser();
                await props.updateCurrentRound();
                setLoading(false);
             }
            else{
                throw response.json();
            }
          })
          .catch(async (error) => {
              const errorMessage = await error;
              console.log(errorMessage);
                swal({
                title: "OOPS!",
                text: errorMessage.error,
                icon: "error",
            })
            .then(() => {
                setLoading(false);
            })
          });   
    }
    if(props.isButtonActive)
    {
        button= <div >  
                    <button onClick = {() => stoneAbilityHandler(props.stoneName)} className="usestone" >Use Stone</button>
                    {
                    loading?
                    <div className="lds-ring stoneLoader"><div></div><div></div><div></div><div></div></div>
                    :null}

                </div> 
    }
    return(

        <div className="stoneModal">
            <img className="closePng" src="https://img.icons8.com/plumpy/24/000000/macos-close.png"
            onClick={props.onCloseModal} />
            <h3 className="stoneName">{props.stoneName + " Stone"}</h3>
            <p className="stoneDescription">{props.stoneAbility}</p>
            {button}
        </div>
    );
}

export default StoneModal;