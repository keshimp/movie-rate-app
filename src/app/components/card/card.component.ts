import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent<T> {
  /**
   * Title of the card - defaults to title
   */
  @Input() Title = 'Title';

  /**
   * Bool used to direct the template whether or not to render the edit button
   * Should default to false - if the parent component handles the edit output, then set to true
   */
  @Input() HandleEdit = false;

  /**
   * Bool used to direct the template whether or not to render the delete button
   * Should default to false - if the parent component handles the delete output, then set to true
   */
  @Input() HandleDelete = false;

  /**
   * Emits an event when the delete button is clicked so it can be handled
   * in the parent component
   */
  @Output() Delete: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Emits an event when the edit button is clicked so it can be handled
   * in the parent component
   */
  @Output() Edit: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}
