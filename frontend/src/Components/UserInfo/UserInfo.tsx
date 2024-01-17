import './UserInfo.scss'
import avatar from '../../image/avatar.png'
import { useUserStore } from '../../store'
import { Link } from 'react-router-dom'
import useMoney from '../../Hooks/useMoney'

const UserInfo = () => {
	const {user} = useUserStore()
	const giveMoney = useMoney()

	return(
		<div className='UserInfo'>
			<div className="UserInfo__title">
				Биография
			</div>
			<div className="UserInfo__top top">
				<img className="top__avatar" src={avatar} alt="sf" />
				<div className="top__info">
					<div className="top__login">
						{user?.login}
					</div>
					<div className="top__money">
						${user?.balance}
					</div>
				</div>
			</div>
			<div className="UserInfo__data">
				<div className="UserInfo__data-item">
					Арендовано домов: 34
				</div>
				<div className="UserInfo__data-item">
					Сейчас в аренде: 2
				</div>
				<div className="UserInfo__data-item">
					Самая крупная сделка: 12000$
				</div>
				<div className="UserInfo__data-item">
					Всего потрачено: 123341$
				</div>
				<div className="UserInfo__data-item">
					Статус: Уважаемый
				</div>
				<div className="UserInfo__data-item">
					Самая долгая аренда: 324 дня
				</div>
			</div>
			<div className="UserInfo__menu">
			<Link className="UserInfo__menu-button" to="/auth">Выход</Link>
			<Link className="UserInfo__menu-button" to="/">На главную</Link>
			<div className="UserInfo__menu-button"
			onClick={()=>{
				giveMoney(user?.id)
				
			}}
			>Разбогатеть </div>
			</div>
		</div>
)
}
export default UserInfo