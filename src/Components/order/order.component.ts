import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Iproduct } from '../../Models/iproduct';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductServiceService } from '../../Services/product-service.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnChanges, OnInit {
  products: Iproduct[] = [] as Iproduct[];
  filtedProducts: Iproduct[] = [] as Iproduct[];
  totalOrderPrice: number = 0;
  @Input() recievedCatId: number = 0;
  @Output() dataEmitter = new EventEmitter<number>();

  @ViewChild('inputCount') inputCount!: ElementRef;
  constructor(
    private _router: Router,
    private _prdSer: ProductServiceService
  ) {}
  ngOnInit(): void {
    this._prdSer.getAllProducts().subscribe((productsRes) => {
      this.products = productsRes;
      this.filtedProducts = this.products;
    });
  }

  ngOnChanges() {
    if (this.recievedCatId == 0) this.filtedProducts = this.products;
    else
      this._prdSer.getPrdsByCatId(this.recievedCatId).subscribe((products) => {
        this.filtedProducts = products;
      });
  }
  Buy(input: HTMLInputElement, price: number) {
    this.totalOrderPrice += Number(input.value) * price;
    input.value = '';
    this.dataEmitter.emit(this.totalOrderPrice);
  }
  Detalis(id: any) {
    this._router.navigateByUrl(`PrdDetalis/${Number(id)}`);
  }
}
