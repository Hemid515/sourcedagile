/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var urlGl = "https://app.sourcedagile.com/";
//var urlGl = "http://localhost:8080/tsn1/";
//var urlGl=""

var gui_component = {
    "defaultCSS": {
        "EditBox": "width:100%;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "TextArea": "width:100%;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "SelectBox": "width:100%;padding:4px 0 4px 0;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "MultiSelectBox": "width:100%;padding:4px 0 4px 0;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "RadioButton": "width:100%;",
        "CheckBox": "width:100%;",
        "Date": "width:100%;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "Time": "width:100%;border: 1px solid #D2691iE;border-radius:4px; padding: 5px;",
        "Label": "width:100%;",
        "InnerRadioButton": "width:100%;",
        "InnerCheckBox": "width:100%;",
        "InnerEditBox": "width:100%;",
        "InnerLine": "width:100%;",
        "Button": "background-color:#4CAF50;color:white;width:100%;border: 0px solid white;border-radius:4px; padding: 5px;",
        "Hidden": "width:100%;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "Section": "width:100%;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "Icon": "",
        "Tab": "width:100%;border: 1px solid #D2691E;border-radius:4px; padding: 5px;",
        "FilePicker": "width:100%;",
        "Hiperlink": "width:100%;",
        "Image": "width:100%;",
        "Youtube": "width:100%;",
    },
    "actions": {
        "actionList4RelatedSUSList": ["popup", "redirect", "fill"],
        "actionList4InSection": ["fill"],
    },
    "componentPerm": {
        "image": ["img"],
        "icon": ["icon"],
        "action": ["sctn", "tab"],
    }
}

var history_type = {
    "input_new": "New Input Inserted",
    "input_update": "Input Updated",
    "input_delete": "Input Deleted",
    "input_desc_new": "New Input Description Inserted",
    "input_desc_delete": "Input Description Deleted",
    "input_desc_update": "Input Description Updated",
    "task_type_new": "New Task Inserted",
    "task_type_delete": "Task Deleted",
    "task_type_update": "Task Updated",
    "task_type_set_as_ongoing": "Task Set as Ongoing",
    "task_type_close_task": "Task Closed",
    "task_type_notify_bug": "Notified Bug",
    "task_type_notify_update": "Notified Update",
    "task_type_comment_new": "New Comment Added",
    "task_type_status_change": "Status Changed",
    "process_desc_update": "Process Description Changed",
    "input_type_update": "Component Type Changed",
    "input_order_no_update": "Order No Changed",
    "input_cell_update": "Cell Changed",
    "input_css_update": "Component CSS Changed",
    "input_container_css_update": "Container CSS Changed",
    "input_content_update": "Content Changed",
    "input_relation_added": "Related SUS Added",
    "input_relation_deleted": "Related SUS Deleted",
    "": "",
    "": "",
}

function getIndexOfTable(res, tablename) {
    var ind = -1;
    try {
        for (var i = 0; i < res.tbl.length; i++) {
            if (res.tbl[i].tn === tablename) {
                ind = i;
                break;
            }
        }
    } catch (e) {
    }
    return ind;
}

