import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitar-prestamo',
  template: `
    <form>
      <label>Name
        <input type="text" />
      </label>
      <label>Email
        <input type="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
  templateUrl: './solicitar-prestamo.component.html',
  styleUrl: './solicitar-prestamo.component.scss'
})
export class SolicitarPrestamoComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    
  });
  
  
}
