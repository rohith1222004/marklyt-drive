import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const FolderCard = ({ folder }) => {
  return (
    <div style={{background:'blue',width:250, height:150,display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center',margin:5}} className="bg-blue shadow-md rounded-lg p-4 flex items-center space-x-4">
      <FontAwesomeIcon icon={faFolder} className="text-yellow-500 text-2xl" />
      <h1 style={{color:'white',fontWeight:600,fontSize:20}}>{folder}</h1>
    </div>
  );
};

export default FolderCard;