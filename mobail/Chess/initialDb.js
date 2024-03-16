import { db } from "./shared/db/db";

db.transaction(tx => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS GameHistory ("
    + "ID INTEGER PRIMARY KEY AUTOINCREMENT, "
    + "Game JSON, "
    + "CreationDate DATE);",
    [],
    () => { console.log('Table created successfully.'); },
    error => { console.log('Failed to create table.', error); }
  )
})