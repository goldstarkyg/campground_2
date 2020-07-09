var base64_image = '';
var base64_image_name = '';
var camp_prop_list_data =  $('#camp_prop_list').DataTable( {
    scrollY: 400,
    scrollX: false,
    processing: true,
    // serverMethod: 'get',
    searching: true,
    ajax: {
        url:"campproplist"
    },
    columns: [            
        { data: 'object_type'},
        { data: 'desc'},
        { data: 'color'},
        { data: 'can_flag'},
        { data: 'api_link'},
        { data: 'image_flag'},
        { data: 'image_path'},
        { data: 'street_direction_flag'},
        { data: 'actions'}
    ]
});

$("#color").spectrum({
    color: "#ecc",
    preferredFormat: "hex"
});

function addCampProp() {
var id = $('#id').val();
var object_type = $('#object_type').val();
if(object_type == null || object_type == '' ) {
    $(".error").html("Object type is requried.");
    return false;
}
var desc = $('#desc').val();
var color = $('#color').val();
var can_flag = $('#can_flag').val();
var api_link = $('#api_link').val();
var image_flag = $('#image_flag').val();
var street_direction_flag = $('#street_direction_flag').val();
var object_slug = getObjectSlug(object_type);
var url= '/addcamppropajax';
$.ajax({
    type: "POST",
    url: url,
    data: {
        _token : token ,
        id : id,
        object_type : object_type,
        object_slug: object_slug,
        desc : desc,
        color : color,
        can_flag : can_flag,
        api_link: api_link,
        image_flag: image_flag,
        image : base64_image,
        street_direction_flag : street_direction_flag,        
    },
    dataType: "json",
    success: function (res) {
        $('#id').val(0);
        $('#object_type').val('');
        $('#desc').val('');
        $('#can_flag').val('1');
        $('#api_link').val('');
        $('#image_flag').val('0');
        $('#street_direction_flag').val('1');
        base64_image = '';
        $('#img-upload').attr('src', '');
        $('#image_name').val(''); 
        $(".error").html('');       
        camp_prop_list_data.ajax.reload();           
    }
});
}

function campPropEdit(id) {    
var url= '/editcamppropajax';
    $.ajax({
        type: "GET",
        url: url,
        data: {
            id : id,
        },
        dataType: "json",
        success: function (res) {
            var obj = res.camp;
            var id = obj.id;
            var object_type = obj.object_type;
            var object_slug = obj.object_slug;
            var desc = obj.desc;
            var color = obj.color;
            var can_flag = obj.can_flag;
            var api_link = obj.api_link;
            var image_flag = obj.image_flag;
            var image_path = obj.image_path;
            var image_name = obj.image_name;            
            var street_direction_flag = obj.street_direction_flag;

            $('#id').val(id);
            $('#object_type').val(object_type);
            $('#object_slug').val(object_slug);
            $('#desc').val(desc);
            $('#color').val(color);
            $("#color").spectrum({
                color: color,
                preferredFormat: "hex"
            });
            $('#can_flag').val(can_flag);
            $('#api_link').val(api_link);
            $('#image_flag').val(image_flag);            
            $('#img-upload').attr('src', image_path);
            $('#image_name').val(image_name);
            if(image_flag == '1') $('.obj_image').show();
            else $('.obj_image').hide();
            $('#street_direction_flag').val(street_direction_flag);
            base64_image_name = image_name ;
            getBase64Image(image_path);
            console.log(base64_image);
                   
        }
    });
}

//make base64 image from image path;
function getBase64Image(imgUrl, callback) {

    var img = new Image();
    img.onload = function(){
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
          //dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      base64_image = dataURL;
      //callback(dataURL); // the base64 string

    };
    if(imgUrl != null)  {
        img.setAttribute('crossOrigin', 'anonymous'); 
        img.src = imgUrl;
    }
}

function campPropDel(id) {
    var url = '/delcamppropajax';
    $.ajax({
        type: "GET",
        url: url,
        data: {
            id : id,
        },
        dataType: "json",
        success: function (res) {
            $('#id').val(0);
            $('#object_type').val('');
            $('#desc').val('');
            $('#can_flag').val('1');
            $('#api_link').val('');
            $('#image_flag').val('0');
            $('#street_direction_flag').val('1');
            base64_image = '';
            $('#img-upload').attr('src', '');
            $('#image_name').val('');   
            camp_prop_list_data.ajax.reload();       
        }
    });
}

function getObjectSlug(name) {
    name = name.replace(/\s/g,"_");
    return name;
}

//image management 
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            base64_image = e.target.result;            
            var names = base64_image.split(",");     
            if(names.length > 0) {       
                var file_types_list = names[0].split(";");
                var file_types_list_ = file_types_list[0].split('/');
                var file_type = file_types_list_[1];
                base64_image_name = getObjectSlug($('#object_type').val())+'.'+file_type;                
            }
            $('#img-upload').attr('src', e.target.result);
            $('#image_name').val(image_name);           
        }        
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
}); 

$('#image_flag').change(function(){
    var val = $(this).val();
    if(val == '1') $('.obj_image').show();
    else $('.obj_image').hide();
});
//end image management