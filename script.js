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
  "14507 Plank Road": {lat: 30.58051005389021, lng: -91.1313399328661}, 
  "1215 Main Street": {lat: 30.452358743861257, lng: -91.1769173212272},
  "8585 Picardy Avenue": {lat: 30.39367834119406, lng: -91.09467249239532}, 
  "7411 Florida Boulevard": {lat: 30.452549359995043, lng: -91.1128447905444},
  "16777 Medical Center Drive": {lat: 30.442507975682837, lng: -91.00215077705106},
  "5000 Hennessy Boulevard": {lat: 30.40398987700237, lng: -91.10823739424222},
  "9530 Cortana Place": {lat: 30.45969683652721, lng: -91.09787640773291},
  "8601 Siegen Lane": {lat: 30.370465882989382, lng: -91.07173086356131}, 
  "10974 Joor Road": {lat: 30.546811176874634, lng: -91.0515435770449},
  "100 Woman's Way": {lat: 30.387469216115903, lng: -91.03872081938357}, 
  "2950 College Drive": {lat: 30.422389783171948, lng: -91.14131171938149},
  "15232 George O'Neal Road": {lat: 30.406348670742247, lng: -91.01513292122995}, 
  "15128 Airline Highway": {lat: 30.3574345161153, lng: -91.00818201938534},
  "4857 Government Street": {lat: 30.445229170487178, lng: -91.14057106355696},
  "2013 Central Road": {lat: 30.535960821680742, lng: -91.17231140588086}, 
  "7150 Jefferson Highway": {lat: 30.433533046729515, lng: -91.1140551328748}, 
  "6920 Plank Road": {lat: 30.513381655960977, lng: -91.14766956170543}, 
  "1718 N Foster Drive": {lat: 30.464584563715277, lng: -91.13958328074473}, 
  "3140 Florida Street": {lat: 30.45005895848444, lng: -91.15637120588593}, 
  "9952 Sullivan Road": {lat: 30.539513813904417, lng: -91.02779309238673},
}

const locations = [
  new Location("Acadia", "Church Point Community Pharmacy", "731 S Main Street", "Church Point", "http://www.communitypharmacyrx.com/", "3376841911"),
  new Location("Acadia", "Church Point Pharmacy", "300 N Main Street", "Church Point", "https://www.facebook.com/ChurchPointPharmacy/", "3376845475"),
  new Location("East Baton Rouge", "CVS", "3200 Highland Road", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
  new Location("East Baton Rouge", "Walmart Pharmacy", "14507 Plank Road", "Baker", "https://www.walmart.com/covidvaccine"),
  new Location("East Baton Rouge", "CVS", "1215 Main Street", "Baker", "https://www.cvs.com/immunizations/covid-19-vaccine"),
  new Location("East Baton Rouge", "Baton Rouge General Medical Center", "8585 Picardy Avenue", "Baton Rouge", "https://www.brgeneral.org/coronavirus-information/covid-19-", "2257644500"),
  new Location("East Baton Rouge", "CVS", "7411 Florida Boulevard", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
  new Location("East Baton Rouge", "Ochsner Pharmacy and Wellness O'Neal", "16777 Medical Center Drive", "Baton Rouge", "https://www.ochsner.org/vaccine", "18848882772"),
  new Location("East Baton Rouge", "Our Lady of the Lake Medical Center", "5000 Hennessy Boulevard", "Baton Rouge", "https://fmolhs.org/coronavirus/in-it-to-end-it-covid-19-vaccine", "2257655500"),
  new Location("East Baton Rouge", "Walmart Pharmacy", "9530 Cortana Place", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
  new Location("East Baton Rouge", "Winn-Dixie", "8601 Siegen Lane", "Baton Rouge", "https://www.winndixie.com/pharmacy/covid-vaccine"), 
  new Location("East Baton Rouge", "Winn-Dixie", "10974 Joor Road", "Baton Rouge", "https://www.winndixie.com/pharmacy/covid-vaccine"),
  new Location("East Baton Rouge", "Woman's Hospital", "100 Woman's Way", "Baton Rouge", "https://www.womans.org/about- womans/community/coronavirus/covid-19-vaccine-request"), 
  new Location("East Baton Rouge", "Albertsons/Savon", "2950 College Drive", "Baton Rouge", "https://www.mhealthsystem.com/Albertsons0709"), 
  new Location("East Baton Rouge", "Albertsons/Savon", "15232 George O'Neal Road", "Baton Rouge", "https://www.mhealthsystem.com/Albertsons3713"), 
  new Location("East Baton Rouge", "Albertsons/Savon", "15128 Airline Highway", "Baton Rouge", "https://www.mhealthsystem.com/Albertsons3747"), 
  new Location("East Baton Rouge", "Albertsons/Savon", "4857 Government Street", "Baton Rouge", "https://www.mhealthsystem.com/Albertsons3750"), 
  new Location("East Baton Rouge", "Baton Rouge Primary Care", "2013 Central Road", "Baton Rouge", "https://www.brpcc.org", "2257741120"), 
  new Location("East Baton Rouge", "Bocage Pharmacy Centre", "7150 Jefferson Highway", "Baton Rouge", "https://www.bocagepharmacycentre.com/", "2253642847"), 
  new Location("East Baton Rouge", "Bordelon's Super Save Pharmacy", "6920 Plank Road", "Baton Rouge", "https://www.bordelonpharmacy.com/contact", "2253560253"), 
  new Location("East Baton Rouge", "Brown's Pharmacy", "1718 N Foster Drive", "Baton Rouge", "https://www.brownsrxla.com", "2254653669"), 
  new Location("East Baton Rouge", "CareSouth, Capital City Family Health", "3140 Florida Street", "Baton Rouge", "https://www.caresouth.org/locations/baton-rouge/", "2256502000"), 
  new Location("East Baton Rouge", "Central Pharmacy", "9952 Sullivan Road", "Baton Rouge", undefined, "2252626200"),
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
      selectLocation(location);
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
  parish.textContent = location.parish + " Parish";
  address.textContent = location.address;
  if(location.website) {
    website.href = location.website;
    website.textContent = location.website;
  }
  if(location.phone) {
    phone.href = 'tel:' + location.phone;
    phone.textContent = location.phone;
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
}

function panToLocation(location) {
  map.setZoom(13);
  map.panTo(location.coords);
}

function selectLocation(location) {
  panToLocation(location);
  scrollToSidebarItem(location);
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
  .finally(() => {
    sortLocations(currentPos);
    fillSidebar();
  })
