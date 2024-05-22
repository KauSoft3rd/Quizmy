export const getQuizCorrectSql= 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE() AND grade = 1;'

export const getQuizAllSql = 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE();'

export const getWeeklySql = 'SELECT weekly_percent FROM Userinfo WHERE user_id = ?';

export const updateWeeklySql = 'UPDATE Userinfo SET weekly_percent = ? WHERE user_id = ?';

export const getUserLevelSql = 'SELECT level FROM Userinfo WHERE user_id = ?;'

export const updateUserPointSql = 'UPDATE Userinfo SET point = ? WHERE user_id = ?'

export const getUserPointSql = 'SELECT point FROM Userinfo WHERE user_id = ?;'

export const getUserTodayPointSql = 'SELECT todaypoint FROM Userinfo WHERE user_id = ?;'

export const countUserQuizSql = 'SELECT countquiz FROM Userinfo WHERE user_id = ?;'

export const addCountQuizSql = 'UPDATE Userinfo SET countquiz = countquiz + 1 WHERE user_id = ?'

export const getAllUserIdsSql = 'SELECT user_id FROM User;'

export const getAllUserWeekPercentSql = 'SELECT user_id, weekly_percent, streak_array, todaypoint FROM Userinfo;'

export const insertTodayPercentSql = 'UPDATE Userinfo SET today_percent = ? WHERE user_id = ?;'

export const getTodayQuizDataSql = 'SELECT today_percent FROM Userinfo WHERE user_id = ?;'

export const updatetodayStreakSql = 'UPDATE Userinfo SET streak = ? WHERE user_id = ?;'

export const getTodayStreakSql = 'SELECT streak FROM Userinfo WHERE user_id = ?;'

export const getWeeklyStreakSql = 'SELECT streak_array FROM Userinfo WHERE user_id = ?';

export const updateWeeklyStreakSql = 'UPDATE Userinfo SET streak_array = ? WHERE user_id = ?';

export const addPointSql = 'UPDATE Userinfo SET point = ? WHERE user_id = ?;'

export const addTodayPointSql = 'UPDATE Userinfo SET todaypoint = ? WHERE user_id = ?;'

export const resetTodaySql = 'UPDATE Userinfo SET todaypoint = 0 AND today_percent = 0 AND streak = 0 WHERE user_id = ?;'

export const getQuizLevelSql = 'SELECT level FROM Words WHERE words_id = ?;'

export const resetTicketSql = 'UPDATE Useritems SET ticket = 5 WHERE user_id = ?;'

export const getTicketSql = 'SELECT ticket FROM Useritems WHERE user_id = ?;'