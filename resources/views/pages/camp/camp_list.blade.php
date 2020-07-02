
@extends('layouts/contentLayoutMaster')

@section('title', 'Camp list')

@section('vendor-style')
        {{-- vendor css files --}}
        <link rel="stylesheet" href="{{URL::to('/')}}/vendors/css/tables/datatable/datatables.min.css">        
@endsection

@section('page-style')  
    <style>
        #camp_list_filter {
            position: absolute;
            right: 0px;
            top: 0px;
            z-index: 1;
        }
      
        .form-group {
            margin-bottom: 0.1rem !important;
        }
        .desc {
            font-size:12px;
            color:#5353ff;
        }      
    </style>    
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
                          <table id="camp_list" class="table table-striped table-bordered table-hover display scroll-horizontal-vertical" style="padding-top:20px;">
                              <thead>
                                  <tr>                                                           
                                      <th>Camp name</th>
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
  <!--modal start-->
  <div class="modal fade" id="bookingModal" tabindex="-1" role="dialog" aria-labelledby="bookingModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="bookingModalLabel">Booking for test</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Campground name:&nbsp;&nbsp; <span id="camp_name" class="desc">This is campground name</span></label>                
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Campground Description:</label> 
                <p class="desc" id="camp_desc">This is test description for campground</p>                               
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Area name: &nbsp;&nbsp;<span id="area" class="desc">101</span></label>                 
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">User name:</label>
                <input type="text" class="form-control" id="recipient-name">
            </div>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Email:</label>
                <input type="text" class="form-control" id="recipient-name">
            </div>    
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Parking Date:</label>
                <input type="text" class="form-control" id="recipient-name">
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text"></textarea>
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Send message</button>
        </div>
        </div>
    </div>
  </div>
  <!--modal end-->
</section>
<!-- // Basic Vertical form layout section end -->

@endsection

@section('page-script')  
  <script>    
        var token = "{{ csrf_token() }}";
  </script>
  <script src="{{URL::to('/')}}/js/scripts/lib/fabric_1.4.min.js">  </script> 
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

