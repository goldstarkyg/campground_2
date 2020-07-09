var roof = null;
var roofPoints = [];
var lines = [];
var lineCounter = 0;
var drawingObject = {};
drawingObject.type = "";
drawingObject.background = "";
drawingObject.border = "";
var object_type_list = [];
var mouse_event_name = '';
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
        if(roofPoints.length == 0) return;
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
        //canvas.getActiveObject().remove();        
        var obj = canvas.getActiveObject();
        if(obj.type == 'group') {
            if (!obj || obj.type != 'group') return;      
            obj.destroy();
            canvas.remove(obj);
        }else {
            canvas.getActiveObject().remove();        
        }
        //canvas.renderAll();    
        clearForm();
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
    $('#object_type').val(obj.object_type);
    $('#obj_type_name').val(obj.obj_type_name);
    $('#obj_type_desc').val(obj.obj_type_desc);
    $('#obj_can_flag').val(obj.obj_can_flag);
    $('#obj_image_flag').val(obj.obj_image_flag);
    $('#obj_image_path').val(obj.obj_image_path);
    $('#obj_street_direction_flag').val(obj.obj_street_direction_flag);
    $('#api_link').val(obj.api_link);
    $('#angle').val(obj.angle);

    for( var i = 0; i < object_type_list.length; i++) {
        var prop_obj = object_type_list[i];
        if(obj.object_type == prop_obj.id) {            
            changeProperty(prop_obj);
            break;
        }       
    }    

    var fill = cur_object.fill;
    if(fill.indexOf('#') < 0 && fill !='' ) {
        fill = fill.substring(fill.indexOf('(')+1, fill.indexOf(')'));
        var fills = fill.split(',');
        fill = rgbToHex(fills[0], fills[1], fills[2]);    
    }

    $("#fill").val(fill);
    $("#fill").spectrum({
        color: fill,
        preferredFormat: "hex"
    });
    //get type 
    var origin_obj_type =   obj.type ;
    if(origin_obj_type == 'group') {
        var child_type = obj._objects[0].type;
        $('#type').val(child_type);
        if(obj.obj_image_flag == '1' && child_type == 'image' ) {  
            var src = obj._objects[0].src;
            if(src != '' && src!= null) {          
                $('.obj_image').show();
                $('#img-upload').attr('src', src);
                var link_splits = src.split("/");
                var image_name = link_splits[link_splits.length-1]; 
                $('#image_name').val(image_name);
                $('#imgInp').val('');
            }
        }else {        
            $('.obj_image').hide();
        }    
        $('#points_list').hide();
        if(child_type == 'polygon' || child_type == 'polyline') {        
            var points = obj._objects[0].points;
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
    }else {
        $('#type').val(origin_obj_type);
        $('#points_list').hide();       
        if(origin_obj_type == 'polygon' || origin_obj_type == 'polyline') {        
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
    var data = JSON.stringify(canvas.toJSON(['id','name','direction', 'street','width', 'object_type', 'obj_type_name','obj_type_desc','obj_can_flag','obj_image_flag', 'obj_street_direction_flag','api_link']));
    $('#canvas_data').text(data);    
}
//create object
function createObject() {  
    cur_object = canvas.getActiveObject();    
    var type = $('#type').val();
    var name = $('#name').val();
    name = name.replace(" ","");
    var angle = $('#angle').val();
    if(name == '') {
        $(".error").html("Name is requried.");
        return false;
    }

    var object_type = $('#object_type').val();
    if(object_type == 0 || object_type == null) {
        $(".error").html("Choose Object type!");
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
    }else{
        angle = cur_object.angle;
    } 
    var street = $('#street').val();         
    var direction = $('#direction').val();      
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
            //if( x != 0 && y != 0) {
                point_obj.x = parseInt(x_list[i]);
                point_obj.y = parseInt(y_list[i]);
                points.push(point_obj);
            // }else {
            //     $(".error").html("Points is requried.");
            //     return false;
            // }
        }
        if(points.length < 1) {
            $(".error").html("Points is requried.");
            return false;
        }
    }
    var object_type = $('#object_type').val();
    var obj_type_name = $('#obj_type_name').val();
    var obj_type_desc = $('#obj_type_desc').val();
    var obj_can_flag = $('#obj_can_flag').val();
    var obj_image_flag = $('#obj_image_flag').val();
    var obj_image_path= $('#obj_image_path').val();
    var obj_street_direction_flag = $('#obj_street_direction_flag').val();
    var api_link = $('#api_link').val();
    var scale_x = $('#scaleX').val();
    var scale_y = $('#scaleY').val();
    var fill = $('#fill').val();
    if(cur_object != null) {
        //canvas.getActiveObject().remove();
        var obj = canvas.getActiveObject();     
        if(obj.type == 'group') {         
            obj.destroy();
            canvas.remove(obj);
        }else {
            canvas.getActiveObject().remove();
        }
        //canvas.renderAll();   
    }
    var item = {};
    item.id = name;      
    item.name = name;
    item.street = street;    
    item.direction = direction;   
    item.width = width;
    item.height = height;    
    var fill_color = fill;
    if(fill_color == '') fill_color = "#78b5f3";
    item.fill = fill_color;
    item.stroke = '#a8a9aa';
    item.strokeWidth = 0; 
    
    /*
    if(type == 'image') {     
        if(image_path != '' && obj_image_flag == '1' ) {
            fabric.Image.fromURL(image_path, function (img) {
                img.set({
                    id : name,
                    name:name,
                    street : street,
                    direction : direction,                   
                    width : width,
                    height : height,
                    fill: '',
                    stroke : '#a8a9aa',
                    strokeWidth : 0 , 
                });

                var text = new fabric.Text(name, {
                    fontSize: 14,
                    left: parseInt(parseInt(width)/2),
                    top: parseInt(parseInt(height)/2),               
                    originX: 'center',
                    originY: 'center',
                    fill : fill                    
                  });       

                

                var group = new fabric.Group([img, text], {
                    id: name,
                    name : name,
                    street : street,
                    direction: direction,
                    left: parseInt(left),
                    top: parseInt(top),
                    object_type : object_type,
                    obj_type_name : obj_type_name,
                    obj_type_desc : obj_type_desc,
                    obj_can_flag : obj_can_flag,
                    obj_image_flag : obj_image_flag,
                    obj_street_direction_flag : obj_street_direction_flag,
                    api_link : api_link,
                    fill : fill_color,
                    angle:angle,
                    scaleX:scale_x,
                    scaleY:scale_y                    
                });  
                canvas.add(group);                    
            }, {crossOrigin: 'anonymous'});
        }
    }
    */
    if(type == 'rect') {        
        //canvas.add(new fabric.Rect(item));
        var obj_item = new fabric.Rect(item); 
        var text = new fabric.Text(name, {
            fontSize: 14,
            left: parseInt(parseInt(width)/2),
            top: parseInt(parseInt(height)/3),               
            originX: 'center',
            originY: 'center',
            //angle: angle
          });

        var group = new fabric.Group([ obj_item, text ], {
            id: name,
            name : name,
            street : street,
            direction: direction,
            left: parseInt(left),
            top: parseInt(top),
            object_type : object_type,
            obj_type_name : obj_type_name,
            obj_type_desc : obj_type_desc,
            obj_can_flag : obj_can_flag,
            obj_image_flag : obj_image_flag,
            obj_image_path : obj_image_path,
            obj_street_direction_flag : obj_street_direction_flag,
            api_link : api_link,
            fill : fill_color,
            angle:angle,
            scaleX:scale_x,
            scaleY:scale_y
        });
        if(obj_image_flag == '0') {        
            canvas.add(group);   
        }
        //add iamge/icon
        if(obj_image_flag == '1') {
            fabric.Image.fromURL(obj_image_path, function (img) {
                img.set({                                 
                    width : 30,
                    height : 17,                  
                    left: 0,
                    top: 5,               
                    originX: 'center',
                    originY: 'center',                   
                });
                var group = new fabric.Group([ obj_item, img, text ], {
                    id: name,
                    name : name,
                    street : street,
                    direction: direction,
                    left: parseInt(left),
                    top: parseInt(top),
                    object_type : object_type,
                    obj_type_name : obj_type_name,
                    obj_type_desc : obj_type_desc,
                    obj_can_flag : obj_can_flag,
                    obj_image_flag : obj_image_flag,
                    obj_image_path : obj_image_path,
                    obj_street_direction_flag : obj_street_direction_flag,
                    api_link : api_link,
                    fill : fill_color,
                    angle:angle,
                    scaleX:scale_x,
                    scaleY:scale_y
                });        
                canvas.add(group);  
                //canvas.add(img);                    
            }, {crossOrigin: 'anonymous'});
        }
        //end image/icon
    }
    if(type == 'polygon' || type=='polyline') {
        //canvas.add(new fabric.Polyline(points,item)); // Line, Rect, Circle, Ellipse, Polygon, Polyline
        var obj_item = new fabric.Polyline(points,item);
        var text = new fabric.Text(name, {
            fontSize: 14,
            left: parseInt(parseInt(width)/2),
            top: parseInt(parseInt(height)/3),               
            originX: 'center',
            originY: 'center',
           // angle: angle
          }); 
          var group = new fabric.Group([ obj_item, text ], {
            id: name,
            name : name,
            street : street,
            direction: direction,
            left: parseInt(left),
            top: parseInt(top),
            object_type : object_type,
            obj_type_name : obj_type_name,
            obj_type_desc : obj_type_desc,
            obj_can_flag : obj_can_flag,
            obj_image_flag : obj_image_flag,
            obj_image_path : obj_image_path,
            obj_street_direction_flag : obj_street_direction_flag,
            api_link : api_link,
            fill : fill_color,
            type_child: type,
            angle: angle,
            scaleX:scale_x,
            scaleY:scale_y
        });        
        if(obj_image_flag == '0') {
          canvas.add(group);  
        }
        //add iamge/icon
        if(obj_image_flag == '1') {
            fabric.Image.fromURL(obj_image_path, function (img) {
                img.set({
                    width : 30,
                    height : 17,                  
                    left: 0,
                    top: 5,               
                    originX: 'center',
                    originY: 'center', 
                });
                var group = new fabric.Group([ obj_item, img, text ], {
                    id: name,
                    name : name,
                    street : street,
                    direction: direction,
                    left: parseInt(left),
                    top: parseInt(top),
                    object_type : object_type,
                    obj_type_name : obj_type_name,
                    obj_type_desc : obj_type_desc,
                    obj_can_flag : obj_can_flag,
                    obj_image_flag : obj_image_flag,
                    obj_image_path : obj_image_path,
                    obj_street_direction_flag : obj_street_direction_flag,
                    api_link : api_link,
                    fill : fill_color,
                    type_child: type,
                    angle: angle,
                    scaleX:scale_x,
                    scaleY:scale_y
                });        
                canvas.add(group);                    
            }, {crossOrigin: 'anonymous'});
        }
        //end image/icon
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
    $('.obj_image').hide(); 
    if(type == 'rect') $('#points_list').hide();
    if(type == 'polygon' || type=="polyline") $('#points_list').show();
    if(type == 'image' && $('#obj_image_flag').val() == '1' ) {
        $('.obj_image').show(); 
    }
}
//clear form and cur_object
function clearForm() {
    cur_object = {};
   
    var name = $('#name').val();
    if(name == '') name = 0;
    if(isNaN(name)) {
        var rand = Math.random().toString(20).substr(2,1);
        if(name.length > 2) name = name.substr(0, name.length-2);
        $('#name').val(name+rand);
    }else {
        $('#name').val(parseInt(name)+1);
    }
    var obj = object_type_list[0];
    $('#object_type').val(obj.id);
    changeProperty(obj);
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
    var data = canvas.toJSON(['id','name','direction', 'street','width','object_type', 'obj_type_name','obj_type_desc','obj_can_flag','obj_image_flag', 'obj_image_path','obj_street_direction_flag','api_link']);    
    var camp_id = $('#camp_name').val();    
    if(camp_id > 0) {
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
                $('#area_mes').text('This camp area saved successufully!');
                $('#area_mes').css('color', '#126504');
                $('#area_mes').fadeIn();
                $('#area_mes').delay(2000).fadeOut();
            console.log(res);
            }
        });
    }else {
        $('#area_mes').text('Please choose campground name!');
        $('#area_mes').css('color', '#c30707');
        $('#area_mes').fadeIn();
        $('#area_mes').delay(2000).fadeOut();
    }
}


