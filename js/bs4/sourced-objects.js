/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var SACore = {
    "Backlogs": {},
    "Labels": {},
    "Assignees": {},
    "Sprints": {},
    "TaskTypes": {},
    "AssignedLabels": {},
    "SUSs": [],
    "APIs": [],
    "MyUSs": [],
    "BoundUSs": [],
    "InitialUSs": [],
    updateBacklog: function (backlogId, key, value) {
        try {
            this.Backlogs[backlogId][key] = value;
        } catch (e) {
        }
    },
    updateEntireBacklog: function (backlogId, object) {
        try {
            this.Backlogs[backlogId] = object;
        } catch (e) {
        }
    },
    updateBacklogByRes: function (res) {
        var idx = getIndexOfTable(res, "userStoryTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.updateEntireBacklog(o.id, o);
        }
    },
    addBacklogByRes: function (res) {
        var idx = getIndexOfTable(res, "userStoryTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.AddBacklog(o.id, o);
        }
    },
    addInputToBacklog: function (backlogId, inputId) {
        console.log('inputids=', this.Backlogs[backlogId].inputIds)
        try {
            if (this.Backlogs[backlogId].inputIds) {
                this.Backlogs[backlogId].inputIds =
                        this.Backlogs[backlogId].inputIds + ',' + inputId;
            } else {
                this.Backlogs[backlogId]['inputIds'] = inputId;
            }
        } catch (err) {
            this.Backlogs[backlogId]['inputIds'] = inputId;
        }
    },
    deleteBacklog: function (backlogId) {
        try {
            delete this.Backlogs[backlogId];
        } catch (e) {
        }
    },
    LoadBacklog: function (res) {
        try {
            this.ClearAllFilledCombobox();
            this.Backlogs = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddBacklog(o.id, o);
                if (o.isSourced === '1') {
                    this.AddSUSs(o.id);
                    this.FillSUSCombobox(o);
                }
            }
            this.SortFilledCombos();
        } catch (err) {
        }
    },
    ClearAllFilledCombobox: function () {
        this.ClearFilledSUSCombobox();
    },
    SortFilledCombos: function () {
        sortCombo('us-gui-component-rel-sus-id');
        sortCombo('us-related-sus');
    },
    FillAllCombobox: function (obj) {
        this.FillSUSCombobox(obj);
    },
    ClearFilledSUSCombobox: function () {
        $('#us-gui-component-rel-sus-id').html('');
        $('#us-related-sus').html('');

        $('#us-gui-component-rel-sus-id').append($("<option></option>")
                .attr("value", '')
                .text(' '));
        $('#us-related-sus').append($("<option></option>")
                .attr("value", '')
                .text(' '));

        

    },
    FillSUSCombobox: function (obj) {
        $('#us-gui-component-rel-sus-id').append($("<option></option>")
                .attr("value", obj.id)
                .text(replaceTags(obj.backlogName) + "  #" + obj.orderNo + " "));

        $('#us-related-sus').append($("<option></option>")
                .attr("value", obj.id)
                .text(replaceTags(obj.backlogName) + "  #" + obj.orderNo + " "));

    },
    toJSON: function () {
        var json = {"tbl": [{"r": []}]};
        var keys = Object.keys(this.Backlogs);
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            var o = this.Backlogs[k];
            if (this.checkFilter(o)) {
                continue;
            }

            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },

    toJSON4View: function () {
        var json = {"tbl": [{"r": []}]};
        var keys = Object.keys(this.Backlogs);
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            var o = this.Backlogs[k];
            if (this.checkFilter4View(o)) {
                continue;
            }

            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },

    checkFilter: function (object) {
        var o = object;
        var continueOr = false;
        if (global_var.userStoryFilter.isSourced === '1' && o.isSourced !== '1')
            continueOr = true;
        if (global_var.userStoryFilter.isAPI === '1' && o.isApi !== '1')
            continueOr = true;
        if (global_var.userStoryFilter.isBounded === '1' && o.isBounded !== '1')
            continueOr = true;
        if (global_var.userStoryFilter.isInitial === '1' && o.isInitial !== '1')
            continueOr = true;
        if (global_var.userStoryFilter.isInitial === '1' && o.isInitial !== '1')
            continueOr = true;
        if (global_var.userStoryFilter.priority.length > 0 &&
                !global_var.userStoryFilter.priority.includes(o.priority))
            continueOr = true;
        if (global_var.userStoryFilter.backlogStatus.length > 0 &&
                !global_var.userStoryFilter.backlogStatus.includes(o.backlogStatus))
            continueOr = true;
        if (global_var.userStoryFilter.createdBy.length > 0 &&
                !global_var.userStoryFilter.createdBy.includes(o.createdBy))
            continueOr = true;
        if (global_var.userStoryFilter.assignee.length > 0 &&
                !this.hasAssigneeInFilter(o.assigneeIds))
            continueOr = true;
        if (global_var.userStoryFilter.taskType.length > 0 &&
                !this.hasTaskTypesInFilter(o.taskTypeIds))
            continueOr = true;
        if (global_var.userStoryFilter.assignedLabel.length > 0 &&
                !this.hasAssignedLabelsInFilter(o.assignedLabelIds))
            continueOr = true;
        if (global_var.userStoryFilter.label.length > 0 &&
                !this.hasLabelsInFilter(o.labelIds))
            continueOr = true;
        if (global_var.userStoryFilter.sprint.length > 0 &&
                !this.hasSprintsInFilter(o.sprintIds))
            continueOr = true;

        var userstoryname = o.backlogName.toLowerCase();
        if (global_var.userStoryFilter.userstory.length > 0 &&
                !(userstoryname.includes(global_var.userStoryFilter.userstory.toLowerCase()) ||
                        o.orderNo.includes(global_var.userStoryFilter.userstory) ||
                        o.createdByName.includes(global_var.userStoryFilter.userstory)
                        )
                )
            continueOr = true;

        return continueOr;
    },
    checkFilter4View: function (object) {
        var o = object;
        var continueOr = false;

        var userstoryname = o.backlogName.toLowerCase();
        if (global_var.userStoryFilter.userstory.length > 0 &&
                !(userstoryname.includes(global_var.userStoryFilter.userstory.toLowerCase()) ||
                        o.orderNo.includes(global_var.userStoryFilter.userstory) ||
                        o.createdByName.includes(global_var.userStoryFilter.userstory)
                        )
                )
            continueOr = true;

        return continueOr;
    },
    hasSprintsInFilter: function (coreList) {
        var f = false;
        try {
            var itemList = global_var.userStoryFilter.sprint.split('%IN%');
            for (var i = 0; i < itemList.length; i++) {
                if (itemList[i].length > 0 &&
                        coreList.includes(itemList[i]))
                    return true;
            }

        } catch (e) {

        }
        return f;
    },
    hasLabelsInFilter: function (labelList) {
        var f = false;
        try {
            var fileteredAssignedLabelList = global_var.userStoryFilter.label.split('%IN%');
            for (var i = 0; i < fileteredAssignedLabelList.length; i++) {
                if (fileteredAssignedLabelList[i].length > 0 &&
                        labelList.includes(fileteredAssignedLabelList[i]))
                    return true;
            }

        } catch (e) {

        }
        return f;
    },
    hasAssignedLabelsInFilter: function (assignedLabelList) {
        var f = false;
        try {
            var fileteredAssignedLabelList = global_var.userStoryFilter.assignedLabel.split('%IN%');
            for (var i = 0; i < fileteredAssignedLabelList.length; i++) {
                if (fileteredAssignedLabelList[i].length > 0 &&
                        assignedLabelList.includes(fileteredAssignedLabelList[i]))
                    return true;
            }

        } catch (e) {

        }
        return f;
    },
    hasAssigneeInFilter: function (assigneeList) {
        var f = false;
        try {
            var fileteredAssigneedList = global_var.userStoryFilter.assignee.split('%IN%');
            for (var i = 0; i < fileteredAssigneedList.length; i++) {
                if (fileteredAssigneedList[i].length > 0 &&
                        assigneeList.includes(fileteredAssigneedList[i]))
                    return true;
            }

        } catch (e) {

        }
        return f;
    },
    hasTaskTypesInFilter: function (taskTypesList) {
        var f = false;
        try {
            var fileteredTaskTypesList = global_var.userStoryFilter.taskType.split('%IN%');
            for (var i = 0; i < fileteredTaskTypesList.length; i++) {
                if (fileteredTaskTypesList[i].length > 0 &&
                        taskTypesList.includes(fileteredTaskTypesList[i]))
                    return true;
            }

        } catch (e) {

        }
        return f;
    },
    setEmptyMessage4Backlog: function () {
        var st = '<div  style="padding:30px;text-align:center;">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        $('#container-us-body').html(st);
    },
    AddBacklog: function (backlogId, obj) {
        this.Backlogs[backlogId] = obj;
    },
    AddInput: function (obj) {
        this.Inputs[obj.id] = obj;
    },
    AddInputDescriptions: function (obj) {
        this.InputDescriptions[obj.id] = obj;
    },
    AddAPI: function (backlogId) {
        this.APIs.push(backlogId);
    },
    AddSUSs: function (backlogId) {
        this.SUSs.push(backlogId);
    },
    AddLabel: function (id, backlogId) {
        if (typeof this.Labels[id] !== 'undefined') {
            this.Labels[id] = [];
        }
        this.Labels[id].push(backlogId);
    },
    GetInputList: function (backlogId) {
        var res = [];
        try {
            res = this.Backlogs[backlogId]['inputIds'].split(',');
        } catch (err) {
        }
        return res;
    },
    GetDescription: function (backlogId) {
        var res = "";
        try {
            res = this.Backlogs[backlogId]['description'];
        } catch (err) {
        }
        return res;
    },
    GetDescriptionSourced: function (backlogId) {
        var res = "";
        try {
            res = this.Backlogs[backlogId]['descriptionSourced'];
        } catch (err) {
        }
        return res;
    },
    GetCurrentDescriptionSourced: function () {
        return this.GetDescriptionSourced(global_var.current_backlog_id);
    },
    GetBacklogname: function (backlogId) {
        var res = "";
        try {
            res = this.Backlogs[backlogId]['backlogName'];
            res = replaceTag(res);
        } catch (err) {
        }
        return res;
    },
    GetCurrentBacklogname: function () {
        return this.GetBacklogname(global_var.current_backlog_id);
    },
    GetBacklogOrderNo: function (backlogId) {
        var res = "";
        try {
            res = this.Backlogs[backlogId]['orderNo'];
        } catch (err) {
        }
        return res;
    },
    GetBacklogParam1: function (backlogId) {
        var res = "";
        try {
            res = this.Backlogs[backlogId]['param1'];
        } catch (err) {
        }
        return res;
    },
    GetBacklogKey: function (backlogId, key) {
        var res = "";
        try {
            res = this.Backlogs[backlogId][key];
        } catch (err) {
        }
        return res;
    },

    GetBacklogKeys: function (backlogId, key) {
        var keys = [];
        try {
            keys = Object.keys(this.Backlogs);
        } catch (err) {
        }
        return keys;
    },
    GetBaklogFileUrls: function (backlogId) {
        return this.GetBacklogKey(backlogId, "fileUrl");
    },
    GetBaklogFileUrlIds: function (backlogId) {
        return this.GetBacklogKey(backlogId, "fileUrlIds");
    },
    GetCurrentBaklogFileUrls: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "fileUrl");
    },
    GetCurrentBaklogFileUrlIds: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "fileUrlIds");
    },
    GetCurrentBaklogStatus: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "backlogStatus");
    },
    GetCurrentBaklogEstimatedHours: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "estimatedHours");
    },
    GetCurrentBaklogSpentHours: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "spentHours");
    },
    GetCurrentBaklogDescriptionSourced: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "descriptionSourced");
    },
    GetCurrentBaklogDescriptionSourced1: function (backlogId) {
        return this.GetBacklogKey(backlogId, "descriptionSourced");
    },
    GetCurrentBaklogDescription: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "description");
    },
    GetCurrentBaklogPriority: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "priority");
    },
    GetCurrentBaklogIsApi: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "isApi");
    },
    GetBaklogIsApi: function (backlogId) {
        return this.GetBacklogKey(backlogId, "isApi");
    },
    GetBaklogAssignedLabel: function (backlogId) {
        return this.GetBacklogKey(backlogId, "assignedLabelIds").split(',');
    },
    GetBaklogNotifiedLabel: function (backlogId) {
        return this.GetBacklogKey(backlogId, "notifiedLabelIds").split(',');
    },
    GetCurrentBaklogProjectName: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "projectName");
    },
    GetCurrentBaklogBecause: function () {
        return this.GetBacklogKey(this.GetCurrentBacklogId(), "backlogBecause");
    },
    GetCurrentBacklogParam1: function () {
        return this.GetBacklogParam1(global_var.current_backlog_id);
    },
    GetCurrentBacklogId: function () {
        var res = global_var.current_backlog_id;
        return res;
    },
    GetBacklogKeyListWithInputs: function () {
        var json = [];

        var keys = Object.keys(this.Backlogs);
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            var o = this.Backlogs[k];
//            console.log(o.inputCount,':',parseFloat(o.inputCount))
            if (o.inputCount.length === 0 || parseFloat(o.inputCount) === 0) {
                continue;
            }
            json.push(k);
        }
        return json;
    },
}


