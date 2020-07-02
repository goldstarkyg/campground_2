var roof = null;
var roofPoints = [];
var lines = [];
var lineCounter = 0;
var drawingObject = {};
drawingObject.type = "";
drawingObject.background = "";
drawingObject.border = "";

function Point(x, y) {
    this.x = x;
    this.y = y;
}


$("#poly").click(function () {
    if (drawingObject.type == "roof") {
        drawingObject.type = "";
        lines.forEach(function(value, index, ar){
             canvas.remove(value);
        });
        //canvas.remove(lines[lineCounter - 1]);
        roof = makeRoof(roofPoints);
        canvas.add(roof);
        canvas.renderAll();
    } else {
        drawingObject.type = "roof"; // roof type
    }
});


// canvas Drawing
var canvas = new fabric.Canvas('canvas-tools');
var x = 0;
var y = 0;

fabric.util.addListener(window,'dblclick', function(){ 
        drawingObject.type = "";
        lines.forEach(function(value, index, ar){
             canvas.remove(value);
        });
        //canvas.remove(lines[lineCounter - 1]);
        roof = makeRoof(roofPoints);
        canvas.add(roof);
        canvas.renderAll();
  
    console.log("double click");
    //clear arrays
     roofPoints = [];
     lines = [];
     lineCounter = 0;
    
});

canvas.on('mouse:down', function (options) {
    if (drawingObject.type == "roof") {
        canvas.selection = false;
        setStartingPoint(options); // set x,y
        roofPoints.push(new Point(x, y));
        var points = [x, y, x, y];
        lines.push(new fabric.Line(points, {
            strokeWidth: 3,
            selectable: false,
            stroke: 'red'
        }).setOriginX(x).setOriginY(y));
        canvas.add(lines[lineCounter]);
        lineCounter++;
        canvas.on('mouse:up', function (options) {
            canvas.selection = true;
        });
    }
});
canvas.on('mouse:move', function (options) {
    if (lines[0] !== null && lines[0] !== undefined && drawingObject.type == "roof") {
        setStartingPoint(options);
        lines[lineCounter - 1].set({
            x2: x,
            y2: y
        });
        canvas.renderAll();
    }
});

function setStartingPoint(options) {
    var offset = $('#canvas-tools').offset();
    x = options.e.pageX - offset.left;
    y = options.e.pageY - offset.top;
}

function makeRoof(roofPoints) {

    var left = findLeftPaddingForRoof(roofPoints);
    var top = findTopPaddingForRoof(roofPoints);
    roofPoints.push(new Point(roofPoints[0].x,roofPoints[0].y))
    var roof = new fabric.Polyline(roofPoints, {
    fill: 'rgba(0,0,0,0)',
    stroke:'#58c'
    });
    roof.set({
        
        left: left,
        top: top,
       
    });


    return roof;
}

function findTopPaddingForRoof(roofPoints) {
    var result = 999999;
    for (var f = 0; f < lineCounter; f++) {
        if (roofPoints[f].y < result) {
            result = roofPoints[f].y;
        }
    }
    return Math.abs(result);
}

function findLeftPaddingForRoof(roofPoints) {
    var result = 999999;
    for (var i = 0; i < lineCounter; i++) {
        if (roofPoints[i].x < result) {
            result = roofPoints[i].x;
        }
    }
    return Math.abs(result);
}

var cur_object = {};
window.onkeydown = function(event) { 
    if(event.keyCode == 46){
        canvas.getActiveObject().remove();
    }  
};
//convert rgba to hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

//select object
function onObjectSelected(e) {
    cur_object = canvas.getActiveObject();
    console.log(cur_object);
    if(cur_object != null) chooseObj(cur_object);
   
  }
