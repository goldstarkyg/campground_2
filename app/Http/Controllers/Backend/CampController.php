<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;

use DB;
use Response;

class CampController extends Controller
{
    
    public function campList(){
      $breadcrumbs = [
          ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Camp List"]
      ];
      return view('/pages/camp/camp_list', [
          'breadcrumbs' => $breadcrumbs
      ]);
    }

    public function campAdd(){
        $breadcrumbs = [
            ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Camp Add"]
        ];
        return view('/pages/camp/camp_add', [
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    public function getCampList(Request $request) {        
        $ret = array();
        $camp_list = \DB::table('camp_list')->get();
        $ret['data'] = $camp_list;
        return Response::json($ret);
    }

}
