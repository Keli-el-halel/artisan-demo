import { useQuery } from "@tanstack/react-query";
import moment from 'moment';
import { useState } from 'react';
import profileImg from '../assets/profile.png';
import { Calender } from '../components/calendar/Calender';
import { returnFormattedDate, showToast, saveInStorage, fetchFromStorage, delay  } from '../utils';
import { v4 as uuidv4 } from 'uuid';

function ArtisanProfile ({signedInUser, artisan, setInView}){

    const [selectedDate, setSelectedDate] = useState('None');
    const [appointmentDetails, setAppointmentDetails] = useState('');
    const [selectedDateFormatted, setSelectedDateFormatted] = useState(null);

    const [appointments, setAppointments] = useState(localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')).filter(appointment => appointment.artisan.id == artisan.id) : []);    
    const [calendarAppointments, setCalendarAppointments] = useState([]);
    const [updating, setUpdating] = useState(false);

    const {isLoading: renderingCalendar } = useQuery({ queryKey: ["calendarProcess"], queryFn: async () => {return await processAppointments()} });

    async function processAppointments(incomingAppointments){
        let apps = [];
        let appsIn = incomingAppointments ? incomingAppointments : [...appointments];
        console.log(appsIn);
        appsIn.forEach(element => {
            let priority = null;
            if (element.customer.id == signedInUser.id) {
                // console.log('here');
                priority = element.status == 'requested' ? 2 : element.status == 'rejected' ? 1 : 3;
            }
        
            apps.push({
                id: element.appointment_id,
                Event_Title: element.appointmentDetails,
                Event_Date: element.appointment_date,
                Priority: priority
            });
        });

        console.log('appsfd', appsIn);
        setCalendarAppointments(apps);
        await delay(1000);
        setUpdating(false);
        return 1;
    }

    function setAppointmentDate(returnedDayAndEvents){
        console.log(returnedDayAndEvents);
        if (returnedDayAndEvents.Events.length) {
            // .forEach(element => {
                
            // });
            // let oneisyours = returnedDayAndEvents.Events.find(element => element.Event_Details.id)
            // if ()
            showToast('The artisan is occupied on this day', 'error');
            setSelectedDate('None');
        }
        else{
            setSelectedDateFormatted(returnedDayAndEvents.Date);
            setSelectedDate(returnFormattedDate(returnedDayAndEvents.Date, 'MMMM dd, yyyy'))
        }
    }

    function requestAppointment(){
        if (selectedDateFormatted == '') {
            showToast('Please Select A Date', 'error');
            return;
        }

        let appBody = {
            appointment_id: 'appointment-' + uuidv4().substring(0,5),
            customer: signedInUser,
            artisan: artisan,
            appointment_date: selectedDateFormatted,
            appointmentDetails: appointmentDetails,
            status: 'requested'
        };
        console.log('appointment body: ', appBody);

        let appointments = fetchFromStorage('appointments');
        if (appointments) {
            appointments = JSON.parse(appointments);
        }
        else{
            appointments = [];
        }

        appointments.push(appBody)
        saveInStorage('appointments', JSON.stringify(appointments));
        showToast('Appointment Saved');
        setInView('Table');
    }

    return (
        <>
            <div className="row mx-auto mt-3">
                <div className="col-6 mx-auto text-center">
                    <img src={profileImg} style={{width:"100px", borderRadius: '50%'}} />
                    <div className='d-flex justify-content-center gap-2'>
                        <h3>Artisan:</h3>
                        <h3>{artisan.username}</h3>
                    </div>

                    <table className='mx-auto my-3' >
                        <tbody>
                            <tr style={{height: "50px"}}>
                                <td>ID: </td>
                                <td>{artisan.id}</td>                       
                            </tr>
                            <tr style={{height: "50px"}}>
                                <td>Job: </td>
                                <td>{artisan.job}</td>                                
                            </tr>
                            <tr style={{height: "50px"}}>
                                <td>Status: </td>
                                <td style={{color: "green"}}>Active</td>                                
                            </tr>
                            <tr style={{height: "50px"}}>
                                <td>Email </td>
                                <td>{artisan.email}</td>                                
                            </tr>
                        </tbody>
                    </table>


                </div>

                {/* Calender */}
                
            <div className="col-6 m-auto mt-1 text-center">

                {!updating && <Calender arrayOfEvents={calendarAppointments} returnEvents={setAppointmentDate}/>}


                <div className='d-flex justify-content-center gap-2'>
                    <h5>Selected Date:</h5>
                    <h5 style={selectedDate !== 'None' ? {color: "green"} : {color: "grey"}}>{selectedDate}</h5>
                </div>

                <textarea value={appointmentDetails} onChange={(e) => setAppointmentDetails(e.target.value)} type="text" className='form-control w-50 mx-auto mb-2' placeholder='Appointment Details' />


                <button disabled={selectedDate == 'None'} onClick={() => requestAppointment()} className="btn btn-outline-dark rounded-pill mt-3">Request Appointment</button>
            </div>


            </div>
        </>
    )
}

export default ArtisanProfile;