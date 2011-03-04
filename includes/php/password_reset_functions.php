<?php
	function random_password ($numofletters=8)
	{
		$upper_case_letters = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
		$lower_case_letters = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
		$numbers = array (1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
		$symbols = array ('!', '@', '#', '$', '%', '^', '&', '*', '?');

		$useable_symbols = array_merge($upper_case_letters, $lower_case_letters, $numbers, $symbols);

		for ($current_letter = 0; $current_letter < $numofletters; $current_letter++)
		{
			$rand = rand(0, count($useable_symbols)-1); 
			$password = $password.$useable_symbols[$rand]; 
		} 
		return $password;
	}
?>