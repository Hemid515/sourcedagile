/*function redFnc(e){
    e.parentNode.style.backgroundColor = "red";
    e.parentNode.style.color = "white";
}
function blueFnc(e){
    e.parentNode.style.backgroundColor = "blue";
    e.parentNode.style.color = "white";
}
function yellowFnc(e){
    e.parentNode.style.backgroundColor = "yellow";
    e.parentNode.style.color = "black";
}
function blackFnc(e){
    e.parentNode.style.backgroundColor = "black";
    e.parentNode.style.color = "white";
}
function whiteFnc(e){
    e.parentNode.style.backgroundColor = "white";
    e.parentNode.style.color = "black";
}
function purpleFnc(e){
    e.parentNode.style.backgroundColor = "purple";
    e.parentNode.style.color = "white";
}
function grayFnc(e){
    e.parentNode.style.backgroundColor = "gray";
    e.parentNode.style.color = "white";
}
function orangeFnc(e){
    e.parentNode.style.backgroundColor = "orange";
    e.parentNode.style.color = "black";
}
function greenFnc(e){
    e.parentNode.style.backgroundColor = "green";
    e.parentNode.style.color = "white";
};

function setTitle(el) {
    var titleInput = $(el).val();
    var titleText = document.createElement('p');
    $(titleText).attr("ondblclick", "convert2Edit(this)");
    titleText.innerText = titleInput;
    $(el).closest('div').append(titleText);
    $(el).remove();
  }
  
  
  
  
  function convert2Edit(e) {
    var inp = $('<input style="width:100%"   onchange="setTitle(this,\'name\')" \n\
      type="text" value="' + $(e).html() + '">');
    $(e).closest('div').append(inp);
    $(e).remove();
    inp.focus();
  }
  
  
  function convert2Edit2(e2) {
    var inp2 = $('<input class="line_input" onchange="setTitle2(this,\'name\')" \n\
              type="text" value="' + $(e2).text() + '">');
    $(e2).closest('div').append(inp2);
    $(e2).remove();
    inp2.focus();
  }
  function setTitle2(el2) {
    var titleInput2 = $(el2).val();
    var titleText2 = document.createElement('p');
    titleText2.className = "line_text";
    $(titleText2).attr("ondblclick", "convert2Edit2(this)");
    titleText2.innerText = titleInput2;
    $(this).prev().append(titleText2);
    $(el2).remove();
  };
  
  $('.itemInput').hide();
  function showTitleInput() {
    $('.itemInput').show();
  }

  $('.line_input').hide();
  function getLineDiv() {
    var id = makeId(10);
    console.log(id);
    var line = document.createElement('div');
    line.className = "line";
    line.id = id;
    var lineInput = line.appendChild(document.createElement('input'));
    lineInput.placeholder = "Add content..."
    lineInput.addEventListener("change", setTitle2)
    lineInput.type = "text";
    lineInput.className = "line_input";
    $('.container').append(line); 
    return id;
  }
  
  
  
  
  
  
  function adjustLine(from, to, line) {
    var fT = from.offsetTop + from.offsetHeight / 2;
    var tT = to.offsetTop + to.offsetHeight / 2;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;
  
    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);
  
    if (tT > fT) {
      var top = (tT - fT) / 2 + fT;
    } else {
      var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
      var left = (tL - fL) / 2 + fL;
    } else {
      var left = (fL - tL) / 2 + tL;
    }
  
    if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
      ANG *= -1;
    }
    top -= H / 2;
  
    line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-transform"] = 'rotate(' + ANG + 'deg)';
    line.style.top = top + 'px';
    line.style.left = left + 'px';
    line.style.height = H + 'px';
  }
  
  
  

  


$(document).ready(function () {*/
    
    //Buttons JQuery
    /*plus-btn LAYOUT ADDER BUTTON FUNCTION */
   /* var bgDivBox = document.querySelector('#div_box');
    var bgDivLayout = document.querySelector('.bg_div_layout');
    $('#circle-btn').css("cursor", "not-allowed");
    $('#diamond-btn').css("cursor", "not-allowed");
    $('#square-btn').css("cursor", "not-allowed");

    $('#circle-btn').css("opacity", "0.5");
    $('#diamond-btn').css("opacity", "0.5");
    $('#square-btn').css("opacity", "0.5");

    $("#plus-btn").click(function () {
        var newDivLayout = bgDivBox.appendChild(document.createElement("div"));
        //newDivLayout.id = makeId(10);
        newDivLayout.className = "bg_div_layout";
        if (newDivLayout.classList !== 'bordered') {
            $('#circle-btn').css("cursor", "not-allowed");
            $('#diamond-btn').css("cursor", "not-allowed");
            $('#square-btn').css("cursor", "not-allowed");

            $('#circle-btn').css("opacity", "0.5");
            $('#diamond-btn').css("opacity", "0.5");
            $('#square-btn').css("opacity", "0.5");

        }*/
        /* Make A BORDERED DIV BLOCK */

       /* $(newDivLayout).click(function () {
            $(this).toggleClass("bordered");
            $(this).siblings().removeClass('bordered');
        })
        if (newDivLayout.className !== 'bordered') {
            $('#circle-btn').css("cursor", "pointer");
            $('#diamond-btn').css("cursor", "pointer");
            $('#square-btn').css("cursor", "pointer");

            $('#circle-btn').css("opacity", "1");
            $('#diamond-btn').css("opacity", "1");
            $('#square-btn').css("opacity", "1");
        }



        var newDivLayoutInput = newDivLayout.appendChild(document.createElement("input"));
        newDivLayout.type = "text";
        newDivLayoutInput.placeholder = "Title required..."
        newDivLayoutInput.className = "bg_div_title";
        var layoutBtn = newDivLayout.appendChild(document.createElement("button"));
        layoutBtn.className = "confirmClass";
        layoutBtn.textContent = "✓";
        $("input,h5,button").disableSelection();*/
        /*Confirm Button Zone TITLE*/
        /*$(".confirmClass").click(function () {
            $(this).parent().append('<h5>' + newDivLayoutInput.value + '</h5>');
            $(this).hide();
            $(this).prev().hide();
        })
    });
    $(".bg_div_layout").resizable();
    /*---------------------FUNCTION--------------------------*/


    /*square Button Function */
    /*$('#square-btn').click(function () {
        $(".bordered").append(`
        <div class="squareClass drsElement drsMoveHandle">
                 <div class="bars">&#11004</div>
                 <input type="text" onchange="setTitle(this)"
                 onclick="removeDraggable(this)" placeholder="" class="itemInput"/>
                 <button class="connect_to"><i class="fas fa-chart-line"></i></button>
                 <button class="to_connect"><i class="fas fa-crosshairs"></i></button>
                 <button class="color_in"><i class="fas fa-palette"></i></button>
                 <button onclick="redFnc(this)" class="red_btn"></button>
                 <button onclick="greenFnc(this)" class="green_btn"></button>
                 <button onclick="yellowFnc(this)" class="yellow_btn"></button>
                 <button onclick="blueFnc(this)" class="blue_btn"></button>
                 <button onclick="purpleFnc(this)" class="purple_btn"></button>
                 <button onclick="grayFnc(this)" class="gray_btn"></button>
                 <button onclick="blackFnc(this)" class="black_btn"></button>
                 <button onclick="orangeFnc(this)" class="orange_btn"></button>
                 <button onclick="whiteFnc(this)" class="white_btn"></button>
        </div>`);

        
      //  $('.squareClass').draggable();
         /*for (i = 0; i < dragShape.length; i++) {
             var draggable = new PlainDraggable(dragShape[i], {
                 cancel: this.childNodes
             });
         };*/
       /*     $('.red_btn').hide();
            $('.green_btn').hide();
            $('.white_btn').hide();
            $('.yellow_btn').hide();
            $('.blue_btn').hide();
            $('.purple_btn').hide();
            $('.gray_btn').hide();
            $('.black_btn').hide();
            $('.orange_btn').hide();
            $('.connect_to').hide();
            $('.to_connect').hide();
            $('.color_in').hide();
            $('.bars').hover(function () {
                $(this).next().show();
                $(this).next().next().show();
                $(this).next().next().next().show();
                $(this).next().next().next().next().show();
            });



        $('.itemInput').change(function () {
            var titleInput = this.value;
            var titleText = document.createElement('p');
            $(titleText).attr("ondblclick", "convert2Edit(this)");
            this.parentNode.appendChild(titleText);
            titleText.innerText = titleInput;
            console.log(titleText)
            $(this).hide();
        });

       //CONNECT TO WRITE HERE !!!
       var general = {
        connected: false,
        from: "",
      }
      
      
      $('.connect_to').click(function () {
        $('.to_connect').show();
        general.connected = true;
        general.from = this.parentNode;
        console.log('Selected From')
      });
      
      
      $('.to_connect').click(function () {
        $(this).hide();
        if (general.connected == true) {
          var to;
          to = this.parentNode;
      
          var lineId = getLineDiv();
          var line = document.getElementById(lineId);
          console.log("Selected To");
          adjustLine(general.from, to, line);
          $('.line_input').show();
          $('.squareClass,.rombClass,.circleClass').draggable({
            drag: function () {
              adjustLine(general.from, to, line);
            }
          });
        }
        
      });
       /******************************************************** */

       /* $('.color_in').click(function(){
            $(this).nextAll().show()        
        });
        $('.red_btn,.blue_btn,.gray_btn,.orange_btn,.purple_btn,.black_btn,.white_btn,.yellow_btn,.green_btn').click(function () { 
            $('.red_btn').hide();
            $('.red_btn').nextAll().hide();
        });
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        /*$('.squareClass').resizable({
            // alsoResize: ".bordered",
            grid: 20
        });*/
    /*});


    /*---------------------FUNCTION--------------------------*/
    /*romb Button Function */
  /*  $('#diamond-btn').click(function () {
        $(".bordered").append(`
        <div id="rombItem" class="rombClass drsElement drsMoveHandle">
            <div class="bars">&#11004</div>
            <input type="text" onchange="setTitle(this)"
            onclick="removeDraggable(this)" placeholder="" class="itemInput"/>
            <button class="connect_to"><i class="fas fa-chart-line"></i></button>
            <button class="to_connect"><i class="fas fa-crosshairs"></i></button>
            <button class="color_in"><i class="fas fa-palette"></i></button>
            <button onclick="redFnc(this)" class="red_btn"></button>
            <button onclick="greenFnc(this)" class="green_btn"></button>
            <button onclick="yellowFnc(this)" class="yellow_btn"></button>
            <button onclick="blueFnc(this)" class="blue_btn"></button>
            <button onclick="purpleFnc(this)" class="purple_btn"></button>
            <button onclick="grayFnc(this)" class="gray_btn"></button>
            <button onclick="blackFnc(this)" class="black_btn"></button>
            <button onclick="orangeFnc(this)" class="orange_btn"></button>
            <button onclick="whiteFnc(this)" class="white_btn"></button>
        </div>
`);
        $('.rombClass').draggable();
        //var dragShape = document.getElementsByClassName('rombClass')

        /*for (i = 0; i < dragShape.length; i++) {
          new PlainDraggable(dragShape[i]);
        }*/
       /* $('.red_btn').hide();
        $('.green_btn').hide();
        $('.white_btn').hide();
        $('.yellow_btn').hide();
        $('.blue_btn').hide();
        $('.purple_btn').hide();
        $('.gray_btn').hide();
        $('.black_btn').hide();
        $('.orange_btn').hide();
        $('.connect_to').hide();
        $('.to_connect').hide();
        $('.color').hide();
        $('.bars').hover(function () {
            $(this).next().show();
            $(this).next().next().show();
            $(this).next().next().next().show();
            $(this).next().next().next().next().show();
        });
        //CONNECT TO WRITE HERE !!
        
        $('.color_in').click(function(){
            $(this).nextAll().show();
        });

        /*  $( ".rombClass" ).draggable({
             // snap: ".bg_div_layout",
             // snapMode: "inner",
              grid: [ 5, 5 ]});
          $('.bg_div_layout').resizable();
      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * */
      /*  $('.rombClass').resizable({
            alsoResize: ".bordered",
            grid: 20
        });
    })
    /*---------------------FUNCTION--------------------------*/
    /*circle Button Function */
   /* $('.color_in').click(function(){
        $(this).nextAll().show();
    });

    $('#circle-btn').click(function () {
        $(".bordered").append(`
        <div id="circleItem" class="circleClass shape">
            <div class="bars">&#11004</div>
            <input type="text" onchange="setTitle(this)"
            onclick="removeDraggable(this)" placeholder="" class="itemInput"/>
            <button class="connect_to"><i class="fas fa-chart-line"></i></button>
            <button class="to_connect"><i class="fas fa-crosshairs"></i></button>
            <button class="color_in"><i class="fas fa-palette"></i></button>
            <button onclick="redFnc(this)" class="red_btn"></button>
            <button onclick="greenFnc(this)" class="green_btn"></button>
            <button onclick="yellowFnc(this)" class="yellow_btn"></button>
            <button onclick="blueFnc(this)" class="blue_btn"></button>
            <button onclick="purpleFnc(this)" class="purple_btn"></button>
            <button onclick="grayFnc(this)" class="gray_btn"></button>
            <button onclick="blackFnc(this)" class="black_btn"></button>
            <button onclick="orangeFnc(this)" class="orange_btn"></button>
            <button onclick="whiteFnc(this)" class="white_btn"></button>
        </div>`);

        $('.circleClass').draggable();
       // var dragShape = document.getElementsByClassName('circleClass')

        $('.red_btn').hide();
        $('.green_btn').hide();
        $('.white_btn').hide();
        $('.yellow_btn').hide();
        $('.blue_btn').hide();
        $('.purple_btn').hide();
        $('.gray_btn').hide();
        $('.black_btn').hide();
        $('.orange_btn').hide();
        $('.connect_to').hide();
        $('.to_connect').hide();
        $('.color_in').hide();
        $('.bars').hover(function () {
            $(this).next().show();
            $(this).next().next().show();
            $(this).next().next().next().show();
            $(this).next().next().next().next().show();
        });
    
        
        //$('.bg_div_layout').sortable();
        /* $( ".circleClass" ).draggable({
            // snap: ".bg_div_layout",
             //snapMode: "inner",
             grid: [ 5, 5 ] 
             });*/
       /* $('.bg_div_layout').resizable();
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * */
       /* $('.circleClass').resizable({
            alsoResize: ".bordered",
            grid: 20
        });
    })
    $('.rombClass').resizable({
        // alsoResize: ".bg_div_layout",
        grid: 20
    });
    $('.squareClass').resizable({
        // alsoResize: ".bg_div_layout",
        grid: 20
    });
    $('.circleClass').resizable({
        // alsoResize: ".bordered",
        grid: 20
    });

    $("#div_box").sortable({ cursor: 'grabbing'});
    $("#div_box").disableSelection();

    /***********************************************/








/*});


/*function setTitle(el) {
    var titleInput = $(el).val();
    var titleText = document.createElement('p');
    $(titleText).attr("ondblclick", "convert2Edit(this)");
    titleText.innerText = titleInput;
    $(el).closest('div').append(titleText);
    $(el).remove();
}
/*function removeDraggable(el) {
    $(this).draggable({disabled : true})
}*/
/*function convert2Edit(e) {
    var inp = $('<input style="width:100%;background-color: rgba(0, 0, 0, 0);"   onchange="setTitle(this,\'name\')" \n\
    type="text" value="' + $(e).html() + '">');
    $(e).closest('div').append(inp);
    $(e).remove();
    inp.focus();
}*/
