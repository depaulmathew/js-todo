function insertTODO() {
  var text = document.getElementById("myInput").value;
  db.run("INSERT INTO todo VALUES (?,?)", [text, 1]);

  // Boilerplate: render the table
  renderTable();
}
