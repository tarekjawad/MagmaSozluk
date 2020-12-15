import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
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
  schools!: School[];
  classes$!: Class[];
  countries$: any[] = [
    {
      id: 1,
      name: 'Türkiye',
      cities: [
        'Adana',
        'Adıyaman',
        'Afyon',
        'Ağrı',
        'Amasya',
        'Ankara',
        'Antalya',
        'Artvin',
        'Aydın',
        'Balıkesir',
        'Bilecik',
        'Bingöl',
        'Bitlis',
        'Bolu',
        'Burdur',
        'Bursa',
        'Çanakkale',
        'Çankırı',
        'Çorum',
        'Denizli',
        'Diyarbakır',
        'Edirne',
        'Elazığ',
        'Erzincan',
        'Erzurum',
        'Eskişehir',
        'Gaziantep',
        'Giresun',
        'Gümüşhane',
        'Hakkari',
        'Hatay',
        'Isparta',
        'Mersin',
        'İstanbul',
        'İzmir',
        'Kars',
        'Kastamonu',
        'Kayseri',
        'Kırklareli',
        'Kırşehir',
        'Kocaeli',
        'Konya',
        'Kütahya',
        'Malatya',
        'Manisa',
        'Kahramanmaraş',
        'Mardin',
        'Muğla',
        'Muş',
        'Nevşehir',
        'Niğde',
        'Ordu',
        'Rize',
        'Sakarya',
        'Samsun',
        'Siirt',
        'Sinop',
        'Sivas',
        'Tekirdağ',
        'Tokat',
        'Trabzon',
        'Tunceli',
        'Şanlıurfa',
        'Uşak',
        'Van',
        'Yozgat',
        'Zonguldak',
        'Aksaray',
        'Bayburt',
        'Karaman',
        'Kırıkkale',
        'Batman',
        'Şırnak',
        'Bartın',
        'Ardahan',
        'Iğdır',
        'Yalova',
        'Karabük',
        'Kilis',
        'Osmaniye',
        'Düzce',
      ],
    },
    {
      id: 2,
      name: 'USA',
      cities: ['Washington', 'New York'],
    },
  ];
  cities: any[]=[];

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
      this.schools$ = schools;
    });

    this.registerForm!.get('country')?.valueChanges.subscribe((x) => {
      let country = this.countries$.find(
        (y) => y.id == x
      );
      this.cities=country!.cities;

    });

    this.registerForm!.get('city')?.valueChanges.subscribe((x) => {
      this.schools = this.schools$.filter(
        (x) => x.city == this.registerForm!.get('city')?.value
      );
      this.registerForm.controls['schoolId']?.reset();
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
        this.router.navigateByUrl('/');

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
