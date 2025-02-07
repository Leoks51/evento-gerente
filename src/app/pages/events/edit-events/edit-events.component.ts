import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Events } from '../../../models/events.model';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-edit-events',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDialogActions, 
    MatDialogContent, 
    ReactiveFormsModule, 
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-events.component.html',
  styleUrl: './edit-events.component.scss'
})
export class EditEventsComponent {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Events
  ) {
    this.eventForm = this.fb.group({
      id: [data.id],
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      dateTime: [data.dateTime, Validators.required],
      shortDescription: [data.shortDescription, Validators.required],
      status: ['ativo', Validators.required]
    });
  }

  saveEvent() {
    if (this.eventForm.valid) {
      this.dialogRef.close(this.eventForm.value); // Retorna os dados do formulário
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
