// Boilerplate: initialize the db
(function () {
  config = {
    locateFile: (filename) =>
      "https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/sql-wasm.wasm",
  };
  initSqlJs(config).then(function (SQL) {
    // get db from local storage
    var db = null;
    localforage
      .getItem("db")
      .then(function (value) {
        if (value) {
          // if db exists, load it
          db = new SQL.Database(value);
        } else {
          // if db doesn't exist, create it
          console.log("Creating db");
          db = new SQL.Database();
          // Run a query without reading the results
          db.run(
            "CREATE TABLE todo (todo_id INTEGER PRIMARY KEY, todo TEXT NOT NULL, state TEXT NOT NULL);"
          );
        }
        window.db = db;
        renderTableData();
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  });
})();

function renderTableData() {
  // execute select
  const result = db.exec("SELECT * FROM todo");
  // construct table
  // base case - no data
  console.log(result);
  if (result.length === 0) {
    document.getElementById("sql-result").innerHTML = "";
    return;
  }

  // construct the header
  let headerString = "";
  result[0].columns.forEach((column) => {
    headerString += `<th>${column}</th>`;
  });
  headerString += `<th>Actions</th>`;
  headerString = `<tr>${headerString}</tr>`;

  // construct the rows
  var rows = "";
  result[0].values.forEach((row) => {
    var rowString = "";
    row.forEach((column) => {
      rowString += `<td>${column}</td>`;
    });
    rowString += `<td><button class="btn btn-primary" onclick="deleteTODO(${row[0]})">Delete</button></td>`;
    // rowString += `<td><button class="btn btn-primary">Delete</button></td>`;
    rowString = `<tr>${rowString}</tr>`;
    rows += rowString;
  });

  // render the table
  let tableString = `<table>${headerString}${rows}</table>`;

  // insert the tableString into the table
  document.getElementById("sql-result").innerHTML = tableString;
}

function renderTable() {
  // get the db and store it in local storage
  localforage.setItem("db", db.export()).catch(function (err) {
    if (err) console.log(err);
  });

  renderTableData();
}
