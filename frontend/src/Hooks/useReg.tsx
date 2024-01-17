import React, { FC, useState } from 'react'
import ky from "ky"
import { useUserStore, IUser } from '../store';
import { useNavigate } from 'react-router-dom';

const useReg = (): (login:string, password:string, phoneNumber:string)=>void => {
	const navigate = useNavigate()
	const {setUser} = useUserStore();

	async function registration(
		login:string, 
		password:string,
		phoneNumber:string){

		const request = {login, password,phoneNumber}

		try{
			const res:IUser = await ky.post( process.env.REACT_APP_API_URL + "/clients/create", {json:request}).json()
			setUser(res)
			navigate("/")
		}catch(err){
			console.log(err)
			alert("Ошибка регистрации")
		}
		
	}
	return registration
}
export default useReg