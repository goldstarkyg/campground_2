<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use DB;
use Response;
use DateTime;
use Illuminate\Support\Str;

class CampAreaController extends Controller
{
 
    public function campAreaAdd(){
      $breadcrumbs = [
          ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Camp Area Map"]
      ];
      return view('/pages/camp/camp_area_add', [
          'breadcrumbs' => $breadcrumbs
      ]);
    }

   

    public function getCampNameList() {
        $ret = array();
        $camp_list = DB::table('camp_list')->orderby('name')->get();
        $ret = array();
        $ret['camp_list']= $camp_list;
        $ret['count']= count($camp_list);         
        return Response::json($ret) ;    
    }

    public function creatCampArea(Request $request) {                
        $camp_id = $request->get('camp_id');       
        $data = $request->get('data');
        $area =  DB::table('camp_area')->where('camp_id', $camp_id)->first();
        if(!empty($area)) {
           $area_delete =  DB::table('camp_area')->where('camp_id', $camp_id)->delete();           
        }        
        if(!empty($data)) {
            for($i=0; $i < count($data); $i++) {
               $obj = $data[$i];
               if($obj['type'] == 'group') { 
                    $item = array();
                    $item['camp_id'] = $camp_id;             
                    $item['type'] = $obj['type'];
                    $item['name'] = $obj['name'];
                    $item['street'] = $obj['street'];
                    $item['direction'] = $obj['direction'];
                    $item['left'] = $obj['left'];
                    $item['top'] = $obj['top'];
                    $item['width'] = $obj['width'];
                    $item['height'] = $obj['height'];
                    $item['fill'] = $obj['fill'];
                    //    if($obj['type'] == 'polygon' || $obj['type'] == 'polyline' ) {
                    //     $item['points'] = json_encode($obj['points']);
                    //    }
                    if($obj['objects'][0]['type'] == 'polygon' || $obj['objects'][0]['type'] == 'polyline' ) {
                            $item['points'] = json_encode($obj['objects'][0]['points']);
                    }
                    $camp =  DB::table('camp_list')->where('id', $camp_id)->first();
                    $obj['camp_id'] = $camp_id;
                    $obj['camp_name'] = $camp->name;
                    $obj['camp_desc'] = $camp->desc;
                    $item['content'] = json_encode($obj);  
                    $area_insert = DB::table('camp_area')->insert($item);   
                }               
            }
        }
        $ret = array();
        $ret['code']= '200';         
        return Response::json($ret) ;
    }

    public function getCampMap(Request $request) {
        $camp_id =$request->get('camp_id');
        $items =  DB::table('camp_area')->where('camp_id', $camp_id)->get();
        $ret = array();
        $data = array();
        for($i = 0; $i < count($items) ; $i++) {
            $data[] = json_decode($items[$i]->content);
        }
        $ret['data']= $data;         
        return Response::json($ret) ;
    }

    // public function campImageUpload(Request $request) {
      
    //     $base64_string = $request->get('image','') ;
    //     $old_image = $request->get('old_image','');
       
    //     $date = new DateTime();
    //     $image_name = $date->getTimestamp();
    //     $random = Str::random(2);
    //     $image_name = $image_name.$random;
    //     $data = explode(',', $base64_string);	
    //     $file_types = $data[0];
    //     $file_types_list = explode(';', $file_types);
    //     $file_types_list_ = explode('/', $file_types_list[0]);
    //     $file_type = $file_types_list_[1];
	// 	$image_name = $image_name.'.'.$file_type;
        

    //     $target_dir = public_path()."/uploads/";
    //     if(!file_exists($target_dir)) {
	// 	    mkdir($target_dir, 0777);
    //     }
    //     if($old_image != '') {	
    //         $old_image_path = public_path()."/uploads/".$old_image;
    //         if(file_exists($old_image_path)) {
    //             unlink($old_image_path);
    //         }        
    //     }
	// 	$output_file =  $target_dir . $image_name;
	// 	$ifp = fopen($output_file, "wb");
	
	// 	fwrite($ifp, base64_decode($data[1]));
    //     fclose($ifp);
        
    //     $ret = array();        
    //     $ret['image_name'] = $image_name;
    //     $ret['image_path'] = url('/').'/uploads/'.$image_name;        
	// 	return Response::json($ret) ;			
    // }
}
