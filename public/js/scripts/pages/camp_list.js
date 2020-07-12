
 var canvas = new fabric.Canvas('canvas-tools'); 
 canvas.hoverCursor = 'pointer';
var camp_list_data =  $('#camp_list').DataTable( {
    scrollY: 400,
    scrollX: false,
    processing: true,
    bPaginate: false,
    bLengthChange: false,
    bFilter: true,
    bInfo: false,
    bAutoWidth: false, 
    // serverMethod: 'get',
    searching: true,
    ajax: {
        url:"camparealist"
    },
    columns: [            
        { data: 'name'},      
        { data: 'actions'}
    ]
});


function campMap(camp_id) {    
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
           createCamp(data);
        }
    });
}

function createCamp(data) {  
    canvas.clear().renderAll();
    canvas.hoverCursor = 'pointer';
    var list = [];   
    var _count = 0; 
    for(var i = 0; i < data.length ; i++) {       
        var obj = data[i];
        var item = {};
        item.id = obj.name;
        item.camp_id = obj.camp_id;
        item.camp_name = obj.camp_name;
        item.camp_desc = obj.camp_desc;      
        item.name = obj.name;
        item.street = obj.street;    
        item.direction = obj.direction;        
        item.width = parseInt(obj.width);
        item.height = parseInt(obj.height);
        // item.scaleX = obj.scaleX;
        // item.scaleY = obj.scaleY;        
        item.fill = obj.fill;
        item.stroke = obj.stroke;
        item.strokeWidth = obj.strokeWidth; 
        item.strokeMiterLimit = obj.strokeMiterLimit;  
        item.angle = obj.angle;   

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
                group.set('selectable', false);          
                if(obj.obj_image_flag == '0') {      
                    canvas.add(group);
                }
                //add iamge/icon                
                if(obj.obj_image_flag == '1') {
                    list[_count] = {};        
                    list[_count]['obj_item'] = obj_item;
                    list[_count]['text'] = text;
                    list[_count]['obj'] = obj;
                    _count++;
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
                        group.set('selectable', false);          
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
                group.set('selectable', false);         
                if(obj.obj_image_flag == '0') {        
                    canvas.add(group);
                }

                //add iamge/icon                       
                if(obj.obj_image_flag == '1') {
                    list[_count] = {};        
                    list[_count]['obj_item'] = obj_item;
                    list[_count]['text'] = text;
                    list[_count]['obj'] = obj;
                    _count++;
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
                        group.set('selectable', false);        
                        canvas.add(group); 
                        count++;                   
                    }, {crossOrigin: 'anonymous'});
                }
                //end image/icon
            }       
        }         
    }    
}

canvas.on('mouse:up', function (e) {    
    if (e.target) {        
      var objs = e.target._objects; 
      var obj = objs[0];
      var area_id = obj.id;
      if(e.target.obj_can_flag == '1') {
        $('#camp_name').html(obj.camp_name);
        $('#camp_desc').html(obj.camp_desc);
        $('#area').html(area_id);
        $('#bookingModal').modal('show');  
      }
    }
});