export const getQuizCorrectSql= 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE();'

export const getQuizAllSql = 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE();'

export const getWeeklySql = 'SELECT weekly_percent FROM Userinfo WHERE user_id = ?';

export const updateWeeklySql = 'UPDATE Userinfo SET weekly_percent = ? WHERE user_id = ?';

export const getUserLevelSql = 'SELECT level FROM Userinfo WHERE user_id = ?;'

export const updateUserPointSql = 'UPDATE Userinfo SET level = ? WHERE user_id = ?'

export const getUserPointSql = 'SELECT point FROM Userinfo WHERE user_id = ?;'

export const countUserQuizSql = 'SELECT countquiz FROM Userinfo WHERE user_id = ?;'

export const addCountQuizSql = 'UPDATE Userinfo SET countquiz = countquiz + 1 WHERE user_id = ?'

export const getAllUserIdsSql = 'SELECT user_id FROM User;'

export const getAllUserWeekPercentSql = 'SELECT user_id, weekly_percent FROM Userinfo;'