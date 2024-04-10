// 사용자의 Remind 행을 모두 조회
export const getUserRemindWordsIdSql = 'SELECT words_id FROM Remind WHERE user_id = ? AND grade = 1';

// 사용자의 퀴즈북 레밸보다 낮은 모든 words_id를 조회
export const getQuizWordsIdSql = 'SELECT words_id FROM Words WHERE level <= ?';

// 랜덤 words_id에 해당하는 단어와 뜻을 조회
export const getRandomQuizSql = 'SELECT words_id, word, content FROM Words WHERE words_id = ?';

// 단어를 맞춘 경우 grade = 1 update, 단어를 틀린 경우 grade = 0 update
// 단어를 다시 풀면 최신 갱신화 기능 추가 필요
export const updateRemindGradeSql = 'INSERT INTO Remind (user_id, words_id, grade, created_at) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE grade = VALUES(grade), created_at = NOW()';

// 오늘 시도한 퀴즈 단어를 조회
export const getTodayWordsSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ? AND DATE(created_at) = CURDATE()';

// 누적 시도한 퀴즈 단어를 조회
export const getAccWordsSql = 'SELECT words_id, grade FROM Remind WHERE user_id = ?';

// 사용자가 정답을 맞춘 단어를 조회
export const getCorrectWordsSql = 'SELECT words_id FROM Remind WHERE user_id = ? AND grade = 1'

// 사용자가 오답을 맞춘 단어를 조회
export const getIncorrectWordsSql = 'SELECT words_id FROM Remind WHERE user_id = ? AND grade = 0';