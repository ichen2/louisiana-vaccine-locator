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
    "9326 Burbank Drive": {lat: 30.35977655195178, lng: -91.12357776670991},
    "6885 Siegen Lane": {lat: 30.387192484794788, lng: -91.06308461538994}, 
    "2001 Millerville Road": {lat: 30.44088604885407, lng: -91.02183895767206}, 
    "3200 Highland Road": {lat: 30.41907143662004, lng: -91.17724322318438},
    "9006 Greenwell Springs Road": {lat: 30.48334265323321, lng: -91.08928064641786}, 
    "5889 Airline Highway": {lat: 30.50304539368309, lng: -91.13078865990933}, 
    "15255 George O'Neal Road": {lat: 30.409961344080894, lng: -91.01536121758353}, 
    "2520 Plank Road": {lat: 30.47064251740926, lng: -91.16267604456591}, 
    "12880 Airline Highway": {lat: 30.381176115231966, lng: -91.03937609853557}, 
    "353 N 12th Street": {lat: 30.450411147808857, lng: -91.17767610038624}, 
    "3490 Drusilla Lane": {lat: 30.419362932283438, lng: -91.09060147340313}, 
    "604 Chevelle Court": {lat: 30.44573026834416, lng: -91.10014855991065}, 
    "7777 Hennessy Boulevard": {lat: 30.40478612822835, lng: -91.10840547155128}, 
    "10444 N Mall Drive": {lat: 30.37850486547967, lng: -91.06374889853566}, 
    "7373 Perkins Road": {lat: 30.39902291350705, lng: -91.11223176176394}, 
    "3132 College Drive": {lat: 30.420267026317337, lng: -91.14298485568051}, 
    "2171 O'Neal Lane": {lat: 30.438313236026936, lng: -91.00455564641894}, 
    "10606 N Mall Drive": {lat: 30.377050212687237, lng: -91.06090878690841}, 
    "10200 Sullivan Road": {lat: 30.541888987770584, lng: -91.02525640243658}, 
    "5255 Highland Road": {lat: 30.39584583606419, lng: -91.1601320312745}, 
    "10550 Burbank Drive": {lat: 30.35218003123904, lng: -91.11001611778059}, 
    "9830 Old Hammond Highway": {lat: 30.431319753625758, lng: -91.07773774967009}, 
    "14241 Coursey Boulevard": {lat: 30.409118469663696, lng: -91.0199976564014}, 
    "11825 Hooper Road": {lat: 30.547132455696687, lng: -91.055553873585}, 
    "11550 Coursey Boulevard": {lat: 30.410489398660992, lng: -91.05409728523651}, 
    "13002 Coursey Boulevard": {lat: 30.4084384422573, lng: -91.0348484600929}, 
    "6251 Perkins Road": {lat: 30.40601761205331, lng: -91.12324164290679}, 
    "3870 Convention Street": {lat: 30.449400560078285, lng: -91.15028788892725}, 
    "17070 Greenwell Springs Road": {lat: 30.5179644444988, lng: -90.99882587358553}, 
    "20501 Old Scenic Highway": {lat: 30.654283628817154, lng: -91.19379064290212}, 
    "6351 Main Street": {lat: 30.651174478505382, lng: -91.13751881775856}, 
    "5801 Main Street": {lat: 30.65159618770807, lng: -91.14197571775848}, 
    "7515 Perkins Road": {lat: 30.396519747519374, lng: -91.10915158523676},
    "9960 Bluebonnet Boulevard": {lat: 30.355732951349236, lng: -91.11112790223639}, 
    "3801 North Boulevard": {lat: 30.449153604550954, lng: -91.1508508924458},
  }
  
  const locations = [
    new Location("Acadia", "Church Point Community Pharmacy", "731 S Main Street", "Church Point", "http://www.communitypharmacyrx.com/", "3376841911"),
    new Location("Acadia", "Church Point Pharmacy", "300 N Main Street", "Church Point", "https://www.facebook.com/ChurchPointPharmacy/", "3376845475"),
    new Location("East Baton Rouge", "Walmart Pharmacy", "14507 Plank Road", "Baker", "https://www.walmart.com/covidvaccine"),
    new Location("East Baton Rouge", "CVS Pharmacy", "1215 Main Street", "Baker", "https://www.cvs.com/immunizations/covid-19-vaccine"),
    new Location("East Baton Rouge", "Baton Rouge General Medical Center", "8585 Picardy Avenue", "Baton Rouge", "https://www.brgeneral.org/coronavirus-information/covid-19-", "2257644500"),
    new Location("East Baton Rouge", "CVS Pharmacy", "7411 Florida Boulevard", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
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
    new Location("East Baton Rouge", "CVS Pharmacy", "9326 Burbank Drive", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"), 
    new Location("East Baton Rouge", "CVS Pharmacy", "6885 Siegen Lane", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"), 
    new Location("East Baton Rouge", "CVS Pharmacy", "2001 Millerville Road", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"), 
    new Location("East Baton Rouge", "CVS Pharmacy", "3200 Highland Road", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"), 
    new Location("East Baton Rouge", "CVS Pharmacy", "9006 Greenwell Springs Road", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
    new Location("East Baton Rouge", "CVS Pharmacy", "5889 Airline Highway", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
    new Location("East Baton Rouge", "CVS Pharmacy", "15255 George O'Neal Road", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
    new Location("East Baton Rouge", "CVS Pharmacy", "2520 Plank Road", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
    new Location("East Baton Rouge", "CVS Pharmacy", "12880 Airline Highway", "Baton Rouge", "https://www.cvs.com/immunizations/covid-19-vaccine"),
    new Location("East Baton Rouge", "East Baton Rouge Health Unit", "353 N 12th Street", "Baton Rouge", undefined, "2252424862"), 
    new Location("East Baton Rouge", "Lagniappe Pharmacy", "3490 Drusilla Lane", "Baton Rouge", "https://www.lagniapperx.com/locations", "2253676488"), 
    new Location("East Baton Rouge", "Linda Stewart, MD", "604 Chevelle Court", "Baton Rouge", undefined, "2259261495"), 
    new Location("East Baton Rouge", "RxONE Med Plaza", "7777 Hennessy Boulevard", "Baton Rouge", "https://fmolhs.org/coronavirus/in-it-to-end-it-covid-19-vaccine", "2255264600"), 
    new Location("East Baton Rouge", "Sam's Club Pharmacy", "10444 N Mall Drive", "Baton Rouge", "http://www.samsclub.com/covid", "2252950914"), 
    new Location("East Baton Rouge", "The Baton Rouge Clinic", "7373 Perkins Road", "Baton Rouge", "https://batonrougeclinic.com/hours/", "2252469240"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "3132 College Drive", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "2171 O'Neal Lane", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "10606 N Mall Drive", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "10200 Sullivan Road", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "5255 Highland Road", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "10550 Burbank Drive", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "9830 Old Hammond Highway", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "14241 Coursey Boulevard", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "11825 Hooper Road", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "11550 Coursey Boulevard", "Baton Rouge", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Winn-Dixie", "13002 Coursey Boulevard", "Baton Rouge", "https://www.winndixie.com/pharmacy/covid-vaccine"), 
    new Location("East Baton Rouge", "Prescription to Geaux", "6251 Perkins Road", "Baton Rouge", "https://www.rxtogeaux.com/perkins", "2253644337"), 
    new Location("East Baton Rouge", "Raynando L. Banks, MD", "3870 Convention Street", "Baton Rouge", undefined, "2253877858"), 
    new Location("East Baton Rouge", "Bellingrath Pharmacy", "17070 Greenwell Springs Road", "Greenwell Springs", "https://www.bellingrathpharmacy.com/contact", "2255084977"), 
    new Location("East Baton Rouge", "CVS Pharmacy", "20501 Old Scenic Highway", "Zachary", "https://www.cvs.com/immunizations/covid-19-vaccine", "2255084977"), 
    new Location("East Baton Rouge", "Southeast Community Health", "6351 Main Street", "Zachary", "https://www.facebook.com/SoutheastCommunityHealth/", "2253062000"), 
    new Location("East Baton Rouge", "Walmart Pharmacy", "5801 Main Street", "Zachary", "https://www.walmart.com/covidvaccine"), 
    new Location("East Baton Rouge", "Albertsons/Savon", "7515 Perkins Road", "Baton Rouge", "https://www.mhealthsystem.com/Albertsons1311"), 
    new Location("East Baton Rouge", "Albertsons/Savon", "9960 Bluebonnet Boulevard", "Baton Rouge", "https://www.mhealthsystem.com/Albertsons3792"), 
    new Location("East Baton Rouge", "Open Health Care Clinic", "3801 North Boulevard", "Baton Rouge", "https://www.ohcc.org/location", "2256556422"),
  ];
  