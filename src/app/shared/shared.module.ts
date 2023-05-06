import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { MaterialModule } from './material.module';
import { HidePasswordPipe } from './pipes/hide-password.pipe';

@NgModule({
  declarations: [CardComponent, TextFieldComponent, HidePasswordPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CardComponent,
    TextFieldComponent,
    HidePasswordPipe,
    MaterialModule,
  ],
})
export class SharedModule {}
