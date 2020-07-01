
var camp_list_data =  $('#camp_list').DataTable( {
        scrollY: 400,
        scrollX: false,
        processing: true,
        // serverMethod: 'get',
        searching: true,
        ajax: {
            url:"getcamplist"
        },
        columns: [            
            { data: 'name'},
            { data: 'desc'},
            { data: 'status'},
            { data: 'actions'}
        ]
    });

function addCamp() {
    var id = $('#id').val();
    var name = $('#name').val();
    var desc = $('#desc').val();
    var status = $('#status').val();
    var url= '/addcampajax';
    $.ajax({
        type: "POST",
        url: url,
        data: {
            _token : token ,
            id : id,
            name : name,
            desc : desc,
            status : status
        },
        dataType: "json",
        success: function (res) {
            $('#id').val(0);
            $('#name').val('');
            $('#desc').val('');
            camp_list_data.ajax.reload();           
        }
    });
}

function campEdit(id) {    
    var url= '/editcampajax';
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
            var name = obj.name;
            var desc = obj.desc;
            $('#id').val(id);
            $('#name').val(name);
            $('#desc').val(desc);
        }
    });
}
function campDel(id) {
  var url = '/delcampajax';
  $.ajax({
    type: "GET",
    url: url,
    data: {
        id : id,
    },
    dataType: "json",
    success: function (res) {
        camp_list_data.ajax.reload();       
    }
});
}
