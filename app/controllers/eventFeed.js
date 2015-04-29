var Cloud = require('ti.cloud');
Cloud.debug = true;



//$.list.setMarker({sectionIndex:0,itemIndex:100});

var plainTemplate = {
    childTemplates: [ {
        type: "Ti.UI.Label",
        bindId: "area",
        properties: {
            backgroundColor: "white",
            right: "10dp",
            top: "10dp",
            bottom: "12dp",
            left: "75dp",
            borderColor : 'black',
            borderRadius: "5dp",
            separatorColor: "#253640"
        }
    }, {
        type: "Ti.UI.Label",
        bindId: "title",
        properties: {
        	height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            color: "#565656",
            font: {
                fontFamily: "Arial",
                fontSize: "18dp"
            },
            left: "120dp",
            top: "20dp"
        },
        separatorColor: "#253640"
    }, {
        type: "Ti.UI.Label",
        bindId: "textDetails",
        properties: {
        	height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            color: "black",
            font: {
                fontFamily: "Arial",
                fontSize: "14dp"
            },
            left: "100dp",
            top: "50dp",
            bottom : "12dp"
        }
    }, {
    	type: "Ti.UI.Label",
    	bindId: "date",
    	properties:{
    	height:"50dp",
    	left: "6dp",
    	width: "60dp",
    	top: "5dp",
    	right: "200dp", 
    	color: "black",
    	borderRadius: "3dp",
    	backgroundColor : "white",
    	separatorColor: "#253640"
    	}
    },
    
     ]
};

var listView = Ti.UI.createListView({
	templates : {
		uncheck : plainTemplate
	},
	
	defaultItemTemplate : "uncheck"
});

var section = Ti.UI.createListSection();
 listView.sections = [ section];
 
 var data = [];
 var sectionViews = [];

var eventList = ['55402fdc54add893d5b66618', '5541288e08c91ee922eb1fd7'];


for ( var i = 0; i < eventList.length; i++) {
Cloud.Events.show({
    event_id: eventList[i]
}, function (e) {
    if (e.success) {
        var event = e.events[0];
		    var moment = require('alloy/moment');
			var day = moment(event.start_time, "YYYY-MM-DD:HH:mm:ssZZ");
			var newDate = day.format("MM-DD");
  
    data.push({
    	        area : {},
            	title : { text: event.name},
            	textDetails: { text: event.details},
            	date: {text: newDate},
    	
 
        
    });
}
     section.setItems(data);
           });
           eventList[i] = Ti.UI.createView();        
           eventList[i].add(listView);
           		}

var scrollableView = Ti.UI.createScrollableView({
  views:eventList,
  showPagingControl:true
});          
  
 sectionView = Ti.UI.createView();
 sectionView.add(scrollableView);
 $.myView.add(sectionView);
$.win.open();



/*
function handleClick (e) {
 // Get the section of the clicked item
	var section = $.list.sections[e.sectionIndex];
 // Get the clicked item from that section
	var item = section.getItemAt(e.itemIndex);
 // Update the item's `title` property and set it's color to red:
	item.properties.title += " (clicked)";
	item.properties.color = 'red';
 // Update the item in the list
	section.updateItemAt(e.itemIndex, item);
}
*/

