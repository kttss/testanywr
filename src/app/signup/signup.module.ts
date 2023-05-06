import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { SharedModule } from '../shared/shared.module';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [SignupComponent, SignupFormComponent],
  imports: [CommonModule, SignupRoutingModule, SharedModule],
})
export class SignupModule {}
