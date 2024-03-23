// 사용자의 북마크 목록 조회
export const getBookmarkList = `SELECT link FROM News WHERE user_id = ?`;

// 사용자의 북마크 목록에 새로운 링크 추가
export const postBookmarkSql = `INSERT INTO News (user_id, link, created_at) VALUES (?, ?, ?)`

// 사용자의 북마크 목록에서 해당 링크를 제거
export const deleteBookmarkSql = ''