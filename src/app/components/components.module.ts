import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MovieEditCreateComponent } from './movie-edit-create/movie-edit-create.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    MovieListComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MovieEditCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [
    MovieListComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MovieEditCreateComponent
  ]
})
export class ComponentsModule { }
