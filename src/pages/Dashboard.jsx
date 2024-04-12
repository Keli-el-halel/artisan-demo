import ArtisanDashboard from "./ArtisanDashboard";
import CustomerDashboard from "./CustomerDashboard";

function Dashboard (){

    const signedInUser = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            {signedInUser.user_type == 'Customer' ? <CustomerDashboard signedInUser={signedInUser}/> : <ArtisanDashboard signedInUser={signedInUser}/> }
        </>
    )
}

export default Dashboard;