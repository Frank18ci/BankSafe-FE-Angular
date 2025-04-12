import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule, FileUploadModule],
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
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    this.userService.uploadUserImage(formData).subscribe((res :any) =>{
      console.log(res)
      this.pathImg = res.url
      console.log(this.pathImg)
    })
  }
  pathImg: string = ''
 
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }
}
