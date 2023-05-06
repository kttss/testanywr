import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IUserDetail } from '../../../models/user-detail.interface';

@Component({
  selector: 'anywr-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss'],
})
export class ProfilCardComponent {
  @Input() user: IUserDetail;
  @Output() logout = new EventEmitter();
  hidePassword = true;

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onLogout() {
    this.logout.emit();
  }
}
