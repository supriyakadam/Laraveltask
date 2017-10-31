<?php namespace App\Http\Controllers;

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
class UploadController extends Controller {
	public function getView()
	{
		return view('file_view');
	}
	public function displayPicture()
	{
		$lastrow=DB::table('files')->select('name')->orderBy('img_id','desc')->first();
		$imagename=($lastrow->name);
		return view('show',['imagename'=>$imagename]);
	}
	public function upload(){
		
		if(empty($_FILES['file_path']['name'])){
			echo "Please select an image file";
		}
		else if($_FILES['file_path']['type']!="image/png" && $_FILES['file_path']['type']!="image/jpeg" && $_FILES['file_path']['type']!="image/gif"){
			echo "The selected file is not an image.";
		}
		else if($_FILES['file_path']['size'] > 1024*500){
			echo "Please select an image of size less than 500kb.";
		}
		else
		{
			$name= $_FILES['file_path']['name'];
			$size= $_FILES['file_path']['size'];
			$temp = $_FILES['file_path']['tmp_name'];
			$uploaddir = 'uploads/';
    		$uploadfile = $uploaddir . basename($_FILES['file_path']['name']);
			$ans = move_uploaded_file($temp, $uploadfile);
			DB::insert('insert into files (name,size) values(?,?)',[$name,$size]);
			return redirect('displayPicture');
	}

}

}

?>