// get camp map
$('#camp_name').change(function(){
    var camp_id = $(this).val();
    var url= '/getcampmap';
    $.ajax({
        type: "GET",
        url: url,
        data: {
            camp_id : camp_id,
        },
        dataType: "json",
        success: function (res) {
           var data = res.data;
           if(data.length > 0) {
                createCamp(data);
           }else{
            canvas.clear().renderAll();
           }
        }
    });
});

function createCamp(data) {  
    canvas.clear().renderAll();
    canvas.hoverCursor = 'pointer';
    var list = [];    
    for(var i = 0; i < data.length ; i++) {       
        var obj = data[i];
        var item = {};
        item.id = obj.name;        
        item.name = obj.name;
        item.street = obj.street;    
        item.direction = obj.direction;        
        item.width = parseInt(obj.width);
        item.height = parseInt(obj.height);        
        item.fill = obj.fill;
        item.stroke = obj.stroke;
        item.strokeWidth = obj.strokeWidth; 
        item.strokeMiterLimit = obj.strokeMiterLimit;           
        if(obj.type == 'group') {                
            if(obj.objects[0].type == 'rect') {
                var obj_item = new fabric.Rect(item);
                //obj_item.set('selectable', false);
                //canvas.add(obj_item);           
                var text = new fabric.Text(obj.name, {
                    fontSize: 14,
                    left: parseInt(parseInt(obj.width)/2),
                    top: parseInt(parseInt(obj.height)/3),               
                    originX: 'center',
                    originY: 'center'
                });
                var group = new fabric.Group([ obj_item, text ], {
                    id: obj.name,
                    name : obj.name,
                    street : obj.street,
                    direction: obj.direction,
                    left: parseInt(obj.left),
                    top: parseInt(obj.top),
                    object_type : obj.object_type,
                    obj_type_name : obj.obj_type_name,
                    obj_type_desc : obj.obj_type_desc,
                    obj_can_flag : obj.obj_can_flag,
                    obj_image_flag : obj.obj_image_flag,
                    obj_street_direction_flag : obj.obj_street_direction_flag,
                    api_link : obj.api_link,
                    fill : obj.fill,
                    angle: obj.angle,
                    scaleX: obj.scaleX,
                    scaleY: obj.scaleY
                });      
                if(obj.obj_image_flag == '0') {      
                    canvas.add(group);
                }
                //add iamge/icon
                list[i] = {};        
                list[i]['obj_item'] = obj_item;
                list[i]['text'] = text;
                list[i]['obj'] = obj;
                if(obj.obj_image_flag == '1') {
                    var count = 0;
                    fabric.Image.fromURL(obj.obj_image_path, function (img) {
                        obj_item = list[count]['obj_item'];
                        text = list[count]['text'];
                        obj = list[count]['obj'];
                        img.set({                                 
                            width : 30,
                            height : 17,                  
                            left: 0,
                            top: 5,               
                            originX: 'center',
                            originY: 'center',                   
                        });
                        var group = new fabric.Group([ obj_item, img, text ], {
                            id: obj.name,
                            name : obj.name,
                            street : obj.street,
                            direction: obj.direction,
                            left: parseInt(obj.left),
                            top: parseInt(obj.top),
                            object_type : obj.object_type,
                            obj_type_name : obj.obj_type_name,
                            obj_type_desc : obj.obj_type_desc,
                            obj_can_flag : obj.obj_can_flag,
                            obj_image_flag : obj.obj_image_flag,
                            obj_image_path : obj.obj_image_path,
                            obj_street_direction_flag : obj.obj_street_direction_flag,
                            api_link : obj.api_link,
                            fill : obj.fill,
                            angle: obj.angle,
                            scaleX: obj.scaleX,
                            scaleY: obj.scaleY
                        });        
                        canvas.add(group);  
                        count++; 
                        //canvas.add(img);                    
                    }, {crossOrigin: 'anonymous'});
                }
                //end image/icon
            }
            if(obj.objects[0].type == 'polygon' || obj.objects[0].type=='polyline') {
                var points = [];
                var point_list = obj.objects[0].points;
                for(var m = 0; m < point_list.length; m++) {
                    var ob = {};
                    ob.x = parseInt(point_list[m].x);
                    ob.y = parseInt(point_list[m].y);
                    points[m] = ob;
                }      
                var obj_item = new fabric.Polyline(points,item);      
                //obj_item.set('selectable', false);
                //canvas.add(obj_item);; // Line, Rect, Circle, Ellipse, Polygon, Polyline , Triangle(3 angle)
                var text = new fabric.Text(obj.name, {
                    fontSize: 14,
                    left: parseInt(parseInt(obj.width)/2),
                    top: parseInt(parseInt(obj.height)/3),               
                    originX: 'center',
                    originY: 'center',
                    //angle: obj.angle
                });                
                var group = new fabric.Group([ obj_item, text ], {
                    id: obj.name,
                    name : obj.name,
                    street : obj.street,
                    direction: obj.direction,
                    left: parseInt(obj.left),
                    top: parseInt(obj.top),
                    object_type : obj.object_type,
                    obj_type_name : obj.obj_type_name,
                    obj_type_desc : obj.obj_type_desc,
                    obj_can_flag : obj.obj_can_flag,
                    obj_image_flag : obj.obj_image_flag,
                    obj_street_direction_flag : obj.obj_street_direction_flag,
                    api_link : obj.api_link,
                    fill : obj.fill,
                    angle: obj.angle,
                    scaleX: obj.scaleX,
                    scaleY: obj.scaleY
                });  
                if(obj.obj_image_flag == '0') {        
                    canvas.add(group);
                }
                //add iamge/icon       
                list[i] = {};        
                list[i]['obj_item'] = obj_item;
                list[i]['text'] = text;
                list[i]['obj'] = obj;
                if(obj.obj_image_flag == '1') {
                    var count = 0;
                    fabric.Image.fromURL(obj.obj_image_path, function (img) {                       
                        obj_item = list[count]['obj_item'];
                        text = list[count]['text'];
                        obj = list[count]['obj'];
                        img.set({
                            width : 30,
                            height : 17,                  
                            left: 0,
                            top: 5,               
                            originX: 'center',
                            originY: 'center', 
                        });
                        var group = new fabric.Group([ obj_item, img, text ], {
                            id: obj.name,
                            name : obj.name,
                            street : obj.street,
                            direction: obj.direction,
                            left: parseInt(obj.left),
                            top: parseInt(obj.top),
                            object_type : obj.object_type,
                            obj_type_name : obj.obj_type_name,
                            obj_type_desc : obj.obj_type_desc,
                            obj_can_flag : obj.obj_can_flag,
                            obj_image_flag : obj.obj_image_flag,
                            obj_image_path : obj.obj_image_path,
                            obj_street_direction_flag : obj.obj_street_direction_flag,
                            api_link : obj.api_link,
                            fill : obj.fill,
                            type_child: obj.type,
                            angle: obj.angle,
                            scaleX: obj.scaleX,
                            scaleY: obj.scaleY
                        });        
                        canvas.add(group); 
                        count++;                   
                    }, {crossOrigin: 'anonymous'});
                }
                //end image/icon
            }
        }

        // if(obj.type == 'image') {
        //     if(obj.obj_image_flag == "1") {
        //         fabric.Image.fromURL(obj.obj_image_path, function (img) {
        //             img.set({
        //                 id : obj.name,
        //                 name: obj.name,
        //                 street : obj.street,
        //                 direction : obj.direction,                   
        //                 width : parseInt(obj.width),
        //                 height : parseInt(obj.height),
        //                 left: parseInt(obj.left),
        //                 top: parseInt(obj.top),
        //                 object_type : obj.object_type,
        //                 obj_type_name : obj.obj_type_name,
        //                 obj_type_desc : obj.obj_type_desc,
        //                 obj_can_flag : obj.obj_can_flag,
        //                 obj_image_flag : obj.obj_image_flag,
        //                 obj_image_path : obj.obj_image_path,
        //                 obj_street_direction_flag : obj.obj_street_direction_flag,
        //                 api_link : obj.api_link,
        //                 angle: obj.angle,
        //                 scaleX: obj.scaleX,
        //                 scaleY: obj.scaleY,
        //                 fill: '',
        //                 stroke : '#a8a9aa',
        //                 strokeWidth : 0 , 
        //             });
        //             canvas.add(img);                    
        //         }, {crossOrigin: 'anonymous'});
        //     }
        // }

    }    
}

