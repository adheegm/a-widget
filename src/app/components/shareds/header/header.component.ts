import { 
  Component, 
  OnInit, 
  Input, 
  ViewEncapsulation  } from '@angular/core';

import { Menu } from '../../../controls/commons/helper.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  
  @Input() title: string;
  menus: Menu[];

  constructor() { }

  ngOnInit() {    
        // init dummy data for menu
        this.menus = Array<Menu>();
        
        const menu1: Menu = { 
          id: 0,
          title: 'Home',
          link: '/'
        };
        this.menus.push(menu1);
    
        const menu2: Menu = { 
          id: 0,
          title: 'Controls',
          link: '/controls'
        };
    
        this.menus.push(menu2);
  }

}
