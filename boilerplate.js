// Boilerplate: initialize the db
(function () {
  config = {
    locateFile: (filename) =>
      "https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/sql-wasm.wasm",
  };
  initSqlJs(config).then(function (SQL) {
    // TODO: restore the db from localstorage if it exists
    //Create the database
    const db = new SQL.Database();
    // Run a query without reading the results
    db.run("CREATE TABLE todo (todo, count);");

    window.db = db;
  });
})();

function renderTable() {
  // execute select
  const result = db.exec("SELECT * FROM todo");
  // construct table
  let rowString = "";
  result[0].values.forEach((row) => {
    rowString += `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`;
  });

  // render the table
  let tableString = `<tr><th>Task</th><th>Count</th></tr> ${rowString}`;

  // insert the tableString into the table
  document.getElementById("sql-result").innerHTML = tableString;

  // TODO: store the db to localstorage
}