var SAInputDesc = {
    "InputDescriptions": {},
    updateInputDescription: function (backlogId, key, value) {
        try {
            this.InputDescriptions[backlogId][key] = value;
        } catch (e) {
        }
    },
    updateEntireInputDescription: function (backlogId, object) {
        try {
            this.InputDescriptions[backlogId] = object;
        } catch (e) {
        }
    },
    updateInputDescriptionByRes: function (res) {
        var idx = getIndexOfTable(res, "inputDescriptionTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.updateEntireInputDescription(o.id, o);
        }
    },
    addInputDescriptionByRes: function (res) {
        var idx = getIndexOfTable(res, "inputDescriptionTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.AddInputDescription(o);
        }
    },
    deleteInputDescription: function (backlogId) {
        try {
            delete this.InputDescriptions[backlogId];
        } catch (e) {
        }
    },
    LoadInputDescription: function (res) {
        try {
            this.InputDescriptions = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddInputDescription(o);
            }
        } catch (err) {
        }
    },
    LoadInput: function (res) {
        try {
            this.Inputs = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddInput(o);
            }
        } catch (err) {
        }
    },

    toCurrentDescJSON: function () {
        return this.toDescJSON(global_var.current_us_input_id);
    },
    toDescJSON: function (inputId) {
        var json = {"tbl": [{"r": []}]};
        var keys = SAInput.GetCurrentInputDescription();
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            k = k.trim();
            var o = this.InputDescriptions[k];
            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },
    getDescriptionByIn: function (inputId) {
        var res = "";

        try {
            var keys = SAInput.GetInputDescription(inputId);
            for (var n = 0; n < keys.length; n++) {
                var k = keys[n];
                k = k.trim();
                var o = this.InputDescriptions[k].description;
                res += o + "%IN%";
            }

        } catch (err) {

        }
        return res;
    },
    toJSON: function () {
        var json = {"tbl": [{"r": []}]};
        var keys = Object.keys(this.InputDescriptions);
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            var o = this.InputDescriptions[k];
            if (this.checkFilter(o)) {
                continue;
            }

            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },
    GetDetails: function (descriptionId) {
        try {
            descriptionId = descriptionId.trim();
        } catch (e) {
        }
        return this.InputDescriptions[descriptionId].description;
    },
    setEmptyMessage4InputDescription: function () {
        var st = '<div  style="padding:30px;text-align:center;">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        $('#container-us-body').html(st);
    },
    AddInputDescription: function (obj) {
        this.InputDescriptions[obj.id] = obj;
    },
    AddInputDescriptions: function (obj) {
        this.InputDescriptions[obj.id] = obj;
    },
    AddAPI: function (backlogId) {
        this.APIs.push(backlogId);
    },
    AddSUSs: function (backlogId) {
        this.SUSs.push(backlogId);
    },
    AddLabel: function (id, backlogId) {
        if (typeof this.Labels[id] !== 'undefined') {
            this.Labels[id] = [];
        }
        this.Labels[id].push(backlogId);
    },
}

