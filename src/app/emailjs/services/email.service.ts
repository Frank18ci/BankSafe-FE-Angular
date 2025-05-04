import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
  enviarEmail(data: any) {
    return emailjs.send(
      'service_dwcvgii',
      'template_rd9rj7j',
      data,
      'YgC0eDRxF6iXT6xpP'
    );
  }
}
