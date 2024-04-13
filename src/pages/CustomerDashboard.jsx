import { useState } from "react";
import ArtisanTable from "../components/ArtisanTable";
import ArtisanProfile from "./ArtisanProfile";
import AppointmentsTable from "../components/AppointmentsTable";

function CustomerDashboard ({signedInUser}){

    const [viewing, setInView] = useState('Table');
    const [artisanInView, setArtisanInView] = useState(null);

    function artisanSelected(artisan){
        console.log('arti', artisan);
        setArtisanInView(artisan);
        setInView('Artisan');
    }

    return (
        <>
            {viewing == 'Artisan' && <button onClick={() => setInView('Table')} className="btn btn-outline-dark rounded-pill mt-3 ms-5"> <i className="fa fa-arrow-left"></i> </button>}

            {viewing !== 'Artisan' && <div className="d-flex justify-content-center gap-2 mt-5">
                <button onClick={() => setInView('Table')} style={{width: "130px"}} className={viewing == 'Table' ? "btn btn-dark rounded-pill mt-3" : "btn btn-outline-dark rounded-pill mt-3"}>Artisans</button>
                <button onClick={() => setInView('Appointments')} style={{width: "130px"}} className={viewing == 'Appointments' ? "btn btn-dark rounded-pill mt-3" : "btn btn-outline-dark rounded-pill mt-3"}>Appointments</button>
            </div>}

            {viewing == 'Appointments' && <AppointmentsTable signedInUser={signedInUser} />}
            {viewing == 'Table' && <ArtisanTable artisanSelected={artisanSelected} />}
            {viewing == 'Artisan' && <ArtisanProfile signedInUser={signedInUser} artisan={artisanInView} setInView={setInView} />}
        </>
    )
}

export default CustomerDashboard;