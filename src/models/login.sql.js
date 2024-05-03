import exp from "constants";


// export const insertUserSql = "INSERT INTO User (user_id, tocken, created_at) VALUES (?, ?, ?)";

// export const checkUserSql = 'SELECT 1 FROM User WHERE user_id = ?';

export const insertUserinfoSql= 'INSERT INTO Userinfo (userinfo_id, user_id, point, today_percent, weekly_percent, color, countquiz, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

export const getUserspecSql = 'SELECT * FROM Userinfo WHERE user_id = ?';

export const checkUserSql = 'SELECT * FROM User WHERE user_id = ?';

export const insertUserSql = 'INSERT INTO User (user_id, created_at, kakao_id) VALUES (?, ?, ?)';

export const checkUserIdSql = 'SELECT user_id FROM User WHERE kakao_id = ?'

export const insertUserItemSql = 'INSERT INTO Useritems (useritems_id, user_id, streak, ticket, quizbook) VALUES (?, ?, ?, ?, ?);'