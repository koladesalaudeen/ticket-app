import {useState} from 'react';

import './slice.css';

function Slice(props){
    let inboundslice = <div className="inbound"><div className="arrival"><span className="time">{props.inbound.d_time}</span><span className="airport">{props.inbound.departure_port}</span></div><div className="duration"><span className="time">{props.inbound.duration}</span><span className="stops">{props.inbound.stops}</span></div><div className="arrival"><span className="time">{props.inbound.arrival_time}</span><span className="airport">{props.inbound.arrival_port}</span></div></div>
    let outboundslice = <div className="outbound"><div className="departure"><span className="time">{props.outbound.d_time}</span><span className="airport">{props.outbound.departure_port}</span></div><div className="duration"><span className="time">{props.outbound.duration}</span><span className="stops">{props.outbound.stops}</span></div><div className="arrival"><span className="time">{props.outbound.arrival_time}</span><span className="airport">{props.outbound.arrival_port}</span></div></div>
    
    const [printInbound,setInbound] = useState("false")
    const clickHandler = () => {
        setInbound(prevValue => !prevValue)
    }
    return(
    <div onClick={clickHandler}>
        <img src={props.logo}/>

        <div className="slice_container">
           {outboundslice}
           {printInbound ? inboundslice : null}
        </div>
    </div>
    )
}
export default Slice;