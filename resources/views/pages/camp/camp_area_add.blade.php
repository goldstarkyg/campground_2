
@extends('layouts/contentLayoutMaster')

@section('title', 'Create Camp Area')
@section('vendor-style')      
    <link rel="stylesheet" href="{{URL::to('/')}}/vendors/css/forms/select/select2.min.css">     
@endsection
@section('page-style')  
    <link rel="stylesheet" href="{{URL::to('/')}}/js/scripts/lib/spectrum.css">       
    <style>
        .form-group {
            margin-bottom: 0.3rem !important;
        }
        .error {
            color:red;
        }
        .select2-container--classic .select2-selection--single, .select2-container--default .select2-selection--single {
            min-height: 38px;
            padding: 5px;
        }
        .select2-container--default .select2-selection--single .select2-selection__arrow {          
            top: 6px;
        }
    </style>    
@endsection


@section('content')
<!-- Basic Vertical form layout section start -->
<section id="basic-vertical-layouts">
  <div class="row match-height">
      <div class="col-md-3 col-12">
          <div class="card" id="camp_card" >
              <div class="card-header">
                <h4 class="card-title">
                    Camp Area Inform
                    <span><button type="button" onClick="clearForm()" class="btn btn-sm btn-primary mr-1" Title="Clear">Clear</button></span>
                </h4>
              </div>
              <div class="card-content">
                  <div class="card-body pt-0">
                      <form class="form form-vertical" method="post" id="form" >
                          <div class="form-body">
                              <div class="row">
                                  <div class="col-12">
                                        <label class="error" ></label>
                                  </div>    
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="name">Camp ID/Name</label>
                                          <div class="controls">
                                            <input type="text" id="name" class="form-control" name="name" placeholder="Name">
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="object_type">Object Type</label>
                                          <div class="controls">                                            
                                            <select class="form-control" id="object_type" name="object_type" >
                                            </select>  
                                            <input type="hidden" name="obj_type_name" id="obj_type_name" />  
                                            <input type="hidden" name="obj_type_desc" id="obj_type_desc" />
                                            <input type="hidden" name="obj_can_flag" id="obj_can_flag" />
                                            <input type="hidden" name="obj_image_flag" id="obj_image_flag" />
                                            <input type="hidden" name="obj_street_direction_flag" id="obj_street_direction_flag" />
                                          </div>  
                                      </div>
                                  </div>
                                  <div class="col-6 obj_api_link">
                                      <div class="form-group">
                                          <label for="api_link">Api get for click</label>
                                          <div class="controls">                                            
                                            <input type="text" id="api_link" class="form-control"  name="api_link" >
                                          </div>  
                                      </div>
                                  </div>
                                  <div class="col-6 obj_image">
                                      <div class="form-group">
                                          <label for="api_link">Image/Icon</label>
                                          <div class="controls">                                            
                                            <input type="text" id="image" class="form-control"  name="image" >
                                          </div>  
                                      </div>
                                  </div>
                                  <div class="col-6 obj_street">
                                      <div class="form-group">
                                          <label for="street">Street</label>
                                          <div class="controls">
                                            <input type="text" id="street" class="form-control"  name="street" >
                                          </div>  
                                      </div>
                                  </div>
                                  <div class="col-6 obj_direction">
                                      <div class="form-group">
                                          <label for="direction">Direction</label>
                                          <div class="controls">
                                            <!-- <input type="text" id="direction" class="form-control"  name="diection" placeholder="Direction"> -->
                                            <select class="form-control" id="direction" name="direction" >
                                                <option value="west">West</option>
                                                <option value="east">East</option>
                                                <option value="south">South</option>
                                                <option value="north">North</option>
                                            </select>    
                                          </div>  
                                      </div>
                                  </div>
                                  
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="type">Type</label>                                         
                                          <select id="type" class="form-control" onChange="changeType()">
                                            <option value="rect" selected >Rect</option>
                                            <option value="polygon" >Polygon</option>
                                            <option value="polyline">Polyline</option>
                                            <!-- <option value="line" >Line</option>
                                            <option value="circle" >Circle</option>
                                            <option value="ellipse" >Ellipse</option> -->
                                          </select>
                                      </div>
                                  </div>
                                 
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="left">Left</label>
                                          <div class="controls">
                                                <input type="number" id="left" class="form-control"  name="left" placeholder="Left">
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="top">Top</label>
                                          <div class="controls">
                                            <input type="number" id="top" class="form-control"  name="top" >
                                          </div>  
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="width">Width</label>
                                          <div class="controls">
                                            <input type="number" id="width" class="form-control"  name="width" placeholder="Width">
                                            <input type="hidden" id="scaleX" value="1" />
                                            <input type="hidden" id="scaleY" value="1" />
                                          </div>  
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="height">Height</label>
                                          <div class="controls">
                                                <input type="number" id="height" class="form-control" name="height" placeholder="Height">
                                          </div>      
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="fill">Fill Color</label>
                                          <div>
                                            <input type="text" id="fill" class="form-control" name="fill" placeholder="Fill">
                                          </div>
                                      </div>
                                  </div>
                                  
                                  <div class="col-12 mb-1" id="points_list" style="display:none">
                                     <div class="row" >
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="fill">
                                                    Points
                                                    <button class="btn btn-sm btn-secondary" type="button"  onClick="addPoints( 0 , 0)"><i class="feather icon-plus-circle"></i>  </button>                                              
                                                </label>                                                
                                            </div>
                                        </div>   
                                      </div>  
                                      <div class="row" id="points_1">
                                        <div class="col-5">
                                                <div class="form-group">                                                      
                                                    <div>                                          
                                                        <input type="number"  class="form-control" name="x[]" placeholder="X" >
                                                    </div>    
                                                </div>
                                        </div>      
                                        <div class="col-7">
                                            <fieldset>                                                
                                                <div class="input-group">                                                                                                        
                                                    <input type="number" class="form-control" name="y[]" placeholder="Y" >
                                                    <div class="input-group-append" id="button-addon2">
                                                        <button class="btn btn-secondary" type="button" onClick="delPoints(1)"><i class="feather icon-minus-circle"></i>  </button>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>                                       
                                      </div>
                                  </div>                                  
                                  
                                    <div class="col-12">   
                                        <div class="row">   
                                            <div class="col-6">                                                
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">                                  
                                                    <button type="button" onClick="createObject()"  class="btn btn-warning pull-right"  title="Create/Update">Add/Update</button>                                              
                                                </div>
                                            </div>
                                            <!--
                                            <div class="col-6">
                                                <div class="form-group">                                  
                                                    <button type="button" id="getdata" onClick="getData()" class="btn btn-warning pull-right" title="Get Data">Get Data</button>
                                                </div>
                                            </div>
                                            -->        
                                        </div>    
                                    </div>                                    
                                </div>
                                <!---->
                                <hr class="my-2" />
                                <div class="row mb-5">                                        
                                    <div class="col-6">                                                                                
                                        <div class="form-group">
                                            <select id="camp_name" name="camp_name" class="select2 form-control">
                                                <!-- <option value="square">Square</option>
                                                <option value="rectangle">Rectangle</option> -->
                                            </select>
                                       </div>                                        
                                    </div>
                                    <div class="col-6">
                                        <button type="button" onClick="CrateCampArea()" class="btn btn-warning pull-right">Add Camp &nbsp;</button>
                                    </div>                                     
                                </div> 
                                <div class="row mb-5"> 
                                    <!--for control height, added -->
                                </div>                                                                          
                                <!---->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
      </div>
      <div class="col-md-9 col-12">
          <div class="card">
              <div class="card-header">
                  <h4 class="card-title">
                    <span>Camp Area</span>
                    <span><button type="button" id="poly" class="btn btn-sm btn-primary mr-1" Title="Drag">Drag</button></span>
                    <span id="area_mes" style="color:#095a2d; display:none"></span>
                  </h4>
                  
              </div>
              <div class="card-content">
                  <div class="card-body">                    
                    <!-- <button id="poly"  title="Draw Polygon" ">Draw Polygon </button> -->
                    <canvas id="canvas-tools" width="900" height="450" style="border:1px solid #dadada;border-radius:5px">               
                    </canvas>
                    <div id="canvas_data">
                    </div>     
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
<!-- // Basic Vertical form layout section end -->

@endsection
@section('vendor-script')
        <script src="{{URL::to('/')}}/vendors/js/forms/select/select2.full.min.js"></script>
@endsection

@section('page-script')  
  <script>    
        var token = "{{ csrf_token() }}";
  </script>
  <script src="{{URL::to('/')}}/js/scripts/lib/fabric_1.4.min.js">  </script> 
  <script src="{{URL::to('/')}}/js/scripts/forms/select/form-select2.js"></script>
  <script src="{{URL::to('/')}}/js/scripts/lib/spectrum.js"></script> 
  <script src="{{URL::to('/')}}/js/scripts/pages/camp_area_add.js"></script>  
  
@endsection

