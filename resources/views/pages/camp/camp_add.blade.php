
@extends('layouts/contentLayoutMaster')

@section('title', 'Create Camp')

@section('vendor-style')
        {{-- vendor css files --}}
        <link rel="stylesheet" href="{{URL::to('/')}}/vendors/css/tables/datatable/datatables.min.css">        
@endsection

@section('content')
<!-- Basic Vertical form layout section start -->
<section id="basic-vertical-layouts">
  <div class="row match-height">
      <div class="col-md-3 col-12">
          <div class="card" id="camp_card" >
              <div class="card-header">
                <h4 class="card-title">
                    Camp Inform
                </h4>
              </div>
              <div class="card-content">
                  <div class="card-body pt-0">
                      <form class="form form-vertical" method="post" id="form" >
                          <div class="form-body">
                              <div class="row">                                  
                                    <div class="col-12 mt-1 mb-1">
                                      <div class="form-group">
                                          <label for="name">Camp Name</label>
                                          <div class="controls">
                                            <input type="hidden" id="id" name="id" value='0' />  
                                            <input type="text" id="name" class="form-control" name="name" placeholder="Name">
                                          </div>
                                      </div>
                                    </div>
                                    <div class="col-12 mb-1">
                                      <div class="form-group">
                                          <label for="name">Camp Status</label>
                                          <div class="controls">
                                              <select name="status" id="status" class="form-control">
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                              </select>
                                          </div>
                                      </div>
                                    </div>

                                    <div class="col-12">
                                      <div class="form-group">
                                          <label for="street">Description</label>
                                          <div class="controls">
                                            <textarea id="desc" name="desc" class="form-control" rows="4"  ></textarea>
                                          </div>  
                                      </div>
                                    </div>
                                  
                                    <div class="col-12 mb-1">   
                                        <div class="row">   
                                            <div class="col-6">
                                                <div class="form-group">                                  
                                                    <button type="button" onClick="addCamp()"  class="btn btn-primary"  title="Create/Update">Create/Update</button>                                              
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
                    <span>Camp List</span>
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
                                                <table id="camp_list" class="table table-striped table-bordered table-hover display scroll-horizontal-vertical">
                                                    <thead>
                                                        <tr>                                                           
                                                            <th>Camp name</th>
                                                            <th>Desc</th>
                                                            <th>Staus</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tfoot>
                                                    <tr>
                                                        <th>Camp name</th>
                                                        <th>Desc</th>                                                        
                                                        <th>Status</th>
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
    <!-- <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script> -->
    <script src="{{URL::to('/')}}/js/scripts/pages/camp_add.js"></script>  

@endsection