var camp_height_default = $('#camp_card').height();   
function chooseObj(obj) {
    
    if(obj.id != null) $('#id').val(obj.id);
    if(obj.name != null) $('#name').val(obj.name);
    if(obj.street != null) $('#street').val(obj.street);
    if(obj.direction != null) $('#direction').val(obj.direction);
    
    $('#left').val(obj.left);
    $('#top').val(obj.top);
    $('#width').val(obj.width);
    $('#height').val(obj.height);
    $('#scaleX').val(obj.scaleX);
    $('#scaleY').val(obj.scaleY);
    var fill = cur_object.fill;
    if(fill.indexOf('#') < 0) {
        fill = fill.substring(fill.indexOf('(')+1, fill.indexOf(')'));
        var fills = fill.split(',');
        fill = rgbToHex(fills[0], fills[1], fills[2]);    
    }

    $("#fill").spectrum({
        color: fill,
        preferredFormat: "hex"
    });
    $('#type').val(obj.type);
    $('#points_list').hide();
    if(obj.type == 'polygon' || obj.type== 'polyline') {        
        var points = obj.points;
        $('#points_list').html(''); 
        $('#camp_card').height(camp_height_default);
        camp_height = camp_height_default;
        $('#points_list').show();
        point_order = 0;        
        for(var i = 0; i <points.length ; i++ ) {
            var x = points[i].x;
            var y = points[i].y;
            addPoints(x,y);
        }        
    }
}  


canvas.on('object:selected', onObjectSelected);
canvas.on('object:moving', onObjectMoving);
canvas.on('object:scaling', onObjectMoving);
canvas.on('object:rotating', onObjectMoving);
canvas.on('object:skewing', onObjectMoving);

function onObjectMoving(e) {
    cur_object = canvas.getActiveObject();
    chooseObj(cur_object);
}
//get json data from canvas
function getData() {
    var data = JSON.stringify(canvas.toJSON(['id','name','direction', 'street','width']));
    $('#canvas_data').text(data);    
}
//create object
function createObject() {  
    cur_object = canvas.getActiveObject();    
    var type = $('#type').val();
    var name = $('#name').val();
    if(name == '') {
        $(".error").html("Name is requried.");
        return false;
    }
    var re_top = $('#top').val();
    if(cur_object == null) { 
        var name_flag = compareName(name);
        if(name_flag) {
            $(".error").html("Name can not duplicate.");
            return false;
        }        
        re_top =  parseInt($('#top').val()) + parseInt($('#height').val()) +10 ;
    }
    var street = $('#street').val();  
    if(street == '') {
        $(".error").html("Street is requried.");
        return false;    
    }
    var direction = $('#direction').val();  
    if(direction == '') {
        $(".error").html("Direction is requried.");
        return false;
    }
    var left = parseInt($('#left').val());
    if(left == '') {
        $(".error").html("Left is requried.");
        return false;
    }
    var top = parseInt($('#top').val());
    if(top == '') {
        $(".error").html("Top is requried.");
        return false;
    }
    var width = parseInt($('#width').val());
    if(width == '') {
        $(".error").html("Width is requried.");
        return false;
    }
    var height = parseInt($('#height').val());
    if(height == '') {
        $(".error").html("Height is requried.");
        return false;
    }
    var points = [];
    if(type == 'polygon' || type == 'polyline') {
        var x_list = $("input[name='x[]']")
              .map(function(){return $(this).val();}).get();
        var y_list = $("input[name='y[]']")
              .map(function(){return $(this).val();}).get();      
        for(var i = 0; i < x_list.length ; i ++) {
            var point_obj = {} ;
            var x = x_list[i];
            if(x == '') x = 0;
            var y = y_list[i];
            if(y == '') y = 0;
            x = parseInt(x);
            y = parseInt(y);                        
            if( x != 0 && y != 0) {
                point_obj.x = parseInt(x_list[i]);
                point_obj.y = parseInt(y_list[i]);
                points.push(point_obj);
            }else {
                $(".error").html("Points is requried.");
                return false;
            }
        }
    }
      
    if(cur_object != null) canvas.getActiveObject().remove();
    var item = {};
    item.id = name;      
    item.name = name;
    item.street = street;    
    item.direction = direction;
    item.left = left ;
    item.top = top;
    item.width = width;
    item.height = height;
    item.scaleX = $('#scaleX').val();
    item.scaleY = $('#scaleY').val();
    var fill_color = $('#fill').val();
    if(fill_color == '') fill_color = "#78b5f3";
    item.fill = fill_color;
    item.stroke = '#a8a9aa';
    item.strokeWidth = 0;     
    //points = [{"x":-6.5,"y":-59.5},{"x":37.5,"y":-87.5},{"x":38.5,"y":-47.5},{"x":78.5,"y":-12.5},{"x":80.5,"y":87.5},{"x":-80.5,"y":64.5},{"x":-60.5,"y":-14.5},{"x":-72.5,"y":-85.5},{"x":-3.5,"y":-58.5},{"x":-3.5,"y":-58.5},{"x":-6.5,"y":-59.5}];
   
    if(type == 'rect') {
        canvas.add(new fabric.Rect(item));
    }
    if(type == 'polygon' || type=='polyline') {
        canvas.add(new fabric.Polyline(points,item)); // Line, Rect, Circle, Ellipse, Polygon, Polyline
    }
    $(".error").html("");
    clearForm();   
    //reset top
   
    $('#top').val(re_top)
}

