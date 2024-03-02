import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { gup } from 'src/app/core/utils/format.util';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from '../../core/services/auth/auth.service';
import { ShareDataService } from 'src/app/share-data.service';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/pages/account/change-password/change-password.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  notificationItems: Array<{}>;
  selectedLanguage = 'vi';
  fullScreen = false;
  elem: any;
  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  filePath = 'assets/images/users/avatar_default.png';

  workStt: any;
  workStatus = [
    {
      class: 'bg-success badge rounded-pill',
      icon: '',
      name: 'user.working_status.ready'
    },
    {
      class: 'bg-warning badge rounded-pill',
      icon: '',
      name: 'user.working_status.talking'
    },
    {
      class: 'bg-warning badge rounded-pill',
      icon: '',
      name: 'user.working_status.acw'
    },
    {
      class: 'bg-warning badge rounded-pill',
      icon: '',
      name: 'user.working_status.hold-on'
    },
    {
      class: 'bg-danger badge rounded-pill',
      icon: '',
      name: 'user.working_status.break'
    },
    {
      class: 'bg-danger badge rounded-pill',
      icon: '',
      name: 'user.working_status.off'
    },
  ]

  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    public translate: TranslateService,
    private shareDataService: ShareDataService,
    private modalService: NgbModal,

    @Inject(DOCUMENT) private document: any
    ) {
      this.shareDataService.shareMenuMobile$.subscribe((data) => {
        this.toggleMobileMenuCustom();
    });
  }

  ngOnInit() {
    this.workStt = this.workStatus[0];
    this.elem = document.documentElement;
    let lang = gup('lang');
    if (lang && ['en', 'vi'].some(elem => elem === lang)) {
        this.selectedLanguage = lang;
        localStorage.setItem('language', lang);
    } else {
        lang = localStorage.getItem('language');
        this.selectedLanguage = lang ? lang : 'vi';
    }
    if(this.authService.user) {
      this.filePath = (this.authService.user.avatarUrl ? this.authService.user.avatarUrl : 'assets/images/users/avatar_default.png');
    }
    this.translate.use(this.selectedLanguage ? this.selectedLanguage : 'vi');
    this._fetchNotifications();
    this.openMobileMenu = false;
  }

  toggleMobileMenuCustom() {
    event.preventDefault();
    this.openMobileMenu = !this.openMobileMenu;
    this.mobileMenuButtonClicked.emit();
  }

  openScreen() {
    if(this.fullScreen) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }

  openFullscreen() {
    this.fullScreen = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    this.fullScreen = false;
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  /**
   * Change the language
   * @param language language
   */
  changeLanguage(language) {
    this.selectedLanguage = language;
    this.translate.use(this.selectedLanguage);
    this.shareDataService.shareLang(language);
    localStorage.setItem('language', language);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

  /**
   * Fetches the notification
   * Note: For now returns the hard coded notifications
   */
  _fetchNotifications() {
    this.notificationItems = [{
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/1'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/2'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'success',
      redirectTo: '/notification/3'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/4'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/5'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/6'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'success',
      redirectTo: '/notification/7'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/8'
    }];
  }

  changeWorkStatus(item) {
    this.workStt = item;
  }

  openCreateModal() {
    const modalRef = this.modalService.open(ChangePasswordComponent, { centered: true, size: 'lg', backdrop: 'static' });

    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
        this.modalService.dismissAll();
    });
  }
}
