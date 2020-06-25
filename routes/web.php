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

// map Pages
Route::get('/app-map-list', 'MapPagesController@map_list');
Route::get('/app-map-add', 'MapPagesController@map_add');



// Route Dashboards
Route::get('/dashboard-analytics', 'DashboardController@dashboardAnalytics');

