<?php
  $username = 'michaelwu';
  $password = '123456';
  $host = 'localhost';
  $con = mysqli_connect($host,$username,$password);
  if(!$con){
    die("Connection Failed: " . mysqli_error());
  }
  //create data base, if not created
  function create_database($connection){
    $sql = "CREATE DATABASE EPCInterviewSurvey";
    if ($connection->query($sql) === TRUE) {
        echo "Database created successfully";
    } else {
      $error = $connection->error;
      if($error != "Can't create database 'employee'; database exists"){
          echo "Error creating database: " . $connection->error;
      }
    }
  }
  create_database($con);


  $dbname="EPCInterviewSurvey";

  $con = mysqli_connect($host,$username,$password,$dbname);
  //create table, if not created
  function create_table($connection){
    $sql = "CREATE TABLE employee (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            question1_ans VARCHAR(100) NOT NULL,
            question2_ans VARCHAR(100) NOT NULL,
            question3_ans VARCHAR(100) NOT NULL,
            question4_ans VARCHAR(100) NOT NULL)";
    if ($connection->query($sql) === TRUE) {
        echo "Table employee created successfully";
    } else {
      $error = "Table 'employee' already exists";
      if($connection->error != $error){
        echo "Error creating table: " . $connection->error;
      }
    }
  }
  create_table($con);

  $q = $_REQUEST["q"];
  function toString($string){
    $num = explode("-",$string)[1];
    if($num == 1){
      return "Never";
    }elseif ($num == 2) {
      return "Seldom";
    }elseif ($num == 3) {
      return "About half the time";
    }elseif ($num == 4) {
      return "Usually";
    }else{
      return "Always";
    }
  }
  function toStringNum($num){
    if ($num == 1) {
      return "individually";
    }
    elseif ($num == 2) {
      return "in the company of fellow candidates";
    }
    else{
      return "in the company of potential teammates";
    }
  }
  function toStringMultiple($string){
    $multiple_nums = explode("-",$string)[1];#ex: 2,3
    $multiple_nums = explode(",",$multiple_nums);
    $result = array();
    for($x = 0; $x < sizeof($multiple_nums); $x ++){
        if ($x != sizeof($multiple_nums)-1){
          $string = toStringNum($multiple_nums[$x]) . " | ";
        }
        else{
          $string = toStringNum($multiple_nums[$x]);
        }
        array_push($result,$string);
    }
    return implode($result);
  }
  function parseData($received){
      $pieces = explode("*,",$received);//ex:q1-1 or q4-2,3
      $q1_ans = toString($pieces[0]);//ex: Never
      $q2_ans = toString($pieces[1]);
      $q3_ans = toString($pieces[2]);
      $q4_ans = toStringMultiple($pieces[3]);
      $result = array($q1_ans,$q2_ans,$q3_ans,$q4_ans);
      return $result;
  }
  $parsed = parseData($q);
  insertData($con,$parsed);
  function insertData($connection,$datas){
      $question1_ans = $datas[0];
      $question2_ans = $datas[1];
      $question3_ans = $datas[2];
      $question4_ans = $datas[3];
      $sql = "INSERT INTO employee (question1_ans, question2_ans, question3_ans, question4_ans)
      VALUES ('$question1_ans','$question2_ans','$question3_ans','$question4_ans')";
      if (mysqli_query($connection, $sql)) {
          echo "New record created successfully";
      } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($connection);
      }
  }
  mysqli_close($con);
?>
