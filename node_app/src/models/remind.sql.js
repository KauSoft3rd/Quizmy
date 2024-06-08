// 사용자의 퀴즈북 레벨 조회
export const getUserWorkbookLevelSql = `SELECT quizbook FROM Useritems WHERE user_id = ?`;

// 사용자의 레벨보다 낮은 모든 퀴즈를 조회
export const getWordsUnderUserLevelSql = 'SELECT word, content FROM Words WHERE level <= ?';

// 사용자가 시도한 모든 단어의 결과를 출력
export const getUserRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ?';

// Remind를 기반하여 디테일한 정보를 조회
export const getWordInfoSql = 'SELECT word, content FROM Words WHERE words_id = ?';

// 오늘 기준으로 조회 사용자가 시도한 모든 단어의 결과를 출력
export const todayRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE()';

// 사용자가 시도한 문제를 최신순으로 조회
export const getNewestRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? ORDER BY created_at DESC';



// 오늘 시도한 단어를 최신순으로 조회
export const todayNewestRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE()';
// 누적 시도한 단어를 최신순으로 조회
export const accNewestRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ?';

// 오늘 시도한 단어중 정답을 조회
export const todayCorrectRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND grade = 1 AND DATE(created_at) = CURDATE()';
// 오늘 시도한 단어중 오답을 조회
export const todayIncorrectRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND grade = 0 AND DATE(created_at) = CURDATE()';

// 누적 시도한 단어중 정답을 조회
export const accCorrectRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND grade = 1';
// 누적 시도한 단어중 오답을 조회
export const accIncorrectRemindListSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND grade = 0';


// 정답률을 반영하여 단어의 레벨을 조정
export const countWords = 'SELECT words_id FROM Remind GROUP BY words_id HAVING COUNT(*) >= 10 AND SUM(CASE WHEN grade = 0 THEN 1 ELSE 0 END) / COUNT(*) >= 0.7';

export const updateWordsLevelSql = ''