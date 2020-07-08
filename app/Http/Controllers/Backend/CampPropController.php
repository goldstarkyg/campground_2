<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Yajra\DataTables\DataTables;

use DB;
use Response;

class CampPropController extends Controller
{
    
    public function campPropAdd(){
        $breadcrumbs = [
            ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Camp Prop"]
        ];
        return view('/pages/camp/camp_prop', [
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    public function addCampPropAjax(Request $request) {        
        $camp = $request->except('_token','id', 'image');
        $object_slug = $request->get('object_slug');
       
        $base64_string = $request->get('image','') ;
        $image_path = "";
        $image_name = "";
        if($base64_string !='') {                       
            $data = explode(',', $base64_string);	
            $file_types = $data[0];
            $file_types_list = explode(';', $file_types);
            $file_types_list_ = explode('/', $file_types_list[0]);
            $file_type = $file_types_list_[1];
		    $image_name = $object_slug.'.'.$file_type;
        

            $target_dir = public_path()."/uploads/";
            if(!file_exists($target_dir)) {
                mkdir($target_dir, 0777);
            }

            //same slug delete
            $old_image_path = public_path()."/uploads/".$image_name;
            if(file_exists($old_image_path)) {
                unlink($old_image_path);
            } 

            //delete in case update
            $id = $request->get('id');
            if($id > 0) {
                $cam = DB::table('camp_prop')->where('id', $id)->first();
                $old_name = $cam->image_name;
                if(!empty($old_name)) {
                    $old_path = public_path()."/uploads/".$old_name;
                    if(file_exists($old_path)) {
                        unlink($old_path);
                    }          
                }
            }
       
            $output_file =  $target_dir . $image_name;
            $ifp = fopen($output_file, "wb");
	
            fwrite($ifp, base64_decode($data[1]));
            fclose($ifp);
            $image_path = url('/').'/uploads/'.$image_name;        
        }
        $camp['image_path'] = $image_path;
        $camp['image_name'] = $image_name;

        $id = $request->get('id');
        if($id > 0) {            
            $camp_update = DB::table('camp_prop')->where('id', $id)->update($camp);        
        }else {
            if(!empty($camp)) $camp_insert = DB::table('camp_prop')->insert($camp);        
        }
        $ret = array();
        $ret['code']= '200';         
        return Response::json($ret) ;
    }

    public function editCampPropAjax(Request $request) {
        $id = $request->get('id');
        $camp = DB::table('camp_prop')->where('id', $id)->first();
        $ret = array();
        $ret['camp']= $camp;         
        return Response::json($ret) ;        
    }

    public function delCampPropAjax(Request $request ) {
        $id = $request->get('id');
        
        $camp = DB::table('camp_prop')->where('id', $id)->first();
        $old_name = $camp->image_name;
        $old_path = public_path()."/uploads/".$old_name;
        if(!empty($old_name)) {
            if(file_exists($old_path)) {
                unlink($old_path);
            }     
        }
        $camp = DB::table('camp_prop')->where('id', $id)->delete();
        $ret = array();
        $ret['code']= '200';         
        return Response::json($ret) ;        
    }

    public function campPropList() {
        $camp_prop_list = DB::table('camp_prop')                        
                        ->select(['id', 'object_type', 'desc', 'color', 'can_flag','api_link' ,'image_flag', 'street_direction_flag'])
                        ->get();
        return DataTables::of($camp_prop_list)    
            ->editColumn('color',function($camp) {
                $color = $camp->color;
                $color = '<div style="width:30px;height:20px; background-color:'.$color.'">&nbsp;</div>';
                return $color;
            })            
            ->editColumn('can_flag',function($camp) {
                $can_flag = $camp->can_flag;
                if($can_flag == '1') $can_flag = 'Yes';
                if($can_flag == '0') $can_flag = 'No';
                return $can_flag;
            })
            ->editColumn('image_flag',function($camp) {
                $image_flag = $camp->image_flag;
                if($image_flag == '1') $image_flag = 'Yes';
                if($image_flag == '0') $image_flag = 'No';
                return $image_flag;
            })
            ->editColumn('image_path',function($camp) {
                $image_path = $camp->image_path;
            })
            ->editColumn('street_direction_flag',function($camp) {
                $street_direction_flag = $camp->street_direction_flag;
                if($street_direction_flag == '1') $street_direction_flag = 'Yes';
                if($street_direction_flag == '0') $street_direction_flag = 'No';
                return $street_direction_flag;
            })                    
            ->addColumn('actions',function($camp) {
                $actions = '<a href="#" onClick="campPropEdit('.$camp->id.')" data-toggle="tooltip" data-placement="top" title="Edit" ><i class="fa fa-pencil text-success"></i></a>&nbsp; &nbsp;
                            <a href="#" onClick="campPropDel('.$camp->id.')" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash text-warning"></i></a>&nbsp; &nbsp;';
                
                return $actions;
            })
            ->rawColumns(['color','actions'])
            ->make(true);
    }

    public function getCampProplist() {
        $camp_prop_list = DB::table('camp_prop')->get();
        $ret = array();
        $ret['data'] = $camp_prop_list;
        $ret['count'] = count($camp_prop_list);
        return Response::json($ret) ; 
    }

}
