import { 
  Component, 
  OnInit,
  Input,
  NgModule,
  ViewEncapsulation
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Menu } from '../commons/helper.class';

@Component({
  selector: 'aw-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  @Input() direction = 'horizontal';

  @Input() menus: Menu[];

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
    imports: [CommonModule],
    exports: [MenuComponent],
    declarations: [MenuComponent]
})
export class MenuModule { }


