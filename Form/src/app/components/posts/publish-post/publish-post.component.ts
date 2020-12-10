import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css'],
})
export class PublishPostComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  publishPost!: FormGroup;
  postKinds: any[] = [
    { id: 1, name: 'Eğitim' },
    { id: 2, name: 'Bilim' },
    { id: 3, name: 'Felsefe' },
    { id: 4, name: 'Tasarım' },
    { id: 5, name: 'Yazılım' },
    { id: 6, name: 'Yazılım' },
    { id: 7, name: 'Yazılım' },
    { id: 8, name: 'Yazılım' },
    { id: 9, name: 'Yazılım' },
  ];
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.publishPost = this.fb.group({
      title: ['', Validators.required],
      kindId: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  post() {
    this.accountService.register(this.publishPost.value).subscribe(
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