function init() {

    $(document).on('change', '.indesc_check', function (evt) {
        new UserStory().checkInputDescItem(this);
    });
    $(document).on('hidden.bs.modal', '.modal-hide', function (evt) {
        clearGlobalActiveCanvas();
        emptyCanvasDiv();
        global_var.current_upload_canvas = "";
    });
    $(document).on('click', '.pro-tr', function (evt) {
        $('.pro-tr').removeClass("active");
        new Project().showProjectDetails(this);
        $(this).toggleClass("active");
    });
    $(document).on('click', '.tasktype-tr', function (evt) {
        $('.tasktype-tr').removeClass("active");
        new TaskType().showTaskTypeDetails(this);
        $(this).toggleClass("active");
    });
    $(document).on('click', '.user-tr', function (evt) {
        $('.user-tr').removeClass("active");
        new User().showUserDetails(this);
        $(this).toggleClass("active");
    });
    $(document).on('click', '.us-ipo-input-tr', function (evt) {
        $('.us-ipo-input-tr').removeClass("active");
        new UserStory().showIPOInputDetails(this);
        $(this).toggleClass("active");
//        $('#us-ipo-inputdescription').focus();
    });
    $(document).on('click', '.us-filter-checkbox-priority', function (e) {
        global_var.userStoryFilter.priority = "";
        var st = "";
        if (($(this).val() === 'all')) {
            if ($(this).is(":checked")) {
                $('.us-filter-checkbox-priority').not(e).prop("checked", true);
            } else {
                $('.us-filter-checkbox-priority').not(e).prop("checked", false);
            }
        }

        $('.us-filter-checkbox-priority').each(function (e) {
            if ($(this).is(":checked") && ($(this).val() !== 'all')) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.priority = st;
        new UserStory().load();
        if (!$(this).is(":checked") && ($(this).val() !== 'all')) {
            $('.us-filter-checkbox-priority').first().prop("checked", false);
        }
    });
    $('body').on('keydown', function (e) {

        if (e.keyCode === 17) {
            global_var.is_body_ctrl_pressed = "1";
        } else {
            global_var.is_body_ctrl_pressed = "0";
        }
    });
    $('body').on('keyup', function (e) {
        global_var.is_body_ctrl_pressed = "0";
    });
    $(document).on('click', '.us-checkbox-list', function (e) {
        if (($(this).val() === 'all')) {
            if ($(this).is(":checked")) {
                $('.us-checkbox-list').not(e).prop("checked", true);
            } else {
                $('.us-checkbox-list').not(e).prop("checked", false);
            }
        }

        if ($('.us-checkbox-list:checked').length > 0) {
            $('.assignSprintAndLabel').attr("style", "pointer-events:default;");
        } else {
            $('.assignSprintAndLabel').attr("style", "pointer-events:none;color:gray;");
        }


        if (!$(this).is(":checked") && ($(this).val() !== 'all')) {
            $('.us-checkbox-list').first().prop("checked", false);
        }
    });
    $(document).on('click', '.us-filter-checkbox-label', function (e) {
        global_var.userStoryFilter.label = "";
        var st = "";
        if (($(this).val() === 'all')) {
            if ($(this).is(":checked")) {
                $('.us-filter-checkbox-label').not(e).prop("checked", true);
            } else {
                $('.us-filter-checkbox-label').not(e).prop("checked", false);
            }
        }

        $('.us-filter-checkbox-label').each(function (e) {
            if ($(this).is(":checked") && ($(this).val() !== 'all')) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.label = st;
        new UserStory().load();
        if (!$(this).is(":checked") && ($(this).val() !== 'all')) {
            $('.us-filter-checkbox-label').first().prop("checked", false);
        }
    });
    $(document).on('click', '.us_filter_status', function (e) {
        global_var.userStoryFilter.backlogStatus = "";
        var st = "";
        $('.us_filter_status').each(function (e) {
            if ($(this).is(":checked")) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.backlogStatus = st;
        new UserStory().load();
    });
    $(document).on('click', '.us_filter_createdby_class', function (e) {
        global_var.userStoryFilter.createdBy = "";
        var st = "";
        $('.us_filter_createdby_class').each(function (e) {
            if ($(this).is(":checked")) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.createdBy = st;
        new UserStory().load();
    });
    $(document).on('click', '.us_filter_assignee_class', function (e) {
        global_var.userStoryFilter.assignee = "";
        var st = "";
        $('.us_filter_assignee_class').each(function (e) {
            if ($(this).is(":checked")) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.assignee = st;
        new UserStory().load();
    });



    $(document).on('click', '.us_filter_tasktype_class', function (e) {
        global_var.userStoryFilter.taskType = "";
        var st = "";
        $('.us_filter_tasktype_class').each(function (e) {
            if ($(this).is(":checked")) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.taskType = st;
        new UserStory().load();
    });
    $(document).on('click', '.us_filter_assignedlabel_class', function (e) {
        global_var.userStoryFilter.taskType = "";
        var st = "";
        $('.us_filter_assignedlabel_class').each(function (e) {
            if ($(this).is(":checked")) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.assignedLabel = st;
        new UserStory().load();
    });
    $(document).on('click', '.us_filter_tasktype_class', function (e) {
        global_var.userStoryFilter.taskType = "";
        var st = "";
        $('.us_filter_tasktype_class').each(function (e) {
            if ($(this).is(":checked")) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.taskType = st;
        new UserStory().load();
    });
    $(document).on('click', '.us-filter-checkbox-sprint', function (e) {
        global_var.userStoryFilter.sprint = "";
        var st = "";
        if (($(this).val() === 'all')) {
            if ($(this).is(":checked")) {
                $('.us-filter-checkbox-sprint').not(e).prop("checked", true);
            } else {
                $('.us-filter-checkbox-sprint').not(e).prop("checked", false);
            }
        }

        $('.us-filter-checkbox-sprint').each(function (e) {
            if ($(this).is(":checked") && ($(this).val() !== 'all')) {
                st += $(this).val() + '%IN%';
            }
        });
        global_var.userStoryFilter.sprint = st;
        new UserStory().load();
        if (!$(this).is(":checked") && ($(this).val() !== 'all')) {
            $('.us-filter-checkbox-sprint').first().prop("checked", false);
        }
    });
}


var Utility = {
    convertDate: function (d, seperator) {
        var st = "";
        var sep = (seperator) ? seperator : global_var.data_eliminator;
        try {
            st = d.substring(6, 8) + sep + d.substring(4, 6) + sep + d.substring(0, 4)
        } catch (e) {
        }
        return st;
    }
    ,
    convertTime: function (d, seperator) {
        var st = "";
        var sep = (seperator) ? seperator : global_var.time_eliminator;
        try {
            st = d.substring(0, 2) + sep + d.substring(2, 4) + sep + d.substring(4, 6);
        } catch (e) {
        }
        return st;
    },
    focus: function (id) {
        setTimeout(function () {
            $('#' + id).focus();
        }, 600);
    },
    addParamToUrl: function (param, value) {
        var newurl = Utility.replaceUrlParam(document.location.href, param, value);
        window.history.pushState({path: newurl}, '', newurl);
    },
    replaceUrlParam: function (url, paramName, paramValue) {
        if (paramValue == null) {
            paramValue = '';
        }
        var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
        if (url.search(pattern) >= 0) {
            return url.replace(pattern, '$1' + paramValue + '$2');
        }
        url = url.replace(/[?#]$/, '');
        return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    },
    getParamFromUrl: function (param) {
        var parts = document.location.href.split("?");
        var params = parts[parts.length - 1];
        var pairs = params.split("&");
        var res = '';
        for (var i = 0; i < pairs.length; i++) {
            var k = pairs[i].split("=")[0];
            var v = pairs[i].split("=")[1];
            if (k === param) {
                res = v;
                break;
            }
        }
        return res.replace("#", "");
    },
    setParamOnLoad: function () {
        var parts = document.location.href.split("?");
        var params = parts[parts.length - 1];
        var pairs = params.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var k = pairs[i].split("=")[0];
            var v = pairs[i].split("=")[1];
            global_var[k] = v;
//            if (k === 'current_project_id') {
////                $('#projectList option')
////                        .removeAttr('selected')
////                        .filter('[value='+v+']')
////                        .attr('selected', true)
//                $('#projectList').val(v);
//            }

        }
    },
}

function getFilePath(fileName) {
    var st = "";
    return st;
}


function toDate(id) {
    var st = "";
    if ($('#' + id).val()) {
        var date = new Date($('#' + id).val());
        var day = date.getDate();
        day = day.toString(10).length === 1 ? '0' + day : day;
        var month = date.getMonth() + 1;
        month = month.toString(10).length === 1 ? '0' + month : month;
        var year = date.getFullYear();
        st = year + "" + month + '' + day;
    }
    return st;
}

function ComponentInfo() {
    this.orderNo = "";
    this.label = "";
    this.tableName = "";
    this.componentType = "";
    this.content = "";
    this.cellNo = "6";
    this.param1 = "";
    this.containerCSS = "";
    this.css = "";
    this.isFromTable = false;
    this.tableRowId = 0;
    this.tableHeader = "";
    this.id = "";
    this.isDragable = false;
    this.withLabel = true;
    this.description = "";
    this.hasOnClickEvent = true;
    this.isLabelInTop = true;
    this.inputTable = "";
    this.addTooltip = true;
    this.action = "";
    this.inSection = "";
    this.event = "";
    this.relatedSUS = "";
    this.pureDescription = "";
    this.sequence = [];
}



var Component = {
    ComponentEvent: {
        Init: function (el, comp) {
            Component.ComponentEvent.addId2Component(el, comp);
            Component.ComponentEvent.setPureEventByDescription(el, comp);
            if (comp.action === 'close') {
                Component.ComponentEvent.getCloseEvent(el);
            } else if (comp.action === 'popup') {
                Component.ComponentEvent.getPopupEvent(el, comp);
            } else if (comp.action === 'redirect') {
                Component.ComponentEvent.getRedirectEvent(el, comp);
            } else if (comp.action === 'fill') {
                Component.ComponentEvent.getFillEvent(el, comp);
            } else if (comp.action === 'save') {
                Component.ComponentEvent.getCloseEvent(el);
                Component.ComponentEvent.getSaveEvent(el, comp);
            } else if (comp.action === 'delete') {
                Component.ComponentEvent.getDeleteEvent(el, comp);
            }
        },
        setPureEventByDescription: function (el, comp) {
            try {

                if (comp.pureDescription.includes('fn_(isnoteditable)')) {
                    el.prop("disabled", true);
                }
                if (comp.pureDescription.includes('fn_(isreadonly)')) {
                    el.prop("readonly", true);
                }
                if (comp.pureDescription.includes('fn_(Placeholderis)')) {
                    var res = getParamFromFnline(comp.pureDescription, 'fn_(Placeholderis)', 'Placeholderis');
                    el.prop("placeholder", res);
                }
            } catch (err) {

            }
        },
        addId2Component: function (el, comp) {
            el.attr('id', 'comp_id_' + comp.id);
        },
        getEventLine: function (comp) {
            var res = comp.event + "=''";
            return res;
        },
        getCloseEvent: function (el) {
            el.attr("data-dismiss", 'modal');
        },
        getPopupEvent: function (el, comp) {
            try {
//                var ev = comp.event.length===0 ? "onclick" : comp.event;
                el.attr("onclick", "new UserStory().setGUIComponentButtonGUIModal('" + comp.relatedSUS + "',this)");
            } catch (err) {
            }
        },
        getRedirectEvent: function (el, comp) {
            try {
//                var ev = comp.event.length===0 ? "onclick" : comp.event;
                el.attr("onclick", "new UserStory().setGUIComponentRedirectGUIModal(this,'" + comp.relatedSUS + "',event)");
            } catch (err) {
            }
        },
        getFillEvent: function (el, comp) {
            try {
//                var ev = comp.event.length===0 ? "onclick" : comp.event;
                el.attr("onclick", "new UserStory().setGUIComponentFillGUIModal(this,'"
                        + comp.relatedSUS + "','" + comp.inSection + "')");
            } catch (err) {
            }
        },
        getSaveEvent: function (el) {
            try {
//                var ev = comp.event.length===0 ? "onclick" : comp.event;
//                el.attr("data-dismiss", 'modal');
                el.attr("onclick", "new UserStory().setGUIComponentSaveGUIModal(this,event)");
            } catch (err) {
            }
        },
        getDeleteEvent: function (el) {
            try {
                el.attr("onclick", "new UserStory().setGUIComponentDeleteGUIModal(this)");
            } catch (err) {
            }
        }

    },
    ContainerDiv: function (comp) {
        if (!comp.cellNo) {
            comp.cellNo = 12;
        }
        var div = $('<div></div>')
                .attr('ondragover', 'allowDrop(event)')
                .attr('ondragstart', 'drag(event)')
                .attr('ondrop', 'drop(event)')
                .attr('draggable', 'true')
                .attr('data-toggle', 'tooltip')
                .attr("orderNo", comp.orderNo)
                .attr('style', Component.ReplaceCSS(comp.containerCSS))
                .attr('id', comp.id)
//                .attr('data-original-title', comp.description)
//                .attr('title', comp.description)
                .addClass(comp.addTooltip ? 'tooltipMan' : "")
                .addClass('component-class')
                .addClass('component-container-dashed')
                .addClass('col-' + comp.cellNo);
        if (comp.addTooltip && comp.description.length > 0) {
            div.append($('<span></span>').addClass("tooltiptextMan").html(comp.description))
        }

        if (comp.hasOnClickEvent) {
            div.attr('onclick', 'new UserStory().setInputByGUIComponent(\'' + comp.id + '\')')
        }
        return div;
    },
    AddMandatoryStar: function (comp) {
        return ((comp.pureDescription)
                && comp.pureDescription !== 'undefined'
                && comp.pureDescription.includes('fn_(ismandatory)'))
                ? '<b style="color:red">*</b>' : ""
    },
    ReplaceCSS: function (arg) {
        try {
            arg = arg.replace(/##/g, "");
            return arg;
        } catch (e) {
            return arg
        }
    },
    EditBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
                .attr('style', gui_component.defaultCSS.EditBox + Component.ReplaceCSS(comp.css))
                .attr('type', 'text')
                .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label))
                    .append(star);
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    InnerEditBox: function (comp) {
        var div = Component.ContainerDiv(comp);
        var el = $('<input></input>')
                .attr('style', gui_component.defaultCSS.InnerEditBox + Component.ReplaceCSS(comp.css))
                .attr('type', 'text')
                .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    Image: function (comp) {
        var div = Component.ContainerDiv(comp);
        var el = $('<img></img>')
                .attr('style', gui_component.defaultCSS.Image + Component.ReplaceCSS(comp.css))
                .attr('src', comp.content);
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    Youtube: function (comp) {
        var div = Component.ContainerDiv(comp);
        var el = $('<iframe></iframe>')
                .attr('style', gui_component.defaultCSS.Youtube + Component.ReplaceCSS(comp.css))
                .attr('src', 'https://www.youtube.com/embed/' + comp.content);
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    FilePicker: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
                .attr('style', gui_component.defaultCSS.FilePicker + Component.ReplaceCSS(comp.css))
                .attr('type', 'file')
                .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label)
                    .append(star
                            ));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    Date: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
                .attr('style', gui_component.defaultCSS.Date + Component.ReplaceCSS(comp.css))
                .attr('type', 'date')
                .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label)
                    .append(star
                            ));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    Time: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<input></input>')
                .attr('style', gui_component.defaultCSS.Time + Component.ReplaceCSS(comp.css))
                .attr('type', 'time')
                .attr('value', comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label)
                    .append(star
                            ));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }

        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    TextArea: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var el = $('<textarea></textarea>')
                .attr('style', gui_component.defaultCSS.TextArea + Component.ReplaceCSS(comp.css))
                .attr('rows', '3')
                .text(comp.content);
        Component.ComponentEvent.Init(el, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label)
                    .append(star
                            ));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }
        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    SelectBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var select = $('<select></select>')
                .attr('style', gui_component.defaultCSS.SelectBox + Component.ReplaceCSS(comp.css));
        if (comp.content) {
            var r = comp.content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                select.append($('<option></option>').append(r[i]));
            }
        } else {
            for (var i = 1; i < 4; i++) {
                select.append($('<option></option>').append('Value ' + (i)));
            }
        }
        Component.ComponentEvent.Init(select, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label)
                    .append(star
                            ));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }


        div.append(select);
        return  $('<div></div>').append(div).html();
    },
    MultiSelectBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var select = $('<select></select>')
                .attr('multiple', 'true')
                .attr('row', '4')
                .attr('style', gui_component.defaultCSS.MultiSelectBox + Component.ReplaceCSS(comp.css));
        if (comp.content) {
            var r = comp.content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                select.append($('<option></option>').append(r[i]));
            }
        } else {
            for (var i = 1; i <= 4; i++) {
                select.append($('<option></option>').append('Value ' + (i)));
            }
        }
        Component.ComponentEvent.Init(select, comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label)
                    .append(star
                            ));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }
        div.append(select);
        return  $('<div></div>').append(div).html();
    },
    RadioButton: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>')
                    .append(comp.label)
                    .append(star
                            ));
            div.append(comp.isLabelInTop ? "<br>" : "");
        }
        if (comp.content.length > 0) {
            var r = comp.content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                var el = $('<input></input>')
                        .attr('type', 'radio')
                        .attr('name', 'optradio')
                        .attr('checked', true);
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                        .addClass('radio-inline')
                        .append(el)
                        .append($("<span></span>")
                                .attr('style', gui_component.defaultCSS.RadioButton + Component.ReplaceCSS(comp.css))
                                .text(r[i])
                                .append('&nbsp; '))
                        );
            }
        } else {
            for (var i = 1; i <= 3; i++) {
                var el = $('<input></input>')
                        .attr('type', 'radio')
                        .attr('name', 'optradio')
                        .attr('checked', true);
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                        .addClass('radio-inline')
                        .append(el)
                        .append($("<span></span>")
                                .attr('style', gui_component.defaultCSS.RadioButton + Component.ReplaceCSS(comp.css))
                                .text('Option ' + i + '   ')
                                .append('&nbsp; '))
                        );
            }
        }

        return  $('<div></div>').append(div).html();
    },
    CheckBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        if (comp.withLabel === true) {
            div.append($('<span></span>').append(comp.label)
                    .append(star
                            ))
            div.append((comp.isLabelInTop ? "<br>" : ""))
        }

        if (comp.content.length > 0) {
            var r = comp.content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                var el = $('<input></input>')
                        .attr('type', 'checkbox')
                        .attr('checked', true)
                        ;
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                        .addClass('radio-inline')
                        .append(el)
                        .append($("<span></span>")
                                .attr('style', gui_component.defaultCSS.CheckBox + Component.ReplaceCSS(comp.css))
                                .text(r[i])
                                .append('&nbsp; '))
                        );
            }
        } else {
            for (var i = 1; i <= 3; i++) {
                var el = $('<input></input>')
                        .attr('type', 'checkbox')
                        .attr('name', 'optradio')
                        .attr('checked', true);
                Component.ComponentEvent.Init(el, comp);
                div.append($('<label></label>')
                        .addClass('radio-inline')
                        .append(el)
                        .append($("<span></span>")
                                .attr('style', gui_component.defaultCSS.CheckBox + Component.ReplaceCSS(comp.css))
                                .text('Option ' + i + '   ')
                                .append('&nbsp; '))
                        );
            }
        }

        return  $('<div></div>').append(div).html();
    },
    Label: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        var label = (comp.content) ? comp.content : comp.label;
        var el = $('<span></span>')
                .attr('style', gui_component.defaultCSS.Label + Component.ReplaceCSS(comp.css))
                .append(label)
                .append(star
                        );
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    Hiperlink: function (comp) {

        var a = $('<a></a>')
                .attr('style', gui_component.defaultCSS.Hiperlink + Component.ReplaceCSS(comp.css))
                .text(comp.label)
                .append('<br>');
        Component.ComponentEvent.Init(a, comp);
        (comp.param1)
                ? a.attr('href', '#')
                : (comp.content)
                ? a.attr('href', comp.content)
                : a.attr('href', '#');
        var div = Component.ContainerDiv(comp);
        !(comp.isFromTable) ? div.append('<br>') : div.append("");
        div.append(a);
        return  $('<div></div>').append(div).html();
    },
    InnerRadioButton: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        var el = $('<input></input>')
                .attr('type', 'radio');
        Component.ComponentEvent.Init(el, comp);
        div.append(el)
                .append($("<span></span>")
                        .attr('style', gui_component.defaultCSS.InnerRadioButton + Component.ReplaceCSS(comp.css))
                        .text((comp.content) ? comp.content : comp.label)
                        .append(star
                                )
                        .append('<br>'));
        return  $('<div></div>').append(div).html();
    },
    Hidden: function (comp) {
        var div = Component.ContainerDiv(comp);
        div.append($('<input></input>')
                .attr('style', gui_component.defaultCSS.Hidden + Component.ReplaceCSS(comp.css))
                .attr('type', 'hidden'));
        return  $('<div></div>').append(div).html();
    },
    InnerCheckBox: function (comp) {
        var star = Component.AddMandatoryStar(comp);
        var div = Component.ContainerDiv(comp);
        var el = $('<input></input>')
                .attr('type', 'checkbox');
        Component.ComponentEvent.Init(el, comp);
        div.append(el)
                .append($("<span></span>")
                        .attr('style', gui_component.defaultCSS.InnerCheckBox + Component.ReplaceCSS(comp.css))
                        .text((comp.content) ? comp.content : comp.label)
                        .append(star
                                )
                        .append('<br>'));
        return  $('<div></div>').append(div).html();
    },
    InnerLine: function (comp) {
        var div = Component.ContainerDiv(comp);
        var el = $("<hr></hr>")
                .attr('style', gui_component.defaultCSS.InnerLine + Component.ReplaceCSS(comp.css));
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    Icon: function (comp) {
        comp.content = (comp.content) ? comp.content : 'fa-user-circle';
        var div = Component.ContainerDiv(comp);
        !(comp.isFromTable) ? div.append('<br>') : div.append("");
        var el = $('<i></i>')
                .addClass('fa ' + comp.content)
                .attr('style', Component.ReplaceCSS(comp.css));
        Component.ComponentEvent.Init(el, comp);
        div.append(el);
        return  $('<div></div>').append(div).html();
    },
    Button: function (comp) {
        comp.content = (comp.content) ? comp.content : comp.label;
        var btn = $('<input></input>')
                .attr('style', gui_component.defaultCSS.Button + Component.ReplaceCSS(comp.css))
                .attr('type', 'button')
                .attr('value', comp.content);
        Component.ComponentEvent.Init(btn, comp);
//        (comp.param1) ? btn.attr('onclick', "new UserStory().setGUIComponentButtonGUIModal(\'" + comp.param1 + "\')")
//                .attr('data-toggle', "modal")
//                .attr('data-target', "#userstory-gui-input-component-res-sus1")
//                : "";

        var div = Component.ContainerDiv(comp);
        !(comp.isFromTable) ? div.append('<br>') : div.append("");
        div.append(btn);
        return  $('<div></div>').append(div).html();
    },
    Section: function (comp) {
//        var innerHTML = new UserStory().genGUIDesignHtmlById(comp.param1);
        var innerHTML = "";
        var inputTable = comp.inputTable;
//        if (inputTable.length > 0) {
        if (comp.param1 > 0) {
//
//            try {
//                var jsonT = {"tbl": []};
//                jsonT.tbl.push(JSON.parse(inputTable));
            var jsonT = SAInput.toJSONByBacklog(comp.param1);

            new UserStory().hasSequence(comp.sequence, comp.param1);
            comp.sequence.push(comp.param1);

            innerHTML = new UserStory().getGUIDesignHTMLBody(jsonT, 0, comp.sequence);
//            } catch (err) {
//
//            }
        }


        var div = Component.ContainerDiv(comp);
//        div.append($("<div class='row'></div>")
//                .append(innerHTML))
        div.append(innerHTML);
        return  $('<div></div>').append(div).html();
    },
    Tab: function (comp) {
//        var innerHTML = new UserStory().genGUIDesignHtmlById(comp.param1);
        var innerHTML = "";
        var inputTable = comp.inputTable;
//        if (inputTable.length > 0) {
//            try {
//                jsonT = {"tbl": []};
//                jsonT.tbl.push(JSON.parse(inputTable));
//                innerHTML = new UserStory().getGUIDesignHTMLBody(jsonT, 0);
//            } catch (err) {
//
//            }
//        }



        if (comp.param1 > 0) {
            var jsonT = SAInput.toJSONByBacklog(comp.param1);

            new UserStory().hasSequence(comp.sequence, comp.param1);
            comp.sequence.push(comp.param1);

            innerHTML = new UserStory().getGUIDesignHTMLBody(jsonT, 0, comp.sequence);
        }
        var div = Component.ContainerDiv(comp);
        div.append($("<div class='row'></div>")
                .append(innerHTML))
        return  $('<div></div>').append(div).html();
    }
}

