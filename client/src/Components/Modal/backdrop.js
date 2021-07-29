import '../../assets/css/style.css';

function BackDrop(props)
{
    return <div className="backdrop" onClick={props.onCancel}></div>;
} 
export default BackDrop;