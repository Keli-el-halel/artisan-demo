
function ArtisanTable ({artisanSelected}){

    const allUsers = JSON.parse(localStorage.getItem('users')).filter(user => user.user_type == 'Artisan');

    return (
        <>
            <div className="row m-auto mt-5">
                <div className="col-6 m-auto mt-5 text-center">
                    <h1>Artisans</h1>
                </div>
            </div>

            <div className="row m-auto mt-5 w-50">
                <table>
                    <thead>
                        <tr style={{backgroundColor: "#000", color: "#fff", height: "40px"}}>
                            <td>ID</td>
                            <td>Artisan</td>
                            <td>Job</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, key) => {
                                return (
                                    <tr key={key} style={{height: "50px"}}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.job}</td>
                                        <td>
                                            <button onClick={() => artisanSelected(user)} className="btn btn-outline-dark rounded-pill">View Profile</button>
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

export default ArtisanTable;