import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'mindmap-chatroom-create',
  templateUrl: './chatroom-create.component.html',
  styleUrls: ['./chatroom-create.component.scss'],
})
export class ChatroomCreateComponent {
  inputValue = '';
  toppings = new FormControl<string[]>([]);
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni',
    'Sausage', 'Tomato','Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry',
    'Sausage', 'Tomato','Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry',
    'Sausage', 'Tomato','Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (event.value) {
      this.toppings.value?.push(value);
    }
  }

  remove(fruit: string): void {
    const index = this.toppings.value?.indexOf(fruit);
    console.log('index', index);
    if (!!index && index !== -1) {
      this.toppings.value?.splice(index, 1);
    }
  }

}
