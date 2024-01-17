import ky from "ky"
import { useNavigate } from 'react-router-dom';

const useRentHouse = (): (idHouse:number, idClient:number | undefined, rentalDuration:string, totalAmount:string)=>void => {
	const navigate = useNavigate()

	async function rentHouse(
		idHouse:number, 
		idClient:number | undefined, 
		rentalDuration:string, 
		totalAmount:string){

		const request = {
			idHouse, 
			idClient,
			rentalDuration,
			totalAmount,
		}

		try{
			const res = await ky.post( process.env.REACT_APP_API_URL + "/rented-houses/create-deal", {json:request}).json()
			console.log(res)
			navigate("/")
		}catch(err){
			console.log(err)
			alert("Ошибка регистрации")
		}
		
	}
	return rentHouse
}
export default useRentHouse