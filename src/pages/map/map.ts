import {
    Capital
}
from "../../models/capital";
import {
    CapitalsProvider
}
from "../../providers/capitals/capitals";
import {
    Component
}
from '@angular/core';
import {
    NavController, NavParams
}
from 'ionic-angular';
import {
    latLng, Map, MapOptions, Marker, tileLayer
}
from 'leaflet';
import * as L from "leaflet";

/**
 * Generated class for the IssueMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@
Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    map: Map;
    capitalsList: Capital[] = [];
    mapOptions: MapOptions;

    constructor(public navCtrl: NavController, public navParams: NavParams, public capitals: CapitalsProvider) {
        this.mapOptions = {
            layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18
                })
      ],
            zoom: 5,
            center: latLng(46.778186, 6.641524)
        };
    }

    onMapReady(map: Map) {
        this.map = map;
        this.getCapitals().catch(error => {
            console.log(error);
        });


        this.map.on('moveend', () => {
            const center = this.map.getCenter();
            console.log(`Map moved to ${center.lng}, ${center.lat}`);
        });
    }

    async getCapitals() {
        var dataCH = await this.capitals.getCapital("CH", "json");
        var dataFR = await this.capitals.getCapital("FR", "json");
        var dataDE = await this.capitals.getCapital("DE", "json");
        var dataIT = await this.capitals.getCapital("IT", "json");
        this.capitalsList.push(dataCH, dataFR, dataDE, dataIT);
        this.createMarkers();
        this.createPolyLines();
    }
    createMarkers() {
        for (let capital of this.capitalsList) {
            L.marker([capital.GeoPt[0], capital.GeoPt[1]]).bindTooltip(capital.Name).addTo(this.map);
        }

    }
    createPolyLines() {
        var points: L.LatLng[] = [];
        for (let capital of this.capitalsList) {
            console.log(capital);
            points.push(new L.LatLng(capital.GeoPt[0], capital.GeoPt[1]));
        }

        new L.Polyline(points, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1

        }).addTo(this.map);

    }
}
