export const getQuizCorrectSql= 'SELECT COUNT(*) FROM Remind WHERE user_id = ? AND grade = 1';

export const getQuizAllSql = 'SELECT COUNT(*) FROM Remind WHERE user_id = ?';