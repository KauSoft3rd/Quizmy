import exp from "constants";


// export const insertUserSql = "INSERT INTO User (user_id, tocken, created_at) VALUES (?, ?, ?)";

// export const checkUserSql = 'SELECT 1 FROM User WHERE user_id = ?';

export const insertUserinfoSql= 'INSERT INTO Userinfo (userinfo_id, user_id, coin, point, today_percent, weekly_percent, color) VALUES (?, ?, ?, ?, ?, ?, ?)'

export const getUserspecSql = 'SELECT * FROM Userinfo WHERE user_id = ?';

export const checkUserSql = 'SELECT user_id, nickname, image FROM User WHERE user_id = ?';

export const insertUserSql = 'INSERT INTO User (user_id, created_at, nickname, image) VALUES (?, ?, ?, ?)';