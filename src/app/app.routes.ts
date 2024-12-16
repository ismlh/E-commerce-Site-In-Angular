import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { AboutUsComponent } from '../Components/about-us/about-us.component';
import { ContactComponent } from '../Components/contact/contact.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { OrderComponent } from '../Components/order/order.component';
import { VisionComponent } from '../Components/vision/vision.component';
import { ValuesComponent } from '../Components/values/values.component';
import { PrdDetalisComponent } from '../Components/prd-detalis/prd-detalis.component';
import { LoginComponent } from '../Components/login/login.component';
import { authGuardGuard } from '../Guards/-auth-guard.guard';

export const routes: Routes = [
  // first Match Wins
  { path: 'Home', component: HomeComponent },
  {
    path: 'About',
    component: AboutUsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'Vision' },
      { path: 'Vision', component: VisionComponent },
      { path: 'Values', component: ValuesComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'Vision' },
    ],
  },
  { path: 'Login', component: LoginComponent },
  { path: 'PrdDetalis/:id', component: PrdDetalisComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Order', component: OrderComponent, canActivate: [authGuardGuard] },
  {
    path: 'Products',
    loadComponent: () =>
      import('../Components/products/products.component').then(
        (com) => com.ProductsComponent
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'Categories',
    loadComponent: () =>
      import('../Components/categories/categories.component').then(
        (com) => com.CategoriesComponent
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'Messages',
    loadComponent: () =>
      import('../Components/messages/messages.component').then(
        (com) => com.MessagesComponent
      ),
    canActivate: [authGuardGuard],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];
