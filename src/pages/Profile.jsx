import { useAuthContext } from "../context/AuthContext";

const ProFile = () => {
    const { user } = useAuthContext();
    return (
        <div className="container">
            <div className="row">
                    <div
                        className="col-6 card profile my-2 light"
                    >
                        <div className="card-header">Profile</div>
                        <div className="card-body">
                            <div className="card-title h5">{user.username}</div>
                            <div className="card-text">
                                <b>Token:</b>
                                {user.accessToken.substring(0, 20)}...
                                {user.accessToken.substring(user.accessToken.lenght- 20)}
                            </div>

                            <div className="card-text">
                                <b>Id:</b> {user.id}
                                <br />
                                <b>Email:</b> {user.email}
                                <br />
                                <b>Roles:</b> ({user.roles.length})
                                <br />
                                <ul>
                                    {user.roles && user.roles.map((role, index) => <li key={index}>{role}</li>)}
                                </ul>

                            </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}
export default ProFile;
