

export const insertUserSql = "INSERT INTO User (user_id, tocken, created_at) VALUES (?, ?, ?)";

export const checkUserSql = 'SELECT 1 FROM User WHERE user_id = ?';

export const updateAccessTokenSql = 'UPDATE User SET tocken = ?, created_at = NOW() WHERE user_id = ?';
