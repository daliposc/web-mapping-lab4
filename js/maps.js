// Style the vector tiles
var vtStyle = {
    admin: {
        fill: false,
        weight: 1,
        color: '#895329',
        opacity: 1,
    },
    buildings: {
        weight: 0.25,
        fill: true,
        fillColor: '#d7a85b',
        color: '#716852',
        fillOpacity: 1,
        opacity: 1,
    },
    roads: {
        weight: 2,
        color: '#91887b',
        opacity: 1,
    },
    waterareas: {
        fill: true,
        weight: 1,
        fillColor: '#b5d5f8',
        color: '#b5d5f8',
        fillOpacity: 1,
        opacity: 1,
    },
    waterways: {
        weight: 1.5,
        color: '#b5d5f8',
        fillOpacity: 1,
        opacity: 1,
    },
    greenspace: {
        fill: true,
        stroke: false,
        fillColor: '#b7e2b1',
        fillOpacity: 1,
    },
    schools: {
        fill: true,
        stroke: false,
        fillColor: '#fbf8db',
        fillOpacity: 1,
    },
    parking: {
        fill: true,
        stroke: false,
        fillColor: '#a2988a',
        fillOpacity: 1,
    },
    background: {
        fill: true,
        weight: 2,
        fillColor: '#ecf3f5',
        color: '#2e468a',
        fillOpacity: 1,
        opacity: 1,
    }
};

//Create map objects and tile layers (old)
var wmsmap = L.map('wmsmap', {center: [44.5603826,-123.2993313], zoom: 14});
var tmsmap = L.map('tmsmap', {center: [44.5603826,-123.2993313], zoom: 14});
var mvtmap = L.map('mvtmap', {center: [44.5603826,-123.2993313], zoom: 14});

// basemap layers
L.tileLayer(('http://104.196.237.92/geoserver/gwc/service/tms/1.0.0/cvobase@EPSG%3A900913@png/{z}/{x}/{-y}.png'),
    {maxZoom: 18, minZoom: 14, attribution: 'OpenStreetMaps &copy'}).addTo(tmsmap);

L.tileLayer.wms(('http://104.196.237.92/geoserver/wms?'),
    {layers: 'cvobase', maxZoom: 18, minZoom: 14, attribution: 'OpenStreetMaps &copy'}).addTo(wmsmap);

L.vectorGrid.protobuf('http://104.196.237.92/geoserver/gwc/service/tms/1.0.0/cvobase@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
    {minZoom: 14, maxZoom: 18, vectorTileLayerStyles: vtStyle}).addTo(mvtmap);

// Sync views (Thank you https://github.com/turban/Leaflet.Sync)
wmsmap.sync(tmsmap);
wmsmap.sync(mvtmap);

tmsmap.sync(wmsmap);
tmsmap.sync(mvtmap);

mvtmap.sync(wmsmap);
mvtmap.sync(tmsmap);

// Create control saying which map is which
var wmsLegend = L.control({position: 'topright'});
var tmsLegend = L.control({position: 'topright'});
var mvtLegend = L.control({position: 'topright'});

// Fill controls/legends
wmsLegend.onAdd = function(){
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h2>Web Map Service (WMS)</h2>';
    div.innerHTML += '<p>WMS renders new images for each request from the client based on the view extent and zoom level.</p>';
    return div;
}

tmsLegend.onAdd = function(){
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h2>Tile Map Service (TMS)</h2>';
    div.innerHTML += '<p>TMS uses tiled 256x256 png images that are pre-rendered on the server then cached on the client side.</p>';
    return div;
}

mvtLegend.onAdd = function(){
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h2>Mapbox Vector Tiles (MVT)</h2>';
    div.innerHTML += '<p>Vector Tiles have two main advantages over WMS and TMS:</p>';
    div.innerHTML += '<ol><li>They are much smaller in size (by about 75%)</li><li>They are styled in real time on the client side</li></ol>';
    div.innerHTML += "<p>You can find more info on MVT <a href='https://www.mapbox.com/vector-tiles/'>here</a>.";
    return div;
}

// Add controls (legends) to map
wmsLegend.addTo(wmsmap);
tmsLegend.addTo(tmsmap);
mvtLegend.addTo(mvtmap);

// Add scale bar
L.control.scale({position: 'bottomleft'}).addTo(wmsmap);
L.control.scale({position: 'bottomleft'}).addTo(tmsmap);
L.control.scale({position: 'bottomleft'}).addTo(mvtmap);














