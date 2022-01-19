let map, infoWindow, currentMarker;

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
      featureType: "poi",
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
    marker.addListener("click", () => { selectLocation(location) });
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
      map.panTo(pos);
      map.setZoom(13);
      const findMeButton = document.querySelector("#find-me-button");
      if(findMeButton) findMeButton.blur();
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
  let asterik = clone.querySelector('.sidebar-item-asterik');
  // fill elements
  name.textContent = location.name;
  parish.textContent = location.parish + " Parish";
  address.textContent = location.address;
  if(location.website) {
    website.href = location.website;
    website.textContent = location.website;
  }
  if(location.phone) {
    phone.href = 'tel:' + location.phone;
    phone.textContent = formatPhoneNumber(location.phone);
  }
  if(location.asterik) {
    asterik.textContent = "Must be atleast 16 years old";
  }
  else {
    asterik.textContent = "Must be atleast 18 years old";
  }
  clone.children[0].id = "location " + index;
  clone.children[0].addEventListener("click", () => { 
    selectLocation(location)
  });
  sidebar.appendChild(clone);
}

function scrollToSidebarItem(location) {
  let prev = document.getElementsByClassName('current-sidebar-item');
  if(prev.length > 0) {
    for(elem of prev) {
      elem.classList.remove('current-sidebar-item');
    }
  }
  if(currentMarker !== undefined) {
    currentMarker.setIcon('');
  }
  for(let i = 0; i < locations.length; i++) {
    if(location.address === locations[i].address) {
      let sidebarItem =  document.getElementById('location ' + i);
      sidebarItem.classList.add('current-sidebar-item'); 
      if(window.innerWidth >= 800) {
        document.getElementById('sidebar').scrollTop = sidebarItem.offsetTop - 6;
      }
      else {
        document.getElementById('sidebar').scrollLeft = sidebarItem.offsetLeft - 2;
      }
      break;
    }
  }
  currentMarker = location.marker;
  location.marker.setIcon({url: "images/current-marker.png", scaledSize: new google.maps.Size(27, 43) });
}

function panToLocation(location) {
  map.setZoom(13);
  map.panTo(location.coords);
}

function selectLocation(location) {
  panToLocation(location);
  scrollToSidebarItem(location);
}

function formatPhoneNumber(number) {
  if(number.length === 10) {
    return `(${number.substring(0, 3)}) ${number.substring(3,6)}-${number.substring(6,10)}`;
  }
  else if(number.length === 11) {
    return `${number.substring(0,1)} (${number.substring(1, 4)}) ${number.substring(4,7)}-${number.substring(7,11)}`;
  }
  else {
    return 'invalid phone number';
  }
}
let currentPos;
centerOnUser()
  .then((pos) => {
    let marker = new google.maps.Marker({
      position: pos,
      icon: 'images/person.png',
      map,
      title: "You are here",
    });
    marker.addListener("click", () => { centerOnUser() });
    currentPos = pos;
  })
  .catch(() => {
    console.log("Error getting location");
    handleLocationError(true, infoWindow, map.getCenter());
  })
  .finally(() => {
    sortLocations(currentPos);
    fillSidebar();
  })
