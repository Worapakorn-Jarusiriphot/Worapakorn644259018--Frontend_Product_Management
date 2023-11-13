import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2'

const ProtectedRouteSearch = ({ children }) => {
    const { user } = useAuthContext();
    if (!user) {
        Swal.fire({
            title: "คุณต้อง Sign In ก่อน",
            text: "คุณต้องทำการ Sign In ก่อนคนถึงจะสามารถใช้งาน Search ได้ ",
            icon: "question"
        });
        return <Navigate to="/signin" />
    }
    return children
}

export default ProtectedRouteSearch;