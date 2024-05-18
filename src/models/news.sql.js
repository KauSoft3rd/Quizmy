// 사용자의 북마크 목록 조회
export const getBookmarkListSql = 'SELECT link FROM News WHERE user_id = ?';

// 사용자의 스크랩 기사들의 정보 중 title, link, img를 조회
export const getBookmarkData = 'SELECT link, title, img FROM News WHERE user_id = ?';

// 사용자의 북마크 목록에 새로운 링크 추가
export const postBookmarkSql = `INSERT INTO News VALUES (0, ?, ?, ?, ?, now())`;

// 사용자의 북마크 목록에서 해당 링크를 제거
export const deleteBookmarkSql = 'DELETE FROM News WHERE user_id = ? AND link = ?'

// 랜덤 words_id에 해당하는 단어를 조회
export const getRandomKeywordSql = 'SELECT word FROM Words WHERE words_id = ?';

// 사용자가 오늘 풀었던 단어 중 정답 단어를 조회
export const getRemindWordsTodaySql = 'SELECT words_id FROM Remind WHERE user_id = ? AND grade = 1 AND DATE(created_at) = CURDATE()';


// 데이터베이스에 저장된 크롤링 뉴스 정보를 조회
export const getNewsFromDBSql = 'SELECT title, company, newsLink, date, img FROM Crawling';

// 크롤링한 모든 뉴스를 갱신하기 위해 기존 뉴스 정보를 삭제
export const deleteCrawlingSql = 'DELETE FROM Crawling';
// 뉴스를 크롤링하고 해당 정보를 DB에 저장
export const updateCrawlingSql = 'INSERT INTO Crawling (title, company, newsLink, date, img) VALUES (?, ?, ?, ?, ?)';