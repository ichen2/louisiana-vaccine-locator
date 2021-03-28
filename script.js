// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

let map, infoWindow, userCoords;

class Location {
  // website and phone are optional
  constructor(parish, name, address, city, website, phone, asterik) {
    this.parish = parish;
    this.name = name;
    this.address = address;
    this.coords = addressToCoords[address];
    this.city = city;
    this.website = website;
    this.phone = phone;
    this.younger = !!asterik;
  }
}

const addressToCoords = {
  "731 S Main Street": {lat: 30.452070651605258, lng: -91.18299071574268},
  "300 N Main Street": {lat: 30.407485290016126, lng: -92.21836461093541},
  "3200 Highland Road": {lat: 30.41907143662004, lng: -91.17724322318438},
}

const locations = [
  new Location("Acadia", "Church Point Community Pharmacy", "731 S Main Street", "Church Point", "http://www.communitypharmacyrx.com/", "3376841911"),
  new Location("Acadia", "Church Point Pharmacy", "300 N Main Street", "Church Point", "https://www.facebook.com/ChurchPointPharmacy/", "3376845475"),
  new Location("East Baton Rouge", "CVS", "3200 Highland Road", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
];

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

  let findMeButton = document.createElement("button");
  findMeButton.innerHTML = "Find Me";
  findMeButton.id = "find-me-button";
  findMeButton.onclick = centerOnUser;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(findMeButton);

  locations.forEach(location => {
    let marker = new google.maps.Marker({
      position: location.coords,
      map,
      title: location.name,
    });
    marker.addListener("click", () => {
      map.setZoom(13);
      map.setCenter(marker.getPosition());
      scrollToSidebarItem(location);
    });
    location.marker = marker;
  });
}

function sortLocations(userCoords) {
  locations.sort((location1, location2) => {
    let distance1 = getDistance(userCoords, location1.coords);
    let distance2 = getDistance(userCoords, location2.coords);
    if(distance1 < distance2) {
      return -1;
    }
    else if(distance1 > distance2) {
      return 1;
    }
    else {
      return 0;
    }
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
  return new Promise((resolve, reject) => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject();
      }
  });
}

function centerOnUser() {
  return new Promise((resolve, reject) => {
    findUser()
    .then((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
      map.setZoom(13);
      resolve(pos);
    })
    .catch(reject);
  });
}

function fillSidebar() {
  locations.forEach((location, index) => fillSidebarItem(location, index));
}
function fillSidebarItem(location, index) {
  // get template
  let sidebar = document.querySelector('#sidebar');
  let template = document.querySelector('#sidebar-item-template');
  let clone = template.content.cloneNode(true);
  // get elements
  let name = clone.querySelector('.sidebar-item-name');
  let parish = clone.querySelector('.sidebar-item-parish');
  let address = clone.querySelector('.sidebar-item-address');
  let website = clone.querySelector('.sidebar-item-website');
  let phone = clone.querySelector('.sidebar-item-phone');
  // fill elements
  name.textContent = location.name;
  parish.textContent = location.parish;
  address.textContent = location.address;
  if(location.website) {
    website.getAttribute('src') = location.website;
    website.textContent = location.website;
  }
  if(location.phone) {
    phone.getAttribute('src') = 'tel:' + location.phone;
    phone.textContent = location.phone;
  }
  clone.children[0].id = "location " + index;
  sidebar.appendChild(clone);
}

function scrollToSidebarItem(location) {
  document.getElementsByClassName('current-sidebar-item').classList.remove('current-sidebar-item');
  for(let i = 0; i < locations.length; i++) {
    if(location.name === locations[i].name) {
      let sidebarItem =  document.getElementById('location ' + i);
      sidebarItem.classList.add('current-sidebar-item'); 
      document.getElementById('sidebar').scrollTop = sidebarItem.offsetTop;
    }
  }
}

let currentPos;
centerOnUser()
  .then((pos) => {
    new google.maps.Marker({
      position: pos,
      icon: 'images/person.png',
      map,
      title: "You are here",
    });
    currentPos = pos;
  })
  .catch(() => {
    console.log("Error getting location");
    handleLocationError(true, infoWindow, map.getCenter());
  })
  .then(() => {
    sortLocations(currentPos);
    fillSidebar();
  })
  .catch((err) => {
    console.log("Error filling sidebar: " + err);
  });

