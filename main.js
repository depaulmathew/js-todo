function insertTODO() {
  var text = document.getElementById("myInput").value;
  db.run("INSERT INTO todo VALUES (?,?)", [text, "Done"]);

  // Boilerplate: render the table
  renderTable();
}
