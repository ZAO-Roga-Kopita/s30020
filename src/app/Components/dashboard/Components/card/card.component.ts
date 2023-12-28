import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() iconPath: string = "";
  @Input() cardName: string = "";
  @Input() cardContent: string = "";
  @Input() cardContentHeight: string = "34px";
}
