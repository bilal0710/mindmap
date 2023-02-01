import {Component} from '@angular/core';

@Component({
  selector: 'mindmap-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', "Boots", "Boots", "Boots", "Loafers"];
}
