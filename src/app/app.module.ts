import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, NavbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private user: UserService) {
    this.user.doLoginCheck();
  }
}
