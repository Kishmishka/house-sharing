import {FC} from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useUserStore } from '../../store';

interface RequireAuthProps{
	children: any;
}
const RequireAuth:FC<RequireAuthProps> = ({children}) => {
	const {user} = useUserStore()
	const location = useLocation();
	const auth = false;

	if(!user){
		return <Navigate to="/auth" state={{from: location}}/>
	}

	return children;

}
export default RequireAuth