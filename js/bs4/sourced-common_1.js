/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*global global_var, SAInput*/

function getToken() {
    return "apdtok=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.8CfCKDDkN5bDj_WgmUCxtKfkVe7Dg2kqqyRy6sVRXUed_ZjjZ0z7aA.Nv3dDqtYh2RtnQNwjkZTiQ.RjH9tmSc8KO623BW5nUU9QPv9oNwih7kgMHi30vOdR43SU1Oy7JGLHD8lvgeRDMwkiYWgv-IkZoM8K-DnA492ufzFd7IwNdvAWoze7DR2fEbJfwywZ-3RkwHQogctezvb9GaKSAF17y_Pga5pyBU9IQoTdsSZoa9q7WjlszN2V8.ewgirI-uoJfcQI9rJ1YbNw"
}

function check() {
    hideAlert();
    hideAlertLogin();
    //                progresBarStart();
    var domain = $('#domain').val();
    var username = $('#cUsername').val();
    var password = $('#cPassword').val();
    if (!domain || !username || !password) {
        showAlertLogin();
        return;
    }
    var lang = $('#lang').find(":selected").val();
    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.username = username;
    json.kv.password = password;
    json.kv.domain = domain;
    json.kv.lang = lang;
    var data = JSON.stringify(json);
    //console.log(data);

    $.ajax({
        url: urlGl + "api/post/login",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        success: function () {
            //                        progresBarStop();
//            document.location = "app1.html";
        },
        error: function (res, status) {
            //                        progresBarStop();
            showAlert();
        }
    });
    return false;
}



var CanvasDesign = {
    "ComponentCSSId": "gui_input_css_style_canvas",
    init: function () {
        CanvasDesign.General.BackgroundColor();
        CanvasDesign.General.BackgroundImage();
        CanvasDesign.General.Width();
        CanvasDesign.General.Height();
        CanvasDesign.DeleteEmptyLines();
        new UserStory().setGUICanvasContent();
    },
    read: function () {
        CanvasDesign.General.ToBackgroundColor();
        CanvasDesign.General.ToBackgroundImage();
        CanvasDesign.General.ToWidth();
        CanvasDesign.General.ToHeight();
    },
    DeleteEmptyLines: function () {
        var c = $('#' + CanvasDesign.ComponentCSSId).val();
        var st = "";
        var r = c.split(/\r*\n/);
        for (var i = 0; i < r.length; i++) {
            if (r[i].trim().length === 0) {
                continue;
            }
            st += r[i].trim() + "\n";
        }
        $('#' + CanvasDesign.ComponentCSSId).val(st);
    },
    "General": {
        ToBackgroundColor: function () {
            var tag = "##background-color"
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var st = CanvasDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_cnvs_backgroundcolor').val(val);
                    $('#cb_gui_prop_cnvs_backgroundcolor').prop('checked', true);
                    $('#gui_prop_cnvs_backgroundcolor').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_cnvs_backgroundcolor').prop('checked', false);
                    $('#gui_prop_cnvs_backgroundcolor').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_cnvs_backgroundcolor').prop('checked', false);
                $('#gui_prop_cnvs_backgroundcolor').attr('disabled', true);
                $('#gui_prop_cnvs_backgroundcolor').val('');
            }
        },
        BackgroundColor: function () {
            var tag = "##background-color"
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cnvs_backgroundcolor').val();
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_cnvs_backgroundcolor').is(":checked")) {
                if (c.includes(tag)) {
                    var st = CanvasDesign.UpdateTag(c, tag, t);
                    $('#' + CanvasDesign.ComponentCSSId).val(st);
                } else {
                    var st = CanvasDesign.UpdateTag(c, tag, t);
                    $('#' + CanvasDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = CanvasDesign.UpdateTag(c, tag, '');
                $('#' + CanvasDesign.ComponentCSSId).val(st);
            }
        },
        ToBackgroundImage: function () {
            var tag = "##background-image"
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var st = CanvasDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_cnvs_backgroundimage').attr('fname', val);
                    $('#cb_gui_prop_cnvs_backgroundimage').prop('checked', true);
                    $('#gui_prop_cnvs_backgroundimage').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_cnvs_backgroundimage').prop('checked', false);
                    $('#gui_prop_cnvs_backgroundimage').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_cnvs_backgroundimage').prop('checked', false);
                $('#gui_prop_cnvs_backgroundimage').attr('disabled', true);
                $('#gui_prop_cnvs_backgroundimage').attr('fname', '');
            }
        },
        BackgroundImage: function () {
            var tag = "##background-image"
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cnvs_backgroundimage').attr('fname');
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_cnvs_backgroundimage').is(":checked")) {
                if (c.includes(tag)) {
                    var st = CanvasDesign.UpdateTag(c, tag, t);
                    $('#' + CanvasDesign.ComponentCSSId).val(st);
                } else {
                    var st = CanvasDesign.UpdateTag(c, tag, t);
                    $('#' + CanvasDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = CanvasDesign.UpdateTag(c, tag, '');
                $('#' + CanvasDesign.ComponentCSSId).val(st);
            }
        },
        ToWidth: function () {
            var tag = "##max-width"
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var st = CanvasDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cnvs_generalwidth').val(val);
                } else {
                    $('#gui_prop_cnvs_generalwidth').val('');
                }
            } catch (e) {
                $('#gui_prop_cnvs_generalwidth').val('');
            }
        },
        Width: function () {
            var tag = "##max-width"
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cnvs_generalwidth').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = CanvasDesign.UpdateTag(c, tag, t);
                $('#' + CanvasDesign.ComponentCSSId).val(st);
            } else {
                var st = CanvasDesign.UpdateTag(c, tag, t);
                $('#' + CanvasDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToHeight: function () {
            var tag = "##height"
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var st = CanvasDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cnvs_generalheight').val(val);
                } else {
                    $('#gui_prop_cnvs_generalheight').val('');
                }
            } catch (e) {
                $('#gui_prop_cnvs_generalheight').val('');
            }
        },
        Height: function () {
            var tag = "##height";
            var c = $('#' + CanvasDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cnvs_generalheight').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = CanvasDesign.UpdateTag(c, tag, t);
                $('#' + CanvasDesign.ComponentCSSId).val(st);
            } else {
                var st = CanvasDesign.UpdateTag(c, tag, t);
                $('#' + CanvasDesign.ComponentCSSId).val(t + '\n' + c);
            }

        }

    },
    DeleteTag: function (text, tag) {
        if (text.includes(tag)) {

            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            var st = text.substring(n1, (n2 + 1));
            text = text.replace(st, '');
        }
        return text;
    },
    UpdateTag: function (text, tag, val) {
        if (text.includes(tag)) {

            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            var st = text.substring(n1, (n2 + 1));
            text = text.replace(st, val);
        }
        return text;
    },
    GetTagLine: function (text, tag) {
        var st = '';
        try {
            if (text.includes(tag)) {
                var n1 = text.indexOf(tag);
                var n2 = text.indexOf(";", n1);
                st = text.substring(n1 + 2, n2);
            }
        } catch (err) {
        }
        return st;
    }

}


var ComponentDesign = {
    "ComponentCSSId": "gui_input_css_style",
    init: function () {
        ComponentDesign.General.BackgroundColor();
        ComponentDesign.General.Width();
        ComponentDesign.General.Height();
        ComponentDesign.General.Opacity();
        ComponentDesign.General.Horizontal();
//        ComponentDesign.General.Vertical();

        ComponentDesign.Font.FontColor();
        ComponentDesign.Font.FontFamily();
        ComponentDesign.Font.FontSize();
        ComponentDesign.Font.Bold();
        ComponentDesign.Font.Italic();
        ComponentDesign.Border.BorderColor();
        ComponentDesign.Border.BorderStyle();
        ComponentDesign.Border.Width();
        ComponentDesign.Border.Radius();
        ComponentDesign.Padding.All();
        ComponentDesign.Margin.All();
        ComponentDesign.Shadow.All();
        ComponentDesign.DeleteEmptyLines();
        new UserStory().setGUIComponentContent();
    },
    read: function () {
        ComponentDesign.General.ToBackgroundColor();
        ComponentDesign.General.ToWidth();
        ComponentDesign.General.ToHeight();
        ComponentDesign.General.ToOpacity();
        ComponentDesign.General.ToHorizontal();
//        ComponentDesign.General.Vertical();
//
        ComponentDesign.Font.ToFontColor();
        ComponentDesign.Font.ToFontFamily();
        ComponentDesign.Font.ToFontSize();
        ComponentDesign.Font.ToBold();
        ComponentDesign.Font.ToItalic();
        ComponentDesign.Border.ToBorderColor();
        ComponentDesign.Border.ToBorderStyle();
        ComponentDesign.Border.ToWidth();
        ComponentDesign.Border.ToRadius();
        ComponentDesign.Padding.ToTop();
        ComponentDesign.Padding.ToLeft();
        ComponentDesign.Padding.ToBottom();
        ComponentDesign.Padding.ToRight();
        ComponentDesign.Margin.ToTop();
        ComponentDesign.Margin.ToLeft();
        ComponentDesign.Margin.ToBottom();
        ComponentDesign.Margin.ToRight();
        ComponentDesign.Shadow.ToAll();
    },
    DeleteEmptyLines: function () {
        var c = $('#' + ComponentDesign.ComponentCSSId).val();
        var st = "";
        var r = c.split(/\r*\n/);
        for (var i = 0; i < r.length; i++) {
            if (r[i].trim().length === 0) {
                continue;
            }
            st += r[i].trim() + "\n";
        }
        $('#' + ComponentDesign.ComponentCSSId).val(st);
    },
    "General": {
        ToBackgroundColor: function () {
            var tag = "##background-color"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_in_backgroundcolor').val(val);
                    $('#cb_gui_prop_in_backgroundcolor').prop('checked', true);
                    $('#gui_prop_in_backgroundcolor').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_in_backgroundcolor').prop('checked', false);
                    $('#gui_prop_in_backgroundcolor').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_in_backgroundcolor').prop('checked', false);
                $('#gui_prop_in_backgroundcolor').attr('disabled', true);
                $('#gui_prop_in_backgroundcolor').val('');
            }
        },
        BackgroundColor: function () {
            var tag = "##background-color"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_backgroundcolor').val();
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_in_backgroundcolor').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(st);
                } else {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, '');
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            }
        },
        ToWidth: function () {
            var tag = "##width"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_generalwidth').val(val);
                } else {
                    $('#gui_prop_in_generalwidth').val('');
                }
            } catch (e) {
                $('#gui_prop_in_generalwidth').val('');
            }
        },
        Width: function () {
            var tag = "##width"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_generalwidth').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToHeight: function () {
            var tag = "##height"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_generalheight').val(val);
                } else {
                    $('#gui_prop_in_generalheight').val('');
                }
            } catch (e) {
                $('#gui_prop_in_generalheight').val('');
            }
        },
        Height: function () {
            var tag = "##height";
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_generalheight').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToOpacity: function () {
            var tag = "##opacity"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_opacity').val(val);
                } else {
                    $('#gui_prop_in_opacity').val('');
                }
            } catch (e) {
                $('#gui_prop_in_opacity').val('');
            }
        },
        Opacity: function () {
            var tag = "##opacity";
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_opacity').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToHorizontal: function () {
            var tag = "##text-align"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_horizontalposition').val(val);
                } else {
                    $('#gui_prop_in_horizontalposition').val('');
                }
            } catch (e) {
                $('#gui_prop_in_horizontalposition').val('');
            }
        },
        Horizontal: function () {
            var tag = "##text-align";
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_horizontalposition').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
    },
    "Font": {
        ToFontColor: function () {
            var tag = "##color"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_in_fontcolor').val(val);
                    $('#cb_gui_prop_in_fontcolor').prop('checked', true);
                    $('#gui_prop_in_fontcolor').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_in_fontcolor').prop('checked', false);
                    $('#gui_prop_in_fontcolor').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_in_fontcolor').prop('checked', false);
                $('#gui_prop_in_fontcolor').attr('disabled', true);
                $('#gui_prop_in_fontcolor').val('');
            }
        },
        FontColor: function () {
            var tag = "##color"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_fontcolor').val();
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_in_fontcolor').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(st);
                } else {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, '');
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            }
        },
        ToFontFamily: function () {
            var tag = "##font-family"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_font').val(val);
                } else {
                    $('#gui_prop_in_font').val('');
                }
            } catch (e) {
                $('#gui_prop_in_font').val('');
            }
        },
        FontFamily: function () {
            var tag = "##font-family"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_font').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToFontSize: function () {
            var tag = "##font-size"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_fontsize').val(val);
                } else {
                    $('#gui_prop_in_fontsize').val('');
                }
            } catch (e) {
                $('#gui_prop_in_fontsize').val('');
            }
        },
        FontSize: function () {
            var tag = "##font-size";
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_fontsize').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToBold: function () {
            var tag = "##font-weight"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#cb_gui_prop_in_fontstylebold').prop('checked', true);
                } else {
                    $('#cb_gui_prop_in_fontstylebold').prop('checked', false);
                }
            } catch (e) {
                $('#cb_gui_prop_in_fontstylebold').prop('checked', false);
            }
        },
        Bold: function () {
            var tag = "##font-weight";
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#cb_gui_prop_in_fontstylebold').is(':checked') ? 'bold' : '';
            var t = (v) ? tag + ":" + v + ';' : "";
            if ($('#cb_gui_prop_in_fontstylebold').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(st);
                } else {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, '');
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            }

        },
        ToItalic: function () {
            var tag = "##font-style"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#cb_gui_prop_in_fontstyleitalic').prop('checked', true);
                } else {
                    $('#cb_gui_prop_in_fontstyleitalic').prop('checked', false);
                }
            } catch (e) {
                $('#cb_gui_prop_in_fontstyleitalic').prop('checked', false);
            }
        },
        Italic: function () {
            var tag = "##font-style";
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#cb_gui_prop_in_fontstyleitalic').is(':checked') ? 'italic' : '';
            var t = (v) ? tag + ":" + v + ';' : "";
            if ($('#cb_gui_prop_in_fontstyleitalic').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(st);
                } else {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, '');
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            }

        },
    },
    "Border": {
        ToBorderColor: function () {
            var tag = "##border-color"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_in_bordercolor').val(val);
                    $('#cb_gui_prop_in_bordercolor').prop('checked', true);
                    $('#gui_prop_in_bordercolor').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_in_bordercolor').prop('checked', false);
                    $('#gui_prop_in_bordercolor').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_in_bordercolor').prop('checked', false);
                $('#gui_prop_in_bordercolor').attr('disabled', true);
                $('#gui_prop_in_bordercolor').val('');
            }
        },
        BorderColor: function () {
            var tag = "##border-color"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_bordercolor').val();
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_in_bordercolor').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(st);
                } else {
                    var st = ComponentDesign.UpdateTag(c, tag, t);
                    $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, '');
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            }
        },
        ToWidth: function () {
            var tag = "##border-width"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_borderwidth').val(val);
                } else {
                    $('#gui_prop_in_borderwidth').val('');
                }
            } catch (e) {
                $('#gui_prop_in_borderwidth').val('');
            }
        },
        Width: function () {
            var tag = "##border-width"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_borderwidth').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToRadius: function () {
            var tag = "##border-radius"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_borderradius').val(val);
                } else {
                    $('#gui_prop_in_borderradius').val('');
                }
            } catch (e) {
                $('#gui_prop_in_borderradius').val('');
            }
        },
        Radius: function () {
            var tag = "##border-radius"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_borderradius').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToBorderStyle: function () {
            var tag = "##border-style"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_borderstyle').val(val);
                } else {
                    $('#gui_prop_in_borderstyle').val('');
                }
            } catch (e) {
                $('#gui_prop_in_borderstyle').val('');
            }
        },
        BorderStyle: function () {
            var tag = "##border-style";
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v = $('#gui_prop_in_borderstyle').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
    },

    "Padding": {
        ToTop: function () {
            var tag = "##padding-top"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_paddingtop').val(val);
                } else {
                    $('#gui_prop_in_paddingtop').val('');
                }
            } catch (e) {
                $('#gui_prop_in_paddingtop').val('');
            }
        },
        All: function () {
            ComponentDesign.Padding.Top();
            ComponentDesign.Padding.Bottom();
            ComponentDesign.Padding.Left();
            ComponentDesign.Padding.Right();
        },
        Top: function () {
            var tag = "##padding-top"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_paddingtop').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToBottom: function () {
            var tag = "##padding-bottom"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_paddingbottom').val(val);
                } else {
                    $('#gui_prop_in_paddingbottom').val('');
                }
            } catch (e) {
                $('#gui_prop_in_paddingbottom').val('');
            }
        },
        Bottom: function () {
            var tag = "##padding-bottom"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_paddingbottom').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToLeft: function () {
            var tag = "##padding-left"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_paddingleft').val(val);
                } else {
                    $('#gui_prop_in_paddingleft').val('');
                }
            } catch (e) {
                $('#gui_prop_in_paddingleft').val('');
            }
        },
        Left: function () {
            var tag = "##padding-left"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_paddingleft').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToRight: function () {
            var tag = "##padding-right"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_paddingright').val(val);
                } else {
                    $('#gui_prop_in_paddingright').val('');
                }
            } catch (e) {
                $('#gui_prop_in_paddingright').val('');
            }
        },
        Right: function () {
            var tag = "##padding-right"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_paddingright').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
    },
    "Margin": {
        ToTop: function () {
            var tag = "##margin-top"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_margintop').val(val);
                } else {
                    $('#gui_prop_in_margintop').val('');
                }
            } catch (e) {
                $('#gui_prop_in_margintop').val('');
            }
        },
        All: function () {
            ComponentDesign.Margin.Top();
            ComponentDesign.Margin.Bottom();
            ComponentDesign.Margin.Left();
            ComponentDesign.Margin.Right();
        },
        Top: function () {
            var tag = "##margin-top"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_margintop').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToBottom: function () {
            var tag = "##margin-bottom"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_marginbottom').val(val);
                } else {
                    $('#gui_prop_in_marginbottom').val('');
                }
            } catch (e) {
                $('#gui_prop_in_marginbottom').val('');
            }
        },
        Bottom: function () {
            var tag = "##margin-bottom"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_marginbottom').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToLeft: function () {
            var tag = "##margin-left"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_marginleft').val(val);
                } else {
                    $('#gui_prop_in_marginleft').val('');
                }
            } catch (e) {
                $('#gui_prop_in_marginleft').val('');
            }
        },
        Left: function () {
            var tag = "##margin-left"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_marginleft').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToRight: function () {
            var tag = "##margin-right"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_in_marginright').val(val);
                } else {
                    $('#gui_prop_in_marginright').val('');
                }
            } catch (e) {
                $('#gui_prop_in_marginright').val('');
            }
        },
        Right: function () {
            var tag = "##margin-right"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_in_marginright').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
    },
    "Shadow": {
        ToAll: function () {
            var tag = "##box-shadow"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var st = ComponentDesign.GetTagLine(c, tag);
            $('#gui_prop_in_shadowx').val('');
            $('#gui_prop_in_shadowy').val('');
            $('#gui_prop_in_shadowb').val('');
            $('#gui_prop_in_shadowcolor').val('');
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                $('#gui_prop_in_shadowx').val(val.trim().split(' ')[0].replace('px', ''));
                $('#gui_prop_in_shadowy').val(val.trim().split(' ')[1].replace('px', ''));
                $('#gui_prop_in_shadowb').val(val.trim().split(' ')[2].replace('px', ''));
                $('#gui_prop_in_shadowcolor').val(val.trim().split(' ')[3].replace('px', ''));
            } catch (e) {
                $('#gui_prop_in_shadowx').val('');
                $('#gui_prop_in_shadowy').val('');
                $('#gui_prop_in_shadowb').val('');
                $('#gui_prop_in_shadowcolor').val('');
            }
        },
        All: function () {
            var tag = "##box-shadow"
            var c = $('#' + ComponentDesign.ComponentCSSId).val();
            var v1 = "";
            var x = $('#gui_prop_in_shadowx').val();
            v1 += (x) ? x + "px " : "px ";
            var y = $('#gui_prop_in_shadowy').val();
            v1 += (y) ? y + "px " : "px ";
            var b = $('#gui_prop_in_shadowb').val();
            v1 += (b) ? b + "px " : "px ";
            var color = $('#gui_prop_in_shadowcolor').val();
            v1 += color;
            var v = x + " " + y + " " + b;
            var t = (v.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(st);
            } else {
                var st = ComponentDesign.UpdateTag(c, tag, t);
                $('#' + ComponentDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
    },
    DeleteTag: function (text, tag) {
        if (text.includes(tag)) {

            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            var st = text.substring(n1, (n2 + 1));
            text = text.replace(st, '');
        }
        return text;
    },
    UpdateTag: function (text, tag, val) {
        if (text.includes(tag)) {

            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            var st = text.substring(n1, (n2 + 1));
            text = text.replace(st, val);
        }
        return text;
    },
    GetTagLine: function (text, tag) {
        var st = '';
        if (text.includes(tag)) {
            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            st = text.substring(n1 + 2, n2);
        }
        return st;
    }

}

var ContainerDesign = {
    "ComponentCSSId": "gui_input_css_style_container",
    init: function () {
        ContainerDesign.General.BackgroundColor();
        ContainerDesign.General.Width();
        ContainerDesign.General.Height();
        ContainerDesign.General.Opacity();
        ContainerDesign.General.Horizontal();
//        ContainerDesign.General.Vertical();

        ContainerDesign.Font.FontColor();
        ContainerDesign.Font.FontFamily();
        ContainerDesign.Font.FontSize();
        ContainerDesign.Font.Bold();
        ContainerDesign.Font.Italic();
        ContainerDesign.Border.BorderColor();
        ContainerDesign.Border.BorderStyle();
        ContainerDesign.Border.Width();
        ContainerDesign.Border.Radius();
        ContainerDesign.Position.Type();
        ContainerDesign.Position.Zindex();
        ContainerDesign.Position.Top();
        ContainerDesign.Position.Left();
        ContainerDesign.Padding.All();
        ContainerDesign.Margin.All();
        ContainerDesign.Shadow.All();
        ContainerDesign.DeleteEmptyLines();
        new UserStory().setGUIComponentContent();
    },
    read: function () {
        ContainerDesign.General.ToBackgroundColor();
        ContainerDesign.General.ToWidth();
        ContainerDesign.General.ToHeight();
        ContainerDesign.General.ToOpacity();
        ContainerDesign.General.ToHorizontal();
//        ContainerDesign.General.Vertical();
//
        ContainerDesign.Font.ToFontColor();
        ContainerDesign.Font.ToFontFamily();
        ContainerDesign.Font.ToFontSize();
        ContainerDesign.Font.ToBold();
        ContainerDesign.Font.ToItalic();
        ContainerDesign.Border.ToBorderColor();
        ContainerDesign.Border.ToBorderStyle();
        ContainerDesign.Border.ToWidth();
        ContainerDesign.Border.ToRadius();
        ContainerDesign.Position.ToType();
        ContainerDesign.Position.ToZindex();
        ContainerDesign.Position.ToTop();
        ContainerDesign.Position.ToLeft();
        ContainerDesign.Padding.ToTop();
        ContainerDesign.Padding.ToLeft();
        ContainerDesign.Padding.ToBottom();
        ContainerDesign.Padding.ToRight();
        ContainerDesign.Margin.ToTop();
        ContainerDesign.Margin.ToLeft();
        ContainerDesign.Margin.ToBottom();
        ContainerDesign.Margin.ToRight();
        ContainerDesign.Shadow.ToAll();
    },
    DeleteEmptyLines: function () {
        var c = $('#' + ContainerDesign.ComponentCSSId).val();
        var st = "";
        var r = c.split(/\r*\n/);
        for (var i = 0; i < r.length; i++) {
            if (r[i].trim().length === 0) {
                continue;
            }
            st += r[i].trim() + "\n";
        }
        $('#' + ContainerDesign.ComponentCSSId).val(st);
    },
    "General": {
        ToBackgroundColor: function () {
            var tag = "##background-color"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_cn_backgroundcolor').val(val);
                    $('#cb_gui_prop_cn_backgroundcolor').prop('checked', true);
                    $('#gui_prop_cn_backgroundcolor').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_cn_backgroundcolor').prop('checked', false);
                    $('#gui_prop_cn_backgroundcolor').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_cn_backgroundcolor').prop('checked', false);
                $('#gui_prop_cn_backgroundcolor').attr('disabled', true);
                $('#gui_prop_cn_backgroundcolor').val('');
            }
        },
        BackgroundColor: function () {
            var tag = "##background-color"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_backgroundcolor').val();
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_cn_backgroundcolor').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(st);
                } else {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, '');
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            }
        },
        ToWidth: function () {
            var tag = "##max-width"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_generalwidth').val(val);
                } else {
                    $('#gui_prop_cn_generalwidth').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_generalwidth').val('');
            }
        },
        Width: function () {
            var tag = "##max-width"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_generalwidth').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToHeight: function () {
            var tag = "##height"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_generalheight').val(val);
                } else {
                    $('#gui_prop_cn_generalheight').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_generalheight').val('');
            }
        },
        Height: function () {
            var tag = "##height";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_generalheight').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToOpacity: function () {
            var tag = "##opacity"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_opacity').val(val);
                } else {
                    $('#gui_prop_cn_opacity').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_opacity').val('');
            }
        },
        Opacity: function () {
            var tag = "##opacity";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_opacity').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToHorizontal: function () {
            var tag = "##text-align"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_horizontalposition').val(val);
                } else {
                    $('#gui_prop_cn_horizontalposition').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_horizontalposition').val('');
            }
        },
        Horizontal: function () {
            var tag = "##text-align";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_horizontalposition').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
    },
    "Font": {
        ToFontColor: function () {
            var tag = "##color"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_cn_fontcolor').val(val);
                    $('#cb_gui_prop_cn_fontcolor').prop('checked', true);
                    $('#gui_prop_cn_fontcolor').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_cn_fontcolor').prop('checked', false);
                    $('#gui_prop_cn_fontcolor').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_cn_fontcolor').prop('checked', false);
                $('#gui_prop_cn_fontcolor').attr('disabled', true);
                $('#gui_prop_cn_fontcolor').val('');
            }
        },
        FontColor: function () {
            var tag = "##color"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_fontcolor').val();
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_cn_fontcolor').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(st);
                } else {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, '');
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            }
        },
        ToFontFamily: function () {
            var tag = "##font-family"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_font').val(val);
                } else {
                    $('#gui_prop_cn_font').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_font').val('');
            }
        },
        FontFamily: function () {
            var tag = "##font-family"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_font').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToFontSize: function () {
            var tag = "##font-size"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_fontsize').val(val);
                } else {
                    $('#gui_prop_cn_fontsize').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_fontsize').val('');
            }
        },
        FontSize: function () {
            var tag = "##font-size";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_fontsize').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToBold: function () {
            var tag = "##font-weight"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#cb_gui_prop_cn_fontstylebold').prop('checked', true);
                } else {
                    $('#cb_gui_prop_cn_fontstylebold').prop('checked', false);
                }
            } catch (e) {
                $('#cb_gui_prop_cn_fontstylebold').prop('checked', false);
            }
        },
        Bold: function () {
            var tag = "##font-weight";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#cb_gui_prop_cn_fontstylebold').is(':checked') ? 'bold' : '';
            var t = (v) ? tag + ":" + v + ';' : "";
            if ($('#cb_gui_prop_cn_fontstylebold').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(st);
                } else {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, '');
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            }

        },
        ToItalic: function () {
            var tag = "##font-style"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#cb_gui_prop_cn_fontstyleitalic').prop('checked', true);
                } else {
                    $('#cb_gui_prop_cn_fontstyleitalic').prop('checked', false);
                }
            } catch (e) {
                $('#cb_gui_prop_cn_fontstyleitalic').prop('checked', false);
            }
        },
        Italic: function () {
            var tag = "##font-style";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#cb_gui_prop_cn_fontstyleitalic').is(':checked') ? 'italic' : '';
            var t = (v) ? tag + ":" + v + ';' : "";
            if ($('#cb_gui_prop_cn_fontstyleitalic').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(st);
                } else {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, '');
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            }

        },
    },
    "Position": {
        ToType: function () {
            var tag = "##position"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_positiontype').val(val);
                } else {
                    $('#gui_prop_cn_positiontype').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_positiontype').val('');
            }
        },
        Type: function () {
            var tag = "##position";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_positiontype').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToZindex: function () {
            var tag = "##z-index"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_zindex').val(val);
                } else {
                    $('#gui_prop_cn_zindex').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_zindex').val('');
            }
        },
        Zindex: function () {
            var tag = "##z-index"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_zindex').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToTop: function () {
            var tag = "##top"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_positiontop').val(val);
                } else {
                    $('#gui_prop_cn_positiontop').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_positiontop').val('');
            }
        },
        Top: function () {
            var tag = "##top"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_positiontop').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }


        },
        ToLeft: function () {
            var tag = "##left"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_positionleft').val(val);
                } else {
                    $('#gui_prop_cn_positionleft').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_positionleft').val('');
            }
        },
        Left: function () {
            var tag = "##left"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_positionleft').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        }
    },
    "Border": {
        ToBorderColor: function () {
            var tag = "##border-color"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                if (val) {
                    $('#gui_prop_cn_bordercolor').val(val);
                    $('#cb_gui_prop_cn_bordercolor').prop('checked', true);
                    $('#gui_prop_cn_bordercolor').removeAttr('disabled');
                } else {
                    $('#cb_gui_prop_cn_bordercolor').prop('checked', false);
                    $('#gui_prop_cn_bordercolor').attr('disabled', true);
                }
            } catch (e) {
                $('#cb_gui_prop_cn_bordercolor').prop('checked', false);
                $('#gui_prop_cn_bordercolor').attr('disabled', true);
                $('#gui_prop_cn_bordercolor').val('');
            }
        },
        BorderColor: function () {
            var tag = "##border-color"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_bordercolor').val();
            var t = tag + ":" + v + ';';
            if ($('#cb_gui_prop_cn_bordercolor').is(":checked")) {
                if (c.includes(tag)) {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(st);
                } else {
                    var st = ContainerDesign.UpdateTag(c, tag, t);
                    $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
                }
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, '');
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            }
        },
        ToWidth: function () {
            var tag = "##border-width"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_borderwidth').val(val);
                } else {
                    $('#gui_prop_cn_borderwidth').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_borderwidth').val('');
            }
        },
        Width: function () {
            var tag = "##border-width"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_borderwidth').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToRadius: function () {
            var tag = "##border-radius"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_borderradius').val(val);
                } else {
                    $('#gui_prop_cn_borderradius').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_borderradius').val('');
            }
        },
        Radius: function () {

            var tag = "##border-radius"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_borderradius').val();
            var t = (v) ? tag + ":" + v + 'px;' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
        ToBorderStyle: function () {
            var tag = "##border-style"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_borderstyle').val(val);
                } else {
                    $('#gui_prop_cn_borderstyle').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_borderstyle').val('');
            }
        },
        BorderStyle: function () {
            var tag = "##border-style";
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v = $('#gui_prop_cn_borderstyle').val();
            var t = (v) ? tag + ":" + v + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
    },
    "Padding": {
        ToTop: function () {
            var tag = "##padding-top"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_paddingtop').val(val);
                } else {
                    $('#gui_prop_cn_paddingtop').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_paddingtop').val('');
            }
        },
        All: function () {
            ContainerDesign.Padding.Top();
            ContainerDesign.Padding.Bottom();
            ContainerDesign.Padding.Left();
            ContainerDesign.Padding.Right();
        },
        Top: function () {
            var tag = "##padding-top"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_paddingtop').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToBottom: function () {
            var tag = "##padding-bottom"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_paddingbottom').val(val);
                } else {
                    $('#gui_prop_cn_paddingbottom').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_paddingbottom').val('');
            }
        },
        Bottom: function () {
            var tag = "##padding-bottom"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_paddingbottom').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToLeft: function () {
            var tag = "##padding-left"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_paddingleft').val(val);
                } else {
                    $('#gui_prop_cn_paddingleft').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_paddingleft').val('');
            }
        },
        Left: function () {
            var tag = "##padding-left"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_paddingleft').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToRight: function () {
            var tag = "##padding-right"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_paddingright').val(val);
                } else {
                    $('#gui_prop_cn_paddingright').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_paddingright').val('');
            }
        },
        Right: function () {
            var tag = "##padding-right"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_paddingright').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
    },

    "Margin": {
        ToTop: function () {
            var tag = "##margin-top"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_margintop').val(val);
                } else {
                    $('#gui_prop_cn_margintop').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_margintop').val('');
            }
        },
        All: function () {
            ContainerDesign.Margin.Top();
            ContainerDesign.Margin.Bottom();
            ContainerDesign.Margin.Left();
            ContainerDesign.Margin.Right();
        },
        Top: function () {
            var tag = "##margin-top"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_margintop').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToBottom: function () {
            var tag = "##margin-bottom"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_marginbottom').val(val);
                } else {
                    $('#gui_prop_cn_marginbottom').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_marginbottom').val('');
            }
        },
        Bottom: function () {
            var tag = "##margin-bottom"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_marginbottom').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToLeft: function () {
            var tag = "##margin-left"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_marginleft').val(val);
                } else {
                    $('#gui_prop_cn_marginleft').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_marginleft').val('');
            }
        },
        Left: function () {
            var tag = "##margin-left"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_marginleft').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
        ToRight: function () {
            var tag = "##margin-right"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                if (val) {
                    $('#gui_prop_cn_marginright').val(val);
                } else {
                    $('#gui_prop_cn_marginright').val('');
                }
            } catch (e) {
                $('#gui_prop_cn_marginright').val('');
            }
        },
        Right: function () {
            var tag = "##margin-right"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var top = $('#gui_prop_cn_marginright').val();
            v1 += (top) ? top + "px" : "";
            var t = (v1.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }
        },
    },

    "Shadow": {
        ToAll: function () {
            var tag = "##box-shadow"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var st = ContainerDesign.GetTagLine(c, tag);
            $('#gui_prop_cn_shadowx').val('');
            $('#gui_prop_cn_shadowy').val('');
            $('#gui_prop_cn_shadowb').val('');
            $('#gui_prop_cn_shadowcolor').val('');
            try {
                var val = st.split(':')[1];
                val = val.replace('px', '');
                $('#gui_prop_cn_shadowx').val(val.trim().split(' ')[0].replace('px', ''));
                $('#gui_prop_cn_shadowy').val(val.trim().split(' ')[1].replace('px', ''));
                $('#gui_prop_cn_shadowb').val(val.trim().split(' ')[2].replace('px', ''));
                $('#gui_prop_cn_shadowcolor').val(val.trim().split(' ')[3].replace('px', ''));
            } catch (e) {
                $('#gui_prop_cn_shadowx').val('');
                $('#gui_prop_cn_shadowy').val('');
                $('#gui_prop_cn_shadowb').val('');
                $('#gui_prop_cn_shadowcolor').val('');
            }
        },
        All: function () {
            var tag = "##box-shadow"
            var c = $('#' + ContainerDesign.ComponentCSSId).val();
            var v1 = "";
            var x = $('#gui_prop_cn_shadowx').val();
            v1 += (x) ? x + "px " : "px ";
            var y = $('#gui_prop_cn_shadowy').val();
            v1 += (y) ? y + "px " : "px ";
            var b = $('#gui_prop_cn_shadowb').val();
            v1 += (b) ? b + "px " : "px ";
            var color = $('#gui_prop_cn_shadowcolor').val();
            v1 += color;
            var v = x + " " + y + " " + b;
            var t = (v.trim().length > 0) ? tag + ":" + v1 + ';' : "";
            if (c.includes(tag)) {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(st);
            } else {
                var st = ContainerDesign.UpdateTag(c, tag, t);
                $('#' + ContainerDesign.ComponentCSSId).val(t + '\n' + c);
            }

        },
    },
    DeleteTag: function (text, tag) {
        if (text.includes(tag)) {

            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            var st = text.substring(n1, (n2 + 1));
            text = text.replace(st, '');
        }
        return text;
    },
    UpdateTag: function (text, tag, val) {
        if (text.includes(tag)) {

            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            var st = text.substring(n1, (n2 + 1));
            text = text.replace(st, val);
        }
        return text;
    },
    GetTagLine: function (text, tag) {
        var st = '';
        if (text.includes(tag)) {
            var n1 = text.indexOf(tag);
            var n2 = text.indexOf(";", n1);
            st = text.substring(n1 + 2, n2);
        }
        return st;
    }

}

function allowDrop(ev) {
    try {
        ev.preventDefault();
        var onDropElement = ev.target.id;
        if (onDropElement !== global_var.temp_dp_id) {
            if (global_var.temp_dp_id) {
                $('#' + global_var.temp_dp_id).removeClass('component-container-dashed-onair');
            }
            global_var.temp_dp_id = onDropElement;
            $('[data-toggle="tooltip"]').tooltip('hide');
        }
        $('#' + onDropElement).addClass('component-container-dashed-onair');
    } catch (e) {

    }
//    console.log("allowDrop");
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
//    console.log("drag");
}

function drop(ev) {
//    console.log("drop");

    ev.preventDefault();
    var draggedElement = ev.dataTransfer.getData("text");
    var onDropElement = ev.target.id;
    if (!onDropElement) {
        onDropElement = ev.target.parentNode.id;
    }

    var dragfrom;
    var dragTo;
    dragTo = $('#' + onDropElement).parent().children('#' + onDropElement).attr('orderno') - 0.1;
//    dragfrom = $('#' + draggedElement).parent().children('#' + draggedElement).index() - 0.1;

//    var elOne = document.getElementById(draggedElement);
    var elTwo = document.getElementById(onDropElement);
//    var childOne = $(elOne).children();
    var childTwo = $(elTwo).children();
//    console.log(draggedElement + " " + dragTo);
//    console.log(onDropElement + " " + dragfrom);

//    $(elTwo).attr('id', draggedElement);
//    $(elOne).attr('id', onDropElement);

//    $(elTwo).append(childOne);
//    $(elOne).append(childTwo);

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }
    json.kv.id = draggedElement;
    json.kv.orderNo = dragTo;
    var that = this;
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceTmUpdateInputByComponentOrderNo",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            SAInput.updateInputByRes(res);
            SACore.updateBacklogByRes(res);

            //refresh GUI component 
            new UserStory().genGUIDesign();
        },
    });
//    new UserStory().genGUIDesign();

}


function UserStory() {
    this.story = "";
    this.because = "";
    this.description = "";
    this.fkProjectId = "";
    this.priority = "1";
    this.id = "";
    this.data = {};
}



UserStory.prototype = {
    setStory: function (s) {
        this.story = s;
    },
    setBacause: function (s) {
        this.because = s;
    },
    setDescription: function (s) {
        this.description = s;
    },
    setFkProjectId: function (s) {
        this.fkProjectId = s;
    },
    setPriority: function (s) {
        this.priority = s;
    },
    setData: function () {
        this.setStory($('#backlogName').val());
        this.setBacause($('#backlogBecause').val());
        this.setDescription($('#description').val());
        this.setPriority($('#priority').val());
        this.setFkProjectId("");
    },
    setId: function (arg) {
        this.id = arg;
    },
    getStory: function () {
        return this.story;
    },
    getPriority: function () {
        return this.priority;
    },
    getBecause: function () {
        return this.because;
    },
    getDescription: function () {
        return this.description;
    },
    getFkProjectId: function () {
        return this.fkProjectId;
    },
    getId: function () {
        return this.id;
    },
    getNotifierList: function () {
        var st = "";
        $('.addTaskType_nofity').each(function () {
            if ($(this).prop("checked")) {
                st += $(this).val() + "|";
            }
        });
        return st;
    },
    showComponentCustomCss: function () {
        $('#gui_design_component_custom_style').show();
        $('#gui_design_component_custom_style_dd').hide();
        ComponentDesign.read();
        ContainerDesign.read();
    },
    showComponentCustomCssDD: function () {
        $('#gui_design_component_custom_style').hide();
        $('#gui_design_component_custom_style_dd').show();
    },
    showContainerCustomCss: function () {
        $('#gui_design_container_custom_style').show();
        $('#gui_design_container_custom_style_dd').hide();
        ContainerDesign.read();
    },

    createProjectDocument: function () {
        var div = $("<div>");

        $('.us-checkbox-list').each(function (e) {
            if ($(this).is(':checked')) {
                if ($(this).attr('id') !== 'undefined' || $(this).attr('id')) {
                    var backlogId = $(this).attr('id');
                    try {
                        if (backlogId.length > 0) {
                            div.append(ProjectPreview.getBacklogDocument(backlogId));
                        }
                    } catch (err) {

                    }
                }
            }
        });
        $('#texnikitapshiriq_body').append(div);
    },
    showContainerCustomCssDD: function () {
        $('#gui_design_container_custom_style').hide();
        $('#gui_design_container_custom_style_dd').show();
    },
    showCanvasCss: function () {
        $('#gui_design_canvas_style').show();
        $('#gui_design_canvas_style_dd').hide();
        CanvasDesign.read();
    },
    showCanvasCssDD: function () {
        $('#gui_design_canvas_style').hide();
        $('#gui_design_canvas_style_dd').show();
    },
    convertCommentHtml2TextArea: function (arg) {
        $(arg).html($('<textarea></textarea>')
                .attr('id', $(arg).attr('id'))
                .attr('onchange', 'new UserStory().saveCommentUpdate(this)')
                .attr("style", "width:100%;background-color:#ebecf0;")
                .attr("rows", "5")
                .html(($(arg).attr('pval'))));
    },
    convertTextArea2Html: function (arg) {
        if (!$(arg).val()) {
            return;
        }
        var st = MapTextAreaHtml(replaceTags($(arg).val()));
        $(arg).closest('span').first().attr('pval', replaceTags($(arg).val()));
        $(arg).closest('span').first().html(st);
    },
    guiComponentIsApi: function () {
        this.guiComponentIsApiDetails();
        this.setUserStoryAsAPIFeature();
    },
    guiComponentIsApiDetails: function () {
        if ($('#gui_component_is_api').is(':checked')) {
            $('.gui-design-is-api').hide();
            this.setCurrentIPOView('desc');
            $('#ipo-tab-setting-properties').removeClass('active');
            $('#ipo-tab-setting-container').removeClass('active');
            $('#ipo-tab-setting-input-description-container').removeClass('active');
            $('#ipo-tab-setting-input-description-properties').removeClass('active');
            $('#ipo-tab-setting-input-description').addClass('active');
            $('#ipo-tab-setting-input-description-tab').addClass('active');
            $('#gui_component_show_properties').prop('checked', true);
            $('#gui_component_show_properties').change();
            $('.tooltip').removeClass('show');
        } else {
            $('.gui-design-is-api').show();
        }
    },
    setUserStoryAsAPIFeature: function () {

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.isApi = $('#gui_component_is_api').is(':checked') ? "1" : "0";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSetUserStoryAsAPIFeature",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SACore.updateBacklogByRes(res);
            }
        });
    },
    guiComponentShowProperties: function () {
        if ($('#gui_component_show_properties').is(':checked')) {
            $('#gui-desigin-component-view-main-div-id').show();
            $('#guid-desigin-main-div-id').removeClass('col-12').addClass('col-8');
        } else {
            $('#gui-desigin-component-view-main-div-id').hide();
            $('#guid-desigin-main-div-id').removeClass('col-8').addClass('col-12');
        }
    },
    loadProjectList: function () {
        $('#dublicateUserStoryModal_projectlist').html('');
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
            success: function (res) {
                that.generateTableBody4MainProject(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addScenarioModal: function () {
        emptyCanvasDiv();
        hideAllCanvas();
        setGlobalActiveCanvas(global_var.canvas.testCase);
        this.loadSUSwithInputForScenarioModal();
    },
    toggleGUIComponentImageUpload: function () {
        if (gui_component.componentPerm.image.includes($('#us-gui-component-id').val())) {
            $('#addComponentImageUpload').show();
        } else {
            $('#addComponentImageUpload').hide();
        }
    },
    toggleGUIComponentIconUpload: function () {
        if (gui_component.componentPerm.icon.includes($('#us-gui-component-id').val())) {
            $('#addComponentIconUpload').show();
        } else {
            $('#addComponentIconUpload').hide();
        }
    },
    toggleGUIComponentActionCombo: function () {
        if (gui_component.componentPerm.action.includes($('#us-gui-component-id').val())) {
//            $('#us-gui-component-action').val('').change();
            $('#us-gui-component-action-div').hide();
            $('#us-gui-component-rel-sus-div').show();
        } else {
            $('#us-gui-component-action-div').show();
//            $('#us-gui-component-action').change();
        }
    },
    loadDataCombination4Update: function () {
        if ($('#updateScenario_userstorylistwithinputs').val().length === 0) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = $('#updateScenario_userstorylistwithinputs').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadDataCombination4UpdateDetails(res);
            },
            error: function () {

            }
        });
    },
    changeRequest_loadLabel4ChangeRequest: function () {
        $('#assignLabel4ChangeRequestModal_labels').html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetLabelList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $('#assignLabel4ChangeRequestModal').modal('show');
                that.changeRequest_loadLabelsDetails(res);
            }
        });
    },
    loadAssignedLabel: function (currentId) {

        if (!global_var.current_project_id) {
            return;
        }
        if (!global_var.current_backlog_id) {
            return;
        }
        $('#change-mgmt-gui-design-label-list').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmLoadAssignedLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                 res = JSON.parse(replaceTags(JSON.stringify(res)));
                that.loadAssignedLabelDetails(res);
            }
        });
    },
    loadAssignedLabel4Share: function (currentId) {

        if (!global_var.current_project_id) {
            return;
        }
        if (!global_var.current_backlog_id) {
            return;
        }
        $('#change-mgmt-gui-design-label-list').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmLoadAssignedLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                 res = JSON.parse(replaceTags(JSON.stringify(res)));
                that.loadAssignedLabelDetails(res);
            }
        });
    },
    loadAssignedLabelDetails: function (res) {
        try {
            var obj = res.tbl[0].r;
            $('#change-mgmt-gui-design-label-list').html('');
            $('#change-mgmt-gui-design-label-list').append($('<option></option>'));
            for (var n = 0; n < obj.length; n++) {


                $('#change-mgmt-gui-design-label-list')
                        .append($('<option></option>')
                                .val(obj[n].id)
                                .text(obj[n].name));
            }
        } catch (err) {

        }
    },
    setDateByAssignedLabel: function (el) {

    },
    changeRequest_loadLabelsDetails: function (res) {
        var obj = res.tbl[0].r;
        $('#assignLabel4ChangeRequestModal_labels').html('');
        $('#assignLabel4ChangeRequestModal_labels').append($('<option></option>'));
        for (var n = 0; n < obj.length; n++) {
//            var ch = (obj[n].isChangeRequestLabel) ? " (Change Req.) " : "";
            $('#assignLabel4ChangeRequestModal_labels')
                    .append($('<option></option>')
                            .val(obj[n].id)
                            .text(obj[n].name));
        }


    },
    changeRequest_notifyLabelAsTask: function () {
        if (!$("#change-mgmt-gui-design-label-list").val()) {
            Toaster.showError("Please Select Assigned Label!");
            return;
        }
        $('#notifyLabelAsChangeRequestModal').modal('show');
        this.notifyLabelAsChangeRequestModal4Task();
    },
    assignLabel4ChangeRequest: function () {
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkLabelId = $('#assignLabel4ChangeRequestModal_labels').val();
        json.kv.startDate = ($('#change-mgmt-gui-design-start-date').val())
                ? $('#change-mgmt-gui-design-start-date').val() : "-1";
        json.kv.startTime = ($('#change-mgmt-gui-design-start-time').val())
                ? $('#change-mgmt-gui-design-start-time').val() : "-1";
        json.kv.endDate = ($('#change-mgmt-gui-design-end-date').val())
                ? $('#change-mgmt-gui-design-end-date').val() : "-1";
        ;
        json.kv.endTime = ($('#change-mgmt-gui-design-end-time').val())
                ? $('#change-mgmt-gui-design-end-time').val() : "-1";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSetLabelAsChangeRequest",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $('#assignLabel4ChangeRequestModal').modal('hide');
                that.loadAssignedLabel();
                that.changeRequest_setAssignedLabelByDates();
            }
        });
    },
    changeRequest_setDatesByAssignedLabel: function (el) {
        this.setBViewLabel($(el).val());

        if (!$(el).val()) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $(el).val();
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmGetAssignedLabelById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $('#change-mgmt-gui-design-start-date').val(res.tbl[0].r[0].startDate);
                $('#change-mgmt-gui-design-start-date').change();
                $('#change-mgmt-gui-design-start-time').val(res.tbl[0].r[0].startTime);
                $('#change-mgmt-gui-design-end-date').val(res.tbl[0].r[0].endDate);
                $('#change-mgmt-gui-design-end-date').change();
                $('#change-mgmt-gui-design-end-time').val(res.tbl[0].r[0].endTime);
                $('#change-mgmt-gui-design-end-time').change();
                that.changeRequest_showLastChanges();
                that.changeRequest_hideDates();
            }
        });
    },
    changeRequest_setAssignedLabelByDates: function () {

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.startDate = ($('#change-mgmt-gui-design-start-date').val())
                ? $('#change-mgmt-gui-design-start-date').val()
                : "-1";
        json.kv.endDate = ($('#change-mgmt-gui-design-end-date').val())
                ? $('#change-mgmt-gui-design-end-date').val()
                : "-1";
        json.kv.startTime = ($('#change-mgmt-gui-design-start-time').val())
                ? $('#change-mgmt-gui-design-start-time').val()
                : "-1";
        ;
        json.kv.endTime = ($('#change-mgmt-gui-design-end-time').val())
                ? $('#change-mgmt-gui-design-end-time').val()
                : "-1";
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmGetAssignedLabelByDates",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res));
                $('#change-mgmt-gui-design-label-list').val('');
                $('#change-mgmt-gui-design-label-list').val(res.tbl[0].r[0].id);
            }
        });
    },
    changeRequestForStartDateHeader: function (projectId, backlogId, sdate, edate, stime, etime) {

        var st = "";
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.fkProjectId = projectId;
        json.kv.startDate = (sdate) ? sdate : "";
        json.kv.endDate = (edate) ? edate : "";
        json.kv.startTime = (stime) ? stime : "";
        json.kv.endTime = (etime) ? etime : "";
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmGetBacklogHistoryByDate",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                var data = {
                    "inputDescNewList": {},
                    "inputUpdateList": {},
                    "inputDeleteList": {},
                    "inputDescDeleteList": {},
                    "inputDescUpdateList": {},
                };
                that.changeRequestDetails_4InputDescNewList(res, data);
                that.changeRequestDetails_4InputUpdateList(res, data);
                that.changeRequestDetails_4InputDeleteList(res, data);
                that.changeRequestDetails_4InputDescDeleteList(res, data);
                that.changeRequestDetails_4InputDescUpdateList(res, data);

//                $('#generalview_input_list').html('');
                st = that.changeRequestDetails(res, data, sdate, edate, stime, etime);
//                $('#generalview_input_list').html(st);
//
//                that.getHistoryTimesByDate(el, type);
//                that.changeRequest_setAssignedLabelByDates();
//                that.changeRequest_showLastChanges();
//                that.changeRequest_hideDates();
            }
        });
        return st;
    },
    changeRequestForStartDate: function (el, type) {
        if (!(global_var.current_backlog_id)) {
            return;
        }
        $('#generalview-table-proc-desc').html('');
        $('#generalview_input_list').html('');


        var backlogId = global_var.current_backlog_id;
        var projectId = global_var.current_project_id;
        var sdate = $('#change-mgmt-gui-design-start-date').val();
        var edate = $('#change-mgmt-gui-design-end-date').val();
        var stime = $('#change-mgmt-gui-design-start-time').val();
        var etime = $('#change-mgmt-gui-design-end-time').val();
        var st = this.changeRequestForStartDateHeader(projectId, backlogId, sdate, edate, stime, etime);

        $('#generalview_input_list').html(st);
//
        this.getHistoryTimesByDate(el, type);
        this.changeRequest_setAssignedLabelByDates();
        this.changeRequest_showLastChanges();
        this.changeRequest_hideDates();

    },
    changeRequestDetails: function (res, data, sdate, edate, stime, etime) {

        var table = $('<table></table>')
                .addClass('table')
                .attr('border', '1')
                .attr('style', 'border: 1px solid #5181B8;margin: 0 auto;');


        var tbody = this.changeRequestBody(res, data, sdate, edate, stime, etime);
        table.append(this.getTableHeader4InputTable(1));
        table.append(this.getTableFooter4InputTable(
                this.changeRequestDetails_GetProcessDescList(res)), false);
        table.append(tbody);
        return table;
    },
    changeRequestBody: function (res, data, sdate, edate, stime, etime) {
        var tbody = $('<tbody></tbody>');
        var id4Input = getIndexOfTable(res, "inputNewTable");
        var o = res.tbl[id4Input].r;

        for (var n = o.length - 1; n >= 0; n--) {
//        for (var n = 0; n < o.length; n++) {
            var obj = o[n];
            if (obj.inputType === 'GUI' && obj.componentType !== 'btn') {
                continue;
            }

            var inputDescByList = this.changeRequestDetails_GetInputDescNewListByInputId(data, obj.relationId, sdate, edate, stime, etime);
            var inputDeleted = this.changeRequestDetails_GetInputDeleteListByInputId(data, obj.relationId);
            var inputUpdate = this.changeRequestDetails_GetInputUpdateListByInputId(data, obj.relationId);
            var css4newInput = this.addClassForNewRecord(obj, sdate, edate, stime, etime);

            var tr = $('<tr></tr>')
                    .append($('<td></td>').append((n + 1)))
                    .append($('<td></td>')
                            .append($('<span></span>')
                                    .addClass()
                                    .attr('style', (inputDeleted)
                                            ? css4newInput + ' text-decoration: line-through;'
                                            : css4newInput)
                                    .append(obj.param1)
                                    .append((obj.param3) ? " (Group by:" + obj.param3 + ")" : ""))
                            .addClass('text-left')
                            .append($('<span></span>')
                                    .addClass('c-history-input-date')
                                    .append(' (')
                                    .append(Utility.convertDate(obj.historyDate))
                                    .append('  ')
                                    .append(Utility.convertTime(obj.historyTime))
                                    .append(')'))
                            .append(inputDeleted)
                            .append(inputUpdate)
                            )
                    .append($('<td></td>')
                            .addClass('text-left')
                            .append(inputDescByList))
                    ;
            tbody.append(tr);
        }
        return tbody;
    },
    addClassForNewRecord: function (obj, sdate, edate, stime, etime) {
//        try {
        startDate = (sdate) ? sdate : "";
        endDate = (edate) ? edate : "";
        startTime = (stime) ? stime : "";
        endTime = (etime) ? etime : "";

        if (!(startDate) && !(startTime)) {
            return;
        }

        var date1 = new Date();
        date1.setYear(startDate.substring(0, 4));
        date1.setMonth((startDate.substring(4, 6) - 1));
        date1.setDate(startDate.substring(6, 8));
        date1.setHours(startTime.substring(0, 2));
        date1.setMinutes(startTime.substring(2, 4));
        date1.setSeconds(startTime.substring(4, 6));
        var date2 = new Date();
        date2.setYear(endDate.substring(0, 4));
        date2.setMonth((endDate.substring(4, 6) - 1));
        date2.setDate(endDate.substring(6, 8));
        date2.setHours(endTime.substring(0, 2));
        date2.setMinutes(endTime.substring(2, 4));
        date2.setSeconds(endTime.substring(4, 6));
        var date = new Date();
        date.setYear(obj.historyDate.substring(0, 4));
        date.setMonth((obj.historyDate.substring(4, 6) - 1));
        date.setDate(obj.historyDate.substring(6, 8));
        date.setHours(obj.historyTime.substring(0, 2));
        date.setMinutes(obj.historyTime.substring(2, 4));
        date.setSeconds(obj.historyTime.substring(4, 6));
        if (date1 <= date && date <= date2) {
            return "margin-left:2px;margin-top:5px;background-color:#bcf906;border-radius:5px;"
        }
//        } catch (e) {
//        }

    },
    changeRequestDetails_GetInputDescNewListByInputId: function (data, inputId, sdate, edate, stime, etime) {
        if (!data.inputDescNewList[inputId]) {
            return '';
        }



        var o = data.inputDescNewList[inputId];
        var div = $('<div></div>');
        for (var n = 0; n < o.length; n++) {
            var obj = o[n];
            var inputDescDeleted =
                    this.changeRequestDetails_GetInputDescDeleteListByInputId(data, obj.id);
            var inputDescUpdated =
                    this.changeRequestDetails_GetInputDescUpdateListByInputId(data, obj.id);
            div.append('- ')
                    .append($('<span></span>')
                            .attr('style', (inputDescDeleted)
                                    ? this.addClassForNewRecord(obj, sdate, edate, stime, etime) + ' text-decoration: line-through;'
                                    : this.addClassForNewRecord(obj, sdate, edate, stime, etime))
                            .append(obj.desc))
                    .append($('<span></span>')
                            .addClass('c-history-input-date')
                            .append(' (')
                            .append(Utility.convertDate(obj.date))
                            .append('  ')
                            .append(Utility.convertTime(obj.time))
                            .append(')'))
                    .append('<br>')
                    .append(inputDescDeleted)
                    .append(inputDescUpdated);
        }
        return div;
    },
    changeRequestDetails_GetInputUpdateListByInputId: function (data, inputId) {


        if (!data.inputUpdateList[inputId]) {
            return '';
        }

        var o = data.inputUpdateList[inputId];
        var div = $('<div></div>')
                .addClass('col-10')
                .addClass('text-left')
                .attr('style', 'margin-left:20px;margin-top:5px;background-color:#FFFF66;border-radius:15px;');
        for (var n = 0; n < o.length; n++) {
            var obj = o[n];
            div.append($('<div></div>')
                    .addClass((n === 0) ? "c-input-update-last" : "c-input-update-middle")
                    .append(obj.desc)
                    .append($('<i></i>').append((obj.table) ? ' -- ' + obj.table : ""))
                    .append($('<span></span>')
                            .addClass('c-history-input-date')
                            .append(' (')
                            .append(Utility.convertDate(obj.date))
                            .append('  ')
                            .append(Utility.convertTime(obj.time))
                            .append(')'))
                    .append('<br>')
                    );
        }
        return div;
    },
    changeRequestDetails_GetInputDescDeleteListByInputId: function (data, inputId) {
        if (!data.inputDescDeleteList[inputId]) {
            return '';
        }

        var o = data.inputDescDeleteList[inputId];
        var div = $('<div></div>')
                .addClass('col-10')
                .addClass('text-left')
                .attr('style', 'margin-left:20px;text-decoration: line-through;margin-top:5px;background-color:#00CC99;border-radius:15px;');
        for (var n = 0; n < o.length; n++) {
            var obj = o[n];
            div.append($('<span></span>')
                    .append(obj.desc))
                    .append($('<span></span>')
                            .addClass('c-history-input-date')
                            .append(' (')
                            .append(Utility.convertDate(obj.date))
                            .append('  ')
                            .append(Utility.convertTime(obj.time))
                            .append(')'))
                    .append('<br>');
        }
        return div;
    },
    changeRequestDetails_GetInputDescUpdateListByInputId: function (data, inputId) {
        if (!data.inputDescUpdateList[inputId]) {
            return '';
        }

        var o = data.inputDescUpdateList[inputId];
        var div = $('<div></div>')
                .addClass('col-10')
                .addClass('text-left')
                .attr('style', 'margin-left:20px;margin-top:5px;background-color:#FFFF66;border-radius:15px;');
        for (var n = 0; n < o.length; n++) {
            var obj = o[n];
            div.append($('<span></span>')
                    .append(obj.desc))
                    .append($('<span></span>')
                            .addClass('c-history-input-date')
                            .append(' (')
                            .append(Utility.convertDate(obj.date))
                            .append('  ')
                            .append(Utility.convertTime(obj.time))
                            .append(')'))
                    .append('<br>');
        }
        return div;
    },
    changeRequestDetails_GetInputDeleteListByInputId: function (data, inputId) {


        if (!data.inputDeleteList[inputId]) {
            return '';
        }

        var o = data.inputDeleteList[inputId];
        var div = $('<div></div>')
                .addClass('col-10')
                .addClass('text-left')
                .attr('style', 'margin-left:20px;text-decoration: line-through;margin-top:5px;background-color:#00CC99;border-radius:15px;');
        for (var n = 0; n < o.length; n++) {
            var obj = o[n];
            div.append($('<span></span>')
                    .append(obj.desc))
                    .append($('<i></i>').append((obj.table) ? ' -- ' + obj.table : ""))
                    .append($('<span></span>')
                            .addClass('c-history-input-date')
                            .append(' (')
                            .append(Utility.convertDate(obj.date))
                            .append('  ')
                            .append(Utility.convertTime(obj.time))
                            .append(')'))
                    .append('<br>');
        }
        return div;
    },
    changeRequestDetails_GetProcessDescList: function (res) {
        if (!res.tbl) {
            return;
        }
        var div = $("<div></div>");
        try {
            var idx = getIndexOfTable(res, "proccessDescNewTable");
            var o = res.tbl[idx].r;
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                div.append(
                        $('<div></div>')
                        .addClass('col-10')
                        .addClass('text-left')
                        .addClass((n === 0) ? "c-input-update-last" : "c-input-update-middle")
                        .attr('style', 'margin-left:20px;background-color:#FFFF66;border-radius:15px;')
                        .append($('<span></span>')
                                .addClass('c-history-input-date')
                                .append('  ')
                                .append(Utility.convertDate(obj.historyDate))
                                .append('  ')
                                .append(Utility.convertTime(obj.historyTime))
                                .append('<br>'))
                        .append($('<span></span>')
                                .addClass('c-history-process-desc')
                                .append(MapTextAreaHtml(obj.param1)))
                        .append('<hr>')
                        );
            }
        } catch (err) {

        }
        return div.html();
    },
    changeRequestDetails_4InputDescNewList: function (res, data) {
        if (!res.tbl) {
            return;
        }

        try {
            var idx = getIndexOfTable(res, "inputDescNewTable");
            var o = res.tbl[idx].r;
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                data.inputDescNewList[obj.param1] = [];
            }
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                var kv = {};
                kv.date = obj.historyDate;
                kv.time = obj.historyTime;
                kv.id = obj.relationId;
                kv.desc = this.fnline2Text(obj.param2);
                kv.historyDate = obj.historyDate;
                kv.historyTime = obj.historyTime;
                data.inputDescNewList[obj.param1].push(kv);
            }
        } catch (err) {

        }
    },
    changeRequestDetails_4InputUpdateList: function (res, data) {
        if (!res.tbl) {
            return;
        }

        try {
            var idx = getIndexOfTable(res, "inputUpdateTable");
            var o = res.tbl[idx].r;
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                data.inputUpdateList[obj.relationId] = [];
            }
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                var kv = {};
                kv.date = obj.historyDate;
                kv.time = obj.historyTime;
                kv.desc = this.fnline2Text(obj.param1);
                kv.type = obj.param2;
                kv.table = obj.param3;
                data.inputUpdateList[obj.relationId].push(kv);
            }
        } catch (err) {

        }
    },
    changeRequestDetails_4InputDeleteList: function (res, data) {
        if (!res.tbl) {
            return;
        }

        try {
            var idx = getIndexOfTable(res, "inputDeleteTable");
            var o = res.tbl[idx].r;
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                data.inputDeleteList[obj.relationId] = [];
            }
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                var kv = {};
                kv.date = obj.historyDate;
                kv.time = obj.historyTime;
                kv.desc = this.fnline2Text(obj.param1);
                kv.type = obj.param2;
                kv.table = obj.param3;
                data.inputDeleteList[obj.relationId].push(kv);
            }
        } catch (err) {

        }
    },
    changeRequestDetails_4InputDescDeleteList: function (res, data) {
        if (!res.tbl) {
            return;
        }

        try {
            var idx = getIndexOfTable(res, "inputDescriptionDeleteTable");
            var o = res.tbl[idx].r;
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                data.inputDescDeleteList[obj.relationId] = [];
            }
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                var kv = {};
                kv.date = obj.historyDate;
                kv.time = obj.historyTime;
                kv.desc = this.fnline2Text(obj.param2);
                data.inputDescDeleteList[obj.relationId].push(kv);
            }
        } catch (err) {

        }
    },
    changeRequestDetails_4InputDescUpdateList: function (res, data) {
        if (!res.tbl) {
            return;
        }

        try {
            var idx = getIndexOfTable(res, "inputDescriptionUpdateTable");
            var o = res.tbl[idx].r;
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                data.inputDescUpdateList[obj.relationId] = [];
            }
            for (var n = 0; n < o.length; n++) {
                var obj = o[n];
                var kv = {};
                kv.date = obj.historyDate;
                kv.time = obj.historyTime;
                kv.desc = this.fnline2Text(obj.param2);
                data.inputDescUpdateList[obj.relationId].push(kv);
            }
        } catch (err) {

        }
    },
    loadDataCombination4Dublicate: function () {
        if ($('#duplicateScenario_userstorylistwithinputs').val().length === 0) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = $('#duplicateScenario_userstorylistwithinputs').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadDataCombination4DublicateDetails(res);
            },
            error: function () {

            }
        });
    },
    loadDataCombination4UpdateDetails: function (res) {
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            if (obj[n].inputType === 'GUI' && obj[n].componentType !== 'btn') {
                continue;
            }
            var txt = $('#updateScenario_datacombination').val() + obj[n].inputName + ": ' ',\n";
            $('#updateScenario_datacombination')
                    .val(txt)
                    ;
        }
    },
    loadDataCombination4DublicateDetails: function (res) {

        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            if (obj[n].inputType === 'GUI' && obj[n].componentType !== 'btn') {
                continue;
            }
            var txt = $('#duplicateScenario_datacombination').val() + obj[n].inputName + ": ' ',\n";
            $('#duplicateScenario_datacombination')
                    .val(txt)
                    ;
        }
    },
    loadDataCombination: function () {
        if ($('#addScenario_userstorylistwithinputs').val().length === 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = $('#addScenario_userstorylistwithinputs').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadDataCombinationDetails(res);
            },
            error: function () {

            }
        });
    },
    loadDataCombinationDetails: function (res) {
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            if (obj[n].inputType === 'GUI' && obj[n].componentType !== 'btn') {
                continue;
            }
            var txt = $('#addScenario_datacombination').val() + obj[n].inputName + ": ' ',\n";
            $('#addScenario_datacombination').val(txt);
        }
    },
    loadSUSwithInputForScenarioModal: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogListWithInputs",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadSUSwithInputForScenarioModalDetails(res);
                $('#addScenario_userstorylistwithinputs').change();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    syncWithJira: function (el) {
        if (!(global_var.current_project_id)) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSyncWithJira",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadBacklogTask();
            }
        });
    },
    loadSUSwithInputForUpdateScenarioModal: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogListWithInputs",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadSUSwithInputForUpdateScenarioModalDetails(res);
            }
        });
    },
    loadSUSwithInputForScenarioModalDetails: function (res) {
        $('#addScenario_userstorylistwithinputs').html("");
        var obj = res.tbl[0].r;
        $('#addScenario_userstorylistwithinputs').append($("<option></option>"));
        for (var n = 0; n < obj.length; n++) {
            var o = $("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName);
            if (global_var.current_backlog_id === obj[n].id) {
                o.attr('selected', 'selected');
            }
            $('#addScenario_userstorylistwithinputs').append(o);
        }
    },
    loadSUSwithInputForUpdateScenarioModalDetails: function (res) {
        $('#updateScenario_userstorylistwithinputs').html("");
        var obj = res.tbl[0].r;
        $('#updateScenario_userstorylistwithinputs').append($("<option></option>"));
        for (var n = 0; n < obj.length; n++) {
            $('#updateScenario_userstorylistwithinputs').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName));
        }
    },
    loadPicture4TestCase: function () {
//           $('.preloader').fadeIn(0, function () {console.log('ok')});
        var idx = 1;
        var that = this;
        var finalname = "";
        $('.canvas-image-class').each(function (e) {
//            $('.preloader').fadeIn(400, function () {
//                console.log('ok')
//            });
            var id = $(this).find('.canvas-sub-class').first().attr('id');
            var binaryString = document.getElementById(id).toDataURL("image/png;base64");
            binaryString = binaryString.replace(/data:image\/png;base64,/, '');
//            console.log('binary='+binaryString)
            var fname = that.uploadFile4NewTicket("jpeg", binaryString, 'image_' + idx);
            finalname += global_var.vertical_seperator + fname;
            idx++;
        });
        global_var.current_upload_canvas = finalname;
//        $('.preloader').fadeOut(500, function () {
//            console.log('done')
//        });
    },
    loadPicture4TestTrial: function () {
//           $('.preloader').fadeIn(0, function () {console.log('ok')});
        var idx = 1;
        var that = this;
        var finalname = "";
        $('.canvas-image-class').each(function (e) {
//            $('.preloader').fadeIn(400, function () {
//                console.log('ok')
//            });
            var id = $(this).find('.canvas-sub-class').first().attr('id');
            var binaryString = document.getElementById(id).toDataURL("image/png;base64");
            binaryString = binaryString.replace(/data:image\/png;base64,/, '');
//            console.log('binary='+binaryString)
            var fname = that.uploadFile4NewTicket("jpeg", binaryString, 'image_' + idx);
            finalname += global_var.vertical_seperator + fname;
            idx++;
        });
        global_var.current_upload_canvas = finalname;
//        $('.preloader').fadeOut(500, function () {
//            console.log('done')
//        });
    },
    loadPicture4Comment: function () {
//           $('.preloader').fadeIn(0, function () {console.log('ok')});
        var idx = 1;
        var that = this;
        var finalname = "";
        $('.canvas-image-class').each(function (e) {
//            $('.preloader').fadeIn(400, function () {
//                console.log('ok')
//            });
            var id = $(this).find('.canvas-sub-class').first().attr('id');
            var binaryString = document.getElementById(id).toDataURL("image/png;base64");
            binaryString = binaryString.replace(/data:image\/png;base64,/, '');
//            console.log('binary='+binaryString)
            var fname = that.uploadFile4NewTicket("jpeg", binaryString, 'image_' + idx);
            finalname += global_var.vertical_seperator + fname;
            idx++;
        });
        global_var.current_upload_canvas = finalname;
//        $('.preloader').fadeOut(500, function () {
//            console.log('done')
//        });
    },
    loadPicture4StoryCard: function () {
//           $('.preloader').fadeIn(0, function () {console.log('ok')});
        var idx = 1;
        var that = this;
        var finalname = "";
        $('.canvas-image-class').each(function (e) {
//            $('.preloader').fadeIn(400, function () {
//                console.log('ok')
//            });
            var id = $(this).find('.canvas-sub-class').first().attr('id');
            var binaryString = document.getElementById(id).toDataURL("image/png;base64");
            binaryString = binaryString.replace(/data:image\/png;base64,/, '');
//            console.log('binary='+binaryString)
            var fname = that.uploadFile4NewTicket("jpeg", binaryString, 'image_' + idx);
            finalname += global_var.vertical_seperator + fname;
            idx++;
        });
        global_var.current_upload_canvas = finalname;
//        $('.preloader').fadeOut(500, function () {
//            console.log('done')
//        });
    },
    uploadFile4NewTicket11: function (fileext, file_base_64, file_name) {

        var d = new Object();
        d.file_base_64 = file_base_64;
        d.file_extension = fileext;
        d.file_type = "general";
        d.file_name = file_name;
        conf = JSON.parse('{"kv":{}}');
        conf['kv'] = d;
        var dat = JSON.stringify(conf);
        var finalname = "";
        $.ajax({
            url: urlGl + "api/post/upload",
            type: "POST",
            data: dat,
            contentType: "application/json",
            async: false,
            success: function (data) {
                finalname = data.kv.uploaded_file_name;
            },
            error: function () {
            }
        });
        return finalname;
    },
    maximizeProjectView: function () {
        $('#projectpreview_sidebar_id').hide();
        $('#main_body_nav_id').hide();
        $('#project_view_maximize').hide();
        $('#project_view_restore').show();
    },
    restoreProjectView: function () {
        $('#projectpreview_sidebar_id').show();
        $('#main_body_nav_id').show();
        $('#project_view_maximize').show();
        $('#project_view_restore').hide();
    },
    generateTableBody4MainProject: function (res) {
        var obj = res.tbl[0].r;
        var urlVal = global_var.current_project_id;
        for (var n = 0; n < obj.length; n++) {
            var o = $('<option></option')
                    .attr('value', obj[n].id)
                    .html(obj[n].projectName);
            if (urlVal === obj[n].id) {
                o.attr("selected", "selected");
            }
            $('#dublicateUserStoryModal_projectlist').append(o);
        }
    },
    hideUserStoryPanel: function () {
        $('#core_div_col_1st').hide('1000');
        $('.toggleUSPanel').show('1000');
        $('#main_div_of_backlog_info').removeClass('col-9').addClass('col-12');
        $('#main_div_of_backlog_info_list_view').removeClass('col-9').addClass('col-12');
        $('#main_div_of_backlog_info_pivot_view').removeClass('col-9').addClass('col-12');
        $('#main_div_of_backlog_info_kanban_view').removeClass('col-9').addClass('col-12');
        $('#submenu-userstory-heading').removeClass('col-5').addClass('col-4');
    },
    showUserStoryPanelMain: function () {

//        $('#core_div_col_1st').attr("style", "display: yes;");
        $('#core_div_col_1st').show('1000');
        $('.toggleUSPanel').hide('1000');
        $('#main_div_of_backlog_info').removeClass('col-12').addClass('col-9');
        $('#main_div_of_backlog_info_pivot_view').removeClass('col-12').addClass('col-9');
        $('#main_div_of_backlog_info_list_view').removeClass('col-12').addClass('col-9');
        $('#main_div_of_backlog_info_kanban_view').removeClass('col-12').addClass('col-9');
        $('#submenu-userstory-heading').removeClass('col-4').addClass('col-5');
    },
    saveCommentUpdate: function (arg) {
        if (!$(arg).val()) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $(arg).attr('id');
        json.kv.comment = $(arg).val();
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateComment",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.convertTextArea2Html(arg);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        })
    },
    loadPaymentHistory: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetPaymentHistory",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#getPaymentHistory_licensedUsers').html(res.kv.licensedUsers);
                $('#getPaymentHistory_overalUsers').html(res.kv.overalUsers);
                $('#getPaymentHistory_activeUsers').html(res.kv.activeUsers);
                $('#getPaymentHistory_passiveUsers').html(res.kv.passiveUsers);
                that.loadPaymentHistoryDetails(res);
            },
            error: function () {
//                Toaster.showError(('somethingww'));
            }
        });
    },
    getEmptyMessage4PaymentHistory: function () {
        var innerHTML = '<tr><td colspan="5" style="padding:30px;text-align:center">' +
                '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                '<h5> No Payment have been done on this Domain</h5>' +
                '</td></tr>';
        return innerHTML;
    },
    loadPaymentHistoryDetails: function (res) {

        $('#getPaymentHistory_paymentlist > tbody').html('');
        try {
            var obj = res.tbl[0].r;
            if (obj.length === 0) {
                $('#getPaymentHistory_paymentlist > tbody')
                        .append(this.getEmptyMessage4PaymentHistory());
            }
            for (var n = 0; n < obj.length; n++) {
                var tr = $('<tr></tr>')
                        .append($('<td></td>').append((n + 1)))
                        .append($('<td></td>').append(obj[n].paymentDate))
                        .append($('<td></td>').append(obj[n].paymentAmount))
                        .append($('<td></td>').append(obj[n].currency))
                        .append($('<td></td>').append(obj[n].description))
                $('#getPaymentHistory_paymentlist > tbody').append(tr);
            }
        } catch (e) {
            $('#getPaymentHistory_paymentlist > tbody')
                    .append(this.getEmptyMessage4PaymentHistory());
        }

    },
    setFilterPreviousPaging: function () {
        var r = parseFloat(global_var.user_story_core_filter_current_index)
                - parseFloat($('#us_core_filter_perpage').val());
        r = parseFloat(r) < 0 ? '0' : r;
        global_var.user_story_core_filter_current_index = r;
        global_var.user_story_core_filter_paging_button_pressed = "1";
        try {
            this.load();
        } catch (e) {

        }
        global_var.user_story_core_filter_paging_button_pressed = "";
    },
    setFilterPaging: function (e) {
        global_var.user_story_core_filter_current_index = '0';
        this.load();
    },
    toogleTaskComment: function () {
        if ($('#userstory_task_comment_toogle').is(':checked')) {
            $('.task-child-comment').show();
        } else {
            $('.task-child-comment').hide();
        }

    },
    toogleScenarioName: function () {
        if ($('#userstory_scenario_name_toogle').is(':checked')) {
            $('.test-case-scenario').show();
        } else {
            $('.test-case-scenario').hide();
        }
    },
    toogleScenarioData: function () {
        if ($('#userstory_scenario_data_toogle').is(':checked')) {
            $('.test-case-data').show();
        } else {
            $('.test-case-data').hide();
        }
    },
    toogleScenarioExpectedResult: function () {
        if ($('#userstory_scenario_expectedresult_toogle').is(':checked')) {
            $('.test-case-expectedresult').show();
        } else {
            $('.test-case-expectedresult').hide();
        }
    },
    toogleScenarioTrial: function () {
        if ($('#userstory_scenario_trial_toogle').is(':checked')) {
            $('.scenario-trial-comment').show();
        } else {
            $('.scenario-trial-comment').hide();
        }
    },
    toogleTaskSubtask: function (arg) {
        $('#userstory_task_comment_toogle').prop('checked', true);
        $('.task-child-comment').show();
        $('.mangodb').hide();
        $('.task-child-subtask').show();
        $('.task-comment-show-hide').removeAttr("style");
        $(arg).attr("style", "color:red");
    },
    toogleTaskBug: function (arg) {
        $('#userstory_task_comment_toogle').prop('checked', true);
        $('.task-child-comment').show();
        $('.mangodb').hide();
        $('.task-child-bug').show();
        $('.task-comment-show-hide').removeAttr("style");
        $(arg).attr("style", "color:red");
    },
    showBugs4Scenario: function (arg) {
        $('#userstory_scenario_trial_toogle').prop('checked', true);
        $('.scenario-trial-comment').show();
        $('.mangodbtrial').hide();
        $('.task-child-trial-bug').show();
        $('.task-trial-show-hide').removeAttr("style");
        $(arg).attr("style", "color:red");
    },
    showNotified4Scenario: function (arg) {
        $('#userstory_scenario_trial_toogle').prop('checked', true);
        $('.scenario-trial-comment').show();
        $('.mangodbtrial').hide();
        $('.task-child-notified').show();
        $('.task-trial-show-hide').removeAttr("style");
        $(arg).attr("style", "color:red");
    },
    toogleTaskRequest: function (arg) {
        $('#userstory_task_comment_toogle').prop('checked', true);
        $('.task-child-comment').show();
        $('.mangodb').hide();
        $('.task-child-request').show();
        $('.task-comment-show-hide').removeAttr("style");
        $(arg).attr("style", "color:red");
    },
    toogleTaskAll: function (arg) {
        $('#userstory_task_comment_toogle').prop('checked', true);
        $('.task-child-comment').show();
        $('.mangodb').show();
        $('.task-comment-show-hide').removeAttr("style");
        $(arg).attr("style", "color:red");
    },
    showAll4Scenario: function (arg) {
//        $('#userstory_task_comment_toogle').prop('checked', true);
//        $('.task-child-comment').show();
//        $('.mangodb').show();
//        $('.task-comment-show-hide').removeAttr("style");
//        $(arg).attr("style", "color:red");

        $('#userstory_scenario_trial_toogle').prop('checked', true);
        $('.scenario-trial-comment').show();
        $('.mangodbtrial').show();
        $('.task-trial-show-hide').removeAttr("style");
        $(arg).attr("style", "color:red");
    },
    getTicketAssignee: function () {
        var st = "";
        $('#bindTicketToSUSModal').find('.us_ticket_bind_assignee').each(function (e) {
            if ($(this).is(':checked')) {
                st += $(this).attr('id') + "|";
            }
        });
        return st;
    },
    addTaskScenarioCtrl: function () {


    },
    addTaskScenario: function () {
        if ($('#addScenario_testcase').val().length === 0) {
            Toaster.showError('Please Add Test Case.');
            return;
        }
        if (!$('#addScenario_scenario').val()) {
            Toaster.showError('Please Add Scenario.');
            return;
        }

        if ($('#addScenario_showactualresult').is(':checked')
                && isCanvasContextExist('canvasdiv_testCase')) {
            try {
                this.loadPicture4TestCase();
            } catch (err) {
            }
        }

        if ($('#addScenario_showactualresult').is(':checked')
                && $('#file_scenario').val().trim().length > 0) {
            this.sendFileForScenario();
        } else {
            this.addTaskScenarioBody('');
        }

    },
    addTaskScenarioBody: function (filename) {

        var isActualResChecked = "0";
        if ($('#addScenario_showactualresult').is(':checked')) {
            isActualResChecked = "1";
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.testCase = $('#addScenario_testcase').val();
        json.kv.dataCombination = $('#addScenario_datacombination').val();
        json.kv.scenarioName = $('#addScenario_scenario').val();
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.expectedResult = $('#addScenario_expectedresult').val();
        json.kv.actualResult = $('#addScenario_actualresult').val();
        json.kv.trialStatus = $('#addScenario_trialstatus').val();
        json.kv.isActualResChecked = isActualResChecked;
        json.kv.fileName = filename + global_var.vertical_seperator + global_var.current_upload_canvas;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewTestScenario",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {



                if ($('#addScenario__closeafterinsert').is(":checked")) {
                    clearGlobalActiveCanvas();
                    closeModal('addScenario');
                    global_var.current_upload_canvas = "";
                    emptyCanvasDiv();
                }


                $('#addScenario_testcase').val('');
                $('#addScenario_datacombination').val('');
                $('#addScenario_scenario').val('');
                $('#addScenario_datacombination').val('');
                $('#addScenario_expectedresult').val('');
                $('#addScenario_actualresult').val('');
                $('#file_scenario').val('');
                that.loadTestScenario();
            },
            error: function () {

                Toaster.showError(('somethingww'));
            }
        });
    },
    addFileToStoryCard: function (filename) {


        if (!filename) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fileUrl = filename;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmAddFileToBacklog",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);
                that.refreshCurrentBacklog();
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },
    updateTaskScenario: function () {
        if (!$('#updateScenario_testcase').val().trim()) {
            Toaster.showError('Please Add Test Case.');
            return;
        }
        if (!$('#updateScenario_scenario').val().trim()) {
            Toaster.showError('Please Add Scenario.');
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#updateScenario_id').val();
        json.kv.testCase = $('#updateScenario_testcase').val();
        json.kv.dataCombination = $('#updateScenario_datacombination').val();
        json.kv.scenarioName = $('#updateScenario_scenario').val();
        json.kv.expectedResult = $('#updateScenario_expectedresult').val();
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateTestScenario",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                closeModal('updateScenario');
                that.loadTestScenario();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    duplicateTaskScenario: function () {
        if (!$('#duplicateScenario_userstorylistgeneral').val()) {
            Toaster.showError('Please Choose User Story.');
            return;
        }
        if (!$('#duplicateScenario_testcase').val().trim()) {
            Toaster.showError('Please Add Test Case.');
            return;
        }
        if (!$('#duplicateScenario_scenario').val().trim()) {
            Toaster.showError('Please Add Scenario.');
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#dublicateScenario_id').val();
        json.kv.testCase = $('#duplicateScenario_testcase').val();
        json.kv.dataCombination = $('#duplicateScenario_datacombination').val();
        json.kv.scenarioName = $('#duplicateScenario_scenario').val();
        json.kv.expectedResult = $('#duplicateScenario_expectedresult').val();
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = $('#duplicateScenario_userstorylistgeneral').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewTestScenario",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                closeModal('duplicateTestCaseModal');
                that.loadTestScenario();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadTestScenario: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTestScenarioList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {

                $('#addScenario_testcase').val('');
                $('#addScenario_testcase').val('');
                $('#addScenario_datacombination').val('');
                $('#addScenario_scenario').val('');
                $('#addScenario_expectedresult').val('');
                $('#addScenario_expectedresult').val('');
                that.loadTestScenarioDetails(res);
                that.tooggleScenarioColums();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    tooggleScenarioColums: function () {
        this.toogleScenarioName();
        this.toogleScenarioData();
        this.toogleScenarioExpectedResult();
    },
    toggleScenarioLines: function (id) {
        $('#div_' + id).toggle();
    },
    deleteTestScenario: function (id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteTestScenario",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadTestScenario();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    showTestScenarioModal: function (id) {
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTestScenarioList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadSUSwithInputForUpdateScenarioModal();
                $('#updateScenario_testcase').val(res.tbl[0].r[0].testCase);
                $('#updateScenario_scenario').val(res.tbl[0].r[0].scenarioName);
                $('#updateScenario_datacombination').val(res.tbl[0].r[0].dataCombination);
                $('#updateScenario_expectedresult').val(res.tbl[0].r[0].expectedResult);
                $('#updateScenario_id').val(res.tbl[0].r[0].id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    dublicateTestCaseModal: function (id) {
        if (!id) {
            return;
        }
        this.loadData4DublicateTestScenario(id);
        this.loadUSList4Dublication();
        this.loadSUSwithInput4Dublication();
    },
    loadData4DublicateTestScenario: function (id) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTestScenarioList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadSUSwithInputForUpdateScenarioModal();
                $('#duplicateScenario_testcase').val(res.tbl[0].r[0].testCase);
                $('#duplicateScenario_scenario').val(res.tbl[0].r[0].scenarioName);
                $('#duplicateScenario_datacombination').val(res.tbl[0].r[0].dataCombination);
                $('#duplicateScenario_expectedresult').val(res.tbl[0].r[0].expectedResult);
                $('#duplicateScenario_id').val(res.tbl[0].r[0].id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addTrial4ScenarioModal: function (arg, id) {
        global_var.current_scenario_id_4_trial = id;
        $('#addTrial4Scenario_id').val(id);
        setGlobalActiveCanvas(global_var.canvas.testTrial);
    },
    addTrial4ScenarioModal: function (arg, id) {
        global_var.current_scenario_id_4_trial = id;
        $('#addTrial4Scenario_id').val(id);
        setGlobalActiveCanvas(global_var.canvas.testTrial);
    },
    addTrial4ScenarioControl: function () {
        if (!$('#addTrial4Scenario_actualresul').val().trim()) {
            Toaster.showError('Please Add Actual Result for Trial.');
            return;
        }
    },
    addTrial4ScenarioBody: function (filename) {
        var isOK = this.hasNotOKTrial($('#addTrial4Scenario_id').val());
        if (isOK === '1' && $('#addTrial4Scenario_trialstatus').val() === 'nok') {
            Toaster.showError('There are Not OK Trial for this Test Scenario. First close them and then add new trial');
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkScenarioId = $('#addTrial4Scenario_id').val();
        json.kv.actualResult = $('#addTrial4Scenario_actualresul').val();
        json.kv.trialStatus = $('#addTrial4Scenario_trialstatus').val();
        json.kv.fileName = filename + global_var.vertical_seperator + global_var.current_upload_canvas;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewTrial",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                closeModal('addTrial4ScenarioModal');
                $('#addTrial4Scenario_id').val("");
                $('#addTrial4Scenario_actualresul').val('');
                $('#file_trial').val('');
                that.loadTestScenario();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addTrial4Scenario: function () {
        this.addTrial4ScenarioControl();
        if (isCanvasContextExist('canvasdiv_testTrial')) {
            try {
                this.loadPicture4TestTrial();
            } catch (err) {
            }
        }

        if ($('#file_trial').val().trim().length > 0) {
            this.sendFileFoTrial4Scenario();
        } else {
            this.addTrial4ScenarioBody('');
        }
    },
    deleteTrial: function (id) {
        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#updateTrial4Scenario_id').val();
        ;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteTrial",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                closeModal('updateTrial4ScenarioModal');
                that.loadTestScenario();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    hasNotOKTrial: function (scenarioId) {
        if (!scenarioId) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkScenarioId = scenarioId;
        var that = this;
        var data = JSON.stringify(json);
        var r = 0;
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmHasNotOKTrial",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                r = res.kv.result;
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
        return r;
    },
    updateTrial4Scenario: function () {
        if (!$('#updateTrial4Scenario_actualresul').val().trim()) {
            Toaster.showError('Please Add Actual Result for Trial.');
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#updateTrial4Scenario_id').val();
        json.kv.actualResult = $('#updateTrial4Scenario_actualresul').val();
        json.kv.trialStatus = $('#updateTrial4Scenario_trialstatus').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateTrial",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                closeModal('updateTrial4ScenarioModal');
                that.loadTestScenario();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    editTrial4ScenarioModel: function (id) {
        if (!id) {
            return;
        }
        $('#updateTrial4Scenario_id').val(id)
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTrialListById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                closeModal('updateTrial4ScenarioModal');
                $('#updateTrial4Scenario_actualresul').val(res.tbl[0].r[0].actualResult);
                $('#updateTrial4Scenario_trialstatus').val(res.tbl[0].r[0].trialStatus);
                that.loadTestScenario();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
//    loadScenarioTrialList: function () {
//
//    },

    getTestScenarioDetailsEmptyMessage: function () {
        var innerHTML = '<tr><td colspan="12" style="padding:30px;text-align:center">' +
                '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                '<h5> No Test Cases have been selected or created on this User Story</h5>' +
                '<p>All Test Cases related to the User Story on this project will appear here</p>' +
                '<p>Please Add Test Case</p>' +
                '</td></tr>';
        return innerHTML;
    },
    loadTestScenarioDetails: function (res) {
        $('#tblTestScenarioList > tbody').html("");
        $('.task-trial-show-hide').removeAttr("style");
        try {
            var obj = res.tbl[0].r;
            if (obj.length === 0) {
                $('#tblTestScenarioList > tbody').html(this.getTestScenarioDetailsEmptyMessage());
                return;
            }
            for (var n = 0; n < obj.length; n++) {
                var img = (res.tbl[0].r[0].userImage)
                        ? fileUrl(res.tbl[0].r[0].userImage)
                        : fileUrl(that.getDefaultUserprofileName());
                var stDel = obj[n].taskStatus === 'new' ?
                        $('<a></a>')
                        .addClass("us-edit")
                        .attr('href', "#")
                        .attr('onclick', "new UserStory().deleteTaskScenario('" + obj[n].id + "')")
                        .append($('<i></i>').addClass("fa fa-trash"))
                        .append(" Delete")
                        : "";
                var scenarioStatusLine = obj[n].updateCount > 0 ?
                        $('<span></span>')
                        .append($('<i></i>')
                                .addClass("fa fa-pencil")
                                .attr("style", "color:blue"))
                        .append(obj[n].scenarioStatus)
                        : "";
                var tr = $('<tr></tr>')
                        .addClass("backlog_task_list")
                        .attr('pid', obj[n].id)
                        .attr('style', 'border-top: 1.6px solid #5181B8;cursor:pointer')
                        .attr('ondblclick', 'new UserStory().toggleScenarioLines("' + obj[n].id + '")');
                tr.append($("<td  class='align-middle' style='text-align: left'></td>")
                        .append((n + 1)))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: left")
                                .html(scenarioStatusLine))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: left")
                                .html($('<span></span>')
//                                        .append('Created by: ')
                                        .append($('<img></img>')
                                                .attr("src", img)
                                                .addClass('figure-img img-fluid rounded-circle')
                                                .attr('style', 'max-width:19px'))
                                        .append('  ')
                                        .append($('<i></i>').attr('style', 'color:#555555;').append($('<b1></b>')
                                                .text(obj[n].userPersonName)))
                                        .append(', ')
                                        .append($('<i></i>').attr('style', 'color:#555555;').append($('<b1></b>')
                                                .text(Utility.convertDate(obj[n].scenarioDate))))
                                        .append(', ')
                                        .append($('<i></i>').attr('style', 'color:#555555;').append($('<b1></b>')
                                                .text(Utility.convertTime(obj[n].scenarioTime))))



                                        .append('<br>')
                                        .append(replaceTags(obj[n].testCase))
                                        ))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .addClass('test-case-scenario')
                                .attr("style", "text-align: left")
                                .html($('<span></span>')
                                        .append(MapTextAreaHtml(replaceTags(obj[n].scenarioName)))))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .addClass('test-case-data')
                                .attr("style", "text-align: left")
                                .html($('<span></span>')
                                        .append(MapTextAreaHtml(replaceTags(obj[n].dataCombination)))))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .addClass('test-case-expectedresult')
                                .attr("style", "text-align: left")
                                .html(MapTextAreaHtml(replaceTags(obj[n].expectedResult))))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center;font-size:19px;")
                                .html($('<a></a>')
                                        .attr('href', "#")
                                        .attr('title', 'View')
                                        .attr("data-toggle", "modal")
                                        .attr("data-target", "#viewTestCaseInfoModal")
                                        .attr("onclick", "new UserStory().viewTestCaseInfoModal(\'" + obj[n].id + "\')")
                                        .append($('<i></i>').addClass('fa fa-eye'))))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center;font-size:19px;")
                                .html($('<a></a>')
                                        .attr('href', "#")
                                        .attr('title', 'Add New Trial')
                                        .attr("data-toggle", "modal")
                                        .attr("data-target", "#addTrial4ScenarioModal")
                                        .attr("onclick", "new UserStory().addTrial4ScenarioModal(this,\'" + obj[n].id + "\')")
                                        .append($('<i></i>').addClass('fa fa-plus'))))

                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html($('<div></div>')
                                        .addClass('dropdown')
                                        .append($("<button></button")
                                                .addClass('"btn btn-primary dropdown-toggle us-prop-btn')
                                                .attr('type', 'button')
                                                .attr('data-toggle', 'dropdown')
                                                .append($('<span></span>').addClass("caret"))
                                                )
                                        .append($('<u></u>')
                                                .addClass("dropdown-menu")
                                                .attr("style", "line-height: 1.6em;text-decoration: none !important;")
                                                .append($('<li></li>')
                                                        .append($('<a></a>')
                                                                .attr('href', "#")
                                                                .addClass("us-edit")
                                                                .attr("data-toggle", "modal")
                                                                .attr("data-target", "#updateScenario")
                                                                .attr("onclick", "new UserStory().showTestScenarioModal(\'" + obj[n].id + "\')")
                                                                .append($('<i></i>').addClass('fa fa-edit'))
                                                                .append(" Edit")))
                                                .append($('<li></li>')
                                                        .append($('<a></a>')
                                                                .attr('href', "#")
                                                                .addClass("us-edit")
                                                                .attr("data-toggle", "modal")
                                                                .attr("data-target", "#duplicateTestCaseModal")
                                                                .attr("onclick", "new UserStory().dublicateTestCaseModal(\'" + obj[n].id + "\')")
                                                                .append($('<i></i>').addClass('fa fa-clone'))
                                                                .append(" Dublicate")))
                                                .append($('<li></li>')
                                                        .append($('<a></a>')
                                                                .attr('href', "#")
                                                                .addClass("us-edit")
                                                                .attr("data-toggle", "modal")
                                                                .attr("data-target", "#linkTestCaseModal")
                                                                .attr("onclick", "new UserStory().linkTestCaseModal(\'" + obj[n].id + "\')")
                                                                .append($('<i></i>').addClass('fa fa-share-square-o'))
                                                                .append(" Link")))
                                                .append($('<li></li>')
                                                        .append($('<a></a>')
                                                                .attr('href', "#")
                                                                .addClass("us-edit")
                                                                .attr("onclick", "new UserStory().deleteTestScenario(\'" + obj[n].id + "\')")
                                                                .append($('<i></i>').addClass('fa fa-trash'))
                                                                .append(" Delete")))

                                                .append($('<li></li>').append(stDel))
                                                )
                                        )
                                )
                        ;
                $('#tblTestScenarioList > tbody').append(tr);
                var rs = this.fillTrialListByScenarioWithReturn(obj[n].id);
//                var rs = '';
                var div = $('<div></div>')
                        .addClass('col')
                        .addClass('scenario-trial-comment')
                        .attr('id', 'div_' + obj[n].id)
                        .append(rs);
                var tr1 = $('<tr  class="backlog_task_list"></tr>').attr('pid', obj[n].id);
                tr1
//                        .append($("<td  class='align-middle' style='padding-left:40px; text-align: center'></td>").html(''))
                        .append($("<td class='align-middle' style='text-align: center'></td>").html(''))
//                        append($("<td></td>")
//                                .addClass('align-middle')
//                                .attr("style", "text-align: center")
//                                .html('')).
//                        .append($("<td></td>")
//                                .addClass('align-middle')
//                                .attr("style", "text-align: center")
//                                .html(''))
                        .append($("<td class='align-middle'  style='text-align: left' colspan=8></td>").append(div));
                $('#tblTestScenarioList > tbody').append(tr1);
                if ($('#userstory_scenario_trial_toogle').is(':checked')) {
                    $('.scenario-trial-comment').show();
                } else {
                    $('.scenario-trial-comment').hide();
                }
            }
        } catch (e) {
            $('#tblTestScenarioList > tbody').html(this.getTestScenarioDetailsEmptyMessage());
        }
    },
    linkTestCase: function () {
        var backlogId = $('#linkTestCaseModal_userstory').val();
        var testCaseId = $('#linkTestCaseModal_id').val();
//        $('#sourcedUSList4Dependency_id').val(id);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.fkTestCaseId = testCaseId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmAddTestCaseLink",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadLinkedTestCases(testCaseId);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadLinkedTestCases: function (testCaseId) {

//        $('#sourcedUSList4Dependency_id').val(id);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkTestCaseId = testCaseId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmLoadLinkedTestCases",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadLinkedTestCasesDetails(res, testCaseId);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadLinkedTestCasesDetails: function (res, testCaseId) {
        $('#linkTestCaseModal_linkedlist > tbody').html("");
        var st = "";
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                var del = '<a href="#" onclick="new UserStory().deleteLinkedUserStory(\''
                        + testCaseId + '\',\''
                        + obj[n].id + '\')"><i class="fa fa-trash" "></i></a>';
                st += '<tr>';
                st += '<td>' + replaceTags(obj[n].backlogName) + '</td>';
                st += '<td>' + del + '</td>';
                st += '</tr>';
            }
        } catch (err) {
        }

        st += '<tr>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>'
        $('#linkTestCaseModal_linkedlist > tbody').html(st);
    },
    deleteLinkedUserStory: function (testCaseId, backlogId) {
        var backlogId = backlogId;
        var testCaseId = testCaseId;
//        $('#sourcedUSList4Dependency_id').val(id);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.fkTestCaseId = testCaseId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteTestCaseLink",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadLinkedTestCases(testCaseId);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    linkTestCaseModal: function (id) {
        this.loadSourcedUserStoryToTestCase(id);
        this.loadLinkedTestCases(id);
    },
    loadSourcedUserStoryToTestCase: function (id) {
        $('#linkTestCaseModal_userstory').html('');
        $('#linkTestCaseModal_id').val(id);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.linkTestCaseModalDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    linkTestCaseModalDetails: function (res) {
        $('#linkTestCaseModal_userstory').html("");
        var obj = res.tbl[0].r;
        $('#linkTestCaseModal_userstory').append($("<option></option>").attr("value", ''));
        for (var n = 0; n < obj.length; n++) {
            $('#linkTestCaseModal_userstory').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName));
        }
    },
//    loadSourcedUserStoryToTestCase: function () {
//        $('#sourcedUSList4Dependency').html('');
//        $('#sourcedUSList4Dependency_id').val(id);
//        var json = {kv: {}};        try {            json.kv.cookie = getToken();        } catch (err) {        }
//        json.kv.fkProjectId = global_var.current_project_id;
//        json.kv.asc = 'backlogName';
//        var that = this;
//        var data = JSON.stringify(json);
//        $.ajax({
//            url: urlGl+"api/post/srv/serviceTmGetSourcedBacklogList4Combo",
//            type: "POST",
//            data: data,
//            contentType: "application/json",
//            crossDomain: true,
//            async: true,
//            success: function (res) {
//                that.addDependencyModalDetails(res);
//            },
//            error: function () {
//                Toaster.showError(('somethingww'));
//            }
//        });
//    },

    viewTestCaseInfoModal: function (id) {
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTestScenarioList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#viewScenario_testcase').val(res.tbl[0].r[0].testCase);
                $('#viewScenario_scenario').val(res.tbl[0].r[0].scenarioName);
                $('#viewScenario_datacombination').val(res.tbl[0].r[0].dataCombination);
                $('#viewScenario_expectedresult').val(res.tbl[0].r[0].expectedResult);
                $('#viewScenario_id').val(res.tbl[0].r[0].id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    toggleActualResult: function () {
        if ($('#addScenario_showactualresult').is(':checked')) {
            $('.test-actual-result-toggle').show();
        } else {
            $('.test-actual-result-toggle').hide();
        }
    },
    bindTicketToSUS: function () {
        if (!$('#bindTicketToSUSModal_id').val()) {
            return;
        }

        var assignee = this.getTicketAssignee();
        if (!assignee) {
            Toaster.showError('Please select Assignee(s).');
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#bindTicketToSUSModal_id').val();
        json.kv.fkSourcedId = $('#bindTicketToSUSModal_suslist').val();
        json.kv.assignee = assignee;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmBindTicketToSUS",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.changeStatusIconOfUserStoryByStoryId($('#bindTicketToSUSModal_id').val(), res.kv.backlogStatus);
                that.clickOnThe1stUserStory();
                $('#bindTicketToSUSModal').modal('hide');
                if ($('#bindTicketToSUSModal_suslist').val()) {
                    that.addBindedIconToUserStoryById(
                            $('#bindTicketToSUSModal_id').val(), res.kv.isSourced, true);
                } else {
                    that.addBindedIconToUserStoryById(
                            $('#bindTicketToSUSModal_id').val(), res.kv.isSourced, false);
                }
                that.load();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    selectTaskTypesBySUS: function (e) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = $(e).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogTaskList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.selectTaskTypesBySUSDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    selectTaskTypesBySUSDetails: function (res) {
        $('#notifyTicketAsBug_tasktypes').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#notifyTicketAsBug_tasktypes').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .html(replaceTags(obj[n].taskTypeName) + " (" + replaceTags(obj[n].assigneeName) + ")"));
        }
    },
    setFilterNextPaging: function () {
        var rc = parseFloat(global_var.user_story_core_filter_current_index)
                + parseFloat($('#us_core_filter_perpage').val());
        if (rc <= parseFloat($('#us_core_filter_paginationresult_rowcount').html())) {
            global_var.user_story_core_filter_current_index = rc;
        }
        global_var.user_story_core_filter_paging_button_pressed = "1";
        try {
            this.load();
        } catch (e) {

        }
        global_var.user_story_core_filter_paging_button_pressed = "";
    },
    genUsFilterCreatedBy: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'userName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.genUsFilterCreatedByDetails(res);
                that.genUsFilterAssigneeByTaskDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    genUsFilterAssigneLabel: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmLoadAssignedLabelByProject",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.genUsFilterAssigneLabelDetailes(res);
            }
        });
    },
    genUsFilterAssigneLabelDetailes: function (res) {
        try {
            $('#us_filter_assignedlabel').html("");
            var obj = res.tbl[0].r;
            var st = "";
            st += "<table style=\"width:100%\">"
            var idx = 0;
            for (var n = 0; n < obj.length; n++) {
                if ((st.includes(obj[n].fkLabelId))) {
                    continue;
                }
                if (idx % 3 === 0) {
                    st += '</tr><tr>'
                    idx++;
                }
                st += '<td>'
                st += ' <input type="checkbox" class="us_filter_assignedlabel_class"  id="'
                        + obj[n].fkLabelId + '" value="' + obj[n].fkLabelId + '">' +
                        replaceTags(obj[n].name) + '</input>';
                st += '</td>'

            }
            st += '</table>';
            $('#us_filter_assignedlabel').html((st));
        } catch (e) {
        }
    },
    genUsFilterTaskTypes: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'typeName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.genUsFilterTaskTypesDetails(res);
            }
        });
    },
    genUsFilterTaskTypesDetails: function (res) {
        $('#us_filter_tasktypes').html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="us_filter_tasktype_class"  id="'
                    + obj[n].id + '" value="' + obj[n].id + '">' +
                    replaceTags(obj[n].typeName) + '</input>'
            st += '</td>'

        }
        st += '</table>';
        $('#us_filter_tasktypes').html((st));
    },
    genUsFilterCreatedByDetails: function (res) {
        $('#us_filter_createdby').html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="us_filter_createdby_class"  id="'
                    + obj[n].fkUserId + '" value="' + obj[n].fkUserId + '">' +
                    replaceTags(obj[n].userName) + '</input>'
            st += '</td>'

        }
        st += '</table>';
        $('#us_filter_createdby').html((st));
    },
    genUsFilterAssigneeByTaskDetails: function (res) {
        $('#us_filter_assigneebytask').html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="us_filter_assignee_class"  id="'
                    + obj[n].fkUserId + '" value="' + obj[n].fkUserId + '">' + replaceTags(obj[n].userName) + '</input>'
            st += '</td>'

        }
        st += '</table>';
        $('#us_filter_assigneebytask').html((st));
    },
    getNotifierList4Update: function () {
        var st = "";
        $('.updateTaskType_nofity').each(function () {
            if ($(this).prop("checked")) {
                st += replaceTags($(this).val()) + "|";
            }
        });
        return st;
    },
    filterByUserStoryName: function (e) {
        global_var.userStoryFilter.userstory = $(e).val();
        global_var.user_story_core_filter_current_index = '0';
        Utility.addParamToUrl('user_story_core_filter_current_index', global_var.user_story_core_filter_current_index);
        Utility.addParamToUrl('userStoryFilter.userstory ', global_var.userStoryFilter.userstory);
        this.load();
    },
    assignLabelModal: function (id) {
        $('#' + id).html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetLabelList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.assignLabelModalDetails(res, id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    assignLabelModalDetails: function (res, id) {
        var vid = ''
        if (id) {
            vid = id;
        }
        $('#' + vid).html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr style="line-height: 1;">'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="assignLabelModal_labelcheckbox"  id="'
                    + obj[n].id + '" value="' + obj[n].id + '">&nbsp<span style="font-size:13px;color:' +
                    obj[n].color + "\">";
            st += obj[n].isMenu === '1' ? '(Menu)-' : '';
            st += replaceTags(obj[n].name) + '</span>';
            st += '</td>'

        }
        st += '</table>';
        $('#' + vid).html((st));
    },
    assignSprintModal: function (id) {
        $('#' + id).html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSprintList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.assignSprintModalDetails(res, id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    assignSprintModalRadioButton: function (id) {
        $('#' + id).html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSprintList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.assignSprintModalDetailsRadioButton(res, id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    assignSprintModalDetailsRadioButton: function (res, id) {
        var vid = 'assignSprintModal_sprintlist'
        if (id) {
            vid = id;
        }
        $('#' + vid).html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr ><tr style="line-height: 1;">'
            }
            var d = ((obj[n].sprintStartDate) && (obj[n].sprintEndDate))
                    ? " (<i>" + Utility.convertDate(obj[n].sprintStartDate) + "-" + Utility.convertDate(obj[n].sprintEndDate) + "</i>)"
                    : "";
            st += '<td>'
            st += ' <input type="radio" name="sprintRadio" class="assignSprintModal_sprintcheckbox"  id="' + obj[n].id +
                    '" value="' + obj[n].id + '">&nbsp<span style="font-size:13px;color:'
                    + obj[n].sprintColor + "\">" + replaceTags(obj[n].sprintName) + d + '</span>'
            st += '</td>'

        }
        st += '</table>';
        $('#' + vid).html((st));
    },
    assignSprintModalDetails: function (res, id) {
        var vid = 'assignSprintModal_sprintlist'
        if (id) {
            vid = id;
        }
        $('#' + vid).html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr ><tr style="line-height: 1;">'
            }

            var d = ((obj[n].sprintStartDate) && (obj[n].sprintEndDate))
                    ? " (<i>" + Utility.convertDate(obj[n].sprintStartDate) + "-" + Utility.convertDate(obj[n].sprintEndDate) + "</i>)"
                    : "";
            st += '<td>'
            st += ' <input type="radio" name="assignSprintModal" class="assignSprintModal_sprintcheckbox"  id="' + obj[n].id +
                    '" value="' + obj[n].id + '">&nbsp<span style="font-size:13px;color:'
                    + obj[n].sprintColor + "\">" + replaceTags(obj[n].sprintName) + d + '</span>'
            st += '</td>'

        }
        st += '</table>';
        $('#' + vid).html((st));
    },
    getBacklogList4AssignLabeltoUserStory: function () {
        var st = "";
        $('.us-checkbox-list').each(function (e) {
            if ($(this).is(':checked')) {
                st += $(this).attr('id') + "|";
            }
        });
        return st;
    },
    getBacklogList4AssignLabeltoUserStory: function () {
        var st = "";
        $('.us-checkbox-list').each(function (e) {
            if ($(this).is(':checked')) {
                if ($(this).attr('id') !== 'undefined' || $(this).attr('id')) {
                    st += $(this).attr('id') + "|";
                }

            }
        });
        return st;
    },
    getLabelList4AssignLabeltoUserStoryByDiv: function (divId) {
        var st = "";
        $('#' + divId).find('.assignLabelModal_labelcheckbox').each(function (e) {
            if ($(this).is(':checked')) {
                st += $(this).attr('id') + "|";
            }
        });
        return st;
    },
    showIPOInputDescription: function () {
        global_var.current_ipo_view = "desc";
        $('.ipo-2-hisse-input-des').show();
        $('.ipo-2-hisse-user-interface').hide();
        this.genIPOInputDescList();
        this.setRelatedSUS();
        this.setGUIComponentValues();
    },
    showIPOUserInterface: function () {
        $('.ipo-2-hisse-input-des').hide();
        $('.ipo-2-hisse-user-interface').show();
        global_var.current_ipo_view = "gui";
    },
    clickCurrentIPOInputTable: function () {
        $('#ipo_tr_' + global_var.current_us_input_id).click();
    },
    setCurrentIPOView: function (arg) {

        global_var.current_ipo_view = arg;
        if (arg === 'desc') {
            this.clickCurrentIPOInputTable();
        }
    },
    manageIPOTablenameLeftSize: function (arg) {
        $('.ipo-1-hisse')
                .removeClass('col-1')
                .removeClass('col-2')
                .removeClass('col-3')
                .removeClass('col-4')
                .removeClass('col-6')
                .removeClass('col-12')
                .addClass('col-' + arg)

    },
    getSprintList4AssignSprinttoUserStory: function () {
        var st = "";
        $('.assignSprintModal_sprintcheckbox').each(function (e) {
            if ($(this).is(':checked')) {
                st += $(this).attr('id') + "|";
            }
        });
        return st;
    },
    getSprintList4AssignSprinttoUserStoryByDiv: function (divId) {
        var st = "";
//        $('#' + divId).find('.assignSprintModal_sprintcheckbox').first()
        $('#' + divId).find('.assignSprintModal_sprintcheckbox').each(function (e) {
            if ($(this).is(':checked')) {
                st += $(this).attr('id');
                return st;
            }
        });
        return st;
    },
    insertNewBacklogDesc: function () {
        if (!$('#backlogDescriptionText').val()) {
            return
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.description = $('#backlogDescriptionText').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklogDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.getBacklogDesc();
                $('#backlogDescriptionText').val('');
                $('#backlogDescriptionText').focus();
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },

    getBacklogDesc: function () {
        $('#generalview_backlog_proc_desc_list').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogDescriptionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.getBacklogDescDetails(res);
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },

    getBacklogDescDetails: function (res) {
        var table = this.getBaklogDescriptionTableHtml(res);
        $('#generalview_backlog_proc_desc_list').html('').append(table);
    },

    getBaklogDescriptionTableHtml: function (res) {
        var obj = res.tbl[0].r;
        var table = $('<table class="table table-hover table-bordered descriptiontable" style="margin-top: 8px;"><tbody>');
var lasttr=$('<tr><td><img class="sc-IbsAh kqHqhS" role="presentation" src="https://jirainteqrasiya.atlassian.net/secure/viewavatar?size=medium&amp;avatarId=10318&amp;avatarType=issuetype"></td><td ><input type="text" id="backlogDescriptionText" class="form-control newinp" placeholder="Add description" onchange="new UserStory().insertNewBacklogDesc()" ></td><td><div class="dropdown" style="display: inline-block;"> <button class="btn newin dropdown-toggle fa fa-ellipsis-h" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '</button><div class="dropdown-menu" aria-labelledby="dropdownMenuLink"><button class="dropdown-item" onclick="new UserStory().deleteBacklogDesc(this,\'20060718154601415977\')">Delete</button></div></div></td></tr>');
        for (var n = 0; n < obj.length; n++) {
            var tr = $("<tr>").append($('<td>').html('<img class="sc-IbsAh kqHqhS" role="presentation" src="https://jirainteqrasiya.atlassian.net/secure/viewavatar?size=medium&avatarId=10318&avatarType=issuetype">'))
                    .append($('<td>').attr("onclick", "new UserStory().toogleBacklogDescEdit(this,'" + obj[n].id + "')").attr('idesc', replaceTags(Replace2Primes(obj[n].description)))
                        .append(obj[n].description))
                    .append($('<td>')
                            .append($('<div class="dropdown" style="display: inline-block;">')

                                    .append(' <button class="btn newin dropdown-toggle fa fa-ellipsis-h" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
                                        '</button>')
                                    .append($('<div class="dropdown-menu uuu" aria-labelledby="dropdownMenuLink">')
                                        .append($('<button class="dropdown-item firstbut" >')
                                            .text('Delete')
                                        .attr("onclick", "new UserStory().deleteBacklogDesc(this,'" + obj[n].id + "')")
                                      )
                                        .append($('<button class="dropdown-item firstbut" >')
                                            .text('Add')
                                            .attr("onclick", "ADDtrafter(this)")
                                        )

                                    )));


            table.append(tr);

        }
        table.append(lasttr)
        return table;
    },




    deleteBacklogDesc: function (el, id) {
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteBacklogDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.getBacklogDesc();
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },

    updateBacklogDesc: function (el, id) {
        if ($(el).val().length === 0) {
            Toaster.showError("Value is empty!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        json.kv.description = $(el).val();

        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdatetBacklogDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $(el).closest('tr').removeClass('activetr');
                $(el).closest('td').attr('idesc', $(el).val());
                $(el).closest('td').html($(el).val());

                    // .removeClass('activetr');
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },

    toogleBacklogDescEdit: function (e, id) {
        $(".descriptiontable tr").removeClass("activetr");
        var inp = $('<input type="text" class="form-control newinp" style="border:white;" >')
                .css("width", "100%")
                .attr("onchange", "new UserStory().updateBacklogDesc(this,'" + id + "')")

            .val($(e).attr('idesc'))

        $(e).html(inp);
        $(e).parent("tr").addClass("activetr");

        inp.focus();
    },

    assignLabeltoUserStory: function () {
        var backlogs = this.getBacklogList4AssignLabeltoUserStory();
        var labels = this.getLabelList4AssignLabeltoUserStoryByDiv('assignLabelModal_labellist');
        if (backlogs.length === 0 || labels.length === 0) {
            return
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogs;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkLabelId = labels;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklogLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);
                $('#assignLabelModal').modal('hide');
                that.refreshCurrentBacklog();
                new Label().load()
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteLabelFromUserStory: function () {
        var backlogs = this.getBacklogList4AssignLabeltoUserStory();
        var labels = this.getLabelList4AssignLabeltoUserStoryByDiv('assignLabelModal_labellist');
        if (backlogs.length === 0 || labels.length === 0) {
            return
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogs;
        json.kv.fkLabelId = labels;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteBacklogLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);
                $('#assignLabelModal').modal('hide');
                that.refreshCurrentBacklog();
                new Label().load()
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    clickOnThe1stUserStory: function () {
        $('#container-us-body').find('.us-selected').first().find('a').first().click();
    },
    assignSprinttoUserStory: function () {
        var backlogs = this.getBacklogList4AssignLabeltoUserStory();
        var sprints = this.getSprintList4AssignSprinttoUserStoryByDiv('assignSprintModal_sprintlist');
        if (backlogs.length === 0 || sprints.length === 0) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogs;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkSprintId = sprints;
        json.kv.isNotAssign = 1;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklogSprint",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);
                $('#assignSprintModal').modal('hide');
                that.refreshCurrentBacklog();
                new Sprint().load()
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteSprintFromUserStory: function () {
        var backlogs = this.getBacklogList4AssignLabeltoUserStory();
        var sprints = this.getSprintList4AssignSprinttoUserStoryByDiv('assignSprintModal_sprintlist');
        if (backlogs.length === 0 || sprints.length === 0) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogs;
        json.kv.fkSprintId = sprints;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteBacklogSprint",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);
                $('#assignSprintModal').modal('hide');
                that.refreshCurrentBacklog();
                new Sprint().load()
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    checkAllTaskTypeNotifiers: function () {
        $('.addTaskType_nofity').each(function () {
            $(this).prop('checked', true);
        });
    },
    uncheckAllTaskTypeNotifiers: function () {
        $('.addTaskType_nofity').each(function () {
            $(this).prop('checked', false);
        });
    },
    printGeneralView: function () {



//        var res =  $("#smb-details-generalview").html();
//        newWin = window.open("");
//        newWin.document.write(res);
//        newWin.print();
//        newWin.close();

        var mywindow = window.open('', 'my div', 'height=1000px,width=1200px');
        mywindow.document.write('<html><head><title></title>');
        mywindow.document.write('<link rel="stylesheet" href="http://www.test.com/style.css" type="text/css" />');
        mywindow.document.write('<link rel="stylesheet" href="resource/css/bs4/bootstrap.min.css">');
        mywindow.document.write('<link rel="stylesheet" href="resource/css/bs4/bs4-custom.css">');
        mywindow.document.write('<style type="text/css">.test { color:red; } </style></head><body>');
        mywindow.document.write($("#smb-details-generalview").html());
        mywindow.document.write('</body></html>');
        window.setTimeout(function () {
            // do whatever you want to do    
            mywindow.print();
        }, 600);
//        mywindow.print();
////        mywindow.document.close();
//        mywindow.document.close();
//        mywindow.print();
//        mywindow.close();

    },
    toPDF: function () {
        var pdf = new jsPDF('p', 'mm', 'a4');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = $('#smb-details-generalview').html();
        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        margins = {
            top: 30,
            bottom: 30,
            left: 40,
            height: 211,
            width: 298
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, {// y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': specialElementHandlers
                },
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html
                    pdf.save('Test.pdf');
                }, margins
                );
    },
    toDOC: function () {


        var st = ('<html><head><title></title>');
        st += ('<link rel="stylesheet" href="http://www.test.com/style.css" type="text/css" />');
        st += ('<link rel="stylesheet" href="resource/css/bs4/bootstrap.min.css">');
        st += ('<link rel="stylesheet" href="resource/css/bs4/bs4-custom.css">');
        st += ('<style type="text/css">.test { color:red; } </style></head><body>');
        st += ($("#smb-details-generalview").html());
        st += ('</body></html>');
        var sourceHTML = st;
        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
//        var mywindow = window.open('', 'my div', 'height=1000px,width=1200px');
//
//        var st =('<html><head><title></title>');
//        st +=('<link rel="stylesheet" href="http://www.test.com/style.css" type="text/css" />');
//       st +=('<link rel="stylesheet" href="resource/css/bs4/bootstrap.min.css">');
//        st +=('<link rel="stylesheet" href="resource/css/bs4/bs4-custom.css">');
//       st +=('<style type="text/css">.test { color:red; } </style></head><body>');
//       st +=($("#smb-details-generalview").html());
//       st +=('</body></html>');


//        window.setTimeout(function () {
//            // do whatever you want to do    
//            mywindow.print();
//        }, 600);
//$('#smb-details-generalview').html();
//        var elHtml =  $('#smb-details-generalview').html();
//        var link = document.createElement('a');
//        link.setAttribute('download', 'tags.doc');
//        link.setAttribute('href', 'data:' + 'text/doc' + ';charset=utf-8,' + encodeURIComponent(elHtml));
//        link.click();
    },
    addTaskType: function () {

        if ($('#addTaskType_showcomment').is(':checked')
                && isCanvasContextExist('canvasdiv_taskType')) {
            try {
                this.loadPicture4TestCase();
            } catch (err) {
            }
        }

        if ($('#file4AddTaskType').val().trim().length > 0) {
//            this.sendFileForComment4Task();
            this.sendFileForAddTaskType();
        } else {
            this.addTaskTypeDetails('');
        }


    },
    setStatusOngoing4Comment: function (id) {
        if (!id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSetStatusOngoing4Comment",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#comment_status_' + id).html('ongoing');
                $('#comment_status_' + id).removeAttr("class")
                        .addClass('us-item-status-ongoing');
//                that.loadBacklogTask();
                that.refreshCurrentBacklog();
            }
        });
    },
    setStatusNew4Comment: function (id) {
        if (!id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSetStatusNew4Comment",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#comment_status_' + id).html('new');
                $('#comment_status_' + id).removeAttr("class")
                        .addClass('us-item-status-new');
//                that.loadBacklogTask();
                that.refreshCurrentBacklog();
            }
        });
    },
    addTaskTypeDetails: function (filename) {
        if ($('#addTaskType_tasktype').val().length === 0) {
            Toaster.showError("Task Type is not selected!");
            return;
        }
        if ($('#addTaskType_estiamtedhours').val().length === 0) {
            Toaster.showError("Estimated Hours is not entered!");
            return;
        }
        if ($('#addTaskType_assignee').val().length === 0) {
            Toaster.showError("Assignee is not selected!");
            return;
        }

        var comment = "";
        var commentType = "";
        var add2jira = "0";
        var id = 'addTaskType_showcomment';
        var checked = $("input[id=" + id + "]:checked").length;
        if (checked === 1) {
            comment = $('#addTaskType_comment').val();
            commentType = $('#addTaskType_commenttype').val();
        }
        if ($("input[id=addTaskType_add2jira]:checked").length === 1) {
            add2jira = "1";
        }

        $('#addTaskType_addbutton').hide();
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkTaskTypeId = $('#addTaskType_tasktype').val();
        json.kv.fkAssigneeId = $('#addTaskType_assignee').val();
        json.kv.estimatedHours = $('#addTaskType_estiamtedhours').val();
        json.kv.dependentTaskType1Id = $('#addTaskType_tasktype1').val();
        json.kv.dependentTaskType2Id = $('#addTaskType_tasktype2').val();
        json.kv.fkNotifierId = this.getNotifierList();
        json.kv.add2jira = add2jira;
        json.kv.comment = comment;
        json.kv.commentType = commentType;
        json.kv.commentEstimationHours = $('#addTaskType_estiamtedhours').val();
        json.kv.filename = filename + global_var.vertical_seperator + global_var.current_upload_canvas;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklogTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {

                that.addSourcedIconToUserStory(res);
                that.loadBacklogTask(res);
                that.changeStatusIconOfUserStory(res);
                new Project().getProjectStatList();
                that.refreshCurrentBacklog();
                $('#addTaskType_addbutton').show();
                var id = 'addTaskType_closeafterinsert';
                var checked = $("input[id=" + id + "]:checked").length;
                if (checked === 1) {
                    $('#addTaskType_comment').val('');
                    $('#AddTaskType_filelist').html('');
                    $('#file4AddTaskType').val('');
                    closeModal('addTaskType');
                }

            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    toggleInsertNewTaskTypeComment: function () {
        var id = 'addTaskType_showcomment';
        var checked = $("input[id=" + id + "]:checked").length;
        if (checked === 1) {
            $('.addtasktype_toggle').show();
        } else {
            $('.addtasktype_toggle').hide();
        }
    },
    addSourcedIconToUserStory: function (res) {
        var st = '';
        if (res.kv.isSourced === "true") {
            st = ' <i class="fa fa-cube" style="color: darkred;">&nbsp;</i>';
        }
        $('#container-us-body').find('.us-selected').first().find('span').first().html((st));
    },
    addBindedIconToUserStoryById: function (id, isSourced, changeIt) {
        var st = '';
        if (isSourced === '1') {
            return;
        } else if (changeIt) {
            st = ' <i class="fa fa-bandcamp" style="color: green;">&nbsp;</i>';
        }

        $('#container-us-body').find('tr[sid=' + id + ']').first().find('.isSourced').first().html(st);
    },
    refreshCurrentBacklogById: function (id) {
        $('#container-us-body').find('tr[sid=' + id + ']').first().find('a').first().click();
    },
    refreshCurrentBacklog: function () {
        if (global_var.current_backlog_id.length > 0 &&
                $('#container-us-body').find('tr[sid=' + global_var.current_backlog_id + ']').html()) {
            $('#container-us-body').find('tr[sid=' + global_var.current_backlog_id + ']').first().each(function () {});

            $('#container-us-body').find('tr[sid=' + global_var.current_backlog_id + ']').first().find('a').first().focus();
            $('#container-us-body').find('tr[sid=' + global_var.current_backlog_id + ']').first().find('a').first().click();
        } else {
            this.clickFirstUserStory();
        }
    },
    toggleDetailedFilter: function (e) {
//        if ($(e).is(":checked")) {
//            $('#us_detailed_filter_div').show();
        if ($('.drop-filter-menu').hasClass('show')) {
            console.log('has')
            $('.drop-filter-menu').removeClass('show');
        } else {
            console.log('not has')
            this.genUsFilterAssigneLabel();
        }


//            if (global_var.current_view === 'detailed') {
//                $('#container-us-body-main').attr("style", "height:30vh");
//            }
//        } else {
//            $('#us_detailed_filter_div').hide();
//            if (global_var.current_view === 'detailed') {
//                $('#container-us-body-main').attr("style", "height:50vh");
//            }
//        }
    },
    changeStatusIconOfUserStory: function (res) {
        var st = '<div class="us-list-item   us-item-status-' +
                replaceTags(res.kv.backlogStatus) + '">'
                + replaceTags(res.kv.backlogStatus) + '</div>';
        $('#container-us-body').find('.us-selected').first().find('.backlog-status').first().html(st);
    },
    changeStatusIconOfUserStoryByStoryId: function (id, status) {
        var st = '<div class="us-list-item   us-item-status-' + replaceTags(status) + '">' + replaceTags(status) + '</div>';
        $('#container-us-body').find('tr[sid=' + id + ']').first().find('.backlog-status').first().html(st);
    },
    showNofityBugModal: function (e) {
        $('#notifyBacklogTaskBug').val('');
    },
    showNofityBugModal: function (e) {
        $('#notifyBacklogTaskUpdate').val('');
    },
    notifyUpdate4BacklogTask: function () {
        if ($('#notifyBacklogTaskUpdate').val().trim().length === 0) {
            Toaster.showError("Please enter description of the Update!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_task_id;
        json.kv.description = $('#notifyBacklogTaskUpdate').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmNotifyUpdate",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadBacklogTask(res);
                $('#notifyUpdateModal').modal('hide');
                $('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').prop("checked", "true");
                that.backlogTaskListItemCheck($('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').first());
                that.changeStatusIconOfUserStory(res);
                that.updateStatusOfBacklogBySourcedId(global_var.current_backlog_id);
                new Project().getProjectStatList();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    notifyBug4BacklogTask: function () {

        if ($('#notifyBacklogTaskBug').val().trim().length === 0) {
            Toaster.showError("Please enter description of the Bug!");
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_task_id;
        json.kv.description = $('#notifyBacklogTaskBug').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmNotifyBug",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadBacklogTask(res);
                $('#notifyBugModal').modal('hide');
                $('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').prop("checked", "true");
                that.backlogTaskListItemCheck($('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').first());
                that.changeStatusIconOfUserStory(res);
                that.updateStatusOfBacklogBySourcedId(global_var.current_backlog_id);
                new Project().getProjectStatList();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateTaskType: function () {
        if ($('#updateTaskType_id').val().length === 0) {
            Toaster.showError("Task is not selected!");
            return;
        }
        if (!$('#updateTaskType_tasktype').val()) {
            Toaster.showError("Task Type is not selected!");
            return;
        }
        if (!$('#updateTaskType_assignee').val()) {
            Toaster.showError("Assignee is not selected!");
            return;
        }
        if ($('#updateTaskType_estiamtedhours').val().length === 0) {
            Toaster.showError("Estimated Hours is not entered!");
            return;
        }
        if ($('#updateTaskType_spenthours').val().length === 0) {
            Toaster.showError("Spent Hours is not entered!");
            return;
        }
        if (!$('#updateTaskType_status').val()) {
            Toaster.showError("Status is not selected!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#updateTaskType_id').val();
        json.kv.fkTaskTypeId = $('#updateTaskType_tasktype').val();
        json.kv.fkAssigneeId = $('#updateTaskType_assignee').val();
        json.kv.estimatedHours = $('#updateTaskType_estiamtedhours').val();
        json.kv.spentHours = $('#updateTaskType_spenthours').val();
        json.kv.dependentTaskType1Id = $('#updateTaskType_tasktype1').val();
        json.kv.dependentTaskType2Id = $('#updateTaskType_tasktype2').val();
        json.kv.taskStatus = $('#updateTaskType_status').val();
        json.kv.fkNotifierId = this.getNotifierList4Update();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateBacklogTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {

                $('#updateTaskTypeModal').modal('hide');
                $('#smb-details-tasks').find('input[id=' + $('#updateTaskType_id').val() + ']').prop("checked", "true");
//                that.backlogTaskListItemCheck($('#smb-details-tasks').find('input[id=' + $('#updateTaskType_id').val() + ']').first());
                that.changeStatusIconOfUserStory(res);
                that.refreshCurrentBacklog();
                that.updateStatusOfBacklogBySourcedId(global_var.current_backlog_id);
                new Project().getProjectStatList();
                that.loadBacklogTask(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    showUpdateBacklogTaskModal: function (id) {
        this.updateAssigneeToTaskType();
        this.updateTaskTypesToCombo();
        this.getBacklogTaskInfo(id);
    },
    getBacklogTaskInfo: function (id) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogTaskList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.getBacklogTaskInfoDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        })
    },
    getBacklogTaskInfoDetails: function (res) {
        $('#updateTaskType_id').val(replaceTags(res.tbl[0].r[0].id));
        $('#updateTaskType_assignee').val(replaceTags(res.tbl[0].r[0].fkAssigneeId));
        $('#updateTaskType_tasktype').val(replaceTags(res.tbl[0].r[0].fkTaskTypeId));
        $('#updateTaskType_tasktype1').val(replaceTags(res.tbl[0].r[0].dependentTaskType1Id));
        $('#updateTaskType_tasktype2').val(replaceTags(res.tbl[0].r[0].dependentTaskType2Id));
        $('#updateTaskType_estiamtedhours').val(replaceTags(res.tbl[0].r[0].estimatedHours));
        $('#updateTaskType_spenthours').val(replaceTags(res.tbl[0].r[0].spentHours));
        $('#updateTaskType_status').val(replaceTags(res.tbl[0].r[0].taskStatus));
//        this.getBacklogTaskInfoDetails4Notifier(res);
    },
    getBacklogTaskInfoDetails4Notifier: function (res) {
        var obj = res.tbl[0].r[0].fkNotifierId.split('%IN%');
//        console.log('notifier='+obj);
        for (var n = 0; n < obj.length; n++) {
            $('#updateTaskTypeModal').find('input[id=' + obj[n] + ']').each(function () {
//                console.log('val='+$(this).val());
                $(this).prop('checked', true);
            });
        }
    },
    deleteBacklogTask: function (id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteBacklogTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.addSourcedIconToUserStory(res);
                that.loadBacklogTask();
                that.changeStatusIconOfUserStory(res);
                that.updateStatusOfBacklogBySourcedId(global_var.current_backlog_id);
                new Project().getProjectStatList();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadBacklogTask: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogTaskList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadBacklogTaskDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    toggleBacklogTaskListItem: function (e) {

    },
    setUSTaskAsOngoing: function (task_id) {
        if (!task_id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = task_id;
        json.kv.taskStatus = 'ongoing';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateBacklogTaskOnStatusOngoing",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadBacklogTask();
                $('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').prop("checked", "true");
                that.backlogTaskListItemCheck($('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').first());
                that.changeStatusIconOfUserStory(res);
                that.updateStatusOfBacklogBySourcedId(global_var.current_backlog_id);
                new Project().getProjectStatList();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    showCloseBacklogTaskModal: function (id) {
        $('#closeBacklogTask_spenthours').attr('pid', id);
        Utility.focus('closeBacklogTask_spenthours');
//        $('#').focus();
    },
    closeBacklogTask: function (e) {
        if (!$('#closeBacklogTask_spenthours').val()) {
            Toaster.showError("Please enter Spent Hour(s)!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.id = global_var.current_us_task_id;
        json.kv.id = $('#closeBacklogTask_spenthours').attr('pid')
        json.kv.spentHours = $('#closeBacklogTask_spenthours').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateBacklogTaskOnCloseTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#closeBacklogTaskModal').modal('hide')
                that.refreshCurrentBacklog();
                $('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').prop("checked", "true");
                that.backlogTaskListItemCheck($('#smb-details-tasks').find('input[id=' + global_var.current_us_task_id + ']').first());
                that.changeStatusIconOfUserStory(res);
                that.updateStatusOfBacklogBySourcedId(global_var.current_backlog_id);
                new Project().getProjectStatList();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    backlogTaskListItemCheck: function (e) {
//       '<input class="backlogTaskListItemChecked" onclick="new UserStory().backlogTaskListItemCheck(this)" type="checkbox" id="' + obj[n].id + '">')).
//               var checked = $("input[id=" + id + "]:checked").length;
        if ($(e).is(":checked")) {
            $('.backlogTaskListItemChecked').not(e).prop("checked", false);
            $('.us-task-enable').attr("style", "pointer-events:default;");
            global_var.current_us_task_id = $(e).attr('id');
            Utility.addParamToUrl('current_us_task_id', global_var.current_us_task_id);
            if ($(e).attr('status') === 'new') {
                $('#us_task_set_status_ongoing').attr("style", "pointer-events:default;");
            } else {
                $('#us_task_set_status_ongoing').attr("style", "pointer-events:none;color:gray;");
            }

            if ($(e).attr('status') != 'closed') {
                $('#us_task_close_task').attr("style", "pointer-events:default;");
            } else {
                $('#us_task_close_task').attr("style", "pointer-events:none;color:gray;");
            }
        } else {
            $('.us-task-enable').attr("style", "pointer-events:none;color:gray;")
            global_var.current_us_task_id = '';
            Utility.addParamToUrl('current_us_task_id', global_var.current_us_task_id);
        }


    },
    backlogTaskListItemCheckEventTrue: function () {

    },
    taskStart: function (id, el) {
        if (!id) {
            return;
        }

        $(el).closest('td').find('.fa-stop-circle').first().show();
        $(el).hide();
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmStartTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                that.loadBacklogTask();
                that.refreshCurrentBacklog();
            },
            error: function () {
//                Toaster.showError(('somethingww'));
            }
        });
    },
    taskStop: function (id, el) {
        if (!id) {
            return;
        }

        $(el).closest('td').find('.fa-play-circle').first().show();
        $(el).hide();
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmStopTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                that.loadBacklogTask();
                that.refreshCurrentBacklog();
            },
            error: function () {
//                Toaster.showError(('somethingww'));
            }
        });
    },
    getStartTimeDiff: function (startDate, currentDate, startTime, currentTime) {
        if (!startDate || !currentDate || !startTime || !currentTime) {
            return;
        }

        var r = 0;
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fromDate = startDate;
        json.kv.toDate = currentDate;
        json.kv.fromTime = startTime;
        json.kv.toTime = currentTime;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetDateDiffInHours",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                r = res.kv.diff;
            },
            error: function () {
//                Toaster.showError(('somethingww'));
            }
        });
        return r;
    },
    loadBacklogTaskDetails: function (res) {
//        console.log('json->'+JSON.stringify(res));
        $('#tblBacklogTaskList > tbody').html("");
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {

                var imgAssigneeLink = obj[n].assigneeImageUrl.length === 0
                        ? fileUrl(new User().getDefaultUserprofileName())
                        : fileUrl(obj[n].assigneeImageUrl);
                var imgAssignee = $('<img></img>')
                        .addClass('figure-img img-fluid rounded-circle')
                        .attr('style', 'max-width:25px;margin:5px;')
                        .attr('src', imgAssigneeLink)
                        ;
                var stDel = obj[n].taskStatus === 'new' ?
                        $('<a></a>')
                        .addClass("us-edit")
                        .attr('href', "#")
                        .attr('onclick', "new UserStory().deleteBacklogTask('" + obj[n].id + "')")
                        .append($('<i></i>').addClass("fa fa-trash"))
                        .append(" Delete")
                        : "";
                var isBugLine = obj[n].bugCount > 0 ?
                        $('<span></span>')
                        .append($('<i></i>')
                                .addClass("fa fa-bug")
                                .attr("style", "color:red"))
                        .append(obj[n].bugCount)
                        : "";
                var isUpdatedLine = obj[n].updateCount > 0 ?
                        $('<span></span>')
                        .append($('<i></i>')
                                .addClass("fa fa-pencil")
                                .attr("style", "color:blue"))
                        .append(obj[n].updateCount)
                        : "";
                var tr = $('<tr></tr>')
                        .addClass("backlog_task_list")
                        .attr('pid', obj[n].id)
                        .attr('style', 'cursor:pointer')
                        .attr('ondblclick', 'new UserStory().toggleCommentLines("' + obj[n].id + '")');
                var stopBtn = obj[n].startType === 'P'
                        ? $('<i></i>')
                        .addClass('fa fa-stop-circle')
                        .attr('onclick', 'new UserStory().taskStop("' + obj[n].id + '",this)')
                        .attr('style', 'color:orange;font-size:16px;display:block')
                        : $('<i></i>')
                        .addClass('fa fa-stop-circle')
                        .attr('onclick', 'new UserStory().taskStop("' + obj[n].id + '",this)')
                        .attr('style', 'color:orange;font-size:16px;display:none');
                var startBtn = obj[n].startType !== 'P'
                        ? $('<i></i>')
                        .addClass('fa fa-play-circle')
                        .attr('onclick', 'new UserStory().taskStart("' + obj[n].id + '",this)')
                        .attr('style', 'color:green;font-size:16px;display:block')
                        : $('<i></i>')
                        .addClass('fa fa-play-circle')
                        .attr('onclick', 'new UserStory().taskStart("' + obj[n].id + '",this)')
                        .attr('style', 'color:green;font-size:16px;display:none');
                var diffTime = obj[n].startType === 'P'
                        ? this.getStartTimeDiff(obj[n].startDate, res.kv.currentDate, obj[n].startTime, res.kv.currentTime)
                        : "";

                var taskTypeName = obj[n].jiraIssueKey.length > 0
                        ? replaceTags(obj[n].taskTypeName) + " (" + obj[n].jiraIssueKey + ")"
                        : replaceTags(obj[n].taskTypeName);
                tr.append($("<td  class='align-middle' style='text-align: center'></td>")
                        .append((n + 1)))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html(isBugLine))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html(isUpdatedLine))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html($('<span></span>')
                                        .addClass("us-item-status-" + replaceTags(obj[n].taskStatus))
                                        .append(replaceTags(obj[n].taskStatus))))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html(taskTypeName))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .append(imgAssignee)
                                .append(replaceTags(obj[n].assigneeName)))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .append(obj[n].estimatedHours)
                                .append('/')
                                .append(obj[n].completedDuration)
                                .append(" ")
                                .append((diffTime) ?
                                        $("<b></b>")
                                        .attr('style', 'color:green;')
                                        .append('(+')
                                        .append(diffTime)
                                        .append(")")
                                        : ""
                                        )
                                )
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .append(startBtn)
                                .append(stopBtn)
                                )
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html(Utility.convertDate(obj[n].createdDate) + '/ ' + Utility.convertDate(obj[n].lastUpdatedDate)))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html(replaceTags(obj[n].dependentTaskType1Name) + "<br>" + replaceTags(obj[n].dependentTaskType2Name)))

                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center;font-size:19px;")
                                .html($('<a></a>')
                                        .attr('href', "#")
                                        .attr("data-toggle", "modal")
                                        .attr("data-target", "#addComment4TaskModal")
                                        .attr("onclick", "new UserStory().addComment4TaskModal(this,\'" + obj[n].id + "\')")
                                        .append($('<i></i>').addClass('fa fa-commenting-o'))))
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html($('<div></div>')
                                        .addClass('dropdown')
                                        .append($("<button></button")
                                                .addClass('"btn btn-primary dropdown-toggle us-prop-btn')
                                                .attr('type', 'button')
                                                .attr('data-toggle', 'dropdown')
                                                .append($('<span></span>').addClass("caret"))
                                                )
                                        .append($('<u></u>')
                                                .addClass("dropdown-menu")
                                                .attr("style", "line-height: 1.6em;text-decoration: none !important;")
                                                .append($('<li></li>')
                                                        .append($('<a></a>')
                                                                .attr('href', "#")
                                                                .addClass("us-edit")
//                                                                .attr("data-toggle", "modal")
                                                                .attr("data-target", "#updateTaskTypeModal")
                                                                .attr("onclick", "new UserStory().setUSTaskAsOngoing(\'" + obj[n].id + "\')")
                                                                .append($('<i></i>').addClass('fa fa-edit'))
                                                                .append(" Set as Ongoing")))
                                                .append($('<li></li>')
                                                        .append($('<a></a>')
                                                                .attr('href', "#")
                                                                .addClass("us-edit")
                                                                .attr("data-toggle", "modal")
                                                                .attr("data-target", "#closeBacklogTaskModal")
                                                                .attr("onclick", "new UserStory().showCloseBacklogTaskModal(\'" + obj[n].id + "\')")
                                                                .append($('<i></i>').addClass('fa fa-edit'))
                                                                .append(" Close Task")))
                                                .append($('<li></li>')
                                                        .append($('<a></a>')
                                                                .attr('href', "#")
                                                                .addClass("us-edit")
                                                                .attr("data-toggle", "modal")
                                                                .attr("data-target", "#updateTaskTypeModal")
                                                                .attr("onclick", "new UserStory().showUpdateBacklogTaskModal(\'" + obj[n].id + "\')")
                                                                .append($('<i></i>').addClass('fa fa-edit'))
                                                                .append(" Edit")))
                                                .append($('<li></li>').append(stDel))
                                                )
                                        )
                                )
                        ;
                $('#tblBacklogTaskList > tbody').append(tr);
                var rs = this.fillCommentListByTaskWithReturn(obj[n].id);
                var div = $('<div></div>')
                        .addClass('col')
                        .addClass('task-child-comment')
                        .attr('id', 'div_' + obj[n].id)
                        .append(rs);
                var tr1 = $('<tr  class="backlog_task_list"></tr>').attr('pid', obj[n].id);
                tr1.append($("<td  class='align-middle' style='padding-left:40px; text-align: center'></td>").html('')).
                        append($("<td class='align-middle' style='text-align: center'></td>").html(''))
//                        append($("<td></td>")
//                                .addClass('align-middle')
//                                .attr("style", "text-align: center")
//                                .html('')).
                        .append($("<td></td>")
                                .addClass('align-middle')
                                .attr("style", "text-align: center")
                                .html(''))
                        .append($("<td class='align-middle'  style='text-align: left' colspan=7></td>").append(div));
                $('#tblBacklogTaskList > tbody').append(tr1);
                if ($('#userstory_task_comment_toogle').is(':checked')) {
                    $('.task-child-comment').show();
                } else {
                    $('.task-child-comment').hide();
                }
            }
        } catch (e) {
            this.setEmplyTaskListMessage();
        }
    },
    setEmplyTaskListMessage: function () {
        $('#tblBacklogTaskList > tbody').html('');
        var innerHTML = '<tr><td colspan="12" style="padding:30px;text-align:center">' +
                '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                '<h5> No Tasks have been selected or created on this User Story</h5>' +
                '<p>All Task related to the User Story on this project will appear here</p>' +
                '<p>Please Select User Story</p>' +
                '</td></tr>';
        $('#tblBacklogTaskList > tbody').html(innerHTML);
    },
    toggleCommentLines: function (id) {
        $('#div_' + id).toggle();
    },
    addTaskTypeModal: function () {
        this.addTaskTypesToCombo();
        this.addAssigneeToTaskType();
        setGlobalActiveCanvas(global_var.canvas.taskType);
    },
    addAssigneeToTaskType: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'userName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.addAssigneeToTaskTypeDetails(res);
                that.addNotifieroTaskTypeDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateAssigneeToTaskType: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'userName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.updateAssigneeToTaskTypeDetails(res);
                that.updateNotifieroTaskTypeDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateAssigneeToTaskTypeDetails: function (res) {
        $('#updateTaskType_assignee').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#updateTaskType_assignee').append($("<option></option>")
                    .attr("value", obj[n].fkUserId)
                    .text(obj[n].userName));
        }
    },
    updateNotifieroTaskTypeDetails: function (res) {
        $('#updateTaskType_notifier').html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="addTaskType_nofity"  id="'
                    + obj[n].fkUserId + '" value="' + obj[n].fkUserId + '">' + replaceTags(obj[n].userName) + '</input>'
            st += '</td>'

        }
        st += '</table>';
        $('#updateTaskType_notifier').html((st));
    },
    addAssigneeToTaskTypeDetails: function (res) {
        $('#addTaskType_assignee').html("");
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                $('#addTaskType_assignee').append($("<option></option>")
                        .attr("value", obj[n].fkUserId)
                        .text(replaceTags(obj[n].userName)));
            }
        } catch (e) {
        }
    },
    addNotifieroTaskTypeDetails: function (res) {
        $('#addTaskType_notifier').html("");
        var st = "";
        try {
            var obj = res.tbl[0].r;
            st += "<table style=\"width:100%\">"
            for (var n = 0; n < obj.length; n++) {
                if (n % 3 === 0) {
                    st += '</tr><tr>'
                }
                st += '<td>'
                st += ' <input type="checkbox" class="addTaskType_nofity"   value="'
                        + obj[n].fkUserId + '">' + replaceTags(obj[n].userName) + '</input>'
                st += '</td>'

            }
            st += '</table>';
        } catch (e) {
        }
        $('#addTaskType_notifier').html(st);
    },
    addTaskTypesToCombo: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.typeStatus = 'A';
        json.kv.asc = "typeName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.addTaskTypesToComboDetails(res);
                that.addTaskTypes1_2ToComboDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateTaskTypesToCombo: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.typeStatus = 'A';
        json.kv.asc = "typeName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.addTaskTypesToComboDetails4Update(res);
                that.addTaskTypes1_2ToComboDetails4Update(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addTaskTypes1_2ToComboDetails: function (res) {
        $('#addTaskType_tasktype1').html("");
        $('#addTaskType_tasktype2').html("");
        $('#addTaskType_tasktype1').append($("<option></option>").attr("value", '').text(''));
        $('#addTaskType_tasktype2').append($("<option></option>").attr("value", '').text(''));
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#addTaskType_tasktype1').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].typeName)));
            $('#addTaskType_tasktype2').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].typeName)));
        }
    },
    addTaskTypes1_2ToComboDetails4Update: function (res) {
        $('#updateTaskType_tasktype1').html("");
        $('#updateTaskType_tasktype2').html("");
        $('#updateTaskType_tasktype1').append($("<option></option>").attr("value", '').text(''));
        $('#updateTaskType_tasktype2').append($("<option></option>").attr("value", '').text(''));
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#updateTaskType_tasktype1').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].typeName)));
            $('#updateTaskType_tasktype2').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].typeName)));
        }
    },
    addTaskTypesToComboDetails: function (res) {
        $('#addTaskType_tasktype').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#addTaskType_tasktype').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].typeName)));
        }
    },
    addTaskTypesToComboDetails4Update: function (res) {
        $('#updateTaskType_tasktype').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#updateTaskType_tasktype').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].typeName)));
        }
    },
    check4Inputs: function () {
        var f = true;
        if (this.getStory().trim().length == 0) {
            new Notification("Story is not entered!").showInComponent('backlogName');
            throw "Story is not entered!";
        }
    },
    insertNewInputDescription: function () {
        if (global_var.current_us_input_id.length === 0) {
            Toaster.showError("User Story Input is not selected!");
            return;
        }

        if ($('#us-ipo-inputdescription').val().trim().length === 0) {
            Toaster.showError("Please enter Input Description!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = global_var.current_us_input_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.description = $('#us-ipo-inputdescription').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewInputDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.updateInputByRes(res);
                SAInputDesc.addInputDescriptionByRes(res);


                that.refreshCurrentInput();
//                that.genIPOInputDescList();
                $('#us-ipo-inputdescription').val('');
                $('#us-ipo-inputdescription').focus();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },

    insertNewInputDescriptionNew: function (el, inputId) {
        if (inputId.length === 0) {
            Toaster.showError("User Story Input is not selected!");
            return;
        }

        if ($(el).val().trim().length === 0) {
            Toaster.showError("Please enter Input Description!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = inputId;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.description = $(el).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewInputDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.updateInputByRes(res);
                SAInputDesc.addInputDescriptionByRes(res);


                that.refreshCurrentInput();
//                that.genIPOInputDescList();
                $('#us-ipo-inputdescription').val('');
                $('#us-ipo-inputdescription').focus();

                //////////////


                //backlogun canvas parametrleri set edilir
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);
                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },

    setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew: function (res) {
//        res = replaceJSON(res);
        $('#generalview_input_list').html('');
//        try {
//        var ind = getIndexOfTable(res, "inputDescListTable");
        var ind = 0;
        var table = this.getInputTable4StoryCard4SelectNew(res, ind, 0, '', '');
        $('#generalview_input_list').append(table);
    },

    refreshCurrentInput: function () {
        $('#ipo_tr_' + global_var.current_us_input_id).click();
    },
    insertNewOutput: function () {
        if (global_var.current_backlog_id.length === 0) {
            Toaster.showError("User Story is not selected!");
            return;
        }

        if ($('#us-ipo-inputname-output').val().trim().length === 0) {
            Toaster.showError("Please enter Input name!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.inputName = $('#us-ipo-inputname-output').val();
        json.kv.inputType = "OUT";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.addInputByRes(res);
                SACore.addBacklogByRes(res);

                that.addSourcedIconToUserStory(res);
                //refresh the output list
                $('#tblIPOOutputList > tbody').html('');
                var st = that.getHtmlGenIPOOutputList(res);
                $('#tblIPOOutputList > tbody').html(st);
                //set focus the 
                $('#us-ipo-inputname-output').val("");
                $('#us-ipo-inputname-output').focus();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    insertNewInput: function () {
        if (global_var.current_backlog_id.length === 0) {
            Toaster.showError("User Story is not selected!");
            return;
        }

        if ($('#us-ipo-inputname').val().trim().length === 0) {
            Toaster.showError("Please enter Input name!");
            return;
        }

        this.insertNewInputTotal();
//        this.genGUIDesign();
    },
    insertNewInputNew: function (el) {
        var inputName = $(el).val();
        if (global_var.current_backlog_id.length === 0) {
            Toaster.showError("User Story is not selected!");
            return;
        }

        if (inputName.trim().length === 0) {
            Toaster.showError("Please enter Input name!");
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.tableName = "";
        json.kv.inputName = inputName;
        json.kv.inputType = "IN";
        json.kv.componentType = global_var.default_us_input_component;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewInput4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.addInputByRes(res);
                SACore.addInputToBacklog(res.kv.fkBacklogId, res.kv.id);

                that.insertSuplementaryOfNewInputTotal(res.kv.id, res.kv.inputName);



                //////////
                /////////

                //backlogun canvas parametrleri set edilir
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);

                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});

                $('#newInputId').val('');

            },
            error: function () {
                Toaster.showError("Input '" + iname + '" isn\'t inserted successfully! ')
            }
        });

        $('#us-ipo-inputname').val('');
        $('#us-ipo-input-id').val('');
        $('#us-ipo-inputname').focus();
    },
    loadSection4Input: function () {
        if (global_var.current_backlog_id.length === 0) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.componentType = "sctn";
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.asc = "inputName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadSection4InputDetails(res);
            }
        });
    },
    toggleRelatedUS4UnputComponent: function () {
        var action = $('#us-gui-component-action').val();
        if (gui_component.actions.actionList4RelatedSUSList.includes(action)) {
            $('#us-gui-component-rel-sus-div').show();
        } else {
            $('#us-gui-component-rel-sus-div').hide();
        }
    },
    toggleSection4UnputComponent: function () {
        var action = $('#us-gui-component-action').val();
        if (gui_component.actions.actionList4InSection.includes(action)) {
            $('#us-gui-component-in-section-div').show();
        } else {
            $('#us-gui-component-in-section-div').hide();
        }
    },
    toggleSectionAndRelUS: function () {
        this.toggleSection4UnputComponent();
        this.toggleRelatedUS4UnputComponent();
        this.togglecomponentEventDetailsCore();

    },

    loadSUSList4Input: function () {

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.id = "1";
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = "backlogName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadSUSList4InputDetails(res);
            }
        });
    },

    loadSUSDescription: function () {
        $('#txtSUS_IPO_description').val('');
        if (global_var.current_backlog_id.length === 0) {
            Toaster.showError("User Story is not selected!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_backlog_id;
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    $('#txtSUS_IPO_description').val(replaceMainTrustedTags(replaceTags(res.tbl[0].r[0].descriptionSourced)));
                } catch (e) {
                }
            },
            error: function () {
//                Toaster.showError(('somethingww'));
            }
        });
    },
    loadSUSList4InputDetails4Select() {

    },
    loadSUSList4InputDetails: function (res) {
        try {
            $('#us-gui-component-rel-sus-id').html("");
            var obj = res.tbl[0].r;
            $('#us-gui-component-rel-sus-id').append($("<option></option>"));
            for (var n = 0; n < obj.length; n++) {
                if (obj[n].id !== global_var.current_backlog_id) {
                    $('#us-gui-component-rel-sus-id').append($("<option></option>")
                            .attr("value", obj[n].id)
                            .text(replaceTags(obj[n].backlogName) + "  #" + obj[n].orderNo + " "));
                }
            }
        } catch (err) {
        }
    },
    loadSection4InputDetails: function (res) {
        try {
            $('#us-gui-component-in-section').html("");
            var obj = res.tbl[0].r;
            $('#us-gui-component-in-section').append($("<option></option>"));
            for (var n = 0; n < obj.length; n++) {
                if (obj[n].id != global_var.current_backlog_id) {
                    $('#us-gui-component-in-section').append($("<option></option>")
                            .attr("value", obj[n].id)
                            .text(replaceTags(obj[n].inputName)));
                }
            }
        } catch (err) {
        }
    },
    getOutputBySUSId: function (e) {
        if (!$(e).val()) {
            return;
        }
//        this.updateInputBySUSId(e);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = $(e).val();
        json.kv.asc = "inputName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.getOutputBySUSIdDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    getOutputBySUSIdWithoutUpdate: function (id) {
        if (!id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = id;
        json.kv.asc = "inputName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.getOutputBySUSIdDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    getOutputBySUSIdDetails: function (res) {
        $('#sus-output-id').html("");
        var obj = res.tbl[0].r;
        $('#sus-output-id');
        for (var n = 0; n < obj.length; n++) {
            $('#sus-output-id').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].inputName)));
        }
    },
    updateInputBySUSId: function (e) {
        if (global_var.current_us_input_id.length === 0) {
            Toaster.showError("User Story Input is not selected!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.fkDependentBacklogId = $(e).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByDependentBacklog",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                closeModal('addRelatedSUSOutputModal');
                //do something here
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    inputDescClearAll: function () {
        $('.indesc_general').val('');
        $('#indesc_checkall').prop("checked", true);
        $('#indesc_checkall').click();
    },
    inputDescCheckAll: function () {
        if ($('#indesc_checkall').is(":checked")) {
            $('.indesc_check').prop("checked", true).change();
        } else {
            $('.indesc_check').prop("checked", false).change();
        }
    },
    fnline2Text: function (fnline) {
        var res = fnline;

        if (fnline.startsWith('fn_(')) {
            var params = fnline.split('?')[1];
            var fn_text = params.split('::')[0];
            try {
                var fn_paramlist = params.split('::')[1];
                var kv_list = fn_paramlist.split('&');
                for (var i = 0; i < kv_list.length; i++) {
                    var key = kv_list[i].split('=')[0];
                    var val = kv_list[i].split('=')[1];
                    key = '@@' + (key.trim());
                    fn_text = fn_text.replace(key, (val.trim()));
                }
            } catch (err) {
            }
            res = fn_text;
        }

        return res;
    },
    getCheckedInputsNew: function () {
        var checkedInputIds = "";
        $('.us-input-list-item-check-box-class-new').each(function (e) {
            checkedInputIds += (checkedInputIds.length > 0) ? "," : "";
            checkedInputIds += $(this).is(':checked') ? $(this).val() : "";
        });
        return checkedInputIds;
    },
    getCheckedInputs: function () {
        var checkedInputIds = "";
        $('.us-input-list-item-check-box-class').each(function (e) {
            checkedInputIds += (checkedInputIds.length > 0) ? "," : "";
            checkedInputIds += $(this).is(':checked') ? $(this).val() : "";
        });
        return checkedInputIds;
    },
    getCheckedInputList: function () {
        var checkedInputIds = [];
        $('.us-input-list-item-check-box-class').each(function (e) {
            $(this).is(':checked') ? checkedInputIds.push($(this).val()) : "";
        });
        return checkedInputIds;
    },
    addExistingRelation: function (inputId) {
        if ($('#sus-output-id').val()) {
            this.updateInputBySUSOutputId(inputId);
        }
    },
    addInputDescCriterias: function () {
        showProgress();
//        if ($('#indesc_shouldautofillfrom').is(":checked")) {
//            this.updateInputBySUSOutputId();
//        }

        var checkedInputIds = this.getCheckedInputsNew();
        var currentInputId = "";

        var json = {"kv": {}, "tbl": [{"r": [], "tn": "inputDescTable"}]};
        $('.indesc_check:checked').each(function () {
            var ln = "";

            if ($(this).attr("fn") && $(this).attr("fn") !== 'undefined') {
                var params = "";
                try {
                    var paramList = $(this).attr("fn_params").split(',');
                    var paramLinkList = $(this).attr("fn_params_link").split(',');
                    for (var i = 0; i < paramList.length; i++) {
                        params += (params.length > 0) ? ' & ' : "";
                        params += paramList[i] + " = " + $('#' + paramLinkList[i]).val();
                    }
                } catch (err) {
                }
                ln = $(this).attr("fn") + " ? " + $(this).attr("fn_text") + " :: " + params;
                var kv = {};
                kv['criteriaLine'] = ln;
                json.tbl[0].r.push(kv);
            }

        });

        json.kv.fkInputId = currentInputId;
        json.kv.checkedInputIds = checkedInputIds;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmAddInputDescCriterias",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                hideProgress();
                $('#addRelatedSUSOutputModal').modal('hide');
                SAInput.updateInputByRes(res);
                SAInputDesc.addInputDescriptionByRes(res);
                $('#addRelatedSUSOutputModal').modal('hide');

                ///////////////
                //backlogun canvas parametrleri set edilir
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);

                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});


            }
        });

    },
    updateInputBySUSOutputId: function (inputId) {
        if (inputId.length === 0) {
            Toaster.showError("User Story Input is not selected!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = inputId;
        json.kv.fkDependentBacklogId = $('#us-related-sus').val();
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkDependentOutputId = $('#sus-output-id').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByDependentBacklogOutput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.updateInputByRes(res);
                SACore.updateBacklogByRes(res);

//////////////////////////  

//backlogun canvas parametrleri set edilir
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);

                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteInputBySUSOutputId: function (e) {
        if (global_var.current_us_input_id.length === 0) {
            Toaster.showError("User Story Input is not selected!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInputByDependentBacklogOutput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.updateInputByRes(res);

                closeModal('addRelatedSUSOutputModal');
                that.genIPOInputDescList();
                $('#relatedSUSOutputName').text("");
                $('#relatedUserStory').html("");
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateSUSDesc: function (e) {
        if (global_var.current_backlog_id.length === 0) {
            Toaster.showError("User Story is not selected!");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_backlog_id;
        json.kv.description = $(e).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateBacklogByDesc",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);
                //do something here
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    insertNewInputTotalBody: function (json) {

    },
    insertNewInputTotal: function () {
        var iname = $('#us-ipo-inputname').val();
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.tableName = $('#us-ipo-inputname-table').val();
        json.kv.inputName = $('#us-ipo-inputname').val();
        json.kv.inputType = "IN";
        json.kv.componentType = global_var.default_us_input_component;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewInput4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.addInputByRes(res);
                SACore.addInputToBacklog(res.kv.fkBacklogId, res.kv.id);


                //refresh input list
                var st = that.getHtmlGenIPOInputList(SAInput.toJSON());
                $('#tblIPOList > tbody').html(st);
                $('.us-ipo-input-tr').last().click();

                //generate GUI
                var st = that.getGUIDesignHTMLPure(SAInput.toJSON());
                $('#SUS_IPO_GUI_Design').html(st);

                that.insertSuplementaryOfNewInputTotal(res.kv.id, res.kv.inputName);
                $('#us-ipo-inputname').val('');
                $('#us-ipo-input-id').val('');
                $('#us-ipo-inputname').focus();
            },
            error: function () {
                Toaster.showError("Input '" + iname + '" isn\'t inserted successfully! ')
            }
        });

        $('#us-ipo-inputname').val('');
        $('#us-ipo-input-id').val('');
        $('#us-ipo-inputname').focus();
    },
    insertSuplementaryOfNewInputTotal: function (inputId, inputName) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = inputId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSupplementOfInsertNewInput4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                if (res.kv.hasError === '1') {
                    Toaster.showError("Input '" + inputName + '" isn\'t inserted successfully! ');
                    return;
                }
                that.addSourcedIconToUserStory(res);
            },
            error: function () {
                Toaster.showError("Input '" + inputName + '" isn\'t inserted successfully! ')
            }
        });


    },
    clearIPOTablename: function () {
        $('#us-ipo-inputname-table').val('');
    },
    updateInputByAttr: function (e, type) {
        var id = $(e).attr('pid');
        if (!id) {
            return;
        }

        var srv = "";
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        if (type == 'table') {
            json.kv.tableName = $(e).val();
            srv = 'serviceTmUpdateInputByTableName';
        } else if (type == 'name') {
            if ($(e).val().trim().length == 0) {
                Toaster.showError('Input name is empty!')
                return;
            }
            json.kv.inputName = $(e).val();
            srv = 'serviceTmUpdateInputByInputName';
        }

        this.updateInput(json, srv, e, type);
    },
    updateInput: function (json, srv, e, type) {

        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/" + srv,
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.addInputByRes(res);

                if (type === 'name') {
                    $(e).closest('td').attr('iname', $(e).val());
                } else if (type === 'table') {
                    $(e).closest('td').attr('itable', $(e).val());
                }
                $(e).closest('td').html($(e).val());
                that.genGUIDesign();
//                that.genIPOInputList();
                $('#us-ipo-inputname-table').val("");
                $('#us-ipo-inputname').val('');
                $('#us-ipo-input-id').val('');
//                $('#us-ipo-inputname').focus();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateOutput: function (e) {
        var id = $(e).attr('pid');
        if (id.trim().length == 0) {
            return;
        }

        if ($(e).val().trim().length == 0) {
            this.genIPOOutputList();
            return;
        }

        var srv = "";
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        json.kv.inputName = $(e).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByInputName",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.updateInputByRes(res);
                $(e).closest('td').attr('idesc', $(e).val());
                $(e).closest('td').html($(e).val());
//                that.genIPOOutputList();
            }
        });
    },
    updateInputDesc: function (e) {
        var id = $(e).attr('pid');
        if (id.trim().length == 0) {
            return;
        }

        if ($(e).val().trim().length === 0) {
            this.genIPOInputDescList();
            return;
        }

        var srv = "";
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        json.kv.description = $(e).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInputDesc.updateInputDescriptionByRes(res);
                that.genIPOInputDescList();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setGUICanvasContent: function () {

        if (global_var.current_backlog_id.length === 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_backlog_id;
        json.kv.canvasContent = $('#gui_input_css_style_canvas').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateBacklogByCanvasContent",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);

                that.setGuiMainWindowsParam1($('#gui_input_css_style_canvas').val());
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setGUIComponentContent: function () {

        if (global_var.current_us_input_id.length === 0) {
            return;
        }

        this.updateInputOnChangeAndRefresh();

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.inputContent = $('#gui_input_content').val();
        json.kv.manualStyle = $('#gui_input_css_style').val();
        json.kv.containerStyle = $('#gui_input_css_style_container').val();
        json.kv.css = this.getInputCSS();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByContent",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.updateInputByRes(res);
                $('#userstory-gui-input-component-type-content').modal('hide');
//                that.genGUIDesign();
//                 that.toggleSubmenuIPO();   
            },
            error: function () {
                Toaster.showError('"' + json.kv.componentTypeName + '" didn\'t updated. \n\
                    After refresh it effect will be disappear.');
            }
        });
    },
    getInputCSS: function () {

        var st = "";
        st += "font-size:" + $('#gui_input_font_size').val() + "px;";
        st += "width:" + $('#gui_input_width').val() + "%;";
        if ($('#gui_input_background_color_cbox').is(":checked")) {
            st += "background-color:" + $('#gui_input_background_color').val() + ";";
        }
        if ($('#gui_input_border_color_cbox').is(":checked")) {
            st += "borrder-color:" + $('#gui_input_border_color').val() + ";";
        }
        if ($('#gui_input_color_cbox').is(":checked")) {
            st += "color:" + $('#gui_input_color').val() + ";";
        }
        return st;
    },
    setGUIComponentRelSUS: function (el) {
        if (global_var.current_us_input_id.length === 0) {
            return;
        }
        if ($(el).val()) {
            $('#us-gui-component-rel-sus-div-i').show();
        } else {
            $('#us-gui-component-rel-sus-div-i').hide();
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.param1 = $(el).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByParam1",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.updateInputByRes(res);
                SACore.updateBacklogByRes(res);
                that.genGUIDesign();
            }
        });
    },
    setGUIComponentRelSUSInSection: function (el) {
        if (global_var.current_us_input_id.length === 0) {
            return;
        }
        if (!$(el).val()) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.sectionBacklogId = $(el).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputBySectionBacklog",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.updateInputByRes(res);
                SACore.updateBacklogByRes(res);
                that.loadSection4InputDetails(res);
            }
        });
    },
    manageIPOAndSetting: function (arg) {
        if (arg === 'component') {
            $('#gui_design_component_custom_style').show();
            $('#gui_design_container_custom_style').hide();
            $('#gui_design_container_custom_style_dd').hide();
        } else if (arg === 'container') {
            $('#gui_design_component_custom_style').hide();
            $('#gui_design_component_custom_style_dd').hide();
            $('#gui_design_container_custom_style').show();
        }
    },
    setGUIComponentContentModal: function (e) {

        $('.input-css-opt').attr('style', 'cursor: pointer;font-size:15px;color:blue;display:block;');
//        $('.input-css-opt').show();
        $(e).hide();
//        $(e).attr('style','cursor: pointer;font-size:15px;;display:block;');
        $('#ipo-1-hisse-setting').toggle(100);
        $('#ipo-1-hisse-input').toggle(100);
        $('#gui_input_content').val('');
        if (global_var.current_us_input_id.length === 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                console.log(JSON.stringify(res));
                try {
                    $('#gui_input_content').val((res.tbl[0].r[0].inputContent));
                    $('#gui_input_css_style_container').val((res.tbl[0].r[0].param2));
                    $('#gui_input_css_style').val((res.tbl[0].r[0].param3));
                    $('#u_userstory_input_id').val((res.tbl[0].r[0].id));
                    that.setGUI_CSS(res.tbl[0].r[0].param4);
                } catch (err) {
                }
                //refresh GUI component 
//                that.genGUIDesign();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setGUI_CSS: function (arg) {
        try {
            $('#gui_input_font_size').val("12");
            $('#gui_input_width').val("100");
            $('#gui_input_background_color').val('');
            $('#gui_input_background_color_cbox').prop("checked", false);
            $('#gui_input_color').val('');
            $('#gui_input_color_cbox').prop("checked", false);
            $('#gui_input_border_color').val('');
            $('#gui_input_border_color_cbox').prop("checked", false);
            var obj = arg.split(';');
            for (var n = 0; n < obj.length; n++) {
                var k = obj[n].split(':')[0];
                var v = obj[n].split(':')[1];
//                console.log('k=' + k);
//                console.log('v=' + v);
                if (k === 'background-color') {
                    $('#gui_input_background_color').val(v);
                    $('#gui_input_background_color_cbox').prop("checked", true);
                } else if (k === 'color') {
                    $('#gui_input_color').val(v);
                    $('#gui_input_color_cbox').prop("checked", true);
                } else if (k === 'border-color') {
                    $('#gui_input_border_color').val(v);
                    $('#gui_input_border_color_cbox').prop("checked", true);
                } else if (k === 'font-size') {
                    v = v.replace("px", "");
                    $('#gui_input_font_size').val(v);
                } else if (k === 'width') {
                    v = v.replace("%", "");
                    $('#gui_input_width').val(v);
                }
            }
        } catch (e) {
        }
    },
    setGUIComponentOrderNo: function (e) {
        var s = $(e).val();
        if (!s) {
            return;
        }

        if (!isFloat(s)) {
            Toaster.showError()("Value must be numeric");
            return;
        }

        if (global_var.current_us_input_id.length == 0) {
            return;
        }

        this.updateInputOnChangeAndRefresh();

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.orderNo = s;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByComponentOrderNo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.updateInputByRes(res);
                SACore.updateBacklogByRes(res);

                //refresh GUI component 
//                that.genGUIDesign();
            },
            error: function () {
                Toaster.showError('"' + json.kv.componentTypeName + '" didn\'t updated. \n\
                    After refresh it effect will be disappear.');
            }
        });
    },
    setGUIComponentOrderNoByDrugDrop: function (inputId, index) {

        if (!index) {
            return;
        }

        if (!isFloat(index)) {
            Toaster.showError("Value must be numeric");
            return;
        }

        if (inputId == 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = inputId;
        json.kv.orderNo = index;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByComponentOrderNo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                //refresh GUI component 
                that.genGUIDesign();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setGUIComponentCellNo: function (e) {
        var s = $(e).val();
        if (!s) {
            return;
        }

        if (global_var.current_us_input_id.length === 0) {
            return;
        }

        this.updateInputOnChangeAndRefresh();

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.cellNo = s;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByComponentCellNo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.updateInputByRes(res);

                //refresh GUI component 
//                that.genGUIDesign();
            },
            error: function () {
                Toaster.showError('"' + json.kv.componentTypeName + '" didn\'t updated. \n\
                    After refresh it effect will be disappear.');
            }
        });
    },
    setGUIComponentAction: function (e) {
        this.toggleSectionAndRelUS();
        var s = $(e).val();
        if (!s) {
            return;
        }

        if (global_var.current_us_input_id.length == 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.action = s;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByAction",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.updateInputByRes(res);
                SACore.updateBacklogByRes(res);
                //refresh GUI component 
                that.genGUIDesign();


            }
        });
    },

    toggleComponentEventDetails: function () {
        this.togglecomponentEventDetailsCore();
        this.toggleSectionAndRelUS();
    },
    togglecomponentEventDetailsCore: function () {
        if ($('#gui_component_event_details').is(':checked')) {
            $('.event_details').show();
        } else {
            $('.event_details').hide();
        }
    },

    setGUIComponentSection: function (e) {
        var s = $(e).val();
        if (!s) {
            return;
        }

        if (global_var.current_us_input_id.length == 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.section = s;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputBySection",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {

                SAInput.updateInputByRes(res);
                SACore.updateBacklogByRes(res);

                //refresh GUI component 
                that.genGUIDesign();
            }
        });
    },
    setGUIComponentEvent: function (e) {
        var s = $(e).val();
        if (!s) {
            return;
        }

        if (global_var.current_us_input_id.length == 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.event = s;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByEvent",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                //refresh GUI component 
                that.genGUIDesign();
            }
        });
    },
    setGUIComponent: function (e) {
        var s = $(e).val();
        if (!s) {
            return;
        }

        if (global_var.current_us_input_id.length == 0) {
            return;
        }

        this.updateInputOnChangeAndRefresh();
        this.toggleGUIComponentSelection();

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_us_input_id;
        json.kv.checkedInputIds = this.getCheckedInputs();
        json.kv.componentType = s;
        json.kv.componentTypeName = $(e).children("option:selected").text();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByComponentType",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.updateInputByRes(res);
            },
            error: function (res) {
                Toaster.showError('"' + json.kv.componentTypeName + '" didn\'t updated. \n\
                    After refresh it effect will be disappear.');
            }
        });
    },
    updateInputOnChange: function () {
        var id = global_var.current_us_input_id;
        if (!id) {
            return;
        }

        var checkedList = this.getCheckedInputList();

        SAInput.updateInput(id, "componentType", $('#us-gui-component-id').val());
        SAInput.updateInputList(checkedList, "componentType", $('#us-gui-component-id').val());

        SAInput.updateInput(id, "orderNo", $('#us-gui-component-order-no').val());
        SAInput.updateInput(id, "cellNo", $('#us-gui-component-cell-no').val());
        SAInput.updateInput(id, "inputContent", $('#gui_input_content').val());
        SAInput.updateInput(id, "param3", $('#gui_input_css_style').val());
        SAInput.updateInput(id, "param2", $('#gui_input_css_style_container').val());
        SAInput.updateInput(id, "param4", this.getInputCSS());
    },
    updateInputOnChangeAndRefresh: function () {
        this.updateInputOnChange();
        this.genGUIDesign();

    },
    toggleGUIComponentSelection: function () {
        this.toggleGUIComponentImageUpload();
        this.toggleGUIComponentIconUpload();
        this.toggleGUIComponentActionCombo();
    },
    genIPOInputDescList4Select: function () {
        $('#tblInputDescriptionList > tbody').html('');
        var inputId = global_var.current_us_input_id;
        if (inputId.length === 0) {
            return;
        }
        var res = SAInputDesc.toCurrentDescJSON();
        this.genIPOInputDescListDetails(res);
    },
    genIPOInputDescList: function () {
        $('#tblInputDescriptionList > tbody').html('');
        var inputId = global_var.current_us_input_id;
        if (inputId.length === 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = inputId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputDescriptionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.genIPOInputDescListDetails(res);
            }
        });
    },
    genIPOInputDescListMain: function () {

    },
    genIPOInputDescListDetails: function (res) {
        var st = this.getHtmlGenIPOInputDescList(res);
        $('#tblInputDescriptionList > tbody').html(st);
        this.setRelatedSUS(res);
        this.generateHtmlParentDependenceInputListTable(res);
    },

    getResultOfgenerateHtmlParentDependenceInputListTable: function () {
        var rs = "";


        var inputId = SAInput.GetCurrentChildDependenceId();
        if (!inputId) {
            return "";
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = global_var.current_us_input_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputChildDependenceDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                rs = res;
            }
        });

        return rs;
    },
    generateHtmlParentDependenceInputListTable: function () {
        var res = this.getResultOfgenerateHtmlParentDependenceInputListTable();
        var st = "";
        try {
            var ind = getIndexOfTable(res, 'childDependenceInputListTable');
            var obj = res.tbl[ind].r;
            for (var n = 0; n < obj.length; n++) {
                st += obj[n].inputName;
                st += '(<a href="#" \n\
                        onclick="new UserStory().redirectUserStoryCore(\''
                        + obj[n].fkBacklogId + '\')">'
                        + replaceTags(obj[n].backlogName) + '</a>)';
                st += (obj[n].description) ? " <i class='fa fa-question-circle' style='cursor:pointer;color:#4CAF50' \n\
                                    data-toggle='tooltip' \n\
                           title='" + replaceTags(obj[n].description) + "' \n\
                           data-original-title='" + replaceTags(obj[n].description) + "'></i>"
                        : "";
                st += "<br>"

            }
        } catch (e) {
        }
        if (st) {
            $('.parentRelatedOutput').show();
            $('#childRelaedOutputList').html(st);
        } else {
            $('.parentRelatedOutput').hide();
        }
    },
    generateHtmlDependenceInputListTable: function (res) {

        var ind = getIndexOfTable(res, 'dependenceInputListTable');
        var st = "";
        try {

//            if (obj.length > 0) {
            if (res.kv.dependenceBacklogName) {
                st += '<u>' + replaceTags(res.kv.dependenceInputName)
                        + " (" + replaceTags(res.kv.dependenceBacklogName) + '): '
                        + "</u><br>";
            }
//            }
            var obj = res.tbl[ind].r;
            for (var n = 0; n < obj.length; n++) {
                st += '- ' + replaceTags(this.fnline2Text(obj[n].description)) + "<br>";
            }

        } catch (e) {
        }
        return st;
    },
    genIPOInputList: function () {
        $('#tblIPOList > tbody').html('');
        $('#tblInputDescriptionList > tbody').html('');
        $('.inputdesc').attr("style", " pointer-events: none;opacity: 0.4;display:none;")


        var backlogId = global_var.current_backlog_id;
        if (backlogId.length === 0) {
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.inputType = "IN%IN%GUI";
        json.kv.asc = "orderNo";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {

                var st = that.getHtmlGenIPOInputList(res);
                $('#tblIPOList > tbody').html(st);
                $('.us-ipo-input-tr').first().click();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    copyInputs: function () {
        if (!$('#us-list-4-copy-move-inputs').val()) {
            return;
        }
        var ids = this.getSelectedInputs();
        if (!ids) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = ids;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkDestinationBacklogId = $('#us-list-4-copy-move-inputs').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmCopyInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function () {
                showProgress();
            },
            success: function (res) {
                SACore.updateBacklogByRes(res);
                SAInput.updateInputByRes(res);

                closeModal('copyMoveInputsModal');
                that.toggleSubmenuIPO();
                that.refreshCurrentBacklog();

                hideProgress();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    moveInputs: function () {
        if (!$('#us-list-4-copy-move-inputs').val()) {
            return;
        }
        var ids = this.getSelectedInputs();
        if (!ids) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = ids;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkDestinationBacklogId = $('#us-list-4-copy-move-inputs').val();
        var that = this;
        var data = JSON.stringify(json);

        $.ajax({
            url: urlGl + "api/post/srv/serviceTmMoveInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function () {
                showProgress();
            },
            success: function (res) {
                SACore.updateBacklogByRes(res);
                SAInput.updateInputByRes(res);

                closeModal('copyMoveInputsModal');
                that.toggleSubmenuIPO();
                that.refreshCurrentBacklog();
                hideProgress();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteInputs: function () {
        if (!$('#us-list-4-copy-move-inputs').val()) {
            return;
        }
        var ids = this.getSelectedInputs();
        if (!ids) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = ids;

        var that = this;
        var data = JSON.stringify(json);

        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInputs",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function (msg) {
                showProgress();
            },
            success: function (res) {
                SACore.updateBacklogByRes(res);
                closeModal('copyMoveInputsModal');
                that.toggleSubmenuIPO();
                that.refreshCurrentBacklog();
                hideProgress();
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },
    copyInputsNew: function () {
        if (!$('#us-list-4-copy-move-inputs-new').val()) {
            return;
        }
        var ids = this.getSelectedInputsNew();
        if (!ids) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = ids;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkDestinationBacklogId = $('#us-list-4-copy-move-inputs-new').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmCopyInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function () {
                showProgress();
            },
            success: function (res) {
                SACore.updateBacklogByRes(res);
                SAInput.updateInputByRes(res);

                closeModal('copyMoveInputsModalNew');
                that.toggleSubmenuIPO();
                that.refreshCurrentBacklog();

                hideProgress();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    moveInputsNew: function () {
        if (!$('#us-list-4-copy-move-inputs-new').val()) {
            return;
        }
        var ids = this.getSelectedInputsNew();
        if (!ids) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = ids;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkDestinationBacklogId = $('#us-list-4-copy-move-inputs-new').val();
        var that = this;
        var data = JSON.stringify(json);

        $.ajax({
            url: urlGl + "api/post/srv/serviceTmMoveInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function () {
                showProgress();
            },
            success: function (res) {
                SACore.updateBacklogByRes(res);
                SAInput.updateInputByRes(res);

                closeModal('copyMoveInputsModalNew');
                that.toggleSubmenuIPO();
                that.refreshCurrentBacklog();
                hideProgress();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteInputsNew: function () {

        var ids = this.getSelectedInputsNew();
        if (!ids) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = ids;

        var that = this;
        var data = JSON.stringify(json);

        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInputs",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function (msg) {
                showProgress();
            },
            success: function (res) {
                SACore.updateBacklogByRes(res);
                closeModal('copyMoveInputsModalNew');
                that.toggleSubmenuIPO();
                that.refreshCurrentBacklog();
                hideProgress();
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },
    getSelectedInputs: function () {
        var st = "";
        $('.us-input-list-item-check-box-class').each(function (e) {
            if ($(this).is(':checked')) {
                st += $(this).val() + "|";
            }
        });
        return st;
    },
    getSelectedInputsNew: function () {
        var st = "";
        $('.us-input-list-item-check-box-class-new').each(function (e) {
            if ($(this).is(':checked')) {
                st += $(this).val() + "|";
            }
        });
        return st;
    },
    copyMoveInputsModal: function () {
        if (!global_var.current_project_id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.copyMoveInputsModalDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    copyMoveInputsModalNew: function () {
        if (!global_var.current_project_id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.copyMoveInputsModalDetailsNew(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },

    copyMoveInputsModalDetails: function (res) {
        $('#us-list-4-copy-move-inputs').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            if (global_var.current_backlog_id === obj[n].id) {
                continue;
            }
            $('#us-list-4-copy-move-inputs').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName));
        }
    },

    copyMoveInputsModalDetailsNew: function (res) {
        $('#us-list-4-copy-move-inputs-new').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            if (global_var.current_backlog_id === obj[n].id) {
                continue;
            }
            $('#us-list-4-copy-move-inputs-new').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName));
        }
    },

    toggleAllInputNew: function (e) {
        if ($('#us_input_list_check_all_new').is(':checked')) {
            $('.us-input-list-item-check-box-class-new').prop("checked", true);
        } else {
            $('.us-input-list-item-check-box-class-new').prop("checked", false);
        }
    },

    toggleAllInput: function (e) {
        if ($('#us_input_list_check_all').is(':checked')) {
            $('.us-input-list-item-check-box-class').prop("checked", true);
        } else {
            $('.us-input-list-item-check-box-class').prop("checked", false);
        }
    },

    getHtmlGenIPOInputList: function (res) {
//        var ind = getIndexOfTable(res, 'inputListTable');
        var ind = 0;
        var st = "";
        try {
            var obj = res.tbl[ind].r;
            for (var n = 0; n < obj.length; n++) {
                if (obj[n].inputType === 'OUT') {
                    continue;
                }
                st += '<tr class="us-ipo-input-tr"   id="ipo_tr_' + obj[n].id + '" pid="' + obj[n].id
                        + '" iname="' + replaceTags(Replace2Primes(obj[n].inputName))
                        + '" itable="' + replaceTags(Replace2Primes(obj[n].tableName))
                        + '">';
                st += '<td>' + (n + 1) + '</td>';
                st += '<td>' + "<input type='checkbox' class='us-input-list-item-check-box-class' value='" + obj[n].id + "'>" + '</td>';
                st += '<td  ondblclick="new UserStory().toggleToEditIName(this)" class="us-ipo-input-name-tr"   pid="'
                        + obj[n].id + '" iname="' + replaceTags(Replace2Primes(obj[n].inputName)) + '">'
                        + replaceTags(Replace2Primes(obj[n].inputName)) + '</td>';
//                st += '<td  ondblclick="new UserStory().toggleToEditITable(this)" \n\
//class="us-ipo-input-table-tr"  pid="' + obj[n].id + '" itable="' + replaceTags(Replace2Primes(obj[n].tableName)) + '">'
//                        + replaceTags(Replace2Primes(obj[n].tableName)) + '</td>';
                st += '<td><a href="#" onclick="new UserStory().deleteInputFromUSList(this, \''
                        + obj[n].id + '\')"><i class="fa fa-trash" "=""></i></a></td>';
                st += '</tr>';
            }
        } catch (e) {
        }
        st += '<tr">';
        st += '<td></td>';
        st += '<td></td>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>';
        return st;
    },

    getIPOInputListLine: function (id, inputName, tableName) {


        var st = "";


        st += '<tr class="us-ipo-input-tr"   id="ipo_tr_' + id + '" pid="' + id
                + '" iname="' + replaceTags(Replace2Primes(inputName))
                + '" itable="' + replaceTags(Replace2Primes(tableName))
                + '">';
        st += '<td>' + (n + 1) + '</td>';
        st += '<td>' + "<input type='checkbox' class='us-input-list-item-check-box-class' value='" + obj[n].id + "'>" + '</td>';
        st += '<td  ondblclick="new UserStory().toggleToEditIName(this)" class="us-ipo-input-name-tr"   pid="'
                + obj[n].id + '" iname="' + replaceTags(Replace2Primes(inputName)) + '">'
                + replaceTags(Replace2Primes(inputName)) + '</td>';
        st += '<td  ondblclick="new UserStory().toggleToEditITable(this)" \n\
class="us-ipo-input-table-tr"  pid="' + id + '" itable="' + replaceTags(Replace2Primes(tableName)) + '">'
                + replaceTags(Replace2Primes(tableName)) + '</td>';
        st += '<td><a href="#" onclick="new UserStory().deleteInputFromUSList(this, \''
                + id + '\')"><i class="fa fa-trash" "=""></i></a></td>';
        st += '</tr>';


        st += '<tr">';
        st += '<td></td>';
        st += '<td></td>';
        st += '<td></td>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>';
        return st;
    },
    showStoryCardModal: function (backlogId) {
        $('#storyCardModal').modal('show');
        global_var.current_backlog_id = backlogId;
        this.toggleSubmenuStoryCard();
//      console.log('html=',$('#smb-details-generalview').html())
        var html = $('#smb-details-generalview').html();
//        console.log('html=' + html)
        $('#storyCardModal_body').html(html).show();


    },
    genGUIDesign: function (guiId, bId) {
        var backlogId = (bId) ? bId : global_var.current_backlog_id;
        if (backlogId.length === 0) {
            return;
        }

        var gui = 'SUS_IPO_GUI_Design';
        $('#' + gui).html('');
        if (guiId) {
            gui = guiId;
        }

        global_var.ipoTable = {};
        global_var.ipoTableVal = {};
//        var res = this.getResFromGenGUIDesign(backlogId);
        var res = SAInput.toJSONAsInputType(backlogId);
        this.genGUIDesignDetails2(res, gui)

    },
    getResFromGenGUIDesign: function (backlogId) {
        var rs = [];
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.inputType = "IN%IN%GUI";
        json.kv.asc = "orderNo";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                rs = res;
            }
        });
        return rs;
    },
    genGUIDesignDetails2: function (res, gui) {
        $('#SUS_GUI_header').text(SAInput.GetCurrentBacklogname);
        $('#userstory-gui-input-component-res-sus-label').text(SAInput.GetCurrentBacklogname);
        $('#generalview_SUS_GUI_header').text(SAInput.GetCurrentBacklogname);
        var st = this.getGUIDesignHTML(res);
        $('#' + gui).html(st);

        $('.tooltip').removeClass('show');
        $('[data-toggle="tooltip"]').tooltip({html: true});

        //  click on first tab
//        $('.activeTabClass').each(function (e) {
//            $(this).click();
//        });
    },
    setGUIDesignHtmlByIdAsync4Select: function (backlogId, hide, divId) {
        if (backlogId.length === 0) {
            return "";
        }
        var res = SAInput.toJSONByBacklog(backlogId);
        var st = this.getGUIDesignHTML(res, hide);
        $('#' + divId).html(st);
        $('#' + divId).closest('div.redirectClass4CSS')
                .height($('#' + divId).closest('div.redirectClass').height());



    },
    setGUIDesignHtmlByIdAsync: function (backlogId, hide, divId) {
        if (backlogId.length === 0) {
            return "";
        }
        var st = "";
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.inputType = "IN%IN%GUI";
        json.kv.asc = "orderNo";
        var that = this;
        var data = JSON.stringify(json);
//        showProgress();
        $.ajax({

            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                st = that.getGUIDesignHTML(res, hide);
                $('#' + divId).html(st);
                $('#' + divId).closest('div.redirectClass4CSS')
                        .height($('#' + divId).closest('div.redirectClass').height());

            }
        });
        return st;
    },
    genGUIDesignHtmlById: function (backlogId, hide) {
        if (backlogId.length === 0) {
            return "";
        }
        var st = "";
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.inputType = "IN%IN%GUI";
        json.kv.domain = global_var.current_domain;
        json.kv.asc = "orderNo";
        var that = this;
        var data = JSON.stringify(json);
//        showProgress();
        $.ajax({

            url: urlGl + "api/post/nasrv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                st = that.getGUIDesignHTML(res, hide);
            }
        });
        return st;
    },
    setInputByGUIComponent: function (id) {
//        console.log(id)
//        $('.us-ipo-input-tr ').removeClass('active');
        $('#ipo_tr_' + id).click();
    },
    getComponentHtmlNew: function (comp) {
        comp.componentType = replaceTags(comp.componentType);
        comp.content = replaceTags(comp.content);
        comp.css = replaceTags(Component.ReplaceCSS(comp.css));
        comp.label = replaceTags(comp.label);
        comp.tableHeader = comp.label;
        var tcnt = comp.content;
        comp.label = (comp.componentType !== 'hlink' && comp.isFromTable === true) ? '' : comp.label;
        comp.content = (comp.isFromTable === true) && (comp.componentType !== 'txa') && (comp.componentType !== 'cmb')
                && (comp.componentType !== 'mcmb') && (comp.componentType !== 'rbtn') && (comp.componentType !== 'cbox')
                && (comp.componentType !== 'btn') && (comp.componentType !== 'hlink')
                ? "cell_" + comp.tableRowId : comp.content;
        var st = '';
        switch (comp.componentType) {
            case "txt":
                st += Component.EditBox(comp);
                break;
            case "txa":
                st += Component.TextArea(comp);
                break;
            case "cmb":
                st += Component.SelectBox(comp);
                break;
            case "mcmb":
                st += Component.MultiSelectBox(comp);
                break;
            case "rbtn":
                st += Component.RadioButton(comp);
                break;
            case "cbox":
                st += Component.CheckBox(comp);
                break;
            case "date":
                st += Component.Date(comp);
                break;
            case "time":
                st += Component.Time(comp);
                break;
            case "lbl":
                st += Component.Label(comp);
                break;
            case "irbtn":
                st += Component.InnerRadioButton(comp);
                break;
            case "icbox":
                st += Component.InnerCheckBox(comp);
                break;
            case "iedit":
                st += Component.InnerEditBox(comp);
                break;
            case "hr":
                st += Component.InnerLine(comp);
                break;
            case "btn":
                st += Component.Button(comp);
                break;
            case "hdn":
                st += Component.Hidden(comp);
                break;
            case "sctn":
                st += Component.Section(comp);
                break;
            case "icon":
                st += Component.Icon(comp);
                break;
            case "tab":
                st += Component.Tab(comp);
                break;
            case "file":
                st += Component.FilePicker(comp);
                break;
            case "hlink":
                st += Component.Hiperlink(comp);
                break;
            case "img":
                st += Component.Image(comp);
                break;
            case "ytube":
                st += Component.Youtube(comp);
                break;
            default:
                st += Component.EditBox(comp);
        }
        return st;
    },
    getComponentHtml: function (ctype, lbl, cnt, cellNo, param1, fromTable, css, idx, containercss) {
        cnt = replaceTags(cnt);
        css = replaceTags(css);
        lbl = replaceTags(lbl);
        var tst = lbl;
        var tcnt = cnt;
        lbl = (fromTable === true) ? '' : lbl;
        cnt = (fromTable === true) && (ctype !== 'txa') && (ctype !== 'cmb')
                && (ctype !== 'mcmb') && (ctype !== 'rbtn') && (ctype !== 'cbox')
                && (ctype !== 'btn') && (ctype !== 'hlink')
                ? "cell_" + idx : cnt;
        var st = '';
        switch (ctype) {
            case "txt":
                st += Component.EditBox(lbl, cnt, cellNo, css, containercss);
                break;
            case "txa":
                st += Component.TextArea(lbl, cnt, cellNo, css, containercss);
                break;
            case "cmb":
                st += Component.SelectBox(lbl, cnt, cellNo, css, containercss);
                break;
            case "mcmb":
                st += Component.MultiSelectBox(lbl, cnt, cellNo, css, containercss);
                break;
            case "rbtn":
                st += Component.RadioButton(lbl, cnt, cellNo, css, containercss);
                break;
            case "cbox":
                st += Component.CheckBox(lbl, cnt, cellNo, css, containercss);
                break;
            case "date":
                st += Component.Date(lbl, cellNo, css, containercss);
                break;
            case "time":
                st += Component.Time(lbl, cellNo, css, containercss);
                break;
            case "lbl":
                st += Component.Label(tst, cnt, cellNo, css, containercss);
                break;
            case "irbtn":
                st += Component.InnerRadioButton(lbl, cellNo, css, containercss);
                break;
            case "icbox":
                st += Component.InnerCheckBox(lbl, cellNo, css, containercss);
                break;
            case "iedit":
                st += Component.InnerEditBox(cnt, cellNo, css, containercss);
                break;
            case "hr":
                st += Component.InnerLine(cellNo, css, containercss);
                break;
            case "btn":
                st += Component.Button(lbl, param1, cellNo, cnt, css, fromTable, containercss);
                break;
            case "hdn":
                st += Component.Hidden(cellNo, css, containercss);
                break;
            case "sctn":
                st += Component.Section(param1, cellNo, css, containercss);
                break;
            case "icon":
                st += Component.Icon(cnt, cellNo, css, fromTable, containercss);
                break;
            case "tab":
                st += Component.Tab(param1, cellNo, css, containercss);
                break;
            case "file":
                st += Component.FilePicker(lbl, cellNo, css, containercss);
                break;
            case "hlink":
                st += Component.Hiperlink(tst, param1, cnt, cellNo, css, fromTable, containercss);
                break;
            case "img":
                st += Component.Image(cnt, cellNo, css, containercss);
                break;
            case "ytube":
                st += Component.Youtube(cnt, cellNo, css, containercss);
                break;
            default:
                st += Component.EditBox(lbl, cellNo, css, containercss);
        }
        return st;
    },
    setGUIComponentButtonGUIModal: function (popupBacklogId, el) {
        closeModal('userstory-gui-input-component-res-sus-analytic');
        var backlog = this.getBacklogCoreInfoById(popupBacklogId);
        var canvasCSS = Component.ReplaceCSS(backlog.kv.param1);
        var html = this.genGUIDesignHtmlById(popupBacklogId);
        var bcode = $(el).closest('div.redirectClass').attr("bcode");
        bcode = (bcode === undefined) ? "" : bcode;
        generatePopupModalNew(html, canvasCSS, bcode, backlog.kv.id);
        //  click on first tab
        $('.activeTabClass').each(function (e) {
            $(this).click();
        });
//       
    },
    setGUIComponentRedirectGUIModal: function (el, backlogId, e) {
        e.stopPropagation();
        closeModal('userstory-gui-input-component-res-sus-analytic');
        var backlog = this.getBacklogCoreInfoById(backlogId);
        var canvasCSS = Component.ReplaceCSS(backlog.kv.param1);
        global_var.actual_backlog_gui_css = canvasCSS;
        var html = this.genGUIDesignHtmlById(backlogId);

        var style = $(el).closest('div.redirectClass4CSS').attr('style');
        $(el).closest('div.redirectClass4CSS').attr("style", "zoom:" + global_var.actual_zoom + "%;" + canvasCSS);
        if (global_var.ipo_gui_view === 'all') {
            $(el).closest('div.redirectClass').attr("style", "zoom:" + global_var.actual_zoom + "%;" + canvasCSS);
            $(el).closest('div.redirectClass').attr("bid", backlog.kv.id);
        }

        $(el).closest('div.redirectClass').attr("bid", backlog.kv.id);
        $(el).closest('div.redirectClass').html(html);

    },

    setGUIComponentFillGUIModal: function (el, id, sectionId) {
        closeModal('userstory-gui-input-component-res-sus-analytic');
        var html = this.genGUIDesignHtmlById(id);
        $('#' + sectionId).html(html);
//        generatePopupModalNew(html, canvasCSS);
//        $('[data-toggle="tooltip"]').tooltip({html: true});
    },

    setGUIComponentSaveGUIModal: function (el, e) {
        e.stopPropagation();
        var triggerId = $(el).closest("form")
                .find('input[id=popupTrigger]').first().attr('pid');
        var json = {"kv": {}};

        $(el).closest('div.redirectClass').find('.component-class').each(function (e) {
            json.kv[$(this).attr('id')] = $(this).find('#comp_id_' + $(this).attr('id')).val();
        });
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmSaveFormAction",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                if (triggerId) {
//                    var bel = $('#' + triggerId).closest('div.redirectClass').first();
                    var bel = $('.redirectClass[bcode=' + triggerId + ']').first();
                    var backlodId = bel.attr('bid');
                    var html = that.genGUIDesignHtmlById(backlodId);
                    bel.html(html);
                } else {
                    var bel = $(el).closest('div.redirectClass').first();
                    var backlodId = bel.attr('bid');
                    var html = that.genGUIDesignHtmlById(backlodId);
                    bel.html(html);
                }
                $(el).closest('div.modal ').first().modal('hide');
            }
        });
    },

    setGUIComponentDeleteGUIModal: function (el) {

        var ind = $(el).closest("tr")[0].rowIndex;

        var json = {"kv": {}};
        json.kv.index = ind;
        $(el).closest('tr').find('.component-class').each(function (e) {
            json.kv[$(this).attr('id')] = $('#comp_id_' + $(this).attr('id')).val();
        });
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmDeleteFromTable",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $(el).closest('tr').remove();
            }
        });
    },

    setGUIContainerStyle: function () {
        ContainerDesign.init();
    },
    setGUIComponentStyle: function () {
        ComponentDesign.init();
    },
    setGUICanvasStyle: function () {
        CanvasDesign.init();
    },
    setGUICanvasUploadImage: function () {
        $('#uploadBackgroundImage4CanvasModal').modal("show");
    },
    setGUIComponentUploadImage: function () {
        $('#uploadComponentImageModal').modal("show");
    },
    setStoryCardUploadImage: function () {
        setGlobalActiveCanvas(global_var.canvas.storyCard);
        $('#setStoryCardUploadImageModal').modal("show");
        $('#setStoryCardUploadImageModal_file').val("");
//        $('#setStoryCardUploadImageModal_file').val("");


    },

    setGUIComponentUploadIcon: function () {
        $('#uploadComponentIconModal').modal("show");

        var st = "";
        st += "<table style=\"width:100%\">"

        for (var n = 0; n < global_var.owesomefont.length; n++) {
            if (n % 5 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += '      <i class="fa ' + global_var.owesomefont[n] + '" aria-hidden="true"></i>';
            st += ' <a href="#"';
            st += '     onclick="new UserStory().uploadComponentIcon(\'' + global_var.owesomefont[n] + '\')">';
            st += global_var.owesomefont[n];
            st += '</a>';
            st += '</td>';
        }
        st += '</table>';
        $('#uploadComponentIconModal_iconlist').html(st);

    },
    checkInputDescItem: function (el) {

        if ($(el).is(":checked")) {
            console.log('is checked')
            $('.indesc_general[parent_id=' + $(el).attr('id') + ']').each(function (e) {
                $(this).removeAttr('disabled');
                $(this).removeAttr('readonly');
            })
        } else {
            console.log('is not checked')

            $('.indesc_general[parent_id=' + $(el).attr('id') + ']').each(function (e) {
                $(this).attr('disabled', true);
                $(this).attr('readonly', true);
            })
        }

    },
    uploadBackgroundImage4Canvas: function () {
        if ($('#uploadBackgroundImage4Canvas_file').val().trim().length > 0) {
            this.sendFileForCanvasBackground();
        } else {
            $('#gui_prop_cnvs_backgroundimage').attr('fname', '');
            new UserStory().setGUICanvasStyle();
        }
        $('#uploadBackgroundImage4CanvasModal').modal('hide');
    },
    uploadComponentIcon: function (faitem) {
        $('#gui_input_content').val(faitem);
        $('#gui_input_content').change();
        $('#uploadComponentIconModal').modal('hide');
    },
    uploadComponentImage: function () {
        if ($('#uploadComponentImageModal_file').val().trim().length > 0) {
            this.sendFileForComponentImage();
        }
        $('#uploadComponentImageModal').modal('hide');
    },
    uploadStoryCardImage: function () {
        if (isCanvasContextExist('canvasdiv_storyCard')) {
            try {
                this.loadPicture4StoryCard();
            } catch (err) {
            }
        }


        if ($('#setStoryCardUploadImageModal_file').val().trim().length > 0) {
            this.sendFileForStoryCardImage();
        } else {
            var st = global_var.current_upload_canvas;
            this.addFileToStoryCard(st);
        }
        $('#setStoryCardUploadImageModal').modal('hide');
    },
    setGUIComponentStyleEnable_old: function () {
        if ($('#gui_input_background_color_cbox').is(":checked")) {
            $('#gui_input_background_color').removeAttr("disabled");
        } else {
            $('#gui_input_background_color').prop("disabled", true);
        }

        if ($('#gui_input_color_cbox').is(":checked")) {
            $('#gui_input_color').removeAttr("disabled");
        } else {
            $('#gui_input_color').prop("disabled", true);
        }

        if ($('#gui_input_border_color_cbox').is(":checked")) {
            $('#gui_input_border_color').removeAttr("disabled");
        } else {
            $('#gui_input_border_color').prop("disabled", true);
        }
    },
    setGUIComponentStyleEnable: function (el) {
        var id = $(el).attr('id');
        id = id.length > 2 ? id.substring(3, id.length) : id;
        if ($(el).is(":checked")) {
            $('.cs_' + id).removeAttr("disabled");
            $('.cs_' + id).removeAttr('readonly');
        } else {
            $('.cs_' + id).prop("disabled", true);
            $('.cs_' + id).prop("readonly", true);
        }

        ComponentDesign.init();
    },
    setGUIContainerStyleEnable: function (el) {
        var id = $(el).attr('id');
        id = id.length > 2 ? id.substring(3, id.length) : id;
        if ($(el).is(":checked")) {
            $('.cs_' + id).removeAttr("disabled");
            $('.cs_' + id).removeAttr('readonly');
        } else {
            $('.cs_' + id).prop("disabled", true);
            $('.cs_' + id).prop("readonly", true);
        }

        ContainerDesign.init();
    },
    setGUICanvasStyleEnable: function (el) {
        var id = $(el).attr('id');
        id = id.length > 2 ? id.substring(3, id.length) : id;
        if ($(el).is(":checked")) {
            $('.cs_' + id).removeAttr("disabled");
            $('.cs_' + id).removeAttr('readonly');
        } else {
            $('.cs_' + id).prop("disabled", true);
            $('.cs_' + id).prop("readonly", true);
        }

        CanvasDesign.init();
    },
    isContentTypeRelToTableRowCount: function (arg) {
        if (arg === 'cmb' || arg === 'mcmb' || arg === 'txa'
                || arg === 'rbtn' || arg === 'cbox' || arg === 'btn' || arg === 'hlink') {
            return false;
        } else {
            return true;
        }
    },
    fillComponentInfo4GetGUIDesign: function (comp, obj, n) {
        comp.id = replaceTags(obj[n].id);
        comp.cellNo = replaceTags(obj[n].cellNo);
        comp.tableName = replaceTags(obj[n].tableName);
        comp.componentType = replaceTags(obj[n].componentType);
        comp.orderNo = replaceTags(obj[n].orderNo);
        comp.label = replaceTags(obj[n].inputName);
        comp.content = replaceTags(obj[n].inputContent);
        comp.param1 = replaceTags(obj[n].param1);
        comp.containerCSS = replaceTags(obj[n].param2);
        comp.css = replaceTags(obj[n].param4) + ";" + replaceTags(obj[n].param3);
        comp.event = replaceTags(obj[n].inputEvent);
        comp.action = replaceTags(obj[n].action);
        comp.inSection = replaceTags(obj[n].section);
        comp.relatedSUS = replaceTags(obj[n].param1);
        comp.description = "";
        try {
            comp.description = this.setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4Select(obj[n]);
        } catch (e) {
            comp.description = this.setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc(obj[n]); //for BView.html
        }

        try {
            comp.pureDescription = SAInputDesc.getDescriptionByIn(obj[n].id);
        } catch (e) {
            comp.pureDescription = replaceTags(obj[n].description);
        }

        try {
            comp.inputTable = replaceTags(obj[n].inputTable);
        } catch (err) {
            comp.inputTable = "";

        }
    },
    showMessageOfLoop: function (sequence) {
        var st = "There is a loop in the following User Stories: \n";
        for (var i = 0; i < sequence.length; i++) {
            st += SACore.GetBacklogname(sequence[i]) + '\n' + "";
        }
        return st;
    },
    hasSequence: function (sequence, id) {
        if (sequence.includes(id)) {
            var msg = this.showMessageOfLoop(sequence);
            Toaster.showError(msg);
            throw  msg;
        }
    },
    getParams4GUI: function () {
        var params = {
            "tab": [],
            "tabNameId": [],
            "tabListId": [],
            "tabParam": [],
            "tabCSS": [],
            "ipoTable": [],
            "ipoTableVal": [],
            "ipoTableContent": [],
            "ipoTabRowCount": [],
            "ipoTabColCount": [],
            "idx": 1,
            "tabOrderNo": "",
            "tabId": "",
            "tableOrderNo": "",
            "tableId": "",
        }
        return params;
    },
    getTabLine4GUI: function (params, comp, obj, index) {
        var n = index;
        var st = '';
        params.tabOrderNo = obj[n].orderNo;
        params.tabId = obj[n].id;
        comp.orderNo = obj[n].orderNo;
        comp.id = obj[n].id;
        comp.isFromTable = false;
        comp.tableRowId = "";
        comp.cellNo = '12';
        comp.hasOnClickEvent = false;
        comp.addTooltip = false;
        var div = Component.ContainerDiv(comp);
        div.append("@@tabOrderNo=" + params.tabOrderNo);
        var t = $('<div></div>').append(div).html();
        st += t;
        return st;
    },
    getTableLine4GUI: function (params, comp, obj, index) {

        var n = index;
        var tbl = obj[n].tableName;
        var ct = obj[n].componentType;
        var cnt = obj[n].inputContent;
        var st = "";
        if (params.tableOrderNo.length === 0) {
            params.tableOrderNo = obj[n].orderNo;
            params.tableId = obj[n].id;
            comp.orderNo = obj[n].orderNo;
            comp.id = obj[n].id;
            comp.isFromTable = true;
            comp.tableRowId = "";
            comp.cellNo = '12';
            comp.hasOnClickEvent = false;
            comp.addTooltip = false;
            var div = Component.ContainerDiv(comp);
            div.append("@@tableOrderNo=" + params.tableOrderNo);
            var t = $('<div></div>').append(div).html();
            st += t;
        }
        if (params.ipoTable[tbl] === undefined) {
            params.idx = 1;
            params.ipoTable[tbl] = obj[n].componentType !== 'hlink' ? "<th style='padding:0px;'>" + obj[n].inputName + "</th>"
                    : "<th style='padding:0px;'></th>";
            comp.isFromTable = true;
            comp.tableRowId = params.idx;
            comp.withLabel = false;
            comp.hasOnClickEvent = true;
            params.ipoTableVal[tbl] = "<td style='padding:0px;'> " + this.getComponentHtmlNew(comp) + " </td>";
            params.ipoTableContent[tbl] = obj[n].inputContent;
            params.ipoTabRowCount[tbl] = (this.isContentTypeRelToTableRowCount(obj[n].componentType))
                    ? obj[n].inputContent.split(/\r*\n/).length
                    : 1;
            params.ipoTabColCount[tbl] = params.idx;
            params.idx++;
        } else {
            var str = obj[n].componentType !== 'hlink' ? "<th style='padding:0px;'>" + obj[n].inputName + "</th>"
                    : "<th style='padding:0px;'></th>";
            params.ipoTable[tbl] = params.ipoTable[tbl] + str;
            comp.isFromTable = true;
            comp.tableRowId = params.idx;
            comp.withLabel = false;
            params.ipoTableVal[tbl] += "<td style='padding:0px;'> " + this.getComponentHtmlNew(comp) + " </td>";
            params.ipoTableContent[tbl] = params.ipoTableContent[tbl] + '%IN%' + obj[n].inputContent;
            params.ipoTabRowCount[tbl] = !(this.isContentTypeRelToTableRowCount(obj[n].componentType)) ? params.ipoTabRowCount[tbl]
                    : obj[n].inputContent.split(/\r*\n/).length > params.ipoTabRowCount[tbl]
                    ? obj[n].inputContent.split(/\r*\n/).length
                    : params.ipoTabRowCount[tbl];
            params.ipoTabColCount[tbl] = params.idx;
            params.idx++;
        }
        return st;
    },
    getGUIDesignHTMLBody: function (res, rowId, sequence) {

        if (sequence === 'undefined' || !sequence) {
            sequence = [];
            sequence.push(global_var.current_backlog_id);
        }

        res = JSON.parse(replaceTags(JSON.stringify(res)));
        var st = "";
        try {
//        console.log('res='+JSON.stringify(res));

            var params = this.getParams4GUI();
            var obj = res.tbl[rowId].r;
            for (var n = 0; n < obj.length; n++) {
                if (obj[n].inputType === 'OUT') {
                    continue;
                }
                var comp = new ComponentInfo();
                this.fillComponentInfo4GetGUIDesign(comp, obj, n);
                comp.sequence = sequence;

                var tbl = obj[n].tableName;
                var ct = obj[n].componentType;
                var lbl = obj[n].inputName;
                var param1 = obj[n].param1;
                var css = obj[n].param4 + ";" + obj[n].param3;
                if (ct === 'tab') {
                    params.tab.push(lbl);
                    params.tabListId.push(obj[n].id);
                    params.tabNameId.push(makeId(8));
                    params.tabParam.push(param1);
                    params.tabCSS.push(css);
                    if (params.tabOrderNo.length === 0) {
                        st += this.getTabLine4GUI(params, comp, obj, n);
                    }
                    continue;
                }
                if (tbl) {
                    st += this.getTableLine4GUI(params, comp, obj, n);
                    continue;
                }
                comp.isFromTable = false;
                comp.tableRowId = '';
                if (ct === 'sctn') {
                    comp.hasOnClickEvent = false;
                    comp.addTooltip = false;
                }
                st += this.getComponentHtmlNew(comp);
            }
            var tableHtml = this.genGUIDesignTable(comp, params);
            var tabHtml = this.genGUITabHtmlDesign(comp, params);
            st = st.replace("@@tabOrderNo=" + params.tabOrderNo, tabHtml);
            st = st.replace("@@tableOrderNo=" + params.tableOrderNo, tableHtml);
        } catch (e) {
        }
        st = st.length === 0 ? this.getGUIEmptyMessage() : st;
        return st;
    },
    getGUIEmptyMessage: function () {
        return  '<div class="col-12" style="padding:30px;text-align:center">' +
                '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                '<h5> No Inputs have been entered on this User Story</h5>' +
                '<p>All Pages related to the User Story on this project will appear here</p>' +
                '<p>Please Enter Inputs</p>' +
                '</div>'
    },
    getGUIDesignHTMLPure: function (res) {
//        var ind = getIndexOfTable(res, 'inputListTable');
        var ind = 0;
        return this.getGUIDesignHTMLBody(res, ind);
    },
    getGUIDesignHTMLPure4Share: function (res) {
        var ind = getIndexOfTable(res, 'inputListTable');
        return this.getGUIDesignHTMLBody(res, ind);
    },
    getGUIDesignHTML: function (res) {
        return this.getGUIDesignHTMLBody(res, 0);
    },
    genGUITabHtmlDesign: function (comp, params) {
        if (params.tab.length === 0) {
            return "";
        }
        var st = '<div class="tab-content">';
        st += this.genGUITabHtmlDesignHeader(params);
        st += this.genGUITabHtmlDesignBodyTemplateFull(params, comp);
        st += '</div>';
        return st;
    },
    genGUITabHtmlDesignHeader: function (params) {
        var st = '<br><ul class="nav nav-tabs" role="tablist">';
        var p = "active";
        var activeTabClass = " activeTabClass ";
        for (var n = 0; n < params.tab.length; n++) {
            if (n > 0) {
                p = "";
                activeTabClass = "";
            }
            st += '<li class="nav-item">';
            st += '<a class="nav-link ' + activeTabClass + p + '" data-toggle="tab" href="#tabulento'
                    + params.tabNameId[n] + '" onclick="new UserStory().showGUITabBody(\''
                    + params.tabParam[n] + '\',\'' + params.tabListId[n] + '\',\'' + params.tabNameId[n] + '\')">' + params.tab[n] + '</a>';
            st += '</li>';
        }
        st += '</ul>';
        return st;
    },
    genGUITabHtmlDesignBody: function (tab, tabParam, tabCSS) {
        if (tab.length === 0) {
            return "";
        }
        var st = '<div class="tab-content">';
        var p = "active";
        for (var n = 0; n < tab.length; n++) {
            if (n > 0) {
                p = "";
            }
//            console.log('tabParam='+tabParam)
            var innerHTML = this.genGUIDesignHtmlById(tabParam[n]);
            innerHTML = (innerHTML) ? innerHTML : "<h3>" + tab[n] + "</h3>"
            st += '<div id="tabulento' + removeSpace(tab[n]) + n + '" class="container tab-pane ' + p + '"><br>'
            st += '<div class="row" style="' + tabCSS[n] + '">';
            st += innerHTML;
            st += '</div>';
            st += '</div>';
        }

        st += '</div>';
        return st;
    },
    showGUITabBody: function (backlogId, inputId, id) {
        if (!id) {
            return;
        }
        this.setInputByGUIComponent(inputId);
        this.setGUIDesignHtmlByIdAsync4Select(backlogId, false, id);
//        this.setGUIDesignHtmlByIdAsync(backlogId, false, id);
//        var innerHTML = this.genGUIDesignHtmlById(backlogId);
//        innerHTML = (innerHTML) ? innerHTML : "<h3>" + "" + "</h3>";
//        $('#' + id).html('');
//        $('#' + id).append(innerHTML);
    },
    genGUITabHtmlDesignBodyTemplateFull: function (params, comp) {
        if (params.tabNameId.length === 0) {
            return "";
        }

        var st = '<div class="tab-content ">';
        var p = "active";
        for (var n = 0; n < params.tabNameId.length; n++) {
            if (n > 0) {
                p = "";
            }

//            console.log('tabParam='+tabParam)
            var backlogIdT = params.tabParam[n];
            if (backlogIdT.length > 0) {
                new UserStory().hasSequence(comp.sequence, backlogIdT);
                comp.sequence.push(backlogIdT);
            }

            var innerHTML = this.getGUIDesignHTMLBody(SAInput.toJSONByBacklog(backlogIdT), 0, comp.sequence);
//                    "<h3>" + "" + "</h3>";
//            var innerHTML = "<h3>" + "" + "</h3>";
            st += '<div id="tabulento' + params.tabNameId[n] + '" class="container tab-pane ' + p + '"><br>'
            st += '<div class="row" style=" " id="' + params.tabNameId[n] + '">';
            st += innerHTML;
            st += '</div>';
            st += '</div>';
        }

        st += '</div>';
        return st;
    },
    genGUITabHtmlDesignBodyTemplate: function (id, active) {

        var st = '<div class="tab-content">';
        st += '<div id="tabulento' + id + '" class="container tab-pane ' + active + '"><br>'
        st += '<div class="row" style="" id="' + id + '"> ';
        st += '</div>';
        st += '</div>';
        st += '</div>';
        return st;
    },
    genGUIDesignTable: function (comp, params) {
        var st = "";
        var keys = Object.keys(params.ipoTable);
        for (var n = 0; n < keys.length; n++) {
            st += '<div class="col-12 table-responsive">'
            st += "<br>"
            st += "<label><i><b>" + keys[n] + "</b></i></label>";
            st += '<table class="table table-hover text-center table-responsive1" width="100%" >';
            st += "<tr>" + params.ipoTable[keys[n]] + "</tr>";
            var rc = params.ipoTabRowCount[keys[n]];
            var cc = params.ipoTabColCount[keys[n]];
            var col_content = params.ipoTableContent[keys[n]].split('%IN%');
            for (var i = 0; i < rc; i++) {
                var td_val = params.ipoTableVal[keys[n]];
                for (var j = 0; j < cc; j++) {
//                    console.log('i=' + i + ', j=' + j + ', col_content[j]=' + col_content[j]);
                    var cnt = col_content[j].split(/\r*\n/)[i];
//                    console.log('i=' + i + ', j=' + j + ', cnt=' + cnt);
                    cnt = (cnt) ? cnt : "";
//                    console.log('after convertion i=' + i + ', j=' + j + ', cnt=' + cnt);
                    td_val = td_val.replace("cell_" + (j + 1), cnt);
                }
                st += "<tr>" + td_val + "</tr>";
            }
            st += "</table>"
            st += "</div>"
        }

        return st;
    },
    genIPOOutputList: function () {
        $('#tblIPOOutputList > tbody').html('');
        var backlogId = global_var.current_backlog_id;
        if (backlogId.length === 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.inputType = "OUT";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {

                var st = that.getHtmlGenIPOOutputList(res);
                $('#tblIPOOutputList > tbody').html(st);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    getHtmlGenIPOOutputList: function (res) {
//        var ind = getIndexOfTable(res, 'inputOutputList');
        var ind = 0;
        var st = "";
        try {
            var obj = res.tbl[ind].r;
            var idx = 1;
            for (var n = 0; n < obj.length; n++) {
                if (obj[n].inputType !== 'OUT') {
                    continue;
                }
                st += '<tr>';
                st += '<td>' + (idx++) + '</td>';
                st += '<td  ondblclick="new UserStory().toggleToEditOutput(this)" class="us-ipo-output-name-tr"  \n\
                 pid="' + obj[n].id + '" idesc="' + replaceTags(obj[n].inputName) + '">' + replaceTags(obj[n].inputName) + '</td>';
                st += '<td><a href="#" onclick="new UserStory().deleteOutputFromList(this, \'' + obj[n].id +
                        '\')"><i class="fa fa-trash" "=""></i></a></td>';
                st += '</tr>';
            }
        } catch (e) {
        }
        st += '<tr">';
        st += '<td></td>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>';
        return st;
    },
    getHtmlGenIPOInputDescList: function (res) {
        var st = "";
        try {
            var obj = res.tbl[0].r;
            var st1 = this.generateHtmlDependenceInputListTable(res);
            if (st1.length > 0) {
                st += '<tr>';
                st += '<td></td>';
                st += '<td class="us-ipo-input-name-tr"> ' + st1 + '</td>';
                st += '<td></td>';
                st += '</tr>';
            }
            for (var n = 0; n < obj.length; n++) {
                st += '<tr>';
                st += '<td>' + (n + 1) + '</td>';
                st += '<td  ondblclick="new UserStory().toggleToEditIDescName(this)" class="us-ipo-input-name-tr" \n\
                pid="' + obj[n].id + '" idesc="' + replaceTags((Replace2Primes(obj[n].description))) + '">'
                        + replaceTags(this.fnline2Text(Replace2Primes(obj[n].description))) + '</td>';
                st += '<td><a href="#" onclick="new UserStory().deleteInputDescFromUSList(this, \'' + obj[n].id +
                        '\')"><i class="fa fa-trash" "=""></i></a></td>';
                st += '</tr>';
            }
        } catch (e) {
        }
        st += '<tr">';
        st += '<td></td>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>';
        return st;
    },
    toggleToEditOutput: function (e) {
        var inp = $('<input style="width:100%" onchange="new UserStory().updateOutput(this)" type="text" pid="'
                + $(e).attr('pid') + '" value="' + ($(e).attr('idesc')) + '">');
        $(e).html(inp);
        inp.focus();
    },
    toggleToEditIName: function (e) {
        var inp = $('<input style="width:100%" onchange="new UserStory().updateInputByAttr(this,\'name\')" \n\
type="text" pid="' + $(e).attr('pid') + '" value="' + ($(e).attr('iname')) + '">');
        $(e).html(inp);
        inp.focus();
    },
    toggleToEditITable: function (e) {
        var inp = $('<input style="width:100%" \n\
onchange="new UserStory().updateInputByAttr(this,\'table\')" type="text" pid="' +
                $(e).attr('pid') + '" value="' + ($(e).attr('itable')) + '">');
        $(e).html(inp);
        inp.focus();
    },
    toggleToEditIDescName: function (e) {
        var inp = $('<input style="width:100%" onchange="new UserStory().updateInputDesc(this)" type="text" pid="'
                + $(e).attr('pid') + '" value="' + $(e).attr('idesc') + '">');
        $(e).html(inp);
        inp.focus();
    },
    showIPOInputDetails: function (e) {
        global_var.current_us_input_id = $(e).attr('pid');
        Utility.addParamToUrl('current_us_input_id', global_var.current_us_input_id);
        $('.inputdesc').attr('style', ' pointer-events: block;opacity: 1;')

        if (global_var.current_ipo_view === "desc") {//for is_api selected
//            this.genIPOInputDescList();
            this.genIPOInputDescList4Select();
        } else {
            this.setGUIComponentValues4Select();
        }
        //        
    },
    setRelatedSUS: function (obj) {
        try {
//            $('#relatedSUSOutputName').text(obj.dependenceInputName);
            var depName = SAInput.GetCurrentDependenceBacklogName();
            var outInputName = (depName.length > 0) ? SAInput.GetCurrentDependenceInputName() : "";
            $('#relatedSUSOutputName').text(outInputName);
            if (depName) {
                $('#relatedUserStory').html('(<a href="#" onclick="new UserStory().redirectUserStoryCore(\'' +
                        SAInput.GetCurrentDependenceId() + '\')">'
                        + replaceTags(depName) + '</a>)');
                $('#deleteRelatedSUSOutput').show();
            } else {
                $('#relatedUserStory').html('');
                $('#deleteRelatedSUSOutput').hide();

            }
        } catch (e) {
        }
    },
    setGUIComponentValues4Select: function () {
        $('#us-related-sus').val('');
        $('#sus-output-id').val('');
        $('#us-gui-component-id').val('');
        $('.us-gui-component-rel-sus-div-class').attr('style', "display: none;padding:0px 1px;");
        var inputId = global_var.current_us_input_id;
        if (inputId.length === 0) {
            return;
        }

        var res = SAInput.toCurrentInputJSON();
        this.setGUIComponentValuesDetails(res);

    },
    setGUIComponentValues: function () {
        $('#us-related-sus').val('');
        $('#sus-output-id').val('');
        $('#us-gui-component-id').val('');
        $('.us-gui-component-rel-sus-div-class').attr('style', "display: none;padding:0px 1px;");
        var inputId = global_var.current_us_input_id;
        if (inputId.length === 0) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = inputId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.setGUIComponentValuesDetails(res);
            }
        });
    },
    setGUIComponentValuesDetails: function (res) {
        try {
//                console.log($('gui_input_content').val() + '---------------------')
            $('#gui_input_content').val((res.tbl[0].r[0].inputContent));
            $('#gui_input_css_style_container').val((res.tbl[0].r[0].param2));
            $('#gui_input_css_style').val((res.tbl[0].r[0].param3));
            $('#u_userstory_input_id').val((res.tbl[0].r[0].id));
            ComponentDesign.read();
            ContainerDesign.read();
            $('#us-gui-component-id').val(res.tbl[0].r[0].componentType);
//                        that.setGUI_CSS(res.tbl[0].r[0].param4);


            $('.us-gui-component-rel-sus-div-class').show();
            $('#us-gui-component-rel-sus-id').val(res.tbl[0].r[0].param1);
            $('#us-gui-component-event').val(res.tbl[0].r[0].inputEvent);

            $('#us-gui-component-action').val(res.tbl[0].r[0].action);
            this.toggleSectionAndRelUS();
            this.toggleGUIComponentSelection();
            $('#us-gui-component-order-no').val(res.tbl[0].r[0].orderNo);
            $('#us-gui-component-cell-no').val(res.tbl[0].r[0].cellNo);
            $('#us-gui-component-rel-sus-id-section')
                    .val(res.tbl[0].r[0].fkBacklogSectionId).change();
            $('#us-gui-component-in-section').val(res.tbl[0].r[0].section);
        } catch (err) {
        }
    },
    loadAllSUSList: function (e) {
        if ($(e).attr('onload') === '1') {
            var val = $(e).val();
            $(e).removeClass('onload');
            this.loadSUSList4Input();
            $(e).val(val);
        }
    },
    loadSUS4Relation4Section: function () {
//        if (global_var.related_SUS_status !== 'A') {
//            return;
//        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogListWithSection4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                global_var.related_SUS_status = 'C';
                that.loadSUS4Relation4SectionDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },

    loadSUS4Relation: function () {
//        if (global_var.related_SUS_status !== 'A') {
//            return;
//        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                global_var.related_SUS_status = 'C';
                that.loadSUS4RelationDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteOutputFromList: function (e, id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.deleteInput(id);
                SACore.updateBacklogByRes(res);

                that.addSourcedIconToUserStory(res);
                new Project().getProjectStatList();
                var st = that.getHtmlGenIPOOutputList(res);
                $('#tblIPOOutputList > tbody').html(st);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteInputDescFromUSList: function (e, id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInputDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInputDesc.deleteInputDescription(id);
                SAInput.updateInputByRes(res);

                that.genIPOInputDescList();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteInputFromUSList: function (e, id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.deleteInput(id);
                SACore.updateBacklogByRes(res);

                var st = that.getHtmlGenIPOInputList(res);
                $('#tblIPOList > tbody').html(st);

                that.addSourcedIconToUserStory(res);
//                that.genGUIDesign(res);
                new Project().getProjectStatList();

                $('.us-ipo-input-tr').first().click();
//                //generate GUI
//                $('#SUS_GUI_header').text((res.kv.backlogName));
//                $('#userstory-gui-input-component-res-sus-label').text((res.kv.backlogName));
//                $('#generalview_SUS_GUI_header').text((res.kv.backlogName));
                var st = that.getGUIDesignHTMLPure(res);
                $('#SUS_IPO_GUI_Design').html(st);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    add: function () {
        this.setData();
        this.check4Inputs();
        this.insert();
    },
    clearField: function () {
        $('.addUS').each(function (e) {
            $(this).val('');
            $(this).next('p').remove();
        });
        $('#canvasdiv_backlog').html('');
    },
    backlogToggleInAddTaskType: function () {

        if (($('#addBacklog_assignee').val()) && ($('#addBacklog_assignee').val())) {
            $('.backlog-toggle').removeAttr('disabled');
            $('#canvasdiv_backlog').show();
            setGlobalActiveCanvas(global_var.canvas.backlog);
        } else {
            $('.backlog-toggle').attr('disabled', true);
            $('#canvasdiv_backlog').hide();
            clearGlobalActiveCanvas();
        }
    },
    isCloseAfterInsertChecked: function () {
        var id = 'closeAfterInsert';
        var checked = $("input[id=" + id + "]:checked").length;
        if (checked === 0) {
            return false;
        } else {
            return true;
        }
    },
    closeModal: function () {
        if (this.isCloseAfterInsertChecked()) {
            $('#insertNewBacklog').modal('hide');
        } else {
            $('#backlogName').focus();
        }
    },
    insertNewTicketModal: function () {

    },
    insertNewTicket: function () {
        if ($('#insertNewTicketModal_userstory').val().trim().length === 0) {
            Toaster.showError('Please enter Story.');
            return;
        }
        if (!$('#insertNewTicketModal_priority') ||
                $('#insertNewTicketModal_priority :selected').val() === undefined
                || $('#insertNewTicketModal_priority ').val() === null) {
            Toaster.showError('Please choose Priority.');
            return;
        }

        if ($('#insertNewTicketModal_file').val().trim().length > 0) {
            this.sendFileForNewTicket();
        } else {
            this.insertNewTicketMain();
        }
    },
    sendFileForNewTicket: function () {
        if ($('#insertNewTicketModal_file').val().trim().length > 0) {
            this.upload4NewTicket('insertNewTicketModal_file');
        }
    },
    upload4NewTicket: function (id) {
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile4NewTicket(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);

                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    if (trc === file_count) {
//                        console.log('st=' + st);
                        $('#' + id).attr("fname", st);
                        that.insertNewTicketMain();
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    uploadFile4NewTicket: function (fileext, file_base_64, file_name) {
//        console.log(file_base_64)

        var d = new Object();
        d.file_base_64 = file_base_64;
        d.file_extension = fileext;
        d.file_type = "general";
        d.file_name = file_name;
        conf = JSON.parse('{"kv":{}}');
        conf['kv'] = d;
        var data = JSON.stringify(conf);
        var finalname = "";
        $.ajax({
            url: urlGl + "api/post/upload",
            type: "POST",
            data: data,
            contentType: "application/json",
            async: false,
            beforeSend: function (msg) {
                showProgress();
            },
            success: function (data) {
                finalname = data.kv.uploaded_file_name;
                hideProgress();
            },
            error: function () {

            }
        });
        return finalname;
    },
    insertNewTicketMain: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv['backlogName'] = $('#insertNewTicketModal_userstory').val();
        json.kv['description'] = $('#insertNewTicketModal_comment').val();
        json.kv['fkProjectId'] = global_var.current_project_id;
        json.kv['priority'] = $('#insertNewTicketModal_priority').val();
        json.kv['filename'] = $('#insertNewTicketModal_file').attr('fname');
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewTicket",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#insertNewTicketModal').modal('hide');
                $('#insertNewTicketModal_userstory').val('');
                $('#insertNewTicketModal_comment').val('');
                $('#insertNewTicketModal_priority').val('');
                $('#insertNewTicketModal_file').val('');
                $('#insertNewTicketModal_file').attr('fname', '');
                $('#insertNewTicketModal_list').html('');
                that.load();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    insert: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv['backlogName'] = this.getStory();
        json.kv['backlogBecause'] = this.getBecause();
        json.kv['description'] = this.getDescription();
        json.kv['fkProjectId'] = global_var.current_project_id;
        json.kv['priority'] = this.getPriority();
        json.kv.fkLabelId = this.getLabelList4AssignLabeltoUserStoryByDiv('insertNewBacklog_labellist');
        json.kv.fkSprintId = this.getSprintList4AssignSprinttoUserStoryByDiv('insertNewBacklog_sprintlist');
        json.kv.add2jira = "1";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklog",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SACore.addBacklogByRes(res);
                global_var.current_backlog_id = res.kv.id;
                Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
                that.insertBacklog_AddTaskType(res.kv.id);
                that.closeModal();
                that.clearField();
                that.load();
                new Sprint().load();
                new Label().load();
                $('#backlogName').focus();
//                that.refreshCurrentBacklogById(res.kv.id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    insertBacklog_AddTaskType: function (backlogId) {
        try {
            if (backlogId.length === 0) {
                return;
            }
            if ($('#addBacklog_tasktype').val().length === 0) {
                return;
            }
            if ($('#addBacklog_estiamtedhours').val().length === 0) {
                return;
            }
            if ($('#addBacklog_assignee').val().length === 0) {
                return;
            }

            if (isCanvasContextExist('canvasdiv_backlog')) {
                try {
                    this.loadPicture4TestCase();
                } catch (err) {
                }
            }

            if ($('#file4AddBacklog').val().trim().length > 0) {
                this.sendFileForAddBacklog(backlogId);
            } else {
                this.addTaskTypeDetails4Backlog(backlogId, '');
            }
        } catch (err) {
        }


//        try {
//            this.addTaskTypeDetails4Backlog(backlogId, '');
//        } catch (err) {
//        }
    },
    addTaskTypeDetails4Backlog: function (backlogId, filename) {
        if (backlogId.length === 0) {
            return;
        }
        if ($('#addBacklog_tasktype').val().length === 0) {
            return;
        }
        if ($('#addBacklog_estiamtedhours').val().length === 0) {
            return;
        }
        if ($('#addBacklog_assignee').val().length === 0) {
            return;
        }

        var comment = $('#addBacklog_comment').val();
        var commentType = $('#addBacklog_commenttype').val();
        $('#addBacklog_addbutton').hide();
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkTaskTypeId = $('#addBacklog_tasktype').val();
        json.kv.fkAssigneeId = $('#addBacklog_assignee').val();
        json.kv.estimatedHours = $('#addBacklog_estiamtedhours').val();
        json.kv.commentEstimationHours = $('#addBacklog_estiamtedhours').val();
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkNotifierId = this.getNotifierList();
        json.kv.comment = comment;
        json.kv.commentType = commentType;
        json.kv.filename = filename + global_var.vertical_seperator + global_var.current_upload_canvas;
        json.kv.add2jira = "1";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklogTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#addBacklog_comment').val('');
                $('#addBacklog_filelist').html('');
                $('#file4AddBacklog').val('');
                that.refreshCurrentBacklogById(backlogId);
            },
        });
    },
    setFilterDate: function () {
        global_var.userStoryFilter.createdDate = '';
        Utility.addParamToUrl('userStoryFilter.createdDate', global_var.userStoryFilter.createdDate);
        var fromDate = '';
        if ($('#us_core_filter_fromdate').val()) {
            var date = new Date($('#us_core_filter_fromdate').val());
            var day = date.getDate();
            day = day.toString(10).length === 1 ? '0' + day : day;
            var month = date.getMonth() + 1;
            month = month.toString(10).length === 1 ? '0' + month : month;
            var year = date.getFullYear();
            fromDate = year + "" + month + '' + day;
        }

        var toDate = '';
        if ($('#us_core_filter_todate').val()) {
            var date2 = new Date($('#us_core_filter_todate').val());
            var day2 = date2.getDate();
            day2 = day2.toString(10).length === 1 ? '0' + day2 : day2;
            var month2 = date2.getMonth() + 1;
            month2 = month2.toString(10).length === 1 ? '0' + month2 : month2;
            var year2 = date2.getFullYear();
            toDate = year2 + "" + month2 + '' + day2;
        }

//        var date1 = fromDate + '%BN%' + toDate;
        var date1 = fromDate + '-' + toDate;
        if (!date1.includes("NaN") && toDate && fromDate) {
            global_var.userStoryFilter.createdDate = date1;
            Utility.addParamToUrl('userStoryFilter.createdDate', global_var.userStoryFilter.createdDate);
        }
        this.load();
    },
    clearAndShowAll: function () {
        global_var.current_nav_view = 'all';
        Utility.addParamToUrl('current_nav_view', global_var.current_nav_view);
        global_var.userStoryFilter.userstory = "";
        global_var.userStoryFilter.backlogStatus = "";
        global_var.userStoryFilter.priority = "";
        global_var.userStoryFilter.createdBy = "";
        global_var.userStoryFilter.taskType = "";
        global_var.userStoryFilter.assignee = "";
        global_var.userStoryFilter.assignedLabel = "";
        global_var.userStoryFilter.createdDate = "";
        global_var.userStoryFilter.sprint = "";
        global_var.userStoryFilter.label = "";
        global_var.userStoryFilter.isSourced = "";
        global_var.userStoryFilter.isInitial = "";
        global_var.userStoryFilter.isAPI = "";
        global_var.userStoryFilter.asc = "";
        global_var.userStoryFilter.desc = "orderNo";
        global_var.userStoryFilter.userStoriesAssignedToMe = '';
        global_var.userStoryFilter.isBounded = "";
        global_var.userStoryFilter.isFromCustomer = '';
        $('.us_filter_status').prop("checked", false);
        $('.us-filter-checkbox-priority').prop("checked", false);
        $('.us_filter_createdby_class').prop("checked", false);
        $('.us_filter_tasktype_class').prop("checked", false);
        $('.us_filter_assignedlabel_class').prop("checked", false);
        $('.us-filter-checkbox-sprint').prop("checked", false);
        $('.us-filter-checkbox-label').prop("checked", false);
        $('.us_filter_assignee_class').prop("checked", false);
        $('#us_core_filter_fromdate').val('');
        $('#us_core_filter_todate').val('');
        $('.nav-filter-main').attr("style", "color:white");
        $('#add-bkl-line').val('');
        this.load();
    },
    showSourcedUserStories: function (e) {
        this.clearTopFilter('sourced');
        global_var.userStoryFilter.isSourced = '1';
        this.setTopFilterIcon(e);
        this.load();
    },
    userStoriesAssignedToMe: function (e) {
        this.clearTopFilter('mine');
        global_var.userStoryFilter.userStoriesAssignedToMe = '1';
        this.setTopFilterIcon(e);
        this.load();
    },
    showBindedUserStories: function (e) {

        this.clearTopFilter('bound');
        global_var.userStoryFilter.isBounded = '1';
        this.setTopFilterIcon(e);
        this.load();
    },
    showInitialUserStories: function (e) {

        this.clearTopFilter('initial');
        global_var.userStoryFilter.isInitial = '1';
        this.setTopFilterIcon(e);

        this.load();
    },
    showListOfAPIs: function (e) {
        this.clearTopFilter("api");
        global_var.userStoryFilter.isAPI = '1';
        this.setTopFilterIcon(e);
        this.load();
    },
    clearTopFilter: function (viewStatus) {
        global_var.current_nav_view = viewStatus;
        Utility.addParamToUrl('current_nav_view', global_var.current_nav_view);
        global_var.userStoryFilter.isSourced = '';
        global_var.userStoryFilter.userStoriesAssignedToMe = '';
        global_var.userStoryFilter.isBounded = '';
        global_var.userStoryFilter.isFromCustomer = '';
        global_var.userStoryFilter.isInitial = '';
        global_var.userStoryFilter.isAPI = '';

    },
    setTopFilterIcon: function (el) {
        $('.nav-filter-main').attr("style", "color:white");
        $(el).attr("style", "color:darkred");
    },
    showTickets: function (e) {
        global_var.current_nav_view = 'ticket';
        Utility.addParamToUrl('current_nav_view', global_var.current_nav_view);
        global_var.userStoryFilter.isSourced = '';
        global_var.userStoryFilter.userStoriesAssignedToMe = '';
        global_var.userStoryFilter.isBounded = '';
        global_var.userStoryFilter.isFromCustomer = '1';
        $('.nav-filter-main').attr("style", "color:white");
        $(e).attr("style", "color:darkred");
        this.load();
    },
    setDetailedView: function (e) {
        global_var.current_view = "detailed";
        Utility.addParamToUrl('current_view', global_var.current_view);
        $('.core-view').show();
        this.setUSListsDetailedView();
        this.refreshCurrentBacklog();
        $('#main_div_of_backlog_info_kanban_view').hide();
        $('#main_div_of_backlog_info_list_view').hide();
        $('#main_div_of_backlog_info_pivot_view').hide();
        $('#main_div_of_backlog_info').show();
        this.manageViewColWidth()

        $('.nav-view-filter-main').attr("style", "color:white");
        $(e).attr("style", "color:yellow");
    },
    setKanbanView: function (e) {
        global_var.current_view = "kanban";
        Utility.addParamToUrl('current_view', global_var.current_view);
        $('.core-view').hide();
        $('#main_div_of_backlog_info_kanban_view').show();
        $('#main_div_of_backlog_info').hide();
        $('#main_div_of_backlog_info_list_view').hide();
        $('#main_div_of_backlog_info_pivot_view').hide();
        this.setUSLists4KanbanViewDirect();
        this.manageViewColWidth()

        $('.nav-view-filter-main').attr("style", "color:white");
        $(e).attr("style", "color:yellow");
    },
    setPivotView: function (e) {
        global_var.current_view = "pivot";
        Utility.addParamToUrl('current_view', global_var.current_view);
        $('.core-view').hide();
        $('#main_div_of_backlog_info_pivot_view').show();
        $('#main_div_of_backlog_info_kanban_view').hide();
        $('#main_div_of_backlog_info').hide();
        $('#main_div_of_backlog_info_list_view').hide();
        this.setUSLists4PivotViewDirect();
        this.manageViewColWidth();
        $('.nav-view-filter-main').attr("style", "color:white");
        $(e).attr("style", "color:yellow");
    },
    setListView: function (e) {
        $('.nav-view-filter-main').attr("style", "color:white");
        $(e).attr("style", "color:yellow");
        global_var.current_view = "list";
        Utility.addParamToUrl('current_view', global_var.current_view);
        this.manageViewColWidth()
        $('.core-view').hide();
        $('#main_div_of_backlog_info_list_view').show();
        $('#main_div_of_backlog_info_pivot_view').hide();
        $('#main_div_of_backlog_info_kanban_view').hide();
        $('#main_div_of_backlog_info').hide();
//        



//        try {
        $('#list_view_table_list_4_assignee').show();
        $('#list_view_table_list').hide();
        if (global_var.current_list_view_table_item === "assignee") {
            this.loadBacklogWithTask();
        } else {
            this.setUSLists4ListViewDirect();
        }
//        } catch (e) {
//
//        }


    },
    manageViewColWidth: function () {
//        if (global_var.current_view === 'detailed') {
//            $('#core_div_col_1st').removeClass('col-3').removeClass('col-3').addClass('col-3');
//            $('#main_div_of_backlog_info_detailed_view').removeClass('col-9').removeClass('col-9').addClass('col-9');
//        } else if (global_var.current_view === 'kanban') {
//            $('#core_div_col_1st').removeClass('col-3').removeClass('col-4').addClass('col-3');
//            $('#main_div_of_backlog_info_kanban_view').removeClass('col-8').removeClass('col-9').addClass('col-9');
//        } else if (global_var.current_view === 'list') {
//            $('#core_div_col_1st').removeClass('col-3').removeClass('col-4').addClass('col-3');
//            $('#main_div_of_backlog_info_list_view').removeClass('col-8').removeClass('col-9').addClass('col-9');
//        }
    },
    setUSLists4ListViewDirect: function () {
        global_var.current_list_view_table_item = 'userstory';
        $('#list_view_table_list').show();
        $('#list_view_table_list_4_assignee').hide();
        $('#list_view_table_list > tbody').html('');
        try {
            if (global_var.current_backlog_list.tbl.length === 0) {
                this.setEmptyMessage4BacklogListView();
                return;
            }
        } catch (e) {
            this.setEmptyMessage4BacklogListView();
            return;
        }

//        console.log(JSON.stringify(global_var.current_backlog_list))
        var obj = global_var.current_backlog_list.tbl[0].r;
        var spent_hours = 0.0;
        var estimation_hours = 0.0;
        for (var i = 0; i < obj.length; i++) {
            var isSourced = obj[i].isSourced === '1'
                    ? "<i class=\"fa fa-cube\" style=\"color: darkred;\">&nbsp;</i>"
                    : obj[i].fkSourcedId.length > 0
                    ? '<i class=\"fa fa-bandcamp\" style=\"color: green;\" title="' + replaceTags(obj[i].sourcedName) + '">&nbsp;</i>'
                    : "";
            var isFromCustomer = obj[i].isFromCustomer === '1' ? ""
//                    ? "<i class=\"fa fa-ticket\" style=\"color: blue;\">&nbsp;</i>"
                    : "";
            var countLine = obj[i].isSourced === '1' && obj[i].taskCount > 0
                    ? '&nbsp; <i class="fa fa-tasks" style="font-size:10px;color:#555555;"></i><span style="font-size:10px; "> ('
                    + obj[i].taskCount + ')</span>'
                    : " ";
            countLine += obj[i].isSourced === '1' && obj[i].inputCount > 0
                    ? '&nbsp; <i class="fa fa-inbox" style="font-size:10px;color:#555555;"></i><span style="font-size:10px; "> ('
                    + obj[i].inputCount + ')</span>'
                    : "";
            countLine += obj[i].commentCount > 0
                    ? '&nbsp; <i class="fa fa-comment" style="font-size:10px;color:#555555;"></i><span style="font-size:10px; "> ('
                    + obj[i].commentCount + ')</span>'
                    : "";
            var tr = $('<tr></tr>').append($('<td></td>').html('#' + (i + 1) + ": "));
            tr.append($('<td></td>').html(countLine));
            tr.append($('<td></td>').html('<span class="us-item-status-' +
                    obj[i].backlogStatus + '">' + obj[i].backlogStatus + '</span><br>'));
            tr.append($('<td style="text-align:left;"></td>').html(isSourced + isFromCustomer +
                    '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' + obj[i].id + '\')">'
                    + "#" + obj[i].orderNo + ": " + replaceTags(obj[i].backlogName) + '</a>'));
            tr.append($('<td></td>').html(obj[i].createdByName));
            tr.append($('<td></td>').html(Utility.convertDate(obj[i].createdDate)));
            tr.append($('<td></td>').html(obj[i].priority));
            tr.append($('<td></td>').html(obj[i].assigneeName));
            tr.append($('<td></td>').html(obj[i].estimatedHours + "/" + obj[i].spentHours));
            spent_hours += (obj[i].spentHours) ? parseFloat(obj[i].spentHours) : 0;
            estimation_hours += (obj[i].estimatedHours) ? parseFloat(obj[i].estimatedHours) : 0;
            $('#list_view_table_list > tbody').append(tr);
        }
        $('#list_view_table_list > tbody')
                .append($('<tr></tr>')
                        .append($('<td></td>').attr('colspan', '8'))
                        .append($('<td></td>').append($('<b></b>')
                                .append(Number((estimation_hours).toFixed(2)))
                                .append('/')
                                .append(Number((spent_hours).toFixed(2)))))
                        );
    },
    getJSONData4BaklogList: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.backlogName = global_var.userStoryFilter.userstory;
        json.kv.backlogStatus = global_var.userStoryFilter.backlogStatus;
        json.kv.priority = global_var.userStoryFilter.priority;
        json.kv.createdBy = global_var.userStoryFilter.createdBy;
        json.kv.taskType = global_var.userStoryFilter.taskType;
        json.kv.assignedLabel = global_var.userStoryFilter.assignedLabel;
        json.kv.assignee = global_var.userStoryFilter.assignee;
        json.kv.createdDate = global_var.userStoryFilter.createdDate;
        json.kv.fkSprintId = global_var.userStoryFilter.sprint;
        json.kv.fkLabelId = global_var.userStoryFilter.label;
        json.kv.isSourced = global_var.userStoryFilter.isSourced;
        json.kv.isInitial = global_var.userStoryFilter.isInitial;
        json.kv.userStoriesAssignedToMe = global_var.userStoryFilter.userStoriesAssignedToMe;
        json.kv.isBounded = global_var.userStoryFilter.isBounded;
        json.kv.isFromCustomer = global_var.userStoryFilter.isFromCustomer;
        json.kv.isApi = global_var.userStoryFilter.isAPI;
        if (global_var.userStoryFilter.asc.length > 0) {
            json.kv.asc = global_var.userStoryFilter.asc;
        } else if (global_var.userStoryFilter.desc.length > 0) {
            json.kv.desc = global_var.userStoryFilter.desc;
        }
        if (global_var.user_story_core_filter_paging_button_pressed != '1') {
            global_var.user_story_core_filter_current_index = '0';
        }

        json.kv.startLimit = global_var.user_story_core_filter_current_index;
        json.kv.endLimit = parseFloat(global_var.user_story_core_filter_current_index)
                + parseFloat($('#us_core_filter_perpage').val());
        return json;
    },
    load: function () {


        $('#container-us-body').html('');
        $('.us-checkbox-list').first().prop("checked", false);
        $('.assignSprintAndLabel').attr("style", "pointer-events:none;color:gray;");
        var current_backlog_id = Utility.getParamFromUrl('current_backlog_id');
        global_var.current_backlog_id = current_backlog_id.length > 1
                ? Utility.getParamFromUrl('current_backlog_id')
                : "";
        Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
        if (!global_var.current_project_id) {
            return;
        }

//      var json = this.getJSONData4BaklogList();
//      var data = JSON.stringify(json);
//      this.loadDetails(data, this);
        this.loadDetailesPure(SACore.toJSON());


    },
    refreshBacklog: function () {

        //View All Gui-nin yeniden doldurulmasi buradan trigger edilir;
        $('#gui_component_main_view_all').html('');
//      

        this.loadDetailsOnProjectSelect();
        this.loadInputDetailsOnProjectSelect();
        this.loadInputDescDetailsOnProjectSelect();
        this.loadDependencyOnProjectSelect();
        this.loadSUS4Relation4Section();
        this.loadBacklogLabelOnProjectSelect();
    },
    loadDetailsOnProjectSelect: function () {
        showProgress();

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            beforeSend: function () {
                showProgress();
            },
            success: function (res) {
                SACore.LoadBacklog(res);
                that.load();
                if (global_var.mainview === 'projectpreview') {
                    ProjectPreview.showDetails();
                }
                hideProgress();
            },
            error: function () {
                hideProgress();
            }
        });
    },
    loadInputDetailsOnProjectSelect: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInput.LoadInput(res);
                that.load();
                that.refreshCurrentBacklog();
            }
        });
    },
    loadInputDescDetailsOnProjectSelect: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputDescriptionList4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInputDesc.LoadInputDescription(res);
            }
        });
    },
    loadDependencyOnProjectSelect: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogDependencyList4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SADependency.LoadDependency(res);
            }
        });
    },

    loadBacklogLabelOnProjectSelect: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBakclogLabelList4Select",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SABacklogLabel.Load(res);
            }
        });
    },

    loadDetails: function (data, arg) {
        var that = arg;
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadDetailesPure(res);
            }
        });
    },

    loadDetailesPure: function (res) {
        global_var.current_backlog_list = res;
        $("#view_button_" + global_var.current_view).click();
        if (res.tbl.length === 0) {
            $('#main_div_of_backlog_info').addClass('disabledDiv');
            $('#main_div_of_backlog_info').removeClass('enabledDiv');
            $('#main_div_of_backlog_info_kanban_view_table_new >tbody').html('');
            $('#main_div_of_backlog_info_kanban_view_table_ongoing >tbody').html('');
            $('#main_div_of_backlog_info_kanban_view_table_closed >tbody').html('');
            $('#kanban_view_new_count').html(0);
            $('#kanban_view_ongoing_count').html(0);
            $('#kanban_view_closed_count').html(0);
            $('#us_core_filter_paginationresult_rowcount').html(0);
            this.setEmptyMessage4Backlog();
            this.setEmptyMessage4BacklogListView();
        } else {
            $('#main_div_of_backlog_info').addClass('enabledDiv');
            $('#main_div_of_backlog_info').removeClass('disabledDiv');
            var rc = 0;
            try {
                rc = res.tbl[0]['rowCount']
            } catch (e) {
            }

            $('#us_core_filter_paginationresult_rowcount').html(rc);
//                    that.setFilterPaginationRange();
            if (global_var.current_view === 'detailed') {
                if (global_var.current_us_submenu === 'ipo' &&
                        global_var.ipo_gui_view === 'all') {
                    new UserStory().showAllGUI();

                }
                this.setUSLists(res);
                this.refreshCurrentBacklog();
            } else if (global_var.current_view === 'kanban') {
                $("#view_button_" + global_var.current_view).click();
            } else if (global_var.current_view === 'list') {
                if (global_var.current_view === 'list') {
                    if (global_var.current_list_view_table_item === "assignee") {
                        this.loadBacklogWithTask();
                    } else {
                        this.setUSLists4ListViewDirect();
                    }
                }
            }
        }
    },
    loadBacklogWithTask: function () {

        global_var.current_list_view_table_item = 'assignee';
        $('#list_view_table_list_4_assignee').show();
        $('#list_view_table_list').hide();
        $('#container-us-body').html('');
        $('.us-checkbox-list').first().prop("checked", false);
        $('.assignSprintAndLabel').attr("style", "pointer-events:none;color:gray;");
        var current_backlog_id = Utility.getParamFromUrl('current_backlog_id');
        global_var.current_backlog_id = current_backlog_id.length > 1
                ? Utility.getParamFromUrl('current_backlog_id')
                : "";
        Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
        if (!global_var.current_project_id) {
            return
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.backlogName = global_var.userStoryFilter.userstory;
        json.kv.backlogStatus = global_var.userStoryFilter.backlogStatus;
        json.kv.priority = global_var.userStoryFilter.priority;
        json.kv.createdBy = global_var.userStoryFilter.createdBy;
        json.kv.taskType = global_var.userStoryFilter.taskType;
        json.kv.assignedLabel = global_var.userStoryFilter.assignedLabel;
        json.kv.assignee = global_var.userStoryFilter.assignee;
        json.kv.createdDate = global_var.userStoryFilter.createdDate;
        json.kv.fkSprintId = global_var.userStoryFilter.sprint;
        json.kv.fkLabelId = global_var.userStoryFilter.label;
        json.kv.isSourced = global_var.userStoryFilter.isSourced;
        json.kv.isInitial = global_var.userStoryFilter.isInitial;
        json.kv.userStoriesAssignedToMe = global_var.userStoryFilter.userStoriesAssignedToMe;
        json.kv.isBounded = global_var.userStoryFilter.isBounded;
        json.kv.isFromCustomer = global_var.userStoryFilter.isFromCustomer;
        if (global_var.userStoryFilter.asc.length > 0) {
            json.kv.asc = global_var.userStoryFilter.asc;
        } else if (global_var.userStoryFilter.desc.length > 0) {
            json.kv.desc = global_var.userStoryFilter.desc;
        }
        if (global_var.user_story_core_filter_paging_button_pressed != '1') {
            global_var.user_story_core_filter_current_index = '0';
        }

        json.kv.startLimit = global_var.user_story_core_filter_current_index;
        json.kv.endLimit = parseFloat(global_var.user_story_core_filter_current_index)
                + parseFloat($('#us_core_filter_perpage').val());
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogListByListView",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadBacklogWithTaskDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadBacklogWithTaskDetails: function (res) {
        $('#list_view_table_list_4_assignee > tbody').html('');
//        console.log(JSON.stringify(global_var.current_backlog_list))
        try {
            if (!res.tbl[0].r) {
                this.setEmptyMessage4BacklogListViewByAssignee();
                return;
            }
        } catch (e) {
            this.setEmptyMessage4BacklogListViewByAssignee();
            return;
        }

        var obj = res.tbl[0].r;
        var spent_hours = 0.0;
        var estimation_hours = 0.0;
        var rc4US = 0;
        var rc4Sprint = 0;
        var tr_4_us = [];
        var tr_4_sprint = [];
        var tr_4_us_count = [];
        var tr_4_sprint_count = [];
        var assigneeName = (obj[0].assigneeName) ? obj[0].assigneeName : "";
        var sprintName = (obj[0].sprintName) ? obj[0].sprintName : "";
        var idx_rc = 0;
        var idx_sprint = 0;
        var idx_rc_estimation = (obj[0].estimatedHours) ? parseFloat(obj[0].estimatedHours, 1) : 0;
        var idx_rc_spent = (obj[0].spentHours) ? parseFloat(obj[0].spentHours, 1) : 0;
        var idx_sprint_estimation = (obj[0].estimatedHours) ? parseFloat(obj[0].estimatedHours, 1) : 0;
        var idx_sprint_spent = (obj[0].spentHours) ? parseFloat(obj[0].spentHours, 1) : 0;
        for (var i = 1; i <= obj.length; i++) {
            idx_rc++;
            idx_sprint++;
            var assigneeName_core = (i === obj.length) ? "-1" : obj[i].assigneeName;
            var sprintName_core = (i === obj.length) ? "-1" : obj[i].sprintName;
            if (assigneeName !== assigneeName_core) {
                tr_4_us.push(idx_rc);
                tr_4_us_count.push(parseFloat(idx_rc_estimation, 1) + "/" + parseFloat(idx_rc_spent, 1));
                assigneeName = assigneeName_core;
                idx_rc = 0;
                idx_rc_estimation = 0;
                idx_rc_spent = 0;
//                idx_sprint = 0;
                sprintName = "";
            }

            if (sprintName !== sprintName_core) {
                tr_4_sprint.push(idx_sprint);
                sprintName = sprintName_core;
                tr_4_sprint_count.push(parseFloat(idx_sprint_estimation, 1) + "/" + parseFloat(idx_sprint_spent, 1));
                idx_sprint_estimation = 0;
                idx_sprint_spent = 0;
                idx_sprint = 0;
            }

            idx_rc_estimation += (i === obj.length) ? 0 : (obj[i].estimatedHours) ? parseFloat(obj[i].estimatedHours, 2) : 0;
            idx_rc_spent += (i === obj.length) ? 0 : (obj[i].spentHours) ? parseFloat(obj[i].spentHours, 2) : 0;
            idx_sprint_estimation += (i === obj.length) ? 0 : (obj[i].estimatedHours) ? parseFloat(obj[i].estimatedHours, 2) : 0;
            idx_sprint_spent += (i === obj.length) ? 0 : (obj[i].spentHours) ? parseFloat(obj[i].spentHours, 2) : 0;
        }

        var assigneeName = "";
        var idx_4_assignee = 0;
        var sprintName = "";
        var idx_4_sprint = 0;
        for (var i = 0; i < obj.length; i++) {
            var isSourced = obj[i].isSourced === '1'
                    ? "<i class=\"fa fa-cube\" style=\"color: darkred;\">&nbsp;</i>"
                    : obj[i].fkSourcedId.length > 0
                    ? '<i class=\"fa fa-bandcamp\" style=\"color: green;\" title="' + replaceTags(obj[i].sourcedName) + '">&nbsp;</i>'
                    : "";
            var tr = $('<tr></tr>').append($('<td></td>').html('#' + (i + 1) + ": "));
//            console.log('assigneeName=' + assigneeName);
//            console.log('obj[i].assigneeName=' + obj[i].assigneeName);

            var assigneeName_core = (i === obj.length) ? "-1" : obj[i].assigneeName;
            var sprintName_core = (i === obj.length) ? "-1" : obj[i].sprintName;
            if (assigneeName !== assigneeName_core) {
                var rs = (tr_4_us[idx_4_assignee]) ? tr_4_us[idx_4_assignee] : 0;
                var td = $('<td></td>').attr("rowspan", rs)
                        .append(assigneeName_core)
                        .append(' ')
                        .append($('<b></b>')
                                .append(" (")
                                .append(tr_4_us_count[idx_4_assignee])
                                .append(")")
                                );
                assigneeName = assigneeName_core;
                sprintName = "";
                tr.append(td);
                idx_4_assignee++;
            }

//            console.log('sprintName=' + sprintName);
//            console.log('obj[i].sprintName=' + obj[i].sprintName);
            if (sprintName !== sprintName_core) {
                var rs = (tr_4_sprint[idx_4_sprint]) ? tr_4_sprint[idx_4_sprint ] : 0;
                var td = $('<td></td>').attr("rowspan", rs)
                        .append(sprintName_core).append(' ')
                        .append($('<b></b>')
                                .append(" (")
                                .append(tr_4_sprint_count[idx_4_sprint])
                                .append(")")
                                );
                sprintName = sprintName_core;
                tr.append(td);
                idx_4_sprint++;
            }

//            tr.append($('<td></td>').append(obj[i].assigneeName));
//            tr.append($('<td></td>').html(obj[i].sprintName));
            tr.append($('<td></td>').attr('style', 'text-align:left').html(isSourced +
                    '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' + obj[i].id + '\')">'
                    + "#" + obj[i].orderNo + ": " + replaceTags(obj[i].backlogName) + '</a>'));
            tr.append($('<td></td>').html(obj[i].taskTypeName));
            tr.append($('<td></td>').html('<span class="us-item-status-' +
                    obj[i].backlogStatus + '">' + obj[i].backlogStatus + '</span><br>'));
            tr.append($('<td></td>').html(obj[i].createdByName));
            tr.append($('<td></td>').html(Utility.convertDate(obj[i].createdDate)));
            tr.append($('<td></td>').html(obj[i].priority));
            tr.append($('<td></td>').html(obj[i].estimatedHours + "/" + obj[i].spentHours));
            spent_hours += (obj[i].spentHours) ? parseFloat(obj[i].spentHours, 1) : 0;
            estimation_hours += (obj[i].estimatedHours) ? parseFloat(obj[i].estimatedHours, 1) : 0;
            $('#list_view_table_list_4_assignee > tbody').append(tr);
        }
        $('#list_view_table_list_4_assignee > tbody')
                .append($('<tr></tr>')
                        .append($('<td></td>').attr('colspan', '9'))
                        .append($('<td></td>').append($('<b></b>')
                                .append(Number((estimation_hours).toFixed(2)))
                                .append('/')
                                .append(Number((spent_hours).toFixed(2)))))
                        );
    },
    clickFirstUserStory: function () {
        $('#container-us-body').find('.pointer').first().find('a').click();
    },
    setEmptyMessage4Backlog: function () {
        var st = '<div  style="padding:30px;text-align:center;">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        $('#container-us-body').html(st);
    },

    setEmptyMessage4BacklogListView4Pivot: function () {
        var st = '<tr><td colspan=11>'
        st += '<div  style="padding:30px;text-align:center">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        st += '</td></tr>'
        $('#list_view_table_pivot_list > tbody').html(st);
    },
    setEmptyMessage4BacklogListView: function () {
        var st = '<tr><td colspan=11>'
        st += '<div  style="padding:30px;text-align:center">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        st += '</td></tr>'
        $('#list_view_table_list >tbody').html(st);
    },
    setEmptyMessage4BacklogListViewByAssignee: function () {
        var st = '<tr><td colspan=11>'
        st += '<div  style="padding:30px;text-align:center">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        st += '</td></tr>'
        $('#list_view_table_list_4_assignee >tbody').html(st);
    },
    setFilterPaginationRange: function () {
        var s = global_var.user_story_core_filter_current_index;
        var e = parseFloat(global_var.user_story_core_filter_current_index)
                + parseFloat($('#us_core_filter_perpage').val())
        $('#us_core_filter_paginationResult').html("(" + s + '-' + e + ')');
    },
    userstory_sort_by: function (e) {
        if (global_var.userStoryFilter.asc.length > 0) {
            global_var.userStoryFilter.asc = $(e).val();
        } else if (global_var.userStoryFilter.desc.length > 0) {
            global_var.userStoryFilter.desc = $(e).val();
        } else {
            global_var.userStoryFilter.desc = $(e).val();
        }
        this.load();
    },
    userstory_sort_by_asc: function (e) {
        $('.us_sort_by_arrows').attr("style", 'cursor: pointer;color:darked;font-size:14px;');
        $(e).attr("style", 'cursor: pointer;color:green;font-size:14px;');
        global_var.userStoryFilter.asc = $('#us_sort_by_list').val();
        global_var.userStoryFilter.desc = '';
        this.load();
    },
    userstory_sort_by_desc: function (e) {
        $('.us_sort_by_arrows').attr("style", 'cursor: pointer;color:darked;font-size:14px;');
        $(e).attr("style", 'cursor: pointer;color:green;font-size:14px;');
        global_var.userStoryFilter.desc = $('#us_sort_by_list').val();
        global_var.userStoryFilter.asc = '';
        this.load();
    },
    getUSListBlock_old: function (res) {
        var obj = res.tbl[0].r;
        var ln = '';
        for (var n = 0; n < obj.length; n++) {
            ln += this.genUSLine(obj[n]);
        }
        return ln;
    },
    getUSListBlock: function (res) {
        var obj = res.tbl[0].r;
        var tbody = $('<tbody></tbody>');
        for (var n = 0; n < obj.length; n++) {
            tbody.append(this.genUSLine(obj[n]));
        }

        return tbody.html();
    },
    setUSLists: function (res) {
        try {
            if (res.tbl.length === 0) {
                this.setEmptyMessage4Backlog();
                return;
            }
            $('#container-us-body').html('');

            $('#container-us-body').html(this.getUSListBlock(res));
        } catch (e) {
        }
    },
    setUSListsDetailedView: function () {
        this.setUSLists(global_var.current_backlog_list);
    },
    setUSLists4KanbanViewDirect: function () {
        this.setUSLists4KanbanView(global_var.current_backlog_list);
    },
    setUSLists4PivotViewDirect: function () {
        this.setUSLists4PivotView(global_var.current_backlog_list);
    },
    setUSLists4PivotView: function (res) {
        this.loadBacklogWithTask4Pivot();
    },
    loadBacklogWithTask4Pivot: function () {
        var current_backlog_id = Utility.getParamFromUrl('current_backlog_id');
        global_var.current_backlog_id = current_backlog_id.length > 1
                ? Utility.getParamFromUrl('current_backlog_id')
                : "";
        Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
        if (!global_var.current_project_id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.backlogName = global_var.userStoryFilter.userstory;
        json.kv.backlogStatus = global_var.userStoryFilter.backlogStatus;
        json.kv.priority = global_var.userStoryFilter.priority;
        json.kv.createdBy = global_var.userStoryFilter.createdBy;
        json.kv.taskType = global_var.userStoryFilter.taskType;
        json.kv.assignedLabel = global_var.userStoryFilter.assignedLabel;
        json.kv.assignee = global_var.userStoryFilter.assignee;
        json.kv.createdDate = global_var.userStoryFilter.createdDate;
        json.kv.fkSprintId = global_var.userStoryFilter.sprint;
        json.kv.fkLabelId = global_var.userStoryFilter.label;
        json.kv.isSourced = global_var.userStoryFilter.isSourced;
        json.kv.isInitial = global_var.userStoryFilter.isInitial;
        json.kv.userStoriesAssignedToMe = global_var.userStoryFilter.userStoriesAssignedToMe;
        json.kv.isBounded = global_var.userStoryFilter.isBounded;
        json.kv.isFromCustomer = global_var.userStoryFilter.isFromCustomer;
        if (global_var.userStoryFilter.asc.length > 0) {
            json.kv.asc = global_var.userStoryFilter.asc;
        } else if (global_var.userStoryFilter.desc.length > 0) {
            json.kv.desc = global_var.userStoryFilter.desc;
        } else {
            json.kv.desc = 'backlogStatus';
        }

        if (global_var.user_story_core_filter_paging_button_pressed !== '1') {
            global_var.user_story_core_filter_current_index = '0';
        }

        json.kv.startLimit = global_var.user_story_core_filter_current_index;
        json.kv.endLimit = 1000;
//                parseFloat(global_var.user_story_core_filter_current_index)
//                + parseFloat($('#us_core_filter_perpage').val());
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogListByListView",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadBacklogWithTaskDetails4Pivot(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadBacklogWithTaskDetails4Pivot_GetUserStoryList: function (obj, data) {
        if (jQuery.inArray(obj.id, data.us_id_list) === -1) {
            var td = $('<td></td>')
                    .attr('style', '  border-top: 0px solid white;')
                    .addClass('us-item-pivot-td')
                    .addClass('us-item-pivot-userstoty')
                    .append($('<div>')
                            .addClass('us-item-status-pivot-' + obj.backlogStatus)
                            .css('float', 'left')
                            .css('width', '80%')
                            .append($('<a></a>')
                                    .attr('href', '#')
                                    .attr('style', 'color:black;font-size:11px;')
                                    .attr('onclick', 'new UserStory().redirectToDetailedView("' + obj.id + '")')
                                    .append('#' + obj.orderNo + ": " + replaceTags(obj.backlogName))
                                    .append(" (" + data.us_hours_list[obj.id] + '/' + data.us_shours_list[obj.id] + ')')
                                    )
                            .append('<br>')
                            .append($('<b></b>').append(obj.priority))
                            .append(', ')
                            .append($('<i></i>')
                                    .append(obj.createdByName)
                                    .append(", ")
                                    .append(Utility.convertDate(obj.createdDate))
                                    )
                            )
                    .append($('<div class="arrow-right-4-pivot"></div>')
                            .css('float', 'right'));
            data.us_list.push(td);
            data.us_id_list.push(obj.id);
        }
    },
    loadBacklogWithTaskDetails4Pivot_groupby: function (groupby) {
        global_var.sourcedmatrix_filterby = groupby;
        $('#view_button_pivot').click();
    },
    loadBacklogWithTaskDetails4Pivot_GetTaskList: function (obj, data) {
        var id = global_var.sourcedmatrix_filterby === 'tasktype'
                ? obj.fkTaskTypeId
                : global_var.sourcedmatrix_filterby === 'assignee'
                ? obj.fkAssigneeId
                : "";
        var name = global_var.sourcedmatrix_filterby === 'tasktype'
                ? obj.taskTypeName
                : global_var.sourcedmatrix_filterby === 'assignee'
                ? obj.assigneeName
                : "";
        if (!name) {
            return;
        }

        if (jQuery.inArray(id, data.task_id_list) === -1) {

            data.task_id_list.push(id);
            data.task_list.push(replaceTags(name) +
                    ' <br>(' + data.task_hours_list[id] + '/' + data.task_shours_list[id] + ')');
        }
    },
    loadBacklogWithTaskDetails4Pivot_GetTaskHoursList: function (obj, data) {
        var sprint = [];
        for (var i = 0; i < obj.length; i++) {
            var t = obj[i].fkTaskTypeId + '--' + obj[i].id;
            if (jQuery.inArray(t, sprint) === -1) {
                sprint.push(t);
            } else {
                continue;
            }

            if (obj[i].backlogStatus === 'new') {
                if (jQuery.inArray(obj[i].id, data.new_count) === -1) {
                    data.new_count.push(obj[i].id);
                }
            } else if (obj[i].backlogStatus === 'ongoing') {
                if (jQuery.inArray(obj[i].id, data.ongoing_count) === -1) {
                    data.ongoing_count.push(obj[i].id);
                }
            } else if (obj[i].backlogStatus === 'closed') {
                if (jQuery.inArray(obj[i].id, data.closed_count) === -1) {
                    data.closed_count.push(obj[i].id);
                }
            }

            var groupid = global_var.sourcedmatrix_filterby === 'tasktype'
                    ? obj[i].fkTaskTypeId
                    : global_var.sourcedmatrix_filterby === 'assignee'
                    ? obj[i].fkAssigneeId
                    : "";
            data.task_hours_list[groupid] = (data.task_hours_list[groupid])
                    && data.task_hours_list[groupid] !== 'undefined'
                    ? ((parseFloat(data.task_hours_list[groupid], 1) + parseFloat(obj[i].estimatedHours, 1))).toFixed(2)
                    : (obj[i].estimatedHours) ? parseFloat(obj[i].estimatedHours, 1) : 0;
            data.task_shours_list[groupid] = (data.task_shours_list[groupid])
                    && data.task_shours_list[groupid] !== 'undefined'
                    ? ((parseFloat(data.task_shours_list[groupid], 1) + parseFloat(obj[i].spentHours, 1))).toFixed(2)
                    : (obj[i].spentHours) ? parseFloat(obj[i].spentHours, 1) : 0;
            data.us_hours_list[obj[i].id] = (data.us_hours_list[obj[i].id])
                    && data.us_hours_list[obj[i].id] !== 'undefined'
                    ? ((parseFloat(data.us_hours_list[obj[i].id], 1) + parseFloat(obj[i].estimatedHours, 1))).toFixed(2)
                    : (obj[i].estimatedHours) ? parseFloat(obj[i].estimatedHours, 1) : 0;
            data.us_shours_list[obj[i].id] = (data.us_shours_list[obj[i].id])
                    && data.us_shours_list[obj[i].id] !== 'undefined'
                    ? ((parseFloat(data.us_shours_list[obj[i].id], 1) + parseFloat(obj[i].spentHours, 1))).toFixed(2)
                    : (obj[i].spentHours) ? parseFloat(obj[i].spentHours, 1) : 0;
        }
    },
    loadBacklogWithTaskDetails4Pivot_GetCombList: function (obj, data) {
        var id = global_var.sourcedmatrix_filterby === 'tasktype'
                ? obj.fkTaskTypeId
                : global_var.sourcedmatrix_filterby === 'assignee'
                ? obj.fkAssigneeId
                : "";
        var k = obj.id + '-' + id;
        if (jQuery.inArray(k, data.comb_list) === -1) {
            var eh = (obj.estimatedHours) ? parseFloat(obj.estimatedHours, 1) : 0;
            var sh = (obj.spentHours) ? parseFloat(obj.spentHours, 1) : 0;
            var hr = eh + '/' + sh;
            var assigneeName = global_var.sourcedmatrix_filterby === 'tasktype'
                    ? obj.assigneeName
                    : global_var.sourcedmatrix_filterby === 'assignee'
                    ? obj.taskTypeName
                    : "";
            assigneeName = (assigneeName) ? assigneeName : "";
            var v = assigneeName + ' (' + hr + ")";
            v += '<br>' + Utility.convertDate(obj.createdDate);
            v += (obj.modificationDate) ? "/" + Utility.convertDate(obj.modificationDate) : "";
            var td = $('<td></td>')
                    .addClass('us-item-pivot-td')
                    .attr('style', '  border-top: 0px solid white;')
                    .append($('<div>')
                            .addClass('us-item-status-pivot-' + obj.taskStatus).append(v)
                            );
            data.comb_list.push(k);
            data.comb_val_list[k] = $('<div></div>').append(td).html();
        }
    },
    loadBacklogWithTaskDetails4Pivot_setUserStoryCounts: function (data) {
        $('#sourcedmatrixview_new').html(data.new_count.length);
        $('#sourcedmatrixview_ongoing').html(data.ongoing_count.length);
        $('#sourcedmatrixview_closed').html(data.closed_count.length);
    },
    loadBacklogWithTaskDetails4Pivot_GetObjectList: function (obj, data) {
        this.loadBacklogWithTaskDetails4Pivot_GetTaskHoursList(obj, data);
        this.loadBacklogWithTaskDetails4Pivot_setUserStoryCounts(data);
        for (var i = 0; i < obj.length; i++) {
            this.loadBacklogWithTaskDetails4Pivot_GetUserStoryList(obj[i], data);
            this.loadBacklogWithTaskDetails4Pivot_GetTaskList(obj[i], data);
            this.loadBacklogWithTaskDetails4Pivot_GetCombList(obj[i], data);
        }
    },
    loadBacklogWithTaskDetails4Pivot_GetHeader: function (data) {
        var header = $('<div></div>');
        var tr1 = $('<tr></tr>').append($('<th></th>').attr('style', '  border-top: 0px solid white;'));
        for (var j = 0; j < data.task_id_list.length; j++) {
            tr1.append($('<th></th>').append(data.task_list[j]).attr('style', '  border-top: 0px solid white;'));
        }
        header.append(tr1);
        return header;
    },
    loadBacklogWithTaskDetails4Pivot_filterbystatus: function (status) {
        if (status === 'all') {
            $('.us_filter_status').prop('checked', false).click();
            return;
        }
        $('.us_filter_status').prop('checked', false);
        $('#us_filter_status_' + status).click();
    },
    loadBacklogWithTaskDetails4Pivot_GetBody: function (data) {
        var div = $('<div></div>');
        for (var i = 0; i < data.us_id_list.length; i++) {
            var ln = data.us_list[i];
            var tr = $('<tr></tr>');
            tr.append((ln));
            for (var j = 0; j < data.task_id_list.length; j++) {
                var k = data.us_id_list[i] + '-' + data.task_id_list[j];
                tr.append((data.comb_val_list[k]) ? data.comb_val_list[k] :
                        $('<td></td>').attr('style', '  border-top: 0px solid white;'));
            }
            div.append(tr);
        }
        return div;
    },
    loadBacklogWithTaskDetails4Pivot: function (res) {
        $('#list_view_table_pivot_list > thead').html('');
        $('#list_view_table_pivot_list > tbody').html('');
        try {
            if (!res.tbl[0].r) {
                this.setEmptyMessage4BacklogListView4Pivot();
                return;
            }
        } catch (e) {
            this.setEmptyMessage4BacklogListView4Pivot();
            return;
        }

        var obj = res.tbl[0].r;
        var data = {
            'us_list': [],
            'us_id_list': [],
            'us_hours_list': {},
            'us_shours_list': {},
            'task_hours_list': {},
            'task_shours_list': {},
            'new_count': [],
            'ongoing_count': [],
            'closed_count': [],
            'task_list': [],
            'task_id_list': [],
            'comb_list': [],
            'comb_val_list': [],
        }


        this.loadBacklogWithTaskDetails4Pivot_GetObjectList(obj, data);
        var header = this.loadBacklogWithTaskDetails4Pivot_GetHeader(data);
        var body = this.loadBacklogWithTaskDetails4Pivot_GetBody(data);
        $('#list_view_table_pivot_list > thead').append(header.html());
        $('#list_view_table_pivot_list > tbody').append(body.html());

        this.setHeightOfPivotTable();
    },
    setHeightOfPivotTable: function () {
        var int = 6;
        $('.us-item-status-pivot-closed').each(function (e) {
            var h = $(this).closest('td').height();
            $(this).height(h - int);
        })

        $('.us-item-status-pivot-new').each(function (e) {
            var h = $(this).closest('td').height();
            $(this).height(h - int);
        })

        $('.us-item-status-pivot-ongoing').each(function (e) {
            var h = $(this).closest('td').height();
            $(this).height(h - int);
        })

//        $('.arrow-right-4-pivot').each(function (e) {
//            var h = $(this).closest('td').height();
//            $(this).height(h - int);
//        })



    },
    setUSLists4KanbanView: function (res) {
        $('#kanban_view_new_count').html(0);
        $('#kanban_view_ongoing_count').html(0);
        $('#kanban_view_closed_count').html(0);
        $('#main_div_of_backlog_info_kanban_view_table_new >tbody').html('');
        $('#main_div_of_backlog_info_kanban_view_table_ongoing >tbody').html('');
        $('#main_div_of_backlog_info_kanban_view_table_closed >tbody').html('');
        try {
            var obj = res.tbl[0].r;
            var c4new = 0;
            var c4ongoing = 0;
            var c4closed = 0;
            for (var n = 0; n < obj.length; n++) {
                var html = this.genUSLine4KanbanView(obj[n]);
                if (obj[n].backlogStatus === 'new') {
                    c4new++;
                    $('#main_div_of_backlog_info_kanban_view_table_new >tbody').append(html);
                } else if (obj[n].backlogStatus === 'ongoing') {
                    c4ongoing++;
                    $('#main_div_of_backlog_info_kanban_view_table_ongoing >tbody').append(html);
                } else if (obj[n].backlogStatus === 'closed') {
                    c4closed++;
                    $('#main_div_of_backlog_info_kanban_view_table_closed >tbody').append(html);
                }
                $('#kanban_view_new_count').html(c4new);
                $('#kanban_view_ongoing_count').html(c4ongoing);
                $('#kanban_view_closed_count').html(c4closed);
            }
        } catch (e) {
        }

    },
    getUSLineCBPart: function (o) {
        var st = '';
        return st;
    },
    genUSLine1: function (o) {
//        var isSelected = o.id === global_var.current_backlog_id ? "setUSLists" : "";
//        var isSourced = o.isSourced === '1' ?
//                "<i class=\"fa fa-cube\" style=\"color: darkred;\">&nbsp;</i>"
//                : o.fkSourcedId.length > 0
//                ? '<i class=\"fa fa-bandcamp\" style=\"color: darkred;\">&nbsp;</i>'
//                : "";
//        console.log('issourced = ' + o.isSourced);
//        var st = '';
//        st += '<div class="col-sm-1 us-list">';
//        st += '<div class="row">';
//        st += '<div class="col-6 us-list-number  ">';
//        st += '<input class="us-checkbox-list" id="' + o.id + '" type="checkbox"><br>';
//        st += '</div>';
//        st += '<div class="col-12 us-list-number  "><br><br><br>';
//        st += o.orderNo;
//        st += '</div>';
//        st += '</div>';
//        st += '</div>';
//        st += '<div class="col-sm-10 us-list pointer ' + isSelected + '">';
//        st += '<div class="us-list-item">';
//        st += '<span class="isSourced">';
//        st += o.isSourced === isSourced;
//        st += '</span>';
//        st += '<a href="#" class="us-list-item" onclick="new UserStory().getStoryInfo(\'' + o.id + '\',this)">';
//        st += o.backlogName;
//        st += '</a>';
//        st += '</div>';
//        st += '<div class="row"><br><br></div>';
//        st += '<span class="backlog-status">';
//        st += '<div class="us-list-item   us-item-status-' + o.backlogStatus + '">' + o.backlogStatus + '</div>';
//        st += '</span>'
//        st += '<div class="us-list-item us-priority">' + o.priority + '</div>';
//        st += '<div class="us-list-item   us-item-executor">' + o.createdByName + '</div>';
//        st += '<div class="us-list-item   us-item-date">' + Utility.convertDate(o.createdDate) + '</div>';
//        st += '</div>';
//        st += '<div class="col-sm-1 us-list pointer us-4-select">';
//        st += ' <div class="dropdown">';
//        st += '<button class="btn btn-primary dropdown-toggle us-prop-btn" type="button" data-toggle="dropdown"><span class="caret"></span></button>';
//        st += ' <ul class="dropdown-menu" style="line-height: 1.2em">';
//        st += '  <li><a href="#" class="us-edit" data-target="#updateBacklog" data-toggle="modal" onclick="new UserStory().select(\'' + o.id + '\')"><i class="fa fa-edit"></i>&nbsp;<span>Edit</span></a></li>';
//        st += '  <li><a href="#" class="us-edit" onclick="new UserStory().delete(\'' + o.id + '\')"><i class="fa fa-trash"></i>&nbsp;<span>Delete</span></a></li>';
//        st += o.isSourced !== '1'
//                ? '  <li><a href="#" class="us-edit" data-target="#assignSUS" data-toggle="modal" onclick="new UserStory().assignSUSModal(\'' + o.id + '\')"><i class="fa fa-edit"></i>&nbsp;<span>Associate with SUS</span></a></li>'
//                : "";
//        st += ' </ul>';
//
//        st += ' </div>';
//        st += '</div>'
//
//        return st;
    },
    genUSLine_old: function (o) {
        var isSelected = o.id === global_var.current_backlog_id ? "setUSLists" : "";
        var pointer_is_selected = o.id === global_var.current_backlog_id ? "us-selected" : "";
        var isSourced = o.isSourced === '1'
                ? "<i class=\"fa fa-cube\" style=\"color: darkred;\">&nbsp;</i>"
                : o.fkSourcedId.length > 0
                ? '<i class=\"fa fa-bandcamp\" style=\"color: green;\" title="' + replaceTags(o.sourcedName) + '">&nbsp;</i>'
                : "";
        var countLine = o.isSourced === '1' && o.taskCount > 0
                ? '&nbsp; <i class="fa fa-tasks" style="font-size:10px;color:#555555;" \n\
        title="Number of Tasks"></i><span style="font-size:10px; "> (' + o.taskCount + ')</span>'
                : " ";
        countLine += o.isSourced === '1' && o.inputCount > 0
                ? '&nbsp;  <i class="fa fa-inbox" style="font-size:10px;color:#555555;" \n\
        title="Number of Inputs"></i><span style="font-size:10px; "> (' + o.inputCount + ')</span>'
                : "";
        countLine += o.commentCount > 0
                ? '&nbsp;  <i class="fa fa-comment" style="font-size:10px;color:#555555;" \n\
        title="Number of Comments"></i><span style="font-size:10px; "> (' + o.commentCount + ')</span>'
                : "";
        countLine += o.bugCount > 0
                ? '&nbsp;  <i class="fa fa-bug" style="font-size:10px;color:#555555;" \n\
        title="Number of Bugs"></i><span style="font-size:10px; "> (' + o.bugCount + ')</span>'
                : "";
        countLine += o.updateCount > 0
                ? '&nbsp;  <i class="fa fa-edit" style="font-size:10px;color:#555555;" \n\
        title="Number of Updates"></i><span style="font-size:10px; "> (' + o.updateCount + ')</span>'
                : "";
        var isFromCustomer = o.isFromCustomer === '1' ? ""
//                ? "<i class=\"fa fa-ticket\" style=\"color: blue;\">&nbsp;</i>"
                : "";
        var tr = $('<tr sid="' + o.id + '" orderNo="' + o.orderNo + '"></tr>');
        tr.append($('<td class="us-td-list"></td>')
                .append('<input class="us-checkbox-list" id="' + o.id + '" type="checkbox">'));
        var mdate = (o.modificationDate) ? "/" + Utility.convertDate(o.modificationDate) : "";
        var td2 = '<span class="isSourced">';
        td2 += isSourced;
        td2 += '</span>';
        td2 += '<span class="isFromCustomer">';
        td2 += isFromCustomer;
        td2 += '</span>';
        td2 += '<a href="#" style="padding-bottom:12px;" class="us-list-item" \n\
onclick="new UserStory().getStoryInfo(\'' + o.id + '\',this)">';
        td2 += '#' + o.orderNo + ': ' + replaceTags(o.backlogName);
        td2 += o.jiraKey.length > 0 ? " (" + o.jiraKey + ")" : "";
        td2 += '</a>';
        td2 += '<br>';
        td2 += '<span class="backlog-status">';
        td2 += '<div class="us-list-item   us-item-status-' + o.backlogStatus + '">' + o.backlogStatus + '</div>';
        td2 += '</span>'
        td2 += '<span class="us-list-item us-priority">&nbsp; ' + o.priority + ' </span>';
        td2 += '<span class="us-list-item   us-item-executor">&nbsp;' + o.createdByName + ' </span>';
        td2 += '<span class="us-list-item   us-item-date">&nbsp;' + Utility.convertDate(o.createdDate) + mdate + ' </span>';
        td2 += '<span class="us-list-item   us-item-date">&nbsp&nbsp&nbsp;' + (o.estimatedHours) + "/" + o.spentHours + ' </span>';
//        td2 += countLine;
        tr.append($('<td class="us-td-list pointer ' + isSelected + " " + pointer_is_selected + '"></td>').html(td2));
        var td3 = ' <div class="dropdown">';
        td3 += '<button class="btn btn-primary dropdown-toggle us-prop-btn" type="button" data-toggle="dropdown"><span class="caret"></span></button>';
        td3 += ' <ul class="dropdown-menu" style="line-height: 1.6em">';
        td3 += '  <li><a href="#" class="us-edit" style="padding: 10px 5px;" data-target="#updateBacklog" data-toggle="modal" onclick="new UserStory().select(\'' + o.id + '\')"><i class="fa fa-edit1"></i>&nbsp;<span>Edit</span></a></li>';
        td3 += '  <li><a href="#" class="us-edit" style="padding: 10px 5px;" onclick="new UserStory().delete(\'' + o.id + '\')"><i class="fa fa-trash1"></i>&nbsp;<span>Delete</span></a></li>';
        td3 += o.isSourced !== '1' && o.isFromCustomer !== '1'
                ? '  <li><a href="#" class="us-edit" style="padding: 10px 5px;"\n\
         data-target="#bindToSUSModal" data-toggle="modal" onclick="new UserStory().bindToSUSModal(\'' + o.id + '\')"><i class="fa fa-bandcamp1"></i>&nbsp;<span>Bind to Sourced US</span></a></li>'
                : "";
        td3 += o.isSourced == '1'
                ? '  <li><a href="#" class="us-edit" style="padding: 10px 5px;" \n\
        data-target="#addDependency" data-toggle="modal" onclick="new UserStory().addDependencyModal(\'' + o.id + '\')"><i class="fa fa-connectdevelop1"></i>&nbsp;<span>Add Dependency</span></a></li>'
                : "";
        td3 += o.isSourced == '1'
                ? '  <li><a href="#" class="us-edit" style="padding: 10px 5px;" \n\
            onclick="new UserStory().addEpicToJira(\'' + o.id + '\')"><i class="fa fa-external-link1"></i>&nbsp;<span>Add Epic to JIRA</span></a></li>'
                : "";
        td3 += o.isFromCustomer === '1'
                ? '  <li><a href="#" class="us-edit" style="padding: 10px 5px;"\n\
         data-target="#notifyTicketAsBugModal" data-toggle="modal" onclick="new UserStory().notifyTicketAsBugModal(\'' + o.id + '\')"><i class="fa fa-bug1"></i>&nbsp;<span>Notify as Bug</span></a></li>'
                : "";
        td3 += o.isFromCustomer === '1'
                ? '  <li><a href="#" class="us-edit" style="padding: 10px 5px;" \n\
         data-target="#bindTicketToSUSModal" data-toggle="modal" onclick="new UserStory().bindTicketToSUSModal(\'' + o.id + '\')"><i class="fa fa-bandcamp1"></i>&nbsp;<span>Bind Ticket to SUS</span></a></li>'
                : "";
        td3 += ' </ul>';
        td3 += ' </div>';
        tr.append($('<td class="us-td-list"></td>').html(td3));
        return tr;
    },

    genUSLine: function (o) {
        var isSelected = o.id === global_var.current_backlog_id ? "setUSLists" : "";
        var pointer_is_selected = o.id === global_var.current_backlog_id ? "us-selected" : "";

        var tr = $('<tr onclick="new UserStory().getStoryInfo(\'' + o.id + '\',this)" \n\
                    sid="' + o.id + '" orderNo="' + o.orderNo + '"></tr>');
        tr.append($('<td class="us-td-list us-td-list-checkbox"></td>')
                .append('<input class="us-checkbox-list us-checkbox" id="' + o.id + '" type="checkbox">'));



        var td2 = '<a href="#"  class="us-list-item us-list-item-ozel"  onclick="new UserStory().getStoryInfo(\'' + o.id + '\',this)">';
        td2 += replaceTags(o.backlogName);
        td2 += o.jiraKey.length > 0 ? " (" + o.jiraKey + ")" : "";
        td2 += '</a>';

        td2 += '<span class="backlog-status">';
//        td2 += '<div class="us-list-item   us-item-status-' + o.backlogStatus + '">' + o.backlogStatus + '</div>';
        td2 += '</span>'

        tr.append($('<td style="padding:13px 20px;" class="us-td-list pointer us-td-list-ozel ' + isSelected + " " + pointer_is_selected + '"></td>').html(td2));


        return tr;
    },
    insertNewBacklogShort: function (el) {
        var val = $(el).val();
        if (!val) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv['backlogName'] = val;
        json.kv['fkProjectId'] = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklogShort",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SACore.addBacklogByRes(res);
                global_var.current_backlog_id = res.kv.id;
                Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
                that.insertBacklog_AddTaskType(res.kv.id);
                that.closeModal();
                that.clearField();
                that.load();
                new Sprint().load();
                new Label().load();
                $('#backlogName').focus();
//                that.refreshCurrentBacklogById(res.kv.id);
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });

    },
    addEpicToJira: function (backlogId) {
        if (!backlogId) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmCreateEpic",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                Toaster.showError(res.kv.msg);
            }
        });
    },
    genUSLine4KanbanView: function (o) {
        var isSourced = o.isSourced === '1'
                ? "<i class=\"fa fa-cube\" style=\"color: darkred;\">&nbsp;</i>"
                : o.fkSourcedId.length > 0
                ? '<i class=\"fa fa-bandcamp\" style=\"color: green;\" title="' + replaceTags(o.sourcedName) + '">&nbsp;</i>'
                : "";
        var isFromCustomer = o.isFromCustomer === '1'
                ? "<i class=\"fa fa-ticket\" style=\"color: blue;\">&nbsp;</i>"
                : "";
        var countLine = o.isSourced === '1' && o.taskCount > 0
                ? '&nbsp; <i class="fa fa-tasks" style="font-size:10px;color:blue;" \n\
        title="Number of Tasks"></i><span style="font-size:10px; "> (' + o.taskCount + ')</span>'
                : " ";
        countLine += o.isSourced === '1' && o.inputCount > 0
                ? '&nbsp;  <i class="fa fa-inbox" style="font-size:10px;color:blue;" \n\
        title="Number of Inputs"></i><span style="font-size:10px; "> (' + o.inputCount + ')</span>'
                : "";
        countLine += o.commentCount > 0
                ? '&nbsp;  <i class="fa fa-comment" style="font-size:10px;color:blue;" \n\
        title="Number of Comments"></i><span style="font-size:10px; "> (' + o.commentCount + ')</span>'
                : "";
        countLine += o.bugCount > 0
                ? '&nbsp;  <i class="fa fa-bug" style="font-size:10px;color:red;" \n\
        title="Number of Bugs"></i><span style="font-size:10px; "> (' + o.bugCount + ')</span>'
                : "";
        countLine += o.updateCount > 0
                ? '&nbsp;  <i class="fa fa-edit" style="font-size:10px;color:blue;" \n\
        title="Number of Udaptes"></i><span style="font-size:10px; "> (' + o.updateCount + ')</span>'
                : "";
        var mdate = (o.modificationDate) ? "/" + Utility.convertDate(o.modificationDate) : "";
//        console.log('task count='+o.taskCount)

        var tr = $('<tr></tr>');
        var td2 = "";
        td2 += "#" + o.orderNo + ": ";
        td2 += '<span class="isSourced">';
        td2 += isSourced;
        td2 += '</span>';
        td2 += '<span class="isFromCustomer">';
        td2 += isFromCustomer;
        td2 += '</span>';
        td2 += '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' + o.id + '\')"  style="padding-bottom:12px;" class="us-list-item">';
        td2 += replaceTags(o.backlogName);
        td2 += '</a>';
        td2 += '<br>';
        td2 += '<span class="backlog-status">';
        td2 += '<div class="us-list-item   us-item-status-' + o.backlogStatus + '">' + o.backlogStatus + '</div>';
        td2 += '</span>'
        td2 += '<span class="us-list-item us-priority">&nbsp; ' + o.priority + ' </span>';
        td2 += '<span class="us-list-item   us-item-executor">&nbsp;' + o.createdByName + ' </span>';
        td2 += '<span class="us-list-item   us-item-date">&nbsp;' + Utility.convertDate(o.createdDate) + mdate + ' </span>';
        td2 += '<span class="us-list-item   us-item-date">&nbsp;&nbsp;&nbsp;<b>' + (o.estimatedHours) + "/" + o.spentHours + ' </b></span>';
        td2 += '&nbsp;<i href="#" class="fa fa-info-circle" data-toggle="modal" data-target="#backlogTaskInfoModal" title="User Story Task Info" \n\
                style="cursor:pointer;color:orange;" onclick="new UserStory().backlogTaskInfoModal(\'' + o.id + '\')"></i>'
                ;
        td2 += countLine;
        tr.append($('<td class="us-td-list-kanban-' + o.backlogStatus + ' pointer"></td>').html(td2));
        return tr;
    },
    backlogTaskInfoModal: function (backlogId) {
        if (!backlogId) {
            return;
        }

        $('#backlogTaskInfoModal_result').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = backlogId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskListByBacklogId",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.backlogTaskInfoModalDetails(res);
            }
        });
    },
    backlogTaskInfoModalDetails: function (res) {
        if (!res.tbl[0].r) {
            return;
        }
        $('#backlogTaskInfoModal_result').html('');
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>').addClass("row"));
        for (var i = 0; i < obj.length; i++) {
            var imgAssigneeLink = obj[i].assigneeImageUrl.length === 0
                    ? fileUrl(new User().getDefaultUserprofileName())
                    : fileUrl(obj[i].assigneeImageUrl);
            var span = $('<span></span>')
                    .append($('<img></img>')
                            .attr('src', imgAssigneeLink)
                            .attr('style', 'padding:5px;max-width:28px;max-height:34px;border-radius:50%;'))
                    .append(obj[i].assigneeName)
                    .append(" ")
                    .append("(" + obj[i].taskTypeName + ")")
                    .append("-")
                    .append('<b>' + obj[i].estimatedHours + '</b>')
                    .append('/')
                    .append('<b>' + obj[i].completedDuration + '</b>');
            div.append(span).append("<br>");
        }
        $('#backlogTaskInfoModal_result').append(div);
    },
    setPreviousUserstory: function () {
        //set previous backlog
        $('#smb-general-main-previous-us')
                .attr('onclick', "new UserStory().redirectUserStoryCore('" + global_var.previous_backlog_id + "')")
                .html(this.minimizeBacklogName(global_var.previous_backlog_name));
    },
    setPreviousUserstoryValues: function () {
        global_var.previous_backlog_name = global_var.current_backlog_name;
        global_var.previous_backlog_id = global_var.current_backlog_id;
    },
    redirectToDetailedView: function (id) {
//        this.setPreviousUserstory();

        this.setPreviousUserstoryValues();

        global_var.mainview = 'body';
        global_var.current_view = 'detailed';
        global_var.current_backlog_id = id;
        Utility.addParamToUrl("current_view", global_var.current_view);
        Utility.addParamToUrl("current_backlog_id", global_var.current_backlog_id);
        Utility.addParamToUrl("mainview", global_var.mainview);
//        new UserStory().clearAndShowAll(this)

        this.setDetailedView($('#view_button_detailed'));

        this.redirectUserStoryCore(id);
    },

    redirectToDetailedViewGeneral: function (id) {
//        this.setPreviousUserstory();

        this.setPreviousUserstoryValues();

        global_var.mainview = 'body';
        global_var.current_view = 'detailed';
        global_var.current_backlog_id = id;
        Utility.addParamToUrl("current_view", global_var.current_view);
        Utility.addParamToUrl("current_backlog_id", global_var.current_backlog_id);
        Utility.addParamToUrl("mainview", global_var.mainview);
//        new UserStory().clearAndShowAll(this)

        this.load();
    },
    redirectUserStory: function (backlogId) {
        if ($('#' + backlogId).val()) {
//            console.log('id=' + $('#us-gui-component-rel-sus-id').val())
            this.redirectUserStoryCore($('#' + backlogId).val());
        }
    },
    redirectUserStoryCore: function (backlogId) {
        if (backlogId.length === 0) {
            return;
        }

        $('#container-us-body').find('tr[sid=' + backlogId + ']')
                .first().find('a').first().focus().click();
    },
    redirectToDetailedView4ActivityDiagram: function (id) {
        this.redirectToDetailedView(id);
        this.showUserStoryPanel();
    },
    showUserStoryPanel: function () {
        $('.main_body_class').show();
        ActivityDiagram.hidePanel();
        Analytics.hide();
    },
    notifyTicketAsBug: function () {
        if (!$('#notifyTicketAsBug_id').val()) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#notifyTicketAsBug_id').val();
        json.kv.fkSourcedId = $('#notifyTicketAsBug_suslist').val();
        json.kv.fkBacklogTaskId = $('#notifyTicketAsBug_tasktypes').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmNotifyTicketAsBug",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.changeStatusIconOfUserStoryByStoryId($('#notifyTicketAsBug_id').val(), res.kv.backlogStatus);
//                that.clickOnThe1stUserStory();
                $('#notifyTicketAsBugModal').modal('hide');
                if ($('#notifyTicketAsBug_suslist').val()) {
                    that.addBindedIconToUserStoryById(
                            $('#notifyTicketAsBug_id').val(), res.kv.isSourced, true);
                }
                that.refreshCurrentBacklog();
                that.updateStatusOfBacklogBySourcedId($('#notifyTicketAsBug_suslist').val());
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateStatusOfBacklogBySourcedId: function (id) {
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBoundedUserStories",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                var ids = res.kv.ids.split('|');
                var status = res.kv.status;
                for (var i = 0; i < ids.length; i++) {
                    $('#container-us-body').find('tr[sid=' + ids[i] + ']')
                            .first().find('.backlog-status').first()
                            .html('<div class="us-list-item   us-item-status-' + status + '">' + status + '</div>');
                }
                $('#container-us-body').find('tr[sid=' + id + ']')
                        .first().find('.backlog-status').first()
                        .html('<div class="us-list-item   us-item-status-' + status + '">' + status + '</div>');
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    bindToSUS: function () {
        if (!$('#bindToSUSModal_id').val()) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#bindToSUSModal_id').val();
        json.kv.fkSourcedId = $('#bindToSUSModal_suslist').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateBacklogBySourced",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.changeStatusIconOfUserStoryByStoryId($('#bindToSUSModal_id').val(), res.kv.backlogStatus);
                that.clickOnThe1stUserStory();
                $('#bindToSUSModal').modal('hide');
                if ($('#bindToSUSModal_suslist').val()) {
                    that.addBindedIconToUserStoryById(
                            $('#bindToSUSModal_id').val(), res.kv.isSourced, true);
                } else {
                    that.addBindedIconToUserStoryById(
                            $('#bindToSUSModal_id').val(), res.kv.isSourced, false);
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    notifyTicketAsBugModal: function (id) {
        $('#notifyTicketAsBug_id').val(id);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogListWithTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.notifyTicketAsBugModalDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    notifyTicketAsBugModalDetails: function (res) {
        $('#notifyTicketAsBug_suslist').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#notifyTicketAsBug_suslist').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName));
        }
        $('#notifyTicketAsBug_suslist').first().change();
    },
    addDependency: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = $('#sourcedUSList4Dependency_id').val();
        json.kv.fkParentBacklogId = $('#sourcedUSList4Dependency').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewBacklogDependency",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                if (res.kv.error) {
                    Toaster.showError(res.kv.error)
                    return;
                }
                SADependency.LoadDependency(res);
                that.loadBacklogDependency($('#sourcedUSList4Dependency_id').val());
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadBacklogDependency: function (id) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.fkBacklogId = id;
        json.kv.asc = "parentBacklogName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogDependencyList4Gui",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadBacklogDependencyDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadBacklogDependencyDetails: function (res) {
        $('#sourcedUSList4DependencyList > tbody').html("");
        var st = "";
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                var del = '<a href="#" onclick="new UserStory().deleteDependency(\'' + obj[n].fkBacklogId + '\',\''
                        + obj[n].id + '\')"><i class="fa fa-trash" "></i></a>';
                st += '<tr>';
                st += '<td>' + replaceTags(obj[n].parentBacklogName) + '</td>';
                st += '<td>' + del + '</td>';
                st += '</tr>';
            }
        } catch (err) {
        }

        st += '<tr>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>'
        $('#sourcedUSList4DependencyList > tbody').html(st);
    },
    deleteDependency: function (backlogId, id) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteBacklogDependency",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SADependency.LoadDependency(res);
                that.loadBacklogDependency(backlogId);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addDependencyModal: function (id) {
        this.loadBacklogDependency(id);
        this.loadDependencyModalInfo(id);
    },
    loadDependencyModalInfo: function (id) {
        $('#sourcedUSList4Dependency').html('');
        $('#sourcedUSList4Dependency_id').val(id);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.addDependencyModalDetails(res, id);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    bindTicketToSUSModal: function (id) {
        $('#bindTicketToSUSModal_id').val(id);
        this.bindTicketToSUSModalAssignee();
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.bindTicketToSUSModalDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addDependencyModalDetails: function (res, currentUserStoryId) {
        $('#sourcedUSList4Dependency').html("");
        var obj = res.tbl[0].r;
        $('#sourcedUSList4Dependency').append($("<option></option>").attr("value", ''));
        for (var n = 0; n < obj.length; n++) {
            if (obj[n].id === currentUserStoryId) {
                continue;
            }
            $('#sourcedUSList4Dependency').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName));
        }
    },
    loadSUS4RelationDetails: function (res) {
        $('#us-related-sus').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            if (global_var.current_backlog_id === obj[n].id) {
                continue;
            }
            $('#us-related-sus').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].backlogName) + "  #" + obj[n].orderNo));
        }
    },
    loadSUS4Relation4SectionDetails: function (res) {
        $('#us-gui-component-rel-sus-id-section').html("");
        $('#us-gui-component-rel-sus-id-section').append($("<option></option>")
                .attr("value", "")
                .text(""));
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
//                if (global_var.current_backlog_id === obj[n].id) {
//                    continue;
//                }
                $('#us-gui-component-rel-sus-id-section').append($("<option></option>")
                        .attr("value", obj[n].id)
                        .text(obj[n].backlogName + "  #" + obj[n].orderNo));
            }
        } catch (e) {
        }
    },
//    bindTicketToSUSModal: function (id) {
//        $('#bindTicketToSUSModal_id').val(id);
//        this.bindTicketToSUSModalAssignee();
//        var json = {kv: {}};        try {            json.kv.cookie = getToken();        } catch (err) {        }
//        json.kv.fkProjectId = global_var.current_project_id;
//        var that = this;
//        var data = JSON.stringify(json);
//        $.ajax({
//            url: urlGl+"api/post/srv/serviceTmGetSourcedBacklogList",
//            type: "POST",
//            data: data,
//            contentType: "application/json",
//            crossDomain: true,
//            async: false,
//            success: function (res) {
//                that.bindTicketToSUSModalDetails(res);
//            },
//            error: function () {
//                Toaster.showError(('somethingww'));
//            }
//        });
//    },
    bindTicketToSUSModalAssignee: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'userName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.genUsFilterAssigneeByBindTicketToSUSModal(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    genUsFilterAssigneeByBindTicketToSUSModal: function (res) {
        $('#bindTicketToSUSModal_assignee').html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="us_ticket_bind_assignee"  id="'
                    + obj[n].fkUserId + '" value="' + obj[n].fkUserId + '">' + replaceTags(obj[n].userName) + '</input>'
            st += '</td>'

        }
        st += '</table>';
        $('#bindTicketToSUSModal_assignee').html(st);
    },
    bindTicketToSUSModalDetails: function (res) {
        $('#bindTicketToSUSModal_suslist').html("");
        var obj = res.tbl[0].r;
        $('#bindTicketToSUSModal_suslist').append($("<option></option>").attr("value", ''));
        for (var n = 0; n < obj.length; n++) {
            $('#bindTicketToSUSModal_suslist').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].backlogName)));
        }
    },
    bindToSUSModal: function (id) {
        $('#bindToSUSModal_id').val(id);
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {

                that.bindToSUSModalDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    bindToSUSModalDetails: function (res) {
        $('#bindToSUSModal_suslist').html("");
        var obj = res.tbl[0].r;
        $('#bindToSUSModal_suslist').append($("<option></option>").attr("value", ''));
        for (var n = 0; n < obj.length; n++) {
            $('#bindToSUSModal_suslist').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].backlogName)));
        }
    },
    minimizeBacklogName: function (arg) {
        if (arg.trim().length > global_var.default_backlog_length) {
            arg = arg.substring(0, global_var.default_backlog_length) + '...';
        }
        return arg;
    },
    getStoryInfo: function (id, e) {
        if (!id) {
            return;
        }
        this.setPreviousUserstoryValues();
        $('.us-selected').each(function () {
            $(this).removeClass('us-selected');
            $(this).css("background-color", "");
        });
        $(e).closest('tr').first().addClass('us-selected');
        $(e).closest('tr').first().css('background-color', '#92aeda');

        global_var.current_backlog_id = id;
        global_var.current_backlog_name = $(e).html();
        Utility.addParamToUrl('current_backlog_id', global_var.current_backlog_id);
        Utility.addParamToUrl('current_backlog_name', global_var.current_backlog_name);
        if (global_var.current_view === 'detailed') {
            this.setPreviousUserstory();
            $('#container-us-body').find('.pointer').removeClass('us-selected');


            var orderNo = "";
            $('#smb-general-main-info').html(this.minimizeBacklogName(global_var.current_backlog_name));
//            var st = this.getStoryInfoDetail4BacklogList(id, e);
            $('#comment_line').html('');
            this.toggleSubmenu($('#us-submenu' + global_var.current_us_submenu), global_var.current_us_submenu);
        }

        $('.us-task-enable').attr("style", "pointer-events:none;color:gray;")
        global_var.current_us_task_id = '';
        Utility.addParamToUrl('current_us_task_id', global_var.current_us_task_id);
        $('#gui_component_main_view').focus();

    },
    getStoryInfoDetail4BacklogList: function (id, e) {

        var st = "";
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetStoryInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                st = that.genUSLine(res.tbl[0].r[0]);
                $(e).closest('tr').first().html(st.html());
            }
        });
        return st;
    },
    getStoryInfoDetail: function (id) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetStoryInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                console.log(JSON.stringify(res));
                that.setStoryGeneralInfo(res.tbl[0].r[0]);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setStoryGeneralInfo: function (o) {
        $('#smb-general-main-info').html('');
        var div = $('<div></div>').addClass("col-12");
        div.append($('<div></div>').addClass("col-12").html("<h4>#" + o.orderNo + ": " + replaceTags(o.backlogName) + "</h4>"));
        div.append($('<div></div>').addClass("col-12").html("<span>Creadted by " +
                o.createdByName + " on " + Utility.convertDate(o.createdDate) + "</span>"));
        div.append($('<div></div>').addClass("col-12").html("<hr>"));
//        div.append($('<div></div>').addClass("col-4").html("<span><b>Project</b>: None </span>"));
//        div.append($('<div></div>').addClass("col-4").html("<span><b>Status</b>: </span><span class=\"us-item-status-" + o.backlogStatus + "\"> " + o.backlogStatus + "</span>"));
//        div.append($('<div></div>').addClass("col-4").html("<span><b>Priority</b>: </span><span class='us-priority'> " + o.priority + "</span>"));
//        div.append($('<div></div>').addClass("col-4").html("<span><b>Estimated hour(s)</b>: none </span>"));
//        div.append($('<div></div>').addClass("col-4").html("<span><b>Hour(s) Spent</b>: none </span>"));
//        div.append($('<div></div>').addClass("col-12").html("<span><b>Because</b>: " + o.backlogBecause + "</span>"));
//        div.append($('<div></div>').addClass("col-12").html("<span><b>Description</b>: " + o.description + "</span>"));
//        div.append($('<div></div>').addClass("col-12").html("<hr>"));
        $('#smb-general-main-info').append(div.html());
    },
    setCommentBody: function () {

    },
    delete: function (id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }
        var json = {
            kv: {}};
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteBacklog",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                console.log(JSON.stringify(res));
                SACore.deleteBacklog(id);
                that.load();
                new Label().load();
                new Sprint().load();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    getBacklogCoreInfoById: function (id) {
        if (!id) {
            return;
        }
        var json = {
            kv: {}};
        json.kv.id = id;
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        var rs;
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmGetBacklogCoreInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                rs = res;
            }
        });
        return rs;
    },
    select: function (id) {
        if (!id) {
            return;
        }
        var json = {
            kv: {}};
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.fillForm(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    fillForm: function (res) {
        var obj = res.tbl[0].r[0];
        $('#u_backlogId').val(obj.id);
        $('#u_backlogName').val(obj.backlogName);
        $('#u_backlogBecause').val(obj.backlogBecause);
        $('#u_backlogPriority').val(obj.priority);
        $('#u_backlogDescription').val(obj.description);
        $('#u_backlogJiraIssueKey').val(obj.jiraKey);
        this.assignSprint4UpdateBacklogRadioButtonModal('updateBacklog_sprintlist', obj.fkSprintId);
        this.assignLabel4UpdateBacklogModal('updateBacklog_labellist', obj.fkLabelId);
    },
    assignLabel4UpdateBacklogModal: function (id, checkedListRes) {
        $('#' + id).html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetLabelList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    that.assignLabel4UpdateBacklogModalDetails(res, id, checkedListRes);
                } catch (e) {
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    assignLabel4UpdateBacklogModalDetails: function (res, id, checkedListRes) {
        var vid = ''
        if (id) {
            vid = id;
        }
        $('#' + vid).html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="assignLabelModal_labelcheckbox"  id="' + obj[n].id + '"';
            st += ' value="' + obj[n].id + '"';
            st += checkedListRes.includes(obj[n].id, 0) ? ' checked="checked" ' : "";
            st += '>&nbsp';
            st += '<span style="font-size:13px;color:' + obj[n].color + "\">" + replaceTags(obj[n].name) + '</span>'
            st += '</td>'

        }
        st += '</table>';
        $('#' + vid).html(st);
    },
    assignSprint4UpdateBacklogRadioButtonModal: function (id, checkedListRes) {
        $('#' + id).html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSprintList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    that.assignSprint4UpdateBacklogRadioButtonModalDetails(res, id, checkedListRes);
                } catch (e) {
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    assignSprint4UpdateBacklogRadioButtonModalDetails: function (res, id, checkedListRes) {
        var vid = ''
        if (id) {
            vid = id;
        }
        $('#' + vid).html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }

            var d = ((obj[n].sprintStartDate) && (obj[n].sprintEndDate))
                    ? " (<i>" + Utility.convertDate(obj[n].sprintStartDate) + "-" + Utility.convertDate(obj[n].sprintEndDate) + "</i>)"
                    : "";
            st += '<td>'
            st += ' <input type="radio" name="sprintRadioUpdate" class="assignSprintModal_sprintcheckbox"  id="' + obj[n].id + '"';
            st += ' value="' + obj[n].id + '"';
            st += checkedListRes.includes(obj[n].id, 0) ? ' checked="checked" ' : "";
            st += '>&nbsp';
            st += '<span style="font-size:13px;color:' + obj[n].sprintColor + "\">" + replaceTags(obj[n].sprintName) + d + '</span>'
            st += '</td>'

        }
        st += '</table>';
        $('#' + vid).html(st);
    },
    assignSprint4UpdateBacklogModal: function (id, checkedListRes) {
        $('#' + id).html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSprintList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    that.assignSprint4UpdateBacklogModalDetails(res, id, checkedListRes);
                } catch (e) {
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    assignSprint4UpdateBacklogModalDetails: function (res, id, checkedListRes) {
        var vid = ''
        if (id) {
            vid = id;
        }
        $('#' + vid).html("");
        var obj = res.tbl[0].r;
        var st = "";
        st += "<table style=\"width:100%\">"
        for (var n = 0; n < obj.length; n++) {
            if (n % 3 === 0) {
                st += '</tr><tr>'
            }
            st += '<td>'
            st += ' <input type="checkbox" class="assignSprintModal_sprintcheckbox"  id="' + obj[n].id + '"';
            st += ' value="' + obj[n].id + '"';
            st += checkedListRes.includes(obj[n].id, 0) ? ' checked="checked" ' : "";
            st += '>&nbsp';
            st += '<span style="color:' + obj[n].sprintColor + "\">" + replaceTags(obj[n].sprintName) + '</span>'
            st += '</td>'

        }
        st += '</table>';
        $('#' + vid).html(st);
    },
    updateInfo: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = this.getId();
        json.kv.fkBacklogId = this.getId();
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.backlogName = this.getStory();
        json.kv.backlogBecause = this.getBecause();
        json.kv.priority = this.getPriority();
        json.kv.description = this.getDescription();
        json.kv.fkLabelId = this.getLabelList4AssignLabeltoUserStoryByDiv('updateBacklog_labellist');
        json.kv.fkSprintId = this.getSprintList4AssignSprinttoUserStoryByDiv('updateBacklog_sprintlist');
        json.kv.jiraIssueKey = $('#u_backlogJiraIssueKey').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateBacklog",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SACore.updateBacklogByRes(res);
//                Toaster.showError("successfull");
                new Notification("").clearField('updateBacklog');
                closeModal('updateBacklog');
                new Label().load();
                new Sprint().load();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    update: function () {
//        this.setId(id);
        this.addValue4Update();
        this.addController4Update();
        this.updateInfo();
        this.load();
    },
    addValue4Update: function () {
        this.setStory($('#u_backlogName').val());
        this.setId($('#u_backlogId').val());
        this.setBacause($('#u_backlogBecause').val());
        this.setDescription($('#u_backlogDescription').val());
        this.setPriority($('#u_backlogPriority').val());
    },
    addController4Update: function () {
        var f = false;
        if (this.getStory().trim().length == 0) {
            new Notification("Story is not entered!").showInComponent('u_backlogName');
            throw "Story is not entered!";
            f = true;
        }

        if (f) {
            throw "Date info is not entered!";
        }
    },
    addComment: function () {
        this.addController4Comment();
        if ($('#file1').val().trim().length > 0) {
            this.sendFileForComment();
        } else {
            this.addCommentInput('');
            this.fillCommentList();
        }
    },
    addFileForNewTicket: function () {
//        var files = evt.target.files; // FileList object
        var files = document.getElementById('insertNewTicketModal_file').files;
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
        }

        document.getElementById('insertNewTicketModal_list').innerHTML = '<ul>' + output.join('') + '</ul>';
    },
    addFileForComment: function () {
//        var files = evt.target.files; // FileList object
        var files = document.getElementById('file1').files;
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
        }

        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    },
    addFileForAddTaskType: function () {
//        var files = evt.target.files; // FileList object
        var files = document.getElementById('file4AddTaskType').files;
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
//            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                    f.size, ' bytes',
//                    '</li>');
            output.push('<li>', f.name, '</li>');
        }

        document.getElementById('AddTaskType_filelist').innerHTML = '<ul>' + output.join('') + '</ul>';
    },
    addFileForStoryCard: function () {
//        var files = evt.target.files; // FileList object
        var files = document.getElementById('setStoryCardUploadImageModal_file').files;
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
//            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                    f.size, ' bytes',
//                    '</li>');
            output.push('<li>', f.name, '</li>');
        }

        document.getElementById('setStoryCardUploadImageModal_filelist').innerHTML = '<ul>' + output.join('') + '</ul>';
    },
    addFileForAddBacklog: function () {
//        var files = evt.target.files; // FileList object
        var files = document.getElementById('file4AddBacklog').files;
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
//            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                    f.size, ' bytes',
//                    '</li>');
            output.push('<li>', f.name, '</li>');
        }

        document.getElementById('addBacklog_filelist').innerHTML = '<ul>' + output.join('') + '</ul>';
    },
    addFileForTaskComment: function () {
//        var files = evt.target.files; // FileList object
        var files = document.getElementById('file11').files;
        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
//            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                    f.size, ' bytes',
//                    '</li>');
            output.push('<li>', f.name, '</li>');
        }

        document.getElementById('addTrial4Scenario_filelist').innerHTML = '<ul>' + output.join('') + '</ul>';
    },
    upload: function () {
        upload('file1');
    },
    sendFileForComment_old: function () {
        var r = "";
        if ($('#file1').val().trim().length > 0) {
            r = this.upload('file1');
        }
        return r;
    },
    sendFileForComponentImage: function () {
        if ($('#uploadComponentImageModal_file').val().trim().length > 0) {
            this.upload_componentImage('uploadComponentImageModal_file');
        }
    },
    sendFileForStoryCardImage: function () {
        if ($('#setStoryCardUploadImageModal_file').val().trim().length > 0) {
            this.upload_storyCardImage('setStoryCardUploadImageModal_file');
        }
    },
    sendFileForCanvasBackground: function () {
        if ($('#uploadBackgroundImage4Canvas_file').val().trim().length > 0) {
            this.upload_canvas('uploadBackgroundImage4Canvas_file');
        }
    },
    sendFileForComment: function () {
        if ($('#file1').val().trim().length > 0) {
            this.upload_temp('file1');
        }
    },
    sendFileForComment4Task: function () {
        if ($('#file11').val().trim().length > 0) {
            this.upload_temp_4_task('file11');
        }
    },

    sendFileForAddTaskType: function () {
        if ($('#file4AddTaskType').val().trim().length > 0) {
            this.upload_temp_4_add_task_type('file4AddTaskType');
        }
    },
    sendFileForAddBacklog: function (backlogId) {
        if ($('#file4AddBacklog').val().trim().length > 0) {
            this.upload_temp_4_add_backlog(backlogId, 'file4AddBacklog');
        }
    },
    sendFileFoTrial4Scenario: function () {
        if ($('#file_trial').val().trim().length > 0) {
            this.upload_temp_4_trial('file_trial');
        }
    },
    sendFileForScenario: function () {
        if ($('#file_scenario').val().trim().length > 0) {
            this.upload_temp_4_scenario('file_scenario');
        }
    },
    sendFileForCommentTask: function () {
        if ($('#file11').val().trim().length > 0) {
            this.upload_temp_4_file_comment_task('file11');
        }
    },
    upload_temp_4_file_comment_task: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);
                    $('#' + id).attr("fname", s);
                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    var rc = parseInt(fileNo) + 1;
                    if (trc == file_count) {
//                        console.log('st=' + st);
                        that.addCommentInput(st);
                        that.fillCommentList();
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_temp_4_add_backlog: function (backlogId, id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);
                    $('#' + id).attr("fname", s);
                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    var rc = parseInt(fileNo) + 1;
                    if (trc === file_count) {
                        that.addTaskTypeDetails4Backlog(backlogId, st);
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_temp_4_add_task_type: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);
                    $('#' + id).attr("fname", s);
                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    var rc = parseInt(fileNo) + 1;
                    if (trc === file_count) {
                        that.addTaskTypeDetails(st);
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_temp_4_task: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);
                    $('#' + id).attr("fname", s);
                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    var rc = parseInt(fileNo) + 1;
                    if (trc === file_count) {
//                      console.log('st=' + st);
                        that.addCommentInput4Task(st);
                        that.fillCommentListByTask();
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_temp_4_trial: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);
                    $('#' + id).attr("fname", s);
                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    var rc = parseInt(fileNo) + 1;
                    if (trc === file_count) {
                        that.addTrial4ScenarioBody(st);
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_temp_4_scenario: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);
                    $('#' + id).attr("fname", s);
                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    var rc = parseInt(fileNo) + 1;
                    if (trc === file_count) {
                        that.addTaskScenarioBody(st);
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_temp: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
//                    console.log('file count=' + file_count);
                    $('#' + id).attr("fname", s);
                    $('#' + id).attr("src", fileUrl(s));
                    st += global_var.vertical_seperator + s;
                    var rc = parseInt(fileNo) + 1;
                    if (trc == file_count) {
//                        console.log('st=' + st);
                        that.addCommentInput(st);
                        that.fillCommentList();
                    }
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },

    upload_canvas: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
                    s = 'url("' + fileUrl(s) + '")'
                    $('#gui_prop_cnvs_backgroundimage').attr('fname', s);
                    new UserStory().setGUICanvasStyle();
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_storyCardImage: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {

                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
                    st += global_var.vertical_seperator + s;
                    if (trc === file_count) {
                        st = st + global_var.vertical_seperator + global_var.current_upload_canvas;
                        that.addFileToStoryCard(st);
                        $('#setStoryCardUploadImageModal_file').val('');
                    }
//                    s = fileUrl(s);

                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    upload_componentImage: function (id) {
        var r = "";
        var that = this;
        var files = document.getElementById(id).files;
        var file_count = files.length;
        var st = "";
        var trc = 0;
        for (var i = 0, f; f = files[i]; i++) {
//            var file = files[0];
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log('fname=' + fname);
            if (files && file) {
                var reader = new FileReader();
                reader.fileName = fname;
                reader.fileExt = fileext;
                reader.fileNo = i;
                reader.onload = function (readerEvt) {
                    trc++;
                    var fname1 = readerEvt.target.fileName;
                    var fileext1 = readerEvt.target.fileExt;
                    var fileNo = readerEvt.target.fileNo;
//                    console.log('trc no=' + trc);
                    var binaryString = readerEvt.target.result;
                    var s = that.uploadFile_temp(fileext1, btoa(binaryString), fname1);
                    s = fileUrl(s);
                    $('#gui_input_content').val(s);
                    $('#gui_input_content').change();
                };
                reader.readAsBinaryString(file, fname);
            }
        }
    },
    uploadFile_temp: function (fileext, file_base_64, file_name) {
//        console.log(file_base_64)
        var d = new Object();
        d.file_base_64 = file_base_64;
        d.file_extension = fileext;
        d.file_type = "general";
        d.file_name = file_name;
        conf = JSON.parse('{"kv":{}}');
        conf['kv'] = d;
        var dat = JSON.stringify(conf);
        var finalname = "";
        $.ajax({
            url: urlGl + "api/post/upload",
            type: "POST",
            data: dat,
            contentType: "application/json",
            async: false,
            success: function (data) {
                finalname = data.kv.uploaded_file_name;
            },
            error: function () {
            }
        });
        return finalname;
    },
    upload: function (id) {
        var files = document.getElementById(id).files;
        var r = "";
        var that = this;
        for (var i = 0, f; f = files[i]; i++) {
            var file = f;
            var fileext = file['name'].split('.').pop();
            var fname = file['name'].split('.')[0];
//            console.log("file name=" + fname);
            if (files && file) {
//                console.log("inside file name=" + fname);
                var reader = new FileReader();
                reader.onload = function (readerEvt) {
                    var binaryString = readerEvt.result;
                    var s = that.uploadFile(fileext, btoa(binaryString), fileext, fname);
                    r += s + global_var.vertical_seperator;
                    var fnamelist = $('#' + id).attr("fnamelist");
//                    console.log("core fnamelist=" + fnamelist);
                    $('#' + id).attr("fnamelist", fnamelist + global_var.vertical_seperator + s);
                };
//                console.log("inside file name ok 1  " + fname);
                reader.readAsBinaryString(file);
//                console.log("inside file name ok 222 " + fname);
            }
        }
        return r;
    },
    uploadFile: function (fileext, file_base_64, file_type, file_name) {
        var d = new Object();
        d.file_base_64 = file_base_64;
        d.file_extension = fileext;
        d.file_type = file_type;
        d.file_name = file_name;
        conf = JSON.parse('{"kv":{}}');
        conf['kv'] = d;
        var dat = JSON.stringify(conf);
        var finalname = "";
        $.ajax({
            url: urlGl + "api/post/upload",
            type: "POST",
            data: dat,
            contentType: "application/json",
            async: false,
            success: function (data) {
                finalname = data.kv.uploaded_file_name;
            },
            error: function () {
            }
        });
        return finalname;
    },
    addController4Comment: function () {
        var f = false;
        if ($('#backlogComment').val().trim().length == 0) {
            Toaster.showError("Comment is empty.");
            throw "Story is not entered!";
            f = true;
        }

        if (f) {
            throw "Date info is not entered!";
        }
    },
    addController4CommentTask: function () {
        var f = false;
        if ($('#addComment4Task_comment').val().trim().length == 0) {
            Toaster.showError("Comment is empty.");
            throw "Story is not entered!";
            f = true;
        }

        if (f) {
            throw "Date info is not entered!";
        }
    },
    addCommentInput4Task: function (fileName) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.comment = $('#addComment4Task_comment').val();
        json.kv.commentType = $('#addComment4Task_commenttype').val();
        json.kv.estimatedHours = $('#addComment4Task_commentestimationhours').val();
        json.kv.fileName = fileName + global_var.vertical_seperator + global_var.current_upload_canvas;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkTaskId = $('#addComment4Task_id').val();
        json.kv.add2jira = $('#addTaskComment_add2jira').is(":checked") ? "1" : "0";
        var data = JSON.stringify(json);
        var that = this;
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewComment",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#addComment4Task_comment').val('');
                $('#addComment4Task_id').val('');
                $('#tasklistcomment').val('');
                $('#file11').val('');
//                 Toaster.showError("successfull");
//                new Notification("").clearField('updateBacklog');
//                closeModal('updateBacklog');
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    addCommentInput: function (fileName) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.comment = $('#backlogComment').val();
        json.kv.fileName = fileName;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewComment",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#backlogComment').val('');
                $('#list').val('');
                $('#file1').val('');
//                 Toaster.showError("successfull");
//                new Notification("").clearField('updateBacklog');
//                closeModal('updateBacklog');
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    fillTrialListByTaskWithReturn: function (scenarioId) {
//        console.log('task id'+taskId);
        if (!scenarioId) {
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkScenarioId = scenarioId;
        var that = this;
        var data = JSON.stringify(json);
        var rs = "";
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetCommentListByTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                rs = that.generateCommentListHtml4Task(res, taskId);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
        return rs;
    },
    fillTrialListByScenarioWithReturn: function (scenarioId) {
        if (!scenarioId) {
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkScenarioId = scenarioId;
        var that = this;
        var data = JSON.stringify(json);
        var rs = "";
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTrialListByScenario",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                rs = that.generateTrialListHtml4Scenario(res, scenarioId);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
        return rs;
    },
    fillCommentListByTaskWithReturn: function (taskId) {
//        console.log('task id'+taskId);
        if (!taskId) {
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkTaskId = taskId;
        var that = this;
        var data = JSON.stringify(json);
        var rs = "";
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetCommentListByTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                rs = that.generateCommentListHtml4Task(res, taskId);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
        return rs;
    },
    fillCommentListByTask: function (taskId) {
        if (!taskId && !global_var.current_task_id_4_comment) {
            return;
        }

        global_var.current_task_id_4_comment = (taskId)
                ? taskId
                : global_var.current_task_id_4_comment;
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkTaskId = global_var.current_task_id_4_comment;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetCommentListByTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                console.log(JSON.stringify(res))
//                $('#backlogComment').val('');
                that.generateCommentListHtml4Task(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    fillCommentList: function () {

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetCommentListByTask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res))
                $('#backlogComment').val('');
                that.generateCommentListHtml(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    addTaskCommentToTask: function (arg) {
        this.addTaskCommentToTaskDetails();
        closeModal('addComment4TaskModal');
    },
    addTaskCommentToTaskDetails: function () {
        if (isCanvasContextExist('canvasdiv_comment')) {
            try {
                this.loadPicture4Comment();
            } catch (err) {
            }
        }

        this.addController4CommentTask();
        if ($('#file11').val().trim().length > 0) {
            this.sendFileForComment4Task();
        } else {
            this.addCommentInput4Task('');
            this.refreshCurrentBacklog();
//            this.fillCommentListByTask();
        }
    },
    addComment4TaskModal: function (arg, id) {
        global_var.current_task_id_4_comment = id;
        $('#addComment4Task_id').val(id);
        $('#addComment4Task_commentestimationhours').val("0");
        setGlobalActiveCanvas(global_var.canvas.comment);
    },
    generateTrialListHtml4Scenario: function (res, scenarioId) {
        try {
            if (!res.tbl[0].r) {
                return;
            }
        } catch (err) {
            return;
        }
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
        for (var i = 0; i < obj.length; i++) {
            var div_by_col = $('<div></div>')
                    .addClass("col")
                    .addClass("mangodbcoltrial")
                    .attr("style", obj[i].trialStatus === 'nok' ? "background-color:#FFFACD" : "");
            var div_by_row = $('<div></div>')
                    .addClass("row")
                    .addClass("mangodbtrial")
                    .addClass(obj[i].isNotifiedAsBug === '1' ? "task-child-notified" : "")
                    .addClass(obj[i].trialStatus === 'nok' ? "task-child-trial-bug" : "")
//                    .addClass(obj[i].isRequest === '1' ? "task-child-request" : "")
                    ;
            var img = obj[i].createdByAvatar.length === 0
                    ? fileUrl(new User().getDefaultUserprofileName())
                    : fileUrl(obj[i].createdByAvatar);
            var div1 = $('<div></div>')
                    .addClass("col-1 comment-line")

                    .append($('<img></img>')
                            .addClass("figure-img img-fluid rounded-circle")
                            .attr("style", "max-width:28px")
                            .attr("src", img)
                            .attr("alt", obj[i].createdByName));
            var comment = replaceTags(obj[i].actualResult);
            var div2 = $('<div></div>')
                    .attr('style', "padding-left:5px;")
                    .addClass("col-11")
                    .append($("<b></b>").append(obj[i].createdByName)
                            .append($("<span></span>")
                                    .append(", ")
                                    .append(Utility.convertDate(obj[i].trialDate))
                                    .append(", ")
                                    .append(Utility.convertTime(obj[i].trialTime))
                                    .append(", ")
                                    .append(obj[i].trialStatus === 'ok' ? ' OK ' : "<b style='color:red'> Not OK</b> ")
                                    .append(" &nbsp;&nbsp;&nbsp;&nbsp;")
                                    .append("      ")
                                    .append(obj[i].isNotifiedAsBug !== '1'
                                            ? $('<i></i>')
                                            .addClass('fa fa-edit')
                                            .attr("data-toggle", "modal")
                                            .attr("title", "Update Trial")
                                            .attr("data-target", "#updateTrial4ScenarioModal")
                                            .attr("style", "cursor:pointer")
                                            .attr("onclick", "new UserStory().editTrial4ScenarioModel('" + obj[i].id + "')")
                                            : "")
                                    .append(" &nbsp;&nbsp;")
                                    .append(obj[i].isNotifiedAsBug !== '1'
                                            ? $('<i></i>')
                                            .addClass('fa fa-trash')
                                            .attr("title", "Delete Trial")
                                            .attr("style", "cursor:pointer")
                                            .attr("onclick", "new UserStory().deleteTrial4ScenarioModel('" + obj[i].id + "')")
                                            : $('<span></span>')
                                            .append("N")
                                            .attr("data-toggle", "modal")
                                            .attr("data-target", "#notifedInfoModal")
                                            .attr("style", "color:blue;cursor:pointer")
                                            .attr("onclick", "new UserStory().showNotifiedInfo('" + obj[i].id + "')")
                                            .attr("title", "Already Notified")
                                            )
                                    .append(" &nbsp;&nbsp;")
                                    .append(obj[i].isNotifiedAsBug !== '1' && obj[i].trialStatus === 'nok'
                                            ?
                                            $('<i></i>')
                                            .attr("href", "#")
                                            .addClass('fa fa-bug')
                                            .attr("data-toggle", "modal")
                                            .attr("data-target", "#notifyTrialAsBugModal")
                                            .attr("title", "Nofify as Bug")
                                            .attr("style", "cursor:pointer")
                                            .attr("onclick", "new UserStory().notifyTrialAsBugModal('" + obj[i].id + "')")
                                            : "")
                                    )
                            )
                    .append("</br>")
                    .append($("<span></span>")
                            .attr("id", obj[i].id)
//                            .attr("ondblclick", "new UserStory().convertCommentHtml2TextArea(this)")
                            .attr("pval", replaceTags(obj[i].actualResult))
                            .append(MapTextAreaHtml(comment)));
            var div2_1 = this.generateTrialFileLine(obj[i].fileName, obj[i].id);
            var div3 = $('<div></div>').addClass("col-12").append("<hr>");
            div2.append(div2_1);
            div_by_row.append(div1).append(div2)
                    .append(div3);
            div_by_col.append(div_by_row)
            div.append(div_by_col);
        }
        var tid = (scenarioId) ? scenarioId : global_var.current_scenario_id_4_trial;
        $('#div_' + tid).html(div.html());
        return div.html();
    },
    showNotifiedInfo: function (trialId) {
        if (!trialId) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = trialId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmShowNotifiedInfoByTrialId",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                var st = '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' +
                        res.kv.backlogId + '\')">' + replaceTags(res.kv.backlogName) + '</a>';
                $('#notifiedInfo_backlog').html(st);
                $('#notifiedInfo_assignee').html(res.kv.assigneeName);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    loadUSList4Dublication: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.isSourced = "1";
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = "backlogName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadUSList4DublicationDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadSUSwithInput4Dublication: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'backlogName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogListWithInputs",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.loadSUSwithInput4DublicationDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadSUSwithInput4DublicationDetails: function (res) {
        $('#duplicateScenario_userstorylistwithinputs').html("");
        var obj = res.tbl[0].r;
        $('#duplicateScenario_userstorylistwithinputs').append($("<option></option>"));
        for (var n = 0; n < obj.length; n++) {
            $('#duplicateScenario_userstorylistwithinputs').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName));
        }
    },
    loadUSList4DublicationDetails: function (res) {
        $('#duplicateScenario_userstorylistgeneral').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            if (!obj[n].backlogName) {
                continue;
            }
            var o = $("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].backlogName));
            if (obj[n].id === global_var.current_backlog_id) {
                o.attr('selected', 'selected')
            }
            $('#duplicateScenario_userstorylistgeneral').append(o);
        }
    },
    dublicateUserStory: function (action) {
        var id = this.getBacklogList4AssignLabeltoUserStory();
        if (!id) {
            Toaster.showError('Please select User Stories');
            return;
        }

        showProgress();
        var currentProjectId = global_var.current_project_id;
        var destProjectId = $('#dublicateUserStoryModal_projectlist').val();

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = id;
        json.kv.currentProjectId = global_var.current_project_id;
        json.kv.destProjectId = destProjectId;
        json.kv.action = action;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDublicateUserStories",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                if (currentProjectId === destProjectId) {
                    that.refreshBacklog();
                }
                closeModal('dublicateUserStoryModal')
                hideProgress();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    assignPriorityModal: function () {

    },
    notifyTrialAsBugModal: function (trialId) {
        if (!trialId) {
            return
        }
        $('#notifyTrialAsBugModal_id').val(trialId);
        this.notifyTrialAsBugModal4Task(trialId);
        this.notifyTrialAsBugModal4SUS();
    },
    notifyAsChangeRequestModal: function (historyId) {
        if (!historyId) {
            return;
        }
        $('#notifyAsChangeRequestModal_id').val(historyId);
        this.notifyAsChangeRequestModal4Task(historyId);
        this.notifyAsChangeRequestModal4SUS();
    },
    getTaskListByBacklogId: function (arg) {
        if (!$(arg).val()) {
            return;
        }
        $('#notifyTrialAsBugModal_result').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = $(arg).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskListByBacklogId",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.getTaskListByBacklogIdDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    getTaskListByBacklogId4History: function (arg) {
        if (!$(arg).val()) {
            return;
        }
        $('#notifyAsChangeRequestModal_result').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = $(arg).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskListByBacklogId",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.getTaskListByBacklogIdDetails4History(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    getTaskListByBacklogIdDetails4History: function (res) {
        if (!res.tbl[0].r) {
            return;
        }
        $('#notifyAsChangeRequestModal_result').html('');
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
        for (var i = 0; i < obj.length; i++) {
            var input = $('<input></input>')
                    .attr('type', "checkbox")
                    .attr("value", obj[i].id)
                    .addClass('notifyAsChangeRequestModal_nofitiedTask')
            var span = $('<span></span>')
                    .append(obj[i].assigneeName)
                    .append("(" + obj[i].taskTypeName + ")")
            div.append(input).append(span).append("<br>");
        }
        $('#notifyAsChangeRequestModal_result').append(div);
    },
    getTaskListByBacklogIdDetails: function (res) {
        if (!res.tbl[0].r) {
            return;
        }
        $('#notifyTrialAsBugModal_result').html('');
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
        for (var i = 0; i < obj.length; i++) {
            var input = $('<input></input>')
                    .attr('type', "checkbox")
                    .attr("value", obj[i].id)
                    .addClass('notifyTrialAsBugModal_nofitiedTask')
            var span = $('<span></span>')
                    .append(obj[i].assigneeName)
                    .append("(" + obj[i].taskTypeName + ")")
            div.append(input).append(span).append("<br>");
        }
        $('#notifyTrialAsBugModal_result').append(div);
    },
    notifyTrialAsBugModal4Task: function (trialId) {
        $('#notifyTrialAsBugModal_result').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.fkTrialId = trialId;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskListByBacklogId",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.notifyTrialAsBugModalDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    notifyLabelAsChangeRequestModal4Task: function () {
        $('#notifyLabelAsChangeRequestModal_result').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.fkTrialId = trialId;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskListByBacklogId",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.notifyLabelAsChangeRequestModal4TaskDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    changeRequest_showLastChanges: function () {
        if ($('#changerequest_showlastchange').is(":checked")) {
            $('.c-input-update-middle').hide();
        } else {
            $('.c-input-update-middle').show();
        }
    },
    changeRequest_hideDates: function () {
        if ($('#changerequest_hidedates').is(":checked")) {
            $('.c-history-input-date').hide();
        } else {
            $('.c-history-input-date').show();
        }
    },
    loadAssignedLabelData: function (assignedLabelId) {
        new UserStory().toggleSubmenu($('#us-submenu-generalview'), 'generalview')
        $('#change-mgmt-gui-design-label-list').val(assignedLabelId);
        $('#change-mgmt-gui-design-label-list').change();
    },
    notifyLabelAsChangeRequest: function () {
        var ids = "";
        $('.notifyAsChangeRequestModal_nofitiedTask').each(function (e) {
            if ($(this).is(":checked") && ($(this).val() !== 'all')) {
                ids += $(this).val() + '%IN%';
            }
        });
        if (!ids || !$("#change-mgmt-gui-design-label-list").val()) {
            Toaster.showError("Please Select Assignees!");
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkLabelId = $("#change-mgmt-gui-design-label-list").val();
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.fkAssigneeId = ids;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmNotifyLabelAsChangeRequest",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                closeModal('notifyLabelAsChangeRequestModal');
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    notifyLabelAsChangeRequestModal4TaskDetails: function (res) {
        if (!res.tbl[0].r) {
            return;
        }
        $('#notifyLabelAsChangeRequestModal_result').html('');
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
        for (var i = 0; i < obj.length; i++) {
            var input = $('<input></input>')
                    .attr('type', "checkbox")
                    .attr("value", obj[i].id)
                    .addClass('notifyAsChangeRequestModal_nofitiedTask')
            var span = $('<span></span>')
                    .append(obj[i].assigneeName)
                    .append("(" + obj[i].taskTypeName + ")")
            div.append(input).append(span).append("<br>");
        }
        $('#notifyLabelAsChangeRequestModal_result').append(div);
    },
    notifyAsChangeRequestModal4Task: function () {
        $('#notifyAsChangeRequestModal_result').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.fkTrialId = trialId;
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskListByBacklogId",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.notifyAsChangeRequestModalDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    notifyTrialAsBugModal4SUS: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.notifyTrialAsBugModal4SUSDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    notifyAsChangeRequestModal4SUS: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSourcedBacklogList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.notifyAsChangeRequestModal4SUSDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    notifyAsChangeRequestModal4SUSDetails: function (res) {
        $('#notifyAsChangeRequestModal_suslist').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            var o = $("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName);
            if (obj[n].id === global_var.current_backlog_id) {
                o.attr("selected", true);
            }
            $('#notifyAsChangeRequestModal_suslist').append(o);
        }
    },
    notifyTrialAsBugModal4SUSDetails: function (res) {
        $('#notifyTrialAsBugModal_suslist').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            var o = $("<option></option>")
                    .attr("value", obj[n].id)
                    .text(obj[n].backlogName);
            if (obj[n].id === global_var.current_backlog_id) {
                o.attr("selected", true);
            }
            $('#notifyTrialAsBugModal_suslist').append(o);
        }
    },
    notifyTrialAsBugModalDetails: function (res) {
        if (!res.tbl[0].r) {
            return;
        }
        $('#notifyTrialAsBugModal_result').html('');
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
        for (var i = 0; i < obj.length; i++) {
            var input = $('<input></input>')
                    .attr('type', "checkbox")
                    .attr("value", obj[i].id)
                    .addClass('notifyTrialAsBugModal_nofitiedTask')
            var span = $('<span></span>')
                    .append(obj[i].assigneeName)
                    .append("(" + obj[i].taskTypeName + ")")
            div.append(input).append(span).append("<br>");
        }
        $('#notifyTrialAsBugModal_result').append(div);
    },
    notifyAsChangeRequestModalDetails: function (res) {
        if (!res.tbl[0].r) {
            return;
        }
        $('#notifyAsChangeRequestModal_result').html('');
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
        for (var i = 0; i < obj.length; i++) {
            var input = $('<input></input>')
                    .attr('type', "checkbox")
                    .attr("value", obj[i].id)
                    .addClass('notifyAsChangeRequestModal_nofitiedTask')
            var span = $('<span></span>')
                    .append(obj[i].assigneeName)
                    .append("(" + obj[i].taskTypeName + ")")
            div.append(input).append(span).append("<br>");
        }
        $('#notifyAsChangeRequestModal_result').append(div);
    },
    notifyHistoryAsChangeRequest: function () {
        var ids = "";
        $('.notifyHistoryAsChangeRequestModal_nofitiedTask').each(function (e) {
            if ($(this).is(":checked") && ($(this).val() !== 'all')) {
                ids += $(this).val() + '%IN%';
            }
        });
        if (!ids) {
            Toaster.showError("Please Select Assignees!");
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkTrialId = $('#notifyHistoryAsChangeRequestModal_id').val();
        json.kv.fkBacklogId = $('#notifyHistoryAsChangeRequestModal_suslist').val();
        json.kv.fkTaskId = ids;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmNotifyTrialAsBug",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                closeModal('notifyTrialAsBugModal');
                that.loadTestScenario();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    notifyTrialAsBug: function () {
        var ids = "";
        $('.notifyTrialAsBugModal_nofitiedTask').each(function (e) {
            if ($(this).is(":checked") && ($(this).val() !== 'all')) {
                ids += $(this).val() + '%IN%';
            }
        });
        if (!ids) {
            Toaster.showError("Please Select Assignees!");
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkTrialId = $('#notifyTrialAsBugModal_id').val();
        json.kv.fkBacklogId = $('#notifyTrialAsBugModal_suslist').val();
        json.kv.fkTaskId = ids;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmNotifyTrialAsBug",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                closeModal('notifyTrialAsBugModal');
                that.loadTestScenario();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    notifyAsChangeRequest: function () {
        var ids = "";
        $('.notifyAsChangeRequestModal_nofitiedTask').each(function (e) {
            if ($(this).is(":checked") && ($(this).val() !== 'all')) {
                ids += $(this).val() + '%IN%';
            }
        });
        if (!ids) {
            Toaster.showError("Please Select Assignees!");
            return;
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkHistoryId = $('#notifyAsChangeRequestModal_id').val();
        json.kv.fkBacklogId = $('#notifyAsChangeRequestModal_suslist').val();
        json.kv.fkTaskId = ids;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmNotifyAsChangeRequest",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                closeModal('notifyAsChangeRequestModal');
                BacklogHistory.load();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    deleteTrial4ScenarioModel: function (id) {
        if (!id) {
            return;
        }

        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteTrial",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadTestScenario();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    commentSpentHoursModal: function (id) {
        if (!id) {
            return;
        }
        $('#commentSpentHoursModal_id').val(id);
        $('#commentSpentHoursModal_spenthours').val("0");
        $('#commentSpentHoursModal').modal('show');
        $('#commentSpentHoursModal_spenthours').focus();
    },
    commentSpentHours: function () {
        if (!$('#commentSpentHoursModal_id').val()) {
            throw 'doestnt work';
        }
        if (!$('#commentSpentHoursModal_spenthours').val()) {
            Toaster.showError('Please enter spent hour(s).');
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#commentSpentHoursModal_id').val();
        json.kv.spentHours = $('#commentSpentHoursModal_spenthours').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSetSpentHours4Comment",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#commentSpentHoursModal').modal('hide');
                that.refreshCurrentBacklog();
            }
        });
    },
    commentEstimatedHoursModal: function (id) {
        if (!id) {
            return;
        }
        $('#commentEstimatedHoursModal_id').val(id);
        $('#commentEstimatedHoursModal_estimatedhours').val("0");
        $('#commentEstimatedHoursModal').modal('show');
        $('#commentEstimatedHoursModal_estimatedhours').focus();
    },
    commentEstimatedHours: function () {
        if (!$('#commentEstimatedHoursModal_id').val()) {
            throw 'doestnt work';
        }
        if (!$('#commentEstimatedHoursModal_estimatedhours').val()) {
            Toaster.showError('Please enter estimated hour(s).');
        }


        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#commentEstimatedHoursModal_id').val();
        json.kv.estimatedHours = $('#commentEstimatedHoursModal_estimatedhours').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmSetEstimatedHours4Comment",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $('#commentEstimatedHoursModal').modal('hide');
                that.refreshCurrentBacklog();
            }
        });
    },
    generateCommentListHtml4Task: function (res, taskId) {
        try {
            if (!res.tbl[0].r) {
                return;
            }
            var obj = res.tbl[0].r;
            var div = $('<div></div>').append($('<div></div>').addClass("row").append("<br>"));
            for (var i = 0; i < obj.length; i++) {

                var stopBtn = obj[i].startType === 'P'
                        ? $('<i></i>')
                        .addClass('fa fa-stop-circle')
                        .attr('onclick', 'new UserStory().taskStop("' + obj[i].id + '",this)')
                        .attr('style', 'color:orange;font-size:16px;display:block')
                        : $('<i></i>')
                        .addClass('fa fa-stop-circle')
                        .attr('onclick', 'new UserStory().taskStop("' + obj[i].id + '",this)')
                        .attr('style', 'color:orange;font-size:16px;display:none');
                var startBtn = obj[i].startType !== 'P'
                        ? $('<i></i>')
                        .addClass('fa fa-play-circle')
                        .attr('onclick', 'new UserStory().taskStart("' + obj[i].id + '",this)')
                        .attr('style', 'color:green;font-size:16px;display:block')
                        : $('<i></i>')
                        .addClass('fa fa-play-circle')
                        .attr('onclick', 'new UserStory().taskStart("' + obj[i].id + '",this)')
                        .attr('style', 'color:green;font-size:16px;display:none');
                var diffTime = obj[i].startType === 'P'
                        ? this.getStartTimeDiff(obj[i].startDate, res.kv.currentDate, obj[i].startTime, res.kv.currentTime)
                        : "";
                var div_by_col = $('<div></div>').addClass("col").addClass("mangodbcol");
                var div_by_row = $('<div></div>')
                        .addClass("row")
                        .addClass("mangodb")
                        .addClass(obj[i].isSubtask === '1' ? "task-child-subtask" : "")
                        .addClass(obj[i].isBug === '1' ? "task-child-bug" : "")
                        .addClass(obj[i].isRequest === '1' ? "task-child-request" : "");
                var img = obj[i].avatarUrl.length === 0
                        ? fileUrl(new User().getDefaultUserprofileName())
                        : fileUrl(obj[i].avatarUrl);
                var div1 = $('<div></div>')
                        .addClass("col-1 comment-line")

                        .append($('<img></img>')
                                .addClass("figure-img img-fluid rounded-circle")
                                .attr("style", "max-width:28px")
                                .attr("src", img)
                                .attr("alt", obj[i].username));
//            var comment = replaceMainTrustedTags(replaceTags(obj[i].comment));
                var comment = obj[i].comment;
                var div2 = $('<div></div>')
                        .attr('style', "padding-left:5px;")
                        .addClass("col-11")
                        .addClass(obj[i].isSubtask === '1' ? "task-child-subtask" : "")
                        .addClass(obj[i].isBug === '1' ? "task-child-bug" : "")
                        .addClass(obj[i].isRequest === '1' ? "task-child-request" : "")
                        .append($("<b></b>").append(obj[i].username)
                                .append($("<span></span>")
                                        .append(", ")
                                        .append(Utility.convertDate(obj[i].commentDate))
                                        .append(", ")
                                        .append(Utility.convertTime(obj[i].commentTime))
                                        .append(" ")
                                        .append(" (" + obj[i].commentJiraKey + ") ")
                                        )
                                )
                        .append($("<span></span>")
                                .attr("style", "align-right")
                                .append(" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ")
                                .append(!obj[i].isNotifiedBug
                                        ? $('<i></i>')
                                        .addClass('fa fa-tasks')
                                        .attr("a", "b")
                                        .attr("title", "Is Sub Task?")
                                        .attr("style", obj[i].isSubtask === '1' ? "cursor:pointer;color:blue" : "cursor:pointer;color:gray")
                                        .attr("onclick", "new UserStory().toogleCommentAsSubtask(this,'" + obj[i].id + "')")
                                        : "")
                                .append(" &nbsp;&nbsp;  ")
                                .append($('<i></i>')
                                        .addClass('fa fa-bug')
                                        .attr("a", "b")
                                        .attr("title", "Is Bug?")
                                        .attr("style", obj[i].isBug === '1' ? "cursor:pointer;color:red" : "cursor:pointer;color:gray")
                                        .attr("onclick", !obj[i].isNotifiedBug
                                                ? "new UserStory().toogleCommentAsBug(this,'" + obj[i].id + "')"
                                                : "")
                                        )
                                .append(" &nbsp;&nbsp; ")
                                .append(!obj[i].isNotifiedBug
                                        ? $('<i></i>')
                                        .addClass('fa fa-pencil')
                                        .attr("a", "b")
                                        .attr("title", "Is Change Request?")
                                        .attr("style", obj[i].isRequest === '1' ? "cursor:pointer;color:blue" : "cursor:pointer;color:gray")
                                        .attr("onclick", "new UserStory().toogleCommentAsRequest(this,'" + obj[i].id + "')")
                                        : "")
                                .append(obj[i].isNotifiedBug && obj[i].commentType !== 'N'
                                        ? $('<a></a>')
                                        .attr("href", "#")
                                        .attr("title", "Close Bug")
                                        .attr("onclick", "new UserStory().closeBug4TestTrial(this,'" + obj[i].id + "')")
                                        .append("Close Bug")
                                        : "")
                                .append(obj[i].commentType === 'N'
                                        ? $('<a></a>')
                                        .attr("href", "#")
                                        .attr("title", "Bug Already Closed")
                                        .append("Bug Already Closed")
                                        : "")
                                )
                        .append(" &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp; ")
                        .append($('<span></span>')
                                .attr('id', 'comment_status_' + obj[i].id)
                                .addClass("us-item-status-" + replaceTags(obj[i].commentStatus))
                                .append(replaceTags(obj[i].commentStatus)))
                        .append(" &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp; ")
                        .append($('<a></a>')
                                .attr('href', "#")
                                .attr('onclick', 'new UserStory().commentEstimatedHoursModal("' + obj[i].id + '")')
                                .append('Estimated Hour(s): ')
                                )
                        .append($('<b></b>')
                                .append((obj[i].estimatedHours) ? obj[i].estimatedHours : "0")
                                )
                        .append("&nbsp;&nbsp;  ")
                        .append($('<a></a>')
                                .attr('href', "#")
                                .attr('onclick', 'new UserStory().commentSpentHoursModal("' + obj[i].id + '")')
                                .append('Spent Hour(s): ')
                                )
                        .append($('<b></b>')
                                .append((obj[i].spentHours) ? obj[i].spentHours : "0")
                                )
                        .append(" &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp; ")
                        .append($('<i></i>')
                                .append($('<a></a>')
                                        .attr('href', "#")
                                        .attr('onclick', 'new UserStory().setStatusNew4Comment("' + obj[i].id + '")')
                                        .append('Set as New')
                                        )
                                )

                        .append(" &nbsp; ")
                        .append($('<i></i>')
                                .append($('<a></a>')
                                        .attr('href', "#")
                                        .attr('onclick', 'new UserStory().setStatusOngoing4Comment("' + obj[i].id + '")')
                                        .append('Set as Ongoing')
                                        )
                                )

                        .append("<br>")
                        .append($("<span></span>")
                                .attr("id", obj[i].id)
                                .attr("ondblclick", "new UserStory().convertCommentHtml2TextArea(this)")
                                .attr("pval", replaceMainTrustedTags(replaceTags(obj[i].comment)))
                                .append(MapTextAreaHtml(comment)));
                var div2_1 = this.generateCommentFileLine(obj[i].fileName);
                var div3 = $('<div></div>').addClass("col-12").append("<br>");
                div2.append(div2_1);
                div_by_row.append(div1).append(div2)
                        .append(div3);
                div_by_col.append(div_by_row)
                div.append(div_by_col);
//                        div.append(div1).append(div2).append(div3);
            }
//        return div.html();
            var tid = (taskId) ? taskId : global_var.current_task_id_4_comment
            $('#div_' + tid).html(div.html());
            return div.html();
        } catch (e) {
        }
    },
    closeBug4TestTrial: function (arg, commentId) {
        if (!commentId) {
            return;
        }

        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkCommentId = commentId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmCloseBug4TestTrial",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    that.loadBacklogTask();
                } catch (e) {
                }
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    toogleCommentAsSubtask: function (obj, id) {
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmToggleCommentAsSubtask",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    if (res.kv.isSubtask === '1') {
                        $(obj).attr("style", "cursor:pointer;color:blue")
                        $(obj).closest('.mangodb').addClass("task-child-subtask")
                    } else {
                        $(obj).attr("style", "cursor:pointer;color:gray");
                        $(obj).closest('.mangodb').removeClass("task-child-subtask")
                    }
                } catch (e) {
                }
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    toogleCommentAsBug: function (obj, id) {
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmToggleCommentAsBug",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    if (res.kv.isBug === '1') {
                        $(obj).attr("style", "cursor:pointer;color:red")
                        $(obj).closest('.mangodb').addClass("task-child-bug")

                    } else {
                        $(obj).attr("style", "cursor:pointer;color:gray");
                        $(obj).closest('.mangodb').removeClass("task-child-bug")
                    }
                } catch (e) {
                }
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    toogleCommentAsRequest: function (obj, id) {
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmToggleCommentAsRequest",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    if (res.kv.isRequest === '1') {
                        $(obj).attr("style", "cursor:pointer;color:blue")
                        $(obj).closest('.mangodb').addClass("task-child-request")

                    } else {
                        $(obj).attr("style", "cursor:pointer;color:gray");
                        $(obj).closest('.mangodb').removeClass("task-child-request")
                    }
                } catch (e) {
                }
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    generateCommentListHtml: function (res) {
        var obj = res.tbl[0].r;
        var div = $('<div></div>').append($('<div></div>'));
//                .addClass("col-12").append("<hr>"));
        for (var i = 0; i < obj.length; i++) {
            var ctype = obj[i].commentType === 'B' ? '<i class="fa fa-bug" style="color:red"></i>' :
                    obj[i].commentType === 'U' ? '<i class="fa fa-pencil" style="color:blue"></i>' : '';
            var img = obj[i].avatarUrl.length === 0
                    ? fileUrl(new User().getDefaultUserprofileName())
                    : fileUrl(obj[i].avatarUrl);
            var div1 = $('<div></div>').addClass("col-1 comment-line")
                    .append("<img class=\"figure-img img-fluid rounded-circle\"   src=\"" + img + "\" alt=\"" + obj[i].username + "\"> ");
            var div2 = $('<div></div>').addClass("col-11")
                    .append("<b>" + obj[i].username + " </b><span>" +
                            Utility.convertDate(obj[i].commentDate) + ", " +
                            Utility.convertTime(obj[i].commentTime) + "</span>" + "  " + ctype + " </br> "
                            + this.replaceTags(obj[i].comment));
            var div2_1 = this.generateCommentFileLine(obj[i].fileName, obj[i].id);
//            var div3 = $('<div></div>').addClass("col-12").append("<hr>");
            div.append(div1).append(div2).append(div2_1);
//                        div.append(div1).append(div2).append(div3);
        }
//        return div.html();
        $('#comment_line').html(div.html());
    },
//    replaceTags: function (arg) {
////        console.log('before===' + arg)
//        arg = arg.replace(/&lt;/g, "<");
//        arg = arg.replace(/&gt;/g, ">");
//        arg = arg.replace(/&quot;/g, "'");
//        arg = arg.replace(/&quot;/g, "\"");
//        arg = arg.replace(/&#x2F;/g, "/");
//        return arg;
//    },
    generateTrialFileLine: function (o, id) {
        try {
            var st = o.split('|');
            var div = $('<div></div>').addClass("row");
            for (var i = 0; i < st.length; i++) {
                if (st[i].trim().length === 0) {
                    continue;
                }

                var ind = st[i].lastIndexOf(".") + 1;
                var fileFormat = st[i].substr(ind);
                var div2 = $('<div></div>').addClass("col-6");
                var div12lik = $('<div></div>').addClass("col-12").addClass('file_upload_div');
                if (global_var.image_formats.includes(fileFormat)) {
                    div12lik.append($('<img></img>')
                            .attr('src', fileUrl(st[i]))
                            .addClass('comment_img')
                            .attr('data-toggle', "modal")
                            .attr('data-target', "#commentFileImageViewer")
                            .attr('onclick', 'new UserStory().setCommentFileImageViewerUrl("' + st[i] + '")')
                            .attr('alt', st[i]));
//                    
                } else if (fileFormat === 'pdf') {
                    div12lik.append($('<img></img>')
                            .attr('src', fileUrlPrivate('pdf-logo.png'))
                            .addClass('comment_img')
                            .attr('data-toggle', "modal")
                            .attr('data-target', "#commentFilePdfViewer")
                            .attr('onclick', 'new UserStory().setCommentFilePdfViewerUrl("' + st[i] + '")')
                            .attr('alt', st[i]));
                }
                div12lik.append(' <b> ' + add3Dots2Filename(st[i]) + '</b><br>');
                div12lik.append($('<a target="_blank"></a>')
                        .attr("href", fileUrl(st[i]))
                        .append('Download')
//                        .append($('<i></i>').addClass('fa fa-download'))
                        .append('  '))
                        .append($('<i></i>')
                                .addClass('lbl-action')
                                .append(' Delete ')
                                .append('  ')
                                .attr('onclick', 'new UserStory().deleteTrialFile(this,"' + st[i] + '","' + id + '")')
                                );
                div2.append(div12lik);
                div.append(div2);
            }

            var div_col = $('<div></div>').addClass("col").attr("style", "padding:0px;");
            div_col.append(div);
            return div_col;
        } catch (err) {
        }
    },
    deleteTrialFile: function (obj, fname, id) {

        if (!fname) {
            return;
        }

        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.filename = fname;
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteTrialFile",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $(obj).closest('div[class="col-6"]').first().remove();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    generateCommentFileLine: function (o, cell) {
        try {
            cell = (cell === 'undefined' || !cell) ? 'col-6' : cell;
            var st = o.split('\\|');
            var div = $('<div></div>').addClass("row");
            for (var i = 0; i < st.length; i++) {
                if (st[i].trim().length === 0) {
                    continue;
                }

                var ind = st[i].lastIndexOf(".") + 1;
                var fileFormat = st[i].substr(ind);
                var div2 = $('<div></div>').addClass(cell);
                var div12lik = $('<div></div>').addClass("col-12").addClass('file_upload_div');
                if (global_var.image_formats.includes(fileFormat)) {
                    div12lik.append($('<img></img>')
                            .attr('src', fileUrl(st[i]))
                            .addClass('comment_img')
                            .attr('data-toggle', "modal")
                            .attr('data-target', "#commentFileImageViewer")
                            .attr('onclick', 'new UserStory().setCommentFileImageViewerUrl("' + st[i] + '")')
                            .attr('alt', st[i]));
//                    
                } else if (fileFormat === 'pdf') {
                    div12lik.append($('<img></img>')
                            .attr('src', fileUrlPrivate('pdf-logo.png'))
                            .addClass('comment_img')
                            .attr('data-toggle', "modal")
                            .attr('data-target', "#commentFilePdfViewer")
                            .attr('onclick', 'new UserStory().setCommentFilePdfViewerUrl("' + st[i] + '")')
                            .attr('alt', st[i]));
                }
                div12lik.append(' <b> ' + add3Dots2Filename(st[i]) + '</b><br>');
                div12lik.append($('<a target="_blank"></a>')
                        .attr("href", fileUrl(st[i]))
                        .append('Download')
//                        .append($('<i></i>').addClass('fa fa-download'))
                        .append('  '))
                        .append($('<i></i>')
                                .addClass('lbl-action')
                                .append(' Delete ')
                                .append('  ')
                                .attr('onclick', 'new UserStory().deleteTaskCommentFile(this,"' + st[i] + '")')
                                );
                div2.append(div12lik);
                div.append(div2);
            }

            var div_col = $('<div></div>').addClass("col").attr("style", "padding:0px;");
            div_col.append(div);
            return div_col;
        } catch (err) {
        }
    },
    generateCommentFileLine4ViewImage: function (id, name, cell) {
        try {
            cell = (cell === 'undefined' || !cell) ? 'col-12' : cell;

            var div = $('<div></div>');

            if (name.trim().length === 0) {
                return;
            }

            var ind = name.lastIndexOf(".") + 1;
            var fileFormat = name.substr(ind);
            var div2 = $('<div></div>').addClass(cell);
            var div12lik = $('<div></div>').addClass("col-12").addClass('file_upload_view');
            if (global_var.image_formats.includes(fileFormat)) {
                div12lik.append($('<img></img>')
                        .attr('src', fileUrl(name))
                        .addClass('file_upload_view_img')
                        .attr('alt', name));
//                    
            }
            div2.append(div12lik);
            div.append(div2);

            var div_col = $('<div></div>').addClass("col").attr("style", "padding:0px;");
            div_col.append(div);
            return div.html();
        } catch (err) {
        }
    },
    generateCommentFileLine4View: function (id, name, cell) {
        try {
            cell = (cell === 'undefined' || !cell) ? 'col-6' : cell;

            var div = $('<div></div>');

            if (name.trim().length === 0) {
                return;
            }

            var ind = name.lastIndexOf(".") + 1;
            var fileFormat = name.substr(ind);



            var div2 = $('<div></div>').addClass(cell);
            var div12lik = $('<div></div>').addClass("col-12").addClass('file_upload_div');
            if (global_var.image_formats.includes(fileFormat)) {
                return "";
//                    
            } else if (fileFormat === 'pdf') {
                div12lik.append($('<img></img>')
                        .attr('src', fileUrlPrivate('pdf-logo.png'))
                        .addClass('comment_img')
                        .attr('data-toggle', "modal")
                        .attr('data-target', "#commentFilePdfViewer")
                        .attr('onclick', 'new UserStory().setCommentFilePdfViewerUrl("' + name + '")')
                        .attr('alt', name));
            }
            div12lik.append(' <b> ' + add3Dots2Filename(name) + '</b><br>');
            div12lik.append($('<a target="_blank"></a>')
                    .attr("href", fileUrl(name))
                    .append('Download')
//                        .append($('<i></i>').addClass('fa fa-download'))
                    .append('  '))
                    ;
            div2.append(div12lik);
            div.append(div2);

            var div_col = $('<div></div>').addClass("col").attr("style", "padding:0px;");
            div_col.append(div);
            return div.html();
        } catch (err) {
        }
    },
    generateCommentFileLine4StoryCard: function (id, name, cell) {
        try {
            cell = (cell === 'undefined' || !cell) ? 'col-6' : cell;

            var div = $('<div></div>');

            if (name.trim().length === 0) {
                return;
            }

            var ind = name.lastIndexOf(".") + 1;
            var fileFormat = name.substr(ind);
            var fileUrlVar = fileUrl(name);


            var div2 = $('<div></div>').addClass(cell);
            var div12lik = $('<div></div>').addClass("col-12").addClass('file_upload_div');
            if (global_var.image_formats.includes(fileFormat)) {
                div12lik.append($('<img></img>')
                        .attr('src', fileUrl(name))
                        .addClass('comment_img')
                        .attr('data-toggle', "modal")
                        .attr('data-target', "#commentFileImageViewer")
                        .attr('onclick', 'new UserStory().setCommentFileImageViewerUrl("' + name + '")')
                        .attr('alt', name));
//                    
            } else if (global_var.video_formats.includes(fileFormat)) {
                fileUrlVar = videoFileURL(name);

                div12lik.append($('<a target="_blank"></a>')
                        .attr("href", videoFileURL(name))
                        .append($('<img></img>')
                                .attr('src', fileUrlPrivate('video_player_logo.jpg'))
                                .addClass('comment_img')
                                .attr('alt', name)));
//                    
            } else if (fileFormat === 'pdf') {
                fileUrlVar = pdfFileURL(name);

                div12lik.append(
                        $('<a target="_blank"></a>')
                        .attr("href", pdfFileURL(name))
                        .append($('<img></img>')
                                .attr('src', fileUrlPrivate('pdf-logo.png'))
                                .addClass('comment_img')
                                .attr('alt', name)));
            }
            div12lik.append(' <b> ' + add3Dots2Filename(name) + '</b><br>');



            div12lik.append($('<a target="_blank"></a>')
                    .attr("href", fileUrlVar)
                    .append('Download')
//                        .append($('<i></i>').addClass('fa fa-download'))
                    .append('  '))
                    .append($('<i></i>')
                            .addClass('lbl-action')
                            .append(' Delete ')
                            .append('  ')
                            .attr('onclick', 'new UserStory().deleteBacklogFile(this,"' + id + '")')
                            )
                    ;
            div2.append(div12lik);
            div.append(div2);

            var div_col = $('<div></div>').addClass("col").attr("style", "padding:0px;");
            div_col.append(div);
            return div.html();
        } catch (err) {
        }
    },
    deleteTaskCommentFile: function (obj, fname) {

        if (!fname) {
            return;
        }

        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.filename = fname;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteTaskCommentFile",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $(obj).closest('div[class="col-6"]').first().remove();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    deleteBacklogFile: function (obj, fname) {

        if (!fname) {
            return;
        }

        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = fname;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteBacklogFile",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SACore.updateBacklogByRes(res);
                $(obj).closest('div[class="col-3"]').first().remove();
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },
    setCommentFileImageViewerUrl: function (arg) {
        $('#commentFileImageViewerUrl').attr("src", fileUrl(arg));
    },
    setCommentFileVideoViewerUrl: function (arg) {
        $('#commentFileVideoViewerUrl').attr("src", videoFileURL(arg));
    },
    setCommentFilePdfViewerUrl: function (arg) {
        $('#commentFilePdfViewerUrl').attr("src", fileUrl(arg));
    },
    setUserStoryInforOnGeneralView4Select: function () {
        var res = SAInput.toJSONByBacklog(global_var.current_backlog_id);
        this.setUserStoryInforOnGeneralView4Details4Select(res);
    },
    setUserStoryInforOnGeneralView4HistoryDateAndLabel: function () {
//        this.setUserStoryInforOnGeneralViewDetailsEmpty();
        if (!global_var.current_backlog_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.asc = 'orderNo';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetUserStoryInfo4HistoryDateAndLabelById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {

                that.setHistoryDatesOnStoryCardLoad(res);
            }
        });
    },

    setUserStoryInforOnGeneralView: function () {
        this.setUserStoryInforOnGeneralViewDetailsEmpty();
        if (!global_var.current_backlog_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.asc = 'orderNo';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetUserStoryInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.setUserStoryInforOnGeneralView4Details(res);
            }
        });
    },

    setUserStoryInforOnGeneralView4Share: function () {

        this.setUserStoryInforOnGeneralViewDetailsEmpty();
        if (!global_var.current_backlog_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.asc = 'orderNo';
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmGetUserStoryInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.setUserStoryInforOnGeneralView4DetailsShare(res);
            }
        });
    },

    setUserStoryInforOnGeneralView4DetailsShare: function (res) {
        res = JSON.parse(replaceTags(JSON.stringify(res)));

        //backlogun canvas parametrleri set edilir
        $('#gui_input_css_style_canvas').val(res.kv.backlogParam1);
        this.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
        this.setGuiMainWindowsParam1(res.kv.backlogParam1);

        //set General Info
        this.setUserStoryInforOnGeneralViewDetails(res);
        //generate GUI
        $('#SUS_GUI_header').text((res.kv.backlogName));
        $('#userstory-gui-input-component-res-sus-label').text((res.kv.backlogName));
        $('#generalview_SUS_GUI_header').text((res.kv.backlogName));


        try {
            var obj = res.tbl[0].r[0];
            if (obj.isAppi !== '1') {
                var st = this.getGUIDesignHTMLPure4Share(res);
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', res.kv.backlogId);
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});
            }
        } catch (err) {

        }
        this.loadStoryCardFileList4Share(res);

        //  click on first tab
//        $('.activeTabClass').each(function (e) {
//            $(this).click();
//        });

        //generate input desc table
        this.setUserStoryInputsInfoOnGeneralViewDetailsPure(res);
        this.setHistoryDatesOnStoryCardLoad(res);



    },

    loadStoryCardFileList4Share: function (res) {
        var resName = res.kv.fileUrl.split(",");
        var resId = res.kv.fileUrlId.split(",");
        $("#storycard_filelist_4_share").html('');
        for (var i = 0; i < resName.length; i++) {
            try {
                $("#storycard_filelist_4_share")
                        .append(this.generateCommentFileLine4StoryCard(
                                resId[i].trim(), resName[i].trim(), "col-3"));
            } catch (e) {
            }
        }
    },
    setUserStoryInforOnGeneralView4Details4Select: function (res) {
//        try {
//        res = JSON.parse(replaceTags(JSON.stringify(res)));

        //backlogun canvas parametrleri set edilir
        $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
        this.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
        this.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());

        //set General Info
        this.setUserStoryInforOnGeneralViewDetails4Select(res);

        //generate GUI
        $('#SUS_GUI_header').text(SACore.GetCurrentBacklogname());
        $('#userstory-gui-input-component-res-sus-label').text(SACore.GetCurrentBacklogname());
        $('#generalview_SUS_GUI_header').text(SACore.GetCurrentBacklogname());

        var st = "";
//        var st = this.getGUIDesignHTML4StoryCard();
        if (SACore.GetCurrentBaklogIsApi() !== '1') {
            st = this.getGUIDesignHTMLPure(res);
        }
        $('#general-view-task-gui').html(st);
        $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
        $('#general-view-task-gui').attr('bcode', makeId(15));
        $('[data-toggle="tooltip"]').tooltip({html: true});


        //  click on first tab
//        $('.activeTabClass').each(function (e) {
//            $(this).click();
//        });

        //generate input desc table
        this.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res);
//        this.setHistoryDatesOnStoryCardLoad(res);
//        } catch (err) {
//        }
    },

    setUserStoryInforOnGeneralView4Details: function (res) {
        res = JSON.parse(replaceTags(JSON.stringify(res)));

        //backlogun canvas parametrleri set edilir
        $('#gui_input_css_style_canvas').val(res.kv.backlogParam1);
        this.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
        this.setGuiMainWindowsParam1(res.kv.backlogParam1);

        //set General Info
        this.setUserStoryInforOnGeneralViewDetails(res);
        //generate GUI
        $('#SUS_GUI_header').text((res.kv.backlogName));
        $('#userstory-gui-input-component-res-sus-label').text((res.kv.backlogName));
        $('#generalview_SUS_GUI_header').text((res.kv.backlogName));


//        var st = this.getGUIDesignHTML4StoryCard();
        var st = this.getGUIDesignHTMLPure4Share(res);
        $('#general-view-task-gui').html(st);
        $('#general-view-task-gui').attr('bid', res.kv.backlogId);
        $('#general-view-task-gui').attr('bcode', makeId(15));
        $('[data-toggle="tooltip"]').tooltip({html: true});

        //  click on first tab
//        $('.activeTabClass').each(function (e) {
//            $(this).click();
//        });

        //generate input desc table
        this.setUserStoryInputsInfoOnGeneralViewDetailsPure(res);
        this.setHistoryDatesOnStoryCardLoad(res);
    },
    getHistoryTimesByDate: function (el, type) {
        if (!type) {
            return;
        }

        if (!$(el).val()) {
            return;
        }

        if (type === 'start')
            $('#change-mgmt-gui-design-start-time').html($('<option></option>'));
        if (type === 'end')
            $('#change-mgmt-gui-design-end-time').html($('<option></option>'));
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.date = $(el).val();
        json.kv.domain = global_var.current_domain;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmGetHistoryTimesByDate",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.getHistoryTimesByDateDetails(res, type);
            }
        });
    },
    getHistoryTimesByDateDetails: function (res, type) {

        try {
            var times = res.kv.historyTimes.split('%IN%');
            if (type === 'start') {
                $('#change-mgmt-gui-design-start-time').html($('<option></option>'));
            } else if (type === 'end') {
                $('#change-mgmt-gui-design-end-time').html($('<option></option>'));
            }

            for (var i = 0; i < times.length; i++) {
                if (type === 'start')
                    $('#change-mgmt-gui-design-start-time')
                            .append($('<option></option>')
                                    .val(times[i])
                                    .text(Utility.convertTime(times[i])));
                if (type === 'end')
                    $('#change-mgmt-gui-design-end-time')
                            .append($('<option></option>')
                                    .val(times[i])
                                    .text(Utility.convertTime(times[i])));
            }
        } catch (err) {
        }
    },
    setHistoryDatesOnStoryCardLoad: function (res) {
        try {
            var dates = res.kv.historyDates.split('%IN%');
            $('#change-mgmt-gui-design-start-date').html($('<option></option>'));
            $('#change-mgmt-gui-design-end-date')
                    .html($('<option></option>')
                            .val(res.kv.currentDate)
                            .text("Current"));
            for (var i = 0; i < dates.length; i++) {

                $('#change-mgmt-gui-design-start-date')
                        .append($('<option></option>')
                                .val(dates[i])
                                .text(Utility.convertDate(dates[i])));
                $('#change-mgmt-gui-design-end-date')
                        .append($('<option></option>')
                                .val(dates[i])
                                .text(Utility.convertDate(dates[i])));
            }
        } catch (err) {
        }
    },
    getUserStoryInfoById: function (id) {
        if (!(id)) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetUserStoryInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.getUserStoryInfoByIdDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    getUserStoryInfoByIdDetails: function (res) {
        var ind = getIndexOfTable(res, "inputDescListTable");
        var obj = res.tbl[ind].r;
        var div = $('<div></div>');
        var idx = 1;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].componentType === 'sctn' || obj[i].componentType === 'tab') {
                if (obj[i].param1.length > 0) {
                    this.getUserStoryInfoById(obj[i].param1);
                }
                continue;
            }

            if (obj[i].inputType === 'GUI' && obj[i].componentType !== 'btn') {
                continue;
            }

            var inputName = obj[i].inputType === 'OUT'
                    ? obj[i].inputName + " (Output)"
                    : obj[i].inputName;
            var tr = $('<tr></tr>').append($('<td></td>').html((idx++)));
            tr.append($('<td></td>').html(inputName));
            tr.append($('<td></td>').html(obj[i].tableName));
            tr.append($('<td></td>').html(
                    this.setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc(obj[i])));
            div.append(tr);
        }
        global_var['inList'].push(div.html());
        global_var['prosDescList'].push((obj.descriptionSourced));
    },
    setUserStoryInforOnGeneralViewDetailsEmpty: function () {
        $('#generalview_projectname').html('');
        $('#generalview_status').html('');
        $('#generalview-us-header-name').html('');
        $('#generalview_priority').html('');
        $('#generalview_esthours').html('');
        $('#generalview_spenthours').html('');
        $('#generalview_because').html('');
        $('#generalview_description').html('');
        $('#generalview-table-proc-desc').html('');
    },
    hideGUIIfUserStoryIsApi: function (obj) {
        try {
            if (obj.isApi === '1') {
                $('.gv-gui-design-api').hide();
                $('.gv-gui-design-api_4share').each(function () {
                    $(this).hide();
                    $(this).attr("ddddd", 'dddddddddddddddddddd')
                });

            } else {
                $('.gv-gui-design-api').show();
                $('.gv-gui-design-api_4share').show();
            }
        } catch (e) {
        }
    },
    setUserStoryInforOnGeneralViewDetails: function (res) {
        var obj = res.tbl[0].r[0];
        this.hideGUIIfUserStoryIsApi(obj);

        $('#generalview_projectname').html(replaceTags(obj.projectName));
        $('#generalview_status').removeAttr('class').addClass('us-item-status-' + obj.backlogStatus).html(obj.backlogStatus);
        $('#generalview-us-header-name').html(replaceTags(obj.backlogName));
        $('#generalview_priority').html(replaceTags(obj.priority));
        $('#generalview_esthours').html(replaceTags(obj.estimatedHours));
        $('#generalview_spenthours').html(obj.spentHours);
        $('#generalview_description').html(replaceTags(obj.description));
        $('#generalview-table-proc-desc').html(MapTextAreaHtml(replaceTags(obj.descriptionSourced)));
        if (obj.backlogBecause) {
            $('#storycard_because').show();
            $('#generalview_because').html(obj.backlogBecause);
        } else {
            $('#storycard_because').hide();
            $('#generalview_because').html('');
        }

        if (obj.description) {
            $('#storycard_description').show();
            $('#generalview_description').html(MapTextAreaHtml(replaceTags(obj.description)));
        } else {
            $('#storycard_description').hide();
            $('#generalview_description').html('');
        }


        if (obj.sourcedName) {
            var st = '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' +
                    obj.fkSourcedId + '\')">' + replaceTags(obj.sourcedName) + '</a>';
            $('#generalview_bound').html(st);
            $('#storycard_bound').show();
        } else {
            $('#storycard_bound').hide();
            $('#generalview_bound').html('');
        }

        if (obj.fkChildBoundUserStoryName) {
            $('#storycard_childbound').show();
            $('#generalview_childbound').html(
                    this.convertChildBoundUserStories(
                            obj.fkChildBoundUserStoryName,
                            obj.fkChildBoundUserStoryId));
        } else {
            $('#storycard_childbound').hide();
            $('#generalview_childbound').html('');
        }

        if (obj.dependencyName) {
            $('#storycard_dependency').show();
            $('#generalview_dependency').html(
                    this.convertChildBoundUserStories(
                            obj.dependencyName,
                            obj.dependencyId,
                            obj.dependencyOrderNo));
            $('#bview_generalview_dependency').html(
                    this.convertChildBoundUserStories4BView(
                            obj.dependencyName,
                            obj.dependencyId,
                            obj.fkProjectId));
        } else {
            $('#storycard_dependency').hide();
            $('#generalview_dependency').html('');
            $('#bview_generalview_dependency').html('');
        }

        if (obj.childDependencyName) {
            $('#storycard_childdependency').show();
            $('#generalview_childdependency').html(
                    this.convertChildBoundUserStories(
                            obj.childDependencyName,
                            obj.childDependencyId,
                            obj.childDependencyOrderNo));
            $('#bview_generalview_childdependency').html(
                    this.convertChildBoundUserStories4BView(
                            obj.childDependencyName,
                            obj.childDependencyId,
                            obj.fkProjectId));
        } else {
            $('#storycard_childdependency').hide();
            $('#generalview_childdependency').html('');
            $('#bview_generalview_childdependency').html('');
        }

    },
    setUserStoryInforOnGeneralViewDetails4Select: function (res) {
        var parentDependencyHtml = this.getParentBacklogDependencies4Select();
        if (parentDependencyHtml) {
            $('#storycard_dependency').show();
            $('#generalview_dependency').html(parentDependencyHtml);
            $('#bview_generalview_dependency').html(this.getParentBacklogDependencies4Select4BView());
        } else {
            $('#storycard_dependency').hide();
            $('#generalview_dependency').html('');
            $('#bview_generalview_dependency').html('');
        }

        var childDependencyHtml = this.getChildBacklogDependencies4Select();
        if (childDependencyHtml) {
            $('#storycard_childdependency').show();
            $('#generalview_childdependency').html(childDependencyHtml);
            $('#bview_generalview_childdependency').html(this.getChildBacklogDependencies4Select4BView());
        } else {
            $('#storycard_childdependency').hide();
            $('#generalview_childdependency').html('');
            $('#bview_generalview_childdependency').html('');
        }


        var obj = res.tbl[0].r[0];
        if (obj === 'undenifed' || !obj) {
            return;
        }
        this.hideGUIIfUserStoryIsApi(obj);

        $('#generalview_projectname').html(replaceTags(SACore.GetCurrentBaklogProjectName()));
        $('#generalview_status').removeAttr('class').addClass('us-item-status-' + SACore.GetCurrentBaklogStatus())
                .html(SACore.GetCurrentBaklogStatus());
        $('#generalview-us-header-name').html(replaceTags(SACore.GetCurrentBacklogname()));
        $('#generalview_priority').html(replaceTags(SACore.GetCurrentBaklogPriority()));
        $('#generalview_esthours').html(replaceTags(SACore.GetCurrentBaklogEstimatedHours()));
        $('#generalview_spenthours').html(SACore.GetCurrentBaklogSpentHours());
        $('#generalview_description').html(replaceTags(SACore.GetCurrentBaklogDescription()));
        $('#generalview-table-proc-desc').html(MapTextAreaHtml(replaceTags(SACore.GetCurrentBaklogDescriptionSourced())));
        if (SACore.GetCurrentBaklogBecause()) {
            $('#storycard_because').show();
            $('#generalview_because').html(SACore.GetCurrentBaklogBecause());
        } else {
            $('#storycard_because').hide();
            $('#generalview_because').html('');
        }

        if (SACore.GetCurrentBaklogDescription()) {
            $('#storycard_description').show();
            $('#generalview_description').html(MapTextAreaHtml(replaceTags(SACore.GetCurrentBaklogDescription())));
        } else {
            $('#storycard_description').hide();
            $('#generalview_description').html('');
        }

        if (obj.sourcedName) {
            var st = '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' +
                    obj.fkSourcedId + '\')">' + replaceTags(obj.sourcedName) + '</a>';
            $('#generalview_bound').html(st);
            $('#storycard_bound').show();
        } else {
            $('#storycard_bound').hide();
            $('#generalview_bound').html('');
        }

        if (obj.fkChildBoundUserStoryName) {
            $('#storycard_childbound').show();
            $('#generalview_childbound').html(
                    this.convertChildBoundUserStories(
                            obj.fkChildBoundUserStoryName,
                            obj.fkChildBoundUserStoryId));
        } else {
            $('#storycard_childbound').hide();
            $('#generalview_childbound').html('');
        }



    },
    getParentBacklogDependencies4Select: function () {
        var backlodIds = SADependency.GetBacklogListByChild(SACore.GetCurrentBacklogId());
        var st = "";
        for (var i = 0; i < backlodIds.length; i++) {
            st += '<a href="#" onclick="new UserStory().redirectUserStoryCore(\'' +
                    backlodIds[i] + '\')">' + " #"
                    + SACore.GetBacklogOrderNo(backlodIds[i]) + " "
                    + replaceTags(SACore.GetBacklogname(backlodIds[i])) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;
    },

    getParentBacklogDependencies4Select4BView: function () {

        var backlodIds = SADependency.GetBacklogListByChild(SACore.GetCurrentBacklogId());

        var st = "";
        for (var i = 0; i < backlodIds.length; i++) {
            st += '<a href="#" onclick="new UserStory().shareGeneralViewDirect(\'' + global_var.current_project_id + '\',\'' +
                    backlodIds[i] + '\')">' + " #"
                    + SACore.GetBacklogOrderNo(backlodIds[i]) + " "
                    + replaceTags(SACore.GetBacklogname(backlodIds[i])) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;
    },

    getChildBacklogDependencies4Select: function () {
        var backlodIds = SADependency.GetBacklogListByParent(SACore.GetCurrentBacklogId());
        var st = "";
        for (var i = 0; i < backlodIds.length; i++) {
            st += '<a href="#" onclick="new UserStory().redirectUserStoryCore(\'' +
                    backlodIds[i] + '\')">' + " #"
                    + SACore.GetBacklogOrderNo(backlodIds[i]) + " "
                    + replaceTags(SACore.GetBacklogname(backlodIds[i])) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;
    },

    getChildBacklogDependencies4Select4BView: function () {

        var backlodIds = SADependency.GetBacklogListByParent(SACore.GetCurrentBacklogId());

        var st = "";
        for (var i = 0; i < backlodIds.length; i++) {
            st += '<a href="#" onclick="new UserStory().shareGeneralViewDirect(\'' + global_var.current_project_id + '\',\'' +
                    backlodIds[i] + '\')">' + " #"
                    + SACore.GetBacklogOrderNo(backlodIds[i]) + " "
                    + replaceTags(SACore.GetBacklogname(backlodIds[i])) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;
    },
    convertChildBoundUserStories: function (s, id, orderNo) {
        var name = s.split('\\|');
        var ids = id.split('\\|');
        var orderNos = [];
        try {
            orderNos = orderNo.split('\\|');
        } catch (rr) {
        }

        var st = "";
        for (var i = 0; i < name.length; i++) {
            st += '<a href="#" onclick="new UserStory().redirectUserStoryCore(\'' +
                    ids[i] + '\')">' + " #" + orderNos[i] + " " + replaceTags(name[i]) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;
    },
    convertChildBoundUserStories4BView: function (s, id, fkProjectId) {
        var name = s.split('\\|');
        var ids = id.split('\\|');
        var st = "";
        for (var i = 0; i < name.length; i++) {
            st += '<a href="#" onclick="new UserStory().shareGeneralViewDirect(\'' + fkProjectId + '\',\'' +
                    ids[i] + '\')">' + replaceTags(name[i]) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;


    },
    convertDependencyUserStories: function (s, id) {
        var name = s.split('\\|');
        var ids = id.split('\\|');
        var st = "";
        for (var i = 0; i < name.length; i++) {
            st += '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' +
                    ids[i] + '\')">' + replaceTags(name[i]) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;
    },
    convertChildDependencyUserStories: function (s, id) {
        var name = s.split('\\|');
        var ids = id.split('\\|');
        var st = "";
        for (var i = 0; i < name.length; i++) {
            st += '<a href="#" onclick="new UserStory().redirectToDetailedView(\'' +
                    ids[i] + '\')">' + replaceTags(name[i]) + '</a>';
            st += ",&nbsp&nbsp";
        }
        return st;
    },
    insertNewBacklogModal: function (e) {
        Utility.focus('backlogName');
        this.assignSprintModalRadioButton('insertNewBacklog_sprintlist');
        this.assignLabelModal('insertNewBacklog_labellist');
        setGlobalActiveCanvas(global_var.canvas.backlog);
    },
    loadInfo4TaskInAddBacklog: function () {
        this.addTaskTypesToCombo4Backlog();
        this.addAssigneeToTaskType4Backlog();
    },
    addAssigneeToTaskType4Backlog: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'userName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                that.aaddAssigneeToTaskType4BacklogDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    aaddAssigneeToTaskType4BacklogDetails: function (res) {
        $('#addBacklog_assignee').html("").append($("<option></option>"));
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                $('#addBacklog_assignee').append($("<option></option>")
                        .attr("value", obj[n].fkUserId)
                        .text(replaceTags(obj[n].userName)));
            }
        } catch (e) {
        }
    },
    addTaskTypesToCombo4Backlog: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.typeStatus = 'A';
        json.kv.asc = "typeName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.addTaskTypesToCombo4BacklogDetails(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addTaskTypesToCombo4BacklogDetails: function (res) {
        $('#addBacklog_tasktype').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#addBacklog_tasktype').append($("<option></option>")
                    .attr("value", obj[n].id)
                    .text(replaceTags(obj[n].typeName)));
        }
    },
    getLabelLine4Backlog: function (labelName, labelColor) {
        var name = labelName.split('\\|');
        var color = labelColor.split('\\|');
        var st = "";
        for (var i = 0; i < name.length; i++) {
            st += '<span style="color:' + color[i] + '">' + replaceTags(name[i]) + '</span>, ';
        }
        return st;
    },
    getSprintLine4Backlog: function (sprintName, sprintColor) {
        var name = sprintName.split('\\|');
        var color = sprintColor.split('\\|');
        var st = "";
        for (var i = 0; i < name.length; i++) {
            st += '<span style="color:' + color[i] + '">' + replaceTags(name[i]) + '</span>, ';
//            console.log('st=' + st);
        }
        return st;
    },
    toggleSubmenu: function (e, menuName) {
//        showProgress();
        $('.tooltip').removeClass('show');
        $('[data-toggle="tooltip"]').tooltip({html: true});
        $('.sub-menu').removeClass("us-sm-active");
        var sm = '#us-submenu-' + menuName;
        $(sm).addClass('us-sm-active');
        global_var.current_us_submenu = menuName;
        Utility.addParamToUrl('current_us_submenu', global_var.current_us_submenu);
        $('.us-sm-detail').hide();
        $('#smb-details-' + menuName).show();
        if (menuName === 'comments') {
            this.fillCommentList(global_var.current_backlog_id);
        } else if (menuName === 'ipo') {
            this.toggleSubmenuIPO();
        } else if (menuName === 'tasks') {
            this.loadBacklogTask();
        } else if (menuName === 'history') {
            BacklogHistory.clearBacklogHistoryFilter();
            BacklogHistory.loadFilterComponents();
            BacklogHistory.load();
        } else if (menuName === 'generalview') {
            this.toggleSubmenuStoryCard();
        } else if (menuName === 'testscenario') {
            this.loadTestScenario();
        }

//        hideProgress();
    },
    toggleSubmenuStoryCard: function () {
//        
        try {
//            Backloglar load olanda inputlarin load olmasi bir az gec cekir
            this.setUserStoryInforOnGeneralView4Select();
        } catch (e) {
//            this.setUserStoryInforOnGeneralView();
        }

        this.setUserStoryInforOnGeneralView4HistoryDateAndLabel();
//        this.setUserStoryTaskInfoOnGeneralView();
        this.loadAssignedLabel();
        this.setBView();

        this.loadStoryCardFileList();
        try {
            this.getBacklogDesc();
        } catch (e) {
//            this.setUserStoryInforOnGeneralView();
        }

    },
    loadStoryCardFileList: function () {
        var res = SACore.GetCurrentBaklogFileUrls().split(",");
        var resId = SACore.GetCurrentBaklogFileUrlIds().split(",");
        $("#storycard_filelist").html('');
        for (var i = 0; i < res.length; i++) {
            try {
                $("#storycard_filelist").append(this.generateCommentFileLine4StoryCard(resId[i].trim(), res[i].trim(), "col-3"));
            } catch (e) {
            }
        }
    },
    getGUIDesignHTML4StoryCard: function () {
        var res = SAInput.toJSONByBacklog(global_var.current_backlog_id);
        var st = this.getGUIDesignHTML(res);
        return st;
    },
    toggleSubmenuStoryCard4Share: function () {
        this.setUserStoryInforOnGeneralView4Share();
        this.setUserStoryTaskInfoOnGeneralView4Share();
        this.loadAssignedLabel4Share();
//        this.setBView();
    },
    setBView: function () {
        $('#shareGeneralView')
                .attr('pid', global_var.current_project_id)
                .attr('bid', global_var.current_backlog_id)
                .attr('d', $('#userprofile_main_domain').html())
                .attr('lid', "");
    },
    setBViewLabel: function (labelId) {
        $('#shareGeneralView')
                .attr('lid', labelId);
    },
    getGeneralViewLine: function ( ) {
        var el = $('#shareGeneralView');
        return 'bview.html?'
                + 'pid=' + el.attr('pid')
                + '&bid=' + el.attr('bid')
                + '&d=' + el.attr('d')
                + '&lid=' + el.attr('lid');
    },
    getGeneralPrototypeViewLine: function ( ) {

        return this.getGeneralViewLine() + "&h=1";
    },
    getGeneralViewLineDirect: function (pid, bid) {
        return 'bview.html?pid=' + pid
                + '&bid=' + bid
                + '&d=' + global_var.current_domain
                + '&lid=' + '';
    },
    shareGeneralView: function (el) {
        window.open(this.getGeneralViewLine());
    },
    shareGeneralPrototypeView: function (el) {
        window.open(this.getGeneralPrototypeViewLine());
    },
    shareGeneralViewDirect: function (pid, bid) {
        window.open(this.getGeneralViewLineDirect(pid, bid));
    },
    copyGeneralView: function () {
        var copyText = $(location).attr('protocol') + "//" +
                $(location).attr('host') + "/" + this.getGeneralViewLine();
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(copyText).select();
        document.execCommand("copy");
        $temp.remove();
    },
    copyGeneralPrototypeView: function () {
        var copyText = $(location).attr('protocol') + "//" +
                $(location).attr('host') + "/" + this.getGeneralViewLine() + "&h=1";
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(copyText).select();
        document.execCommand("copy");
        $temp.remove();
    },
    toggleSubmenuIPO: function () {
        global_var.ipoTable = {};
        global_var.ipoTableVal = {};
        $('#relatedSUSOutputName').html('');
        $('#relatedUserStory').html('');
//        this.loadSUSList4Input();
//        this.loadSection4Input();
        this.toggleComponentEventDetails();
//        this.loadSUS4Relation()
//        this.loadSUS4Relation4Section();
//        this.getBacklogDetailedInputInfoById();
        this.getBacklogDetailedInputInfoById_core(SAInput.toJSON());
    },
    setGuiMainWindowsParam1: function (param1) {
        param1 = Component.ReplaceCSS(param1);
        global_var.actual_backlog_gui_css = param1;
        this.setIPOGUICanvas();
    },
    setZoom4IPO: function () {
        $('#actual_zoom_id').text($('#ipo_zoom').val());
        global_var.actual_zoom = $('#ipo_zoom').val();
        this.setIPOGUICanvas();
        this.setGUIAllCanvasZoom();
    },
    zoomIn: function () {
        global_var.actual_zoom = (parseInt(global_var.actual_zoom) + 3);
        $('#actual_zoom_id').text(global_var.actual_zoom);
        this.setIPOGUICanvas();
        this.setGUIAllCanvasZoom();
    },
    zoomOut: function () {
        global_var.actual_zoom = (parseInt(global_var.actual_zoom) - 3);
        if (global_var.actual_zoom <= 5) {
            global_var.actual_zoom = 5;
        }
        $('#actual_zoom_id').text(global_var.actual_zoom);
        this.setIPOGUICanvas();
        this.setGUIAllCanvasZoom();
    },
    mainGuiZoomWheel: function (event) {

        if (global_var.is_body_ctrl_pressed === '1') {

            event.preventDefault();
            if (event.deltaY < 0)
            {
                new UserStory().zoomIn();
            } else if (event.deltaY > 0)
            {
                new UserStory().zoomOut();
            }
        }
    },
    showAllGUI: function () {
        global_var.ipo_gui_view = "all";
        $('#gui_component_main_view_all').show();
        $('#gui_component_main_view').hide();
        if ($('#gui_component_main_view_all').html().trim().length > 0) {
            return;
        }
        this.setGUIAllCanvasZoom();
        var res = SACore.GetBacklogKeyListWithInputs();
//        var res = this.getResAllGUIDetails();
        this.showAllGUIDetails4Select(res);
    },
    getResAllGUIDetails: function () {
        var rs = "";
        var json = this.getJSONData4BaklogList();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList4AllGui",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                rs = res;
            }
        });
        return rs;
    },
    showAllGUIDetails4Select: function (backlogKeyList) {
        $('#gui_component_main_view_all').html('');



        for (var i = 0; i < backlogKeyList.length; i++) {
            var backlogId = backlogKeyList[i];
            var obj = SAInput.toJSONByBacklog(backlogId);
            var canvasCSS = SACore.GetBacklogParam1(backlogId);
            var backgroundColor = GetTagLine(canvasCSS, "##background-color");
            var backgroundImage = GetTagLine(canvasCSS, "##background-image");
//                    canvasCSS = canvasCSS.replace(backgroundColor,"");
//                    canvasCSS = canvasCSS.replace(backgroundImage,"");


            var jsonT = {"tbl": []};
//            jsonT.tbl.push(JSON.parse(obj[i].inputList));
            var childGui = this.getGUIDesignHTMLBody(obj, 0);

            var div = $('<div></div>')
                    .addClass("row gui-design-gui-all gui-design-is-api redirectClass4CSS")
                    .attr("id", "gui_all_" + backlogId)
                    .attr("tabindex", "-1")
                    .attr("style", Component.ReplaceCSS(canvasCSS));
            div.append($('<div class="col-12"></div>')
                    .append($('<div></div>')
                            .addClass("col-12 text-center")
                            .attr('style', 'background-color:white;font-size:14px;')
                            .append($("<a></a>")
                                    .attr("href", "#")
                                    .attr("onclick", "new UserStory().setBacklogByGuiAll('" + backlogId + "')")
                                    .append("#")
                                    .append(SACore.GetBacklogOrderNo(backlogId))
                                    .append(": ")
                                    .append(SACore.GetBacklogname(backlogId))))
                    .append($('<div class="row redirectClass"></div>')
                            .attr('bid', backlogId)
                            .attr('bcode', makeId(10))
                            .attr('style', 'background-color:white;' + backgroundColor + ";" + backgroundImage)

                            .append(childGui)
                            ));

            $('#gui_component_main_view_all').append(div);
            $('#gui_component_main_view_all').find('[id=gui_all_' + backlogId + ']')
                    .height($('#gui_component_main_view_all').find('[id=gui_all_' + backlogId + ']')
                            .find('.redirectClass').first().height() + 50);
//            console.log('height=' + $('#gui_component_main_view_all').find('[id=gui_all_' + obj[i].id + ']').height());
            $('#gui_component_main_view_all').append('<hr>');
        }
        //activate first tab panel
//        $('.activeTabClass').each(function (e) {
//            $(this).click();
//        });
        $('#gui_all_' + global_var.current_backlog_id).focus();

    },
    showAllGUIDetails: function (res) {
        $('#gui_component_main_view_all').html('');
        $('#gui_component_main_view_all').show();
        $('#gui_component_main_view').hide();

        var obj = res.tbl[0].r;
        for (var i = 0; i < obj.length; i++) {
            var canvasCSS = obj[i].param1;
            var backgroundColor = GetTagLine(canvasCSS, "##background-color");
            var backgroundImage = GetTagLine(canvasCSS, "##background-image");
//                    canvasCSS = canvasCSS.replace(backgroundColor,"");
//                    canvasCSS = canvasCSS.replace(backgroundImage,"");


            var jsonT = {"tbl": []};
//            jsonT.tbl.push(JSON.parse(obj[i].inputList));
            var childGui = this.getGUIDesignHTMLBody(jsonT, 0);

            var div = $('<div></div>')
                    .addClass("row gui-design-gui-all gui-design-is-api redirectClass4CSS")
                    .attr("id", "gui_all_" + obj[i].id)
                    .attr("tabindex", "-1")
                    .attr("style", Component.ReplaceCSS(canvasCSS));
            div.append($('<div class="col-12"></div>')
                    .append($('<div></div>')
                            .addClass("col-12 text-center")
                            .attr('style', 'background-color:white;font-size:14px;')
                            .append($("<a></a>")
                                    .attr("href", "#")
                                    .attr("onclick", "new UserStory().setBacklogByGuiAll('" + obj[i].id + "')")
                                    .append("#" + obj[i].orderNo + ": " + obj[i].backlogName)))
                    .append($('<div class="row redirectClass"></div>')
                            .attr('bid', obj[i].id)
                            .attr('bcode', makeId(10))
                            .attr('style', 'background-color:white;' + backgroundColor + ";" + backgroundImage)

                            .append(childGui)
                            ));

            $('#gui_component_main_view_all').append(div);
            $('#gui_component_main_view_all').find('[id=gui_all_' + obj[i].id + ']')
                    .height($('#gui_component_main_view_all').find('[id=gui_all_' + obj[i].id + ']')
                            .find('.redirectClass').first().height() + 50);
//            console.log('height=' + $('#gui_component_main_view_all').find('[id=gui_all_' + obj[i].id + ']').height());
            $('#gui_component_main_view_all').append('<hr>');
        }
        //activate first tab panel
        $('.activeTabClass').each(function (e) {
            $(this).click();
        });
        $('#gui_all_' + global_var.current_backlog_id).focus();

    },
    setBacklogByGuiAll: function (id) {
        this.redirectUserStoryCore(id);
//        global_var.current_backlog_id = id;
//        this.refreshCurrentBacklog();

//        $('#container-us-body').find('.pointer').removeClass('us-selected');
//        $('#container-us-body').find('tr[sid=' + id + ']').first().find('.pointer').first().addClass('us-selected');
//        $('#container-us-body').find('tr[sid=' + global_var.current_backlog_id + ']').first().find('a').first().click();
//        $('#container-us-body').find('tr[sid=' + global_var.current_backlog_id + ']').first().find('a').first().focus();


    },
    showCurrentGUI: function () {
        global_var.ipo_gui_view = "single";
        $('#gui_component_main_view_all').hide();
        $('#gui_component_main_view').show();
    },

    setGUIAllCanvasZoom: function () {

        var paramWithZoom = "zoom:" + global_var.actual_zoom + "%;";
        paramWithZoom += (global_var.ipo_gui_view === 'all') ? "display:block1" : "display:none";
        $('#gui_component_main_view_all').attr('style', paramWithZoom);
    },

    setIPOGUICanvas: function () {
        var paramWithZoom = "zoom:" + global_var.actual_zoom + "%;" + global_var.actual_backlog_gui_css;
        paramWithZoom += (global_var.ipo_gui_view === 'single') ? "display:block1" : "display:none";
        $('#gui_component_main_view').attr('style', paramWithZoom);
        $('#gv_gui_component_main_view').attr('style', global_var.actual_backlog_gui_css);
    },
    getBacklogDetailedInputInfoById: function () {
        if (!global_var.current_backlog_id) {
            return;
        }

        $('#SUS_IPO_GUI_Design').html('');

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogDetailedInputInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.getBacklogDetailedInputInfoById_core(res);
            }
        });
    },
    getBacklogDetailedInputInfoById_core: function (res) {
//        $('#txtSUS_IPO_description').val(((res.kv.backlogDescription)));
        $('#txtSUS_IPO_description').val(SACore.GetCurrentDescriptionSourced());
        this.getBacklogDetailedInputInfoByIdDetails(res);
        //generate gui
//                if (global_var.current_ipo_view === 'gui') {
//        $('#SUS_GUI_header').text((res.kv.backlogName));
        $('#SUS_GUI_header').text(SACore.GetCurrentBacklogname());
        $('#userstory-gui-input-component-res-sus-label').text(SACore.GetCurrentBacklogname());
        $('#generalview_SUS_GUI_header').text(SACore.GetCurrentBacklogname());
        //backlogun canvas parametrleri set edilir
        $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
        this.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
        this.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());
        var st = this.getGUIDesignHTMLPure(res);
        $('#SUS_IPO_GUI_Design').html(st);
        $('#SUS_IPO_GUI_Design').attr('bid', SACore.GetCurrentBacklogId());
        $('#SUS_IPO_GUI_Design').attr('bcode', makeId(10));

        //set is API
        try {
//            if (res.kv.backlogIsApi === '1') {
//                $('#gui_component_is_api').prop('checked', true);
//            } else {
//                $('#gui_component_is_api').prop('checked', false);
//            }
            if (SACore.GetCurrentBaklogIsApi() === '1') {
                $('#gui_component_is_api').prop('checked', true);
            } else {
                $('#gui_component_is_api').prop('checked', false);
            }
            this.guiComponentIsApiDetails();
        } catch (err) {

        }

        if (global_var.ipo_gui_view === 'single') {
            $('#gui_component_main_view_all').hide();
            $('#gui_component_main_view').show();
            //activate first tab panel
            $('.activeTabClass').each(function (e) {
                $(this).click();
            });
        } else if (global_var.ipo_gui_view === 'all') {
            $('#gui_all_' + global_var.current_backlog_id).focus();
            $('#gui_component_main_view_all').show();
            $('#gui_component_main_view').hide();
        }
    },
    getBacklogDetailedInputInfoByIdDetails: function (res) {
        //generate Input Table List
        $('#tblIPOList > tbody').html('');
        $('#tblInputDescriptionList > tbody').html('');
        $('.inputdesc').attr("style", " pointer-events: none;opacity: 0.4;display:none;")
        var st = this.getHtmlGenIPOInputList(res);
        $('#tblIPOList > tbody').html(st);
        $('.us-ipo-input-tr').first().click();
        $('#tblIPOOutputList > tbody').html('');
        var st = this.getHtmlGenIPOOutputList(res);
        $('#tblIPOOutputList > tbody').html(st);
    },
    setUserStoryTaskInfoOnGeneralView: function () {
        if (!global_var.current_backlog_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogTaskList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                 res = JSON.parse(replaceTags(JSON.stringify(res)));
                that.setUserStoryTaskInfoOnGeneralViewDetails(res);
            }
        });
    },
    setUserStoryTaskInfoOnGeneralView4Share: function () {
        if (!global_var.current_backlog_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        var that = this;
        json.kv.domain = global_var.current_domain;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceTmGetBacklogTaskList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                 res = JSON.parse(replaceTags(JSON.stringify(res)));
                that.setUserStoryTaskInfoOnGeneralViewDetails(res);
            }
        });
    },
    setUserStoryTaskInfoOnGeneralViewDetails: function (res) {
        $('#generalview_tasklist_table_list > tbody').html('');
//       
        try {
            var obj = res.tbl[0].r;
        } catch (e) {
            return;
        }
        for (var i = 0; i < obj.length; i++) {
//            console.log('history type='+obj[i].componentType);
            var tr = $('<tr></tr>').append($('<td></td>').html((i + 1)));
            tr.append($('<td></td>').html('<span class="us-item-status-' + obj[i].taskStatus + '">' + obj[i].taskStatus + '</span>'));
            tr.append($('<td></td>').html(obj[i].taskTypeName));
            tr.append($('<td></td>').html(replaceTags(obj[i].assigneeName)));
            tr.append($('<td></td>').html(obj[i].estimatedHours + '/' + obj[i].completedDuration));
            tr.append($('<td></td>').html(replaceTags(obj[i].createdByName)));
            tr.append($('<td></td>').html(Utility.convertDate(obj[i].createdDate) + '/' + Utility.convertDate(obj[i].lastUpdatedDate)));
            tr.append($('<td></td>').html(obj[i].dependentTaskType1Name + '<br>' + obj[i].dependentTaskType2Name));
            $('#generalview_tasklist_table_list > tbody').append(tr);
        }

    },
    assignPriorityToUserStory: function () {
        var id = this.getBacklogList4AssignLabeltoUserStory();
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = id;
        json.kv.priority = $('#assignPriorityToUserStoryModal_priority').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmAssignPriorityToUserStory",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                closeModal('assignPriorityToUserStoryModal');
                that.load();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    setUserStoryInputsInfoOnGeneralView: function () {
        if (!global_var.current_backlog_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = global_var.current_backlog_id;
        json.kv.asc = 'orderNo';
        json.kv.inputType = 'IN%IN%OUT';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.setUserStoryInputsInfoOnGeneralViewDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    getTableHeader4InputTable: function (trcount) {
        if (trcount === 0) {
            return $('<thead></thead>');
        }
        var thead = $('<thead></thead>')
                .append($('<tr></tr>')
                        .append($('<th></th>').attr('style', 'width:1%;white-space:nowrap;border-color:#5181B8').append(''))
                        .append($('<th></th>').attr('style', 'border-color:#5181B8;width:1%; white-space:nowrap;')
                                .append('<input type="checkbox" id="us_input_list_check_all_new" onclick="new UserStory().toggleAllInputNew(this)">'))

                        .append($('<th></th>').attr('style', 'border-color:#5181B8').append('Input name'))
//                        .append($('<th></th>').attr('style', 'border-color:#5181B8').append('Table name'))
                        .append($('<th></th>').attr('style', 'border-color:#5181B8').append('Description'))
                        );
        return thead;
    },
    getTableFooter4InputTable: function (desc, replace) {
        if (desc === 'undefined' || !desc) {
            return $('<tfoot></tfoot>');
        }

        if (desc.length === 0) {
            return $('<tfoot></tfoot>');
        }

        var ds = (replace === true) ? MapTextAreaHtml(replaceTags(desc)) : desc;

        var tfoot = $('<tfoot></tfoot>').append($('<tr></tr>').attr('style', 'padding: 30px 0 30px 0;')
                .append($('<th></th>')
                        .attr('style', 'border-color:#5181B8;padding: 15px 0 15px 0; border-top-width: 3px;')
                        .attr('colspan', "2")
                        .append('Process Description'))
                .append($('<th></th>').attr('style', 'border-color:#5181B8;padding: 5px;\n\
                                            font-weight:normal;border-top-width: 3px;text-align: left;')
                        .attr('colspan', "2")
                        .append(ds)
                        ));
        return tfoot;
    },
    getInputTable4StoryCard4Select: function (res, ind, iteration, rowId, parentId) {
        if (iteration >= 20) {
            return;
        }
        iteration++;
        var obj = "";
        try {
            obj = res.tbl[ind].r;
        } catch (e) {
            throw "Object is not defined.";
        }
        var idx = 1;

        var table = $('<table></table>')
                .addClass('table')
                .attr('border', '1')
                .attr('style', 'border: 1px solid #5181B8;margin: 0 auto;');


        var tbody = $('<tbody></tbody>');
        var trcount = 0;
        for (var i = 0; i < obj.length; i++) {
            var ct = "";
            try {
                ct = obj[i].componentType;
            } catch (e) {
                continue;
            }
            if (ct === 'sctn' || ct === 'tab') {
                var td = $('<td></td>')
                        .attr('style', "text-align:left;")
                        .attr('colspan', '4');
                var innerRowId4Section = (rowId === '' ? '' : rowId + '.') + (idx++);
                td.append("<b>" + innerRowId4Section + ". " + obj[i].inputName + "</b> ");
                td.append($('<input type="checkbox"></input>')
                        .attr('onchange', "new UserStory().toggleSubTableOfInputs(this,'" + obj[i].id + "')"))

                try {
                    if (obj[i].param1.length > 0) {
                        var res = SAInput.toJSONByBacklog(obj[i].param1);
                        var innerTable = this.getInputTable4StoryCard4Select(res, 0, iteration, innerRowId4Section, obj[i].id);
                        td.append('<br>');
                        td.append(innerTable);
                    }
                } catch (err) {
                }

                var tr = $('<tr></tr>');

                tr.append(td);

                tbody.append(tr);
                continue;
            }
            if (obj[i].inputType === 'GUI' && obj[i].componentType !== 'btn') {
                continue;
            }

            trcount++;

            var inputName = obj[i].inputType === 'OUT'
                    ? obj[i].inputName + " / Output"
                    : obj[i].inputName;

            inputName += (obj[i].tableName) ? " (Grouped as:" + obj[i].tableName + ")"
                    : "";

            var innerRowId = (rowId === '' ? '' : rowId + '.') + (idx++);
            var tr = $('<tr></tr>').append($('<td></td>').html(innerRowId));
            tr.append($('<td></td>').html(inputName));
//            tr.append($('<td></td>').html(obj[i].tableName));
            tr.append($('<td></td>')
                    .attr('style', 'text-align:left;')
                    .html(this.setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4Select(obj[i])));
            tbody.append(tr);
        }

        table.append(this.getTableHeader4InputTable(trcount));
//        table.append(this.getTableFooter4InputTable(res.tbl[0].r[0].descriptionSourced, true));
        var descSourced = "";
        try {
            descSourced = SACore.GetCurrentBaklogDescriptionSourced1(obj[0].fkBacklogId);
            console.log('descSourced=', descSourced)
        } catch (e) {
        }

        table.append(this.getTableFooter4InputTable(descSourced, true));
        table.append(tbody);
        var div = $('<div></div>').attr('id', 'sub_tbl_' + parentId)
                .addClass('col-12')
                .addClass('sub_table');
        if (parentId.length > 0) {
            div.attr('style', 'padding:4px 20px;display:none;');
        } else {
            div.attr('style', 'padding:4px 20px;')
        }
        div.append(table);
        return div;
    },
    getInputTable4StoryCard: function (res, ind, iteration, rowId, parentId) {
        if (iteration >= 20) {
            return;
        }
        iteration++;

        var table = $('<table></table>')
                .addClass('table')
                .attr('border', '1')
                .attr('style', 'border: 1px solid #5181B8;margin: 0 auto;');

        var tbody = $('<tbody></tbody>');

        var obj = "";
        try {
            obj = res.tbl[ind].r;
        } catch (e) {
            throw "Object is not defined.";

        }
        var idx = 1;




        var tbody = $('<tbody></tbody>');
        var trcount = 0;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].componentType === 'sctn' || obj[i].componentType === 'tab') {
                var td = $('<td></td>')
                        .attr('style', "text-align:left;")
                        .attr('colspan', '4');
                var innerRowId4Section = (rowId === '' ? '' : rowId + '.') + (idx++);
                td.append("<b>" + innerRowId4Section + ". " + obj[i].inputName + "</b> ");
                td.append($('<input type="checkbox"></input>')
                        .attr('onchange', "new UserStory().toggleSubTableOfInputs(this,'" + obj[i].id + "')"))

                try {
                    if (obj[i].inputTable.length > 0) {
                        var jsonT = {"tbl": []};
                        jsonT.tbl.push(JSON.parse(obj[i].inputTable));
                        var innerTable = this.getInputTable4StoryCard(jsonT, 0, iteration, innerRowId4Section, obj[i].id);
                        td.append('<br>');
                        td.append(innerTable);
                    }
                } catch (err) {
                }

                var tr = $('<tr></tr>');

                tr.append(td);

                tbody.append(tr);
                continue;
            }
            if (obj[i].inputType === 'GUI' && obj[i].componentType !== 'btn') {
                continue;
            }

            trcount++;

            var inputName = obj[i].inputType === 'OUT'
                    ? obj[i].inputName + " / Output"
                    : obj[i].inputName;

            inputName += (obj[i].tableName) ? " (Grouped as:" + obj[i].tableName + ")"
                    : "";

            var innerRowId = (rowId === '' ? '' : rowId + '.') + (idx++);
            var tr = $('<tr></tr>').append($('<td></td>').html(innerRowId));
            tr.append($('<td></td>').html(inputName));
//            tr.append($('<td></td>').html(obj[i].tableName));
            tr.append($('<td></td>')
                    .attr('style', 'text-align:left;')
                    .html(
                            this.setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc(obj[i])));
            tbody.append(tr);
        }

        table.append(this.getTableHeader4InputTable(trcount));
        table.append(this.getTableFooter4InputTable(res.tbl[0].r[0].descriptionSourced, true));
        table.append(tbody);
        var div = $('<div></div>').attr('id', 'sub_tbl_' + parentId)
                .addClass('col-12')
                .addClass('sub_table');
        if (parentId.length > 0) {
            div.attr('style', 'padding:4px 20px;display:none;');
        } else {
            div.attr('style', 'padding:4px 20px;')
        }
        div.append(table);
        return div;
    },

    setUserStoryInputsInfoOnGeneralViewDetailsPure4Select: function (res) {
//        res = replaceJSON(res);
        $('#generalview_input_list').html('');
//        try {
//        var ind = getIndexOfTable(res, "inputDescListTable");
        var ind = 0;
        var table = this.getInputTable4StoryCard4Select(res, ind, 0, '', '');
        $('#generalview_input_list').append(table);

    },

    getInputTable4StoryCard4SelectNew: function (res, ind, iteration, rowId, parentId) {
        if (iteration >= 20) {
            return;
        }
        iteration++;
        var obj = "";
        try {
            obj = res.tbl[ind].r;
        } catch (e) {
            throw "Object is not defined.";
        }
        var idx = 1;

        var table = $('<table></table>')
                .addClass('table')
                .attr('border', '1')
                .attr('style', 'border: 1px solid #5181B8;margin: 0 auto;');


        var tbody = $('<tbody></tbody>');
        var trcount = 0;
        for (var i = 0; i < obj.length; i++) {
            var ct = "";
            try {
                ct = obj[i].componentType;
            } catch (e) {
                continue;
            }
            if (ct === 'sctn' || ct === 'tab') {
                var td = $('<td></td>')
                        .attr('style', "text-align:left;")
                        .attr('colspan', '4');
                var innerRowId4Section = (rowId === '' ? '' : rowId + '.') + (idx++);
                td.append("<b>" + innerRowId4Section + ". " + obj[i].inputName + "</b> ");
                td.append($('<input type="checkbox"></input>')
                        .attr('onchange', "new UserStory().toggleSubTableOfInputs(this,'" + obj[i].id + "')"))

                try {
                    if (obj[i].param1.length > 0) {
                        var res = SAInput.toJSONByBacklog(obj[i].param1);
                        var innerTable = this.getInputTable4StoryCard4SelectNew(res, 0, iteration, innerRowId4Section, obj[i].id);
                        td.append('<br>');
                        td.append(innerTable);
                    }
                } catch (err) {
                }

                var tr = $('<tr></tr>');

                tr.append(td);

                tbody.append(tr);
                continue;
            }
            if (obj[i].inputType === 'GUI' && obj[i].componentType !== 'btn') {
                continue;
            }

            trcount++;

            var inputName = obj[i].inputType === 'OUT'
                    ? obj[i].inputName + " / Output"
                    : obj[i].inputName;

            inputName += (obj[i].tableName) ? " (Grouped as:" + obj[i].tableName + ")"
                    : "";

            var innerRowId = (rowId === '' ? '' : rowId + '.') + (idx++);
            var tr = $('<tr></tr>').append($('<td></td>').html(innerRowId));
            tr.append($('<td></td>')
                    .append($('<input type="checkbox">')
                            .addClass("us-input-list-item-check-box-class-new")
                            .val(obj[i].id)));
            tr.append($('<td></td>')
                    .attr("ondblclick", "new UserStory().updateInputEditLineNew(this,'" + obj[i].id + "')")
                    .attr("iname", replaceTags(Replace2Primes(inputName)))
                    .append(inputName)
                    .append($("<a href='#'>")
                            .attr("onclick", "new UserStory().deleteInputNew(this,'" + obj[i].id + "')")
                            .append(" X ")))
                    ;
//            tr.append($('<td></td>').html(obj[i].tableName));
            tr.append($('<td></td>')
                    .attr('style', 'text-align:left;')
                    .append($('<input type="text">')
                            .attr("iid", obj[i].id)
                            .attr("onchange", "new UserStory().insertNewInputDescriptionNew(this,'" + obj[i].id + "')")
                            .attr("placeholder", "Add new description"))
                    .append("<br>")
                    .append(this.setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4SelectNew(obj[i])));
//                    .html(this.setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4SelectNew(obj[i])));
            tbody.append(tr);
        }

        table.append(this.getTableHeader4InputTable(trcount));
//        table.append(this.getTableFooter4InputTable(res.tbl[0].r[0].descriptionSourced, true));
        var descSourced = "";
        try {
            descSourced = SACore.GetCurrentBaklogDescriptionSourced1(obj[0].fkBacklogId);
            console.log('descSourced=', descSourced)
        } catch (e) {
        }

        table.append(this.getTableFooter4InputTable(descSourced, true));
        table.append(tbody);
        var div = $('<div></div>').attr('id', 'sub_tbl_' + parentId)
                .addClass('col-12')
                .addClass('sub_table');
        if (parentId.length > 0) {
            div.attr('style', 'padding:4px 20px;display:none;');
        } else {
            div.attr('style', 'padding:4px 20px;')
        }
        div.append(table);
        return div;
    },

    updateInputEditLineNew: function (el, inputId) {
        var inp = $('<input type="text">')
                .css("width", "100%")
                .attr("onchange", "new UserStory().updateInputCompNew(this,'" + inputId + "')")
                .val($(el).attr('iname'))
                ;
        $(el).html(inp);
        inp.focus();
    },

    updateInputCompNew: function (el, inputId) {


        if (!inputId) {
            return;
        }

        if ($(el).val().trim().length == 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = inputId;

        json.kv.inputName = $(el).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputByInputName",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.addInputByRes(res);
                $(el).closest('td')
                        .attr("iname", replaceTags(Replace2Primes($(el).val())))
                $(el).closest('td').html($(el).val());

//////
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);

                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },

    deleteInputNew: function (el, inputId) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!inputId) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = inputId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInput",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInput.deleteInput(inputId);
                SACore.updateBacklogByRes(res);


                //////////
                /////////

                //backlogun canvas parametrleri set edilir
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);

                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },

    setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4SelectNew: function (object) {
        var descriptionRelated = replaceTags(object.descriptionRelated);
        var backlogNameRelated = replaceTags(SACore.GetBacklogname(object.fkDependentBacklogId));
        var inputNameRelated = replaceTags(SAInput.GetInputName(object.fkDependentOutputId));
        var desc = replaceTags(object.description);
        var st = "";
        try {

            if (backlogNameRelated) {
                st += '<u>' + inputNameRelated + " (" + backlogNameRelated + ")</u>:<br>";
            }
            if (object.fkDependentOutputId) {
                var obj = SAInput.GetInputDescription(object.fkDependentOutputId);
                for (var n = 0; n < obj.length; n++) {
                    var descId = obj[n].trim();
                    var desc1 = SAInputDesc.InputDescriptions[descId].description;
                    st += (desc1) ? '-' + replaceTags(this.fnline2Text(desc1)) + "<br>" : "";
                }

            }
            if (backlogNameRelated) {
                st += "<hr style='margin:0px;'>";
            }

//            var obj = desc.split('%IN%');
            var obj = SAInput.GetInputDescription(object.id);
            var stln = "";
            for (var n = 0; n < obj.length; n++) {
                var descId = obj[n].trim();
                var desc1 = SAInputDesc.InputDescriptions[descId].description;
                stln = (desc1) ? '<span idesc=\'' + replaceTags(Replace2Primes(this.fnline2Text(desc1))) + '\' '
                        + ' ondblclick="new UserStory().updateInputDescriptionEditLineNew(this,\'' + descId + '\')">'
                        + "- " + replaceTags(this.fnline2Text(desc1))
                        + "<a href='#' onclick=\"new UserStory().deleteInputDescriptionNew(this,'" + descId + "')\"> X </a>"
                        + "</span>"

                        + "<br>" + stln : stln;
            }

            st += stln;
        } catch (e) {
        }
        return st;
    },

    updateInputDescriptionEditLineNew: function (el, descId) {
        var inp = $('<input type="text">')
                .css("width", "100%")
                .attr("onchange", "new UserStory().updateInputDescCompNew(this,'" + descId + "')")
                .val($(el).attr('idesc'))
                ;
        $(el).html(inp);
        inp.focus();
    },

    updateInputDescCompNew: function (el, descId) {
        var id = descId;
        if (descId.trim().length == 0) {
            return;
        }

        if ($(el).val().trim().length === 0) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        json.kv.description = $(el).val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateInputDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                SAInputDesc.updateInputDescriptionByRes(res);


//////
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);

                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});



            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });





    },
    deleteInputDescriptionNew: function (el, inputDescId) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!inputDescId) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = inputDescId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteInputDescription",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                SAInputDesc.deleteInputDescription(inputDescId);
                SAInput.updateInputByRes(res);

                //////////////
                //backlogun canvas parametrleri set edilir
                $('#gui_input_css_style_canvas').val(SACore.GetCurrentBacklogParam1());
                that.showCanvasCss(); //backlog canvas parametrleri set edilenden sonra parse ele
                that.setGuiMainWindowsParam1(SACore.GetCurrentBacklogParam1());


                var st = "";
                var res1 = SAInput.toJSONByBacklog(global_var.current_backlog_id);

                that.setUserStoryInputsInfoOnGeneralViewDetailsPure4SelectNew(res1);

                if (SACore.GetCurrentBaklogIsApi() !== '1') {
                    st = that.getGUIDesignHTMLPure(res1);
                }
                $('#general-view-task-gui').html(st);
                $('#general-view-task-gui').attr('bid', SACore.GetCurrentBacklogId());
                $('#general-view-task-gui').attr('bcode', makeId(15));
                $('[data-toggle="tooltip"]').tooltip({html: true});
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },

    setUserStoryInputsInfoOnGeneralViewDetailsPure: function (res) {
//        res = replaceJSON(res);
        $('#generalview_input_list').html('');
//        try {
        var ind = getIndexOfTable(res, "inputDescListTable");
        var table = this.getInputTable4StoryCard(res, ind, 0, '', '');
        $('#generalview_input_list').append(table);
    },
    toggleSubTableOfInputs: function (el, id) {
        if ($(el).is(':checked')) {
            $('#sub_tbl_' + id).show();
        } else {
            $('#sub_tbl_' + id).hide();
        }
    },
    setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc4Select: function (object) {
        var descriptionRelated = replaceTags(object.descriptionRelated);
        var backlogNameRelated = replaceTags(SACore.GetBacklogname(object.fkDependentBacklogId));
        var inputNameRelated = replaceTags(SAInput.GetInputName(object.fkDependentOutputId));
        var desc = replaceTags(object.description);
        var st = "";
        try {

            if (backlogNameRelated) {
                st += '<u>' + inputNameRelated + " (" + backlogNameRelated + ")</u>:<br>";
            }
            if (object.fkDependentOutputId) {
                var obj = SAInput.GetInputDescription(object.fkDependentOutputId);
                for (var n = 0; n < obj.length; n++) {
                    var descId = obj[n].trim();
                    var desc1 = SAInputDesc.InputDescriptions[descId].description;
                    st += (desc1) ? '-' + replaceTags(this.fnline2Text(desc1)) + "<br>" : "";
                }

            }
            if (backlogNameRelated) {
                st += "<hr style='margin:0px;'>";
            }

//            var obj = desc.split('%IN%');
            var obj = SAInput.GetInputDescription(object.id);
            var stln = "";
            for (var n = 0; n < obj.length; n++) {
                var descId = obj[n].trim();
                var desc1 = SAInputDesc.InputDescriptions[descId].description;
                stln = (desc1) ? '-' + replaceTags(this.fnline2Text(desc1)) + "<br>" + stln : stln;
            }

            st += stln;
        } catch (e) {
        }
        return st;
    },
    setUserStoryInputsInfoOnGeneralViewDetailsPure4Desc: function (obj) {
        var descriptionRelated = replaceTags(obj.descriptionRelated);
        var backlogNameRelated = replaceTags(obj.backlogNameRelated);
        var inputNameRelated = replaceTags(obj.inputNameRelated);
        var desc = replaceTags(obj.description);
        var st = "";
        try {

            if (backlogNameRelated) {
                st += '<u>' + replaceTags(inputNameRelated) + " (" + replaceTags(backlogNameRelated) + ")</u>:<br>";
            }
            if (descriptionRelated) {
                var obj = descriptionRelated.split('%IN%');
                for (var n = 0; n < obj.length; n++) {
                    st += (obj[n]) ? '-' + replaceTags(this.fnline2Text(obj[n])) + "<br>" : "";
                }

            }
            if (backlogNameRelated) {
                st += "<hr style='margin:0px;'>";
            }

            var obj = desc.split('%IN%');
            var stln = "";
            for (var n = 0; n < obj.length; n++) {
                stln = (obj[n]) ? '-' + replaceTags(this.fnline2Text(obj[n])) + "<br>" + stln : stln;
            }

            st += stln;
        } catch (e) {
        }
        return st;
    },
    setUserStoryInputsInfoOnGeneralViewDetails: function (res) {
        $('#generalview_input_list  ').html('');
//        console.log(JSON.stringify(res))
        var obj = res.tbl[0].r;
        for (var i = 0; i < obj.length; i++) {
            var inputName = obj[i].inputType === 'OUT'
                    ? obj[i].inputName + " (Output)"
                    : obj[i].inputName;
            var tr = $('<tr></tr>').append($('<td></td>').html((i + 1)));
            tr.append($('<td></td>').html(inputName));
            tr.append($('<td></td>').html(obj[i].tableName));
            tr.append($('<td></td>').html(this.setUserStoryInputDescriptionsInfoOnGeneralView(obj[i].id)));
            $('#generalview_input_list  ').append(tr);
        }

    },
    setUserStoryInputDescriptionsInfoOnGeneralView: function (id) {
        var st = "";
        if (!id) {
            return st;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkInputId = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetInputDescriptionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                st = that.setUserStoryInputDescriptionsInfoOnGeneralViewDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
        return st
    },
    setUserStoryInputDescriptionsInfoOnGeneralViewDetails: function (res) {
        var st = "";
        var obj = res.tbl[0].r;
        for (var i = 0; i < obj.length; i++) {
            st += "- " + obj[i].description + "<br>";
        }
        return st;
    }
}






function Notification(msg) {
    this.msg = msg;
}

Notification.prototype = {
    getNotificationList: function () {
        $('#nav_history_overal_count').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetNotificationListByUser",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res));
                that.getNotificationListDetails(res);
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    getNotificationListDetails: function (res) {
        $('#notificationList_listresult').html("");
        var obj = res.tbl[0].r;
        var table = $('<table style="width:100%" border=1></table>');
        for (var n = 0; n < obj.length; n++) {
            o = obj[n];
            var td1 = '<a href="#" onclick="new Notification().redirectToDetails(\'' +
                    o.fkProjectId + "','" + o.fkBacklogId + '\')">' + replaceTags(o.backlogName)
                    + '<br>' + replaceTags(o.projectName) + "</a>"
            td1 += o.isReviewed === '1' ? "" : " <span style='color:red;font-size:11px'><b>(new)</b></span>";
            var tr = $('<tr></tr>')
                    .append($('<td style="padding:4px;"></td>').html(td1))
//                    .append($('<td style="padding:4px;"></td>').html(this.genUSLine(o)))
                    .append($('<td style="padding:4px;font-size:12px;"></td>').html(this.genHistoryLine(o)));
            table.append(tr);
        }
        $('#notificationList_listresult').html(table);
    },
    setTime: function () {
//        setInterval(function () {
//            try {
//                new Notification().getNotificationCount();
//            } catch (e) {
//            }
//        }, 60000);
    },
    genHistoryLine: function (o) {
        var filen = (o.historyTellerImage) ? o.historyTellerImage : new User().getDefaultUserprofileName();
        var st = "<img style=\"padding:5px;float:left;width:34px;heigh:34px;\" class=\"figure-img img-fluid rounded-circle\"   src=\""
                + fileUrl(filen) + "\" alt=\"" + replaceTags(o.historyTellerName) + "\">";
        st += "<b style=\"color:red!important;font-size:14px;\">" + "  " + history_type[o.historyType] + "</b> by <i><b>"
                + o.historyTellerName + " </b><span>" + Utility.convertDate(o.historyDate) + ", " + Utility.convertTime(o.historyTime)
                + "</span></i>, </br> " + replaceTags(o.historyBody);
        return st;
    },
    genUSLine: function (o) {
        var isSourced = o.isSourced === '1'
                ? "<i class=\"fa fa-cube\" style=\"color: darkred;\">&nbsp;</i>"
                : o.fkSourcedId.length > 0
                ? '<i class=\"fa fa-bandcamp\" style=\"color: green;\" title="' + o.sourcedName + '">&nbsp;</i>'
                : "";
        var countLine = o.isSourced === '1' && o.taskCount > 0
                ? '&nbsp;&nbsp; <i class="fa fa-tasks" style="font-size:10px;color:#555555;"></i><span style="font-size:10px; "> (' + o.taskCount + ')</span>'
                : " ";
        countLine += o.isSourced === '1' && o.inputCount > 0
                ? '&nbsp;&nbsp; <i class="fa fa-inbox" style="font-size:10px;color:#555555;"></i><span style="font-size:10px; "> (' + o.inputCount + ')</span>'
                : "";
        countLine += o.commentCount > 0
                ? '&nbsp;&nbsp; <i class="fa fa-comment" style="font-size:10px;color:#555555;"></i><span style="font-size:10px; "> (' + o.commentCount + ')</span>'
                : "";
        var isFromCustomer = o.isFromCustomer === '1'
                ? "<i class=\"fa fa-ticket\" style=\"color: blue;\">&nbsp;</i>"
                : "";
        var td2 = '<span class="isSourced">';
        td2 += isSourced;
        td2 += '</span>';
        td2 += '<span class="isFromCustomer">';
        td2 += isFromCustomer;
        td2 += '</span>';
        td2 += '<a style="padding-bottom:12px;" class="us-list-item">';
        td2 += replaceTags(o.backlogName);
        td2 += '</a>';
        td2 += '<br>';
        td2 += '<span class="backlog-status">';
        td2 += '<div class="us-list-item   us-item-status-' + o.backlogStatus + '">' + o.backlogStatus + '</div>';
        td2 += '</span>'
        td2 += '<span class="us-list-item us-priority">&nbsp; ' + o.priority + ' </span>';
        td2 += '<span class="us-list-item   us-item-executor">&nbsp;' + o.createdByName + ' </span>';
        td2 += '<span class="us-list-item   us-item-date">&nbsp;' + Utility.convertDate(o.createdDate) + ' </span>';
        td2 += countLine;
        return td2;
    },
    redirectToDetails: function (projectId, backlogId) {
        if (projectId.length === 0 || backlogId.length === 0) {
            return;
        }

        $('#notificationList').modal('hide');
        Analytics.hide();
        global_var.mainview = 'body';
        global_var.current_backlog_id = backlogId;
        global_var.current_view = 'detailed';
        Utility.addParamToUrl("current_view", global_var.current_view);
        Utility.addParamToUrl("current_backlog_id", global_var.current_backlog_id);
        Utility.addParamToUrl("current_project_id", global_var.current_project_id);
        new UserStory().clearAndShowAll(this)


        if (global_var.current_project_id === projectId) {
            new UserStory().load();
        } else {
//            $("#projectList option[value='"+projectId+"']").prop('selected', true);
            $('#projectList').val(projectId).change();
        }


    },
    getNotificationCount: function () {
        $('#nav_history_overal_count').html('');
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetNotificationCountByUser",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    if (res.tbl[0].r[0].notificationCount > 0) {
                        $('#nav_history_overal_count').html(res.tbl[0].r[0].notificationCount);
                    }
                } catch (err) {

                }
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    showInComponent: function (cid) {
        $('#' + cid).next('p').remove();
        $('#' + cid).after('<p class="err-msg" style="color:red">' + this.msg + '</p>');
    },
    eraseInComponent: function (cid) {
        $('#' + cid).closest("form").find(".err-msg").each(function () {
            $(this).remove();
        });
    },
    clearField: function (formid) {
        $('#' + formid).find('.msg-clear').each(function (e) {
            $(this).val('');
            $(this).next('p').remove();
        });
    }
}


function Label(lbl) {
    this.label = lbl;
    this.name = "";
    this.color = "";
    this.closeLabel = "";
    this.modalId = "insertNewLabel";
    this.id = "";
}

Label.prototype = {
    getId: function () {
        return this.id;
    },
    setId: function (arg) {
        this.id = arg;
    },
    getName: function () {
//        return $('#labelname').val();
        return this.name;
    },
    setName: function (arg) {
        this.name = arg;
    },
    getColor: function () {
//        return $('#labelcolor').val();
        return this.color;
    },
    setColor: function (arg) {
        this.color = arg;
    },
    getCloseLabel: function () {
        return 'closeAfterInsertLabel';
//        return this.closeLabel;
    },
    setCloseLabel: function (arg) {
        this.closeLabel = arg;
    },
    getModalId: function () {
        return this.modalId;
    },
    addLabelController4Insert: function () {
        var f = false;
        if (this.getName().trim().length == 0) {
            new Notification("Label name is not entered!").showInComponent('labelname');
            f = true;
        } else if (this.getColor().trim().length == 0) {
            new Notification("Label color is not entered!").showInComponent('labelcolor');
            f = true;
        }

        if (f) {
            throw "Label info is not entered!";
        }
    },
    addLabelController4Update: function () {
        var f = false;
        if (this.getName().trim().length == 0) {
            new Notification("Label name is not entered!").showInComponent('u_labelname');
            f = true;
        } else if (this.getColor().trim().length == 0) {
            new Notification("Label color is not entered!").showInComponent('u_labelcolor');
            f = true;
        }

        if (f) {
            throw "Label info is not entered!";
        }
    },
    insert: function () {
        if (!global_var.current_project_id) {
            Toaster.showError("Please choose project first!");
            return;
        }
        var ismenu = '0';
        var id = 'insertLabelUseAsMenu';
        var checked = $("input[id=" + id + "]:checked").length;
        if (checked === 1) {
            ismenu = 1;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.name = this.getName();
        json.kv.color = this.getColor();
        json.kv.isMenu = ismenu;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                new Notification("").clearField('insertNewLabel');
                if ($('#closeAfterInsertLabel').is(':checked')) {
                    $('#insertNewLabel').modal('hide');
                }
                that.load();
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    updateInfo: function () {
        var ismenu = '0';
        var id = 'u_insertLabelUseAsMenu';
        var checked = $("input[id=" + id + "]:checked").length;
        if (checked === 1) {
            ismenu = 1;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = this.getId();
        json.kv.name = this.getName();
        json.kv.color = this.getColor();
        json.kv.isMenu = ismenu;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                Toaster.showError("successfull");
                new Notification("").clearField('updateLabel');
                closeModal('updateLabel');
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    addValue4Insert: function () {
        this.setName($('#insertNewLabel').find('#labelname').val());
        this.setColor($('#insertNewLabel').find('#labelcolor').val());
    },
    addValue4Update: function () {
        this.setName($('#u_labelname').val());
        this.setColor($('#u_labelcolor').val());
        this.setId($('#u_labelid').val());
    },
    add: function () {
        this.addValue4Insert();
        this.addLabelController4Insert();
        this.insert();
        this.load();
    },
    update: function (id) {
//        this.setId(id);
        this.addValue4Update();
        this.addLabelController4Update();
        this.updateInfo();
        this.load();
    },
    load: function () {
        $('#tasklabellist').html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetLabelList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res
                try {
                    that.setLabelListTable(res);
                } catch (e) {
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setLabelList: function (res) {
        $('#tasklabellist').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#tasklabellist').append($("<option></option>")
                    .attr("value", obj[n].name)
                    .attr("style", "color:" + obj[n].color)
                    .text(obj[n].name));
        }
    },
    delete: function (id) {
        if (confirm("Are you sure?")) {
            if (!id) {
                return;
            }
            var json = {
                kv: {}};
            json.kv.id = id;
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmDeleteLabel",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: false,
                success: function (res) {
//                console.log(JSON.stringify(res));
                    that.load();
                },
                error: function () {
                    Toaster.showError(('somethingww'));
                }
            });
        }

    },
    select: function (id) {
        if (!id) {
            return;
        }
        var json = {
            kv: {}};
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetLabelList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                console.log(JSON.stringify(res));
                that.setLabelInfo4Update(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setLabelInfo4Update: function (res) {
        var obj = res.tbl[0].r[0];
        $('#u_labelname').val(obj.name);
        $('#u_labelcolor').val(obj.color);
        $('#u_labelid').val(obj.id);
        if (obj.isMenu === '1') {
            $('#u_insertLabelUseAsMenu').prop('checked', true);
        } else {
            $('#u_insertLabelUseAsMenu').prop('checked', false);
        }
    },
    setLabelListTable: function (res) {
        $('#tasklabellist').html("");
        var obj = res.tbl[0].r;
        var tbl = $('<table></table>').attr("class", 'lbl-list-table');
        var tr1 = $('<tr class="lbl-list-tr"></tr>');
        tr1.append($('<td class="lbl-list-td"></td>').html('<input class="us-filter-checkbox-label"  type="checkbox" value="all">'));
        tr1.append($('<td class="lbl-list-td"></td>').html('<b>All</b>').attr("class", "lbl-item"));
        tbl.append(tr1);
        for (var n = 0; n < obj.length; n++) {
            var tr = $('<tr class="lbl-list-tr"></tr>');
            tr.append($('<td class="lbl-list-td"></td>')
                    .html('<input type="checkbox" class="us-filter-checkbox-label" value="' + obj[n].id + '">')
                    .attr('id', obj[n].id));
            tr.append($('<td class="lbl-list-td"></td>')
                    .append(obj[n].isMenu === '1' ? "(Menu)-" : "")
                    .append(replaceTags(obj[n].name) + " (<b>" + obj[n].backlogCount + "</b>)")
                    .attr("class", "lbl-item")
                    .attr("style", "color:" + obj[n].color));
            var td = $('<td class="lbl-list-td"></td>')
                    .append($('<i class="fa fa-edit lbl-action"  style="display: none;" ></i>')
                            .attr('id', obj[n].id)
                            .attr('data-toggle', "modal")
                            .attr("onclick", "new Label().select('" + obj[n].id + "')")
                            .attr("data-target", "#updateLabel"));
            td.append($('<i class="fa fa-trash lbl-action"  style="display: none;" ></i>')
                    .attr('id', obj[n].id)
                    .attr("onclick", "new Label().delete('" + obj[n].id + "')"));
            tr.append(td);
            tr.hover(function () {
                $(this).find('.lbl-action').show();
            }, function () {
                $(this).find('.lbl-action').hide();
            });
            tbl.append(tr);
        }

        $('#tasklabellist').html(tbl);
    },
}

var Priority = {
    load: function () {
        Priority.setLabelListTable();
    },
    setLabelListTable: function (res) {
        $('#us_filter_priority_list').html("");
        var tbl = $('<table></table>').attr("class", 'lbl-list-table');
        var tr = $('<tr class="lbl-list-tr"></tr>');
        tr.append($('<td class="lbl-list-td"></td>'));
        tbl.append(tr);
        var tr1 = $('<tr class="lbl-list-tr"></tr>');
        for (var n = 1; n <= 10; n++) {
            tr1.append($('<td class="lbl-list-td"></td>')
                    .html('<input class="us-filter-checkbox-priority" type="checkbox" value="' + n + '"> ' + n));
        }
        tbl.append(tr1);
        $('#us_filter_priority_list').html(tbl);
    },
}

function isCloseAfterInsertChecked(id) {
    var checked = $("input[id=" + id + "]:checked").length;
    if (checked === 0) {
        return false;
    } else {
        return true;
    }
}

function  closeModal(id, modalId) {
    if (isCloseAfterInsertChecked(id))
    {
        $('#' + modalId).modal('hide');
    }
}

function  closeModal(modalId) {
    $('#' + modalId).modal('hide');
}



function Sprint(lbl) {
    this.label = lbl;
    this.name = "";
    this.color = "";
    this.closeLabel = "";
    this.startDate = "";
    this.endDate = "";
    this.projectId = "";
    this.description = "";
    this.modalId = "insertNewSprint";
    this.id = "";
}

Sprint.prototype = {
    getStartDate: function () {
        return this.startDate;
    },
    setStartDate: function (arg) {
        this.startDate = arg;
    },
    getEndDate: function () {
        return this.endDate;
    },
    setEndDate: function (arg) {
        this.endDate = arg;
    },
    getProjectId: function () {
        return this.projectId;
    },
    setProjectId: function (arg) {
        this.projectId = arg;
    },
    getDescription: function () {
        return this.description;
    },
    setDescription: function (arg) {
        this.description = arg;
    },
    getId: function () {
        return this.id;
    },
    setId: function (arg) {
        this.id = arg;
    },
    getName: function () {
//        return $('#labelname').val();
        return this.name;
    },
    setName: function (arg) {
        this.name = arg;
    },
    getColor: function () {
//        return $('#labelcolor').val();
        return this.color;
    },
    setColor: function (arg) {
        this.color = arg;
    },
    getCloseLabel: function () {
        return 'closeAfterInsertLabel';
//        return this.closeLabel;
    },
    setCloseLabel: function (arg) {
        this.closeLabel = arg;
    },
    getModalId: function () {
        return this.modalId;
    },
    addController4Insert: function () {
        var f = false;
        if (this.getName().trim().length == 0) {
            new Notification("Sprint name is not entered!").showInComponent('sprintname');
            f = true;
        }
        if (this.getColor().trim().length == 0) {
            new Notification("Sprint color is not entered!").showInComponent('sprintColor');
            f = true;
        }
        if (this.getStartDate().trim().length == 0) {
            new Notification("Start Date is not entered!").showInComponent('insertNewSprint_startdate');
            f = true;
        }
        if (this.getEndDate().trim().length == 0) {
            new Notification("End Date is not entered!").showInComponent('insertNewSprint_enddate');
            f = true;
        }

        var startDt = document.getElementById("insertNewSprint_startdate").value;
        var endDt = document.getElementById("insertNewSprint_enddate").value;
        if ((new Date(startDt).getTime() > new Date(endDt).getTime()))
        {
            new Notification("End Date should be greater than Start Date!").showInComponent('insertNewSprint_enddate');
            f = true;
        }

        if (f) {
            throw "Label info is not entered!";
        }
    },
    addController4Update: function () {
        var f = false;
        if (this.getName().trim().length == 0) {
            new Notification("Sprint name is not entered!").showInComponent('u_sprintname');
            f = true;
        }
        if (this.getColor().trim().length == 0) {
            new Notification("Sprint color is not entered!").showInComponent('u_sprintColor');
            f = true;
        }
        if (this.getStartDate().trim().length == 0) {
            new Notification("Start Date is not entered!").showInComponent('updateSprint_startdate');
            f = true;
        }
        if (this.getEndDate().trim().length == 0) {
            new Notification("End Date is not entered!").showInComponent('updateSprint_enddate');
            f = true;
        }

        var startDt = document.getElementById("updateSprint_startdate").value;
        var endDt = document.getElementById("updateSprint_enddate").value;
        if ((new Date(startDt).getTime() > new Date(endDt).getTime()))
        {
            new Notification("End Date should be greater than Start Date!").showInComponent('updateSprint_enddate');
            f = true;
        }

        if (f) {
            throw "Label info is not entered!";
        }
    },
    insert: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.sprintName = this.getName();
        json.kv.sprintColor = this.getColor();
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.sprintStartDate = GetConvertedDate('insertNewSprint_startdate');
        json.kv.sprintEndDate = GetConvertedDate('insertNewSprint_enddate');
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewSprint",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                Toaster.showError("successfull");
                new Notification("").clearField('insertNewSprint');
                if ($('#closeAfterInsertSprint').is(":checked")) {
                    $('#insertNewSprint').modal('hide');
                }
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    updateInfo: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = this.getId();
        json.kv.sprintName = this.getName();
        json.kv.sprintColor = this.getColor();
        json.kv.sprintStartDate = GetConvertedDate('updateSprint_startdate');
        json.kv.sprintEndDate = GetConvertedDate('updateSprint_enddate');
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateSprint",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                Toaster.showError("successfull");
                new Notification("").clearField('updateSprint');
                closeModal('updateSprint');
            },
            error: function () {
//                Toaster.showError("error");
            }
        });
    },
    addValue4Insert: function () {
        this.setName($('#sprintname').val());
        this.setColor($('#sprintColor').val());
        this.setDescription($('#sprintDescription').val());
        this.setStartDate($('#insertNewSprint_startdate').val());
        this.setProjectId($('#sprintProjectId').val());
        this.setEndDate($('#insertNewSprint_enddate').val());
    },
    addValue4Update: function () {
        this.setId($('#u_sprintId').val());
        this.setName($('#u_sprintname').val());
        this.setColor($('#u_sprintColor').val());
        this.setDescription($('#u_sprintDescription').val());
        this.setStartDate($('#updateSprint_startdate').val());
        this.setProjectId($('#u_sprintProjectId').val());
        this.setEndDate($('#updateSprint_enddate').val());
    },
    add: function () {
        this.addValue4Insert();
        this.addController4Insert();
        this.insert();
        this.load();
    },
    update: function (id) {
//        this.setId(id);
        this.addValue4Update();
        this.addController4Update();
        this.updateInfo();
        this.load();
    },
    load: function () {
        $('#sprintlist').html("");
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSprintList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res));
                try {
                    that.setSprintListTable(res);
                } catch (e) {
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setSprintList: function (res) {
        $('#sprintlist').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#sprintlist').append($("<option></option>")
                    .attr("value", replaceTags(obj[n].name))
                    .attr("style", "color:" + obj[n].color)
                    .text(replaceTags(obj[n].name)));
        }
    },
    delete: function (id) {
        if (confirm("Are you sure?")) {
            if (!id) {
                return;
            }
            var json = {
                kv: {}};
            json.kv.id = id;
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmDeleteSprint",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: false,
                success: function (res) {
//                console.log(JSON.stringify(res));
                    that.load();
                },
                error: function () {
                    Toaster.showError(('somethingww'));
                }
            });
        }

    },
    select: function (id) {
        if (!id) {
            return;
        }
        var json = {
            kv: {}};
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSprintList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res));
                that.setSprintInfo4Update(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setSprintInfo4Update: function (res) {
        var obj = res.tbl[0].r[0];
        $('#u_sprintname').val(replaceTags(obj.sprintName));
        $('#u_sprintColor').val(obj.sprintColor);
        $('#u_sprintId').val(obj.id);
        $('#u_sprintDescription').val(obj.sprintDescription);
        SetConvertedDate('updateSprint_startdate', obj.sprintStartDate);
        SetConvertedDate('updateSprint_enddate', obj.sprintEndDate);
//        $('#u_sprintEndDate').val(SetConvertedDate(obj.sprintEndDate));
        $('#u_sprintProjectId').val(obj.fkProjectId);
    },
    setSprintListTable: function (res) {
        $('#sprintlist').html("");
        var obj = res.tbl[0].r;
        var tbl = $('<table></table>').attr("class", 'lbl-list-table');
        var tr1 = $('<tr class="lbl-list-tr"></tr>');
        tr1.append($('<td class="lbl-list-td"></td>').html('<input class="us-filter-checkbox-sprint"  type="checkbox" value="all">'));
        tr1.append($('<td class="lbl-list-td"></td>').html('<b>All</b>').attr("class", "lbl-item"));
        tbl.append(tr1);
        for (var n = 0; n < obj.length; n++) {
            var tr = $('<tr class="lbl-list-tr"></tr>');
            var d = ((obj[n].sprintStartDate) && (obj[n].sprintEndDate))
                    ? " (<i>" + Utility.convertDate(obj[n].sprintStartDate) + "-" + Utility.convertDate(obj[n].sprintEndDate) + "</i>)"
                    : "";
            tr.append($('<td class="lbl-list-td"></td>')
                    .html('<input type="checkbox" class="us-filter-checkbox-sprint" value="' + obj[n].id + '">')
                    .attr('id', obj[n].id));
            tr.append($('<td class="lbl-list-td"></td>')
                    .append(replaceTags(obj[n].sprintName))
                    .append(d)
                    .append(" (<b>" + obj[n].backlogCount + "</b>)")
                    .attr("class", "lbl-item")
                    .attr("style", "color:" + obj[n].sprintColor));
            var td = $('<td class="lbl-list-td"></td>')
                    .append($('<i class="fa fa-edit lbl-action"  style="display: none;" ></i>')
                            .attr('id', obj[n].id)
                            .attr('data-toggle', "modal")
                            .attr("onclick", "new Sprint().select('" + obj[n].id + "')")
                            .attr("data-target", "#updateSprint"));
            td.append($('<i class="fa fa-trash lbl-action"  style="display: none;" ></i>')
                    .attr('id', obj[n].id)
                    .attr("onclick", "new Sprint().delete('" + obj[n].id + "')"));
            tr.append(td);
            tr.hover(function () {
                $(this).find('.lbl-action').show();
            }, function () {
                $(this).find('.lbl-action').hide();
            });
            tbl.append(tr);
        }
        $('#sprintlist').html(tbl);
    },
}



function Project() {
    this.msg = "";
}

Project.prototype = {
    getPurposeList: function () {
        var purpose = $('#addProject_showInputTab').is(":checked") ? '##showInputTab:1;' : "";
        purpose += $('#addProject_showStoryCardTab').is(":checked") ? '##showStoryCardTab:1;' : "";
        purpose += $('#addProject_showHistoryTab').is(":checked") ? '##showHistoryTab:1;' : "";
        purpose += $('#addProject_showTaskTab').is(":checked") ? '##showTaskTab:1;' : "";
        purpose += $('#addProject_showTestScenarioTab').is(":checked") ? '##showTestScenarioTab:1;' : "";
        return purpose;
    },
    insert: function () {
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
                that.insertAfterEvent();
                that.addNewProjectToList($('#txtProjectName').val(), res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    insertAfterEvent: function () {
        $('.newProjectInsert').hide();
        $('.newProjectInsertAfter').show();
    },
    addNewProjectToList: function (projectName, res) {
        if (!res.kv.id) {
            Toaster.showError("Project is not inserted!");
            return;
        }

        var st = "";
        st += '<tr class="pro-tr" pid="' + res.kv.id + '">';
        st += '<td>*</td>';
        st += '<td>' + replaceTags(projectName) + '</td>';
        st += '</tr>';
        $(st).insertBefore('#tblProjectList > tbody > tr:first');
        $('.pro-tr').first().click();
    },
    showAllProjectsAfterInsert: function (projectName, res) {
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#sprintlist').append($("<option></option>")
                    .attr("value", replaceTags(obj[n].name))
                    .attr("style", "color:" + obj[n].color)
                    .text(replaceTags(obj[n].name)));
        }


    },
    searchProject: function (e) {
        $('#tblProjectList > tbody').html('');
        var st = '%%' + $(e).val() + '%%';
        this.loadProject(st);
    },
    loadProject: function (pname) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.projectName = pname;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectList4Modal",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                var st = that.generateTableBody4Project(res);
                $('#tblProjectList > tbody').html(st);
                $('.pro-tr').first().click();
                new Project().loadUserList4Combo();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    clearProjectStatFields: function () {
        $('#overal_us_count_overall').html('0');
        $('#overal_us_count_new').html('0');
        $('#overal_us_count_ongoing_percentage').html('0');
        $('#overal_us_count_new_percentage').html('0');
        $('#overal_us_count_ongoing').html('0');
        $('#overal_us_count_closed').html('0');
        $('#overal_us_count_closed_percentage').html('0');
//        $('#overal_us_count_ticket').html('');
        $('#overal_us_count_sourced').html('0');
        $('#overal_us_count_bound').html('0');
        $('#overal_us_count_initial').html('0');
    },
    getProjectStatList: function () {
        this.clearProjectStatFields();
        if (!global_var.current_project_id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectCountList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                try {
                    var o = res.tbl[0].r[0];
                    $('#overal_us_count_overall').html(o.overalCount);
                    $('#overal_us_count_new').html(o.newCount);
                    $('#overal_us_count_new_percentage').html(parseFloat((parseFloat(o.newCount) * 100) / parseFloat(o.overalCount)).toFixed(2));
                    $('#overal_us_count_ongoing_percentage').html(parseFloat(parseFloat((o.ongoingCount) * 100) / parseFloat(o.overalCount)).toFixed(2));
                    $('#overal_us_count_ongoing').html(o.ongoingCount);
                    $('#overal_us_count_closed').html(o.closedCount);
                    $('#overal_us_count_closed_percentage').html(parseFloat((parseFloat(o.closedCount) * 100) / parseFloat(o.overalCount)).toFixed(2));
                    $('#overal_us_count_ticket').html(o.ticketCount);
                    $('#overal_us_count_sourced').html(o.sourcedCount);
                    $('#overal_us_count_bound').html(o.boundCount);
                    $('#overal_us_count_initial').html(o.initialCount);
                } catch (e) {
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadMainProjectList: function () {
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
            success: function (res) {
                that.generateTableBody4MainProject(res);
                hideProgress();
            },
            error: function () {
                Toaster.showGeneralError();
            }
        });
    },
    generateTableBody4MainProject: function (res) {
        var obj = res.tbl[0].r;
        var urlVal = Utility.getParamFromUrl("current_project_id");
        for (var n = 0; n < obj.length; n++) {
            var o = $('<option></option')
                    .attr('value', obj[n].id)
                    .html(obj[n].projectName);
            if (urlVal === obj[n].id) {
                o.attr("selected", "selected");
            }
            $('#projectList').append(o);
        }
        global_var.current_project_id = $('#projectList').first().val();
        Utility.addParamToUrl('current_project_id', global_var.current_project_id);
//        if (global_var.mainview === 'body' || ) {
        $('#projectList').first().change();
//        }
    },
    generateTableBody4Project: function (res) {

        var st = "";
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                st += '<tr class="pro-tr"  pid="' + obj[n].id + '" pdesc="'
                        + replaceTags(obj[n].description) + '" pname="' + replaceTags(obj[n].projectName) + '">';
                st += '<td>' + (n + 1) + '</td>';
                st += '<td>' + replaceTags(obj[n].projectName) + '</td>';
                st += '</tr>';
            }
        } catch (e) {
        }
        st += '<tr">';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>';
        return st;
    },
    showProjectDetails: function (e) {
        var pid = $(e).attr("pid");
        this.showProjectDetailsMain(e);
        this.selectProjectPermission(pid);
        this.insertAfterEvent();
    },
    showProjectDetailsMain: function (e) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $(e).attr("pid");
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {

                $('#txtProjectId').val(res.tbl[0].r[0].id);
                $('#txtProjectName').val(replaceTags(res.tbl[0].r[0].projectName));
                $('#txtProjectCode').val(replaceTags(res.tbl[0].r[0].projectCode));
                $('#txtProjectDescription').val(replaceTags(res.tbl[0].r[0].description));
                that.check4PermissionInProject(res);
            }

        });
    },
    selectProjectPermission: function (pid) {
        if (pid.trim().length == 0) {
            Toaster.showError('Project ID is empty!');
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = pid;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res))
                $('#tblProjectInvolvedUser > tbody').html("");
                var st = that.setProjectPermissionList(res);
                $('#tblProjectInvolvedUser > tbody').html(st);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setProjectPermissionList: function (res) {

        var st = "";
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                var del = global_var.current_user_type === 'A' || global_var.current_user_type === 'M'
                        ? '<a href="#" onclick="new Project().deleteUser(this,\'' + obj[n].id + '\')"><i class="fa fa-trash" "></i></a>'
                        : "";
                st += '<tr>';
                st += '<td>' + replaceTags(obj[n].userName) + '</td>';
                st += '<td>' + del + '</td>';
                st += '</tr>';
            }
        } catch (err) {
        }

        st += '<tr>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>'
        return st;
    },
    toggleProject: function (e) {

        global_var.current_project_id = $(e).val();
        Utility.addParamToUrl('current_project_id', global_var.current_project_id);
        new UserStory().loadDetailsOnProjectSelect();
        new UserStory().loadInputDetailsOnProjectSelect();
        new UserStory().loadInputDescDetailsOnProjectSelect();
        new UserStory().loadDependencyOnProjectSelect();
        new UserStory().loadSUS4Relation4Section();
        new UserStory().loadBacklogLabelOnProjectSelect();
        new UserStory().load();
        new Label().load();
        new Sprint().load();
        this.getProjectStatList();
//        //add filter section
        new UserStory().genUsFilterCreatedBy();
        new UserStory().genUsFilterTaskTypes();
//        this.showProjectDetailsMain4Permission(global_var.current_project_id);
//        hideProgress();



    },
    showProjectDetailsMain4Permission: function (projectId) {
        if (!projectId) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = projectId;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectInfoById",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.check4PermissionInProjectToggle(res);
            }

        });
    },
    check4PermissionInProject: function (res) {
        var showInput = GetTagLineVal(res.tbl[0].r[0].purpose, 'showInputTab');
        var showStoryCard = GetTagLineVal(res.tbl[0].r[0].purpose, 'showStoryCardTab');
        var showTask = GetTagLineVal(res.tbl[0].r[0].purpose, 'showTaskTab');
        var showHistory = GetTagLineVal(res.tbl[0].r[0].purpose, 'showHistoryTab');
        var showTestScenario = GetTagLineVal(res.tbl[0].r[0].purpose, 'showTestScenarioTab');
        if (showInput === '1') {
            $('#addProject_showInputTab').prop('checked', true);
        } else {
            $('#addProject_showInputTab').prop('checked', false);
        }
        if (showStoryCard === '1') {
            $('#addProject_showStoryCardTab').prop('checked', true);
        } else {
            $('#addProject_showStoryCardTab').prop('checked', false);
        }
        if (showTask === '1') {
            $('#addProject_showTaskTab').prop('checked', true);
        } else {
            $('#addProject_showTaskTab').prop('checked', false);
        }
        if (showHistory === '1') {
            $('#addProject_showHistoryTab').prop('checked', true);
        } else {
            $('#addProject_showHistoryTab').prop('checked', false);
        }
        if (showTestScenario === '1') {
            $('#addProject_showTestScenarioTab').prop('checked', true);
        } else {
            $('#addProject_showTestScenarioTab').prop('checked', false);
        }


    },
    check4PermissionInProjectToggle: function (res) {
        var showInput = GetTagLineVal(res.tbl[0].r[0].purpose, 'showInputTab');
        var showStoryCard = GetTagLineVal(res.tbl[0].r[0].purpose, 'showStoryCardTab');
        var showTask = GetTagLineVal(res.tbl[0].r[0].purpose, 'showTaskTab');
        var showHistory = GetTagLineVal(res.tbl[0].r[0].purpose, 'showHistoryTab');
        var showTestScenario = GetTagLineVal(res.tbl[0].r[0].purpose, 'showTestScenarioTab');
        var firstActiveTab = '';
        if (showInput === '1') {
            firstActiveTab = firstActiveTab.length === 0 ? "ipo" : firstActiveTab;
//            console.log('firstActiveTab=' + firstActiveTab)
            $('#us-submenu-ipo').show();
            $('#smb-details-ipo').show()
        } else {
            global_var.current_us_submenu = global_var.current_us_submenu === 'ipo'
                    ? ""
                    : global_var.current_us_submenu;
            $('#us-submenu-ipo').hide();
            $('#smb-details-ipo').hide();
        }

        if (showTask === '1') {
            firstActiveTab = firstActiveTab.length === 0 ? "tasks" : firstActiveTab;
            console.log('firstActiveTab=' + firstActiveTab)
            $('#us-submenu-tasks').show();
            $('#smb-details-tasks').show()
        } else {
            global_var.current_us_submenu = global_var.current_us_submenu === 'tasks'
                    ? ""
                    : global_var.current_us_submenu;
            $('#us-submenu-tasks').hide();
            $('#smb-details-tasks').hide();
        }

        if (showStoryCard === '1') {
            firstActiveTab = firstActiveTab.length === 0 ? "generalview" : firstActiveTab;
            console.log('firstActiveTab=' + firstActiveTab)
            $('#us-submenu-generalview').show();
            $('#smb-details-generalview').show()
        } else {
            global_var.current_us_submenu = global_var.current_us_submenu === 'generalview'
                    ? ""
                    : global_var.current_us_submenu;
            $('#us-submenu-generalview').hide();
            $('#smb-details-generalview').hide();
        }

        if (showTestScenario === '1') {
            firstActiveTab = firstActiveTab.length === 0 ? "testscenario" : firstActiveTab;
//            console.log('firstActiveTab=' + firstActiveTab)
            $('#us-submenu-testscenario').show();
            $('#smb-details-testscenario').show()
        } else {
            global_var.current_us_submenu = global_var.current_us_submenu === 'testscenario'
                    ? ""
                    : global_var.current_us_submenu;
            $('#us-submenu-testscenario').hide();
            $('#smb-details-testscenario').hide();
        }

        if (showHistory === '1') {
            firstActiveTab = firstActiveTab.length === 0 ? "history" : firstActiveTab;
//            console.log('firstActiveTab=' + firstActiveTab)
            $('#us-submenu-history').show();
            $('#smb-details-history').show()
        } else {
            global_var.current_us_submenu = global_var.current_us_submenu === 'history'
                    ? ""
                    : global_var.current_us_submenu;
            $('#us-submenu-history').hide();
            $('#smb-details-history').hide();
        }

        firstActiveTab = global_var.current_us_submenu === ''
                ? firstActiveTab
                : global_var.current_us_submenu;
//        console.log('firstActiveTab=' + firstActiveTab)
        new UserStory().toggleSubmenu($('#us-submenu-' + firstActiveTab), firstActiveTab);
    },
    updateMain: function () {
        if ($('#txtProjectId').val().trim().length == 0) {
            Toaster.showError('Project is not selected!');
            return;
        }

        if ($('#txtProjectName').val().trim().length == 0) {
            Toaster.showError('Project Name is empty!');
            return;
        }

        var purpose = ""; //this.getPurposeList();

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#txtProjectId').val();
        json.kv.projectName = $('#txtProjectName').val();
        json.kv.projectCode = $('#txtProjectCode').val();
        json.kv.description = $('#txtProjectDescription').val();
        json.kv.purpose = purpose;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateProject",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                Toaster.showError('Operation is completed successfully.');
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadUserList4Combo: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.id = $('#txtProjectId').val();
//        json.kv.projectName = $('#txtProjectName').val();
//        json.kv.description = $('#txtProjectDescription').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetUserList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.addUserList4Combo(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addUserList4Combo: function (res) {
        $('#sbxUserList').html("");
        var obj = res.tbl[0].r;
        var st = "";
        for (var n = 0; n < obj.length; n++) {
            if (!obj[n].userPersonName)
                continue;
            var t = obj[n].liUserPermissionCode === 'A'
                    ? '<b style="color:red">-(A)</b>'
                    : obj[n].liUserPermissionCode === 'M'
                    ? '<b style="color:blue">-(M)</b>'
                    : "";
            $('#sbxUserList').append($('<option id="' + obj[n].id + '" ></option>')
                    .html(replaceTags(obj[n].userPersonName) + " " + t));
        }
    },
    addUserToProject: function () {
        if ($('#txtProjectId').val().trim().length == 0) {
            Toaster.showError('Project is not selected!');
            return;
        }

        if (this.isUserExistInPermission()) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = $('#txtProjectId').val();
        json.kv.fkUserId = $('#sbxUserList option:selected').attr("id");
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewProjectPermission",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.setUserToProjectListTable(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setUserToProjectListTable: function () {
        var st = '';
        st += '<tr>';
        st += '<td>' + $('#sbxUserList').val() + '</td>';
        st += '<td><a href="#" onclick="new Project().deleteUser(this,\'' + $('#sbxUserList option:selected').attr("id") + '\')">';
        st += '<i class="fa fa-trash" "></i>';
        st += '</a></td>';
        st += '</tr>';
        $(st).insertBefore('#tblProjectInvolvedUser > tbody > tr:first');
    },
    deleteUser: function (e, id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteProjectPermission",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $(e).closest('tr').remove();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    deleteProject: function () {
        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#txtProjectId').val();
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
                that.loadProject();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    isUserExistInPermission: function () {
        var f = false;
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = $('#txtProjectId').val();
        json.kv.fkUserId = $('#sbxUserList option:selected').attr("id");
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                if (res.tbl[0].r.length > 0) {
                    f = true;
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
        return f;
    },
    toggleFields: function () {
        $('.newProjectInsert').show();
        $('.newProjectInsertAfter').hide();
        $('#txtProjectName').val('');
        $('#txtProjectId').val('');
        $('#txtProjectDescription').val('');
        $('#tblProjectInvolvedUser > tbody').html("<tr><td></td><td></td></tr>")

        $('#addProject_showInputTab').prop('checked', true);
        $('#addProject_showStoryCardTab').prop('checked', true);
        $('#addProject_showTaskTab').prop('checked', true);
        $('#addProject_showHistoryTab').prop('checked', true);
        $('#addProject_showTestScenarioTab').prop('checked', true);
    },
    setEditable: function () {
        var checked = $("input[id=ifSetProEditable]:checked").length;
        if (checked == '1') {
            $('#btnDeleteProject').attr("style", "pointer-events:default");
        } else {
            $('#btnDeleteProject').attr('style', 'pointer-events:none');
        }
    }
}



function User() {
    this.msg = "";
    this.default_userprofile_name = "userprofile.png"
}

User.prototype = {
    forgetPwd: function (e) {
        new Notification().eraseInComponent('domainName');
        new Notification().eraseInComponent('password_message');
        if (!$('#domainName').val().trim()) {
            Toaster.showError("Please enter Domain.")
            return;
        }
        if (!$('#username').val().trim()) {
            Toaster.showError("Please enter Username.")
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.domain = $('#domainName').val().trim();
        json.kv.username = $('#username').val().trim();
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceCrForgetPassword",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {
                if (res.kv.err === '1') {
                    new Notification("Domain or Username is incorrect!").showInComponent('domainName');
                } else {
                    new Notification("Your password were sent to your mail address. Please check your mail address.").showInComponent('password_message');
                }
            },
            error: function () {
                new Notification("Domain or Username is incorrect!").showInComponent('domainName');
            }
        });
    },
    controller4insert: function () {
        var f = false;
        if ($.trim($('#txtUsername').val()).length == 0) {
            Toaster.showError("Please enter Username");
            f = true;
        } else if (!this.isUsernameValid()) {
            Toaster.showError("Username is not valid");
            f = true;
        } else if (this.isUsernameExist()) {
            Toaster.showError("Username is exist");
            f = true;
        } else if ($.trim($('#txtUsernamePasswd').val()).length == 0) {
            Toaster.showError("Please enter Password");
            f = true;
        } else if (!this.isPasswordValid()) {
            Toaster.showError("Password is not valid");
            f = true;
        } else if ($.trim($('#txtUserFulname').val()).length == 0) {
            Toaster.showError("Please enter User Fulname");
            f = true;
        } else if ($.trim($('#txtUserEmail').val()).length == 0) {
            Toaster.showError("Please enter User Email");
            f = true;
        } else if (!this.isEmailValid()) {
            Toaster.showError("Email is not valid");
            f = true;
        } else if ($.trim($('#cbUserType').val()).length == 0) {
            Toaster.showError("Please enter User Type");
            f = true;
        }
        if (f)
            throw "User error";
    },
    controller4Update: function () {
        var f = false;
        if ($.trim($('#txtUsername').val()).length === 0) {
            Toaster.showError("Please enter Username");
            f = true;
        } else if (!this.isUsernameValid()) {
            Toaster.showError("Username is not valid");
            f = true;
        } else if (this.isUsernameExist4Update()) {
            Toaster.showError("Username is exist");
            f = true;
        } else if ($("input[id=txtUsernamePasswdCheckbox]:checked").length === 1 &&
                $.trim($('#txtUsernamePasswd').val()).length == 0) {
            Toaster.showError("Please enter Password");
            f = true;
        } else if ($("input[id=txtUsernamePasswdCheckbox]:checked").length === 1 && !this.isPasswordValid()) {
            Toaster.showError("Password is not valid");
            f = true;
        } else if ($.trim($('#txtUserFulname').val()).length == 0) {
            Toaster.showError("Please enter User Fulname");
            f = true;
        } else if ($.trim($('#txtUserEmail').val()).length == 0) {
            Toaster.showError("Please enter User Email");
            f = true;
        } else if (!this.isEmailValid()) {
            Toaster.showError("Email is not valid");
            f = true;
        } else if ($.trim($('#cbUserType').val()).length == 0) {
            Toaster.showError("Please enter User Type");
            f = true;
        }
        if (f)
            throw "User error";
    },
    isUsernameValid: function () {
        var f = true;
        var username = $('#txtUsername').val();
        if (username === 'undefined' || !username) {
            $('#msgUsernameValid').hide();
            return f;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.value = username;
        json.kv.type = "username";
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceCrIsFieldValid",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {
//                console.log(JSON.stringify(res));
                if (res.kv.res === '0') {
                    f = false;
//                    return false;
                } else {
                    f = true;
//                    return true;
                }
            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
        return f;
    },
    getUsernameById: function (id) {
        if (!id) {
            Toaster.showError("User is not selected")
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetUserList4Combo",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {
                return res.tbl[0].r[0].username;
            },
            error: function () {
                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
    },
    isUsernameExist4Update: function () {
        var f = false;
        var username = $('#txtUsername').val();
        if (username === 'undefined' || !username) {
            return f;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#txtUserIdInInsertNewUser').val();
        json.kv.username = username;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrIsUsernameExist4Update",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {
                try {
                    if (res.err.length === 0) {
                        f = false;
                    } else {
                        f = true;
                    }
                } catch (e) {
                }

            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
        return f;
    },
    changePassword: function () {
        if ($('#changePassword_oldpwd').val().trim().length === 0) {
            Toaster.showError("Please enter Old Password");
            return;
        }
        if ($('#changePassword_newpwd').val().trim().length === 0) {
            Toaster.showError("Please enter New Password");
            return;
        }
        if ($('#changePassword_newpwdconfirm').val().trim().length === 0) {
            Toaster.showError("Please enter Confirm Old Password");
            return;
        }
        if (!this.isPasswordValid('changePassword_newpwd')) {
            Toaster.showError("Password is not valid");
            return;
        }

        if ($('#changePassword_newpwdconfirm').val() != $('#changePassword_newpwd').val()) {
            Toaster.showError("New Password doesn't match.");
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.currentPassword = $('#changePassword_oldpwd').val();
        json.kv.newPassword = $('#changePassword_newpwd').val();
        json.kv.confirmNewPassword = $('#changePassword_newpwdconfirm').val();
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrChangePassword",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {
                if (res.kv.error === '1') {
                    Toaster.showError(res.kv.res);
                } else {
                    Toaster.showError(res.kv.res);
                    $('#changeMyPasswordModal').modal('hide');
                }

            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
    },
    loadPersonalUser: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetAccountInfo",
            type: "POST",
            data: data,
            async: true,
            contentType: 'text/html',
            success: function (res) {
                var img = (res.tbl[0].r[0].userImage)
                        ? fileUrl(res.tbl[0].r[0].userImage)
                        : fileUrl(that.getDefaultUserprofileName());
                $('#userprofile_main_userimg').attr("src", img);
                $('#myAccountModal_imgUserProjectInsert').attr("src", img);
                $('#myAccountModal_txtUsername').val((res.tbl[0].r[0].username));
                $('#myAccountModal_txtUserFulname').val((res.tbl[0].r[0].userPersonName));
                $('#myAccountModal_txtUserEmail').val((res.tbl[0].r[0].email1));
            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
    },
    loadPersonalUserOnInit: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var data = JSON.stringify(json);
        that = this;
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetAccountInfo",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {

                var img = (res.tbl[0].r[0].userImage)
                        ? fileUrl(res.tbl[0].r[0].userImage)
                        : fileUrl(that.getDefaultUserprofileName());
                $('#userprofile_main_userimg').attr("src", img);
                $('#userprofile_main_id').html(replaceTags(res.tbl[0].r[0].userPersonName));
                $('#userprofile_main_domain').html(res.kv.currentDomain);
                global_var.current_domain = res.kv.currentDomain;
                global_var.current_user_type = res.tbl[0].r[0].liUserPermissionCode;
                Utility.addParamToUrl('current_user_type', global_var.current_user_type);
                that.removeTagsByPermission();
            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
    },
    removeTagsByPermission: function () {
        if (global_var.current_user_type === 'S') {
            $('.perm4').each(function (e) {
                $(this).remove();
            });
        } else if (global_var.current_user_type === 'A') {
            $('.perm4').each(function (e) {
                if (!$(this).data('perm').includes('admin')) {
                    $(this).remove();
                }
            });
        } else if (global_var.current_user_type === 'M') {
            $('.perm4').each(function (e) {
                if (!$(this).data('perm').includes('moderator')) {
                    $(this).remove();
                }
            });
        }
    },
    isUsernameExist: function () {
        var f = false;
        var username = $('#txtUsername').val();
        if (username === 'undefined' || !username) {
            return f;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.username = username;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceCrIsPersonalUsernameExist",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {
                if (res.kv.res === '0') {
                    f = false;
//                    return false;
                } else {
                    f = true;
//                    return true;
                }
            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
        return f;
    },
    isPasswordValid: function (id) {
        var ids = 'txtUsernamePasswd';
        if (id)
            ids = id;
        var f = false;
        var password = $('#' + ids).val();
        if (password === 'undefined' || !password) {
            return f;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.value = password;
        json.kv.type = "password";
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceCrIsFieldValid",
            type: "POST",
            data: data,
            async: false,
            contentType: 'text/html',
            success: function (res) {
                if (res.kv.res === '0') {
                    f = false;
                    return false;
                } else {
                    f = true;
                    return true;
                }
            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
        return f;
    },
    isEmailValid: function (id) {
        var ids = 'txtUserEmail';
        if (id) {
            ids = id;
        }
        var f = false;
        var email1 = $('#' + ids).val();
        if (email1 === 'undefined' || !email1) {
            return f;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.value = email1;
        json.kv.type = "email";
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/nasrv/serviceCrIsFieldValid",
            type: "POST",
            data: data,
            contentType: 'text/html',
            async: false,
            success: function (res) {
//                console.log(JSON.stringify(res));
                if (res.kv.res === '0') {
                    f = false;
                } else {
                    f = true;
                }
            },
            error: function () {
//                Toaster.showError("Something went wrong. This might be caused by duplicate table.");
            }
        });
        return f;
    },
    insertAPI: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.userPersonName = $('#txtUserFulname').val();
        json.kv.email1 = $('#txtUserEmail').val();
        json.kv.liUserPermissionCode = $('#cbUserType').val();
        json.kv.username = $('#txtUsername').val();
        json.kv.userImage = $('#userProfilePhoto4Insert').attr('fname');
        json.kv.password = $('#txtUsernamePasswd').val();
        json.kv.userStatus = $('#cbUserStatus').val();
        json.kv.jiraAccountId = $('#txtUserJiraAccountId').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrInsertNewUser",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                if (res.kv.error) {
                    Toaster.showError(res.kv.error);
                } else {
                    that.addNewUserToList(res);
                    that.afterInsertEvent(res);
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    insert: function () {
        this.controller4insert();
        this.uploadUserProfile4Insert();
    },
    uploadUserProfile4Insert: function () {
        if ($('#userProfilePhoto4Insert').val().trim().length > 0) {
            this.upload('userProfilePhoto4Insert');
        } else {
            this.insertAPI();
        }
    },
    uploadUserProfile4Update: function () {
        if ($('#userProfilePhoto4Insert').val().trim().length > 0) {
            this.upload4Update('userProfilePhoto4Insert');
        } else {
            this.updateMainDetail();
        }
    },
    uploadMyInfoChild: function () {
        if ($('#myAccountModal_userProfilePhoto4Insert').val().trim().length > 0) {
            this.upload4MyInfoChild('myAccountModal_userProfilePhoto4Insert');
        } else {
            this.updateMyInfoDetails();
        }
    },
    updateMyInfoDetails: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.userPersonName = $('#myAccountModal_txtUserFulname').val();
        json.kv.email1 = $('#myAccountModal_txtUserEmail').val();
        json.kv.userImage = $('#myAccountModal_userProfilePhoto4Insert').attr('fname');
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrUpdateMyAccountInfo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $('#myAccountModal').modal('hide');
                that.loadPersonalUserOnInit();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    upload4MyInfoChild: function (id) {
        var r = "";
        var that = this;
        var file_type = $('#' + id).attr("file_type");
        var files = document.getElementById(id).files;
        var file = files[0];
        var fileext = file['name'].split('.').pop();
        var fname = file['name'].split('.')[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                var s = that.uploadFile(fileext, btoa(binaryString), file_type, fname);
                $('#myAccountModal_userProfilePhoto4Insert').attr("fname", s);
                $('#myAccountModal_imgUserProjectInsert').attr("src", fileUrl(s));
                that.updateMyInfoDetails();
            };
            reader.readAsBinaryString(file);
        }
    },
    upload4Update: function (id) {
        var r = "";
        var that = this;
        var file_type = $('#' + id).attr("file_type");
        var files = document.getElementById(id).files;
        var file = files[0];
        var fileext = file['name'].split('.').pop();
        var fname = file['name'].split('.')[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                var s = that.uploadFile(fileext, btoa(binaryString), file_type, fname);
                $('#userProfilePhoto4Insert').attr("fname", s);
                $('#imgUserProjectInsert').attr("src", fileUrl(s));
                that.updateMainDetail();
            };
            reader.readAsBinaryString(file);
        }
    },
    upload: function (id) {
        var r = "";
        var that = this;
        var file_type = $('#' + id).attr("file_type");
        var files = document.getElementById(id).files;
        var file = files[0];
        var fileext = file['name'].split('.').pop();
        var fname = file['name'].split('.')[0];
        if (files && file) {
            var reader = new FileReader();
            var f = true;
            var i = 0;
            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                var s = that.uploadFile(fileext, btoa(binaryString), file_type, fname);
                $('#userProfilePhoto4Insert').attr("fname", s);
                $('#imgUserProjectInsert').attr("src", fileUrl(s));
                that.insertAPI();
            };
            reader.readAsBinaryString(file);
        }
    },
    uploadFile: function (fileext, file_base_64, file_type, file_name, file_type) {
//        console.log(file_base_64)
        var d = new Object();
        d.file_base_64 = file_base_64;
        d.file_extension = fileext;
        d.file_type = "image";
        d.file_name = file_name;
        d.resize = 1;
        d.scaleWidth = 288;
        d.scaleHeight = 288;
        conf = JSON.parse('{"kv":{}}');
        conf['kv'] = d;
        var dat = JSON.stringify(conf);
        var finalname = "";
        $.ajax({
            url: urlGl + "api/post/upload",
            type: "POST",
            data: dat,
            contentType: "application/json",
            async: false,
            success: function (data) {
                finalname = data.kv.uploaded_file_name;
            },
            error: function () {
            }
        });
        return finalname;
    }
    ,
    afterInsertEvent: function (res) {
        $('#txtUserIdInInsertNewUser').val(res.kv.id);
        $('.newUserInsert').hide();
        $('.newUserInsertAfter').show();
        $('#userProfilePhoto4Insert').val("");
        $('#txtUsernamePasswd').val('');
        $('#txtUsernamePasswdCheckbox').prop("checked", false).change();
    }
    ,
    beforeInsertEvent: function () {
        $('#txtUserIdInInsertNewUser').val("");
        $('#userProfilePhoto4Insert').prop("src", fileUrl(this.getDefaultUserprofileName()));
        $('#userProfilePhoto4Insert').attr("src", fileUrl(global_var.de));
        $('#userProfilePhoto4Insert').removeAttr("fname");
        $('#txtUsername').val("");
        $('#txtUsernamePasswd').val("");
        $('#txtUserFulname').val("");
        $('#txtUserEmail').val("");
        $('#txtUsernamePasswdCheckbox').prop("checked", "true").change();
        $('#imgUserProjectInsert').prop("src", fileUrl(this.getDefaultUserprofileName())).change();
        $('#tblUserInvolvedUser > tbody').html("<tr><td></td><td></td></tr>")
        $('.newUserInsert').show();
        $('.newUserInsertAfter').hide();
    }
    ,
    passwordChecked: function () {
        var checked = $("input[id=txtUsernamePasswdCheckbox]:checked").length;
        if (checked == 0) {
            $('#txtUsernamePasswd').attr("disabled", "false");
        } else {
            $('#txtUsernamePasswd').removeAttr("disabled");
        }
        $('#txtUsernamePasswd').val("");
    }
    ,
    addNewUserUnchechedEvent: function () {
        $('.newUserInsert').hide();
        $('.newUserInsertAfter').show();
    }
    ,
    addNewUserToList: function (res) {
        if (!res.kv.id) {
            Toaster.showError("User is not inserted!");
            return;
        }

        var st = "";
        st += '<tr class="user-tr" pid="' + res.kv.id + '">';
        st += '<td>*</td>';
        st += '<td>' + $('#txtUserFulname').val() + ' (' + $('#txtUsername').val() + ')' + '</td>';
        st += '</tr>';
        $(st).insertBefore('#tblUserList > tbody > tr:first');
        $('.user-tr').first().click();
    }
    ,
    showAllUsersAfterInsert: function (UserName, res) {
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#sprintlist').append($("<option></option>")
                    .attr("value", obj[n].name)
                    .attr("style", "color:" + obj[n].color)
                    .text(obj[n].name));
        }


    }
    ,
    searchUser: function (e) {
        $('#tblUserList > tbody').html('');
        var st = '%%' + $(e).val() + '%%';
        this.loadUser(st);
    }
    ,
    loadUser: function (pname) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.userPersonName = pname;
        json.kv.asc = "userPersonName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetUserList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                var st = that.generateTableBody4User(res);
                $('#tblUserList > tbody').html(st);
                $('.user-tr').first().click();
                new User().loadProjectList4Combo();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    getUserTypeTag: function (t) {
        return t === 'A'
                ? '<b style="color:red">-(A)</b>'
                : t === 'M'
                ? '<b style="color:blue">-(M)</b>'
                : "";
    },
    clearFilterLine: function () {
        $('#newUserNameSearch').val('');
        this.loadUser();
    },
    generateTableBody4User: function (res) {

        var st = "";
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                var status = obj[n].userStatus === 'A' ? ", <b>Active</b>" : ", <b>Passive</b>";
                var t = this.getUserTypeTag(obj[n].liUserPermissionCode);
                st += '<tr class="user-tr"  pid="' + obj[n].id + '" pname="' + replaceTags(obj[n].username) + '">';
                st += '<td>' + (n + 1) + '</td>';
                st += '<td>' + obj[n].userPersonName + ' (' + replaceTags(obj[n].username) + status + ')' + t + ' </td>';
                st += '</tr>';
            }
        } catch (e) {
        }
        st += '<tr">';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>';
        return st;
    }
    ,
    showUserDetails: function (e) {
        var pid = $(e).attr("pid");
        this.showUserDetailsMain(e);
        this.selectUserPermission(pid);
    }
    ,
    showUserDetailsMain: function (e) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $(e).attr("pid");
        json.kv.asc = "userPersonName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetUserList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                var src = that.getDefaultUserprofileName();
                if (res.tbl[0].r[0].userImage.length > 0)
                    src = res.tbl[0].r[0].userImage;
                $('#txtUserIdInInsertNewUser').val(res.tbl[0].r[0].id);
                $('#txtUsername').val(res.tbl[0].r[0].username);
                $('#txtUserFulname').val(res.tbl[0].r[0].userPersonName);
                $('#txtUserEmail').val(res.tbl[0].r[0].email1);
                $('#txtUserJiraAccountId').val(res.tbl[0].r[0].tgUserId);
                $('#cbUserType').val(res.tbl[0].r[0].liUserPermissionCode);
                $('#cbUserStatus').val(res.tbl[0].r[0].userStatus);
                $('#imgUserProjectInsert').attr('src', fileUrl(src));
                $('#txtUsernamePasswdCheckbox').prop('checked', false).change();
                $('.newUserInsert').hide();
                $('.newUserInsertAfter').show();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    getDefaultUserprofileName: function () {
        return (this.default_userprofile_name);
    },
    selectUserPermission: function (pid) {
        if (pid.trim().length === 0) {
            Toaster.showError('User ID is empty!');
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkUserId = pid;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
//                console.log(JSON.stringify(res))
                $('#tblUserInvolvedUser > tbody').html("");
                var st = that.setUserPermissionList(res);
                $('#tblUserInvolvedUser > tbody').html(st);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    }
    ,
    setUserPermissionList: function (res) {
        var st = "";
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                st += '<tr>';
                st += '<td>' + replaceTags(obj[n].projectName) + '</td>';
                st += '<td><a href="#" onclick="new User().deleteProjectFromPermissionList(this,\'' + obj[n].id + '\')">';
                st += '<i class="fa fa-trash" "></i>';
                st += '</a></td>';
                st += '</tr>';
            }
        } catch (err) {
        }

        st += '<tr>';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>'
        return st;
    },
    updateMyInfo: function () {
        var f = false;
        if ($.trim($('#myAccountModal_txtUserFulname').val()).length == 0) {
            Toaster.showError("Please enter User Fulname");
            f = true;
        } else if ($.trim($('#myAccountModal_txtUserEmail').val()).length == 0) {
            Toaster.showError("Please enter User Email");
            f = true;
        } else if (!this.isEmailValid('myAccountModal_txtUserEmail')) {
            Toaster.showError("Email is not valid");
            f = true;
        }
        if (f)
            throw "User error";
        this.uploadMyInfoChild();
    },
    updateMain: function () {

        if ($('#txtUserIdInInsertNewUser').val().trim().length == 0) {
            Toaster.showError('User is not selected!');
            return;
        }

        this.controller4Update();
        this.uploadUserProfile4Update();
    },
    updateMainDetail: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#txtUserIdInInsertNewUser').val()
        json.kv.userPersonName = $('#txtUserFulname').val();
        json.kv.email1 = $('#txtUserEmail').val();
        json.kv.liUserPermissionCode = $('#cbUserType').val();
        json.kv.userStatus = $('#cbUserStatus').val();
        json.kv.username = $('#txtUsername').val();
        json.kv.userImage = $('#userProfilePhoto4Insert').attr('fname');
        json.kv.jiraAccountId = $('#txtUserJiraAccountId').val();
        json.kv.password = $('#txtUsernamePasswd').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrUpdateUser",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                if (res.kv.error) {
                    Toaster.showError(res.kv.error);
                } else {
                    $('#userProfilePhoto4Insert').val('');
                    Toaster.showError('Operation is completed successfully.');
                }

            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadProjectList4Combo: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectList4Modal",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.addUserList4Combo(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    }
    ,
    addUserList4Combo: function (res) {
        $('#sbxProjectListByUser').html("");
        var obj = res.tbl[0].r;
        var st = "";
        for (var n = 0; n < obj.length; n++) {
            if (!obj[n].projectName)
                continue;
            $('#sbxProjectListByUser').append($('<option id="' + obj[n].id + '" ></option>')
                    .html(replaceTags(obj[n].projectName)));
        }
    }
    ,
    addProjectToUser: function () {

        if ($('#txtUserIdInInsertNewUser').val().length == 0) {
            Toaster.showError("User is not selected!");
            return;
        }

        if (this.isUserExistInPermission()) {
            return;
        }



        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkUserId = $('#txtUserIdInInsertNewUser').val();
        json.kv.fkProjectId = $('#sbxProjectListByUser option:selected').attr("id");
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewProjectPermission",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.setProjectToUserListTable(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    }
    ,
    setProjectToUserListTable: function () {
        var st = '';
        st += '<tr>';
        st += '<td>' + $('#sbxProjectListByUser').val() + '</td>';
        st += '<td><a href="#" onclick="new User().deleteProjectFromPermissionList(this,\''
                + $('#sbxProjectListByUser option:selected').attr("id") + '\')">';
        st += '<i class="fa fa-trash" "></i>';
        st += '</a></td>';
        st += '</tr>';
        $(st).insertBefore('#tblUserInvolvedUser > tbody > tr:first');
    }
    ,
    deleteUser: function (e, id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteUserPermission",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $(e).closest('tr').remove();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    }
    ,
    deleteUser: function () {
        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#txtUserIdInInsertNewUser').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrDeleteUser",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                if (res.kv.error) {
                    Toaster.showError(res.kv.error);
                } else {
                    that.loadUser();
                }

            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    }
    ,
    deleteProjectFromPermissionList: function (e, id) {
        if (!confirm("Are you sure?")) {
            return;
        }
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteProjectPermission",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $(e).closest('tr').remove();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    isUserExistInPermission: function () {
        var f = false;
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkUserId = $('#txtUserIdInInsertNewUser').val();
        json.kv.fkProjectId = $('#sbxProjectListByUser option:selected').attr("id");
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                if (res.tbl[0].r.length > 0) {
                    f = true;
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
        return f;
    }
    ,
    toggleFields: function () {
        this.beforeInsertEvent();
    },
    toogleDeleteUser: function () {
        var checked = $("input[id=chbToogleDeleteUser]:checked").length;
        if (checked == '1') {
            $('#btnDeleteUser').attr("style", "pointer-events:default");
        } else {
            $('#btnDeleteUser').attr('style', 'pointer-events:none');
        }

    },
    setEditable: function () {
        $('#txtUserName').attr("disabled", !$('#txtUserName').attr("disabled"));
        $('#txtUserDescription').attr("disabled", !$('#txtUserDescription').attr("disabled"));
        $('.setUserUpdateEditable').toggle();
    }
}


function TaskType() {
    this.msg = "";
}

TaskType.prototype = {
    insert: function () {
        if ($('#txtTaskTypeName').val().trim().length == 0) {
            Toaster.showError("Please enter  Type name");
            return;
        }

        if ($('#txtTaskTypeStatus').val().trim().length == 0) {
            Toaster.showError("Please enter  Type Status");
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.typeName = $('#txtTaskTypeName').val();
        json.kv.typeStatus = $('#txtTaskTypeStatus').val();
        json.kv.description = $('#txtTaskTypeDescription').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmInsertNewTaskType",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.insertAfterEvent();
                that.addNewTaskTypeToList($('#txtTaskTypeName').val(), res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    insertAfterEvent: function () {
        $('.newTaskTypeInsert').hide();
        $('.newTaskTypeInsertAfter').show();
    },
    addNewTaskTypeToList: function (TaskTypeName, res) {
        if (!res.kv.id) {
            Toaster.showError("TaskType is not inserted!");
            return;
        }

        var st = "";
        st += '<tr class="tasktype-tr" pid="' + res.kv.id + '">';
        st += '<td>*</td>';
        st += '<td>' + replaceTags(TaskTypeName) + '</td>';
        st += '</tr>';
        $(st).insertBefore('#tblTaskTypeList > tbody > tr:first');
        $('.tasktype-tr').first().click();
    },
    showAllTaskTypesAfterInsert: function (TaskTypeName, res) {
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            $('#sprintlist').append($("<option></option>")
                    .attr("value", replaceTags(obj[n].name))
                    .attr("style", "color:" + obj[n].color)
                    .text(replaceTags(obj[n].name)));
        }


    },
    searchTaskType: function (e) {
        $('#tblTaskTypeList > tbody').html('');
        var st = '%%' + $(e).val() + '%%';
        this.loadTaskType(st);
    },
    load: function () {
        this.loadTaskType("%%%%")
    },
    loadTaskType: function (pname) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.typeName = pname;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                var st = that.generateTableBody4TaskType(res);
                $('#tblTaskTypeList > tbody').html(st);
                $('.tasktype-tr').first().click();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    generateTableBody4TaskType: function (res) {

        var st = "";
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                st += '<tr class="tasktype-tr"  pid="' + obj[n].id + '" pdesc="'
                        + obj[n].description + '" pname="' + obj[n].typeName + '">';
                st += '<td>' + (n + 1) + '</td>';
                st += '<td>' + obj[n].typeName + '</td>';
                st += '</tr>';
            }
        } catch (e) {
        }
        st += '<tr">';
        st += '<td></td>';
        st += '<td></td>';
        st += '</tr>';
        return st;
    },
    showTaskTypeDetails: function (e) {
        var pid = $(e).attr("pid");
        this.showTaskTypeDetailsMain(e);
        this.insertAfterEvent();
    },
    showTaskTypeDetailsMain: function (e) {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $(e).attr("pid");
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $('#txtTaskTypeId').val(res.tbl[0].r[0].id);
                $('#txtTaskTypeName').val(res.tbl[0].r[0].typeName);
                $('#txtTaskTypeStatus').val(res.tbl[0].r[0].typeStatus);
                $('#txtTaskTypeDescription').val(res.tbl[0].r[0].description);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    updateMain: function () {
        if ($('#txtTaskTypeId').val().trim().length == 0) {
            Toaster.showError('Task Type is not selected!');
            return;
        }

        if ($('#txtTaskTypeName').val().trim().length == 0) {
            Toaster.showError('Type Name is empty!');
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#txtTaskTypeId').val();
        json.kv.typeName = $('#txtTaskTypeName').val();
        json.kv.typeStatus = $('#txtTaskTypeStatus').val();
        json.kv.description = $('#txtTaskTypeDescription').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmUpdateTaskType",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                Toaster.showError('Operation is completed successfully.');
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadUserList4Combo: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
//        json.kv.id = $('#txtTaskTypeId').val();
//        json.kv.TaskTypeName = $('#txtTaskTypeName').val();
//        json.kv.description = $('#txtTaskTypeDescription').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceCrGetUserList4Combo",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.addUserList4Combo(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    addUserList4Combo: function (res) {
        var obj = res.tbl[0].r;
        var st = "";
        for (var n = 0; n < obj.length; n++) {
            if (!obj[n].userPersonName)
                continue;
            $('#sbxUserList').append($('<option id="' + obj[n].id + '" ></option>')
                    .html(obj[n].userPersonName));
        }
    },
    deleteTaskType: function () {
        if (!confirm("Are you sure?")) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.id = $('#txtTaskTypeId').val();
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmDeleteTaskType",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                that.loadTaskType();
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    isUserExistInPermission: function () {
        var f = false;
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkTaskTypeId = $('#txtTaskTypeId').val();
        json.kv.fkUserId = $('#sbxUserList option:selected').attr("id");
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetTaskTypePermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                if (res.tbl[0].r.length > 0) {
                    f = true;
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
        return f;
    },
    toggleFields: function () {
        $('.newTaskTypeInsert').show();
        $('.newTaskTypeInsertAfter').hide();
        $('#txtTaskTypeName').val('');
        $('#txtTaskTypeId').val('');
        $('#txtTaskTypeDescription').val('');
    },
    setEditable: function () {
        var checked = $("input[id=ifSetProEditable]:checked").length;
        if (checked == '1') {
            $('#btnDeleteTaskType').attr("style", "pointer-events:default");
        } else {
            $('#btnDeleteTaskType').attr('style', 'pointer-events:none');
        }
    }
}


var BacklogHistory = {
    clearBacklogHistoryFilter: function () {
        global_var.user_story_history_filter_current_index = '0';
        global_var.user_story_history_filter_date = "";
        global_var.user_story_history_filter = "";
        $('#us_history_filter_fromdate').val('');
        $('#us_history_filter_todate').val('');
    },
    loadFilterComponents: function () {
        BacklogHistory.getFilterHistoryCount();
        BacklogHistory.loadFilterHistoryType();
        BacklogHistory.loadFilterHistoryTeller();
    },
    load: function () {
        BacklogHistory.loadHistorybody();
        BacklogHistory.setFilterPaginationRange();
    },
    setFilterPaging: function (e) {
        global_var.user_story_history_filter_current_index = '0';
        BacklogHistory.load();
    },
    setFilterPaginationRange: function () {
        var s = global_var.user_story_history_filter_current_index;
        var e = parseFloat(global_var.user_story_history_filter_current_index)
                + parseFloat($('#us_history_filter_history_perpage').val())
        $('#usfilter_paginationResult').html("(" + s + '-' + e + ')');
    },
    setFilterPreviousPaging: function (e) {
        var r = parseFloat(global_var.user_story_history_filter_current_index)
                - parseFloat($('#us_history_filter_history_perpage').val());
        r = parseFloat(r) < 0 ? '0' : r;
        global_var.user_story_history_filter_current_index = r;
        BacklogHistory.load();
    },
    setFilterNextPaging: function (e) {
        var rc = parseFloat(global_var.user_story_history_filter_current_index)
                + parseFloat($('#us_history_filter_history_perpage').val());
        if (rc <= parseFloat($('#usfilter_paginationresult_rowcount').html())) {
            global_var.user_story_history_filter_current_index = rc;
        }

        BacklogHistory.load();
    },
    setFilterDate: function () {
        global_var.user_story_history_filter_date = '';
        var fromDate = '';
        if ($('#us_history_filter_fromdate').val()) {
            var date = new Date($('#us_history_filter_fromdate').val());
            var day = date.getDate();
            day = day.toString(10).length === 1 ? '0' + day : day;
            var month = date.getMonth() + 1;
            month = month.toString(10).length === 1 ? '0' + month : month;
            var year = date.getFullYear();
            fromDate = year + "" + month + '' + day;
        }

        var toDate = '';
        if ($('#us_history_filter_todate').val()) {
            var date2 = new Date($('#us_history_filter_todate').val());
            var day2 = date2.getDate();
            day2 = day2.toString(10).length === 1 ? '0' + day2 : day2;
            var month2 = date2.getMonth() + 1;
            month2 = month2.toString(10).length === 1 ? '0' + month2 : month2;
            var year2 = date2.getFullYear();
            toDate = year2 + "" + month2 + '' + day2;
        }

        var date1 = 'historyDate=' + fromDate + '%BN%' + toDate;
        if (!date1.includes("NaN") && toDate && fromDate) {
            global_var.user_story_history_filter_date = date1;
        }
        BacklogHistory.load();
    },
    loadFilterHistoryTeller: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.asc = 'userName';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                $("#us_history_filter_users").html('');
                var obj = res.tbl[0].r;
                $("#us_history_filter_users").append($('<option></option>').val('%%%%').html('All'));
                var s = 0;
                for (var n = 0; n < obj.length; n++) {
                    var c = 0;
                    try {
                        if (global_var.backlog_history_type_count.kv[obj[n].fkUserId]) {
                            c = global_var.backlog_history_type_count.kv[obj[n].fkUserId];
                            s = parseFloat(s) + parseFloat(c);
                        }
                    } catch (e) {
                    }
                    $("#us_history_filter_users").
                            append($('<option></option>').val(obj[n].fkUserId).html(obj[n].userName + " (" + c + ")"));
                }

                $("#us_history_filter_users").find('option').first().html(
                        $("#us_history_filter_users").find('option').first().html() + " (" + s + ')');
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadFilterHistoryType: function () {
        $("#us_history_filter_history_type").html('');
        var keys = Object.keys(history_type);
        $("#us_history_filter_history_type").append($('<option></option>').val('%%%%').html('All'));
        var s = 0;
        for (var n = 0; n < keys.length; n++) {
            if (!keys[n]) {
                continue;
            }
            var c = 0;
            try {
                if (global_var.backlog_history_type_count.kv[keys[n]]) {
                    c = global_var.backlog_history_type_count.kv[keys[n]];
                    s = parseFloat(s) + parseFloat(c);
                }
            } catch (e) {
            }
            $("#us_history_filter_history_type").append($('<option></option>').val(keys[n]).html(history_type[keys[n]] + " (" + c + ")"));
        }

        $("#us_history_filter_history_type").find('option').first().html(
                $("#us_history_filter_history_type").find('option').first().html() + " (" + s + ')');
    },
    getFilterHistoryCount: function () {
        var id = global_var.current_backlog_id;
        if (!id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkBacklogId = id;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogHistoryGroupList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                global_var.backlog_history_type_count = res;
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadHistorybody: function () {
        var id = global_var.current_backlog_id;
        if (!id) {
            return;
        }

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var ls = global_var.user_story_history_filter.split(';');
        for (var i = 0; i < ls.length; i++) {
            var k = ls[i].split('=')[0];
            var v = ls[i].split('=')[1];
            json.kv[k] = v;
        }

        try {
            var k1 = global_var.user_story_history_filter_date.split('=')[0];
            var v1 = global_var.user_story_history_filter_date.split('=')[1];
            json.kv[k1] = v1;
        } catch (e) {
        }

        json.kv.startLimit = global_var.user_story_history_filter_current_index;
        json.kv.endLimit = parseFloat(global_var.user_story_history_filter_current_index)
                + parseFloat($('#us_history_filter_history_perpage').val());
        json.kv.fkBacklogId = id;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogHistoryList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                var rc = 0;
                try {
                    BacklogHistory.loadDetails(res);
                    var ind = getIndexOfTable(res, "Response");
                    rc = res.tbl[ind].rowCount;
                } catch (e) {
                }
                $('#usfilter_paginationresult_rowcount').html(rc);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    loadDetails: function (res) {
        $('#smb-details-history').find('.smb-details-history-body').html('');
        var ind = getIndexOfTable(res, "Response");
        var obj = res.tbl[ind].r;
        var div = $('<div></div>').append($('<div></div>').addClass("col-12").append("<hr>"));
        for (var i = 0; i < obj.length; i++) {
            var body = MapTextAreaHtml(replaceMainTrustedTags(obj[i].historyBody));
            var filen = (obj[i].historyTellerImage) ? obj[i].historyTellerImage : new User().getDefaultUserprofileName();
            var div1 = $('<div></div>').addClass("col-1 comment-line")
                    .append("<img class=\"figure-img img-fluid rounded-circle\" style=\"max-width:28px\"  src=\""
                            + fileUrl(filen) + "\" alt=\"" + obj[i].historyTellerName + "\"> ");
            var div2 = $('<div></div>')
                    .addClass("col-11")
                    .append("<b style=\"color:red!important;font-size:14px;\">" + "  "
                            + history_type[obj[i].historyType] + "</b> by <i><b>" +
                            obj[i].historyTellerName + " </b><span>" +
                            Utility.convertDate(obj[i].historyDate) + ", " + Utility.convertTime(obj[i].historyTime) + "</span></i>"
                            )
                    .append(' ')
                    .append($('<i></i>')
                            .attr("href", "#")
                            .addClass('fa fa-mail-forward')
                            .attr("data-toggle", "modal")
                            .attr("data-target", "#notifyAsChangeRequestModal")
                            .attr("title", "Nofify as Change Request")
                            .attr("style", "cursor:pointer;color:green")
                            .attr("onclick", "new UserStory().notifyAsChangeRequestModal('" + obj[i].id + "')"))
                    .append("<br>")
                    .append(body)
            var div3 = $('<div></div>').addClass("col-12").append("<hr>");
            div.append(div1).append(div2).append(div3);
        }
        $('#smb-details-history').find('.smb-details-history-body').html(div.html());
    },
    setHistoryTypeCountByResult: function (res) {
        var ind = getIndexOfTable(res, "historyGroupTable");
        var obj = res.tbl[ind].r;
        for (var i = 0; i < obj.length; i++) {

            div.append(div1).append(div2).append(div3);
        }
    },
    setFilterHistoryType: function (e) {
        global_var.user_story_history_filter += "historyType=" + $(e).val() + ";";
        BacklogHistory.load();
    },
    setFilterUsers: function (e) {
        global_var.user_story_history_filter += "historyTellerId=" + $(e).val() + ";";
        BacklogHistory.load();
    },
}


var Analytics = {
    Main: {

        ToggleProject: function (el) {
            Analytics.Main.getAssigneeByProject(el);
//            Analytics.Main.getLabelByProject(el);
//            Analytics.Main.getSprintByProject(el);
//            Analytics.Main.getReport(el);
        },
        setFilterType: function (el, atype) {
            global_var.analytic_filter.filterType = atype;
            Analytics.Main.loadReportDetailByType();
        },
        generateInput4Report: function () {

        },
        setDateInterval: function (interval) {

            var today = new Date();
            var last = new Date(today.getFullYear(), today.getMonth(), today.getDate() - interval);
            SetConvertedDate('analytics_filter_todate', ConvertedDateToStringDate(today));
            SetConvertedDate('analytics_filter_fromdate', ConvertedDateToStringDate(last));
        },
        emptyMessage: function () {
            return '<div style="padding:30px;text-align:center">' +
                    '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                    '<h5> No User Stories have been found with selected criterias</h5>' +
                    '<p>Search result related to the selected criterias on these projects will appear here</p>' +
                    '<p>Please Assign User Stories to the Sprint.</p>' +
                    '</div>'
        },
        setReportInterval: function (int, el) {
            $(".analytic-filter-interval").removeAttr('style');
            $(el).attr('style', 'color:red');
            global_var.analytic_filter.interval = int;
            Analytics.Main.getReport();
        },
        getReport: function (e) {
//            Analytics.Main.getReportMain(e);
        },
        clearOutcomes: function () {
            $('#analytic_report_result').html(Analytics.Main.emptyMessage());
            $('#analytic_report_result_pivot').html(Analytics.Main.emptyMessage());
        },
        getReportMain: function (e) {
            var prlist = Analytics.getCheckedProjects();
            if (prlist.length < 6) {
                Toaster.showError("Please select project(s)!");
                return;
            }
            Analytics.Main.clearOutcomes();
            var json = {kv: {}};
            try {
                json.kv.cookie = getToken();
            } catch (err) {
            }
            json.kv.asc = "userName";
            json.kv.futurePeriod = $('#analytic-main-filter-future-period').val();
            json.kv.lastPeriod = $('#analytic-main-filter-last-period').val();
            json.kv.lastDay = $('#analytic-main-filter-last-day').val();
            json.kv.projectList = prlist;
            json.kv.assigneeList = Analytics.getCheckedAssignees();
            json.kv.labelList = Analytics.getCheckedLabels();
            json.kv.sprintList = Analytics.getCheckedSprints();
            json.kv.taskTypeList = Analytics.getCheckedTaskTypes();
            json.kv.priorityList = Analytics.getCheckedPriorities();
            json.kv.groupBy = Analytics.getCheckedGroupBy();
            json.kv.interval = global_var.analytic_filter.interval;
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetAnalyticalReport",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    global_var.analytic_filter.res = res;
                    Analytics.Main.loadReportDetailByType();
                }
            });
        },
        loadReportDetailByType: function () {

            if (global_var.analytic_filter.filterType === 'table') {
                Analytics.Main.getReportDetails();
            } else if (global_var.analytic_filter.filterType === 'pivot') {
                Analytics.Main.getReportDetails4Pivot();
            } else if (global_var.analytic_filter.filterType === 'histogram') {
                Analytics.Main.getReportDetails4Histogram();
            } else if (global_var.analytic_filter.filterType === 'series') {
                Analytics.Main.getReportDetails4Series();
            }

        },
        groupRes4Pivot: function () {
            var res = global_var.analytic_filter.res;
            var id4Input = getIndexOfTable(res, "Response");
            var obj = res.tbl[id4Input].r;
            global_var.analytic_filter.pivot_sprint = {};
            global_var.analytic_filter.pivot_group = [];
            global_var.analytic_filter.pivot_group_name = [];
            for (var n = obj.length - 1; n >= 0; n--) {
                var o = obj[n];
                var tarix = o.fromDate + "_" + o.toDate;
                global_var.analytic_filter.pivot_cell[tarix] = {};
            }

            for (var n = obj.length - 1; n >= 0; n--) {
                var o = obj[n];
                //intervallar uzre tarixlerin gruplasdirilmasi
                var tarix = o.fromDate + "_" + o.toDate;
                global_var.analytic_filter.pivot_sprint[tarix] =
                        (global_var.analytic_filter.pivot_sprint[tarix])
                        ? !(global_var.analytic_filter.pivot_sprint[tarix].includes(o.sprintName))
                        ? global_var.analytic_filter.pivot_sprint[tarix] + ", " + o.sprintName
                        : global_var.analytic_filter.pivot_sprint[tarix]
                        : o.sprintName;
                // group by lar uzre melumatlarin qruplasdirilmasi       
                var gr = (o.fkProjectId) ? o.fkProjectId : "";
                gr += (o.fkAssigneeId) ? "_" + o.fkAssigneeId : "";
                gr += (o.fkTaskTypeId) ? "_" + o.fkTaskTypeId : "";
                gr += (o.priority) ? "_" + o.priority : "";
                if (jQuery.inArray(gr, global_var.analytic_filter.pivot_group) === -1) {
                    global_var.analytic_filter.pivot_group.push(gr);
                }

                var grname = (o.fkProjectId) ? global_var.analytic_filter.project_list[o.fkProjectId] : "";
                grname += (o.fkAssigneeId) ? ", " + global_var.analytic_filter.assignee_list[o.fkAssigneeId] : "";
                grname += (o.fkTaskTypeId) ? ", " + global_var.analytic_filter.task_type_list[o.fkTaskTypeId] : "";
                grname += (o.priority) ? ", (" + o.priority + ")" : "";
                grname = (grname.startsWith(',')) ? grname.substring(2, grname.length) : grname;
                if (jQuery.inArray(grname, global_var.analytic_filter.pivot_group_name) === -1) {
                    global_var.analytic_filter.pivot_group_name.push(grname);
                }

                //tarix ve qruplar uzre zadlarin qruplasdirilmasi
                var v = $('#analytics_filter_pivot_by_userstory').is(":checked") ? o.newUserstoryCount : "";
                v += $('#analytics_filter_pivot_by_estimatedhours').is(":checked") ? "/ " + o.sumEstimatedHours : "";
                v += $('#analytics_filter_pivot_by_spenthours').is(":checked") ? "/ " + o.sumSpentHours : "";
                v = (v.startsWith("/")) ? v.substring(2, v.length) : v;
                global_var.analytic_filter.pivot_cell[tarix][gr] = v;
            }
        },
        groupRes4Histogram: function () {
            var res = global_var.analytic_filter.res;
            var id4Input = getIndexOfTable(res, "Response");
            var obj = res.tbl[id4Input].r;
            global_var.analytic_filter.pivot_sprint = {};
            global_var.analytic_filter.pivot_group = [];
            global_var.analytic_filter.pivot_group_name = [];
            for (var n = obj.length - 1; n >= 0; n--) {
                var o = obj[n];
                var tarix = o.fromDate + "_" + o.toDate;
                global_var.analytic_filter.pivot_cell[tarix] = {};
            }

            for (var n = obj.length - 1; n >= 0; n--) {
                var o = obj[n];
                //intervallar uzre tarixlerin gruplasdirilmasi
                var tarix = o.fromDate + "_" + o.toDate;
                global_var.analytic_filter.pivot_sprint[tarix] =
                        (global_var.analytic_filter.pivot_sprint[tarix])
                        ? !(global_var.analytic_filter.pivot_sprint[tarix].includes(o.sprintName))
                        ? global_var.analytic_filter.pivot_sprint[tarix] + ", " + o.sprintName
                        : global_var.analytic_filter.pivot_sprint[tarix]
                        : o.sprintName;
                // group by lar uzre melumatlarin qruplasdirilmasi       
                var gr = (o.fkProjectId) ? o.fkProjectId : "";
                gr += (o.fkAssigneeId) ? "_" + o.fkAssigneeId : "";
                gr += (o.fkTaskTypeId) ? "_" + o.fkTaskTypeId : "";
                gr += (o.priority) ? "_" + o.priority : "";
                if (jQuery.inArray(gr, global_var.analytic_filter.pivot_group) === -1) {
                    global_var.analytic_filter.pivot_group.push(gr);
                }

                var grname = (o.fkProjectId) ? global_var.analytic_filter.project_list[o.fkProjectId] : "";
                grname += (o.fkAssigneeId) ? ", " + global_var.analytic_filter.assignee_list[o.fkAssigneeId] : "";
                grname += (o.fkTaskTypeId) ? ", " + global_var.analytic_filter.task_type_list[o.fkTaskTypeId] : "";
                grname += (o.priority) ? ", (" + o.priority + ")" : "";
                grname = (grname.startsWith(',')) ? grname.substring(2, grname.length) : grname;
                if (jQuery.inArray(grname, global_var.analytic_filter.pivot_group_name) === -1) {
                    global_var.analytic_filter.pivot_group_name.push(grname);
                }

                //tarix ve qruplar uzre zadlarin qruplasdirilmasi
                var v = o[$('#analytic-main-filter-histogram-groupby').val()];
                global_var.analytic_filter.pivot_cell[tarix][gr] = v;
            }
        },
        groupRes4Series: function () {
            var res = global_var.analytic_filter.res;
            var id4Input = getIndexOfTable(res, "Response");
            var obj = res.tbl[id4Input].r;
            global_var.analytic_filter.pivot_sprint = {};
            global_var.analytic_filter.pivot_group = [];
            global_var.analytic_filter.pivot_group_name = [];
            for (var n = obj.length - 1; n >= 0; n--) {
                var o = obj[n];
                var tarix = o.fromDate + "_" + o.toDate;
                global_var.analytic_filter.pivot_cell[tarix] = {};
            }

            for (var n = obj.length - 1; n >= 0; n--) {
                var o = obj[n];
                //intervallar uzre tarixlerin gruplasdirilmasi
                var tarix = o.fromDate + "_" + o.toDate;
                global_var.analytic_filter.pivot_sprint[tarix] =
                        (global_var.analytic_filter.pivot_sprint[tarix])
                        ? !(global_var.analytic_filter.pivot_sprint[tarix].includes(o.sprintName))
                        ? global_var.analytic_filter.pivot_sprint[tarix] + ", " + o.sprintName
                        : global_var.analytic_filter.pivot_sprint[tarix]
                        : o.sprintName;
                // group by lar uzre melumatlarin qruplasdirilmasi       
                var gr = (o.fkProjectId) ? o.fkProjectId : "";
                gr += (o.fkAssigneeId) ? "_" + o.fkAssigneeId : "";
                gr += (o.fkTaskTypeId) ? "_" + o.fkTaskTypeId : "";
                gr += (o.priority) ? "_" + o.priority : "";
                if (jQuery.inArray(gr, global_var.analytic_filter.pivot_group) === -1) {
                    global_var.analytic_filter.pivot_group.push(gr);
                }

                var grname = (o.fkProjectId) ? global_var.analytic_filter.project_list[o.fkProjectId] : "";
                grname += (o.fkAssigneeId) ? ", " + global_var.analytic_filter.assignee_list[o.fkAssigneeId] : "";
                grname += (o.fkTaskTypeId) ? ", " + global_var.analytic_filter.task_type_list[o.fkTaskTypeId] : "";
                grname += (o.priority) ? ", (" + o.priority + ")" : "";
                grname = (grname.startsWith(',')) ? grname.substring(2, grname.length) : grname;
                if (jQuery.inArray(grname, global_var.analytic_filter.pivot_group_name) === -1) {
                    global_var.analytic_filter.pivot_group_name.push(grname);
                }

                //tarix ve qruplar uzre zadlarin qruplasdirilmasi
                var v = o[$('#analytic-main-filter-series-groupby').val()];
                global_var.analytic_filter.pivot_cell[tarix][gr] = v;
            }
        },
        getReportDetails4Histogram: function () {
            $('#analytic_report_result_histogram').html('');
            try {
                Analytics.Main.groupRes4Histogram();
                var res = global_var.analytic_filter.res;
                var id4Input = getIndexOfTable(res, "fromToDatesTable");
                var obj = res.tbl[id4Input].r;
                var lbl = [];
                for (var n = obj.length - 1; n >= 0; n--) {
                    var o = obj[n];
                    var tarixMain = Utility.convertDate(o.fromDate) + "-" + Utility.convertDate(o.toDate);
                    lbl.push(tarixMain);
                }

                var dset = [];
                for (var i = 0; i < global_var.analytic_filter.pivot_group_name.length; i++) {
                    var idx = i % global_var.analytic_filter.histogram.color.length;
                    var color = global_var.analytic_filter.histogram.color[idx];
                    var k = {};
                    k.label = global_var.analytic_filter.pivot_group_name[i];
                    k.backgroundColor = color;
                    k.fill = "false",
                            k.data = [];
                    var val = [];
                    for (var n = obj.length - 1; n >= 0; n--) {
                        var o = obj[n];
                        var tarix = o.fromDate + "_" + o.toDate;
                        var v = 0;
                        try {
                            v = global_var.analytic_filter.pivot_cell[tarix][global_var.analytic_filter.pivot_group[i]];
                            v = (!(v) || v === 'undefined') ? 0 : v;
                        } catch (ee) {
                        }

                        val.push(v);
                    }
                    k.data = val;
                    dset.push(k);
                }


                var canvas = $('<canvas id="myChart" width="200" height="100"></canvas>');
                $('#analytic_report_result_histogram').html('');
                $('#analytic_report_result_histogram').append(canvas);
                var ctx = document.getElementById('myChart').getContext('2d');
                Analytics.Main.clearCanvas(document.getElementById('myChart'));
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: lbl,
                        datasets: dset,
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                        }
                    }
                });
            } catch (err) {
                $('#analytic_report_result_histogram').html(Analytics.Main.emptyMessage());
            }
        },
        getReportDetails4Series: function () {
            $('#analytic_report_result_series').html('');
            try {
                Analytics.Main.groupRes4Series();
                var res = global_var.analytic_filter.res;
                var id4Input = getIndexOfTable(res, "fromToDatesTable");
                var obj = res.tbl[id4Input].r;
                var lbl = [];
                for (var n = obj.length - 1; n >= 0; n--) {
                    var o = obj[n];
                    var tarixMain = Utility.convertDate(o.fromDate) + "-" + Utility.convertDate(o.toDate);
                    lbl.push(tarixMain);
                }

                var dset = [];
                for (var i = 0; i < global_var.analytic_filter.pivot_group_name.length; i++) {
                    var idx = i % global_var.analytic_filter.histogram.color.length;
                    var color = global_var.analytic_filter.histogram.color[idx];
                    var k = {};
                    k.label = global_var.analytic_filter.pivot_group_name[i];
                    k.backgroundColor = color;
                    k.fill = "false",
                            k.data = [];
                    var val = [];
                    for (var n = obj.length - 1; n >= 0; n--) {
                        var o = obj[n];
                        var tarix = o.fromDate + "_" + o.toDate;
                        var v = 0;
                        try {
                            v = global_var.analytic_filter.pivot_cell[tarix][global_var.analytic_filter.pivot_group[i]];
                            v = (!(v) || v === 'undefined') ? 0 : v;
                        } catch (ee) {
                        }

                        val.push(v);
                    }
                    k.data = val;
                    dset.push(k);
                }


                var canvas1 = $('<canvas id="myChart1" width="200" height="100"></canvas>');
                $('#analytic_report_result_series').html('');
                $('#analytic_report_result_series').append(canvas1);
                var ctx1 = document.getElementById('myChart1').getContext('2d');
                Analytics.Main.clearCanvas(document.getElementById('myChart1'));
                var myChartLine = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: lbl,
                        datasets: dset,
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                        }
                    }
                });
            } catch (err) {
                $('#analytic_report_result_series').html(Analytics.Main.emptyMessage());
            }
        },
        clearCanvas: function (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'copy';
            ctx.strokeStyle = 'transparent';
            ctx.beginPath();
            ctx.lineTo(0, 0);
            ctx.stroke();
            ctx.restore();
        },
        getReportDetails4Pivot: function () {
            $('#analytic_report_result_pivot').html('');
            try {
                Analytics.Main.groupRes4Pivot();
                var res = global_var.analytic_filter.res;
                var id4Input = getIndexOfTable(res, "fromToDatesTable");
                var obj = res.tbl[id4Input].r;
                var table = $('<table id="table_table_filter_pivot_table"></table>')
                        .addClass('table')
                        .addClass('text-center')
                        .attr('border', '1')
                        .attr('style', 'border: 2px solid #5181B8;margin: 0 auto;');
                var tbody = $('<tbody></tbody>');
                var tr = $('<tr></tr>').append($('<td></td>'));
                //tarix intervalli uzre sutunlarin hazirlanmasi
                for (var n = obj.length - 1; n >= 0; n--) {
                    var o = obj[n];
                    tr.append($('<td></td>')
                            .append(Utility.convertDate(o.fromDate))
                            .append(' - ')
                            .append(Utility.convertDate(o.toDate))
                            .append((global_var.analytic_filter.pivot_sprint[o.fromDate + "_" + o.toDate])
                                    ? "<br><i>" + global_var.analytic_filter.pivot_sprint[o.fromDate + "_" + o.toDate] + "</i>"
                                    : "")
                            );
                }
                tbody.append(tr);
                //group by uzre datalarin bir massive yigilmasi ve oradan da sutunun elave edilmesi
                for (var n = 0; n < global_var.analytic_filter.pivot_group.length; n++) {
                    var grid = global_var.analytic_filter.pivot_group[n];
                    var grn = global_var.analytic_filter.pivot_group_name[n];
                    var tr1 = $('<tr></tr>').append($('<td></td>').append(grn));
                    for (var i = obj.length - 1; i >= 0; i--) {
                        var o = obj[i];
                        var k = o.fromDate + "_" + o.toDate;
                        var v = "";
                        try {
                            v = (global_var.analytic_filter.pivot_cell[k][grid]) ?
                                    global_var.analytic_filter.pivot_cell[k][grid] : "";
                        } catch (err) {
                        }
                        tr1.append($('<td></td>')
                                .append(v)
                                );
                    }
                    tbody.append(tr1);
                }

                //addcell to the pivot cedveli


                table.append(tbody);
                $('#analytic_report_result_pivot').append(table);
            } catch (err) {
                $('#analytic_report_result_pivot').html(Analytics.Main.emptyMessage());
            }
        },
        getReportDetails: function () {
            $('#analytic_report_result').html('');
            try {
                var res = global_var.analytic_filter.res;
                var obj = res.tbl[0].r;
                var table = $('<table id="table_table_filter_table"></table>')
                        .addClass('table')
                        .addClass('text-center')
                        .attr('border', '1')
                        .attr('style', 'border: 2px solid #5181B8;margin: 0 auto;');
                var tbody = $('<tbody></tbody>');
                for (var n = 0; n < obj.length; n++) {
                    var o = obj[n];
                    var tr = $('<tr></tr>')
                            .append($('<td></td>').append(Utility.convertDate(o.fromDate) + "-" + Utility.convertDate(o.toDate)))
                            .append($('<td></td>').append(o.sprintName))
                            .append($('#analytics_filter_checkbox_groupby_project').is(":checked")
                                    ? $('<td></td>').append(global_var.analytic_filter.project_list[o.fkProjectId]) : "")
//                       .append($('#analytics_filter_checkbox_groupby_project').is(":checked")
//                                ? $('<td></td>').append(o.fkProjectId) : "")
                            .append($('#analytics_filter_checkbox_groupby_assignee').is(":checked")
                                    ? $('<td></td>').append(global_var.analytic_filter.assignee_list[o.fkAssigneeId]) : "")
                            .append($('#analytics_filter_checkbox_groupby_tasktype').is(":checked")
                                    ? $('<td></td>').append(global_var.analytic_filter.task_type_list[o.fkTaskTypeId]) : "")
//                        .append($('#analytics_filter_checkbox_groupby_label').is(":checked")
//                                ?$('<td></td>').append(global_var.analytic_filter.label_list[o.fkTaskLabelId]): "")
                            .append($('#analytics_filter_checkbox_groupby_priority').is(":checked")
                                    ? $('<td></td>').append(o.priority) : "")
                            .append($('<td></td>').append(o.newUserstoryCount))
//                        .append($('<td></td>').append(o.bugCount))
//                        .append($('<td></td>').append(o.requestCount))
                            .append($('<td></td>').append(o.sumEstimatedHours))
//                        .append($('<td></td>').append(o.sumEstimatedHoursBug))
//                        .append($('<td></td>').append(o.sumEstimatedHoursRequest))
                            .append($('<td></td>').append(o.sumSpentHours))
//                        .append($('<td></td>').append(o.sumSpentHoursBug))
//                        .append($('<td></td>').append(o.sumSpentHoursRequest));
                    tbody.append(tr);
                }
                table.append(this.getReportTableHeader());
                table.append(tbody);
                $('#analytic_report_result').append(table);
            } catch (err) {
                $('#analytic_report_result').html(Analytics.Main.emptyMessage());
            }

        },
        getReportTableHeader: function () {

            var tr = $('<tr></tr>')
                    .append($('<th></th>').append("Interval"))
                    .append($('<th></th>').append("Sprint(s)"))
                    .append($('#analytics_filter_checkbox_groupby_project').is(":checked")
                            ? $('<th></th>').append("Project") : "")
                    .append($('#analytics_filter_checkbox_groupby_assignee').is(":checked")
                            ? $('<th></th>').append("Assignee") : "")
                    .append($('#analytics_filter_checkbox_groupby_tasktype').is(":checked")
                            ? $('<th></th>').append("Task Type") : "")
//                    .append($('#analytics_filter_checkbox_groupby_label').is(":checked")
//                                ?$('<th></th>').append("Label"):"")
                    .append($('#analytics_filter_checkbox_groupby_priority').is(":checked")
                            ? $('<th></th>').append("Priority") : "")
                    .append($('<th></th>').append('User Story Count'))
//                    .append($('<th></th>').append('Bug Count'))
//                    .append($('<th></th>').append('Request Count'))
                    .append($('<th></th>').append('Estimated Hours'))
//                    .append($('<th></th>').append('Estimated Hours For Bugs'))
//                    .append($('<th></th>').append('Estimated Hours For Request'))
                    .append($('<th></th>').append('Spent Hours'))
//                    .append($('<th></th>').append('Spent Hours For Bug'))
//                    .append($('<th></th>').append('Spent Hours For Request'));
            var thead = $('<thead></thead>').append(tr);
            return thead;
        },
        getAssigneeByProject: function (e) {
            $('#analytics_main_list_of_assignee >tbody').html('');
            var json = {kv: {}};
            try {
                json.kv.cookie = getToken();
            } catch (err) {
            }
            json.kv.asc = "userName";
            json.kv.fkProjectId = Analytics.getCheckedProjects();
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetProjectPermissionList4Report",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    Analytics.Main.getReport(e);
                    var obj = res.tbl[0].r;
                    var st = "";
                    for (var n = 0; n < obj.length; n++) {
                        global_var.analytic_filter.assignee_list[obj[n].fkUserId ] = replaceTags(obj[n].userName);
                        if (!st.includes(obj[n].fkUserId)) {
                            var tr = $('<tr></tr>')
                                    .append('<td><input  type="checkbox" onchange="Analytics.Main.getReport(this)"\n\
 class="analytics_filter_checkbox_assignee" id="' + obj[n].fkUserId + '" value="' +
                                            obj[n].fkUserId + '">' + replaceTags(obj[n].userName) + '</td>')
                            $('#analytics_main_list_of_assignee >tbody').append(tr);
                            st += obj[n].fkUserId;
                        }
                    }
                }
            });
        },
        getLabelByProject: function (e) {
            $('#analytics_main_list_of_labels >tbody').html('');
            var json = {kv: {}};
            try {
                json.kv.cookie = getToken();
            } catch (err) {
            }
            json.kv.asc = "name";
            json.kv.fkProjectId = Analytics.getCheckedProjects();
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetLabelList",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    Analytics.Main.getReport(e);
                    var obj = res.tbl[0].r;
                    var st = "";
                    for (var n = 0; n < obj.length; n++) {
                        global_var.analytic_filter.label_list[obj[n].id] = replaceTags(obj[n].name);
                        if (!st.includes(obj[n].id)) {
                            var tr = $('<tr></tr>')
                                    .append('<td><input  type="checkbox" onchange="Analytics.Main.getReport(this)"\n\
 class="analytics_filter_checkbox_label" id="' + obj[n].id + '" value="' +
                                            obj[n].id + '">' + replaceTags(obj[n].name) + '</td>')
                            $('#analytics_main_list_of_labels >tbody').append(tr);
                            st += obj[n].id;
                        }
                    }
                }
            });
        },
        getSprintByProject: function (e) {
            $('#analytics_main_list_of_sprints >tbody').html('');
            var json = {kv: {}};
            try {
                json.kv.cookie = getToken();
            } catch (err) {
            }
            json.kv.asc = "sprintName";
            json.kv.fkProjectId = Analytics.getCheckedProjects();
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetSprintList",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    Analytics.Main.getReport(e);
                    var obj = res.tbl[0].r;
                    var st = "";
                    for (var n = 0; n < obj.length; n++) {
                        global_var.analytic_filter.sprint_list[obj[n].id] = replaceTags(obj[n].sprintName);
                        if (!st.includes(obj[n].id)) {
                            var tr = $('<tr></tr>')
                                    .append('<td><input  type="checkbox" onchange="Analytics.Main.getReport(this)"\n\
                                                     class="analytics_filter_checkbox_sprint" id="' + obj[n].id + '" value="' +
                                            obj[n].id + '">' + replaceTags(obj[n].sprintName) + '</td>')
                            $('#analytics_main_list_of_sprints >tbody').append(tr);
                            st += obj[n].id;
                        }
                    }
                }
            });
        },
        getTaskTypeByProject: function (e) {
            $('#analytics_main_list_of_tasktypes >tbody').html('');
            var json = {kv: {}};
            try {
                json.kv.cookie = getToken();
            } catch (err) {
            }
            json.kv.asc = "typeName";
            json.kv.fkProjectId = Analytics.getCheckedProjects();
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetTaskTypeList",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    Analytics.Main.getReport(e);
                    var obj = res.tbl[0].r;
                    var st = "";
                    for (var n = 0; n < obj.length; n++) {
                        global_var.analytic_filter.task_type_list[obj[n].id] = replaceTags(obj[n].typeName);
                        if (!st.includes(obj[n].id)) {
                            var tr = $('<tr></tr>')
                                    .append('<td><input  type="checkbox" onchange="Analytics.Main.getReport(this)"\n\
 class="analytics_filter_checkbox_tasktype" id="' + obj[n].id + '" value="' +
                                            obj[n].id + '">' + replaceTags(obj[n].typeName) + '</td>')
                            $('#analytics_main_list_of_tasktypes >tbody').append(tr);
                            st += obj[n].id;
                        }
                    }
                }
            });
        },
        loadProjects: function () {
            var json = {kv: {}};
            try {
                json.kv.cookie = getToken();
            } catch (err) {
            }
            json.kv.asc = "projectName";
            var that = this;
            var data = JSON.stringify(json);
            $.ajax({
                url: urlGl + "api/post/srv/serviceTmGetProjectList4Modal",
                type: "POST",
                data: data,
                contentType: "application/json",
                crossDomain: true,
                async: true,
                success: function (res) {
                    global_var.analytic_filter.project_list = {};
                    $('#analytics_main_list_of_projects >tbody').html('');
                    var obj = res.tbl[0].r;
                    for (var n = 0; n < obj.length; n++) {
                        global_var.analytic_filter.project_list[obj[n].id ] = replaceTags(obj[n].projectName);
                        var tr = $('<tr></tr>')
                                .append('<td><input onchange="Analytics.Main.ToggleProject(this)" \n\
type="checkbox" class="analytics_filter_checkbox_project" id="' +
                                        obj[n].id + '" value="' + obj[n].id + '">' + replaceTags(obj[n].projectName) + '</td>')
                        $('#analytics_main_list_of_projects >tbody').append(tr);
                    }
                },
                error: function () {
                    Toaster.showError(('somethingww'));
                }
            });
        }
    },
    show: function (e) {


        $('.main_body_class').hide();
        $('#main_body_class_analytics').show();
        Utility.addParamToUrl("mainview", "analytics");
        var btn = Utility.getParamFromUrl('analytics_tab');
        btn = (btn) ? btn : global_var.analytics_tab;
        $('#analytics-button-' + btn).click();
        Analytics.Main.loadProjects();
        Analytics.Main.getTaskTypeByProject();
        Analytics.Main.setDateInterval('7');
    },
    hide: function (e) {
        Utility.addParamToUrl("mainview", "body");
        $('.main_body_class').show();
        $('#main_body_class_analytics').hide();
        ActivityDiagram.hidePanel();
        ProjectPreview.hide();
        new UserStory().refreshCurrentBacklog();
    },
    toggleSubmenu: function (e, menuName) {
        $('.analytics-sub-menu').removeClass("us-sm-active");
        var sm = '#analytics-button-' + menuName;
        $(sm).addClass('us-sm-active');
        global_var.analytics_tab = menuName;
        Utility.addParamToUrl('analytics_tab', global_var.analytics_tab);
        $('.analytics-details').hide();
        $('#analytics-details-' + menuName).show();
        if (menuName === 'general') {
            Analytics.generalCountByProject();
        } else if (menuName === 'storytask') {
            Analytics.projectTaskCount();
        } else if (menuName === 'userstorylist') {
            Analytics.loadProjects();
        } else if (menuName === 'spenthours') {
            Analytics.getSpentHoursReport();
            Analytics.loadProjects4SpentHours();
        }
    },
    getSpentHoursReport: function () {

    },
    loadProjects4SpentHours: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.asc = "projectName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectList4Modal",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                $('#analytics_filter_by_projects >tbody').html('');
                var obj = res.tbl[0].r;
                for (var n = 0; n < obj.length; n++) {
                    var tr = $('<tr></tr>')
                            .append('<td><input onchange="Analytics.getAssigneeByProject(this)" \n\
type="checkbox" class="analytics_filter_checkbox_project" id="' +
                                    obj[n].id + '" value="' + obj[n].id + '">' + replaceTags(obj[n].projectName) + '</td>')
                    $('#analytics_filter_by_projects >tbody').append(tr);
                }
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    generalCountByProject: function () {
        $('#analytics-details-general-project-list >tbody').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectCountList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                Analytics.generalCountByProjectDetail(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    generalCountByProjectDetail: function (res) {
        $('#analytics-details-general-project-list >tbody').html('');
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                var newPerc = o.overalCount === '0' ? 0 : parseFloat((parseFloat(o.newCount) * 100) / parseFloat(o.overalCount)).toFixed(2);
                var ongoingPerc = o.overalCount === '0' ? 0 : parseFloat((parseFloat(o.ongoingCount) * 100) / parseFloat(o.overalCount)).toFixed(2);
                var closedPerc = o.overalCount === '0' ? 0 : parseFloat((parseFloat(o.closedCount) * 100) / parseFloat(o.overalCount)).toFixed(2);
                var tr = $('<tr></tr>')
                        .append($('<td></td>').html((n + 1)))
                        .append($('<td></td>').html(replaceTags(o.projectName)))
                        .append($('<td></td>').html(o.overalCount))
                        .append($('<td></td>').html(o.newCount))
                        .append($('<td></td>').html(newPerc))
                        .append($('<td></td>').html(o.ongoingCount))
                        .append($('<td></td>').html(ongoingPerc))
                        .append($('<td></td>').html(o.closedCount))
                        .append($('<td></td>').html(closedPerc))
                        .append($('<td></td>').html(o.sourcedCount))
                        .append($('<td></td>').html(o.boundCount))
                        .append($('<td></td>').html(o.initialCount));
                $('#analytics-details-general-project-list >tbody').append(tr);
            }

        } catch (e) {
//            console.log("error")
        }

    },
    projectTaskCount: function () {
        $('#analytics-details-project-task-list >tbody').html('');
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.project = 'projectTaskCount';
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectReport",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                try {
                    Analytics.projectTaskCountDetails(res);
                } catch (err) {
                }
            },
            error: function () {
//                Toaster.showError(('somethingww'));
            }
        });
    },
    projectTaskCountDetails: function (res) {
        $('#analytics-details-project-task-list >tbody').html('');
//        if (!res.tbl){
//            return;
//        }
        try {
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                var tr = $('<tr></tr>')
                        .append($('<td></td>').html((n + 1)))
                        .append($('<td></td>').html(replaceTags(o.projectName)))
                        .append($('<td></td>').html(o.overalCount))
                        .append($('<td></td>').html(o.bugCount))
                        .append($('<td></td>').html(o.updateCount))
                        .append($('<td></td>').html(o.overallTaskCount))
                        .append($('<td></td>').html(o.taskNewCount))
                        .append($('<td></td>').html(o.taskOngoingCount))
                        .append($('<td></td>').html(o.taskClosedCount))
                        .append($('<td></td>').html(o.inputCount))
                        .append($('<td></td>').html(o.commentCount));
                $('#analytics-details-project-task-list >tbody').append(tr);
            }

        } catch (e) {
//            console.log("error")
        }
    },
    loadProjects: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.asc = "projectName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetProjectList4Modal",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                Analytics.generateTableBody4MainProject(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    generateTableBody4MainProject: function (res) {
        $('#projectList4Analytics').html('');
        var obj = res.tbl[0].r;
        $('#projectList4Analytics').append($('<option></option')
                .attr("value", "-1")
                .html("--------"));
        for (var n = 0; n < obj.length; n++) {
            var o = $('<option></option')
                    .attr("value", obj[n].id)
                    .html(replaceTags(obj[n].projectName));
            $('#projectList4Analytics').append(o);
        }
    },
    loadUserStory: function () {
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = $('#projectList4Analytics').val();
        json.kv.isSourced = "1";
        json.kv.asc = "backlogName";
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: true,
            success: function (res) {
                Analytics.setUSLists(res);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    setUSLists: function (res) {
        $('#analytics-details-userstorylist-list >tbody').html('');
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            var tr = $('<tr></tr>')
                    .append($('<td></td>').append((n + 1)))
                    .append($('<td></td>').append(o.orderNo))
                    .append($('<td></td>').append(replaceTags(o.backlogName)))
                    .append($('<td></td>').append(o.backlogStatus))
                    .append($('<td></td>').append(o.priority))
                    .append($('<td></td>').append(o.taskCount))
                    .append($('<td></td>').append(o.inputCount))
                    .append($('<td></td>').append(o.commentCount))
                    .append($('<td></td>').append(o.bugCount))
                    .append($('<td></td>').append(o.updateCount));
            $('#analytics-details-userstorylist-list >tbody').append(tr);
        }
    },
    getSpentHoursReportList: function () {
        $('#analytics-details-spenthours-table >tbody').html('');
        var projectId = Analytics.getCheckedProjects4Filter();
        var teller = Analytics.getCheckedAssignee4Filter();
        var dateFrom = toDate('analytics_filter_fromdate');
        var dateTo = toDate('analytics_filter_todate');
        var historyDate = (dateFrom && dateTo) ? dateFrom + "%IN%" + dateTo : "";
        var orderBy = $('#analytics_spenthours_sort_by_list').val();
        var asc = global_var.analytics_current_sort;
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.projectId = projectId;
        json.kv.teller = teller;
        json.kv.historyDate = historyDate;
        json.kv.orderBy = orderBy;
        json.kv.asc = asc;
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetSpentHoursReport",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
//                console.log(JSON.stringify(res));

                $('#analytics-details-spenthours-table >tbody').html('');
                var obj = res.tbl[0].r;
                for (var n = 0; n < obj.length; n++) {
                    var o = obj[n];
                    var tr = $('<tr></tr>')
                            .append($('<td></td>').html((n + 1)))
                            .append($('<td></td>').html(o.projectName))
                            .append($('<td></td>').html(o.historyTellerName))
                            .append($('<td></td>').html(Utility.convertDate(o.historyDate)))
                            .append($('<td></td>').html(o.spentHours));
                    $('#analytics-details-spenthours-table >tbody').append(tr);
                }
            }
        });
    },
    sortBy: function (e, val) {
        $('.analytics_sort_by_arrows').attr('style', 'cursor: pointer;color:darked;font-size:14px;');
        $(e).attr('style', 'cursor: pointer;color:green;font-size:14px;');
        global_var.analytics_current_sort = val;
        Analytics.getSpentHoursReportList(this)
    },
    getCheckedObjectsByClass: function (className) {
        var st = "A" + "%IN%";
        $('.' + className).each(function (e) {
            if ($(this).is(":checked") && !st.includes($(this).val())) {
                st += $(this).val() + "%IN%";
            }
        });
        return st;
    },
    getCheckedProjects: function () {
        return Analytics.getCheckedObjectsByClass('analytics_filter_checkbox_project');
    },
    getCheckedAssignees: function () {
        return Analytics.getCheckedObjectsByClass('analytics_filter_checkbox_assignee');
    },
    getCheckedLabels: function () {
        return Analytics.getCheckedObjectsByClass('analytics_filter_checkbox_label');
    },
    getCheckedSprints: function () {
        return Analytics.getCheckedObjectsByClass('analytics_filter_checkbox_sprint');
    },
    getCheckedTaskTypes: function () {
        return Analytics.getCheckedObjectsByClass('analytics_filter_checkbox_tasktype');
    },
    getCheckedPriorities: function () {
        return Analytics.getCheckedObjectsByClass('analytics_filter_checkbox_priority');
    },
    getCheckedGroupBy: function () {
        var st = "";
        $('.analytics_filter_checkbox_groupby').each(function (e) {
            if ($(this).is(":checked") && !st.includes($(this).val())) {
                st += $(this).val() + ",";
            }
        });
        return st;
    },
    getCheckedProjects4Filter: function () {
        var st = "";
        $('.analytics_filter_checkbox_project').each(function (e) {
            if ($(this).is(":checked") && !st.includes($(this).val())) {
                st += $(this).val() + "%IN%";
            }
        });
        return st;
    },
    getCheckedAssignee4Filter: function () {
        var st = "";
        $('.analytics_filter_checkbox_assignee').each(function (e) {
            if ($(this).is(":checked") && !st.includes($(this).val())) {
                st += $(this).val() + "%IN%";
            }
        });
        return st;
    },
    checkAllProjects: function (e) {
        $('.analytics_filter_checkbox_project').each(function () {
            $(this).prop('checked', true);
        });
        $('.analytics_filter_checkbox_project').first().change();
    },
    uncheckAllProjects: function (e) {
        $('.analytics_filter_checkbox_project').each(function () {
            $(this).prop('checked', false);
        });
        $('.analytics_filter_checkbox_project').first().change();
    },
    checkAllLabels: function (e) {
        $('.analytics_filter_checkbox_label').each(function () {
            $(this).prop('checked', true);
        });
        $('.analytics_filter_checkbox_label').first().change();
    },
    uncheckAllLabels: function (e) {
        $('.analytics_filter_checkbox_label').each(function () {
            $(this).prop('checked', false);
        });
        $('.analytics_filter_checkbox_label').first().change();
    },
    checkAllSprints: function (e) {
        $('.analytics_filter_checkbox_sprint').each(function () {
            $(this).prop('checked', true);
        });
        $('.analytics_filter_checkbox_label').first().change();
    },
    uncheckAllSprints: function (e) {
        $('.analytics_filter_checkbox_sprint').each(function () {
            $(this).prop('checked', false);
        });
        $('.analytics_filter_checkbox_sprint').first().change();
    },
    checkAllTaskTypes: function (e) {
        $('.analytics_filter_checkbox_tasktype').each(function () {
            $(this).prop('checked', true);
        });
        $('.analytics_filter_checkbox_tasktype').first().change();
    },
    uncheckAllTaskTypes: function (e) {
        $('.analytics_filter_checkbox_tasktype').each(function () {
            $(this).prop('checked', false);
        });
        $('.analytics_filter_checkbox_tasktype').first().change();
    },
    checkAllPriority: function (e) {
        $('.analytics_filter_checkbox_priority').each(function () {
            $(this).prop('checked', true);
        });
        $('.analytics_filter_checkbox_priority').first().change();
    },
    uncheckAllPriority: function (e) {
        $('.analytics_filter_checkbox_priority').each(function () {
            $(this).prop('checked', false);
        });
        $('.analytics_filter_checkbox_priority').first().change();
    },
    checkAllGroupBy: function (e) {
        $('.analytics_filter_checkbox_groupby').each(function () {
            $(this).prop('checked', true);
        });
        $('.analytics_filter_checkbox_groupby').first().change();
    },
    uncheckAllGroupBy: function (e) {
        $('.analytics_filter_checkbox_groupby').each(function () {
            $(this).prop('checked', false);
        });
        $('.analytics_filter_checkbox_groupby').first().change();
    },
    checkAllAssignees: function (e) {
        $('.analytics_filter_checkbox_assignee').each(function () {
            $(this).prop('checked', true);
        });
        $('.analytics_filter_checkbox_assignee').first().change();
    },
    uncheckAllAssignees: function (e) {
        $('.analytics_filter_checkbox_assignee').each(function () {
            $(this).prop('checked', false);
        });
        $('.analytics_filter_checkbox_assignee').first().change();
    },
}


var ProjectPreview = {
    loadBacklog: function () {
        var keys = SACore.GetBacklogKeys();
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            var o = SACore.Backlogs[k];
            if (o.inputCount.length === 0 || parseFloat(o.inputCount) === 0) {
                continue;
            }
        }
    },
    setEmptyMessage4ProjectViev: function () {
        var st = '<div  style="padding:30px;text-align:center;">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        return st;
    },
    show: function () {
//        showProgress();
//        new UserStory().refreshBacklog();

        $('.main_body_class').hide();
        $('#main_body_class_projectpreview').show();
        global_var.mainview = 'projectpreview'
        Utility.addParamToUrl("mainview", global_var.mainview);

        this.showDetails();
    },
    showDetails: function () {
        $('#projectpreview_sidebar_id_main').html("");
        var res = SABacklogLabel.toJSONAsBacklogLabel();
        ProjectPreview.getGroupLabelDetails(res);
    },
    hide: function () {
        $('#main_body_class_projectpreview').hide();
    },
    getLabelList: function () {
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        json.kv.isMenu = "1"
        var that = this;
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetLabelList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                var r = res;
                if (r.tbl.length === 0) {
                    that.getAllLabelListDetails();
                } else {
                    that.getLabelListDetails(r);
                }

            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
    },
    getAllLabelListDetails: function () {
        $('#projectpreview_sidebar_id_main').html("");
        for (var n = 0; n < 1; n++) {
            var a = $("<a></a>")
                    .attr("href", "#menu" + (1))
                    .attr("data-toggle", "collapse")
                    .attr("data-parent", "#MainMenu")
                    .addClass("list-group-item list-group-item-success")
                    .attr('style', "background-color:#E8E8E8")
                    .attr("aria-expanded", "true")
                    .append("Main Menu")
                    .append('   ')
                    .append($('<i></i>').addClass("fa fa-caret-down"));
            var div = ProjectPreview.getAllBacklogListbyLabel();
            $('#projectpreview_sidebar_id_main').append(a);
            $('#projectpreview_sidebar_id_main').append(div);
            $('#menu1').find('a').first().click();
        }
    },
    getGroupLabelDetails: function (res) {
        $('#projectpreview_sidebar_id_main').html("");
        try {
            var st = "";
            var obj = res.tbl[0].r;
            for (var n = 0; n < obj.length; n++) {
                try {


                    var a = $("<a></a>")
                            .attr("href", "#menu" + (n + 1))
                            .attr("data-toggle", "collapse")
                            .attr("data-parent", "#MainMenu")
                            .addClass("list-group-item list-group-item-success")
                            .attr('style', "background-color:#E8E8E8")
                            .attr("aria-expanded", "true")
                            .append(obj[n].name)
                            .append('   ')
                            .append($('<i></i>').addClass("fa fa-caret-down"));
                    var div = ProjectPreview.getBacklogListbyLabelDetails4View(obj[n].id, n);
                    if (div.length > 0) {
                        $('#projectpreview_sidebar_id_main').append(a);
                        $('#projectpreview_sidebar_id_main').append(div);
                        st += div;
                    }

                } catch (err) {
                }
            }
            if (st.length === 0) {
                $('#projectpreview_sidebar_id_main')
                        .append(this.setEmptyMessage4ProjectViev())
            }
        } catch (err) {

        }
        $('#menu1').find('a').first().click();
    },
    getLabelListDetails: function (res) {
        $('#projectpreview_sidebar_id_main').html("");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            var a = $("<a></a>")
                    .attr("href", "#menu" + (n + 1))
                    .attr("data-toggle", "collapse")
                    .attr("data-parent", "#MainMenu")
                    .addClass("list-group-item list-group-item-success")
                    .attr('style', "background-color:#E8E8E8")
                    .attr("aria-expanded", "true")
                    .append(obj[n].name)
                    .append('   ')
                    .append($('<i></i>').addClass("fa fa-caret-down"));
            var div = ProjectPreview.getBacklogListbyLabel(obj[n].id, n);
            $('#projectpreview_sidebar_id_main').append(a);
            $('#projectpreview_sidebar_id_main').append(div);
            $('#menu1').find('a').first().click();
        }
    },
    getBacklogListbyLabel: function (labelId, n) {
        if (!labelId) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkLabelId = labelId;
        var that = this;
        var div = [];
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBakclogListByLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                div = that.getBacklogListbyLabelDetails(res, n);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
        return div;
    },
    getAllBacklogListbyLabel: function () {

        var json = {kv: {}};
        try {
            json.kv.cookie = getToken();
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var div = [];
        var data = JSON.stringify(json);
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetAllBakclogListByLabel",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                div = that.getBacklogListbyLabelDetails(res, 1);
            },
            error: function () {
                Toaster.showError(('somethingww'));
            }
        });
        return div;
    },
    getBacklogListbyLabelDetails4View: function (labelId, n) {
        var div1 = $('<div></div>');
        var div = $('<div></div>')
                .attr('id', "menu" + (n + 1))
                .addClass("collapse show");

        var idx = 0;
        var obj = SABacklogLabel.GetBacklogList(labelId);
        for (var n = 0; n < obj.length; n++) {
            var bname = replaceTags(SACore.GetBacklogname(obj[n]));
            var bnameLow = bname.toLowerCase();
            var stext = $('#project_view_search').val().toLowerCase();
            if ((stext.length > 0) && !bnameLow.includes(stext)) {
                continue;
            }
            idx++;
            var a = $("<a href='#'></a>")
                    .attr('style', "cursor:pointer;")
                    .attr("onclick", "ProjectPreview.getGUIPage('" + obj[n] + "')")
                    .addClass("list-group-item")
                    .css('padding', "5px 5px")
                    .append(bname);
            div.append(a);
        }

        if (idx === 0) {
            return "";
        }

        div1.append(div);
        return div1.html();
    },
    getBacklogListbyLabelDetails: function (res, n) {
        var div1 = $('<div></div>');
        var div = $('<div></div>')
                .attr('id', "menu" + (n + 1))
                .addClass("collapse show");
        var obj = res.tbl[0].r;
        for (var n = 0; n < obj.length; n++) {
            var a = $("<a></a>")
                    .attr('style', "cursor:pointer;")
                    .attr("onclick", "ProjectPreview.getGUIPage('" + obj[n].fkBacklogId + "')")
                    .addClass("list-group-item")
                    .append(replaceTags(obj[n].backlogName));
            div.append(a);
        }
        div1.append(div);
        return div1.html();
    },
    getGUIPage: function (backlogId) {

        var div = this.getBacklogDocument(backlogId);
        $('#projectpreview_gui_design').html('');
        $('#projectpreview_gui_design').append(div);

    },
    getBacklogDocument: function (backlogId) {
        var div = $('<div>');
        div.append(this.getGUIPage4Header(backlogId));
        div.append(this.getGUIPage4InputTable(backlogId));
        div.append(this.getGUIPage4GUIDesign(backlogId));
        div.append(this.getGUIPage4AttachedImage(backlogId));
        div.append(this.getGUIPage4Attachment(backlogId));
        this.getGUIPage4NotifiedLabel(backlogId, div);
        return div;
    },
    printDocument: function () {
        printById('texnikitapshiriq_body');
    },
    getGUIPage4Header: function (backlogId) {
        return  $('<div class="col-12">')
                .css("background-color", "#2C73B4")
                .css("margin-top", "30px")
                .append($('<h3>').css("color", "white")
                        .append(SACore.GetBacklogname(backlogId))
                        .append(" ( #" + SACore.GetBacklogOrderNo(backlogId) + ")"))
    },
    getGUIPage4NotifiedLabel: function (backlogId, div) {
        var key = SACore.GetBaklogNotifiedLabel(backlogId);
        var f = true;
        for (var i = 0; i < key.length; i++) {
            try {
                var notifiedId = key[i].trim();
                var labelId = SABacklogLabel.GetNotifiedLabelLabelId(notifiedId);
                var projectId = SABacklogLabel.GetNotifiedLabelProjectId(notifiedId);
                var sdate = SABacklogLabel.GetNotifiedLabelStartDate(notifiedId);
                var edate = SABacklogLabel.GetNotifiedLabelEndDate(notifiedId);
                var stime = SABacklogLabel.GetNotifiedLabelStartTime(notifiedId);
                var etime = SABacklogLabel.GetNotifiedLabelEndTime(notifiedId);

                var tbl = new UserStory().changeRequestForStartDateHeader(
                        projectId, backlogId, sdate, edate, stime, etime)

                var lblName = SABacklogLabel.GetBacklogLabelName(labelId);

                div.append("<br>");
                if (sdate) {
                    if (f) {
                        div.append('<br><br>');
                        div.append($("<h5>").append("Change History (Versions)<br><br>"));
                        f = false;
                    }

                    div.append($("<h6>").append(lblName).append(" - (")
                            .append(Utility.convertDate(sdate))
                            .append(", ")
                            .append(Utility.convertTime(stime))
                            .append(" - ")
                            .append(Utility.convertDate(edate))
                            .append(", ")
                            .append(Utility.convertTime(etime))
                            .append(")")
                            );
                }
                div.append(tbl)
            } catch (err) {
            }

        }
    },

    getGUIPage4GUIDesign: function (backlogId) {
        var st = "";
        var res = SAInput.toJSONByBacklog(backlogId);
        var divRoot = $('<div class="col-12">');

        var div = $('<div>')
                .attr("style", "max-width:800px;border: 1px solid gray; border-round:4px;" +
                        Component.ReplaceCSS(SACore.GetBacklogParam1(backlogId)));

        if (SACore.GetBaklogIsApi(backlogId) !== '1') {
            st = new UserStory().getGUIDesignHTMLPure(res);
        }

        if (st) {
            divRoot.append("<br><br>");
            divRoot.append($('<h6>').append('Prototype'));
            div.append(st);
            divRoot.append(div);
        }
        return divRoot;
    },

    getGUIPage4InputTable: function (backlogId) {
        var div = $('<div>');
        var res = SAInput.toJSONByBacklog(backlogId);
        var ind = 0;
        var table = new UserStory().getInputTable4StoryCard4Select(res, ind, 0, '', '');

        try {
            if (table.find('tbody').html().length > 0) {
                div.append("<br><br>");
                div.append($('<h6>').append('Input Table'));
                div.append(table);
            }
        } catch (err) {
        }
        return div;
    },

    getGUIPage4Attachment: function (backlogId) {

        var res = SACore.GetBaklogFileUrls(backlogId).split(",");
        var resId = SACore.GetBaklogFileUrlIds(backlogId).split(",");

        var div = $('<div class="row guiviewmain">');
        for (var i = 0; i < res.length; i++) {
            try {
                div.append(new UserStory().generateCommentFileLine4View(resId[i].trim(), res[i].trim(), "col-4"));
            } catch (e) {
            }
        }
        var div1 = $('<div class="col-12 guiviewmain">');

        if (div.html().length > 0) {
            div1.append('<br><br>');
            div1.append($('<h6>').append('Attached File(s)'));
        }

        div1.append(div);
        return div1.html();
    },
    getGUIPage4AttachedImage: function (backlogId) {
        var res = SACore.GetBaklogFileUrls(backlogId).split(",");
        var resId = SACore.GetBaklogFileUrlIds(backlogId).split(",");
        var div = $('<div class="row guiviewmain">');
        for (var i = 0; i < res.length; i++) {
            try {
                div.append(new UserStory().generateCommentFileLine4ViewImage(resId[i].trim(), res[i].trim(), "col-12"));
            } catch (e) {
            }
        }

        var div1 = $('<div class="col-12 guiviewmain">');

        if (div.html().length > 0) {
            div1.append('<br><br>');
            div1.append($('<h6>').append('Attached Image(s)'));
        }


        div1.append(div);
        return div1.html();
    },

    getGUIPageOld: function (el, backlogId) {
        var backlog = new UserStory().getBacklogCoreInfoById(backlogId);
        var canvasCSS = Component.ReplaceCSS(backlog.kv.param1);
        $('#projectpreview_gui_design').attr('style', canvasCSS);

        $('#projectpreview_gui_design_title').html($(el).html());
        $('#projectpreview_gui_design').attr('bid', backlog.kv.id);
        $('#projectpreview_gui_design').attr('bcode', makeId(18));



        var innerHTML = new UserStory().genGUIDesignHtmlById(backlogId);
        innerHTML = (innerHTML) ? innerHTML
                : '<div style="padding:30px;text-align:center">' +
                '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                '<h5> No User Story have been selected or created on this project</h5>' +
                '<p>All Pages related to the User Story on this project will appear here</p>' +
                '<p>Please Select User Story</p>' +
                '</div>'
        $('#projectpreview_gui_design').html(innerHTML);
    },

}


function getParamFromFnline(fnline, fn, param) {
    var res = "";
    try {
        var res = "";
        var n1 = fnline.indexOf(fn);
        var n2 = fnline.indexOf("fn_(", n1 + 1);
        n2 = (n2 === 0) ? fnline.length - 1 : n2;
        var pureLine = fnline.substring(n1, (n2));
        pureLine = pureLine.replace('%IN%', '');

        var params = pureLine.split('?')[1];
        var fn_text = params.split('::')[0];
        try {
            var fn_paramlist = params.split('::')[1];
            var kv_list = fn_paramlist.split('&');
            for (var i = 0; i < kv_list.length; i++) {
                var key = kv_list[i].split('=')[0];
                var val = kv_list[i].split('=')[1];
                if (key.includes(param)) {
                    res = val;
                    return res;
                }
            }
        } catch (err) {
        }
    } catch (err1) {

    }
    
    return res;
}


// toogleBacklogDescEdit: function (e, id) {
//     $(".descriptiontable tr").removeClass("activetr");
//     var inp = $('<input type="text" class="form-control newinp" style="border:white;" >')
//         .css("width", "100%")
//         .attr("onchange", "new UserStory().updateBacklogDesc(this,'" + id + "')")
//
//         .val($(e).attr('idesc'))
//
//     $(e).html(inp);
//     $(e).parent("tr").addClass("activetr");
//
//     inp.focus();
// },

//let valuedesc;
function updateBacklogDesc (e) {
   let parentd= $(e).parent();
   let ee =$(e).parent("tr");
  let inpitt=$(e).val();
  $(e).remove();
    parentd.text(inpitt);

    ADDtrafter(e);

}


function ADDtrafter(e) {
console.log("Ffff");
    var tr= $(e).closest("tr");
    var inp = $('<input type="text" class="form-control newinp" style="border:white;" >') .css("width", "100%").attr("onchange", "updateBacklogDesc(this)")
        var additiontr=$("<tr>")
            .append($('<td>').html('<img class="sc-IbsAh kqHqhS" role="presentation" src="https://jirainteqrasiya.atlassian.net/secure/viewavatar?size=medium&avatarId=10318&avatarType=issuetype">'))
            .append($('<td>').html(inp))
            .append($('<td>')
                .append($('<div class="dropdown" style="display: inline-block;">')

                    .append(' <button class="btn newin dropdown-toggle fa fa-ellipsis-h" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
                        '</button>')
                    .append($('<div class="dropdown-menu uuu" aria-labelledby="dropdownMenuLink">')
                        .append($('<button class="dropdown-item firstbut" >')
                            .text('Delete')
                            .attr("onclick", "")
                        )
                        .append($('<button class="dropdown-item firstbut" >')
                            .text('Add')
                            .attr("onclick", "ADDtrafter(this)")
                        )

                    )));
        tr.after(additiontr);

}
