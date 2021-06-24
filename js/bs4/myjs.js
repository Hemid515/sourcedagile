
$(document).ready(function(){
    GetProjelist();
})


function trdbclick (e) {

    let getvalprdesc = $(e).children().eq(2).text();

    $(e).children().eq(2).text("").html("<input  class='form-control getvalprdesc_input'   type='text' value='" + getvalprdesc + "'>");
    $(".getvalprdesc_input").on('keypress', function (e) {
        if (e.which == 13) {
            $(this).parent().text($(".getvalprdesc_input").val());
            $(this).remove();

        }
    });
}
function addprosdec(e) {

    $(e).closest('tr').after(" <tr ondblclick=\"trdbclick(this);\">\n" +
        "   <td>1</td>\n" +
        "                            <td >\n" +
        "                                <label>\n" +
        "                                    <input type=\"checkbox\" name=\"check\"/><span class=\"label-text\"></span>\n" +
        "                                </label>" +
        "</td>\n" +
        "                            <td><input  class='form-control getvalprdesc_input'  type='text'></td>\n" +
        "                            <td>\n" +
        "                                <span class=\"threedots\">\n" +
        "                                <svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\">\n" +
        "                                    <g fill=\"currentColor\" fill-rule=\"evenodd\"><circle cx=\"5\" cy=\"12\" r=\"2\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><circle cx=\"19\" cy=\"12\" r=\"2\"></circle></g></svg>\n" +
        "                                </span>\n" +
        "                                <div class=\"d-flex\">\n" +
        "                                    <button class=\"btn btn-danger  deleteico\" onclick='deleteprosdec(this);'><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\n" +
        "                                    <button class=\"btn btn-primary addico mx-sm-1 \" onclick=\"addprosdec(this);\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "\n" +
        "                        </tr>");

    trdbclick (e);
    siralama();
}
function addlastprosdec(e) {
 let tbodyy=$(".processdesc tbody").children();
 if(tbodyy.length !== 0){

     $(".processdesc tbody tr:last-child").after(" <tr ondblclick=\"trdbclick(this);\">\n" +
         "   <td>1</td>\n" +
         "                            <td >\n" +
         "                                <label>\n" +
         "                                    <input type=\"checkbox\" name=\"check\"/><span class=\"label-text\"></span>\n" +
         "                                </label>" +
         "</td>\n" +
         "                            <td><input  class='form-control getvalprdesc_input'  type='text'></td>\n" +
         "                            <td>\n" +
         "                                <span class=\"threedots\">\n" +
         "                                <svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\">\n" +
         "                                    <g fill=\"currentColor\" fill-rule=\"evenodd\"><circle cx=\"5\" cy=\"12\" r=\"2\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><circle cx=\"19\" cy=\"12\" r=\"2\"></circle></g></svg>\n" +
         "                                </span>\n" +
         "                                <div class=\"d-flex\">\n" +
         "                                    <button class=\"btn btn-danger  deleteico\" onclick='deleteprosdec(this);'><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\n" +
         "                                    <button class=\"btn btn-primary addico mx-sm-1 \" onclick=\"addprosdec(this);\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n" +
         "                                </div>\n" +
         "                            </td>\n" +
         "\n" +
         "                        </tr>");


 }else{

     $(".processdesc tbody ").html(" <tr ondblclick=\"trdbclick(this);\">\n" +
         "   <td>1</td>\n" +
         "                            <td >\n" +
         "                                <label>\n" +
         "                                    <input type=\"checkbox\" name=\"check\"/><span class=\"label-text\"></span>\n" +
         "                                </label>" +
         "</td>\n" +
         "                            <td><input  class='form-control getvalprdesc_input'  type='text'></td>\n" +
         "                            <td>\n" +
         "                                <span class=\"threedots\">\n" +
         "                                <svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\">\n" +
         "                                    <g fill=\"currentColor\" fill-rule=\"evenodd\"><circle cx=\"5\" cy=\"12\" r=\"2\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><circle cx=\"19\" cy=\"12\" r=\"2\"></circle></g></svg>\n" +
         "                                </span>\n" +
         "                                <div class=\"d-flex\">\n" +
         "                                    <button class=\"btn btn-danger  deleteico\" onclick='deleteprosdec(this);'><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\n" +
         "                                    <button class=\"btn btn-primary addico mx-sm-1 \" onclick=\"addprosdec(this);\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n" +
         "                                </div>\n" +
         "                            </td>\n" +
         "\n" +
         "                        </tr>");

 }
    trdbclick (e);
    siralama();
}

