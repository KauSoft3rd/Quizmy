// 사용자의 퀴즈북 레벨 조회
export const getUserWorkbookLevel = `SELECT quizbook FROM Useritems WHERE user_id = ?`;

// 사용자의 레벨보다 낮은 모든 퀴즈를 조회
export const getWordsUnderUserLevel = 'SELECT word, content FROM Words WHERE level <= ?';

// 사용자가 시도한 모든 단어의 결과를 출력
export const getUserRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ?';

// Remind를 기반하여 디테일한 정보를 조회
export const getWordInfoSql = 'SELECT word, content FROM Words WHERE words_id = ?';

// 오늘 기준으로 조회 사용자가 시도한 모든 단어의 결과를 출력
export const todayRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE()';