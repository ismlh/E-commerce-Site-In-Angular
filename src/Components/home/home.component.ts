import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from '../order/order.component';
import { CatServiceService } from '../../Services/cat-service.service';
import { IUserMessage } from '../../Models/iuser-message';
import { UserMsgsService } from '../../Services/user-msgs.service';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
// Import library module
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    OrderComponent,
    CarouselModule,
  ],
  providers: [
    {
      provide: CarouselConfig,
      useValue: {
        interval: 2000,
        noPause: true,
        showIndicators: false,
        showControls: true,
      },
    },
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: ICategory[] = [] as ICategory[];
  selectedCatId: number = 0;
  totalOrderPrice: number = 0;
  userMessages: IUserMessage[] = [] as IUserMessage[];
  itemsPerSlide = 1; // Default value for items per slide
  singleSlideOffset = true;
  noWrap = true;

  constructor(
    private _catSer: CatServiceService,
    private _userMsgsSer: UserMsgsService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this._catSer.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.getAllMsg();
  }

  getAllMsg() {
    this._userMsgsSer.getAllMessages().subscribe((res) => {
      this.userMessages = res;
    });
  }

  receiveData(val: number) {
    this.totalOrderPrice = val;
  }

  trackById(index: number, item: any): number {
    return item.id; // assuming `id` is a unique identifier for each message
  }
}
