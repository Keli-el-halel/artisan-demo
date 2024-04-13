import { useQuery } from "@tanstack/react-query";
import moment from 'moment';
import { Calender } from "../components/calendar/Calender";
import { useState } from "react";
import { delay, returnFormattedDate, saveInStorage, showAlert, showToast, fetchFromStorage } from "../utils";
import profileImg from '../assets/profile.png';

function ArtisanDashboard ({signedInUser}){
    const [appointments, setAppointments] = useState(localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')).filter(appointment => appointment.artisan.id == signedInUser.id) : []);    
    const [calendarAppointments, setCalendarAppointments] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [appointmentsOnDay, setAppointmentsOnDay] = useState([]);
    const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(moment().format().substring(0,10));  

    const {isLoading: renderingCalendar } = useQuery({ queryKey: ["calendarProcess"], queryFn: async () => {return await processAppointments()} });

    async function processAppointments(incomingAppointments){
        let apps = [];
        let appsIn = incomingAppointments ? incomingAppointments : [...appointments];
        appsIn.forEach(element => {
            apps.push({
                id: element.appointment_id,
                Event_Title: element.appointmentDetails,
                Event_Date: element.appointment_date,
                Priority: element.status == 'requested' ? 2 : element.status == 'rejected' ? 1 : 3
            });
        });

        console.log('appsfd', appsIn);
        setAppointmentsOnDay(appsIn.filter(appointment => appointment.appointment_date == selectedAppointmentDate));
        setCalendarAppointments(apps);
        await delay(1000);
        setUpdating(false);
        return 1;
    }

    function returnEvents(day){
        let apps = [...appointments];
        let appsOnDay = [];
        apps.forEach(element => {
            day.Events.forEach(calEvent => {
                if (calEvent.Event_Details.id == element.appointment_id) {
                 appsOnDay.push(element);   
                }
            });
        });

        setSelectedAppointmentDate(day.Date);
        setAppointmentsOnDay(appsOnDay);
    }

    async function updateAppointment(appointment, status){
        let appointmentsDB = fetchFromStorage('appointments');
        appointmentsDB = JSON.parse(appointmentsDB);

        let apps = [...appointmentsDB];

        if (status == 'confirmed' || status == 'rejected') {
            apps.forEach((element) => {
                if (element.appointment_id == appointment.appointment_id) {
                    element.status = status;               
                }
            });

            let myappointments = apps.filter(app => app.artisan.id == signedInUser.id);
            setUpdating(true);
            setAppointments(myappointments);
            saveInStorage('appointments', JSON.stringify(apps));
            showToast('Appointment Status Saved');
            await delay(1000);
            processAppointments(myappointments);
        } 
        else {
            preClose(appointment);
        }

    }

    function preClose(appointment){
        showAlert('Close Appointment', 'Are you sure you want to close this appointment', () => closeAppointment(appointment), 'Yes', 'No');
    }

    function closeAppointment(appointment){
        let appointmentsDB = fetchFromStorage('appointments');
        appointmentsDB = JSON.parse(appointmentsDB);
        let apps = [...appointmentsDB];

        apps.forEach((element, index) => {
            if (element.appointment_id == appointment.appointment_id) {
                apps.splice(index, 1)
            }
        });

        setUpdating(true);
        let myappointments = apps.filter(app => app.artisan.id == signedInUser.id);
        setAppointments(myappointments);
        saveInStorage('appointments', JSON.stringify(apps));
        showToast('Appointment Closed');

        console.log('mine', myappointments);
        processAppointments(myappointments);
    }

    return (
        <>
            <div className="row m-auto mt-5">
                <div className="col-6 m-auto mt-5 text-center">
                    <h1>My Schedule</h1>
                </div>
            </div>

            <div className="row m-auto mt-5 w-100">
                <div className="col-6">
                    { !renderingCalendar && !updating ? <Calender arrayOfEvents={calendarAppointments} returnEvents={returnEvents}/> :
                        <div className="spinner-border text-secondary m-auto d-flex" role="status">
                            <span className="sr-only">Loading Calendar</span>
                        </div>
                    }
                </div>

                <div className="col-6 text-center">
                    <h5 className="mb-3">Appointment(s) on {returnFormattedDate(selectedAppointmentDate, 'MMMM dd, yyyy')}</h5>
                    {
                        !updating && appointmentsOnDay.map((appointment, key) => {
                            return (
                                <div className="row" key={key} style={{border: '2px solid #000', borderRadius: '20px', padding: '20px', width: '80%', marginLeft: 'auto', marginRight:'auto'}}>
                                    <div className="col-3">
                                        <img src={profileImg} style={{width:"50px", borderRadius: '50%'}} />
                                    </div>
                                    <div className="col-9">
                                        <div className="d-flex my-4">
                                            <h6 className="my-auto ms-3">Customer: </h6>
                                            <h6 className="my-auto ms-3">{appointment.customer.username}</h6>
                                        </div>
                                        
                                        <div className="d-flex mb-4">
                                            <h6 className="my-auto ms-3">Details: </h6>
                                            <h6 className="my-auto ms-3">{appointment.appointmentDetails}</h6>
                                        </div>

                                        <div className="d-flex mb-4">
                                            <h6 className="my-auto mx-3">Status: </h6>
                                            {appointment.status == 'requested' && <div className="chip requested">{appointment.status}</div>}
                                            {appointment.status == 'rejected' && <div className="chip rejected">{appointment.status}</div>}
                                            {appointment.status == 'confirmed' && <div className="chip confirmed">{appointment.status}</div>}
                                        </div>

                                        <div className="d-flex mb-4">
                                            {appointment.status == 'requested' && <button onClick={() => updateAppointment(appointment, 'confirmed')} style={{width: "100px"}} className="btn btn-outline-success rounded-pill mt-3 mx-1">Confirm</button>}
                                            {appointment.status == 'requested' && <button onClick={() => updateAppointment(appointment, 'rejected')} style={{width: "100px"}} className="btn btn-outline-danger rounded-pill mt-3 mx-1">Reject</button>}

                                            {/* {appointment.status == 'confirmed' && <button onClick={() => updateAppointment(appointment, 'cancelled')} style={{width: "100px"}} className="btn btn-outline-danger rounded-pill mt-3 mx-1">Cancel</button>} */}
                                            {(appointment.status == 'confirmed' || appointment.status == 'rejected') && <button onClick={() => updateAppointment(appointment, 'closed')} style={{width: "100px"}} className="btn btn-outline-info rounded-pill mt-3 mx-auto">Close</button>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ArtisanDashboard;