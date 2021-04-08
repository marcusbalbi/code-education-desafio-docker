const express = require("express");
const mysql = require("mysql2");
const conn = mysql.createConnection("mysql://root:root@db:3306/desafio_node");
conn.execute(
  `CREATE TABLE IF NOT EXISTS PEOPLE(
  id int AUTO_INCREMENT PRIMARY KEY,
  name varchar(100) NOT NULL
);`,
  (err) => {
    if (err) {
      console.log(`Falha ao criar tabela de Pessoa: ${err.message}`);
      process.exit(1);
    }
  }
);
const app = express();

app.use((req, res, next) => {
  console.log("Requested URL: ", req.url);
  next();
});

app.get("/", (req, res) => {
  conn.execute(
    `INSERT INTO PEOPLE(id, name) VALUES(null, ?)`,
    [req.query.nome || "Marcus Balbi"],
    (err) => {
      if (err) {
        console.log(
          `Falha ao Inserir pessoa no Banco de dados: ${err.message}`
        );
        res.send("Falha ao Inserir pessoa no Banco de dados!");
        return;
      }
      conn.query(
        `SELECT * FROM PEOPLE`,
        (err, data) => {
          if (err) {
            console.log(
              `Falha ao Obter pessoa no Banco de dados: ${err.message}`
            );
            res.send("Falha ao Obter pessoa no Banco de dados!");
            return;
          }
          const renderName = person => `<li>${person.name}</li>`
          res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>
              ${data.map(renderName).join("")}
            </ul>
          `);
        }
      );
    }
  );
});

app.get("/api/todos", (req, res) => {
  conn.query(`SELECT * FROM PEOPLE`, (err, data) => {
    if (err) {
      console.log(`Falha ao Obter pessoa no Banco de dados: ${err.message}`);
      res.json({ message: "Falha ao Obter pessoas no Banco de dados!" });
      return;
    }
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log("rodando na porta 3000");
});
