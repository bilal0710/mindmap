import {Component, OnDestroy, OnInit} from '@angular/core';
import {Layout} from "@swimlane/ngx-graph";
import {Edge} from "@swimlane/ngx-graph/lib/models/edge.model";
import {Node} from "@swimlane/ngx-graph/lib/models/node.model";
import {MindmapService} from "../mindmap.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
export class NgxGraphComponent implements OnInit, OnDestroy {

  roomId = '';
  layout: string | Layout = 'dagreCluster';
  customColors = [
    {
      name: 'france',
      value: '#ffffff'
    }
  ];


  children: Mindmap[] = [];


  links: Edge[] = [];
  nodes: Node[] = [];
  root !: Node;
  subscription: Subscription[] = [];

  constructor(private mindmapService: MindmapService,
              private activeRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.subscription.push(
      this.activeRoute.paramMap.subscribe((params) => {
        this.roomId = params.get('id') || '';
      }));

    this.mindmapService.getMindMap(this.roomId).subscribe((result) => {
      if (result) {
        this.root = {
          id: result.id,
          label: result.title.toUpperCase(),
        }
        this.children = result.children as Mindmap[];
        this.initNodes();
      }
    });

    this.subscription.push(this.mindmapService.newMindMapSubscription(this.roomId).subscribe(
      {
        next: (result) => {
          if (result) {
            console.log('result', result);
            if (result.children.length > 0 && this.children.length === 0) {
              this.children = result.children as Mindmap[];
              this.initNodes();
              return;
            }
            if (this.children.length > 0 && this.children.some(child => child.id === result.id) || result.id === this.root?.id) {
              const newChildren = result.children.filter(newChild => !this.children.find(child => child.id === newChild.id));
              newChildren.length === 1 ? this.children?.push(newChildren[0] as unknown as Mindmap) :
                newChildren.forEach((child) => this.children?.push(child as unknown as Mindmap));
              this.initNodes();
            }
            if (result.parent_id === null && !this.root) {
              this.root = {
                id: result.id,
                label: result.title.toUpperCase()
              }
              this.initNodes();
            }
          }
        },
        error: (err) => {
          console.error('error', err);
        }
      }
    ));
  }

  initNodes() {
    const children = this.children?.map((child) => {
      return {
        id: child.id,
        label: child.title.toUpperCase(),
      }
    });
    this.nodes = [this.root, ...children];
    this.links = this.children.length > 0 ? this.children.map((child) => {
      return {
        source: child.parent_id,
        target: child.id,
        label: 'is parent of',
      }
    }) : [{
      source: this.root.id,
      target: this.root.id,
    }];
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

}
