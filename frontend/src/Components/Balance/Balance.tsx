import { useUserStore } from '../../store'
import './Balance.scss'

const Balance = () => {
	const {user} = useUserStore()
	return(
		<div className='Balance'>
			$ {user?.balance}
		</div>
)
}
export default Balance