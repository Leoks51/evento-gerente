import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-create-events',
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
  templateUrl: './create-events.component.html',
  styleUrl: './create-events.component.scss'
})
export class CreateEventsComponent {
  eventForm: FormGroup;

  eventImages: Record<string, string> = {
    festa: 'assets/images/festa.png',
    reuniao: 'assets/images/reuniao.png',
    religioso: 'assets/images/religioso.png'
  };

  

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<CreateEventsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.eventForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dateTime: ['', Validators.required],
        shortDescription: ['', Validators.required],
        status: ['ativo', Validators.required],
        type: ['', Validators.required], // Tipo de evento
        image: [''] // Imagem será preenchida automaticamente
      });
      this.eventForm.get('type')?.valueChanges.subscribe(type => {
        if (this.eventImages[type]) {
          this.eventForm.patchValue({ image: this.eventImages[type] });
        }
      });
    }
  
    saveEvent() {
      if (this.eventForm.valid) {
        this.dialogRef.close(this.eventForm.value); // Retorna os dados do formulário
      }
    }

    getImagePath(): string {
      const imageName = this.eventForm.value.image;
      return imageName ? `/assets/images/${imageName}` : '';
    }
  
    closeModal() {
      this.dialogRef.close();
    }
  }
