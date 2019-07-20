import { Component } from '@angular/core';

@Component({
  selector: 'popup',
  template: `
    <div class="popup-component-overlay">
      <div class="popup-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {}