import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {AuthService, ToasterService, UserConfigService, UserService} from "../../core/services";
import {LoaderComponent} from "../../shared/loader/loader.component";
import {User, UserConfig} from "../../core/models";
import {NgxColorsModule} from "ngx-colors";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    LoaderComponent,
    NgxColorsModule,
    NgOptimizedImage,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private _userService: UserService = inject(UserService);
  private _authService: AuthService = inject(AuthService);
  private _toasterService: ToasterService= inject(ToasterService);
  private _translateService: TranslateService = inject(TranslateService);

  protected userFormGroup:FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  protected color = new FormControl('');

  protected isEditable:boolean = false;
  protected hide:boolean = false;
  protected isLoading:boolean = false;
  protected user!: User;

  protected onCreateUser(): void{
    this.isLoading = true;
    let user:User = this.userFormGroup.value
    user.roleId = 1;

    this._userService.createUser(this.userFormGroup.value).subscribe({
      next: result => {
        this.user = result;
        let creatorMessage: string;
        this._translateService.get('user_created').subscribe((translation:string) => {
          creatorMessage = translation;
          this._toasterService.successMesage(creatorMessage, "Success");
        });
      },
      error: () => {
        let creatorMessage: string;
        this._translateService.get('generic_error').subscribe((translation:string) => {
          creatorMessage = translation;
          this._toasterService.successMesage(creatorMessage, "Error");
        });
      },complete: ()=>{
        this.isLoading = false;
      }
    })
  }

  protected forceLogin(): void{
    this._authService.login(this.user);
  }
}
