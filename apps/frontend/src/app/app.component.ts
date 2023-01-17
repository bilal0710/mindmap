import {Component} from '@angular/core';
import {Layout} from "@swimlane/ngx-graph";

@Component({
  selector: 'mindmap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mind-map';
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
      label: 'custom label',
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
      label: 'Root',
    },
    {
      id: 'second',
      label: 'Bilal',
    },
    {
      id: 'third',
      label: 'Tom',
    },
    {
      id: 'fourth',
      label: 'Daniel',
    },
    {
      id: 'test',
      label: 'test',
    },
  ];
}