function deleteprosdec(e) {
    $(e).closest('tr').remove();

    let i=0;
    siralama();
}

//--------------------------------Input Desc table--------------------------------------------------

function deletedesc(e) {
    console.log("fdf")
    $(e).closest('.inputtype').remove();
    Yoxlama();
}
function adddesc(e) {
    $(e).closest(".inputtype").after("<div class=\"inputtype d-flex\" ondblclick='dbclickinpdesc(this);'>\n" +
        "\n" +
        "                                    <div class=\"inpdesp p-1  inp col-8\">\n" +
        "                                        <input type='text' class='form-control inputdesc' >" +
        "                                    </div>\n" +
        "                                    <div class=\"buttons p-1 col-4 \">\n" +
        "                                          <span class=\"threedots\">\n" +
        "                                            <svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\">\n" +
        "                                                <g fill=\"currentColor\" fill-rule=\"evenodd\"><circle cx=\"5\" cy=\"12\" r=\"2\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><circle cx=\"19\" cy=\"12\" r=\"2\"></circle></g></svg>\n" +
        "                                            </span>\n" +
        "                                        <div class=\"d-flex pull-right\">\n" +
        "                                            <button class=\"btn btn-danger  deleteico\" onclick=\"deletedesc(this)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\n" +
        "                                            <button class=\"btn btn-primary addico mx-sm-1 \" onclick=\"adddesc(this);\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "\n" +
        "                                </div>");

    dbclickinpdesc (e);
}

function siralama() {
    let i=0;
    $(".processdesc tbody tr").each(function () {
        i++;
        $(this).children().eq(0).text(i);
    })

}
function dbclickinpdesc (e) {
    console.log("dbclickinpdesc");
let getvalinpdesc= $(e).children(".inpdesp").text().trim();
    console.log(getvalinpdesc+"bu");
$(e).children(".inpdesp ").text("").html("<input type='text' class='form-control inputdesc'  value='"+getvalinpdesc+"'>");
    $(".inputdesc").on('keypress', function (e) {
        if (e.which == 13) {
            // console.log(""$(".inputdesc").val());
            $(this).parent(".inpdesp").text($(".inputdesc").val());
            $(this).remove();

        }
    });

}

function Yoxlama() {


let yoxlamada=$(".inputdesctable tbody tr td:nth-child(4)").text().trim();

    if(yoxlamada == "") {

        $(".AddDescriptionIcon").prop("disabled", false);

   }
}

function AddDescriptionIcon(e) {


        $(".inputdesctable tbody td:nth-child(4)").html("<div class=\"inputtype d-flex\" ondblclick='dbclickinpdesc(this);'>\n" +
            "\n" +
            "                                    <div class=\"inpdesp p-1  inp col-8\">\n" +
            "                                        <input type='text' class='form-control inputdesc' >" +
            "                                    </div>\n" +
            "                                    <div class=\"buttons p-1 col-4 \">\n" +
            "                                          <span class=\"threedots\">\n" +
            "                                            <svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\">\n" +
            "                                                <g fill=\"currentColor\" fill-rule=\"evenodd\"><circle cx=\"5\" cy=\"12\" r=\"2\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><circle cx=\"19\" cy=\"12\" r=\"2\"></circle></g></svg>\n" +
            "                                            </span>\n" +
            "                                        <div class=\"d-flex pull-right\">\n" +
            "                                            <button class=\"btn btn-danger  deleteico\" onclick=\"deletedesc(this)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\n" +
            "                                            <button class=\"btn btn-primary addico mx-sm-1 \" onclick=\"adddesc(this);\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "\n" +
            "                                </div>");

    dbclickinpdesc(e);

    $(".AddDescriptionIcon").prop("disabled", true);
}


