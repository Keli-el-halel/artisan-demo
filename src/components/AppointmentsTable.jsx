import { returnFormattedDate, showToast, saveInStorage, fetchFromStorage, showAlert } from '../utils';
import '../App.css';
import { useState } from 'react';

function AppointmentsTable ({signedInUser, artisanSelected}){

    const [appointments, setAppointments] = useState(localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')).filter(appointment => appointment.customer.id == signedInUser.id) : []);    
    const [drpStatus, setDrpStatus] = useState(false);

    function toggleDropdown(appointment){
        let apps = [...appointments];
        apps.forEach(element => {
            if (element.appointment_id == appointment.appointment_id) {
                element.drpStatus = !element.drpStatus;
            }
        });
        setAppointments(apps);
    }


    function preCancelAppointment(appointment, justclose){
        toggleDropdown(appointment);
        if (justclose) {
            cancelAppointment(appointment);
        } else {
            showAlert('Cancel Appointment', 'Are you sure you want to cancel this appointment', () => cancelAppointment(appointment), 'Yes', 'No');            
        }
    }

    function cancelAppointment(appointment){
        let appointmentsDB = fetchFromStorage('appointments');
        appointmentsDB = JSON.parse(appointmentsDB);

        let apps = [...appointmentsDB];
        apps.forEach((element, index) => {
            delete element.drpStatus;
            if (element.appointment_id == appointment.appointment_id) {
                apps.splice(index, 1);
            }
        });

        console.log(apps);
        let myappointments = apps.filter(app => app.customer.id == signedInUser.id);
        setAppointments(myappointments);
        saveInStorage('appointments', JSON.stringify(apps));
    }

    return (
        <>
            <div className="row m-auto">
                <div className="col-6 m-auto mt-3 text-center">
                    <h1>Appointments</h1>
                </div>
            </div>

            <div className="row m-auto mt-3 w-75">
                <table>
                    <thead>
                        <tr style={{backgroundColor: "#000", color: "#fff", height: "40px"}}>
                            <td>ID</td>
                            <td>Date</td>
                            <td>Artisan</td>
                            <td>Details</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((appointment, key) => {
                                return (
                                    <tr key={key} style={{height: "50px"}}>
                                        <td>{appointment.appointment_id}</td>
                                        <td>{returnFormattedDate(appointment.appointment_date, 'MMMM dd, yyyy')}</td>
                                        <td>{appointment.artisan.username}</td>
                                        <td>{appointment.appointmentDetails}</td>
                                        <td>
                                            {appointment.status == 'requested' && <div className="chip requested">{appointment.status}</div>}
                                            {appointment.status == 'rejected' && <div className="chip rejected">{appointment.status}</div>}
                                            {appointment.status == 'confirmed' && <div className="chip confirmed">{appointment.status}</div>}
                                        </td>
                                        <td>
                                            <div className="drp">
                                                <div className={appointment.drpStatus ? "drp-toggle drp-active" : "drp-toggle"} onClick={() => toggleDropdown(appointment)}> <i className='fa fa-bars'></i> </div>
                                                <div className={appointment.drpStatus ? "drp-menu" : "drp-menu-off"} id="drpMenu">
                                                    {appointment.status == 'confirmed' && <div style={{color: "#f54b5e"}} onClick={() => preCancelAppointment(appointment, 'close')}>Close Appointment</div>}
                                                    {(appointment.status == 'rejected' || appointment.status == 'requested') && <div style={{color: "#f54b5e"}} onClick={() => preCancelAppointment(appointment)}>Cancel Appointment</div>}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppointmentsTable;