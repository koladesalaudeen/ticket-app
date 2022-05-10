import { Duffel } from '@duffel/api';
// let Duffel = require('@duffel/api')
//FtZArlK5oiXjbBoAOMKh

export const duffel = new Duffel({
  token: 'duffel_test_VFtT7NE4hFLpDcThpqYTcn7A-zhbNwCIHwyvPxA0IUM',
})

export const requests = async (origin,destination,arrival_at,departure_from) => {
  
  const request = await duffel.offerRequests.create({ 
  slices : [
    {
      origin: origin,
      destination: destination,
      departure_date: arrival_at
    },
    {
      origin: destination,
      destination: origin,
      departure_date: departure_from
    }
  ],
  passengers: [{ type: "adult" }, { type: "adult" }, { age: 1 }],
  cabin_class: "business",
  return_offers: false
})
  return request;
}

export const offers = async (id) => {
  const filterdResult = {
          owner : { name : '',
                    id : ''},
          total_amount : '',
          offer_id : '',
          inbound_segment : {
                              origin : {
                                airport_name : '',
                                airport_iata : '',
                                terminal : '',
                              },
                              destination : {
                                airport_name : '',
                                airport_iata : '',
                                terminal : '',
                              },
                              aircraft : '',
                              departing_at : '',
                              arriving_at : '',
                              duration : '',
                              marketing_carrier : {
                                name : '',
                                flight_number : ''
                               },
                              operating_carrier : {
                                name : '',
                                flight_number : ''
                              }
          },
          outbound_segment : {
                              origin : {
                                airport_name : '',
                                airport_iata : '',
                                terminal : '',
                              },
                              destination : {
                                airport_name : '',
                                airport_iata : '',
                                terminal : '',
                              },
                              aircraft : '',
                              departing_at : '',
                              arriving_at : '',
                              duration : '',
                              marketing_carrier : {
                                name : '',
                                flight_number : ''
                               },
                              operating_carrier : {
                                name : '',
                                flight_number : ''
                              }

        }
  }
  const sortedResultArr = []
  const result = await duffel.offers.list({
          offer_request_id: id,
          sort: 'total_amount',
          limit : 10
  })

  const sortedResult = result.data.map((data)=>{
       for (const key in data ){
         if (key == "slices"){
              data[key].map((slice,index) => {
                  if(index == 0){
                    filterdResult.inbound_segment.origin.airport_name = data[key][0].segments[0].origin.name
                    filterdResult.inbound_segment.origin.airport_iata = data[key][0].segments[0].origin.iata_code
                    filterdResult.inbound_segment.origin.terminal = data[key][0].segments[0].origin_terminal

                    filterdResult.inbound_segment.destination.airport_name = data[key][0].segments[0].destination.name
                    filterdResult.inbound_segment.destination.airport_iata = data[key][0].segments[0].destination.iata_code
                    filterdResult.inbound_segment.destination.terminal = data[key][0].segments[0].destination_terminal

                    filterdResult.inbound_segment.marketing_carrier.name = data[key][0].segments[0].marketing_carrier.name
                    filterdResult.inbound_segment.marketing_carrier.flight_number = data[key][0].segments[0].marketing_carrier_flight_number

                    filterdResult.inbound_segment.operating_carrier.name = data[key][0].segments[0].operating_carrier.name
                    filterdResult.inbound_segment.operating_carrier.flight_number = data[key][0].segments[0].operating_carrier_flight_number

                    filterdResult.inbound_segment.aircraft = data[key][0].segments[0].aircraft.name
                    filterdResult.inbound_segment.arriving_at = data[key][0].segments[0].arriving_at
                    filterdResult.inbound_segment.departing_at = data[key][0].segments[0].departing_at
                    filterdResult.inbound_segment.duration = data[key][0].segments[0].duration
                  }
                  else if(index == 1){
                    filterdResult.outbound_segment.origin.airport_name = data[key][1].segments[0].origin.name
                    filterdResult.outbound_segment.origin.airport_iata = data[key][1].segments[0].origin.iata_code
                    filterdResult.outbound_segment.origin.terminal = data[key][1].segments[0].origin_terminal

                    filterdResult.outbound_segment.destination.airport_name = data[key][1].segments[0].destination.name
                    filterdResult.outbound_segment.destination.airport_iata = data[key][1].segments[0].destination.iata_code
                    filterdResult.outbound_segment.destination.terminal = data[key][1].segments[0].destination_terminal

                    filterdResult.outbound_segment.marketing_carrier.name = data[key][1].segments[0].marketing_carrier.name
                    filterdResult.outbound_segment.marketing_carrier.flight_number = data[key][1].segments[0].marketing_carrier_flight_number

                    filterdResult.outbound_segment.operating_carrier.name = data[key][1].segments[0].operating_carrier.name
                    filterdResult.outbound_segment.operating_carrier.flight_number = data[key][0].segments[0].operating_carrier_flight_number

                    filterdResult.outbound_segment.aircraft = data[key][1].segments[0].aircraft.name
                    filterdResult.outbound_segment.arriving_at = data[key][1].segments[0].arriving_at
                    filterdResult.outbound_segment.departing_at = data[key][1].segments[0].departing_at
                    filterdResult.outbound_segment.duration = data[key][1].segments[0].duration
                  }
                })
         }
       }
         filterdResult.owner.name = data.owner.name;
         filterdResult.owner.id = data.owner.id;
         filterdResult.total_amount = data.total_amount;
         filterdResult.offer_id= data.id;

         sortedResultArr.push(filterdResult)
   })
  return sortedResultArr
}