$(document).ready( function() {
    $(".inputtype_name").keypress(function(e) {

        // console.log(e.key);
        if (e.which == 13) {
            // console.log("F");
            $(this).parent(".inputtypename").text($(".inputtype_name").val());
            $(this).remove();

        }
    });
    $(".inputdesc").keypress(function(e) {

        // console.log(e.key);
        if (e.which == 13) {
            // console.log("F");
            $(this).parent(".inpdesp ").text($(".inputdesc").val());
            $(this).remove();

        }
    });
});
function dbclickinputname (e) {

    let inputtypename= $(e).children(".inputtypename").text().trim();

    $(e).children(".inputtypename").text("").html("<input type='text' class='form-control inputtype_name'  value='"+inputtypename+"'>");
    $(".inputtype_name").keypress(function(e) {

        // console.log(e.key);
        if (e.which == 13) {
            // console.log("F");
            $(this).parent(".inputtypename").text($(".inputtype_name").val());
            $(this).remove();

        }
    });

}
function Addtrinpitdesv(e) {
$(e).closest("tr").after("   <tr>\n" +
    "                            <td>1</td>\n" +
    "                            <td>\n" +
    "                                <div class=\"p-1  inputtypechecbox\">\n" +
    "                                    <label>\n" +
    "                                        <input type=\"checkbox\" name=\"check\"/><span class=\"label-text\"></span>\n" +
    "                                    </label>\n" +
    "                                 </div>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <div class=\"inputtype d-flex justify-content-between \" ondblclick=\"dbclickinputname(this);\">\n" +
    "\n" +
    "                                    <div class=\"p-1 m-auto inp inputtypename\" >\n" +
    "                                       <input type=\"text\" class=\"form-control inputtype_name\" >\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <div class=\"inputtype d-flex\" ondblclick=\"dbclickinpdesc(this);\">\n" +
    "\n" +
    "                                    <div class=\"inpdesp p-1  inp col-8\">\n" +
    "                                        <input type='text' class='form-control inputdesc' >\n" +
    "                                    </div>\n" +
    "                                    <div class=\"buttons p-1 col-4 \">\n" +
    "                                          <span class=\"threedots\">\n" +
    "                                            <svg width=\"38\" height=\"38\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\">\n" +
    "                                                <g fill=\"currentColor\" fill-rule=\"evenodd\"><circle cx=\"5\" cy=\"12\" r=\"2\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><circle cx=\"19\" cy=\"12\" r=\"2\"></circle></g></svg>\n" +
    "                                            </span>\n" +
    "                                        <div class=\"d-flex pull-right\">\n" +
    "                                            <button class=\"btn btn-danger  deleteico\" onclick=\"deletedesc(this)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\n" +
    "                                            <button class=\"btn btn-primary addico mx-sm-1 \" onclick=\"adddesc(this);\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <div class=\"dropdown\" style=\"display: inline-block;\">\n" +
    "                                    <button class=\"btn newinput dropdown-toggle fa fa-ellipsis-h\" href=\"#\" role=\"button\" id=\"dropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
    "\n" +
    "                                    </button>\n" +
    "\n" +
    "                                    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuLink\">\n" +
    "                                        <button class=\"dropdown-item\" onclick=\"Addtrinpitdesv(this);\">ADD</button>\n" +
    "<!--                                        <button class=\"dropdown-item\" >Another action</button>-->\n" +
    "<!--                                        <button class=\"dropdown-item\" >Something else here</button>-->\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </td>\n" +
    "                        </tr>");
    adddesc(e);
    dbclickinputname(e);
    dbclickinpdesc(e);


    siralama2();
}
// function Yoxlama2() {
//
//
//     let yoxlamada2=$(".inputdesctable tbody tr td:nth-child(1)").text().trim();
//
//     if(yoxlamada2 == "") {
//
//         $(".AddDescriptionIcon").prop("disabled", false);
//
//     }
// }
function siralama2() {
    let i=0;
    $(".inputdesctable tbody tr").each(function () {
        i++;
        $(this).children().eq(0).text(i);
    })

}
//-------------------------------Image upload-------------------------------
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
            $('.example-image-link').attr('href', e.target.result);

            $(".uploader #blah").css("display","block");
        };
        //     .uploader #start.hidden {
        //     display: none;
        // }

        reader.readAsDataURL(input.files[0]);
    }
}
let dey,proid,proname,procode,prodesc;
function EditProjetable(e) {

        // if ($('#txtProjectId').val().trim().length == 0) {
        //     Toaster.showError('Project is not selected!');
        //     return;
        // }
        //
        // if ($('#txtProjectName').val().trim().length == 0) {
        //     Toaster.showError('Project Name is empty!');
        //     return;
        // }



     proid=$(e).closest("tr").attr("id").substr(4);
 proname=$(e).closest("tr").children().eq(1).text().trim();
     procode=$(e).closest("tr").children().eq(2).text().trim();
     prodesc=$(e).closest("tr").children().eq(3).text().trim();
console.log(procode+" procode");
    $(e).closest("tr").children().eq(1).html("<input class='form-control proinput1' value='"+proname+"' >");
    $(e).closest("tr").children().eq(2).html("<input class='form-control proinput2'  value='"+procode+"' >");
    $(e).closest("tr").children().eq(3).html("<input class='form-control proinput3'  value='"+prodesc+"' >");
    dey="a";
console.log(dey);
    $(".proinput1").keypress(function(e) {

        // console.log(e.key);
        if (e.which == 13) {
            // console.log("F");
            proname= $(this).parent().text($(".proinput1").val());
            proname=proname.text();
            $(this).remove();
             dey="e";
console.log(proname);
            if(dey ==  "e"){
                console.log("deyisenedir");

                console.log(dey);
                Updaterow();
            }
        }



    });
    $(".proinput2").keypress(function(e) {

        // console.log(e.key);
        if (e.which == 13) {
            // console.log("F");
            procode= $(this).parent().text($(".proinput2").val());
            procode=procode.text();
            $(this).remove();
            dey="e";
            if(dey ==  "e"){
                console.log("deyisenedir");

                console.log(dey);
                Updaterow();
            }
        }



    });
    $(".proinput3").keypress(function(e) {

        // console.log(e.key);
        if (e.which == 13) {
            // console.log("F");
            prodesc= $(this).parent().text($(".proinput3").val());
            prodesc=prodesc.text();
            $(this).remove();
            dey="e";
            if(dey ==  "e"){
                console.log("deyisenedir");

                console.log(dey);
                Updaterow();
            }
        }



    });


}
function Updaterow() {
    var purpose = ""; //this.getPurposeList();

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.id = proid;
    json.kv.projectName =proname;
    json.kv.projectCode = procode;
    json.kv.description = prodesc;
    json.kv.purpose = purpose;
    var that = this;
    var data = JSON.stringify(json);
    console.log(proid+" proid",proname+" proname",procode+" procode",prodesc+" prodesc");
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmUpdateProject",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            // console.log(res.kv);
            console.log(proid+" proid",proname+" proname",procode+" procode",prodesc+" prodesc");
            // Toaster.showError('Operation is completed successfully.');
            GetProjelist();
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}
function DeleteProjetable(e) {
    if (!confirm("Are you sure?")) {
        return;
    }

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    proid=$(e).closest("tr").attr("id").substr(4);
    console.log(proid);
    json.kv.id = proid;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmDeleteProject",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
console.log(res);
            GetProjelist();
        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });


}

