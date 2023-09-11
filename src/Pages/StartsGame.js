
import * as signalR from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { setConnection } from "../Component/redux/connection";

const [playerId, setPlayerId] = useState(null);
const dispatch =useDispatch()

    
useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5234/hub")
    .build();
    
    connection.on('PlayerIdAssigned', (assignedPlayerId) => {
        setPlayerId(assignedPlayerId);
    });
    
    connection.start();
}, []);