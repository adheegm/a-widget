import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  }
  
}
