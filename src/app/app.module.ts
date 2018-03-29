import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from "../pages/map/map";
import { CapitalsProvider } from '../providers/capitals/capitals';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LeafletModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CapitalsProvider
  ]
})
export class AppModule {}
