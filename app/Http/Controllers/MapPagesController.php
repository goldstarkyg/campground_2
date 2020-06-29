<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapPagesController extends Controller
{
    // User List Page
    public function map_list(){
      $breadcrumbs = [
          ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Map List"]
      ];
      return view('/pages/map/app-map-list', [
          'breadcrumbs' => $breadcrumbs
      ]);
    }

    // User View Page
    public function map_add(){
      $breadcrumbs = [
          ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Camp Add"]
      ];
      return view('/pages/map/app-map-add', [
          'breadcrumbs' => $breadcrumbs
      ]);
    }

}
