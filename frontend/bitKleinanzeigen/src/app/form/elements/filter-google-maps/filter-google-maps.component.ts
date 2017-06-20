import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

import { StatisticsService, Statistics } from '../../../shared/statistics.service';

import { FormService } from '../../forms.service';

import { MessageService, Message } from '../../../shared/message.service';

declare var google : any;

declare var window : any;
// declare var window.google : any;


interface LocationStatistic {
  address : string;
  count : string;
}

interface MarkerMap {
  key : string;
  marker: any;
}

@Component({
  selector: 'filter-google-maps',
  templateUrl: './filter-google-maps.component.html',
  styleUrls: [ './filter-google-maps.component.css' ]
})
export class FilterGoogleMapsComponent {

  @ViewChild('map') filerMapElement : ElementRef;

  @Output() filterChanged : EventEmitter<void> = new EventEmitter<void>();

  public map : any;

  private googleMapsApiKey : string = 'AIzaSyByqZmYhQ1BVpkerE8RFTgbvRugzzjYNdU';

  private infowindow : any;

  private markers : MarkerMap[] = [];

  constructor(
    private statisticsService : StatisticsService,
    private formService : FormService,
    private messageService : MessageService
  ) {
    /** Google maps needs a resize to display the map.*/
    this.messageService.getObservable().subscribe((message : Message) =>  {
      if (message.message === 'toggleListingFilter') {
        this.loadGoogleMapsApi();
      }
    })
  }

  /** Loads the google maps api files async and appeds the neccesarrily script tag to the body */
  public loadGoogleMapsApi() : void {
    if (window.google && window.google.maps) {
      this.initMap();
      return;
    }
    window['initMap'] = () => {
      this.initMap();
    }
    let script : HTMLScriptElement = document.createElement('script');
    script.id = 'googleMaps';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleMapsApiKey + '&libraries=places&callback=initMap'
    document.body.appendChild(script);
  }

  /** Creates the map and adds the location markers.*/
  public initMap() : void {
    this.markers = []; // remove all former markers
    this.map = new google.maps.Map(this.filerMapElement.nativeElement, {
      center: {lat: 50, lng: 10},
      zoom: 5,
    });

    this.infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(this.map);

    this.statisticsService.updateStatistics((statistics : Statistics) => {
      statistics.locations.forEach(location => {
        this.addMarkerToMap(location.locationName, location.numberOfListings);
      })
    })
  }

  /**Adds a marker for a specific location on the map.*/
  public addMarkerToMap(location : string, listingCount : number) : void {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: location
    }, (results : any, status : any) => {
      if (status == google.maps.GeocoderStatus.OK) {
       let latVal = results[0].geometry.location.lat();
       let lngVal = results[0].geometry.location.lng();
       var myLatLng={lat: latVal, lng: lngVal};

       let markerIcon = {
         url: './assets/icons/marker.svg',
        //  size: new google.maps.Size(5000,5000),
         origin: new google.maps.Point(0,0),
         anchor: new google.maps.Point(0,32),
         scaledSize: new google.maps.Size(20, 32)
       };
       let marker = new google.maps.Marker({
         title: location,
         position: {
           lat: latVal,
           lng: lngVal
         },
         map: this.map,
         animation: google.maps.Animation.DROP
       });
       // create a red marker if the corresponding location is active
       if (this.formService.model.location.filter((loc : string) => {
         return loc === location;
       }).length > 0) {
         marker.setIcon(this.createMarkedMarkerIconSymbol())
       } else {
         marker.setIcon(this.createMarkerIconSymbol());
       }
       /**Add a click listener to react to user clicks. */
       google.maps.event.addListener(marker, 'click', () => {
         let found : boolean = false;
         for (let i = 0; i < this.formService.model.location.length && !found; i++) {
           if (this.formService.model.location[i] === location) { // marker was already marked
             found = true;
             this.formService.model.location.splice(i, 1);
             this.markers.filter((markerMap : MarkerMap) => { // deactivate the marker
               return markerMap.key === location;
             })[0].marker.setIcon(this.createMarkerIconSymbol());
           }
         }
         if (!found) {
           this.formService.model.location.push(location);
           this.markers.filter((markerMap : MarkerMap) => { // activate the marker
             return markerMap.key === location;
           })[0].marker.setIcon(this.createMarkedMarkerIconSymbol());
         }
         google.maps.event.trigger(this.map, "resize");
         this.filterChanged.emit();
       })
       var infowindow = new google.maps.InfoWindow({
         maxWidth: 600,
         content: listingCount + ' Inserate'
       });
       google.maps.event.trigger(this.map, "resize"); // triger resize to redraw the map
       this.markers.push({
         key: location,
         marker: marker
       });
       infowindow.open(this.map,marker);
      } else {
       alert("Something got wrong " + status);
     }
   });
 }

  /**Creates and returns an red marker icon. */
  private createMarkedMarkerIconSymbol() : any {
    let icon : any = this.createMarkerIconSymbol();
    icon.strokeColor = 'red';
    return icon;
  }

  /**Creates an standard marker icon symbol.*/
  private createMarkerIconSymbol() : any {
    let icon : any = {};
    icon.path = "M224.03,351.41c-70.03,0-127.01-56.97-127.01-127c0-70.04,56.98-127.02,127.01-127.02,c70.03,0,127.01,56.98,127.01,127.02C351.04,294.43,294.06,351.41,224.03,351.41z M224.03,131.39,c-51.28,0-93.01,41.73-93.01,93.02c0,51.28,41.72,93,93.01,93c51.29,0,93.01-41.72,93.01-93,C317.04,173.12,275.32,131.39,224.03,131.39z M221.1,600.68c-5.05,0-9.84-2.25-13.07-6.13C199.54,584.34,0,343.08,0,224.39C0,100.66,100.5,0,224.03,0,c119.76,0,217.18,99.69,217.18,222.22c0,61.73-54.78,159.51-100.72,230.66c-30.04,46.51-56.86,82.58-70.17,99.93,C233.61,600.68,229.17,600.68,221.1,600.68z M224.03,34C117.48,34,34,117.63,34,224.39c0,82.73,126.6,257.21,188.46,334.08,c42.88-50.54,184.75-249.34,184.75-336.26C407.21,116.67,326.75,34,224.03,34z";
    icon.labelOrigin = new google.maps.Point(0,0);
    icon.anchor = new google.maps.Point(0,0);
    icon.scale = 0.05;
    icon.strokeColor = 'blue';
    icon.strokeWeight = 1.5;
    return icon;
  }

}
