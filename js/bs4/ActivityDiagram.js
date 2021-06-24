var ActivityDiagram = {
    childNodes: [],
    outputList: {},
    parentOutputList: {},
    inputList: {},
    pairList: {},
    pairVerseList: {},
    apiList: [],
    parentApiList: [],
    parentInputList: {},
    inputDescList: {},
    parentInputDescList: {},
    userStoryId: [],
    parentUserStoryName: [],
    userStoryName: [],
    parentUserStoryId: [],
    userStories: {},
    dependentInputList: [],
    parentUserStories: {},
    getChildNode: function () {
        this.childNodes.length = 0;
        for (var i in this.userStoryId) {
//            concole.log()
            if (!this.parentUserStoryId.includes(this.userStoryId[i])
                    && !this.childNodes.includes(this.userStoryId[i])) {
                this.childNodes.push(this.userStoryId[i]);
            }
        }
    },
    show: function () {
        $('#activityDiagramDiv').html('');
        this.showPanel();
        this.clearArrays();
        this.fillArrays();
        this.createDiagrams();
//        this.setCanvasWidth();
        this.toggleCheckboxes();
        this.adjustHeight();
        $('.analyticuserstory').first().focus();
        $('.analyticuserstory').first().next().focus();
        $('[data-toggle="tooltip"]').tooltip({html: true});
    },
    toggleCheckboxes: function () {
        this.toggleUserStory($('#analytics_toggleuserstory'));
        this.toggleInput($('#analytics_toggleinput'));
        this.toggleOutput($('#analytics_toggleoutput'));
        this.toggleOutputInInput($('#analytics_toggloutputasinput'));
        this.toggleOnlyApi($('#analytics_toggleonlyapi'));
    },
    toggleOnlyApi: function (el) {
        if ($(el).is(":checked")) {
            $('.neefstoryisnotapi').hide();
            $('.neefstoryisapi').show();
        } else {
            $('.neefstoryisapi').show();
            $('.neefstoryisnotapi').show();
        }
    },
    toggleUserStory: function (el) {
        if ($(el).is(":checked")) {
            $('.activity-diagram-border-body').show();
        } else {
            $('.activity-diagram-border-body').hide();
        }
    },
    toggleOutputInInput: function (el) {
        if ($(el).is(":checked")) {
            $('.diagram-output-as-input').show();
        } else {
            $('.diagram-output-as-input').hide();
        }
    },
    zoomWheel: function (e) {
        if (global_var.is_body_ctrl_pressed === '1') {
            event.preventDefault();
            if (event.deltaY < 0)
            {
                this.zoomIn();
            } else if (event.deltaY > 0)
            {
                this.zoomOut();
            }
        }
    },
    setZoom: function () {
        var z = $('#ipo_zoom_4_neef').val();
        $('#neef_actual_zoom_id').text(z);
        $('#activityDiagramDiv').css('zoom', z + "%");
        this.toggleNEEFDiagramCore();

    },
    zoomIn: function () {
        var z = $('#neef_actual_zoom_id').text();
        z = parseInt(z) + 3;
        $('#neef_actual_zoom_id').text(z);
        $('#activityDiagramDiv').css('zoom', z + "%");
        this.toggleNEEFDiagramCore();
    },
    zoomOut: function () {
        var z = $('#neef_actual_zoom_id').text();
        z = parseInt(z) - 3;
        z = z <= 5 ? 5 : z;
        $('#neef_actual_zoom_id').text(z);
        $('#activityDiagramDiv').css('zoom', z + "%");
        this.toggleNEEFDiagramCore();
    },
    adjustLine: function (from, to, line) {

        var t = 100;
//        var t = 0;

        var fT = from.offsetTop + from.offsetHeight - from.clientTop - 80 / 2;
        var tT = to.offsetTop + to.offsetHeight - to.clientTop - 80 / 2;
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
    },
    getLineDivId4Drawing: function (childBacklodId, parentBacklogId) {
        var userStory = this.userStories[childBacklodId];
        var parentUserStory = this.parentUserStories[parentBacklogId];
        var titlePure = userStory + " -  " + parentUserStory;
        var title = userStory + " - <br>" + parentUserStory;
        var id = makeId(10);
        var line = $('<div>')
                .attr('id', id)
                .attr('title', titlePure)
                .addClass('line_class')
//                .append(title)
                ;
        $('#activityDiagramDiv').append(line);
        return id;
    },
    adjustLineMain: function () {
        var list = [];
        $('.activity-diagram-border-body').each(function (e) {
            var id = $(this).attr('id');
            if (!list.includes(id)) {
                list.push(id);
            }
        });
        for (var i in list) {

            try {
                this.adjustLine(document.getElementById(list[i]),
                        document.getElementById(list[parseInt(i) + 2]),
                        document.getElementById(id));
            } catch (er) {
            }
        }
    },
    hideAllChildInputElementExpect1st: function () {
        var list = [];
        for (var i in this.userStoryId) {
            var firstElement = $('.class_input_' + this.userStoryId[i]).first();
            firstElement.attr('neefed', '1');
//            firstElement.css('background-color', 'red')
            $('.class_input_' + this.userStoryId[i]).each(function (e) {
                $(this).css('opacity', '0').not(firstElement);
            });
            firstElement.css('opacity', '1');
        }
    },
    hideAllParentInputElementExpect1st: function () {
        var list = [];
        for (var i in this.parentUserStoryId) {
            var firstElement = $('.class_input_' + this.parentUserStoryId[i]).first();
            firstElement.attr('neefed', '1');
//            firstElement.css('background-color', 'red')
            $('.class_input_' + this.parentUserStoryId[i]).each(function (e) {
                $(this).css('opacity', '0').not(firstElement);
            });
            firstElement.css('opacity', '1');
        }
    },
    drawLineFromChildElement: function () {
        for (var i in this.userStoryId) {
            var fromEl = $('.class_input_' + this.userStoryId[i] + "[neefed='1']").first();

            var parentBacklogs = this.pairList[this.userStoryId[i]];
            for (var j in parentBacklogs) {
                var toEl_id = parentBacklogs[j];
                var toEl = $('.class_input_' + toEl_id + "[neefed='1']").first();
                var id = this.getLineDivId4Drawing(this.userStoryId[i], toEl_id);
                try {
                    this.adjustLine(fromEl[0], toEl[0], document.getElementById(id));
                } catch (er) {
                }
            }


        }
    },
    toggleNEEFDiagramCore: function () {
        this.toggleNEEFDiagram($('#analytics_toggleneefdiagram'));
    },
    toggleNEEFDiagram: function (el) {
        if ($(el).is(":checked")) {
            $('#analytics_toggleinput').prop('checked', true).change();
            $('.activity-diagram-border-body').css("opacity", '0');
            $('.line_class').remove();
            this.hideAllChildInputElementExpect1st();
            this.hideAllParentInputElementExpect1st();
            this.drawLineFromChildElement();
//            this.adjustLineMain();
        } else {
            $('.analytics_toggleneefdiagram').hide();
            $('.activity-diagram-border-body').css("opacity", '1');
            $('.line_class').remove();
        }
    },
    toggleInput: function (el) {
        if ($(el).is(":checked")) {
            $('.activity-diagram-parent-input-list').show();
        } else {
            $('.activity-diagram-parent-input-list').hide();
        }

        this.adjustHeight();
    }
    ,
    toggleOutput: function (el) {
        if ($(el).is(":checked")) {
            $('.activity-diagram-parent-output-list').show();
        } else {
            $('.activity-diagram-parent-output-list').hide();
        }
    },
    setCanvasWidth: function () {
        if ($('#main_body_class_activitydiagram').attr('hasErr') === '1') {
            return;
        }
        var max = 0;
        $('.activity-diagram-border').each(function (e) {
            var w = $(this).outerWidth();
            max = w > max ? w : max;
        });
        $('#main_body_class_activitydiagram').width(max + 100);
    },
    showPanel: function () {
        $('.main_body_class').hide();
        $('#main_body_class_activitydiagram').show();
        Utility.addParamToUrl("mainview", "activitydiagram");
    },
    hidePanel: function () {
        $('#main_body_class_activitydiagram').hide();
    },
    clearArrays: function () {
        this.userStoryId.length = 0;
        this.parentUserStoryName.length = 0;
        this.userStoryName.length = 0;
        this.parentUserStoryId.length = 0;
        this.dependentInputList.length = 0;
        this.userStories = {};
        this.parentUserStories = {};
        this.outputList = {};
        this.parentOutputList = {};
        this.inputList = {};
        this.parentInputList = {};
        this.inputDescList = {};
        this.parentInputDescList = {};
        this.pairList = {};
        this.pairVerseList = {};
    },
    fillArrays: function () {
        try {
            var res = this.getBacklogDependency();
            var obj = res.tbl[0].r;
            var div = [];

            for (var n = 0; n < obj.length; n++) {
                this.pairList[obj[n].fkBacklogId] = [];
            }

            for (var n = 0; n < obj.length; n++) {
                div[n] = $('<div></div>')
                        .addClass('activity-diagram-border')
                        .html(obj[n].backlogName);
                this.userStoryId.push(obj[n].fkBacklogId);
                this.userStoryName.push(obj[n].backlogName);
                this.parentUserStoryId.push(obj[n].fkParentBacklogId);
                this.parentUserStoryName.push(obj[n].parentBacklogName);
                this.userStories[obj[n].fkBacklogId] = obj[n].backlogName;
                this.parentUserStories[obj[n].fkParentBacklogId] = obj[n].parentBacklogName;
                this.inputList[obj[n].fkBacklogId] = obj[n].inputList;
                this.parentInputList[obj[n].fkParentBacklogId] = obj[n].parentInputList;
                this.outputList[obj[n].fkBacklogId] = obj[n].outputList;
                this.parentOutputList[obj[n].fkParentBacklogId] = obj[n].parentOutputList;
                this.apiList[obj[n].fkBacklogId] = obj[n].backlogIsApi;
                this.parentApiList[obj[n].fkParentBacklogId] = obj[n].parentBacklogIsApi;

                this.pairList[obj[n].fkBacklogId].push(obj[n].fkParentBacklogId);



            }
            this.getChildNode();
        } catch (e) {
            ActivityDiagram.showEmptyMessage();
            return;
        }
    },
    createDiagrams: function () {
        $('#activityDiagramDiv').html('');
        for (var n = 0; n < this.childNodes.length; n++) {
            var h3 = $('<h6>')
                    .attr('style', 'text-align:right;padding-right:700px')
                    .addClass('neefstoryheader')
                    .append("NEEF Story of ")
                    .append(this.border_userustory_name(this.childNodes[n]).removeClass('analyticuserstory'))
                    ;
            $('#activityDiagramDiv').append(h3);
            var div = $('<div></div>').addClass('activity-diagram-border-link')
            var hr = $('<hr></hr>').attr('style', 'border-color:#2C73B4;')

            if (this.apiList[this.childNodes[n]] === '1') {
                div.addClass("neefstoryisapi");
                h3.addClass("neefstoryisapi");
                hr.addClass("neefstoryisapi");
            } else {
                div.addClass("neefstoryisnotapi");
                h3.addClass("neefstoryisnotapi");
                hr.addClass("neefstoryisnotapi");
            }

            try {
                this.createSingleDiagram(this.childNodes[n], div, true);
            } catch (e) {
                div.append("It seems that there's a LOOP for this User Story!!!")
            }
            $('#activityDiagramDiv')
                    .append(div)
                    .append(hr);
        }
    },
    showLoopSingleMessage: function (childId) {
        $('#activityDiagramDiv').html('');
        $('#main_body_class_activitydiagram').attr('hasErr', "1").width("1234px;");
        var innerHTML = '<div style="padding:30px;text-align:center">' +
                '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                '<h5> No Related/Dependent User Stories have been selected or created on this Project</h5>' +
                '<p>All Activity Diagrams  on this project will appear here</p>' +
                '<p>Please Select Related/Dependent User Story</p>' +
                '</div>';
        $('#activityDiagramDiv').html(innerHTML);
    },
    showEmptyMessage: function () {
        $('#activityDiagramDiv').html('');
        $('#main_body_class_activitydiagram').attr('hasErr', "1").width("1234px;");
        var innerHTML = '<div style="padding:30px;text-align:center">' +
                '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>' +
                '<h5> No Related/Dependent User Stories have been selected or created on this Project</h5>' +
                '<p>All Activity Diagrams  on this project will appear here</p>' +
                '<p>Please Select Related/Dependent User Story</p>' +
                '</div>';
        $('#activityDiagramDiv').html(innerHTML);
        return;
    },
    square_sign: function () {
        var i = $('<i></i>')
                .addClass('fa fa-square')
                .attr("style", 'color:#2C73B4!important;font-size:30px;padding:4px;');
        return i;
    },
    right_arrow_sign: function () {
        var i = $('<i></i>')
                .addClass('fa fa-arrow-circle-right')
                .attr("style", 'color:#2C73B4!important;font-size:30px;padding:4px;');
        return i;
    },
    setZoomByManual: function () {
        global_var.actual_zoom = $('#ipo_zoom').val();
    },
    border_userustory_name: function (childEndNodeId) {
        var a = $('<a></a>')
                .attr("href", "#")
                .addClass('analyticuserstory')
                .attr("onclick", "new UserStory().redirectToDetailedView4ActivityDiagram('" + childEndNodeId + "')")
                .text(replaceTagsReverse(this.userStories[childEndNodeId]));
        return a;
    },
    border_userstory: function (childEndNodeId) {
        var div = $('<div></div>').addClass('activity-diagram-border-body')
                .attr('id', 'body_' + childEndNodeId)
                .append(this.square_sign())
                .append(this.showStoryCardModalLink(childEndNodeId))
                .append(this.showPageModalLink(childEndNodeId))
                .append(this.border_userustory_name(childEndNodeId))
                ;
        if (this.apiList[childEndNodeId] === '1' || this.parentApiList[childEndNodeId] === '1') {
            div.css("background-color", "#ffe699");
        }
        return div;
    },
    child_userustory_name: function (index) {
        var a = $('<a></a>')
                .attr("href", "#")
                .attr("onclick", "new UserStory().redirectToDetailedView4ActivityDiagram('" + this.parentUserStoryId[index] + "')")
                .text(replaceTagsReverse(this.parentUserStoryName[index]));
        return a;
    },
    child_userstory: function (index) {
        var div = $('<div></div>')
                .addClass('activity-diagram-border-body')
                .attr('id', 'body_' + this.parentUserStoryId[index])
                .append(this.right_arrow_sign())
                .append(this.showStoryCardModalLink(this.parentUserStoryId[index]))
                .append(this.showPageModalLink(this.parentUserStoryId[index]))
                .append(this.child_userustory_name(index));
        if (this.parentApiList[this.parentUserStoryId[index]] === '1') {
            div.css("background-color", "#ffe699");
        }
        return div;
    },
    showPageModalLink: function (backlogId) {
        if (this.apiList[backlogId] === '1' || this.parentApiList[backlogId] === '1') {
            return ' &nbsp; <i class="fa fa-wrench" aria-hidden="true"></i> &nbsp;';
        }
        var i = $('<a></a>')
                .attr("href", "#")
//                .attr("onclick", "ActivityDiagram.showPageModal('" + backlogName + "', '" + backlogId + "')")
                .attr("onclick", "new UserStory().setGUIComponentButtonGUIModal('" + backlogId + "',this)")
                .attr("data-toggle", "modal")
//                .attr("data-target", "#userstory-gui-input-component-res-sus-analytic")
                .append($('<i></i>')
                        .addClass('fa fa-window-maximize')
                        .attr("style", 'color:#4CAF50;font-size:12px;padding:1px;')
                        );
        return i;
    },
    showStoryCardModalLink: function (backlogId) {
        var i = $('<a></a>')
                .attr("href", "#")
                .attr("onclick", "new UserStory().showStoryCardModal('" + backlogId + "')")
                .attr("data-toggle", "modal")
                .append($('<i></i>')
                        .addClass('fa fa-window-restore')
                        .attr("style", 'color:#4CAF50;font-size:11px;padding:1px;')
                        );
        return i;
    },
    showPageModal: function (backlogName, backlogId) {
        var st = new UserStory().genGUIDesignHtmlById(backlogId);
        if (!st) {
            st = "<h3>View is not available. Please add inputs</h3>";
            $('#userstory-gui-input-component-res-sus-analytic-label').html('');
        } else {
            $('#userstory-gui-input-component-res-sus-analytic-label').html(replaceTags(backlogName));
        }

        $('#userstory-gui-input-component-res-sus-analytic-id').html(st);
    },
    getInputListDiv4Parent: function (parentParentId) {
        var div = this.getInputListHmtl4Parent(parentParentId);
        div.append($('<div>')
                .addClass('diagram-output-as-input')
                .css('display', 'none')
                .append(this.getOutputListHmtl4Parent(parentParentId)));
        if (div.html().length > 0) {
            return $('<div>')
                    .addClass('activity-diagram-parent-input-list')
                    .attr('id', 'input_' + parentParentId)
                    .addClass('class_input_' + parentParentId)
                    .addClass('class_input')
                    .addClass('text-left')
                    .append($('<div>')
                            .addClass("text-right")
                            .append($("<i>").append(this.parentUserStories[parentParentId])))
                    .append(div)
        } else {
            return "";
        }
    },
    getOutputListDiv4Parent: function (parentParentId) {
        var div = this.getOutputListHmtl4Parent(parentParentId);
        if (div.html().length > 0) {
            return $('<div>')
                    .addClass('activity-diagram-parent-output-list')
                    .addClass('text-left')
                    .append(div);
        } else {
            return "";
        }
    },
    getInputListDiv4Child: function (childBacklogId) {
        var div = this.getInputListHmtl4Child(childBacklogId);
        div.append($('<div>')
                .addClass('diagram-output-as-input')
                .css('display', 'none')
                .append(this.getOutputListHmtl4Child(childBacklogId)));
        if (div.html().length > 0) {

            return $('<div>')
                    .addClass('activity-diagram-parent-input-list')
                    .attr('id', 'input_' + childBacklogId)
                    .addClass('class_input_' + childBacklogId)
                    .addClass('class_input')
                    .addClass('text-left')
                    .append($('<div>')
                            .addClass("text-right")
                            .append($("<i>").append(this.userStories[childBacklogId])))
                    .append(div);
        } else {
            return "";
        }
    },
    getOutputListDiv4Child: function (childBacklogId) {
        var div = this.getOutputListHmtl4Child(childBacklogId);
        if (div.html().length > 0) {
            return $('<div>')
                    .addClass('activity-diagram-parent-output-list')
                    .addClass('text-left')
                    .append(div);
        } else {
            return "";
        }
    },
    createSingleDiagram: function (childEndNodeId, parentDiv, isEndPoint) {
        var mainDiv = $(parentDiv);
        var div = [];
        div[0] = $('<div></div>').addClass('activity-diagram-border');
        if (isEndPoint) {


            $(div[0]).append(this.getOutputListDiv4Child(childEndNodeId))
                    .append(this.border_userstory(childEndNodeId))
                    .append(this.getInputListDiv4Child(childEndNodeId))
                    ;
        }

        var idx = 1;
        for (var n = 0; n < this.parentUserStoryId.length; n++) {

            if (this.userStoryId[n] === childEndNodeId) {
                div[idx] = $('<div></div>')
                        .addClass('activity-diagram-border')
                        .attr("id", this.parentUserStoryId[n])
                        .append(this.getOutputListDiv4Parent(this.parentUserStoryId[n]))
                        .append(this.child_userstory(n))
                        .append(this.getInputListDiv4Parent(this.parentUserStoryId[n]));
                idx++;
            }
        }

        if (idx > 1) {
            var divJoint = $('<div></div>')
                    .addClass('activity-diagram-single');
            for (var n = 1; n < idx; n++) {
                this.createSingleDiagram($(div[n]).attr('id'), $(div[n]), false);
                $(divJoint).append($(div[n]));
            }
            $(div[0]).append($(divJoint));
        } else {
            $(div[0]).removeClass('activity-diagram-border')
            $(div[0]).html($(div[0]).html());
        }
        mainDiv.append($(div[0]));
    },
    getInputListHmtl4Parent: function (backlogId) {
        var div = $('<div>');
        try {
            if (backlogId.length > 0) {
                var inputList = JSON.parse(this.parentInputList[backlogId]);
                var obj = inputList.r;
                if (obj.length > 0) {
                    div.append($('<span>').append($('<b>').append("Input:").append('<br>')));
                }
                for (var i = 0; i < obj.length; i++) {
                    var span = $('<span>')
                            .addClass("ad_input_item")
                            .append("- " + obj[i].inputName);
                    if (obj[i].parentInputDescription.length > 0) {
                        span.append(' ')
                        span.append(this.getInputDescriptionDiv(obj[i].parentInputDescription));
                    }

                    if (this.hasInputInBacklog(backlogId, obj[i].id)) {
                        span.append($('<span>').append("*").attr("style", "color:red;"));
                    }

                    if (obj[i].fkDependentOutputId.length > 0) {
                        this.dependentInputList.push(obj[i].fkDependentOutputId);
                        span.append(' (Related to  ')
                                .append($('<i></i>').append($('<b>').append(obj[i].parentDependentInputName)))
                                .append(")")
                    }

                    span.append('<br>');
                    div.append(span);
                }
                $('[data-toggle="tooltip"]').tooltip({html: true});
            }
        } catch (err) {

        }
        return div;
    },
    getInputDescriptionDiv: function (inputDesc) {
//        var a = $('<a>')
//                .attr("href", "#")
//                .attr("data-toggle", 'tooltip')
//                .attr("data-html", "true")
//                .attr("data-trigger", "focus")
//                .attr('data-original-title', this.genInputDescLine(inputDesc))
//                .append($('<i>').addClass("fa fa-question-circle"));

        var a = $('<i>')
//                .attr("href", "#")
//                .attr("data-toggle", 'tooltip')
//                .attr("title", "")
//                .attr("data-html", "true")
                .attr("style", 'cursor:pointer;color:white;')
//                .attr("data-trigger", "focus")
//                .attr('data-original-title', this.genInputDescLine(inputDesc))
                .addClass("fa fa-question-circle")
                .addClass("tooltipMan ")
                .append($('<span>').addClass('tooltiptextMan').append(this.genInputDescLine(inputDesc)));
        return a;
    },
    genInputDescLine: function (inputDesc) {
        var res = "";
        try {
            var ds = inputDesc.split('%IN%');
            for (var i in ds) {
                if (ds[i].length === 0) {
                    continue;
                }
                res += '-' + replaceTags(fnline2Text(ds[i])) + '<br>';
            }
        } catch (err) {

        }
        return res;
    },
    getOutputListHmtl4Parent: function (backlogId) {
        var div = $('<div>');
        try {
            if (backlogId.length > 0) {
                var inputList = JSON.parse(this.parentOutputList[backlogId]);
                var obj = inputList.r;
                if (obj.length > 0) {
                    div.append($('<span>').append($('<b>').append("Output:").append('<br>')))
                }
                for (var i = 0; i < obj.length; i++) {
                    var span = $('<span>')
                            .addClass("ad_output_item")
                            .append("- " + obj[i].inputName);
                    if (this.hasInputInBacklog(backlogId, obj[i].id)) {
                        span.append($('<span>').append("*").attr("style", "color:red;"));
                    }
                    span.append('<br>');
                    div.append(span);
                }
            }
        } catch (err) {

        }
        return div;
    },
    getInputListHmtl4Child: function (backlogId) {
        var div = $('<div>');
        try {
            if (backlogId.length > 0) {
                var inputList = JSON.parse(this.inputList[backlogId]);
                var obj = inputList.r;
                if (obj.length > 0) {
                    div.append($('<span>').append($('<b>').append("Input:").append('<br>')));
                }
                for (var i = 0; i < obj.length; i++) {
                    var span = $('<span>')
                            .addClass("ad_input_item")
                            .append("- " + obj[i].inputName);
                    if (obj[i].inputDescription.length > 0) {
                        span.append(' ')
                        span.append(this.getInputDescriptionDiv(obj[i].inputDescription));
                    }

                    if (obj[i].fkDependentOutputId.length > 0) {
                        span.append(' (Related to  ')
                                .append($('<i></i>').append($('<b>').append(obj[i].dependentInputName)))
                                .append(")")
                    }

                    span.append('<br>');
                    div.append(span);
                }
            }
        } catch (err) {

        }
        return div;
    },
    getOutputListHmtl4Child: function (backlogId) {
        var div = $('<div>');
        try {
            if (backlogId.length > 0) {
                var inputList = JSON.parse(this.outputList[backlogId]);
                var obj = inputList.r;
                if (obj.length > 0) {
                    div.append($('<span>').append($('<b>').append("Output:").append('<br>')))
                }
                for (var i = 0; i < obj.length; i++) {
                    var span = $('<span>')
                            .addClass("ad_output_item")
                            .append("- " + obj[i].inputName);
                    span.append('<br>');
                    div.append(span);
                }
            }
        } catch (err) {

        }
        return div;
    },
    hasInputInBacklog: function (backlogId, inputId) {
        return false;
        var f = false;
        try {
            if (this.dependentInputList.includes(inputId)) {
                return true;
            }
            if (backlogId.length > 0) {
                var inputList = JSON.parse(this.inputList[backlogId]);
                var obj = inputList.r;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id === inputId) {
                        f = true;
                        break;
                    }
                }
            }

            if (backlogId.length > 0) {
                var inputList = JSON.parse(this.outputList[backlogId]);
                var obj = inputList.r;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id === inputId) {
                        f = true;
                        break;
                    }
                }
            }

        } catch (err) {
        }
        return f;
    },
    hasOutputInBacklog: function (backlogId, inputId) {

        var f = false;
        try {
            if (this.dependentInputList.includes(inputId)) {
                return true;
            }
            if (backlogId.length > 0) {
                var inputList = JSON.parse(this.inputList[backlogId]);
                var obj = inputList.r;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id === inputId) {
                        f = true;
                        break;
                    }
                }
            }




        } catch (err) {
        }
        return f;
    },
    getBacklogDependency: function () {
        if (!global_var.current_project_id) {
            return;
        }
        var json = {kv: {}};
        try {
            json.kv.cookie = document.cookie;
        } catch (err) {
        }
        json.kv.fkProjectId = global_var.current_project_id;
        var that = this;
        var data = JSON.stringify(json);
        var rs = {};
        $.ajax({
            url: urlGl + "api/post/srv/serviceTmGetBacklogDependencyList",
            type: "POST",
            data: data,
            contentType: "application/json",
            crossDomain: true,
            async: false,
            success: function (res) {
                rs = res;
            },
            error: function () {
                alert(('somethingww'));
            }
        });
        return rs;
    },
    nullHeight: function () {
        $(".activity-diagram-border-body").each(function () {
            $(this).height('');
        });
    },
    adjustHeight: function () {
        this.nullHeight();
        $(".activity-diagram-border-body").each(function () {
            var h = $(this).parent('div').first().height();
            $(this).height(h);
        });
    }
}
