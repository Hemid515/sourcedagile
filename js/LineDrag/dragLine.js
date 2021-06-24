
function DragLine(startElement,endElement) {  

  //var line = new LeaderLine(startElement, endElement,{  startPlug: 'disc',endPlug: 'arrow1',path: "default"});
      //line.setOptions({color: 'black'})
    var  line = new LeaderLine(startElement,endElement);
   // var  endLine = new LeaderLine(startElement,endElement);
  new PlainDraggable(startElement,{
      onDrag: function() {
        line.position();
        line.setOptions({startSocket:'auto' , endSocket:'auto'})
      }});
  new PlainDraggable(endElement,{
      onDrag: function() {
          line.position();
         line.setOptions({startSocket:'auto' , endSocket:'auto'})
      }});
  }