
@extends('layouts/contentLayoutMaster')

@section('title', 'Camp list')

@section('vendor-style')
        {{-- vendor css files --}}
        <link rel="stylesheet" href="{{URL::to('/')}}/vendors/css/tables/datatable/datatables.min.css">        
@endsection

@section('page-style')  

@endsection

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
                    Camp list
                </h4>
              </div>
              <div class="card-content">
                  <div class="card-body pt-0">                                   
                      <div class="table-responsive">
                          <table id="camp_list" class="table table-striped table-bordered table-hover display scroll-horizontal-vertical">
                              <thead>
                                  <tr>                                                           
                                      <th>Camp</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>                                                                                    
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-md-9 col-12">
          <div class="card">
              <div class="card-header">
                  <h4 class="card-title">
                    <span>Camp Area</span>
                </h4>
                  
              </div>
              <div class="card-content">
                  <div class="card-body">                                        
                    <canvas id="canvas-tools" width="900" height="450" style="border:1px solid #dadada;border-radius:5px">               
                    </canvas>                      
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.4.0/fabric.min.js">  </script> 
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/pdfmake.min.js"></script>
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/vfs_fonts.js"></script>    
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/datatables.min.js"></script>
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/datatables.buttons.min.js"></script>
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/buttons.html5.min.js"></script>
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/buttons.print.min.js"></script>
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/buttons.bootstrap.min.js"></script>
  <script src="{{URL::to('/')}}/vendors/js/tables/datatable/datatables.bootstrap4.min.js"></script>
  <script src="{{URL::to('/')}}/js/scripts/pages/camp_list.js"></script>  
  
@endsection

