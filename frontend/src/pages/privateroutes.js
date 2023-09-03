import { Outlet, Navigate} from 'react-router-dom';

function PrivateRoutes(){
    let islogin = localStorage.getItem('userid');
    return(
        islogin ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;