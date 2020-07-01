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
Route::get('/camp_list', 'Backend\CampController@campList');
Route::get('/camp_add', 'Backend\CampController@campAdd');
Route::get('/getcamplist', 'Backend\CampController@getCampList');
Route::post('/addcampajax', 'Backend\CampController@addCampAjax');
Route::get('/editcampajax', 'Backend\CampController@editCampAjax');
Route::get('/delcampajax', 'Backend\CampController@delCampAjax');
Route::get('/camp_area_add', 'Backend\CampAreaController@campAreaAdd');



// Route Dashboards
Route::get('/dashboard-analytics', 'DashboardController@dashboardAnalytics');

