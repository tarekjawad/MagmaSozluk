import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { Class } from '../../_models/class';
import { School } from '../../_models/school';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  bsConfig!: Partial<BsDatepickerConfig>;
  maxDate: Date = new Date();
  schools$!: School[];
  schools2$!: School[];
  classes$!: Class[];
  classes2$!: Class[];
  countries$: string[] = ['Türkiye'];
  cities$: string[] = [];
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intitializeForm();
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY',
    };

    this.maxDate.setFullYear(this.maxDate.getFullYear() - 10);
    this.memberService.getSchools().subscribe((schools) => {
      this.memberService.schools = schools;
      this.schools$ = schools;
      this.schools$.forEach((school) => {
        if (!this.cities$.includes(school.city)) {
          this.cities$.push(school.city);
        }
      });
    });

    this.registerForm!.get('country')?.valueChanges.subscribe((x) => {});

    this.registerForm!.get('city')?.valueChanges.subscribe((x) => {
      this.schools2$ = this.schools$.filter(
        (x) => x.city == this.registerForm!.get('city')?.value
      );
      this.registerForm.controls['schoolId']?.reset();
      this.registerForm.controls['classId']?.reset();
    });
    this.registerForm!.get('schoolId')?.valueChanges.subscribe((x) => {
      this.classes2$ = this.classes$.filter(
        (x) => x.schoolId == this.registerForm!.get('schoolId')?.value
      );
    });
    this.memberService.getClasses().subscribe((classes) => {
      this.memberService.classes = classes;
      this.classes$ = classes;
    });
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['female'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      schoolId: ['', Validators.required],
      classId: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/members');
      },
      (error) => {
        this.validationErrors = error;
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
