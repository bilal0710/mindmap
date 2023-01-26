import {Component, OnInit} from '@angular/core';
import {Layout} from "@swimlane/ngx-graph";
import {Edge} from "@swimlane/ngx-graph/lib/models/edge.model";
import {Node} from "@swimlane/ngx-graph/lib/models/node.model";

interface Mindmap {
  id: string;
  title: string;
  parent_id: string;
}

@Component({
  selector: 'mindmap-ngx-graph',
  templateUrl: './ngx-graph.component.html',
  styleUrls: ['./ngx-graph.component.scss'],
})
export class NgxGraphComponent implements OnInit {

  layout: string | Layout = 'dagreCluster';

  children: Mindmap[] = [
    {
      id: "00000000-0000-0000-0000-000000000001",
      title: "root",
      parent_id: "null"
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      title: "child_3",
      parent_id: "00000000-0000-0000-0000-000000000001"
    },
    {
      id: "00000000-0000-0000-0000-000000000005",
      title: "child_5",
      parent_id: "00000000-0000-0000-0000-000000000002"
    },
    {
      id: "00000000-0000-0000-0000-000000000004",
      title: "child_4",
      parent_id: "00000000-0000-0000-0000-000000000002"
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      title: "child_2",
      parent_id: "00000000-0000-0000-0000-000000000001"
    },
    {
      id: "00000000-0000-0000-0000-000000000006",
      title: "child_6",
      parent_id: "00000000-0000-0000-0000-000000000004"
    }
  ]

  links: Edge[] = [];
  nodes: Node[] = [];


  ngOnInit(): void {
    this.nodes = this.children?.map((child) => {
      return {
        id: child.id,
        label: child.title,
      }
    });
    this.children = this.children?.filter((child) => child.parent_id !== "null");
    this.links = this.children.map((child) => {
      return {
        id: child.title.concat(child.id),
        source: child.parent_id,
        target: child.id,
        label: 'is parent of',
      }
    });
  }
}