var ComponentOld = {
    EditBox: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span>";
        st += "<input style='width:100%;" + css + "' type='text' value='" + content + "'>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    InnerEditBox: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
        //        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<input style='width:100%;" + css + "' type='text' value='" + content + "'>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    Image: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<img src='" + content + "' style='width:100%;" + css + "'>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    Youtube: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<iframe   style='width:100%;" + css + "' src='https://www.youtube.com/embed/" + content + "'>";
        st += "</iframe>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    FilePicker: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span>";
        st += "<input style='width:100%;" + css + "' type='file'>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    Date: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span>";
        st += "<input style='width:100%;" + css + "' type='date'>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    Time: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span>";
        st += "<input style='width:100%;" + css + "' type='time'>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    TextArea: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span>";
        st += "<textarea style='width:100%;" + css + "' rows='3'>" + content + "</textarea>";
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    SelectBox: function (comp) {
        if (!cell) {
            cell = 12;
        }

        var cnt = '';
        if (content) {
            var r = content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                cnt += "<option>" + r[i] + "</option>";
            }
        } else {
            cnt += "<option>Value 1</option>";
            cnt += "<option>Value 2</option>";
            cnt += "<option>Value 3</option>";
            cnt += "<option>Value 4</option>";
        }

        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span>";
        st += "<select style='width:100%;padding:4px 0 4px 0;" + css + "' type='text'>";
        st += cnt;
        st += "</select>"
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    MultiSelectBox: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var cnt = '';
        if (content) {
            var r = content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                cnt += "<option>" + r[i] + "</option>";
            }
        } else {
            cnt += "<option>Value 1</option>";
            cnt += "<option>Value 2</option>";
            cnt += "<option>Value 3</option>";
            cnt += "<option>Value 4</option>";
        }

        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span>";
        st += "<select style='width:100%;padding:4px 0 4px 0;'" + css + "' type='text' multiple>";
        st += cnt;
        st += "</select>"
        st += "</div>";
        st += "";
        st += "";
        return  st;
    },
    RadioButton: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var cnt = '';
        if (content) {
            var r = content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                cnt += '<label class="radio-inline">'
                cnt += '<input type="radio" name="optradio" checked><span style="width:100%;' + css + '">' + r[i] + ' </span>&nbsp;'
                cnt += '</label>'
            }
        } else {
            cnt += '<label class="radio-inline">'
            cnt += '<input type="radio" name="optradio" checked> <span style="width:100%;' + css + '">Option 1 &nbsp;&nbsp;&nbsp;</span>'
            cnt += '</label>'
            cnt += '<label class="radio-inline">'
            cnt += ' <input type="radio" name="optradio"> <span  style="width:100%;' + css + '">Option 2 &nbsp;&nbsp;&nbsp;</span>'
            cnt += '</label>'
            cnt += '<label class="radio-inline">'
            cnt += ' <input type="radio" name="optradio"> <span  style="width:100%;' + css + '">Option 3&nbsp;&nbsp;&nbsp;</span> '
            cnt += '</label>'
        }


        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span><br>";
        st += cnt;
        st += "</div>";
        return  st;
    },
    CheckBox: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var cnt = '';
        if (content) {
            var r = content.split(/\r*\n/);
            for (var i = 0; i < r.length; i++) {
                cnt += '<label class="radio-inline">'
                cnt += '<input type="checkbox" checked><span  style="width:100%;' + css + '">' + r[i] + '</span> &nbsp;&nbsp;&nbsp;'
                cnt += '</label>'
            }
        } else {
            cnt += '<input type="checkbox" name="vehicle1" value="Bike"><span style="width:100%;' + css + '"> Check Option  1 </span><br>';
            cnt += '<input type="checkbox" name="vehicle2" value="Car"><span style="width:100%;' + css + '"> Check Option 2 </span><br>';
            cnt += '<input type="checkbox" name="vehicle3" value="Boat"><span checked style="width:100%;' + css + '"> Check Option 3</span><br><br>';
        }

        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span>" + label + "</span><br>";
        st += cnt;
        st += "</div>";
        return  st;
    },
    Label: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        label = (content) ? content : label;
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += "<span style='width:100%;" + css + "'>" + label + "</span><br>";
        st += "</div>";
        return  st;
    },
    Hiperlink: function (comp) {
        if (!cell) {
            cell = 12;
        }

        var modal = (param1)
                ? 'onclick="new UserStory().setGUIComponentButtonGUIModal(\'' + param1 + '\')"\n\
                data-toggle="modal" \n\
                data-target="#userstory-gui-input-component-res-sus1"'
                : "";
        var href = (modal)
                ? ' href="#"'
                : (content)
                ? ' href="' + content + '"'
                : ' href="#"';
        var st = "";
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += !(fromTable) ? '<br>' : "";
        st += "<a " + href + "  " + modal + " style='width:100%;" + css + "'>" + label + "</a><br>";
        st += "</div>";
        return  st;
    },
    InnerRadioButton: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += '<input type="radio" ><span style="width:100%;' + css + '">' + label + "<span> <br>";
        st += "</div>";
        return  st;
    },
    Hidden: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += '<input type="hidden"> ' + "" + " <br>";
        st += "</div>";
        return  st;
    },
    InnerCheckBox: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += '<input type="checkbox" ><span style="width:100%;' + css + '">' + label + "<span> <br>";
        st += "</div>";
        return  st;
    },
    InnerLine: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += '<hr style="' + css + '">';
        st += "</div>";
        return  st;
    },
    Icon: function (comp) {
        if (!cell) {
            cell = 12;
        }
        content = (content) ? content : 'user-circle';
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += !(fromTable) ? '<br>' : "";
        st += '<i class="fa fa-' + content + '" style="' + css + '"></i>';
        st += "</div>";
        content = "";
        return  st;
    },
    Button: function (comp) {
        if (!cell) {
            cell = 2;
        }

        content = (content) ? content : label;
        var modal = (param1)
                ? 'onclick="new UserStory().setGUIComponentButtonGUIModal(\'' + param1 + '\')"\n\
                data-toggle="modal" \n\
                data-target="#userstory-gui-input-component-res-sus1"'
                : "";
        var st = ""
        var lid = $("[iname*='" + label + "']").attr('pid');
        st += '<div style="' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='" + containercss + "'>";
        st += !(fromTable) ? '<br>' : "";
        st += '<input style="width:100%;' + css + '" type="button" ' + modal + ' value="' + content + '"> <br>';
        st += "</div>";
        return  st;
    },
    Section: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var innerHTML = new UserStory().genGUIDesignHtmlById(param1);
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="width:100%;' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='width:100%;" + css + "'>";
        st += "<div class='row'>";
        st += innerHTML;
        st += "</div></div>";
        return  st;
    },
    Tab: function (comp) {
        if (!cell) {
            cell = 12;
        }
        var innerHTML = new UserStory().genGUIDesignHtmlById(param1);
        var st = ""
        var lid = $("[iname*='" + "label" + "']").attr('pid');
        st += '<div style="width:100%;' + containercss + '"  class="component-class  col-' + cell + '" id="' + comp.id + '" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)">';
//        st += "<div class=col-" + cell + " style='width:100%;" + css + "'>";
        st += "<div class='row'>";
        st += innerHTML;
        st += "</div></div>";
        return  st;
    }
}
// Start upload preview image

