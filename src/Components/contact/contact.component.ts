import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserMsgsService } from '../../Services/user-msgs.service';
import { IUserMessage } from '../../Models/iuser-message';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // import Reactive Forms Module
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  userMessageForm: FormGroup; // Name i will use to assign it to form

  constructor(private _msgSer: UserMsgsService) {
    this.userMessageForm = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{1,4}'),
      ]),
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z\\s]{2,25}'),
      ]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Addrees: new FormGroup({
        City: new FormControl('', Validators.required),
        Street: new FormControl('', Validators.required),
      }),
      Notes: new FormControl(''),
      Phones: new FormArray([
        new FormControl('', [
          Validators.required,
          Validators.pattern('^01(0|1|2|5)[0-9]{8}$'),
        ]),
      ]),
    });
  }
  get id() {
    return this.userMessageForm.get('id');
  }

  get Name() {
    return this.userMessageForm.get('Name');
  }

  get Email() {
    return this.userMessageForm.get('Email');
  }

  get City() {
    return this.userMessageForm.get('Addrees')?.get('City');
  }

  get Street() {
    return this.userMessageForm.get('Addrees')?.get('Street');
  }

  get Phones() {
    return this.userMessageForm.get('Phones') as FormArray;
  }

  get Notes() {
    return this.userMessageForm.get('Notes');
  }

  AddPhoneNumber() {
    this.Phones.push(
      new FormControl('', [
        Validators.required,
        Validators.pattern('^01(0|1|2|5)[0-9]{8}$'),
      ])
    );
  }

  RemovePhoneNumber(index: number) {
    this.Phones.removeAt(index);
  }

  SaveMessage() {
    console.log(this.userMessageForm.value);

    this._msgSer.getMessage(this.id?.value).subscribe({
      next: (res) => {
        alert(this.id?.value + ' Already Exist try Another one');
      },
      error: () => {
        this._msgSer.addMessage(this.userMessageForm.value).subscribe((res) => {
          alert(`Message With ID : ${this.id?.value} Saved `);
          this.clearForm();
        });
      },
    });
  }

  clearForm(): void {
    this.userMessageForm.get('id')?.setValue('');
    this.userMessageForm.get('Name')?.setValue('');
    this.userMessageForm.get('Email')?.setValue('');
    this.userMessageForm.get('Addrees')?.get('City')?.setValue('');
    this.userMessageForm.get('Addrees')?.get('Street')?.setValue('');
    this.userMessageForm.get('Notes')?.setValue('');

    // Clearing and resetting the Phones FormArray
    this.Phones.clear(); // Clear all phone controls

    // Add the required phone control with validators back to the Phones FormArray
    this.Phones.push(
      new FormControl('', [
        Validators.required,
        Validators.pattern('^01(1|2|5)[0-9]{8}$'),
      ])
    );
  }
}
