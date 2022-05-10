import {useState} from 'react';
import React from 'react';
import Calendar from "react-calendar"

import axios from "axios";


var testObj = {
  "one" : "one",
  "two" : "two",
  "three" : "three",
  "four" : "four",
  "five" : "five"
}

var arrOfStrings = ["one","two","three","four","five"]

export function Input(){
    const [Input,setInput] = useState({});
    const [passenger,setPassenger] = useState();
    const [calendar,setDate] = useState({});

    const handleChange = (event) => {
        const name = event.target.name ;
        const value = event.target.value;

        var span_parent = document.getElementById('search_result');
        var airport_iata

        axios({
          url : "http://localhost:4001/iata",
          responseType: 'text',
          params : {iata : value}
        })
        .then((response) => {
          console.log(response.data.data);
          let responseData = response.data.data
          let res_length = responseData.length;
          for(let i = 0 ; i < res_length; i++){
            console.log(responseData[i].name)
            let span = document.createElement('span');
            span.setAttribute("class", "span");
            span.onclick = spanHandler;
            span.innerText = responseData[i].address.cityName+","+responseData[i].name+"("+responseData[i].iataCode+")";

            span_parent.appendChild(span);
          }  
        })

        const spanHandler = (element) => {
          let selected = element.target.innerText
          event.target.value = selected;
          setInput({...Input,[name] : selected.slice(-4,-1)})
          console.log(Input)

          while(span_parent.hasChildNodes()){
            span_parent.removeChild(span_parent.firstChild)
          }
        }
        // setInput(inputs => ({...inputs,[name] : value}));
    }

   const handleSubmit = (event) => {
        event.preventDefault();
        console.log(Input);
       axios({
           url : "http://localhost:4001/offerRequest",
           params : Input
       })
       .then(res => {
         sessionStorage.setItem("offerList",JSON.stringify(res.data));
        window.location.pathname = "offer"
        })
      .catch(error => console.log(error))
    } 

   const departureOrigin = (value) => {
           console.log(value);
           let date = value.toISOString();
           setDate({...calendar,["depart"]:value.toString().slice(0,15)});
           setInput(inputs => ({...inputs,["depart"] : date}));
           document.getElementsByClassName("calendar")[0].style.visibility = "hidden"
   }

   const returnOrigin = (value) => {
         let date = value.toISOString();
         console.log(date);
         setDate({...calendar,["Return"] : value.toString().slice(0,15)});
         setInput(inputs => ({...inputs,["Return"] : date}));
         document.getElementsByClassName("calendar")[1].style.visibility = "hidden";
  }

   const Return = () => {
    document.getElementsByClassName("calendar")[0].style.visibility = "hidden"
    document.getElementsByClassName("calendar")[1].style.marginLeft = "28%"
    document.getElementsByClassName("calendar")[1].style.visibility = "visible";
   }

   const Depart = () => {
    document.getElementsByClassName("calendar")[1].style.visibility = "hidden";
    document.getElementsByClassName("calendar")[0].style.visibility = "visible"
    }

   const changePassenger = (event) => {setPassenger(event.target.value)}

    return(
        <div className="flight-search-container">
            <form onSubmit={handleSubmit}>
                <input 
                  type="text"
                  name = "from" 
                  placeholder="From"
                  onChange = {handleChange} />
                <input 
                  type="text" 
                  name = "to"
                  placeholder="To"
                  // value = {Input.to  }
                  onChange = {handleChange} />
                <input 
                  id = "depart"
                  type="text" 
                  name = "depart"
                  placeholder="Depart"
                  value = {calendar.depart || ""}
                  onClick = {Depart}
                  readOnly={true}
                   />
                <input 
                  type="text"
                  name = "Return" 
                  placeholder="Return"
                  value = {calendar.Return  || ""}
                  onClick = {Return}
                  readOnly={true} />
                <input 
                  type="text" 
                  name = "passenger"
                  placeholder="1 passenger"
                  value={passenger}
                  onChange={changePassenger}/>
                <button>Submit</button>
            </form>
            <div className='calendar-container'>
             <div className="calendar">
              <Calendar onChange={departureOrigin}  />
             </div>
             <div className="calendar">
              <Calendar onChange={returnOrigin} className="endar" />
             </div>
            </div>
            <div id="search_result">
            </div>

            
        </div>
    );
}

export default Input;