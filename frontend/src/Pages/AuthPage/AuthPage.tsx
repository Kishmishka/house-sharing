import { HandySvg } from 'handy-svg'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import Banner from '../../Components/Banner/Banner'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import lock from '../../image/icons/lock.svg'
import loginIcon from '../../image/icons/user.svg'
import openEye from '../../image/icons/openEye.svg'
import closeEye from '../../image/icons/closeEye.svg'
import './AuthPage.scss'
import { useAuthStore, useUserStore } from '../../store'
import useAuth from '../../Hooks/useAuth'
import { useLocation} from 'react-router-dom'

const AuthPage = () => {
	const {showPass, setShowPass} = useAuthStore()
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	const authorization = useAuth()
	
	const location = useLocation();

	const fromLocation = location.state?.from?.pathName || '/'

	return(
		<div className='AuthPage'>
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
							 src={loginIcon}
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
							type={showPass ? "text":"password"} 
							name="login" 
							placeholder='пароль'
							 />
						</div>
						<div className="auth__elem-icon eye"
						onClick={setShowPass}
						>
							<HandySvg
							 src={showPass ? openEye : closeEye}
							 className="phone__icon"
							 width="23"
						 	height="23"
							/>
						</div>
					</div>
						<div className='auth__reg'>
							
						<Link className='auth__reg-link' to="/registration">Создать аккаунт</Link>
							
						</div>
						<div className='auth__buttonContainer'>
							<div 
							onClick={()=>authorization(login,password)}
							className='auth__button'
							>
								войти
							</div>
						</div>
				</div>
			</div>
			
			<Footer/>
		</div>
)
}
export default AuthPage