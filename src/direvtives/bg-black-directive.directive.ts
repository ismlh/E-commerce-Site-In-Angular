import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appBgBlackDirective]',
  standalone: true,
})
export class BgBlackDirectiveDirective implements AfterViewInit {
  @Input() extrenalColor!: string;
  @Input('appBgBlackDirective') d_Color!: string;
  constructor(private ele: ElementRef) {}
  ngAfterViewInit(): void {
    this.ele.nativeElement.style.backgroundColor = this.extrenalColor;
  }
  @HostListener('mouseenter') over() {
    this.ele.nativeElement.style.backgroundColor = this.d_Color;
  }
  @HostListener('mouseleave') out() {
    this.ele.nativeElement.style.backgroundColor = this.extrenalColor;
  }
}
