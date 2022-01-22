import React from 'react';
import dayjs from "dayjs";

const STATUS = {
  "placed": "Создан",
  "cancelled": "Отменен",
  "pending": "Принят в обработку",
  "delivered": "Завершен"
}


const Orders = ({ orders }) => {
  return (
    <div>
      <h3>Заказы</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Заказ</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(item => {
            const {
              created_at,
              id,
              status,
              total
            } = item
            return (
              <tr key={item.id}>
                <td>{id}</td>
                <td>{dayjs(created_at).format("DD.MM.YYYY")}</td>
                <td>{STATUS[status]}</td>
                <td>{total}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default React.memo(Orders);