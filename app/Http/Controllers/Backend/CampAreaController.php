<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use DB;
use Response;

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
               if($obj['type'] == 'polygon' || $obj['type'] == 'polyline' ) {
                $item['points'] = json_encode($obj['points']);
               }
               $camp =  DB::table('camp_list')->where('id', $camp_id)->first();
               $obj['camp_id'] = $camp_id;
               $obj['camp_name'] = $camp->name;
               $obj['camp_desc'] = $camp->desc;
               $item['content'] = json_encode($obj);  
               $area_insert = DB::table('camp_area')->insert($item);   
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
}
