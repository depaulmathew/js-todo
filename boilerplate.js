// Boilerplate: initialize the db
(function () {
  config = {
    locateFile: (filename) =>
      "https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/sql-wasm.wasm",
  };
  initSqlJs(config).then(function (SQL) {
    // get db from local storage
    var db = null;
    localforage.getItem("db").then(function (value) {
      if (value) {
        // if db exists, load it
        db = new SQL.Database(value);
      } else {
        // if db doesn't exist, create it
        console.log("Creating db");
        db = new SQL.Database();
        // Run a query without reading the results
        db.run("CREATE TABLE todo (todo, state);");
      }
      window.db = db;
      renderTableData();
    }).catch(function (err) {
      console.log("Error: " + err);
    });
  });
})();

function renderTableData() {
  // execute select
  const result = db.exec("SELECT * FROM todo");
  // construct table
  let rowString = "";
  result[0].values.forEach((row) => {
    rowString += `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`;
  });

  // render the table
  let tableString = `<tr><th>Task</th><th>State</th></tr> ${rowString}`;

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
