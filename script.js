// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

let map, infoWindow, userCoords;

const locations = [
  {name: "CVS", coords: {lat: 30.41907143662004, lng: -91.17724322318438}},
  {name: "Church Point Community Pharmacy", coords: {lat: 30.452070651605258, lng: -91.18299071574268}},
];

let markers = [];

function getDistance(coords1, coords2) {
  return Math.sqrt(Math.abs(coords1.lat - coords2.lat) ** 2 + Math.abs(coords1.lng - coords2.lng) ** 2);
}

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
      position: location.coords,
      map,
      title: location.name,
    });
    marker.addListener("click", () => {
      map.setZoom(13);
      map.setCenter(marker.getPosition());
      infoWindow.open(map, marker);
      infoWindow.setContent(location.name);
    });
    markers.push(marker);
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
                userCoords = pos;
                map.setCenter(pos);
                map.setZoom(13);
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
  console.log(userCoords);
  console.log(getDistance(userCoords, locations[0].coords))
  console.log(getDistance(userCoords, locations[1].coords))