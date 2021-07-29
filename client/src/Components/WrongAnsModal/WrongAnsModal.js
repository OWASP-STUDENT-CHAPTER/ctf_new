import '../../assets/css/style.css'
import BackDrop from '../Modal/backdrop';
import InfoModal from "../Modal/InfoModal";

function WrongAnsModal({closeWrongAnsHandler})
{
    return(
        <div className="req">
            <InfoModal text="You Have Entered Wrong Answer" buttonText="Ok" isWrongAns="true" takeInput={false} onCancel={() => closeWrongAnsHandler()} />
            <BackDrop onCancel={() => closeWrongAnsHandler()}/>
        </div>
    );
}
export default WrongAnsModal;