import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { DragDropModule } from 'ng-devui/dragdrop';
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
   
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44385"]
      }
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
