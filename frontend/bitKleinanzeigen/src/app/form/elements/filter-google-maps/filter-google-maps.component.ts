import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { StatisticsService, Statistics } from '../../../shared/statistics.service';

import { FormService } from '../../forms.service';

import { MessageService, Message } from '../../../shared/message.service';

declare var google : any;

interface LocationStatistic {
  address : string;
  count : string;
}

@Component({
  selector: 'filter-google-maps',
  templateUrl: './filter-google-maps.component.html',
  styleUrls: [ './filter-google-maps.component.css' ]
})
export class FilterGoogleMapsComponent implements AfterViewInit{

  @ViewChild('map') filerMapElement : ElementRef;

  @Output() filterChanged : EventEmitter<void> = new EventEmitter<void>();

  public map : any;

  private googleMapsApiKey : string = 'AIzaSyByqZmYhQ1BVpkerE8RFTgbvRugzzjYNdU';

  private infowindow : any;

  private markers : any[] = [];

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
    // this.loadGoogleMapsApi();
    // console.log(this.StatisticsService.statistics)
  }

  ngAfterViewInit() : void {
    // console.log(this.filerMapElement)
    // this.loadGoogleMapsApi();
  }

  /** Loads the google maps api files async and appeds the neccesarrily script tag to the body */
  public loadGoogleMapsApi() : void {
    if (typeof google !== 'undefined') {
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
    this.map = new google.maps.Map(this.filerMapElement.nativeElement, {
      center: {lat: 50, lng: 10},
      zoom: 5
    });

    this.infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(this.map);

    this.statisticsService.updateStatistics((statistics : Statistics) => {
      statistics.locations.forEach(location => {
        this.addMarkerToMap(location.locationName, location.numberOfListings);
      })
    })
  }

  i = 0;

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

       this.i+=1;
       let marker = new google.maps.Marker({
         title: location,
         position: {
           lat: latVal,
           lng: lngVal
         },
         map: this.map,
         animation: google.maps.Animation.DROP
       });
       google.maps.event.addListener(marker, 'click', () => {
         let found : boolean = false;
         for (let i = 0; i < this.formService.model.location.length && !found; i++) {
           if (this.formService.model.location[i] === location) {
             found = true;
             this.formService.model.location.splice(i, 1);
           }
         }
         if (!found) {
           this.formService.model.location.push(location);
         }
         google.maps.event.trigger(this.map, "resize");
         this.filterChanged.emit();
       })
       var infowindow = new google.maps.InfoWindow({
         maxWidth: 600,
         content: listingCount + ' Inserate'
       });
       google.maps.event.trigger(this.map, "resize");
       infowindow.open(this.map,marker);
      } else {
       alert("Something got wrong " + status);
     }
   });
 }


  addMarker(position : any) : any {
    let marker = new google.maps.Marker({
      position: position,
      map: this.map,
      animation: google.maps.Animation.DROP
    });
    return marker;
  }

  markerWithTimeOut(marker : any, timeout : any){
    // this.markers.push(marker);
    // console.log(this.map)
    // console.log(this.markers)
    // google.maps.event.trigger(this.map,'resize');
    let self : any = this;
    setTimeout(function() {
       self.markers.push(marker);
    }, timeout);
  }

}
