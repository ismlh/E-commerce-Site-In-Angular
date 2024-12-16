import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../Services/product-service.service';
import { Iproduct } from '../../Models/iproduct';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../Models/icategory';
import { CatServiceService } from '../../Services/cat-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Iproduct[] = [] as Iproduct[];
  categories: ICategory[] = [] as ICategory[];
  newProduct: Iproduct = {} as Iproduct;

  EditButton: boolean = false;

  constructor(
    private _prodServ: ProductServiceService,
    private _catSer: CatServiceService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
    this._catSer.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        alert('Error ' + err);
      },
    });
  }
  getAllProducts() {
    this._prodServ.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        alert('Error ' + err);
      },
    });
  }

  addNewProduct() {
    this.newProduct.imageUrl = 'https://picsum.photos/200/150';
    if (this.EditButton == false) {
      this._prodServ.getPrdById(this.newProduct.id).subscribe({
        next: (res) => {
          alert(`Product With Id  ${this.newProduct.id} Already Exist`);
        },
        error: () => {
          this._prodServ.addProduct(this.newProduct).subscribe({
            next: (res) => {
              alert(res.Name + 'Added Succefully');
              this.newProduct = {} as Iproduct;
              this.getAllProducts();
            },
            error: (err) => {
              alert('Error' + err);
            },
          });
        },
      });
    } else {
      this._prodServ
        .updateProduct(this.newProduct.id, this.newProduct)
        .subscribe(() => {
          this.EditButton = false;
          this.getAllProducts();
          alert(`Product With ID ${this.newProduct.id} Updated Succefully`);
        });
    }
  }

  Edit(prdId: string) {
    this.newProduct.imageUrl = 'https://picsum.photos/200/150';
    this.EditButton = true;
    this._prodServ.getPrdById(prdId).subscribe((res) => {
      this.newProduct = res;
    });
  }

  deletePrd(id: string) {
    if (confirm(`You Will Delete Product With Id : (${id}) Are You Share `)) {
      this._prodServ.deleteProduct(id).subscribe((res) => {
        this.getAllProducts();
        alert(`Product  ${res.Name} Deleted `);
      });
    }
  }
}
