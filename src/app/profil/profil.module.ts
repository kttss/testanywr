import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilCardComponent } from './components/profil-card/profil-card.component';

@NgModule({
  declarations: [ProfilComponent, ProfilCardComponent],
  imports: [CommonModule, ProfilRoutingModule, SharedModule],
})
export class ProfilModule {}