var SAInput = {
    "Inputs": {},
    updateInput: function (backlogId, key, value) {
        try {
            this.Inputs[backlogId][key] = value;
        } catch (e) {
        }
    },
    updateInputList: function (backlogIdList, key, value) {
        try {
            for (var i = 0; i < backlogIdList.length; i++) {
                if (backlogIdList[i].length === 0) {
                    continue;
                }
                var backlogId = backlogIdList[i].trim();
                this.updateInput(backlogId, key, value);
            }
        } catch (e) {
        }
    },
    updateEntireInput: function (backlogId, object) {
        try {
            this.Inputs[backlogId] = object;
        } catch (e) {
        }
    },
    updateInputByRes: function (res) {
        var idx = getIndexOfTable(res, "inputTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.updateEntireInput(o.id, o);
        }
    },
    addInputByRes: function (res) {
        var idx = getIndexOfTable(res, "inputTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.AddInput(o);

        }
    },
    deleteInput: function (backlogId) {
        try {
            delete this.Inputs[backlogId];
        } catch (e) {
        }
    },
    LoadInput: function (res) {
        try {
            this.Inputs = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddInput(o);
            }
        } catch (err) {
        }
    },
    getBacklogId: function () {
        return global_var.current_backlog_id;
    },
    getInputsByBacklodId: function () {
        var id = this.getBacklogId();
        var ids = SACore.GetInputList(id);
        return ids;
    },
    toJSON: function () {
        var json = {"tbl": [{"r": []}]};
        var keys = this.getInputsByBacklodId();
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n].trim();
            var o = SAInput.Inputs[k];
            json.tbl[0].r.push(o);
            idx++;
        }

        return json;
    },
    toJSONWithInputs: function () {
        var json = {"tbl": [{"r": []}]};

        var keys = Object.keys(this.Inputs);

        for (var n = 0; n < keys.length; n++) {
            var o = this.Inputs[keys[n]];
            json.tbl[0].r.push(o);
        }

        return json;
    },
    toInputJSON: function (inputId) {
        var json = {"tbl": [{"r": []}]};
        var o = SAInput.Inputs[inputId];
        json.tbl[0].r.push(o);
        return json;
    },
    toJSONAsInputType: function (backlogId) {
        var json = {"tbl": [{"r": []}]};
        try {
            var keys = SACore.GetInputList(backlogId);
            var idx = 0;
            for (var n = 0; n < keys.length; n++) {
                var k = keys[n].trim();
                var o = SAInput.Inputs[k];
                if (!(o.inputType === 'IN' || o.inputType === 'GUI')) {
                    continue;
                }
                json.tbl[0].r.push(o);
                idx++;
            }
        } catch (e) {
        }
        return json;
    },
    toJSONByBacklog: function (backlogId) {
        var json = {"tbl": [{"r": []}]};

        var keys = SACore.GetInputList(backlogId);
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n].trim();
            var o = SAInput.Inputs[k];
            json.tbl[0].r.push(o);
            idx++;
        }

        return json;
    },
    toJSONAsSectionType: function () {
        var json = {"tbl": [{"r": []}]};

        var keys = this.getInputsByBacklodId();
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n].trim();
            var o = SAInput.Inputs[k];
            json.tbl[0].r.push(o);
            idx++;
        }

        return json;
    },
    toCurrentInputJSON: function () {
        return this.toInputJSON(global_var.current_us_input_id);
    },

    AddInput: function (obj) {
        this.Inputs[obj.id] = obj;
    },
    AddInputDescriptions: function (obj) {
        this.InputDescriptions[obj.id] = obj;
    },
    AddAPI: function (backlogId) {
        this.APIs.push(backlogId);
    },
    AddSUSs: function (backlogId) {
        this.SUSs.push(backlogId);
    },
    AddLabel: function (id, backlogId) {
        if (typeof this.Labels[id] !== 'undefined') {
            this.Labels[id] = [];
        }
        this.Labels[id].push(backlogId);
    },
    GetInputDescription: function (inputId) {
        var res = [];
        try {
            res = this.Inputs[inputId]['inputDescriptionIds'].split(',');
        } catch (err) {
        }
        return res;
    },
    GetCurrentInputDescription: function () {
        return this.GetInputDescription(global_var.current_us_input_id);
    },
    GetInputName: function (inputId) {
        var res = "";
        try {
            res = this.Inputs[inputId]['inputName'];
        } catch (err) {
        }
        return res;
    },
    GetCurrentDependenceBacklogName: function () {
        var id = this.Inputs[global_var.current_us_input_id].fkDependentBacklogId;
        return SACore.GetBacklogname(id);
    },
    GetCurrentDependenceInputName: function () {
        var inputId = this.Inputs[global_var.current_us_input_id].fkDependentOutputId;
        var name = this.Inputs[inputId].inputName;
        return name;
    },
    GetCurrentDependenceId: function () {
        var id = this.Inputs[global_var.current_us_input_id].fkDependentBacklogId;
        return  id;
    },
    GetCurrentChildDependenceId: function () {
        var id = this.Inputs[global_var.current_us_input_id].childDependenceId;
        return  id;
    }
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SADependency = {
    "Dependencies": {},
    "ChildDependencies": {},
    updateInputDescription: function (backlogId, key, value) {
        try {
            this.Dependencies[backlogId][key] = value;
        } catch (e) {
        }
    },
    updateEntireInputDescription: function (backlogId, object) {
        try {
            this.Dependencies[backlogId] = object;
        } catch (e) {
        }
    },
    updateInputDescriptionByRes: function (res) {
        var idx = getIndexOfTable(res, "inputDescriptionTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.updateEntireInputDescription(o.id, o);
        }
    },
    addInputDescriptionByRes: function (res) {
        var idx = getIndexOfTable(res, "inputDescriptionTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.AddInputDescription(o);
        }
    },
    deleteInputDescription: function (backlogId) {
        try {
            delete this.Dependencies[backlogId];
        } catch (e) {
        }
    },
    LoadInputDescription: function (res) {
        try {
            this.Dependencies = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddInputDescription(o.id, o);
            }
        } catch (err) {
        }
    },
    LoadInput: function (res) {
        try {
            this.Inputs = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddInput(o);
            }
        } catch (err) {
        }
    },
    LoadDependency: function (res) {
        try {
            this.Dependencies = {};
            this.ChildDependencies = {};
            var idx = getIndexOfTable(res, "dependenceTable");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddDependencies(o);
                this.AddChildDependencies(o);
            }
        } catch (err) {
        }
    },
    GetBacklogListByParent: function (parentBacklogId) {
        var res = [];
        try {
            res = this.Dependencies[parentBacklogId];
            res[1];
        } catch (e) {
            res = [];
        }
        return res;
    },
    GetBacklogListByChild: function (childBacklogId) {
        var res = [];
        try {
            res = this.ChildDependencies[childBacklogId];
            res[1];
        } catch (e) {
            res = [];
        }
        return res;
    },
    toCurrentDescJSON: function () {
        return this.toDescJSON(global_var.current_us_input_id);
    },
    toDescJSON: function (inputId) {
        var json = {"tbl": [{"r": []}]};
        var keys = SAInput.GetCurrentInputDescription();
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            k = k.trim();
            var o = this.Dependencies[k];
            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },
    toJSON: function () {
        var json = {"tbl": [{"r": []}]};
        var keys = Object.keys(this.Dependencies);
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            var o = this.Dependencies[k];
            if (this.checkFilter(o)) {
                continue;
            }

            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },
    GetDetails: function (descriptionId) {
        try {
            descriptionId = descriptionId.trim();
        } catch (e) {
        }
        return this.Dependencies[descriptionId].description;
    },
    setEmptyMessage4InputDescription: function () {
        var st = '<div  style="padding:30px;text-align:center;">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        $('#container-us-body').html(st);
    },
    AddDependencies: function (obj) {
        if (!(this.Dependencies[obj.fkParentBacklogId])) {
            this.Dependencies[obj.fkParentBacklogId] = [];
        }
        this.Dependencies[obj.fkParentBacklogId].push(obj.fkBacklogId);
    },
    AddChildDependencies: function (obj) {
        if (!(this.ChildDependencies[obj.fkBacklogId])) {
            this.ChildDependencies[obj.fkBacklogId] = [];
        }
        this.ChildDependencies[obj.fkBacklogId].push(obj.fkParentBacklogId);
    },
    AddAPI: function (backlogId) {
        this.APIs.push(backlogId);
    },
    AddSUSs: function (backlogId) {
        this.SUSs.push(backlogId);
    },
    AddLabel: function (id, backlogId) {
        if (typeof this.Labels[id] !== 'undefined') {
            this.Labels[id] = [];
        }
        this.Labels[id].push(backlogId);
    },
}


