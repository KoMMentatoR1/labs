import { db } from '../db/db'

export const getHistories = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM GameHistory`,
                [],
                (_, { rows }) => {
                    let data = [];
                    for (let i = 0; i < rows.length; i++) {
                        let item = rows.item(i);;
                        item.Game = JSON.parse(item.Game);
                        item.CreationDate = new Date(item.CreationDate);
                        data.push(item);
                    }
                    resolve(data);
                },
                (_, error) => {
                    console.log('error', error);
                    reject(error);
                }
            )
        })
    });
}