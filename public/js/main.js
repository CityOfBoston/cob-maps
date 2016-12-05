mapboxgl.accessToken = 'pk.eyJ1IjoibHZhcnRhbmkyNiIsImEiOiJjaXA1dzd3aWowMWg1d21rbWh4Yjhoc2ZlIn0.O1pCHVLqPC3rmHo5Nv5yOw';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/lvartani26/civsl2imo000g2jqi5f64clpb', //hosted style id
center: [-71.06,42.36], // starting position
zoom: 14 // starting zoom
});

map.on('click', function(e) {
    //  var features = map.queryRenderedFeatures(e.point);
    //  console.log(features);
map.featuresAt(e.point, {
     radius:15,
     layer: ['Parking Lots', 'Snow Routes']
}, function(err, features) {
    var feature = features[0].properties;
    if(features.length && feature.Address) {
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("Address: "+feature.Address +"" +"<br>" + feature.Comments)
            .addTo(map);
    }
    else {
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(feature.FULL_NAME +"" +"<br>" + feature.PWD_DISTRI)
            .addTo(map);
    }
})
});

var toggleableLayerIds = ['Parking Lots', 'Snow Routes'];

var imgsrc=['parking-15.png','path.png'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
var id = toggleableLayerIds[i];

var link = document.createElement('a');
link.href = '#';
link.className = 'active';
link.textContent = id;

var image= document.createElement('IMG');
image.className ='legendImage';
var imageid= imgsrc[i];
image.src=imageid;
link.appendChild(image);

link.onclick = function (e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
    } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
};

var layers = document.getElementById('menu');
layers.appendChild(link);
}