function fileUrl(fname) {
    return urlGl+'api/get/files/' + fname;
}


function fileUrlPrivate(fname) {
    return urlGl+'api/get/filed/' + fname;
}



function videoFileURL(fname) {
    return urlGl+'api/get/filev/' + fname;
}

function pdfFileURL(fname) {
    return urlGl+'api/get/filepdf/' + fname;
}

function logout() {
    document.cookie = "apdtok=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/";
    location.reload();
    location.replace("login.html")
}

function printById(cid) {



//        var res =  $("#smb-details-generalview").html();
//        newWin = window.open("");
//        newWin.document.write(res);
//        newWin.print();
//        newWin.close();

    var mywindow = window.open('', 'my div', 'height=1000px,width=1200px');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('<link rel="stylesheet" href="resource/css/bs4/bootstrap.min.css">');
    mywindow.document.write('<link rel="stylesheet" href="resource/css/bs4/font-awesome.min.css">');
    mywindow.document.write('<link rel="stylesheet" href="resource/css/bs4/bs4-custom.css">');
    mywindow.document.write('<style type="text/css">.test { color:red; } </style></head><body>');
    mywindow.document.write($("#" + cid).html());
    mywindow.document.write('</body></html>');
    window.setTimeout(function () {
        // do whatever you want to do    
        mywindow.print();
    }, 700);
//        mywindow.print();
////        mywindow.document.close();
//        mywindow.document.close();
//        mywindow.print();
//        mywindow.close();

}

