export const getQuizCorrectSql= 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND grade = 1 AND DATE(created_at) = CURDATE();'

export const getQuizAllSql = 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE();'

export const getUserPointSql = 'SELECT point FROM Userinfo WHERE user_id = ?;'