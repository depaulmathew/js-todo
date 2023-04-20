// initialize the DB
const createQuery = "CREATE TABLE todo (todo_id INTEGER PRIMARY KEY, todo TEXT NOT NULL, state TEXT NOT NULL);";
const insertQuery = "INSERT INTO todo VALUES (?, ?, ?)";
const deleteQuery = "DELETE FROM todo WHERE todo_id = ?";

// initialize the DB
var dbAPI = new DB(createQuery);

function insertTODO() {
  var text = document.getElementById("myInput").value;
  dbAPI.insert(insertQuery, [null, text, "Done"]);

  renderTable();
}

function deleteTODO(todoID) {
    dbAPI.delete(deleteQuery, [todoID]);
    
    renderTable();
}

// TODO this is more involved.. e.g. how to update a specific row?
function updateTODO() {
    var text = document.getElementById("myInput").value;
    dbAPI.run("UPDATE todo SET state = 'Done' WHERE todo = ?", [text]);
    
    renderTable();
}

function renderTable() {
  // execute select
  const result = dbAPI.select("SELECT * FROM todo");
  // construct table
  // base case - no data
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
    rowString = `<tr>${rowString}</tr>`;
    rows += rowString;
  });

  // render the table
  let tableString = `<table>${headerString}${rows}</table>`;

  // insert the tableString into the table
  document.getElementById("sql-result").innerHTML = tableString;
}