<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = '127.0.0.1';
		private $dbname = 'staff';
		private $user = 'root';
		private $pass = '123';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>