$("#fill").spectrum({
    color: "#ECC",
    preferredFormat: "hex"
});

//delete points 
var point_order = 1;
function delPoints(order) {    
    $('#points_'+order).remove();    
}
//add points
var camp_height = $('#camp_card').height(); 
function addPoints( x , y){
    point_order++;    
    var html ="";
    html +='<div class="row" id="points_'+point_order+'">';
    html +='    <div class="col-5">';
    html +='        <div class="form-group">';                                            
    html +='            <input type="number"  class="form-control" name="x[]" value="'+x+'" placeholder="X">';
    html +='        </div>'
    html +='    </div>';      
    html +='    <div class="col-7">';
    html +='         <fieldset>';
    html +='            <div class="input-group">';
    html +='                <input type="number" class="form-control" name="y[]" value="'+y+'" placeholder="Y" >';
    html +='                <div class="input-group-append" id="button-addon2">';
    html +='                    <button class="btn btn-secondary" type="button" onClick="delPoints('+point_order+')"><i class="feather icon-minus-circle"></i>  </button>';
    html +='                </div>';
    html +='            </div>';
    html +='        </fieldset>';
    html +='    </div>';                                       
    html +='</div>';
    $('#points_list').append(html); 
    camp_height += 42;
    $('#camp_card').height(camp_height);     
}
//change type
function changeType() {
    var type = $('#type').val();
    if(type == 'rect') $('#points_list').hide();
    if(type == 'polygon' || type=="polyline") $('#points_list').show();
}
//clear form and cur_object
function clearForm() {
    cur_object = {};
    var name = $('#name').val();
    if(name == '') name = 0;
    $('#name').val(parseInt(name)+1); 
    //$('#form input[type="text"]').val("");
    //$('#form input[type="number"]').val("");
    //$('#form textarea').val("");    
    point_order = 0;
    $('#points_list').html("");
    var html = "";
    html +='<div class="row" >';
    html +='    <div class="col-12">';
    html +='        <div class="form-group">';
    html +='            <label for="fill">';
    html +='                Points';
    html +='                <button class="btn btn-sm btn-secondary" type="button"  onClick="addPoints( 0 , 0)"><i class="feather icon-plus-circle"></i>  </button>';                                              
    html +='            </label>';                                                
    html +='        </div>';
    html +='    </div>';
    html +='</div>';
    $('#points_list').append(html);
    $('#camp_card').height(camp_height_default+25); 
}

//get camp_list
function getCampList(){
    $('#camp_name').html('');
    var url= '/getcampnamelist';
    $.ajax({
        type: "GET",
        url: url,
        data: {
            //id : id,
        },
        dataType: "json",
        success: function (res) {
           var camp_list = res.camp_list;
           var html = '';
           html += '<option value="0"> Select Camp </option>';
           for(var i = 0; i < res.count; i++) {
               var obj = camp_list[i];
                html += '<option value="'+obj.id+'"> '+obj.name+' </option>';
           }
           $('#camp_name').html(html);
        }
    });
}
getCampList();


//compare object id
function compareName(name) {
    var flag = false;
    var data = canvas.toJSON(['id','name','direction','street','width']);
    var list = data.objects;
    for(var i = 0 ; i < list.length; i++) {
        if(name == list[i].name) {
            flag = true;
            break;
        }
    }
    return flag;
}

//create camp area
function CrateCampArea() {
    var data = canvas.toJSON(['id','name','direction', 'street','width']);    
    var camp_id = $('#camp_name').val();    
    var url= '/creatcamparea';
    $.ajax({
        type: "POST",
        url: url,
        data: {
            _token : token ,
            data : data.objects,
            camp_id : camp_id
        },
        dataType: "json",
        success: function (res) {
           console.log(res);
        }
    });
}