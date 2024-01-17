import ky from "ky"
import { useNavigate } from 'react-router-dom';
import { useUserStore, IUser  } from '../store';

const useAuth = (): (login:string, password:string)=>void=> {
	const navigate = useNavigate()
	const {setUser} = useUserStore();

	async function authorization(login:string, password:string){

		const request = {login, password}
		try{
			const res:IUser = await ky.post(process.env.REACT_APP_API_URL + "/clients/login", {json:request}).json();
			setUser(res)
			navigate("/")
			
		}catch(err){
			console.log(err);
			alert("Неверный логин или пароль")
		}
		
	}
	return authorization
}
export default useAuth