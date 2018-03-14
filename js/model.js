var map= null;
var markers=[];
var CLIENT_ID ='';
var CLIENT_SECRET= '';
var MapLocation= {
    center: {lat: 18.4757862, lng: -69.8855868},
        zoom: 14
}
var PlacesList= [
    {
        name: 'Basilica Cathedral of Santa María la Menor',
        location: {
            lat: 18.472778, 
            lng: -69.883889
        },
        foursquareID: '4ba418e9f964a520268138e3',
        visible: true
    },
    {
        name: 'Alcázar de Colón',
        location: {
            lat: 18.4775, 
            lng: -69.8828
        },
        foursquareID: '4d02ecf5dc45a0930e3ee1c6',
        visible: true
    },
    {
        name: 'Fortaleza Ozama',
        location: {
            lat: 18.4732, 
            lng: -69.88171
        },
        foursquareID: '4c53bcce1b46c9b678ad71cd',
        visible: true
    },
    {
        name: 'Monasterio de San Francisco',
        location: {
            lat: 18.472867, 
            lng: -69.886556
        },
        foursquareID: '',
        visible: true
    },
    {
        name: 'Puerta del Conde',
        location: {
            lat: 18.4715, 
            lng: -69.89155
        },
        foursquareID: '4f53b5e5e4b0639bbaaae94a',
        visible: true
    }
];
var Place =function(data){
    this.name= data.name;
    this.visible= ko.observable(data.visible);
}