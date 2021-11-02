import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    /**
     * The full current year used in the footer
     */
    CurrentYear: number = new Date().getFullYear();
}
