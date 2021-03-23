// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

let map, infoWindow;

let locations = [
  {name: "CVS", address: {lat: 30.41907143662004, lng: -91.17724322318438}},
  {name: "Church Point Community Pharmacy", address: {lat: 30.452070651605258, lng: -91.18299071574268}},
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.45774536395304, lng: -91.18759503879424 },
    zoom: 10,
    zoomControl: true,
    mapTypeControl: false, 
    scaleControl: false, 
    streetViewControl: false, 
    rotateControl: true, 
    fullscreenControl: false,
  });
  // hide point of interest and transit icons
  map.setOptions({styles:  [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ]})
  infoWindow = new google.maps.InfoWindow();
  locations.forEach(location => {
    let marker = new google.maps.Marker({
      position: location.address,
      map,
      title: location.name,
    });
    marker.addListener("click", () => {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
    });;
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
function findUser() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                map.setZoom(14);
                new google.maps.Marker({
                    position: pos,
                    icon: 'images/person.png',
                    map,
                    title: "You are here",
                });
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  findUser();