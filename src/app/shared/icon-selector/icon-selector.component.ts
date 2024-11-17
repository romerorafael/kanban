import { Component } from '@angular/core';
import {iconsNames} from "../../core/models";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './icon-selector.component.html',
  styleUrl: './icon-selector.component.scss'
})
export class IconSelectorComponent {

  protected iconsNames:string[] = iconsNames;

}
