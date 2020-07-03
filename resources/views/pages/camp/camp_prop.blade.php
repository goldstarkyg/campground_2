
@extends('layouts/contentLayoutMaster')

@section('title', 'Camp prop')

@section('vendor-style')
        {{-- vendor css files --}}
        <link rel="stylesheet" href="{{URL::to('/')}}/vendors/css/tables/datatable/datatables.min.css"> 
@endsection
@section('page-style') 
        <link rel="stylesheet" href="{{URL::to('/')}}/js/scripts/lib/spectrum.css">        
        <style>
            .form-group {
                margin-bottom: 1.4rem !important;
            }
            .error {
                color:red;
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
                    Camp Prop
                </h4>
              </div>
              <div class="card-content">
                  <div class="card-body pt-0">
                      <form class="form form-vertical" method="post" id="form" >
                          <div class="form-body">
                              <div class="row">                                  
                                    <div class="col-12 mt-1">
                                      <div class="form-group">
                                          <label for="object_type">Object Type</label>
                                          <div class="controls">
                                            <input type="hidden" id="id" name="id" value='0' />  
                                            <input type="text" id="object_type" class="form-control" name="object_type" placeholder="Object type">
                                          </div>
                                      </div>
                                    </div>
                                    <div class="col-12">
                                      <div class="form-group">
                                          <label for="desc">Drscription</label>
                                          <div class="controls">                                            
                                            <input type="text" id="desc" class="form-control" name="desc" placeholder="Description">    
                                          </div>
                                      </div>
                                    </div>
                                    <div class="col-12">
                                      <div class="form-group">
                                          <label for="color">Color</label>
                                          <div class="controls">                                            
                                            <input type="text" id="color" class="form-control" value="#ecc" name="color">
                                          </div>
                                      </div>
                                    </div>
                                    <div class="col-12">
                                      <div class="form-group">
                                          <label for="name">Can Click</label>
                                          <div class="controls">
                                              <select name="can_flag" id="can_flag" class="form-control">
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                              </select>
                                          </div>
                                      </div>
                                    </div>
                                    <div class="col-12">
                                      <div class="form-group">
                                          <label for="api_link">Api Link</label>
                                          <div class="controls">                                           
                                            <input type="text" id="api_link" class="form-control" name="api_link" value="" placeholder="Api link">
                                          </div>
                                      </div>
                                    </div>
                                    <div class="col-12">
                                      <div class="form-group">
                                          <label for="image_flag">Image/Icon</label>
                                          <div class="controls">
                                              <select name="image_flag" id="image_flag" class="form-control">
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                              </select>
                                          </div>
                                      </div>
                                    </div>
                                    <div class="col-12">
                                      <div class="form-group">
                                          <label for="street_direction_flag">Street/Direction</label>
                                          <div class="controls">
                                              <select name="street_direction_flag" id="street_direction_flag" class="form-control">
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                              </select>
                                          </div>
                                      </div>
                                    </div>
                                    
                                    <div class="col-12 mt-1 mb-1">   
                                        <div class="row">
                                            <div class="col-6 ">   
                                            </div>    
                                            <div class="col-6 ">
                                                <div class="form-group">                                  
                                                    <button type="button" onClick="addCampProp()"  class="btn btn-warning"  title="Create/Update">Create/Update</button>                                              
                                                </div>
                                            </div>                                            
                                        </div>    
                                    </div>                                    
                                </div>                                
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
                    <span>Camp Property List</span>
                </h4>                  
              </div>
              <div class="card-content">
                  <div class="card-body">                    
                    <!--list start-->
                    <section>
                        <div class="row">
                            <div class="col-12">
                                <div class="card">                                    
                                    <div class="card-content">
                                        <div class="card-body card-dashboard">                                            
                                            <div class="table-responsive">
                                                <table id="camp_prop_list" class="table table-striped table-bordered table-hover display scroll-horizontal-vertical">
                                                    <thead>
                                                        <tr>                                                           
                                                            <th>Object Type</th>
                                                            <th>Description</th>
                                                            <th>Color</th>
                                                            <th>Can Click</th>
                                                            <th>Api Link</th>
                                                            <th>Image/Icon</th>
                                                            <th>Street/Direction</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                            <th>Object Type</th>
                                                            <th>Description</th>
                                                            <th>Color</th>
                                                            <th>Can Click</th>
                                                            <th>Api Link</th>
                                                            <th>Image/Icon</th>
                                                            <th>Street/Direction</th>
                                                            <th>Actions</th>
                                                    </tr>
                                                </tfoot>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!--list end-->   
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
<!-- // Basic Vertical form layout section end -->

@endsection
@section('page-script')
    <script>    
        var token = "{{ csrf_token() }}";
    </script>
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/pdfmake.min.js"></script>
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/vfs_fonts.js"></script>    
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/datatables.min.js"></script>
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/datatables.buttons.min.js"></script>
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/buttons.html5.min.js"></script>
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/buttons.print.min.js"></script>
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/buttons.bootstrap.min.js"></script>
    <script src="{{URL::to('/')}}/vendors/js/tables/datatable/datatables.bootstrap4.min.js"></script>   
    <script src="{{URL::to('/')}}/js/scripts/lib/spectrum.js"></script>  
    <script src="{{URL::to('/')}}/js/scripts/pages/camp_prop_add.js"></script>  

@endsection

