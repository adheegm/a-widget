import { 
  Component, 
  OnInit, 
  Input,
  Output,
  EventEmitter,
  NgModule, 
  ViewEncapsulation  } from '@angular/core';
  
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { 
  NgSwitch, 
  NgSwitchCase, 
  NgSwitchDefault 
} from '@angular/common';

import { DOMType } from '../commons/enums/dom-type.enum';
import { DataType } from '../commons/enums/data-type.enum';
import { ContentEditableEditingStyle } from '../commons/enums/content-editable-edit-mode';

@Component({
  selector: 'aw-editable-content',
  templateUrl: './editable-content.component.html',
  styleUrls: ['./editable-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableContentComponent implements OnInit {
  
  val: any; // private value for value

  @Input() editable = false;

  @Input() onEdit = false;

  @Output() valueChange = new EventEmitter();
  
  @Input()
  get value() {
    return this.val;
  }
  set value(value) {
    this.val = value;
    this.valueChange.emit(this.val);
  }

  @Input() dataType = DataType.STRING;

  @Input() onEditDOM = DOMType.TEXT_BOX;

  @Input() contentEditingMode = ContentEditableEditingStyle.DOUBLE_CLICK;
  
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.onEdit = this.editDOM();
  }

  onDoubleClick(event) {
    if (this.contentEditingMode === 1) return;
    this.onEdit = false;
  }

  editDOM(): boolean {
    return (this.editable) ? !this.onEdit : false;
  }

}

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [EditableContentComponent],
    declarations: [EditableContentComponent]
})
export class EditableContentModule { }

