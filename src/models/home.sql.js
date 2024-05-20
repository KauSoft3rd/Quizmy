export const getSayingContentSql = "SELECT saying_id, content, who FROM Saying WHERE MONTH(`date`) = MONTH(CURDATE()) AND DAY(`date`) = DAY(CURDATE());"
