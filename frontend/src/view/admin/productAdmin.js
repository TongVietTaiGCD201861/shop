import { useSelector } from "react-redux";
import AdminHeader from "./headerAdmin";

export default function ProductAdmin() {

    const role = useSelector(state => state.user.role);
    return (
        <>
            <AdminHeader />

            {role === 1 ? (
               <div style={{ width: '70%', marginLeft: '15%' }}>
               <h1 className="title-admin">Products Management</h1>
           </div>
            ) : (
                <h1>You have no authority</h1>
            )}
        </>
    );
}