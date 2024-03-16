import { db } from '../db/db'

export const saveHistory = (history) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO GameHistory (Game, CreationDate) VALUES (?, ?)`,
            [JSON.stringify(history), new Date().toString()],
            (_, { rowsAffected }) => {
                console.log('rowsAffected', rowsAffected)
            },
            (_, error) => {
                console.log('error', error)
            }
        )
    })
}