var SABacklogLabel = {
    "LabelList": {},
    "BacklogList": {},
    "BacklogLabelList": {},
    "NotifiedLabelList": {},

    updateInputDescription: function (backlogId, key, value) {
        try {
            this.InputDescriptions[backlogId][key] = value;
        } catch (e) {
        }
    },
    updateEntireInputDescription: function (backlogId, object) {
        try {
            this.InputDescriptions[backlogId] = object;
        } catch (e) {
        }
    },
    updateInputDescriptionByRes: function (res) {
        var idx = getIndexOfTable(res, "inputDescriptionTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.updateEntireInputDescription(o.id, o);
        }
    },
    addInputDescriptionByRes: function (res) {
        var idx = getIndexOfTable(res, "inputDescriptionTable");
        var obj = res.tbl[idx].r;
        for (var n = 0; n < obj.length; n++) {
            var o = obj[n];
            this.AddInputDescription(o);
        }
    },
    deleteInputDescription: function (backlogId) {
        try {
            delete this.InputDescriptions[backlogId];
        } catch (e) {
        }
    },
    Load: function (res) {
        try {
            this.LoadLabel(res);
            this.LoadNotifiedLabel(res);

            this.LabelList = {};
            this.BacklogList = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                if (!this.LabelList[o.fkTaskLabelId]) {
                    this.LabelList[o.fkTaskLabelId] = [];
                }
                if (!this.BacklogList[o.fkBacklogId]) {
                    this.BacklogList[o.fkBacklogId] = [];
                }
                this.LabelList[o.fkTaskLabelId].push(o.fkBacklogId);
                this.BacklogList[o.fkBacklogId].push(o.fkTaskLabelId);
            }
        } catch (err) {
        }
    },
    GetBacklogList: function (labelId) {
        return this.LabelList[labelId];
    },
    GetLabelList: function (backlogId) {
        return this.BacklogList[backlogId];
    },
    GetNotifiedLabelKeys: function () {
        return Object.keys(this.NotifiedLabelList);
    },

    GetNotifiedLabelObject: function (key) {
        var st = "";
        try {
            st = this.NotifiedLabelList[key];
        } catch (err) {
        }
        return st;
    },
    GetNotifiedLabelStartDate: function (key) {
        return this.GetNotifiedLabelParam(key, "startDate");
    },
    GetNotifiedLabelStartTime: function (key) {
        return this.GetNotifiedLabelParam(key, "startTime");
    },
    GetNotifiedLabelEndDate: function (key) {
        return this.GetNotifiedLabelParam(key, "endDate");
    },
    GetNotifiedLabelEndTime: function (key) {
        return this.GetNotifiedLabelParam(key, "endTime");
    },
    GetNotifiedLabelLabelId: function (key) {
        return this.GetNotifiedLabelParam(key, "fkLabelId");
    },
    GetNotifiedLabelBaklogId: function (key) {
        return this.GetNotifiedLabelParam(key, "fkBacklogId");
    }, GetNotifiedLabelProjectId: function (key) {
        return this.GetNotifiedLabelParam(key, "fkProjectId");
    }, GetNotifiedLabelParam: function (key, param) {
        var st = "";
        try {
            st = this.NotifiedLabelList[key][param];
        } catch (err) {
        }
        return st;
    },
    GetLabelName: function (labelId) {
        var st = "";
        try {
            st = this.LabelList[labelId]['name'];
        } catch (err) {
        }
        return st;
    },
    GetBacklogLabelName: function (labelId) {
        var st = "";
        try {
            st = this.BacklogLabelList[labelId]['name'];
        } catch (err) {
        }
        return st;
    },
    LoadLabel: function (res) {
        try {
            this.BacklogLabelList = {};
            var idx = getIndexOfTable(res, "labelList");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.BacklogLabelList[o.id] = o
            }
        } catch (err) {
        }
    },
    LoadNotifiedLabel: function (res) {
        try {
            this.NotifiedLabelList = {};
            var idx = getIndexOfTable(res, "notifiedLabelList");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.NotifiedLabelList[o.id] = o
            }
        } catch (err) {
        }
    },
    GetBacklog: function (backlogId) {
        return this.BacklogList[backlogId];
    },
    GetLabel: function (labelId) {
        return this.LabelList[labelId];
    },
    LoadInput: function (res) {
        try {
            this.Inputs = {};
            var idx = getIndexOfTable(res, "Response");
            var obj = res.tbl[idx].r;
            for (var n = 0; n < obj.length; n++) {
                var o = obj[n];
                this.AddInput(o);
            }
        } catch (err) {
        }
    },

    toCurrentDescJSON: function () {
        return this.toDescJSON(global_var.current_us_input_id);
    },
    toDescJSON: function (inputId) {
        var json = {"tbl": [{"r": []}]};
        var keys = SAInput.GetCurrentInputDescription();
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            k = k.trim();
            var o = this.InputDescriptions[k];
            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },
    getDescriptionByIn: function (inputId) {
        var res = "";

        try {
            var keys = SAInput.GetInputDescription(inputId);
            for (var n = 0; n < keys.length; n++) {
                var k = keys[n];
                k = k.trim();
                var o = this.InputDescriptions[k].description;
                res += o + "%IN%";
            }

        } catch (err) {

        }
        return res;
    },
    toJSONAsBacklogLabel: function () {
        var json = {"tbl": [{"r": []}]};
        var keys = Object.keys(this.BacklogLabelList);
        var idx = 0;
        for (var n = 0; n < keys.length; n++) {
            var k = keys[n];
            var o = this.BacklogLabelList[k];
            if (o.isMenu !== '1') {
                continue;
            }

            json.tbl[0].r.push(o);
            idx++;
        }
        if (idx === 0) {
            json = {"tbl": []};
        }
        return json;
    },
    GetDetails: function (descriptionId) {
        try {
            descriptionId = descriptionId.trim();
        } catch (e) {
        }
        return this.InputDescriptions[descriptionId].description;
    },
    setEmptyMessage4InputDescription: function () {
        var st = '<div  style="padding:30px;text-align:center;">';
        st += '<h5> <i class="fa fa-cubes" style="font-size:30px"></i></h5>';
        st += "<h5> No User Story have been found or created on this project</h5>";
        st += "<p>All User Story searched or created on this project will appear here</p>"
        st += "</div>";
        $('#container-us-body').html(st);
    },
    AddInputDescription: function (obj) {
        this.InputDescriptions[obj.id] = obj;
    },
    AddInputDescriptions: function (obj) {
        this.InputDescriptions[obj.id] = obj;
    },
    AddAPI: function (backlogId) {
        this.APIs.push(backlogId);
    },
    AddSUSs: function (backlogId) {
        this.SUSs.push(backlogId);
    },
    AddLabel: function (id, backlogId) {
        if (typeof this.Labels[id] !== 'undefined') {
            this.Labels[id] = [];
        }
        this.Labels[id].push(backlogId);
    },
}
