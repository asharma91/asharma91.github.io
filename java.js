var map = L.map('mapid').setView([40.719190, -73.996589], 13);
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
map.addLayer(CartoDBTiles);

var marker = L.marker([40.719189,-73.996589]).addTo(map)

marker.bindPopup("<b>G.Rider</b><br><b>Favorite Food:</b> Fresh Souls</br><b>Favorite Song:</b> Free Bird</br><b>Favorite Movie:</b> The Jerk</br><b>Favorite Hobby:</b> Poppin-Wheelies!").openPopup();

var featureClick = function (feature, layer) {
	layer.bindPopup(
"<strong>Name:</strong> " + feature.properties.Myname + "<br /><strong>Favorite Food:</strong> " + feature.properties.FavFood + "<br /><strong>Favorite Song:</strong> " + feature.properties.FavSong + "<br /><strong>Favorite Movie:</strong> " + feature.properties.FavMovie + "<br /><strong>Favorite Hobby:</strong> " + feature.properties.FavHobby)
}
var myPoints = L.geoJson(geojsonFeature, {
    onEachFeature: featureClick
}).addTo(map);
//var marker2 = L.marker([40.719189, -73.996589]).addTo(map)
//marker.bindPopup("<b>G.Rider</b><br><b>Favorite Food:</b> Fresh Souls</br><b>Favorite Song:</b> Free Bird</br><b>Favorite Movie:</b> The Jerk</br><b>Favorite Hobby:</b> Poppin-Wheelies!").openPopup();

var unemploymentStyle = function (feature){
    var value = feature.properties.UnempRate;
    var fillColor = null;
    if(value >= 0 && value <=0.025){
		fillColor = "#4dac26";
    }
    if(value >0.02 && value <=0.05){
        fillColor = "#a6d96a";
    }
    if(value >0.05 && value<=0.075){
    	fillColor = "#fc8d59";
    }
    if(value > 0.075 && value <=0.10){
    	fillColor = "#e34a33";
    }
    if(value > 0.10 && value <=0.125) { 
		fillColor = "#e6550d";
    }
    if(value > 0.125) { 
		fillColor = "#b30000";
    }

    var style = {
        weight: 1,
        opacity: .1,
        color: 'white',
        fillOpacity: 0.75,
        fillColor: fillColor
    };

    return style;
}
var unemploymentClick = function (feature, layer) {
	var percent = feature.properties.UnempRate * 100;
	percent = percent.toFixed(0);
	// let's bind some feature properties to a pop up
	layer.bindPopup("<strong>Neighborhood:</strong> " + feature.properties.NYC_NEIG + "<br /><strong>Unemployment Rate: </strong>" + percent + "%");
}
var neighborhoodsGeoJSON = L.geoJson(neighborhoods, {
    style: unemploymentStyle,
    onEachFeature: unemploymentClick
}).addTo(map);

var baseMaps = {
    "CartoDB": CartoDBTiles,
};

var overlayMaps = {
    "Zombie Map": myPoints,
    "Unemployment Map": neighborhoodsGeoJSON
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
