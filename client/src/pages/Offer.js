import { useEffect, useState } from 'react'
import render from 'react-dom'
import './offer.css'

import {loaderAnimation as Loader} from './../components/loaderAnimation';
import Slice from './../components/slice/Slice';

let items=['Item 1','Item 2','Item 3','Item 4','Item 5'];
let itemList=[];
items.forEach((item,index)=>{
  itemList.push( <li key={index}>{item}</li>)
})

// const of = () => {
//     let result = sessionStorage.getItem("offerList")
//     offerList = JSON.parse(result)
//     console.log(offerList);
// }

function Offer(){
    var i = 0;
    var sliceList = []
    const slice = <Slice d_time="04:00" departure_port="LHR" duration="8hrs54mins" stops={0} arrival_time="12:54" arrival_port="LOS"/>
    const [getSlice,setSlice] = useState(JSON.parse(sessionStorage.getItem("offerList")))
    const offerList = []

    const offerSync = () => {
        getSlice.forEach((slice) => {
            offerList.push(
                <Slice d_time={slice.outbound_segment.departing_at} 
                       departure_port={slice.outbound_segment.origin.airport_iata} 
                       duration={slice.outbound_segment.duration} 
                       stops={0} 
                       arrival_time={slice.outbound_segment.arriving_at} 
                       arrival_port={slice.outbound_segment.destination.airport_iata}
                       inbound = {slice.inbound_segment}
                    />
            );
        })
        sessionStorage.removeItem("offerList")
    }

    useEffect(() => {
    })

    offerSync();

    // of();
 
    return(
        <>
        <Loader/>
        <h1>Hello Spinners </h1>
        <ul>
          {itemList}
        </ul>
        {offerList}
        </>
    )
}

export default Offer;