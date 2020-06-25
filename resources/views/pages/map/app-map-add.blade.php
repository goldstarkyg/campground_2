
@extends('layouts/contentLayoutMaster')

@section('title', 'Map Layouts')

@section('content')
<style>
    .form-group {
         margin-bottom: 0.3rem !important;
    }
</style>    
<!-- Basic Vertical form layout section start -->
<section id="basic-vertical-layouts">
  <div class="row match-height">
      <div class="col-md-3 col-12">
          <div class="card">
              <div class="card-header">
                  <h4 class="card-title">Map Inform</h4>
              </div>
              <div class="card-content">
                  <div class="card-body">
                      <form class="form form-vertical">
                          <div class="form-body">
                              <div class="row">
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="name">Name</label>
                                          <input type="text" id="name" class="form-control" name="name" placeholder="Name">
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="street">Street</label>
                                          <input type="text" id="street" class="form-control" name="street" placeholder="Street">
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="direction">Direction</label>
                                          <input type="text" id="direction" class="form-control" name="diection" placeholder="Direction">
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="type">Type</label>
                                          <input type="text" id="type" class="form-control" name="type" >
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="originx">OriginX</label>
                                          <input type="number" id="originx" class="form-control" name="originX" >
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="originy">OriginY</label>
                                          <input type="number" id="originy" class="form-control" name="originy" >
                                      </div>
                                  </div>
                                  <div class="col-6">
                                      <div class="form-group">
                                          <label for="top">Top</label>
                                          <input type="number" id="top" class="form-control" name="top" >
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="form-group">
                                          <label for="left">Left</label>
                                          <input type="number" id="left" class="form-control" name="left" placeholder="Left">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="form-group">
                                          <label for="top">Height</label>
                                          <input type="number" id="height" class="form-control" name="height" placeholder="Height">
                                      </div>
                                  </div>
                                  <div class="col-12">
                                      <div class="form-group">
                                          <label for="top">Width</label>
                                          <input type="number" id="width" class="form-control" name="width" placeholder="Width">
                                      </div>
                                  </div>
                  
                                    <div class="col-12">
                                            <button type="submit" class="btn btn-primary mr-1 mb-1">Create</button>  
                                            <button type="button" id="poly" class="btn btn-outline-warning mr-1 mb-1 pull-right">Drag</button>
                                            <button type="button" id="getdata" onClick="getData()" class="btn btn-outline-warning mr-1 mb-1 pull-right">Data</button>
                                            
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
                  <h4 class="card-title">Map Area</h4>
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

@section('page-script')  
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.2/fabric.min.js">  </script>  -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.4.0/fabric.min.js">  </script> 
  <script src="{{URL::to('/')}}/js/scripts/pages/app_map_add.js"></script>
@endsection

