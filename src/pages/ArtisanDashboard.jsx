import { Calender } from "../components/calendar/Calender";

function ArtisanDashboard ({signedInUser}){

    return (
        <>
            <div className="row m-auto mt-5">
                <div className="col-6 m-auto mt-5 text-center">
                    <h1>My Schedule</h1>
                </div>
            </div>

            <div className="row m-auto mt-5 w-100">
                <div className="col-6">
                    <Calender/>
                </div>
                <div className="col-6 text-center">List of items here</div>
            </div>
        </>
    )
}

export default ArtisanDashboard;