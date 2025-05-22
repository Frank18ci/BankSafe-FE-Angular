import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardInputMask]'
})
export class CardInputMaskDirective {

  constructor(private elementR: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    let input = this.elementR.nativeElement;
    let value = input.value;

    
    value = value.replace(/\s/g, '');

    
    value = value.replace(/\D/g, '');

    
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    
    input.value = value;
  }
}
