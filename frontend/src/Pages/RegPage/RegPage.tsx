import { HandySvg } from 'handy-svg'
import React, {useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Banner from '../../Components/Banner/Banner'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import telephone from '../../image/icons/phone.svg'
import lock from '../../image/icons/lock.svg'
import repeat from '../../image/icons/repeat.svg'
import user from '../../image/icons/user.svg'
import './RegPage.scss'
import useReg from '../../Hooks/useReg'


const RegPage = () => {
	const [login, setLogin] = useState("")
	const [phone, setPhone] = useState("")
	const [password, setPassword] = useState("")
	const [repeatPassword, setRepeatPassword] = useState("")
	const registration = useReg()
	const navigate = useNavigate()
	return(
		<div className='RegPage'>
			<Header>
			</Header>
			<Banner> 
				<div className='Banner__text'>
					Наш дом - ваш дом
				</div>
			</Banner>
			
			<div className='AuthPage__content'>
				<div className='AuthPage__auth auth'>
					<div className="auth__elem">
						<div className="auth__elem-icon">
							<HandySvg
							 src={user}
							 className="phone__icon"
							 width="25"
						 	 height="23"
							/>
						</div>
						<div className="auth__elem-input">
							<input 
							value={login}
							onChange={(event:any)=>{setLogin(event.target.value)}}
							className='auth__iput' 
							type="text" 
							name="login" 
							placeholder='логин'
							/>
						</div>
					</div>
					<div className="auth__elem">
						<div className="auth__elem-icon">
							<HandySvg
							 src={telephone}
							 className="phone__icon"
							 width="25"
						 	height="23"
							/>
						</div>
						<div className="auth__elem-input">
							<input 
							value={phone}
							onChange={(event:any)=>{setPhone(event.target.value)}}
							className='auth__iput' 
							type="text" 
							name="phone"
							placeholder='телефон' 
							/>
						</div>
					</div>
					<div className="auth__elem">
						<div className="auth__elem-icon">
							<HandySvg
							 src={lock}
							 className="phone__icon"
							 width="23"
						 	height="23"
							/>
						</div>
						<div className="auth__elem-input">
							<input 
							value={password}
							onChange={(event:any)=>{setPassword(event.target.value)}}
							className='auth__iput' 
							type="password" 
							name="login" 
							placeholder='пароль'
							 />
						</div>
					</div>
					<div className="auth__elem">
						<div className="auth__elem-icon">
							<HandySvg
							 src={repeat}
							 className="phone__icon"
							 width="23"
						 	height="23"
							/>
						</div>
						<div className="auth__elem-input">
							<input 
							value={repeatPassword}
							onChange={(event:any)=>{setRepeatPassword(event.target.value)}}
							className='auth__iput' 
							type="password" 
							name="login"
							placeholder='еще пароль' 
							 />
						</div>
					</div>
					
						
						<div className='auth__buttonContainer'>
							<div className='auth__button reg'
							onClick={()=>registration(login,password,phone)}
							>
								зарегистрироваться
							</div>
						</div>
				</div>
			</div>
			
			<Footer/>
		</div>
)
}
export default RegPage