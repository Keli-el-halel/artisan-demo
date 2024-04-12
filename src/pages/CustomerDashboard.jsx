import { useState } from "react";
import ArtisanTable from "../components/ArtisanTable";
import ArtisanProfile from "./ArtisanProfile";

function CustomerDashboard ({signedInUser}){

    const allUsers = JSON.parse(localStorage.getItem('users')).filter(user => user.user_type == 'Artisan');
    const [viewing, setInView] = useState('Table');
    const [artisanInView, setArtisanInView] = useState(null);

    function artisanSelected(artisan){
        console.log('arti', artisan);
        setArtisanInView(artisan);
        setInView('Artisan');
    }

    return (
        <>
            {viewing == 'Table' && <ArtisanTable artisanSelected={artisanSelected} />}
            {viewing == 'Artisan' && <ArtisanProfile signedInUser={signedInUser} artisan={artisanInView} setInView={setInView} />}
        </>
    )
}

export default CustomerDashboard;