function Insertproje () {
    if ($('#txtProjectName').val().trim().length == 0) {
        Toaster.showError("Please enter project name");
        return;
    }
    var purpose = ""; //this.getPurposeList();

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.projectName = $('#txtProjectName').val();
    json.kv.projectCode = $('#txtProjectCode').val();
    json.kv.description = $('#txtProjectDescription').val();
    json.kv.purpose = purpose;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmInsertNewProject",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            GetProjelist();

        },
        error: function () {
            Toaster.showError(('somethingww'));
        }
    });
}

function GetProjelist() {

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.asc = "projectName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function () {
                showProgress();
            },
            success: function (ress) {
            if(ress.length=="0"){
                $('.projetable tbody ').html("");
            }else {
                $('.projetable tbody tr').remove();
                // console.log( res);
                let res = ress.tbl[0].r;
                $.each(res, function (i, item) {
                    $('<tr  id="row_' + replaceTags(res[i].id) + '"    >').html("<td >" + (i + 1) + "</td>"
                        + "<td>" + replaceTags(res[i].projectName) + "</td>"
                        + "<td>" + replaceTags(res[i].projectCode) + "</td>"
                        + "<td>" + replaceTags(res[i].description) + "</td><td><div class='dropdown' style='display: inline-block;'>\n" +
                        "                                <button class='btn newin dropdown-toggle fa fa-ellipsis-h' href='#' role='button'\n" +
                        "                                        id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true'\n" +
                        "                                        aria-expanded='false'>\n" +
                        "                                </button>\n" +
                        "\n" +
                        "                                <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>\n" +
                        "                                    <button class='dropdown-item' onclick='EditProjetable(this)' >Edit</button>\n" +
                        "                                    <button class='dropdown-item'  onclick='DeleteProjetable(this)'>Delete</button>\n" +
                        "                                </div>\n" +
                        "                            </div></td>").appendTo('.projetable tbody');
                });
                hideProgress();
            }
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });


}