import React, { FC, useState } from 'react'
import ky from "ky"

const useReg = ():[boolean, (login:string, password:string)=>void] => {
	const [res, setRes] = useState(false);

	async function postAuth(login:string, password:string){
		const request = {login:login, password:password}

		try{
			const res = await ky.post("https://jsonplaceholder.typicode.com/todos", {json:request})
			console.log(res)
		}catch(err){
			console.log(err)
		}
		setRes(true)
	}
	return [res, postAuth]
}
export default useReg