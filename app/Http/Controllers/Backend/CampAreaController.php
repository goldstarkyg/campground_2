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
          ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Camp Area"]
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

    public function creatCampArea() {
        $camp = $request->except('_token','id');
        $id = $request->get('id');
        if($id > 0) {
            $camp_update = DB::table('camp_list')->where('id', $id)->update($camp);        
        }else {
            if(!empty($camp)) $camp_insert = DB::table('camp_list')->insert($camp);        
        }
        $ret = array();
        $ret['code']= '200';         
        return Response::json($ret) ;
    }
}
