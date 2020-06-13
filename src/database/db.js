const sqlite3 = require("sqlite3").verbose()

const cursor = new sqlite3.Database("./src/database/database.db");


cursor.serialize(() => {
  cursor.run(`CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    imageurl TEXT,
    address1 TEXT,
    address2 TEXT,
    city TEXT,
    state TEXT,
    items TEXT
  );`)
})
  
function create(info) {
  const insertQuery = `INSERT INTO places (name, imageurl, address1, address2, city, state, items) VALUES (?,?,?,?,?,?,?)`
  const data = [info.name, info.imageurl, info.address1, info.address2, info.city, info.state, info.items]
  //console.log(data)
  function callback(err) {
    if (err) {
      return console.warn(err);
    } else {
      console.log("Cadastrado com sucesso");
      console.log(this);
    }
  }
  cursor.run(insertQuery, data, callback);
}

function read(query='') {
  function callback(err, rows) {
    if (err) {
      console.warn(err);
    } else {
      console.log('Cadastros:');
      console.log(rows);
    }
  }
  if (query === '') {
    cursor.all(`SELECT name, id FROM places`, callback);
  } else {}
}

function deleteById(id) {
  function callback(err) {
    if (err) {
      console.warn(err);
    } else {
      console.log(`Excluido com sucesso id:${id}`);
    }
  }
  cursor.run(`DELETE FROM places WHERE id = (?)`, [id], callback);
}

const colectoria = {
  name: "ReciclaOurinhos",
  imageurl: "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1161&q=80",
  address1: "Rua Jandyra Gomes de Oliveira, Villar Ville",
  address2: "N° 17",
  city: "Ourinhos",
  state: "São Paulo",
  items: "Lâmpadas"
}

//create(colectoria);
//read();
//deleteById(3);
//deleteById(4);
//read();

module.exports = cursor;
