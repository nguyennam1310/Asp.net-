$(document).ready(function () {
    loadCategory();
    loaddataQuestion(1);
    loadPagination();
    $("#CategoryId").change(function () {
        displayAnswer(total);
    });
});
$("#Id").hide();
function loadCategory() {
    $.ajax({

        url: "/Admin/GetDataCategory",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            html += "<option value>Chọn loại</option>";
            $.each(result, function (key, item) {

                html += "<option id='Catagory-" + item.id + "'  value='" + item.Name + "'>" + item.Name + '</option>';


            });
            $("#CategoryId option[value='']").prop('selected', 'selected');
            $('#CategoryId').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
    function loaddataQuestion(Id) {
        $.ajax({

            url: "/Admin/GetDataQuestion/" + Id,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '';
               
                $.each(result, function (key, item) {

                    html += '<tr>';
                    html += '<td>' + item.RowId + '</td>';
               
                    html += '<td>' + item.Text + '</td>';
                    html += '<td>' + item.TextAnswer + '</td>';
                    html += '<td>' + item.Name + '</td>';
                    html += '<td>' + item.Mark + '</td>';
                    html += '<td>' + item.CreateDate + '</td>';
                    html += '<td>' + item.ModifyDate + '</td>';
               
                    html += '<td><a href="#" onclick=" CountAnswer(' + item.Id + ');">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                    html += '</tr>';


                });
                $('.tbody').html(html);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

function to_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}
var total = 4;
function displayAnswer(total) {
    if (to_slug($("#CategoryId").val()) == "trac-nghiem") {
        var html = "";
        for (var i = 1; i <= total; i++) {
            html += '<div class="form-group">';
            html += '<div id="BlockAnswer-'+i+'"';
            html += '<label for="formGroupExampleInput2">Câu trả lời số ' + i +':</label>';
            html += '<div class="row">';
            html += '<div class="col-md-11">';
            html += '<input type="text" class="form-control" id="Answer-'+i+'" placeholder="Câu trả lời số '+i+'"></div>';
            html += '<div class="col-md-1">';
            html += '<label class="SelectResult">';
            html += '<input type="radio" id="ResultAnswer-'+ i +'" name="radio">';
            html += '<span class="checkmark"></span>';
            html += '</label>';
            html +='<button type="button" onclick="deleteDisplayAnswer();" class="close">×</button></div></div></div></div>';
          
        }
        html += ' <div id="more"></div>';
        html += '<button type="button" class="btn btn-primary" onclick="addDisplayAnswer(); ">Thêm câu trả lời</button><br>';
        $('#answer').html(html);
        $("#ResultAnswer-1").prop('checked', true);
    }
    if (to_slug($("#CategoryId").val()) == "tu-luan") {
        var html = "";
        
            html += '<div class="form-group">';
        html += '<label for="formGroupExampleInput2">Nhập câu trả lời:</label>';
           
            html += '<input type="text" class="form-control" id="TextAnswer" placeholder="Nhập câu trả lời"></div>';
           
           
        $('#answer').html(html);
    }
    if (to_slug($("#CategoryId").val()) == "lua-chon") {
        var html = "";
        for (var i = 1; i <= total; i++) {
            html += '<div class="form-group">';
            html += '<div id="BlockAnswer-' + i + '"';
            html += '<label for="formGroupExampleInput2">Câu trả lời số ' + i + ':</label>';
            html += '<div class="row">';
            html += '<div class="col-md-11">';
            html += '<input type="text" class="form-control" id="Answer-' + i + '" placeholder="Câu trả lời số ' + i + '"></div>';
            html += '<div class="col-md-1">';
            html += '<label class="SelectResult1">';
            html += '<input type="checkbox" id="ResultAnswer-' + i + '" name="radio">';
            html += '<span class="checkmark1"></span>';
            html += '</label>';
            html += '<button type="button" onclick="deleteDisplayAnswer();" class="close" data-dismiss="modal">×</button></div></div></div></div>';

        }
        html += ' <div id="more"></div>';
        html += '<button type="button" class="btn btn-primary" onclick="addDisplayAnswer(); ">Thêm câu trả lời</button>';
        $('#answer').html(html);
        $("#ResultAnswer-1").prop('checked', true);
        $("#ResultAnswer-2").prop('checked', true);
    }
}
function displayAnswer1(total) {
    if (to_slug($("#CategoryId").val()) == "trac-nghiem") {
        var html = "";
        for (var i = 1; i <= total; i++) {
            html += '<div class="form-group">';
            html += '<div id="BlockAnswer-' + i + '"';
            html += '<label for="formGroupExampleInput2">Câu trả lời số ' + i + ':</label>';
            html += '<div class="row">';
            html += '<div class="col-md-11">';
            html += '<input type="text" class="form-control" id="Answer-' + i + '" placeholder="Câu trả lời số ' + i + '"></div>';
            html += '<div class="col-md-1">';
            html += '<label class="SelectResult">';
            html += '<input type="radio" id="ResultAnswer-' + i + '" name="radio">';
            html += '<span class="checkmark"></span>';
            html += '</label>';
            html += '<button type="button" onclick="deleteDisplayAnswer();" class="close">×</button></div></div></div></div>';

        }
        html += ' <div id="more"></div>';
        html += '<button type="button" class="btn btn-primary" onclick="addDisplayAnswer(); ">Thêm câu trả lời</button><br>';
        $('#answer').html(html);
        
    }
    if (to_slug($("#CategoryId").val()) == "tu-luan") {
        var html = "";

        html += '<div class="form-group">';
        html += '<label for="formGroupExampleInput2">Nhập câu trả lời:</label>';

        html += '<input type="text" class="form-control" id="TextAnswer" placeholder="Nhập câu trả lời"></div>';


        $('#answer').html(html);
    }
    if (to_slug($("#CategoryId").val()) == "lua-chon") {
        var html = "";
        for (var i = 1; i <= total; i++) {
            html += '<div class="form-group">';
            html += '<div id="BlockAnswer-' + i + '"';
            html += '<label for="formGroupExampleInput2">Câu trả lời số ' + i + ':</label>';
            html += '<div class="row">';
            html += '<div class="col-md-11">';
            html += '<input type="text" class="form-control" id="Answer-' + i + '" placeholder="Câu trả lời số ' + i + '"></div>';
            html += '<div class="col-md-1">';
            html += '<label class="SelectResult1">';
            html += '<input type="checkbox" id="ResultAnswer-' + i + '" name="radio">';
            html += '<span class="checkmark1"></span>';
            html += '</label>';
            html += '<button type="button" onclick="deleteDisplayAnswer();" class="close" data-dismiss="modal">×</button></div></div></div></div>';

        }
        html += ' <div id="more"></div>';
        html += '<button type="button" class="btn btn-primary" onclick="addDisplayAnswer(); ">Thêm câu trả lời</button>';
        $('#answer').html(html);
       
    }
}
function deleteDisplayAnswer() {
    if (total > 2) {
        $('#BlockAnswer-' + total + '').remove();
        total--;
    }
    else {
        alert("Cần ít nhất 2 câu trả lời?")
    }
}
function addDisplayAnswer() {
    if (to_slug($("#CategoryId").val()) == "trac-nghiem") {
        var html = "";

        html += '<div class="form-group">';
        html += '<div id="BlockAnswer-' + (total + 1) + '"';
        html += '<label for="formGroupExampleInput2">Câu trả lời số ' + (total + 1) + ':</label>';
        html += '<div class="row">';
        html += '<div class="col-md-11">';
        html += '<input type="text" class="form-control" id="Answer-' + (total + 1) + '" placeholder="Câu trả lời số ' + (total + 1) + '"></div>';
        html += '<div class="col-md-1">';
        html += '<label class="SelectResult">';
        html += '<input type="radio" id="ResultAnswer-' + (total + 1) + '" name="radio">';
        html += '<span class="checkmark"></span>';
        html += '</label>';
        html += '<button type="button" onclick="deleteDisplayAnswer();" class="close" data-dismiss="modal">×</button></div></div></div></div>';


        $('#more').append(html);
        total++;
    }
    if (to_slug($("#CategoryId").val()) == "lua-chon") {
        var html = "";

        html += '<div class="form-group">';
        html += '<div id="BlockAnswer-' + (total + 1) + '"';
        html += '<label for="formGroupExampleInput2">Câu trả lời số ' + (total + 1) + ':</label>';
        html += '<div class="row">';
        html += '<div class="col-md-11">';
        html += '<input type="text" class="form-control" id="Answer-' + (total + 1) + '" placeholder="Câu trả lời số ' + (total + 1) + '"></div>';
        html += '<div class="col-md-1">';
        html += '<label class="SelectResult1">';
        html += '<input type="checkbox" id="ResultAnswer-' + (total + 1) + '" name="radio">';
        html += '<span class="checkmark1"></span>';
        html += '</label>';
        html += '<button type="button" onclick="deleteDisplayAnswer();" class="close" data-dismiss="modal">×</button></div></div></div></div>';


        $('#more').append(html);
        total++;
    }
}
function Add() {

    var res = validate1();
    if (res == false) {
        return false;
    }
    else {
        var empObj = {
            Name: $('#Name').val(),

            CreateDate: new Date().toISOString(),
            ModifyDate: new Date().toISOString()
        };
        $.ajax({
            url: "/Admin/AddCategoryQuestion",
            data: empObj,
            type: "POST",

            success: function (result) {

                $('#myModal').modal('hide');
                alert("you are done");
            },
            error: function (response) {
                alert("Failed");
            }
        });
    }
}
function clearTextBox() {
    $('#Name').css('border-color', 'lightgrey');


    $('#Id').val("");
    $('#Name').val("");
    $('#ModifyDate').val("");

    $('#CreateDate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();

}

function Delele(ID) {
    var ans = confirm("Bạn có chắc xóa không?");
    if (ans) {
        $.ajax({
            url: "/Admin/DeleteQuestion/" + ID,
            type: "POST",

            success: function (result) {
                loaddataQuestion();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function DeleleAnswer(ID) {
    
        $.ajax({
            url: "/Admin/DeleteAnswer?IdQuestion=" + ID,
            type: "POST",

            success: function (result) {
                
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    
}
function AddQuestion() {
    var res = validate();
    if (res == false) {
        return false;
    }
    else {
        var empObj = {
            Text: $('#Text').val().toString(),
            Mark: $('#Mark').val(),
            CategoryName: $('#CategoryId').val(),
            CreateDate: new Date().toISOString(),
            ModifyDate: new Date().toISOString()
        };
        $.ajax({
            contentType: 'application/json',
            url: "/Admin/AddQuestion",
            data: JSON.stringify(empObj),
            type: "POST",
            dataType: "json",
            success: function (result) {

                AddAnswer();
                alert("you are done");
            },
            error: function (response) {
                alert("Failed");

            }
        });

    }
}

function AddAnswer() {
    var res = validate2();
    if (res == false) {
        return false;
    }
    else {
        var Answer = [];

        for (var i = 1; i <= total; i++) {

            var result = $("#ResultAnswer-" + i + "").prop("checked");
            var TextAnswer = $("#Answer-" + i + "").val().toString();
            Answer.push({ "result": result, "TextAnswer": TextAnswer });

        }



        $.ajax({
            contentType: 'application/json',
            url: "/Admin/AddAnswer",
            data: JSON.stringify(Answer),
            method: "POST",
            dataType: "json",
            success: function (result) {



            }
            ,
            error: function (response) {

            }
        });

    }
}
function GetByIdQuestion(Id) {
    $.ajax({
        url: "/Admin/GetByIdQuestion/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            $('#Id').val(Id);

            $('#Text').val(result.Text);
            $('#Mark').val(result.Mark);
            $('#CategoryId').val(result.Name);
           




            $('#myModal').modal('show');
            displayAnswer1(total);
            GetByIdAnswer(Id);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function GetByIdAnswer(Id) {
    $.ajax({
        url: "/Admin/GetByIdAnswer?IdQuestion=" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (res) {


            


            $.each(res, function (key, item) {
                $("#Answer-" + (key + 1) + "").val(item.TextAnswer);
                if (item.result == true) {
                    $("#ResultAnswer-" + (key +1) + "").prop("checked","true");
                }
            });


          

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}                    
            
function UpdateQuestion() {
    var res = validate();
    if (res == false) {
        return false;
    }
    else {
        var empObj = {
            Id: $('#Id').val(),
            Text: $('#Text').val().toString(),
            Mark: $('#Mark').val(),
            CategoryName: $('#CategoryId').val(),

            ModifyDate: new Date().toISOString()
        };
        $.ajax({
            contentType: 'application/json',
            url: "/Admin/UpdateQuestion",
            data: JSON.stringify(empObj),
            type: "POST",
            dataType: "json",
            success: function (result) {


                alert("you are done");
                DeleleAnswer($('#Id').val())
                UpdateAnswer();
            },
            error: function (response) {
                alert("Failed");
            }
        });
    }

}

function UpdateAnswer() {
    var res = validate2();
    if (res == false) {
        return false;
    }
    else {
        var Answer = [];

        for (var i = 1; i <= total; i++) {
            var IdQuestion = $('#Id').val();
            var result = $("#ResultAnswer-" + i + "").prop("checked");
            var TextAnswer = $("#Answer-" + i + "").val().toString();
            Answer.push({ "IdQuestion": IdQuestion, "result": result, "TextAnswer": TextAnswer });

        }

        $.ajax({
            contentType: 'application/json',
            url: "/Admin/UpdateAnswer",
            data: JSON.stringify(Answer),
            method: "POST",
            dataType: "json",
            success: function (result) {



                $('#myModal').modal('hide');
                loaddataQuestion();

            }
            ,
            error: function (response) {



            }
        });

    }
}
function CountAnswer(Id) {
    $.ajax({
        url: "/Admin/CountAnswer?IdQuestion="+Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            total = result;
            GetByIdQuestion(Id);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
var currentPage = 1;
function page(a) {
    currentPage = a;
    loadPagination();


}
function loadPagination() {
    $.ajax({
        url: "/Admin/CountQuestion",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            html += '<nav aria-label="Page navigation example" ><ul class="pagination">';

            if (currentPage > 1) {
                html += ' <li class="page-item"><a onclick="page(1); loaddataQuestion(1);" class="page-link" href = "#" aria - label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">first</span></a></li>';
                html += ' <li class="page-item"><a onclick="page(' + (currentPage - 1) + '); loaddataQuestion(' + (currentPage - 1) +');" class="page-link" href = "#" aria - label="Previous"><span aria-hidden="true">‹</span><span class="sr-only">Previous</span></a></li>';
            }

            if (Math.floor(result / 10) < 5) {
                for (i = 1; i < (result / 10) + 1; i++) {
                    html += '<li class="page-item"><a class="page-link" href= "#" id="page-' + i + '" onclick="page(' + i + ');loaddataQuestion(' + i + ');">' + i + '</a></li>';
                }
            }
            if ((Math.floor(result / 10) > 5 && currentPage < 4)) {
                for (i = 1; i < 6; i++) {
                    html += '<li class="page-item"><a class="page-link" href= "#" id="page-' + i + '" onclick="page(' + i + ');loaddataQuestion(' + i + ');">' + i + '</a></li>';
                }

            }

            if ((Math.floor(result / 10) >= 6) && currentPage >= 4 && currentPage < Math.floor(result / 10)) {
                for (i = currentPage - 2; i < currentPage + 3; i++) {
                    html += '<li class="page-item"><a class="page-link" href= "#" id="page-' + i + '" onclick="page(' + i + ');loaddataQuestion(' + i + ');">' + i + '</a></li>';
                }
            }
            if ((Math.floor(result / 10) >= 6) && currentPage == Math.floor(result / 10)) {
                for (i = currentPage - 3; i < currentPage + 2; i++) {
                    html += '<li class="page-item"><a class="page-link" href= "#" id="page-' + i + '" onclick="page(' + i + ');loaddataQuestion(' + i + ');">' + i + '</a></li>';
                }
            }
            if ((Math.floor(result / 10) >= 6) && currentPage == Math.floor(result / 10) + 1) {
                for (i = currentPage - 4; i < currentPage + 1; i++) {
                    html += '<li class="page-item"><a class="page-link" href= "#" id="page-' + i + '" onclick="page(' + i + ');loaddataQuestion(' + i + ');">' + i + '</a></li>';
                }
            }
            var last = Math.floor(result / 10) + 1;
            var next = currentPage - 1 + 2;
            if (currentPage > 0 && currentPage < last) {
                html += '<li class="page-item"><a onclick="page(' + next + ');loaddataQuestion(' + next + ');" class="page-link" href= "#" aria - label="Next" ><span aria-hidden="true">›</span><span class="sr-only">Next</span></a></li>';
                html += '<li class="page-item"><a onclick="page(' + last + ');loaddataQuestion(' + last + ');" class="page-link" href= "#" aria - label="Next" ><span aria-hidden="true">&raquo;</span><span class="sr-only">Last</span></a></li>';
            }

            html += ' </ul></nav>';

            $('.next').html(html);
            $('#page-' + currentPage + '').css('background-color', '#d59829');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}
function validate1() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    return isValid;
}
function validate() {
    var isValid = true;
    
    if ($('#Text').val().trim() == "") {
        $('#Text').css('border-color', 'Red');
        isValid = false;
        var test = 2;
    }
    else {
        $('#Text').css('border-color', 'lightgrey');
    }
    if ($('#CategoryId').val().trim() == "") {
        $('#CategoryId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CategoryId').css('border-color', 'lightgrey');
    }
    if ($('#Mark').val().trim() == "") {
        $('#Mark').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Mark').css('border-color', 'lightgrey');
    }
    

    return isValid;
}
function validate2() {
    var isValid = true;

    for (var i = 1; i <= total; i++) {
        if ($('#Answer-' + i + '').val().trim() == "") {
            $('#Answer-' + i + '').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Answer-' + i + '').css('border-color', 'lightgrey');
        }
    }


    return isValid;
}
