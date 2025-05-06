import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-layout-page',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

}
