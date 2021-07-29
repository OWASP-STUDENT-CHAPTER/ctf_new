import '../../assets/css/style.css'
import BackDrop from '../Modal/backdrop';
import InfoModal from "../Modal/InfoModal";

function CorrectAnsModal({closeCorrectAnsHandler})
{
    return(
        <div className="req">
            <InfoModal text="You Have Entered Correct Answer" buttonText="Ok" wrongAns="false" takeInput={false} onCancel={() => closeCorrectAnsHandler()} />
            <BackDrop onCancel={() => closeCorrectAnsHandler()}/>
        </div>
    );
}
export default CorrectAnsModal;