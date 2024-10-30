import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import './Card.css'
import { Navigate, useNavigate } from 'react-router-dom';
function Optioncard(props) {
    const navigate=useNavigate();
    return (
        <div className='card'>
            <Card variant='outlined' onClick={()=>navigate(`${props.action}`)} sx={{ width: "25vw", height: "10vh", bgcolor: "#1f1f1f",display:'flex', justifyContent:'center',alignItems:'center'}}>
                <p color='white'>{props.p}</p>
            </Card>
        </div>
    )
}
export default Optioncard;