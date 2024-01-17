import ky from "ky"
import { useUserStore,IUser } from '../store';


const useMoney = (): (id:number | undefined)=>void => {
	const {setUser} = useUserStore();
	async function giveMoney(id:number | undefined){
		const request = { id }
		try{
			await ky.put(process.env.REACT_APP_API_URL + "/clients/hesoyam", {json:request}).json()
			const res2:IUser = await ky.get( process.env.REACT_APP_API_URL + `/clients/${id}`).json()
			setUser(res2)
		}catch(err){
			console.log("err")
			console.log(err)
		}
	} 
	return giveMoney
}
export default useMoney