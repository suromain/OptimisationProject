DROP TABLE IF EXISTS custom_puzzle;

CREATE TABLE custom_puzzle(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    description TEXT, 
    content JSON NOT NULL
)