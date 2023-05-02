
<?php
	header('Access-Control-Allow-Origin: *');
	$regNo = $_POST['CarReg'];

	
	$pdo = new \PDO("sqlite:DVLA.db");
	
	
	$st = $pdo->query("SELECT * from cars where carReg='".$regNo."'" );
     
    $st->execute();
	$cars = [];
	
	while ($car = $st->fetchObject()) {
		$cars[]=$car;
		
    }
	if(empty($cars)){
		echo json_encode("no cars");
	}
	else
	{
		echo json_encode($cars);
	}
?>