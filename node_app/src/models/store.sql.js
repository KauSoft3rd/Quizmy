export const updateUserPointSql = "UPDATE Userinfo SET point = ? WHERE user_id = ?;"

export const getAllItemSql = 'SELECT * FROM Useritems WHERE user_id = ?;'

export const getItemSql = 'SELECT ?? FROM Useritems WHERE user_id = ?;'

export const updateUserItemtSql = 'UPDATE Useritems SET ?? = ?  WHERE user_id = ?'

export const getUserPointSql = 'SELECT point FROM Userinfo WHERE user_id = ?;'

export const getTicketSql = 'SELECT ticket FROM Useritems WHERE user_id = ?;'

export const getQuizbookSql = 'SELECT quizbook FROM Useritems WHERE user_id = ?;'

export const purchaseQuizbookSql = 'UPDATE Useritems SET quizbook = quizbook + 1 WHERE user_id = ?;'

export const updateticketColorSql = 'UPDATE Userinfo SET color = ? WHERE user_id = ?;'

export const getticketColorSql = 'SELECT color FROM Userinfo WHERE user_id = ?;'