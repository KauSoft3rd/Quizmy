export const getQuizCorrectSql= 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND grade = 1 AND DATE(created_at) = CURDATE();'

export const getQuizAllSql = 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE();'

export const getUserLevelSql = 'SELECT level FROM Userinfo WHERE user_id = ?;'

export const updateUserPointSql = 'UPDATE Userinfo SET level = ? WHERE user_id = ?'

export const getUserPointSql = 'SELECT point FROM Userinfo WHERE user_id = ?;'

export const countUserQuizSql = 'SELECT countquiz FROM Userinfo WHERE user_id = ?;'