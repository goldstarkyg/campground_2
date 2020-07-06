<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route url
Route::get('/', 'DashboardController@dashboardAnalytics');

// Users Pages
Route::get('/app-user-list', 'UserPagesController@user_list');
Route::get('/app-user-view', 'UserPagesController@user_view');
Route::get('/app-user-edit', 'UserPagesController@user_edit');

// campground pages
Route::get('/camplist', 'Backend\CampController@campList');
Route::get('/campaddname', 'Backend\CampController@campAddName');
Route::get('/camparealist', 'Backend\CampController@campAreaList');

Route::get('/camppropadd', 'Backend\CampPropController@campPropAdd');
Route::get('/campproplist', 'Backend\CampPropController@CampPropList');
Route::post('/addcamppropajax', 'Backend\CampPropController@addCampPropAjax');
Route::get('/editcamppropajax', 'Backend\CampPropController@editCampPropAjax');
Route::get('/delcamppropajax', 'Backend\CampPropController@delCampPropAjax');
Route::get('/getcampproplist', 'Backend\CampPropController@getCampProplist');


Route::get('/getcamplist', 'Backend\CampController@getCampList');
Route::post('/addcampajax', 'Backend\CampController@addCampAjax');
Route::get('/editcampajax', 'Backend\CampController@editCampAjax');
Route::get('/delcampajax', 'Backend\CampController@delCampAjax');

Route::get('/campareaadd', 'Backend\CampAreaController@campAreaAdd');
Route::get('/getcampnamelist', 'Backend\CampAreaController@getCampNameList');
Route::post('/creatcamparea', 'Backend\CampAreaController@creatCampArea');
Route::get('/getcampmap', 'Backend\CampAreaController@getCampMap');
Route::post('/campimageupload', 'Backend\CampAreaController@campImageUpload');





// Route Dashboards
Route::get('/dashboard-analytics', 'DashboardController@dashboardAnalytics');

