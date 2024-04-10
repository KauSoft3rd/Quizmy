// 사용자의 북마크 목록 조회
export const getBookmarkListSql = 'SELECT link FROM News WHERE user_id = ?';

// 사용자의 북마크 목록에 새로운 링크 추가
export const postBookmarkSql = `INSERT INTO News VALUES (0, ?, ?, now(), ?)`;

// 사용자의 북마크 목록에서 해당 링크를 제거
export const deleteBookmarkSql = 'DELETE FROM News WHERE user_id = ? AND link = ?'

// 랜덤 words_id에 해당하는 단어를 조회
export const getRandomKeywordSql = 'SELECT word FROM Words WHERE words_id = ?';