import { useState } from 'react';
import profileImg from '../assets/profile.png'
import { Calender } from '../components/calendar/Calender';
import { returnFormattedDate, showToast, saveInStorage, fetchFromStorage } from '../utils';

function ArtisanProfile ({signedInUser, artisan, setInView}){

    const [selectedDate, setSelectedDate] = useState('None');
    const [appointmentDetails, setAppointmentDetails] = useState('');
    const [selectedDateFormatted, setSelectedDateFormatted] = useState(null);

    function setAppointmentDate(returnedDayAndEvents){
        console.log(returnedDayAndEvents);
        if (returnedDayAndEvents.Events.length) {
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
            <div className="row m-auto mt-5">
                <div className="col-6 m-auto mt-5 text-center">
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

                <Calender returnEvents={setAppointmentDate}/>


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