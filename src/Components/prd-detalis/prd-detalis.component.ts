import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../../Services/product-service.service';
import { Iproduct } from '../../Models/iproduct';
import { CurrencyPipe, Location } from '@angular/common';
import { ICategory } from '../../Models/icategory';
import { CatServiceService } from '../../Services/cat-service.service';

@Component({
  selector: 'app-prd-detalis',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './prd-detalis.component.html',
  styleUrl: './prd-detalis.component.css',
})
export class PrdDetalisComponent implements OnInit {
  prdDetalis!: Iproduct;
  category!: ICategory;
  products: Iproduct[] = [] as Iproduct[];
  constructor(
    private _Location: Location,
    private _activateRoute: ActivatedRoute,
    private _prdSer: ProductServiceService,
    private _router: Router,
    private _catSer: CatServiceService
  ) {}
  ngOnInit(): void {
    this._activateRoute.params.subscribe((params) => {
      this._prdSer.getPrdById(params['id']).subscribe({
        next: (product) => {
          this.prdDetalis = product;
          this._catSer
            .getCategoryById(this.prdDetalis.catid.toString())
            .subscribe((res) => {
              this.category = res;
            });
        },
        error: (err) => alert(err),
      });
    });
  }

  Back() {
    this._Location.back();
  }
  Next() {
    let index!: number;
    if (this.prdDetalis) {
      this._prdSer.getAllProducts().subscribe((productRes) => {
        this.products = productRes;
        index = this.products.findIndex(
          (product) => product.id === this.prdDetalis.id
        );
        if (index == this.products.length - 1) alert('No Next Elements');
        else {
          let id = this.products[index + 1].id;
          this._router.navigateByUrl(`PrdDetalis/${id}`);
        }
      });
    }
  }
  Prev() {
    let index!: number;
    if (this.prdDetalis) {
      this._prdSer.getAllProducts().subscribe((productRes) => {
        this.products = productRes;
        index = this.products.findIndex(
          (product) => product.id === this.prdDetalis.id
        );
        if (index == 0) alert('No Prev Elements');
        else {
          let id = this.products[index - 1].id;
          this._router.navigateByUrl(`PrdDetalis/${id}`);
        }
      });
    }
  }
}
