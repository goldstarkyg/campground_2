<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Yajra\DataTables\DataTables;

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

    public function campAddName(){
        $breadcrumbs = [
            ['link'=>"dashboard-analytics",'name'=>"Home"], ['link'=>"dashboard-analytics",'name'=>"Pages"], ['name'=>"Camp Add"]
        ];
        return view('/pages/camp/camp_add', [
            'breadcrumbs' => $breadcrumbs
        ]);
    }

    public function getCampList(Request $request) {        
        $ret = array();
        $camp_list = DB::table('camp_list')->orderby('id', 'asc')->get();
        // $ret['data'] = $camp_list;
        // return Response::json($ret);
        // $users = User::get(['id', 'first_name', 'last_name', 'email', 'active','created_at']);

        return DataTables::of($camp_list)
            // ->editColumn('created_at',function(User $user) {
            //     return $user->created_at->diffForHumans();
            // })
            // ->addColumn('role',function($user){                
            //      $role = DB::table('roles as ro')->leftjoin('role_users as ru','ru.role_id','=', 'ro.id')
            //                     ->where('ru.user_id',$user->id)
            //                     ->select(['ro.*'])
            //                     ->first();
            //     if($role){
            //         return $role->name;
            //     }else {   
            //         return '';
            //     }
            // })
            ->editColumn('desc',function($camp) {
                $desc = $camp->desc;
                if(strlen($desc) > 70) $desc = substr($desc , 0, 70).'...';
                return $desc;
            })
            ->addColumn('status',function($camp){                                
                $active = 'Activated';
                if($camp->status == '0') $active = 'Inactivated';
                return $active;                  
            })
            ->addColumn('actions',function($camp) {
                $actions = '<a href="#" onClick="campEdit('.$camp->id.')" data-toggle="tooltip" data-placement="top" title="Edit Camp" ><i class="fa fa-pencil text-success"></i></a>&nbsp; &nbsp;
                            <a href="#" onClick="campDel('.$camp->id.')" data-toggle="tooltip" data-placement="top" title="Delete Camp"><i class="fa fa-trash text-warning"></i></a>&nbsp; &nbsp;';
                // if ((Sentinel::getUser()->id != $user->id) && ($user->id != 1)) {
                //     $actions .= '<a href='. route('users.confirm-delete', $user->id) .' data-id="'.$user->id.'" data-toggle="modal" data-target="#delete_confirm"><i class="fa fa-trash text-danger"></i></a>';
                // }
                return $actions;
            })
            ->rawColumns(['status','actions'])
            ->make(true);
    }

    public function addCampAjax(Request $request) {
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

    public function editCampAjax(Request $request) {
        $id = $request->get('id');
        $camp = DB::table('camp_list')->where('id', $id)->first();
        $ret = array();
        $ret['camp']= $camp;         
        return Response::json($ret) ;        
    }

    public function delCampAjax(Request $request ) {
        $id = $request->get('id');
        $camp = DB::table('camp_list')->where('id', $id)->delete();
        $ret = array();
        $ret['code']= '200';         
        return Response::json($ret) ;        
    }

    public function campAreaList() {
        $camp_list = DB::table('camp_list')                        
                        ->select(['id', 'name'])
                        ->get();
        return DataTables::of($camp_list)  
            ->editColumn('name',function($camp) {
                $name = '<a href="#" onClick="campMap('.$camp->id.')" data-toggle="tooltip" data-placement="top" >'.$camp->name.'</a>';
                return $name;
            })          
            ->addColumn('actions',function($camp) {
                $actions = '<a href="#" onClick="campMap('.$camp->id.')" data-toggle="tooltip" data-placement="top"  ><i class="fa fa-eye text-success"></i></a>';
                return $actions;
            })
            ->rawColumns(['name','actions'])
            ->make(true);
    }

}
