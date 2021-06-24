        // These parameters need to be set before defining the templates.
        var MINLENGTH = 550;  // this controls the minimum length of any swimlane
        var MINBREADTH = 100;  // this controls the minimum breadth of any non-collapsed swimlane
    
        // some shared functions
    
        // this may be called to force the lanes to be laid out again
        function relayoutLanes() {
          myDiagram.nodes.each(function(lane) {
            if (!(lane instanceof go.Group)) return;
            if (lane.category === "Pool") return;
            lane.layout.isValidLayout = false;  // force it to be invalid
          });
          myDiagram.layoutDiagram();
        }
    
        // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
        function relayoutDiagram() {
          myDiagram.layout.invalidateLayout();
          myDiagram.findTopLevelGroups().each(function(g) { if (g.category === "Pool") g.layout.invalidateLayout(); });
          myDiagram.layoutDiagram();
        }
    
        // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
        function computeMinPoolSize(pool) {
          // assert(pool instanceof go.Group && pool.category === "Pool");
          var len = MINLENGTH;
          pool.memberParts.each(function(lane) {
            // pools ought to only contain lanes, not plain Nodes
            if (!(lane instanceof go.Group)) return;
            var holder = lane.placeholder;
            if (holder !== null) {
              var sz = holder.actualBounds;
              len = Math.max(len, sz.height);
            }
          });
          return new go.Size(NaN, len);
        }
    
        // compute the minimum size for a particular Lane Group
        function computeLaneSize(lane) {
          // assert(lane instanceof go.Group && lane.category !== "Pool");
          var sz = computeMinLaneSize(lane);
          if (lane.isSubGraphExpanded) {
            var holder = lane.placeholder;
            if (holder !== null) {
              var hsz = holder.actualBounds;
              sz.width = Math.max(sz.width, hsz.width);
            }
          }
          // minimum breadth needs to be big enough to hold the header
          var hdr = lane.findObject("HEADER");
          if (hdr !== null) sz.width = Math.max(sz.width, hdr.actualBounds.width);
          return sz;
        }
    
        // determine the minimum size of a Lane Group, even if collapsed
        function computeMinLaneSize(lane) {
          if (!lane.isSubGraphExpanded) return new go.Size(1, MINLENGTH);
          return new go.Size(MINBREADTH, MINLENGTH);
        }
    
    
        // define a custom ResizingTool to limit how far one can shrink a lane Group
        function LaneResizingTool() {
          go.ResizingTool.call(this);
        }
        go.Diagram.inherit(LaneResizingTool, go.ResizingTool);
    
        LaneResizingTool.prototype.isLengthening = function() {
          return (this.handle.alignment === go.Spot.Bottom);
        };
    
        LaneResizingTool.prototype.computeMinPoolSize = function() {
          var lane = this.adornedObject.part;
          // assert(lane instanceof go.Group && lane.category !== "Pool");
          var msz = computeMinLaneSize(lane);  // get the absolute minimum size
          if (this.isLengthening()) {  // compute the minimum length of all lanes
            var sz = computeMinPoolSize(lane.containingGroup);
            msz.height = Math.max(msz.height, sz.height);
          } else {  // find the minimum size of this single lane
            var sz = computeLaneSize(lane);
            msz.width = Math.max(msz.width, sz.width);
            msz.height = Math.max(msz.height, sz.height);
          }
          return msz;
        };
    
        LaneResizingTool.prototype.resize = function(newr) {
          var lane = this.adornedObject.part;
          if (this.isLengthening()) {  // changing the length of all of the lanes
            lane.containingGroup.memberParts.each(function(lane) {
              if (!(lane instanceof go.Group)) return;
              var shape = lane.resizeObject;
              if (shape !== null) {  // set its desiredSize length, but leave each breadth alone
                shape.height = newr.height;
              }
            });
          } else {  // changing the breadth of a single lane
            go.ResizingTool.prototype.resize.call(this, newr);
          }
          relayoutDiagram();  // now that the lane has changed size, layout the pool again
        };
        // end LaneResizingTool class
    
    
        // define a custom grid layout that makes sure the length of each lane is the same
        // and that each lane is broad enough to hold its subgraph
        function PoolLayout() {
          go.GridLayout.call(this);
          this.cellSize = new go.Size(1, 1);
          this.wrappingColumn = Infinity;
          this.wrappingWidth = Infinity;
          this.isRealtime = false;  // don't continuously layout while dragging
          this.alignment = go.GridLayout.Position;
          // This sorts based on the location of each Group.
          // This is useful when Groups can be moved up and down in order to change their order.
          this.comparer = function(a, b) {
            var ax = a.location.x;
            var bx = b.location.x;
            if (isNaN(ax) || isNaN(bx)) return 0;
            if (ax < bx) return -1;
            if (ax > bx) return 1;
            return 0;
          };
        }
        go.Diagram.inherit(PoolLayout, go.GridLayout);
    
        PoolLayout.prototype.doLayout = function(coll) {
          var diagram = this.diagram;
          if (diagram === null) return;
          diagram.startTransaction("PoolLayout");
          var pool = this.group;
          if (pool !== null && pool.category === "Pool") {
            // make sure all of the Group Shapes are big enough
            var minsize = computeMinPoolSize(pool);
            pool.memberParts.each(function(lane) {
              if (!(lane instanceof go.Group)) return;
              if (lane.category !== "Pool") {
                var shape = lane.resizeObject;
                if (shape !== null) {  // change the desiredSize to be big enough in both directions
                  var sz = computeLaneSize(lane);
                  shape.width = (!isNaN(shape.width)) ? Math.max(shape.width, sz.width) : sz.width;
                  shape.height = (isNaN(shape.height) ? minsize.height : Math.max(shape.height, minsize.height));
                  var cell = lane.resizeCellSize;
                  if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                  if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
                }
              }
            });
          }
          // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
          go.GridLayout.prototype.doLayout.call(this, coll);
          diagram.commitTransaction("PoolLayout");
        };
        // end PoolLayout class
    
    
        function init() {
          
          if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
          var $ = go.GraphObject.make;
    
          myDiagram =
            $(go.Diagram, "myDiagramDiv",
              {
                // use a custom ResizingTool (along with a custom ResizeAdornment on each Group)
                resizingTool: new LaneResizingTool(),
                // use a simple layout that ignores links to stack the top-level Pool Groups next to each other
                layout: $(PoolLayout),
                // don't allow dropping onto the diagram's background unless they are all Groups (lanes or pools)
                mouseDragOver: function(e) {
                  if (!e.diagram.selection.all(function(n) { return n instanceof go.Group; })) {
                    e.diagram.currentCursor = 'not-allowed';
                  }
                },
                mouseDrop: function(e) {
                  if (!e.diagram.selection.all(function(n) { return n instanceof go.Group; })) {
                    e.diagram.currentTool.doCancel();
                  }
                },
                // a clipboard copied node is pasted into the original node's group (i.e. lane).
                "commandHandler.copiesGroupKey": true,
                // automatically re-layout the swim lanes after dragging the selection
                "SelectionMoved": relayoutDiagram,  // this DiagramEvent listener is
                "SelectionCopied": relayoutDiagram, // defined above
                "animationManager.isEnabled": false,
                // enable undo & redo
                "undoManager.isEnabled": true
              });
    
          // this is a Part.dragComputation function for limiting where a Node may be dragged
          // use GRIDPT instead of PT if DraggingTool.isGridSnapEnabled and movement should snap to grid
          function stayInGroup(part, pt, gridpt) {
            // don't constrain top-level nodes
            var grp = part.containingGroup;
            if (grp === null) return pt;
            // try to stay within the background Shape of the Group
            var back = grp.resizeObject;
            if (back === null) return pt;
            // allow dragging a Node out of a Group if the Shift key is down
            if (part.diagram.lastInput.shift) return pt;
            var p1 = back.getDocumentPoint(go.Spot.TopLeft);
            var p2 = back.getDocumentPoint(go.Spot.BottomRight);
            var b = part.actualBounds;
            var loc = part.location;
            // find the padding inside the group's placeholder that is around the member parts
            var m = grp.placeholder.padding;
            // now limit the location appropriately
            var x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x - b.x);
            var y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y - b.y);
            return new go.Point(x, y);
          }
    
          myDiagram.nodeTemplate = 
            $(go.Node, "Auto",
            { resizable: true },
              new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
              $(go.Shape, "Rectangle",
                { fill: "white", portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true }),
              $(go.TextBlock, { margin: 5,editable: true},
                new go.Binding("text", "key")),
              { dragComputation: stayInGroup  } // limit dragging of Nodes to stay within the containing Group, defined above
            )
    
          function groupStyle() {  // common settings for both Lane and Pool Groups
            return [
              {
                layerName: "Background",  // all pools and lanes are always behind all nodes and links
                background: "transparent",  // can grab anywhere in bounds
                movable: true, // allows users to re-order by dragging
                copyable: true,  // can't copy lanes or pools
                avoidable: false,  // don't impede AvoidsNodes routed Links
                minLocation: new go.Point(-Infinity, NaN),  // only allow horizontal movement
                maxLocation: new go.Point(Infinity, NaN)
              },
              new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
            ];
          }
    
          // hide links between lanes when either lane is collapsed
          function updateCrossLaneLinks(group) {
            group.findExternalLinksConnected().each(function(l) {
              l.visible = (l.fromNode.isVisible() && l.toNode.isVisible());
            });
          }
    
          // each Group is a "swimlane" with a header on the left and a resizable lane on the right
          myDiagram.groupTemplate =
            $(go.Group, "Vertical", groupStyle(),
              {
                selectionObjectName: "SHAPE",  // selecting a lane causes the body of the lane to be highlit, not the label
                resizable: true, resizeObjectName: "SHAPE",  // the custom resizeAdornmentTemplate only permits two kinds of resizing
                layout: $(go.LayeredDigraphLayout,  // automatically lay out the lane's subgraph
                  {
                    isInitial: false,  // don't even do initial layout
                    isOngoing: false,  // don't invalidate layout when nodes or links are added or removed
                    direction: 90,
                    columnSpacing: 10,
                    layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
                  }),
                computesBoundsAfterDrag: true,  // needed to prevent recomputing Group.placeholder bounds too soon
                computesBoundsIncludingLinks: true,  // to reduce occurrences of links going briefly outside the lane
                computesBoundsIncludingLocation: true,  // to support empty space at top-left corner of lane
                handlesDragDropForMembers: false,  // don't need to define handlers on member Nodes and Links
                mouseDrop: function(e, grp) {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
                  if (!e.shift) return;  // cannot change groups with an unmodified drag-and-drop
                  // don't allow drag-and-dropping a mix of regular Nodes and Groups
                  if (!e.diagram.selection.any(function(n) { return n instanceof go.Group; })) {
                    var ok = grp.addMembers(grp.diagram.selection, true);
                    if (ok) {
                      updateCrossLaneLinks(grp);
                    } else {
                      grp.diagram.currentTool.doCancel();
                    }
                  } else {
                    e.diagram.currentTool.doCancel();
                  }
                },
                subGraphExpandedChanged: function(grp) {
                  var shp = grp.resizeObject;
                  if (grp.diagram.undoManager.isUndoingRedoing) return;
                  if (grp.isSubGraphExpanded) {
                    shp.width = grp._savedBreadth;
                  } else {
                    grp._savedBreadth = shp.width;
                    shp.width = NaN;
                  }
                  updateCrossLaneLinks(grp);
                }
              },
              new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
              // the lane header consisting of a Shape and a TextBlock
              $(go.Panel, "Horizontal",
                {
                  name: "HEADER",
                  angle: 0,  // maybe rotate the header to read sideways going up
                  alignment: go.Spot.Center
                },
                $(go.Panel, "Horizontal",  // this is hidden when the swimlane is collapsed
                  new go.Binding("visible", "isSubGraphExpanded").ofObject(),
                  $(go.Shape, "Diamond",
                    { width: 8, height: 8, fill: "white" },
                    new go.Binding("fill", "color")),
                  $(go.TextBlock,  // the lane label
                    { font: "bold 13pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
                    new go.Binding("text", "text").makeTwoWay())
                ),
                $("SubGraphExpanderButton", { margin: 5 })  // but this remains always visible!
              ),  // end Horizontal Panel
              $(go.Panel, "Auto",  // the lane consisting of a background Shape and a Placeholder representing the subgraph
                $(go.Shape, "Rectangle",  // this is the resized object
                  { name: "SHAPE", fill: "white" },
                  new go.Binding("fill", "color"),
                  new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                $(go.Placeholder,
                  { padding: 12, alignment: go.Spot.TopLeft }),
                $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
                  {
                    name: "LABEL",
                    font: "bold 13pt sans-serif", editable: true,
                    angle: 90, alignment: go.Spot.TopLeft, margin: new go.Margin(4, 0, 0, 2)
                  },
                  new go.Binding("visible", "isSubGraphExpanded", function(e) { return !e; }).ofObject(),
                  new go.Binding("text", "text").makeTwoWay())
              )  // end Auto Panel
            );  // end Group
    
          // define a custom resize adornment that has two resize handles if the group is expanded
          myDiagram.groupTemplate.resizeAdornmentTemplate =
            $(go.Adornment, "Spot",
              $(go.Placeholder),
              $(go.Shape,  // for changing the length of a lane
                {
                  alignment: go.Spot.Bottom,
                  desiredSize: new go.Size(50, 7),
                  fill: "lightblue", stroke: "dodgerblue",
                  cursor: "row-resize"
                },
                new go.Binding("visible", "", function(ad) {
                  if (ad.adornedPart === null) return false;
                  return ad.adornedPart.isSubGraphExpanded;
                }).ofObject()),
              $(go.Shape,  // for changing the breadth of a lane
                {
                  alignment: go.Spot.Right,
                  desiredSize: new go.Size(7, 50),
                  fill: "lightblue", stroke: "dodgerblue",
                  cursor: "col-resize"
                },
                new go.Binding("visible", "", function(ad) {
                  if (ad.adornedPart === null) return false;
                  return ad.adornedPart.isSubGraphExpanded;
                }).ofObject())
            );
    
          myDiagram.groupTemplateMap.add("Pool",
            $(go.Group, "Auto", groupStyle(),
              { // use a simple layout that ignores links to stack the "lane" Groups next to each other
                layout: $(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
              },
              $(go.Shape,
                { fill: "white" },
                new go.Binding("fill", "color")),
              $(go.Panel, "Table",
                { defaultRowSeparatorStroke: "black" },
                $(go.Panel, "Horizontal",
                  { row: 0, angle: 0 },
                  $(go.TextBlock,
                    { font: "bold 16pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
                    new go.Binding("text").makeTwoWay())
                ),
                $(go.Placeholder,
                  { row: 1 })
              )
            ));
    
          myDiagram.linkTemplate =
            $(go.Link,
              { routing: go.Link.AvoidsNodes, corner: 5 },
              { relinkableFrom: true, relinkableTo: true },
              $(go.Shape),
              $(go.Shape, { toArrow: "Triangle" }),
              $(go.TextBlock, "...", { segmentOffset: new go.Point(0, -10), font: "bold 10pt monospace", editable: true},// this is a Link label
                )
            );
    
          // define some sample graphs in some of the lanes
          
       var  my_arr =[ // node data
            { key: "Pool1", text: "Pool", isGroup: true, category: "Pool" },
            { key: "Lane1", text: "Lane1", isGroup: true, group: "Pool1", color: "white" },
            { key: "Lane2", text: "Lane2", isGroup: true, group: "Pool1", color: "white" },
            { key: "Lane3", text: "Lane3", isGroup: true, group: "Pool1", color: "white" },
            { key: "Lane4", text: "Lane4", isGroup: true, group: "Pool1", color: "white" },
            { key: "Just Do it", group: "Lane1" },
            { key: "YOLO", group: "Lane2" },
            { key: "Motivate", group: "Lane3" },
            { key: "Coding", group: "Lane4" },
          ]
        var linkDataArray = [
          {from: "key", to: "text", text:"..."}
        ]
          myDiagram.model = new go.GraphLinksModel(my_arr,linkDataArray);
          var addBtn = document.getElementById('plus-btn');
          addBtn.addEventListener("click",function(){
            myDiagram.model.addNodeData({ key: "Lane", text: "Lane", isGroup: true, group: "Pool1", color: "white" });
          });

          var squareBtn = document.getElementById('square-btn');
          squareBtn.addEventListener("click",function() {
            myDiagram.add($(go.Part, "Auto",{resizable: true},
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Rectangle",
                  { fill: "white", portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true }),
                $(go.TextBlock, "Some text...",{editable: true})
                ))
              
          });

          var diamondBtn = document.getElementById('diamond-btn');
          diamondBtn.addEventListener("click",function() {
            myDiagram.add($(go.Part, "Auto",{resizable: true},
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Diamond",
                  { fill: "white", portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true }),
                $(go.TextBlock, "Some text...",{editable: true})
                ))
              
          });
          var circleBtn = document.getElementById('circle-btn');
          circleBtn.addEventListener("click",function() {
            myDiagram.add(
              $(go.Part, "Auto",{resizable: true},
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Circle",
                  { fill: "white", portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true }),
                $(go.TextBlock, "Some text...",{editable: true})
                )
              ) 
          });
        // Show the diagram's model in JSON format
        function save() {
          document.getElementById("mySavedModel").value = myDiagram.model.toJson();
          myDiagram.isModified = false;
        }
        function load() {
          myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
          myDiagram.delayInitialization(relayoutDiagram);
        }


        // force all lanes' layouts to be performed
        relayoutLanes();
      }  // end init

     