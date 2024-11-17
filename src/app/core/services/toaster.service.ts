import {inject, Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private toastr: ToastrService = inject(ToastrService);

  public successMesage(mesage: string, title:string): void{
    this.toastr.success(mesage, title);
  }

  public errorMesage(mesage: string, title:string): void{
    this.toastr.error(mesage, title);
  }

  public warningMesage(mesage: string, title:string): void{
    this.toastr.warning(mesage, title);
  }

  public infoMesage(mesage: string, title:string): void{
    this.toastr.info(mesage, title);
  }

}