function replaceMainTrustedTags(arg) {
    if (!arg) {
        return arg;
    }
    arg = arg.replace(/&lt;b&gt;/g, "<b>");
    arg = arg.replace(/&lt;&#x2F;b&gt;/g, "</b>");
    arg = arg.replace(/&lt;div/g, "<dev");
    arg = arg.replace(/&lt;&#x2F;div&gt;/g, "</dev>");
    arg = arg.replace(/&quot;/g, "'");
    arg = arg.replace(/&gt;/g, ">");
    return arg;
}

function replaceTagsReverse(arg) {
    if (!arg) {
        return arg;
    }
    arg = arg.replace(/&lt;/g, "<");
    arg = arg.replace(/&gt;/g, ">");
    arg = arg.replace(/&quot;/g, "'");
    arg = arg.replace(/&quot;/g, "\"");
    arg = arg.replace(/&#x2F;/g, "/");
    return arg;
}

function replaceJSON(json) {
    return  JSON.parse(replaceTags(JSON.stringify(json)));
}

function replaceTags(arg) {
    if (!arg) {
        return arg;
    }

    if (arg.includes("<") > 0 && arg.includes(">") > 0) {
        arg = arg.replace(/&nbsp;&nbsp;/g, '');
        arg = arg.replace(/  /g, '');
        arg = arg.replace(/< /g, '<');
        arg = arg.replace(/ >/g, '>');
        arg = arg.replace(/<script>/g, '');
        arg = arg.replace(/<\/script>/g, '');
    }
    arg = arg.replace(/</g, '&lt;');
    arg = arg.replace(/>/g, '&gt;');
//    arg = arg.replace('/', '&#x2F;');

//    arg = arg.replace(/'/g, '&quot;');
//    arg = arg.replace(/\\/g, '&quot;');

    return arg;
}

function init4Core() {
    $('[data-toggle="tooltip"]').tooltip();
//    new UserStory().load();
    new Label().load();
    new Sprint().load();
    new User().loadPersonalUserOnInit();
    Priority.load();
    new Project().loadUserList4Combo();
    new Notification().getNotificationCount();
    new Notification().setTime();
}

function add3Dots2Filename(fname) {
    var extension = fname.substr((fname.lastIndexOf('.') + 1));
//    console.log(extension)
    var idx = fname.length >= 10 ? 10 : fname.length;
    var st = fname.substring(0, idx) + '...' + extension;
    return st;
}

function isFloat(arg) {
    var res = true;
    try {
        parseFloat(arg)
    } catch (e) {
        res = false;
    }
    return res;
}

function MapTextAreaHtml(arg) {
    var st = "";
    try {
        var r = arg.split(/\r*\n/);
        for (var i = 0; i < r.length; i++) {
            st += r[i] + "<br>";
        }
    } catch (err) {
    }
    return st;
}
// End upload preview image


function removeSpace(arg) {
    return   arg.replace(/ /g, '');
}

var waitingDialog = waitingDialog || (function ($) {
    'use strict';
    // Creating modal dialog's DOM
    var $dialog = $(
            '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
            '<div class="modal-dialog modal-m">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h3 style="margin:0;"></h3>' +
            ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            ' <span aria-hidden="true">Ã—</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
            '</div>' +
            '</div></div></div>');
    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
         */
        show: function (message, options) {
            // Assigning defaults
            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);
            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }
            // Opening dialog
            $dialog.modal();
        },
        /**
         * Closes dialog
         */
        hide: function () {
            $dialog.modal('hide');
        }
    };
})(jQuery);
function showProgress() {
//    $('.preloader').fadeIn(0, function () {});
//    $('#preloader1').show();
    document.getElementById('preloader').style.display = "block";

}


function hideProgress() {
//    $('.preloader').fadeOut(0, function () { })
    $('#preloader').hide();
}



//$.fn.imagePaste = function (html) { // html is the callback function that gets "<imgâ€¦>"
//    var debug = true;
//    return this.on("paste", function (event) {
//        var e = event.originalEvent,
//                clip = e.clipboardData || window.clipboardData,
//                types = $.makeArray(clip.types);
//        if (debug) {
//            console.log("clip", clip, JSON.stringify(types), clip.files.length);
//            if (clip.files)
//                $.each(clip.files, function (i, file) {
////                    console.log("file", file, URL.createObjectURL(file));
//                });
//            if (types)
//                $.each(types, function (i, type) {
//                    var val = clip.getData(type);
//                    console.log("type", type, "â€“", val);
//                });
//        }
//        if (clip.files && clip.files[0] && clip.files[0].size) { // easy browsers!
//            if (debug)
//                console.log("easy files");
//            file(clip.files[0]);
//            return false;
//        } else if (types.length === 0) { // nothing from IE
//            if (debug)
//                console.log("nothing");
//        } else if (clip.items) { // chrome? (latest API)
//            if (debug)
//                console.log(e.type, clip);
//            var itemno;
//            itemno = types.indexOf("Files");
//            if (itemno > -1) { // chrome!
//                if (debug)
//                    console.log("Chrome files");
//                file(clip.items[itemno].getAsFile());
//                return false;
//            }
//        } else if (clip.getData("text/html").match(/<img/i)) { //firefox
//            if (debug)
//                console.log("Firefox HTML");
//            html($(clip.getData("text/html")).filter("img").removeAttr("width height style"));
//            return false;
//        } else {
//            var plain = clip.getData("text/plain");
//            if ((types.indexOf("image/tiff") > -1 && plain) || // safari some times!
//                    plain.match(/^http.*(png|jp?g|gif)$/) ||
//                    plain.match(/^data:image.*=$/)
//                    ) {
//                if (debug)
//                    console.log("safari?");
//                html($("<img>", {
//                    src: plain
//                }));
//                return false;
//            }
//        }
//        return true;
//
//        function file(blob) {
//            var r = new FileReader();
//            r.onloadend = function () {
//                html($("<img>", {
//                    src: this.result
//                }));
//            };
//            r.onerror = function () {
//                if (debug)
//                    console.log("errr", arguments);
//            };
//            r.readAsDataURL(blob);
//        }
//    });
//};

function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
    if (pasteEvent.clipboardData == false) {
        if (typeof (callback) === "function") {
            callback(undefined);
        }
    }
    ;
    var items = pasteEvent.clipboardData.items;
    if (items == undefined) {
        if (typeof (callback) == "function") {
            callback(undefined);
        }
    }
    ;
    for (var i = 0; i < items.length; i++) {
// Skip content if not image
        if (items[i].type.indexOf("image") == -1)
            continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();
        if (typeof (callback) == "function") {
            callback(blob);
        }
    }
}

function getTimeWithMillisecond() {
    var d = new Date();
    var t = d.getMinutes();
    var n = d.getMilliseconds();
    return t + n;
}

