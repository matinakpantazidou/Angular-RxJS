// Created it to resolve the issue of the header component not being recognized in the app.module.ts file
import {NgModule} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})

export class SharedModule {
}
