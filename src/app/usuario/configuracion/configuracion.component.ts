import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {
  userService = inject(UsuarioService)
  formImagenUpdate = new FormGroup({
    imagen: new FormControl('')
  })
  selectedFile: File = new File([], '');
  upLoadImagen(){
    console.log("ejecuta metodo", this.formImagenUpdate.value.imagen)
  }
  upLoadImagen2(){
    
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    console.log("ejecuta metodo")
    this.userService.uploadUserImage(formData).subscribe((res :any) =>{
      console.log("Imagen subida", res)
    })
    

  }
  onFileSelected($event: any){
    console.log("cambio")
    this.selectedFile = $event.target.files[0]
  }
}
