const db = require("../config/db");

class FavoritesRepository {
    getByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM Favorites
         WHERE userId = ?
         ORDER BY createdAt DESC`,
                [userId],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }

    add({ userId, videoId, title, thumbnail }) {
        const createdAt = new Date().toISOString();

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT OR IGNORE INTO Favorites
         (userId, videoId, title, thumbnail, createdAt)
         VALUES (?, ?, ?, ?, ?)`,
                [userId, videoId, title, thumbnail, createdAt],
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }

    remove({ userId, videoId }) {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM Favorites
         WHERE userId = ? AND videoId = ?`,
                [userId, videoId],
                (err) => {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
    }
}

module.exports = new FavoritesRepository();
