import React, {useState} from 'react';
import './orderCar.css';
import { useStoreon } from 'storeon/react';

 const OrderCar = (enabled, addOrder) => {
	const [styleCar, setStyleCar] = useState('orderCar disable');
	const { orderFunc, dispatch } = useStoreon('orderFunc');
	const [ clickCar, setClickCar ] = useState(enabled.enabled)
		const lifehack = () =>{

			setStyleCar('orderCar animate');
			//return addOrder;
			setClickCar(enabled.enabled) 
			dispatch('orderFunc/state', true);
		}

    return(
		<div className="oderMain">
			<button 
				className={styleCar}
				disabled={clickCar} 
				onClick={()=>{return lifehack()}}
			>
				<span className="default">{!enabled.enabled ?"Оформить заказ":"оформить заказ"}</span>
				<span className="success">Заказ принят в работу
					<svg viewBox="0 0 12 10">
						<polyline points="1.5 6 4.5 9 10.5 1"></polyline>
					</svg>
				</span>
				<div className="box"></div>
				<div className="truck">
				<div className="back"></div>
				<div className="front">
					<div className="window"></div>
				</div>
				<div className="light top"></div>
				<div className="light bottom"></div>
				</div>
				<div className="lines"></div>
			</button>
		</div>
    )
}

export default React.memo(OrderCar);