import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Models/icategory';
import { Iproduct } from '../../Models/iproduct';
import { CatServiceService } from '../../Services/cat-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [] as ICategory[];

  newCat: ICategory = {} as ICategory;

  EditButton: boolean = false;

  constructor(private _catSer: CatServiceService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._catSer.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }
  addNewCategory() {
    if (!this.EditButton) {
      this._catSer.getCategoryById(this.newCat.id).subscribe({
        next: (res) => {
          alert(`Category With Id ${this.newCat.id} Already Exist`);
        },
        error: () => {
          this._catSer.addCategory(this.newCat).subscribe(() => {
            this.getAllCategories();
            alert('Added Succesfully');
            this.newCat = {} as Iproduct;
          });
        },
      });
    } else {
      this._catSer.updateCategory(this.newCat.id, this.newCat).subscribe(() => {
        alert('Updated Succefully');
        this.EditButton = false;
        this.newCat = {} as ICategory;
        this.getAllCategories();
      });
    }
  }
  Edit(id: string) {
    this.EditButton = true;
    this._catSer.getCategoryById(id).subscribe((res) => {
      this.newCat = res;
    });
  }
  deleteCategory(catId: string) {
    this._catSer.deleteCategory(catId).subscribe((res) => {
      alert(`Category : ${res.Name} deleted Succesfully`);
      this.getAllCategories();
    });
  }
}
