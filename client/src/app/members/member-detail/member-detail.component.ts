import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { School } from 'src/app/_models/school';
import { MembersService } from 'src/app/_services/members.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Class } from 'src/app/_models/class';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs!: TabsetComponent;
  member!: Member;
  memberSchool!: School;
  memberClass!: Class;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  featherIcon = faFeatherAlt;
  activeTab!: TabDirective;
  messages: Message[] = [];
  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.member=data.member;
      this.memberService
          .getMemberSchool(data.member.schoolId)
          .subscribe((school) => {
            this.memberSchool = school;
          });
        this.memberService.getMemberClass(data.member.classId).subscribe((clas) => {
          this.memberClass = clas;
        });
    })

    this.route.queryParams.subscribe((params) => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();

  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

  loadMember() {
    this.memberService
      .getMember(this.route.snapshot.paramMap.get('username') || '')
      .subscribe((member) => {
        this.member = member;
        this.memberService
          .getMemberSchool(member.schoolId)
          .subscribe((school) => {
            this.memberSchool = school;
          });
        this.memberService.getMemberClass(member.classId).subscribe((clas) => {
          this.memberClass = clas;
        });
      });
  }
  loadMessages() {
    this.messageService
      .getMessageThread(this.member.username)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
  onTabActived(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Mesajlar' && this.messages.length === 0) {
      this.loadMessages();
    }
  }
}
