import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  //MyBold xài ngoài thẻ html
  selector: '[MyBold]'
})
export class BoldDirective {

  constructor(private element: ElementRef, private render: Renderer2) {
    render.setStyle(element.nativeElement,'color','red');
   }
    
}
