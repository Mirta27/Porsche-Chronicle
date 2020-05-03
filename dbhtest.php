<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ajax";

//Connecting to the database with the parameters above
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn -> connect_error) {
        exit("Could not connect.");
    }

//Creating and running the query
$sql = "SELECT Test FROM test_response";
$result = $conn -> query($sql);

//Storing and manipulating the result in an array
$data = array();
while ($row = $result -> fetch_assoc()) {
    $data[] = $row;
}

//Returning the data in JSON-format and closing the connection
echo json_encode($data);

$conn  -> close();

?>