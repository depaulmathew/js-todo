function insertTODO() {
  var text = document.getElementById("myInput").value;
  db.run("INSERT INTO todo VALUES (?, ?, ?)", [null, text, "Done"]);

  // Boilerplate: render the table
  renderTable();
}

function deleteTODO(todoID) {
    db.run("DELETE FROM todo WHERE todo_id = ?", [todoID]);
    
    // Boilerplate: render the table
    renderTable();
}

// TODO this is more involved.. e.g. how to update a specific row?
function updateTODO() {
    var text = document.getElementById("myInput").value;
    db.run("UPDATE todo SET state = 'Done' WHERE todo = ?", [text]);
    
    // Boilerplate: render the table
    renderTable();
}