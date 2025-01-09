// import { Injectable, inject } from '@angular/core';
// import { Gift } from '../domain/gift';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../domain/user';
// import { UserLogin } from '../domain/userLogin';
// import { MessageService } from 'primeng/api';

// @Injectable({
//   providedIn: 'root'
// })
// export class UplodeService {
//   // http:HttpClient=inject(HttpClient)
//   BASE_URL = "https://localhost:44340/api/uplode"
//   uploadedFiles: any[] = [];

//   constructor(private http: HttpClient, private messageService: MessageService) {}

// post(formData:any){
//    this.http.post(this.BASE_URL, formData).subscribe(
//     (response: any) => {
//       this.messageService.add({
//         severity: 'info',
//         summary: 'File Uploaded',
//         detail: `File uploaded successfully to ${response.filePath}`
//       });
//       console.log('Upload response:', response);
//     },
//     (error) => {
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Upload Failed',
//         detail: 'There was an error uploading the file.'
//       });
//       console.error('Upload error:', error);
//     }
//   );
//   }}
   
