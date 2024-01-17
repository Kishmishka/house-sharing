import ky from "ky"
import {  IHouseResponseItem, useHouseStore } from '../store';

const useGetHouses = (): ()=>void => {
	const { setHouseList,clearHouseList} = useHouseStore();

	interface IHouseResponse{
		houses:IHouseResponseItem[]
	}
	async function getHouses(){
		try{
			clearHouseList()
			const res:IHouseResponse = await ky.get(process.env.REACT_APP_API_URL + "/houses/free").json()
			console.log(res)
			setHouseList(res.houses)
			
		}catch(err){
			console.log("err")
			console.log(err)
		}
	} 
	return getHouses
}
export default useGetHouses