<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
}
