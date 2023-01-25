import {Component} from '@angular/core';
import {Layout} from "@swimlane/ngx-graph";
@Component({
  selector: 'mindmap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  layout: string | Layout = 'dagreCluster';

  links = [
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: 'is parent of',
    },
    {
      id: 'b',
      source: 'first',
      target: 'third',
      label: 'is parent of',
    },
    {
      id: 'c',
      source: 'second',
      target: 'fourth',
      label: 'custom label',
    },
  ];
  nodes = [
    {
      id: 'first',
      label: 'Mindmap',
    },
    {
      id: 'second',
      label: 'Second',
    },
    {
      id: 'third',
      label: 'Third',
    },
    {
      id: 'fourth',
      label: 'Fourth',
    },
    /*{
      id: 'test',
      label: 'test',
    },*/
  ];
}
