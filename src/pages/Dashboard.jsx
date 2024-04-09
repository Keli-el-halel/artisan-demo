
function Dashboard (){
    return (
        <div className="row m-auto mt-5">
            <div className="col-6 m-auto mt-5 text-center">
                <h1 style={{color: "green"}}>Logged In As {JSON.parse(localStorage.getItem('user')).username}</h1>
            </div>
        </div>
    )
}

export default Dashboard;