//get camp proprty
function camp_prop_list() {    
    var url= '/getcampproplist';
    $.ajax({
        type: "GET",
        url: url,
        data: {
            //id : id,
        },
        dataType: "json",
        success: function (res) {          
           var prop_list = res.data;           
           var html = '';
           html += '<option value="0"> Select Type </option>';
           for(var i = 0; i < res.count; i++) {
               var obj = prop_list[i];
               object_type_list[i] = obj; 
                html += '<option value="'+obj.id+'"> '+obj.object_type+' </option>';
           }
           $('#object_type').html(html);
        }
    });
}
camp_prop_list();

//change event of object type
$('#object_type').change(function(){
    var id = $(this).val();
    for( var i = 0; i < object_type_list.length; i++) {
        var obj = object_type_list[i];
        if(obj.id == id) {            
            changeProperty(obj);
            break;
        }       
    }    
});
//change property
function changeProperty(obj) {       
    $("#obj_type_name").val(obj.object_type);
    $("#obj_type_desc").val(obj.desc);
    $("#obj_can_flag").val(obj.can_flag);
    $("#fill").val(obj.color);
    $("#fill").spectrum({
        color: obj.color,
        preferredFormat: "hex"
    });
    $('#obj_image_flag').val(obj.image_flag);
    $('#obj_image_path').val(obj.image_path);
    $('#obj_street_direction_flag').val(obj.street_direction_flag); 
    // if(obj.can_flag == '1' ) {
    //     $('.obj_api_link').show();
    // }else {
    //     $('.obj_api_link').hide();
    // }    
    if(obj.street_direction_flag == '1') {
        $('.obj_street').show();
        $('.obj_direction').show();
    }else {
        $('.obj_street').hide();
        $('.obj_direction').hide();
    }
}

//init when start
function _init(){
    $('.obj_api_link').hide();
    $('.obj_image').hide();
    $('.obj_street').hide();
    $('.obj_direction').hide();
}
_init();
