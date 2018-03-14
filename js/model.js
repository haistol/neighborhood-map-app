var map= null;
var markers=[];
var MapLocation= {
    center: {lat: 40.7413549, lng: -73.99802439999996},
        zoom: 13
}
var PlacesList= [
    {
        name:'cool place',
        location:{
            lat: 40.719526, 
            lng: -74.0089934
        },
        visible: true
    },
    {
        name:'cool place 2',
        location:{
            lat: 40.729526, 
            lng: -74.0099934
        },
        visible: true
    }
];
var Place =function(data){
    this.name= data.name;
    this.visible= ko.observable(data.visible);
}