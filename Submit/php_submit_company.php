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
          if($error != "Can't create database 'EPCInterviewSurvey'; database exists"){
              echo "Error creating database: " . $connection->error;
          }
        }
      }
      create_database($con);


      $dbname="EPCInterviewSurvey";

      $con = mysqli_connect($host,$username,$password,$dbname);
      //create table, if not created
      function create_table($connection){
        $sql = "CREATE TABLE company (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                question1_ans VARCHAR(100) NOT NULL,
                question2_ans VARCHAR(100) NOT NULL)";
        if ($connection->query($sql) === TRUE) {
            echo "Table company created successfully";
        } else {
          $error = "Table 'company' already exists";
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
          return "Yes";
        }else {
          return "No";
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
          $q1_ans = toStringMultiple($pieces[0]);
          $q2_ans = toString($pieces[1]);//ex: Never
          $result = array($q1_ans,$q2_ans);
          return $result;
      }
      $parsed = parseData($q);
      insertData($con,$parsed);
      function insertData($connection,$datas){
          $question1_ans = $datas[0];
          $question2_ans = $datas[1];
          $sql = "INSERT INTO company (question1_ans, question2_ans)
          VALUES ('$question1_ans','$question2_ans')";
          if (mysqli_query($connection, $sql)) {
              echo "New record created successfully";
          } else {
              echo "Error: " . $sql . "<br>" . mysqli_error($connection);
          }
      }
      mysqli_close($con);
  ?>
