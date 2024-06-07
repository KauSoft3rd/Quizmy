export const saveOrderSql = 'INSERT INTO Orders (order_id, user_id, order_status, created_at, code) VALUES (?, ?, ?, ?, ?);'

export const updateOrderStatusSql = 'UPDATE Orders SET order_status = ? WHERE code = ?;'

export const findOrderByIdSql = 'SELECT * FROM Orders WHERE code = ?;'

export const getOrderDetailSql = 'SELECT order_status FROM Orders WHERE code = ?;'