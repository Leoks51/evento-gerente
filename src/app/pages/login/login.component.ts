import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,
  MatButtonModule,
MatCardModule,
MatFormFieldModule,
ReactiveFormsModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  private mockUser = {
    usuario: 'admin',
    password: 'admin'
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { usuario, password } = this.loginForm.value;

    if (usuario === this.mockUser.usuario && password === this.mockUser.password) {
      this.router.navigate(['/event-list']);
    } else {
      window.alert("Usuario e Senha: admin")    }
  }
}
