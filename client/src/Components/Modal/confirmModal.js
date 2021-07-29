import '../../assets/css/style.css'
import BackDrop from './backdrop';
import Modal from "./modal";

function Confirm({closeHintHandler})
{
    return(
        <div className="req">
            <Modal text="Are You Sure You Want To Take A Hint ?" takeInput={false} onCancel={() => closeHintHandler()} onSubmit={() => closeHintHandler()} />
            <BackDrop onCancel={() => closeHintHandler()}/>
        </div>
    );
}
export default Confirm;