window.addEventListener("paste", function (e) {
    var current_canvas_no = $('#canvasdiv_' + global_var.active_canvas + ' > div ').length + getTimeWithMillisecond();
    if (global_var.active_canvas.length === 0) {
        return;
    } else if (global_var.active_canvas === 'testCase' &&
            (!$('#addScenario_showactualresult').is(":checked"))) {
        return;
    } else if (global_var.active_canvas === 'taskType' &&
            (!$('#addTaskType_showcomment').is(":checked"))) {
        return;
    }



    showCanvas(global_var.active_canvas);
    // Handle the event
    retrieveImageFromClipboardAsBlob(e, function (imageBlob) {
        // If there's an image, display it in the canvas
        if (imageBlob) {
            $('.canvas_canvas_msg').remove();
            addImageDivToCanvas(global_var.active_canvas, current_canvas_no);
            var canvasdiv = 'canvasdiv_' + global_var.active_canvas + "_" + current_canvas_no;
//    console.log('canvasdiv='+canvasdiv);

            var canvas = document.getElementById(canvasdiv);
            var ctx = canvas.getContext('2d');
            // Create an image to render the blob on the canvas
            var img = new Image();
            // Once the image loads, render the img on the canvas
            img.onload = function () {

                canvas.height = canvas.width * (img.height / img.width);
                var oc = document.createElement('canvas'),
                        octx = oc.getContext('2d');
                // Update dimensions of the canvas with the dimensions of the image
                canvas.width = this.width * 4.30;
                canvas.height = this.height * 4.30;
                // Draw the image
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            // Crossbrowser support for URL
            var URLObj = window.URL || window.webkitURL;
            // Creates a DOMString containing a URL representing the object given in the parameter
            // namely the original Blob
            img.src = URLObj.createObjectURL(imageBlob);
            global_var.current_canvas++;
        }
    });
}, false);
function setGlobalActiveCanvas(arg) {
    hideAllCanvas();
    global_var.active_canvas = arg;
    global_var.current_canvas = 1;
}

function clearGlobalActiveCanvas() {
    global_var.active_canvas = "";
    global_var.current_canvas = 1;
}

function emptyCanvasDiv() {
    $('.canvas_canvas').html('<div class="col-12 text-center canvas_canvas_msg" style=\'background-color: gainsboro\' >' +
            ' <h5>Copy and Paste Image Here</h5></div>');
}

function sortCombo(elementId) {
    var options = $('#' + elementId + ' option'); // Collect options         
    options.detach().sort(function (a, b) {               // Detach from select, then Sort
        var at = $(a).text();
        var bt = $(b).text();
        return (at > bt) ? 1 : ((at < bt) ? -1 : 0); // Tell the sort function how to order
    });
    options.appendTo("#" + elementId + "");
}

function clearCanvasDiv() {
    $('.canvas_canvas').html('<div class="col-12 text-center canvas_canvas_msg" style=\'background-color: gainsboro\' >' +
            ' <h5>Copy and Paste Image Here</h5></div>');
}
function hideAllCanvas() {
//    $('.canvas_canvas').hide();
    emptyCanvasDiv();
}

function showCanvas(arg) {
    $('#canvasdiv_' + arg).show();
}

function addImageDivToCanvas(canvasId, imageNo) {
    var image_div = 'canvasdiv_' + canvasId + '_' + imageNo;
    var div = $('<div></div>')
            .addClass("col-4")
            .addClass("canvas-image-class")
            .append($('<canvas></canvas>')
                    .addClass('canvas-sub-class')
                    .attr("id", image_div)
                    .attr("style", "max-width:90%;max-height:200px;"))
            .append("<br>")
            .append($("<a href='#'></a>")
                    .attr('onclick', "deleteCanvasImage(this)")
                    .append("Delete"))

            ;
    $('#canvasdiv_' + canvasId).append(div);
}

function deleteCanvasImage(e) {
    $(e).closest('div').first().remove();
}

function goJob(imageDiv) {
    var base64URL = document.getElementById(imageDiv).toDataURL("image/png;base64");
    var win = window.open();
    win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}

function isCanvasContextExist(canvasId) {
    return $('#' + canvasId + ' > div ').length > 0;
}

function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function UpdateTag(text, tag, val) {
    if (text.includes(tag)) {

        var n1 = text.indexOf(tag);
        var n2 = text.indexOf(";", n1);
        var st = text.substring(n1, (n2 + 1));
        text = text.replace(st, val);
    }
    return text;
}
function GetTagLine(text, tag) {
    var st = '';
    if (text.includes(tag)) {
        var n1 = text.indexOf(tag);
        var n2 = text.indexOf(";", n1);
        st = text.substring(n1 + 2, n2);
    }
    return st;
}

function generatePopupModalNew(modalBody, style, triggerId, backlogId) {
    var pageId = makeId(15);
    var st = "";
    st += ' <div class="modal fade" id="' + pageId + '" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">';
    st += '    <div class="modal-dialog modal-lg gui-design redirectClass4CSS"  style="max-width: 800px;' + style + '" role="document">';
    st += '      <div class="modal-content" style="background-color:inherit;border: 0px;">';
//    st += '            <div class="modal-header text-center"> ';
//    st += '              <h5 class="modal-title" id="userstory-gui-input-component-res-sus-label"></h5>';
//    st += '              <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
//    st += '           <span aria-hidden="true">&times;</span>';
//    st += '             </button>';
//    st += '      </div>';
    st += '   <div class="modal-body">';
    st += '   <form>';
    st += '     <input type="hidden" id=popupTrigger pid="' + triggerId + '" value="nonenone">';
    st += '     <div class="row redirectClass" bid="' + backlogId + '"';
    st += '                     bcode="' + makeId(10) + '" ';
    st += '                     id="userstory-gui-input-component-res-sus-id">';
    st += modalBody;
    st += '     </div>';
    st += '   </form>';
    st += '   </div>';
    st += '  </div>';
    st += '  </div>';
    st += '</div>';
    $("#body_of_nature").append(st);
    $('#' + pageId).modal("show");
    $(document).on('hidden.bs.modal', '#' + pageId, function (evt) {
        $('#' + pageId).remove();
    });
}

function generatePopupModal(modalBody) {
    var pageId = makeId(15);
    var st = "";
    st += ' <div class="modal fade" id="' + pageId + '" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">';
    st += '    <div class="modal-dialog modal-lg" style="width: 80%;max-width: 80%" role="document">';
    st += '      <div class="modal-content">';
//    st += '            <div class="modal-header text-center"> ';
//    st += '              <h5 class="modal-title" id="userstory-gui-input-component-res-sus-label"></h5>';
//    st += '              <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
//    st += '           <span aria-hidden="true">&times;</span>';
//    st += '             </button>';
//    st += '      </div>';
    st += '   <div class="modal-body">';
    st += '   <form>';
    st += '     <div class="row" id="userstory-gui-input-component-res-sus-id">';
    st += modalBody;
    st += '     </div>';
    st += '   </form>';
    st += '   </div>';
    st += '  </div>';
    st += '  </div>';
    st += '</div>';
    $("#body_of_nature").append(st);
    $('#' + pageId).modal();
    $(document).on('hidden.bs.modal', '#' + pageId, function (evt) {
        $('#' + pageId).remove();
    });
}

$(document).on('hide.bs.dropdown', '.drop-sprint', function (e) {
    if ($(e.currentTarget.activeElement).hasClass('dropdown-toggle')) {
        $(e.relatedTarget).parent().removeClass('open');
        return true;
    }
    return false;
});
function closeSprintPopUp() {
    $('.drop-sprint-menu').removeClass('show');
}

function closeLabelPopUp() {
    $('.drop-label-menu').removeClass('show');
}

function closeFilterPopUp() {
    $('.drop-filter-menu').removeClass('show');
}

function GetTagLine(text, tag) {
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

function GetTagLineVal(text, tag) {
    var st = GetTagLine(text, tag).split(":")[1];
    return st;
}

function GetConvertedDate(componentId) {
    var date = new Date($('#' + componentId).val());
    var day = date.getDate();
    day = day.toString(10).length === 1 ? '0' + day : day;
    var month = date.getMonth() + 1;
    month = month.toString(10).length === 1 ? '0' + month : month;
    var year = date.getFullYear();
    var d = year + "" + month + '' + day;
    return d;
}

function ConvertedDateToStringDate(date) {
    var day = date.getDate();
    day = day.toString(10).length === 1 ? '0' + day : day;
    var month = date.getMonth() + 1;
    month = month.toString(10).length === 1 ? '0' + month : month;
    var year = date.getFullYear();
    var d = year + "" + month + '' + day;
    return d;
}


function SetConvertedDate(componentId, date) {
    try {
        var day = date.substring(6, 8);
        var month = date.substring(4, 6);
        var year = date.substring(0, 4);
        var d = year + "-" + month + "-" + day;
        $('#' + componentId).val(d);
    } catch (e) {

    }
}

function Replace2Primes(arg) {
    arg = arg.replace(/"/g, "'");
    return arg;
}

function fnExcelReport(tableId)
{
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange;
    var j = 0;
    tab = document.getElementById(tableId); // id of table

    for (j = 0; j < tab.rows.length; j++)
    {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    } else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
    return (sa);
}

var global_var = {
    "owesomefont": ['fa-500px', 'fa-address-book', 'fa-address-book-o', 'fa-address-card', 'fa-address-card-o', 'fa-adjust', 'fa-adn', 'fa-align-center', 'fa-align-justify', 'fa-align-left', 'fa-align-right', 'fa-amazon', 'fa-ambulance', 'fa-american-sign-language-interpreting', 'fa-anchor', 'fa-android', 'fa-angellist', 'fa-angle-double-down', 'fa-angle-double-left', 'fa-angle-double-right', 'fa-angle-double-up', 'fa-angle-down', 'fa-angle-left', 'fa-angle-right', 'fa-angle-up', 'fa-apple', 'fa-archive', 'fa-area-chart', 'fa-arrow-circle-down', 'fa-arrow-circle-left', 'fa-arrow-circle-o-down', 'fa-arrow-circle-o-left', 'fa-arrow-circle-o-right', 'fa-arrow-circle-o-up', 'fa-arrow-circle-right', 'fa-arrow-circle-up', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right', 'fa-arrow-up', 'fa-arrows', 'fa-arrows-alt', 'fa-arrows-h', 'fa-arrows-v', 'fa-asl-interpreting', 'fa-assistive-listening-systems', 'fa-asterisk', 'fa-at', 'fa-audio-description', 'fa-automobile', 'fa-backward', 'fa-balance-scale', 'fa-ban', 'fa-bandcamp', 'fa-bank', 'fa-bar-chart', 'fa-bar-chart-o', 'fa-barcode', 'fa-bars', 'fa-bath', 'fa-bathtub', 'fa-battery', 'fa-battery-0', 'fa-battery-1', 'fa-battery-2', 'fa-battery-3', 'fa-battery-4', 'fa-battery-empty', 'fa-battery-full', 'fa-battery-half', 'fa-battery-quarter', 'fa-battery-three-quarters', 'fa-bed', 'fa-beer', 'fa-behance', 'fa-behance-square', 'fa-bell', 'fa-bell-o', 'fa-bell-slash', 'fa-bell-slash-o', 'fa-bicycle', 'fa-binoculars', 'fa-birthday-cake', 'fa-bitbucket', 'fa-bitbucket-square', 'fa-bitcoin', 'fa-black-tie', 'fa-blind', 'fa-bluetooth', 'fa-bold', 'fa-bolt', 'fa-bomb', 'fa-book', 'fa-bookmark', 'fa-bookmark-o', 'fa-braille', 'fa-briefcase', 'fa-btc', 'fa-bug', 'fa-building', 'fa-building-o', 'fa-bullhorn', 'fa-bullseye', 'fa-bus', 'fa-buysellads', 'fa-cab', 'fa-calculator', 'fa-calendar', 'fa-calendar-check-o', 'fa-calendar-minus-o', 'fa-calendar-o', 'fa-calendar-plus-o', 'fa-calendar-times-o', 'fa-camera', 'fa-camera-retro', 'fa-car', 'fa-caret-down', 'fa-caret-left', 'fa-caret-right', 'fa-caret-square-o-down', 'fa-caret-square-o-left', 'fa-caret-square-o-right', 'fa-caret-square-o-up', 'fa-caret-up', 'fa-cart-arrow-down', 'fa-cart-plus', 'fa-cc', 'fa-cc-amex', 'fa-cc-diners-club', 'fa-cc-discover', 'fa-cc-jcb', 'fa-cc-mastercard', 'fa-cc-paypal', 'fa-cc-stripe', 'fa-cc-visa', 'fa-certificate', 'fa-chain', 'fa-chain-broken', 'fa-check', 'fa-check-circle', 'fa-check-circle-o', 'fa-check-square', 'fa-check-square-o', 'fa-chevron-circle-down', 'fa-chevron-circle-left', 'fa-chevron-circle-right', 'fa-chevron-circle-up', 'fa-chevron-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-chevron-up', 'fa-child', 'fa-chrome', 'fa-circle', 'fa-circle-o', 'fa-circle-o-notch', 'fa-circle-thin', 'fa-clipboard', 'fa-clock-o', 'fa-clone', 'fa-close', 'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-cny', 'fa-code', 'fa-code-fork', 'fa-codepen', 'fa-codiepie', 'fa-coffee', 'fa-cog', 'fa-cogs', 'fa-columns', 'fa-comment', 'fa-comment-o', 'fa-commenting', 'fa-commenting-o', 'fa-comments', 'fa-comments-o', 'fa-compass', 'fa-compress', 'fa-connectdevelop', 'fa-contao', 'fa-copy', 'fa-copyright', 'fa-creative-commons', 'fa-credit-card', 'fa-credit-card-alt', 'fa-crop', 'fa-crosshairs', 'fa-css3', 'fa-cube', 'fa-cubes', 'fa-cut', 'fa-cutlery', 'fa-dashboard', 'fa-dashcube', 'fa-database', 'fa-deaf', 'fa-deafness', 'fa-dedent', 'fa-delicious', 'fa-desktop', 'fa-deviantart', 'fa-diamond', 'fa-digg', 'fa-dollar', 'fa-dot-circle-o', 'fa-download', 'fa-dribbble', 'fa-drivers-license', 'fa-drivers-license-o', 'fa-dropbox', 'fa-drupal', 'fa-edge', 'fa-edit', 'fa-eercast', 'fa-eject', 'fa-ellipsis-h', 'fa-ellipsis-v', 'fa-empire', 'fa-envelope', 'fa-envelope-o', 'fa-envelope-open', 'fa-envelope-open-o', 'fa-envelope-square', 'fa-envira', 'fa-eraser', 'fa-etsy', 'fa-eur', 'fa-euro', 'fa-exchange', 'fa-exclamation', 'fa-exclamation-circle', 'fa-exclamation-triangle', 'fa-expand', 'fa-expeditedssl', 'fa-external-link', 'fa-external-link-square', 'fa-eye', 'fa-eye-slash', 'fa-eyedropper', 'fa-fa', 'fa-facebook', 'fa-facebook-f', 'fa-facebook-official', 'fa-facebook-square', 'fa-fast-backward', 'fa-fast-forward', 'fa-fax', 'fa-feed', 'fa-female', 'fa-fighter-jet', 'fa-file', 'fa-file-archive-o', 'fa-file-audio-o', 'fa-file-code-o', 'fa-file-excel-o', 'fa-file-image-o', 'fa-file-movie-o', 'fa-file-o', 'fa-file-pdf-o', 'fa-file-photo-o', 'fa-file-picture-o', 'fa-file-powerpoint-o', 'fa-file-sound-o', 'fa-file-text', 'fa-file-text-o', 'fa-file-video-o', 'fa-file-word-o', 'fa-file-zip-o', 'fa-files-o', 'fa-film', 'fa-filter', 'fa-fire', 'fa-fire-extinguisher', 'fa-firefox', 'fa-first-order', 'fa-flag', 'fa-flag-checkered', 'fa-flag-o', 'fa-flash', 'fa-flask', 'fa-flickr', 'fa-floppy-o', 'fa-folder', 'fa-folder-o', 'fa-folder-open', 'fa-folder-open-o', 'fa-font', 'fa-font-awesome', 'fa-fonticons', 'fa-fort-awesome', 'fa-forumbee', 'fa-forward', 'fa-foursquare', 'fa-free-code-camp', 'fa-frown-o', 'fa-futbol-o', 'fa-gamepad', 'fa-gavel', 'fa-gbp', 'fa-ge', 'fa-gear', 'fa-gears', 'fa-genderless', 'fa-get-pocket', 'fa-gg', 'fa-gg-circle', 'fa-gift', 'fa-git', 'fa-git-square', 'fa-github', 'fa-github-alt', 'fa-github-square', 'fa-gitlab', 'fa-gittip', 'fa-glass', 'fa-glide', 'fa-glide-g', 'fa-globe', 'fa-google', 'fa-google-plus', 'fa-google-plus-circle', 'fa-google-plus-official', 'fa-google-plus-square', 'fa-google-wallet', 'fa-graduation-cap', 'fa-gratipay', 'fa-grav', 'fa-group', 'fa-h-square', 'fa-hacker-news', 'fa-hand-grab-o', 'fa-hand-lizard-o', 'fa-hand-o-down', 'fa-hand-o-left', 'fa-hand-o-right', 'fa-hand-o-up', 'fa-hand-paper-o', 'fa-hand-peace-o', 'fa-hand-pointer-o', 'fa-hand-rock-o', 'fa-hand-scissors-o', 'fa-hand-spock-o', 'fa-hand-stop-o', 'fa-handshake-o', 'fa-hard-of-hearing', 'fa-hashtag', 'fa-hdd-o', 'fa-header', 'fa-headphones', 'fa-heart', 'fa-heart-o', 'fa-heartbeat', 'fa-history', 'fa-home', 'fa-hospital-o', 'fa-hotel', 'fa-hourglass', 'fa-hourglass-1', 'fa-hourglass-2', 'fa-hourglass-3', 'fa-hourglass-end', 'fa-hourglass-half', 'fa-hourglass-o', 'fa-hourglass-start', 'fa-houzz', 'fa-html5', 'fa-i-cursor', 'fa-id-badge', 'fa-id-card', 'fa-id-card-o', 'fa-ils', 'fa-image', 'fa-imdb', 'fa-inbox', 'fa-indent', 'fa-industry', 'fa-info', 'fa-info-circle', 'fa-inr', 'fa-instagram', 'fa-institution', 'fa-internet-explorer', 'fa-intersex', 'fa-ioxhost', 'fa-italic', 'fa-joomla', 'fa-jpy', 'fa-jsfiddle', 'fa-key', 'fa-keyboard-o', 'fa-krw', 'fa-language', 'fa-laptop', 'fa-lastfm', 'fa-lastfm-square', 'fa-leaf', 'fa-leanpub', 'fa-legal', 'fa-lemon-o', 'fa-level-down', 'fa-level-up', 'fa-life-bouy', 'fa-life-buoy', 'fa-life-ring', 'fa-life-saver', 'fa-lightbulb-o', 'fa-line-chart', 'fa-link', 'fa-linkedin', 'fa-linkedin-square', 'fa-linode', 'fa-linux', 'fa-list', 'fa-list-alt', 'fa-list-ol', 'fa-list-ul', 'fa-location-arrow', 'fa-lock', 'fa-long-arrow-down', 'fa-long-arrow-left', 'fa-long-arrow-right', 'fa-long-arrow-up', 'fa-low-vision', 'fa-magic', 'fa-magnet', 'fa-mail-forward', 'fa-mail-reply', 'fa-mail-reply-all', 'fa-male', 'fa-map', 'fa-map-marker', 'fa-map-o', 'fa-map-pin', 'fa-map-signs', 'fa-mars', 'fa-mars-double', 'fa-mars-stroke', 'fa-mars-stroke-h', 'fa-mars-stroke-v', 'fa-maxcdn', 'fa-meanpath', 'fa-medium', 'fa-medkit', 'fa-meetup', 'fa-meh-o', 'fa-mercury', 'fa-microchip', 'fa-microphone', 'fa-microphone-slash', 'fa-minus', 'fa-minus-circle', 'fa-minus-square', 'fa-minus-square-o', 'fa-mixcloud', 'fa-mobile', 'fa-mobile-phone', 'fa-modx', 'fa-money', 'fa-moon-o', 'fa-mortar-board', 'fa-motorcycle', 'fa-mouse-pointer', 'fa-music', 'fa-navicon', 'fa-neuter', 'fa-newspaper-o', 'fa-object-group', 'fa-object-ungroup', 'fa-odnoklassniki', 'fa-odnoklassniki-square', 'fa-opencart', 'fa-openid', 'fa-opera', 'fa-optin-monster', 'fa-outdent', 'fa-pagelines', 'fa-paint-brush', 'fa-paper-plane', 'fa-paper-plane-o', 'fa-paperclip', 'fa-paragraph', 'fa-paste', 'fa-pause', 'fa-pause-circle', 'fa-pause-circle-o', 'fa-paw', 'fa-paypal', 'fa-pencil', 'fa-pencil-square', 'fa-pencil-square-o', 'fa-percent', 'fa-phone', 'fa-phone-square', 'fa-photo', 'fa-picture-o', 'fa-pie-chart', 'fa-pied-piper', 'fa-pied-piper-alt', 'fa-pied-piper-pp', 'fa-pinterest', 'fa-pinterest-p', 'fa-pinterest-square', 'fa-plane', 'fa-play', 'fa-play-circle', 'fa-play-circle-o', 'fa-plug', 'fa-plus', 'fa-plus-circle', 'fa-plus-square', 'fa-plus-square-o', 'fa-podcast', 'fa-power-off', 'fa-print', 'fa-product-hunt', 'fa-puzzle-piece', 'fa-qq', 'fa-qrcode', 'fa-question', 'fa-question-circle', 'fa-question-circle-o', 'fa-quora', 'fa-quote-left', 'fa-quote-right', 'fa-ra', 'fa-random', 'fa-ravelry', 'fa-rebel', 'fa-recycle', 'fa-reddit', 'fa-reddit-alien', 'fa-reddit-square', 'fa-refresh', 'fa-registered', 'fa-remove', 'fa-renren', 'fa-reorder', 'fa-repeat', 'fa-reply', 'fa-reply-all', 'fa-resistance', 'fa-retweet', 'fa-rmb', 'fa-road', 'fa-rocket', 'fa-rotate-left', 'fa-rotate-right', 'fa-rouble', 'fa-rss', 'fa-rss-square', 'fa-rub', 'fa-ruble', 'fa-rupee', 'fa-s15', 'fa-safari', 'fa-save', 'fa-scissors', 'fa-scribd', 'fa-search', 'fa-search-minus', 'fa-search-plus', 'fa-sellsy', 'fa-send', 'fa-send-o', 'fa-server', 'fa-share', 'fa-share-alt', 'fa-share-alt-square', 'fa-share-square', 'fa-share-square-o', 'fa-shekel', 'fa-sheqel', 'fa-shield', 'fa-ship', 'fa-shirtsinbulk', 'fa-shopping-bag', 'fa-shopping-basket', 'fa-shopping-cart', 'fa-shower', 'fa-sign-in', 'fa-sign-language', 'fa-sign-out', 'fa-signal', 'fa-signing', 'fa-simplybuilt', 'fa-sitemap', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-sliders', 'fa-slideshare', 'fa-smile-o', 'fa-snapchat', 'fa-snapchat-ghost', 'fa-snapchat-square', 'fa-snowflake-o', 'fa-soccer-ball-o', 'fa-sort', 'fa-sort-alpha-asc', 'fa-sort-alpha-desc', 'fa-sort-amount-asc', 'fa-sort-amount-desc', 'fa-sort-asc', 'fa-sort-desc', 'fa-sort-down', 'fa-sort-numeric-asc', 'fa-sort-numeric-desc', 'fa-sort-up', 'fa-soundcloud', 'fa-space-shuttle', 'fa-spinner', 'fa-spoon', 'fa-spotify', 'fa-square', 'fa-square-o', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-star', 'fa-star-half', 'fa-star-half-empty', 'fa-star-half-full', 'fa-star-half-o', 'fa-star-o', 'fa-steam', 'fa-steam-square', 'fa-step-backward', 'fa-step-forward', 'fa-stethoscope', 'fa-sticky-note', 'fa-sticky-note-o', 'fa-stop', 'fa-stop-circle', 'fa-stop-circle-o', 'fa-street-view', 'fa-strikethrough', 'fa-stumbleupon', 'fa-stumbleupon-circle', 'fa-subscript', 'fa-subway', 'fa-suitcase', 'fa-sun-o', 'fa-superpowers', 'fa-superscript', 'fa-support', 'fa-table', 'fa-tablet', 'fa-tachometer', 'fa-tag', 'fa-tags', 'fa-tasks', 'fa-taxi', 'fa-telegram', 'fa-television', 'fa-tencent-weibo', 'fa-terminal', 'fa-text-height', 'fa-text-width', 'fa-th', 'fa-th-large', 'fa-th-list', 'fa-themeisle', 'fa-thermometer', 'fa-thermometer-0', 'fa-thermometer-1', 'fa-thermometer-2', 'fa-thermometer-3', 'fa-thermometer-4', 'fa-thermometer-empty', 'fa-thermometer-full', 'fa-thermometer-half', 'fa-thermometer-quarter', 'fa-thermometer-three-quarters', 'fa-thumb-tack', 'fa-thumbs-down', 'fa-thumbs-o-down', 'fa-thumbs-o-up', 'fa-thumbs-up', 'fa-ticket', 'fa-times', 'fa-times-circle', 'fa-times-circle-o', 'fa-times-rectangle', 'fa-times-rectangle-o', 'fa-tint', 'fa-toggle-down', 'fa-toggle-left', 'fa-toggle-off', 'fa-toggle-on', 'fa-toggle-right', 'fa-toggle-up', 'fa-trademark', 'fa-train', 'fa-transgender', 'fa-transgender-alt', 'fa-trash', 'fa-trash-o', 'fa-tree', 'fa-trello', 'fa-tripadvisor', 'fa-trophy', 'fa-truck', 'fa-try', 'fa-tty', 'fa-tumblr', 'fa-tumblr-square', 'fa-turkish-lira', 'fa-tv', 'fa-twitch', 'fa-twitter', 'fa-twitter-square', 'fa-umbrella', 'fa-underline', 'fa-undo', 'fa-universal-access', 'fa-university', 'fa-unlink', 'fa-unlock', 'fa-unlock-alt', 'fa-unsorted', 'fa-upload', 'fa-usb', 'fa-usd', 'fa-user', 'fa-user-circle', 'fa-user-circle-o', 'fa-user-md', 'fa-user-o', 'fa-user-plus', 'fa-user-secret', 'fa-user-times', 'fa-users', 'fa-vcard', 'fa-vcard-o', 'fa-venus', 'fa-venus-double', 'fa-venus-mars', 'fa-viacoin', 'fa-viadeo', 'fa-viadeo-square', 'fa-video-camera', 'fa-vimeo', 'fa-vimeo-square', 'fa-vine', 'fa-vk', 'fa-volume-control-phone', 'fa-volume-down', 'fa-volume-off', 'fa-volume-up', 'fa-warning', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wheelchair', 'fa-wheelchair-alt', 'fa-wifi', 'fa-wikipedia-w', 'fa-window-close', 'fa-window-close-o', 'fa-window-maximize', 'fa-window-minimize', 'fa-window-restore', 'fa-windows', 'fa-won', 'fa-wordpress', 'fa-wpbeginner', 'fa-wpexplorer', 'fa-wpforms', 'fa-wrench', 'fa-xing', 'fa-xing-square', 'fa-y-combinator', 'fa-y-combinator-square', 'fa-yahoo', 'fa-yc', 'fa-yc-square', 'fa-yelp', 'fa-yen', 'fa-yoast', 'fa-youtube', 'fa-youtube-play', 'fa-youtube-square'],
    "ipo_gui_view": "single",
    "is_body_ctrl_pressed": "0",
    "actual_zoom": 100,
    "previous_backlog_id": "",
    "previous_backlog_name": "",
    "actual_backlog_gui_css": "",
    "current_nav_view": "",
    "current_project_id": "",
    "current_backlog_id": "",
    "current_backlog_name": "",
    "current_us_input_id": "",
    "current_us_task_id": "",
    "analytics_tab": "general",
    "default_us_input_component": "txt",
    "current_ipo_view": "gui",
    "IN": "%IN%",
    "current_user_type": "",
    "vertical_seperator": "|",
    "fileUploadPath": "resources/upload/",
    "fileViewerPath": "http://docs.google.com/gview?url=resources/upload/",
    "current_us_submenu": "generalview",
    "current_domain": "",
    "ipoTable": {},
    "ipoTableVal": {},
    "data_eliminator": ".",
    "time_eliminator": ":",
    "user_story_history_filter": "",
    "user_story_history_filter_current_index": "0",
    "user_story_core_filter_current_index": "0",
    "user_story_core_filter_paging_button_pressed": "",
    "backlog_history_type_count": {},
    "image_formats": ["jpeg", "jpg", "png", "bmp", "gif"],
    "video_formats": ["mp4", "mpeg", "mkv", "webm", "avi", "mpg"],
    "canvas": {
        "testCase": "testCase",
        "taskType": "taskType",
        "comment": "comment",
        "testTrial": "testTrial",
        "backlog": "backlog",
        "storyCard": "storyCard",
    },
    "userStoryFilter": {
        "assignee": "",
        "sprint": "",
        "label": "",
        "status": "",
        "priority": "",
        "createdBy": "",
        "createdDate": "",
        "userstory": "",
        "asc": "",
        "desc": "",
        "isSourced": "",
        "isBounded": "",
        "isAPI": "",
        "isInitial": "",
        "userStoriesAssignedToMe": "",
        "taskType": "",
        "assignedLabel": "",
        "backlogStatus": "",
    },
    "analytic_filter": {
        "histogram": {
            "color": [
                "#008B8B",
                "#8B008B",
                "#9400D3",
                "#228B22",
                "red",
                "green",
                "#CD5C5C",
                "#ADD8E6",
                "#7CFC00",
                "#BA55D3",
                "#48D1CC",
                "#000080",
                "orange",
                "#FF4500",
            ]
        },
        "pivot_sprint": {},
        "pivot_group": [],
        "pivot_group_name": [],
        "pivot_cell": {},
        "filterType": "pivot",
        "res": {},
        "interval": "weekly",
        "project_list": {},
        "assignee_list": {},
        "label_list": {},
        "sprint_list": {},
        "task_type_list": {},
    },
    "current_backlog_list": {},
    "current_view": "detailed",
    "analytics_current_sort": "asc",
    "mainview": "body",
    "current_task_id_4_comment": "",
    "related_SUS_status": "A",
    "current_list_view_table_item": "assignee",
    "current_canvas": 1,
    "active_canvas": "",
    "current_upload_canvas": "",
    "temp_dp_id": "",
    "default_backlog_length": 43,
    "sourcedmatrix_filterby": 'tasktype',
}

function fnline2Text(fnline) {
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
}




var Toaster = {
    showGeneralError: function () {
        this.showError("System Error Occured!");
    },
    showError: function (msg) {
        var id = makeId(10);
        var div = $('<div>')
                .attr('id', id)
                .addClass('toast ml-auto')
                .addClass('toast-error')
                .attr('role', 'alert')
                .attr('data-delay', '700')
                .attr('data-autohide', false)
                .append($('<div>')
                        .addClass('toast-header')
                        .append($('<strong>')
                                .addClass('mr-auto text-primary')
                                .append('Error Message')
                                )
                        .append($('<button>')
                                .addClass('ml-2 mb-1 close')
                                .attr('type', 'button')
                                .attr('data-dismiss', 'toast')
                                .attr('aria-label', 'Close"')
                                .append($('<span>')
                                        .attr('aria-hidden', true)
                                        .append(('Ã—')))

                                )
                        )
                .append($('<div>')
                        .addClass('toast-body')
                        .append(msg)
                        )
                ;
        $('#body_of_toaster').prepend(div);
        // initialize and show Bootstrap 4 toast
        $('#' + id).toast('show');
    }
}

 