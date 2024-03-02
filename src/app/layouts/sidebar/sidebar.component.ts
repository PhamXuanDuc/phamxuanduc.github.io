import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { CategoryService } from 'src/app/core/services/module/category.service';
import { PermissionService } from 'src/app/core/services/module/permission.service';
import { ShareDataService } from 'src/app/share-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() isCondensed = false;
  menu: any;
  listMenu: any;
  listPer: Array<any>=[];
  curenUser: any;
  checkRoleUser: Boolean;
  @ViewChild('sideMenu', { static: false }) sideMenu: ElementRef;
  language: string;

  constructor(
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private toastService: ToastrService,
    private permissionService: PermissionService,
    private shareDataService: ShareDataService,
    private translate: TranslateService
  ) {
    this.shareDataService.shareLangMethod$.subscribe((data) => {
      if (data) {
        this.language = data;
      }
    });
  }

  ngOnInit() {
    this.language = this.translate.currentLang;
    this.curenUser = this.authenticationService.currentUser();
    this.findMenuByUserId();
    // this.getALlPer();
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);

    this._activateMenuDropdown();
  }

  findMenuByUserId() {
    this.categoryService.findMenuByUserId(this.curenUser.userId).subscribe(res => {
      this.listMenu = res.data;
      localStorage.setItem('menusOfUser', JSON.stringify(res.data));
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
        this.menu.update();
        this._activateMenuDropdown();
      });
    }, error => {
      this.toastService.error('Get data failed', '');
    });
  }
  
  getALlPer()
  {
    const json={
      status:-1
    }
    this.permissionService.getPERByCondition(json).subscribe(res => {
      if (res.errorCode === '1') {
        this.listPer=res.data;
        // console.log("list per2",this.listPer);
        //this.toastService.success(res.errorDesc);
      } else if (res.errorCode === '0') {
        this.toastService.error(res.errorDesc, '');
      } else {
        this.toastService.error('Get data failed', '');
      }
    }, error => {
      this.toastService.error('Get data failed', '');
    });
    this.checkRoleUser=this.checkRoleDM("DM009","view");
  }

  checkRoleDM(menu:any,action:any) {
  
    const CheckPer=this.listPer.filter(x=>x.menuCode===menu && x.action===action && x.roleCode===this.curenUser.roleCode && x.status===1);
    return CheckPer.length > 0;
  }

  checkPer(menu:any, action:any) {
    const CheckPer=this.listPer.filter(x=>x.menuCode===menu.code && x.action===action && x.roleCode===this.curenUser.roleCode && x.status===1);
    return CheckPer.length > 0;
  }

  putMenuId(menuId: string) {     localStorage.setItem('menuId', menuId);   }
  
  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  closeMenuMobile() {
    if(this.isCondensed) {
      this.shareDataService.shareOnOffMenu(1);
    }
  }

  /**
   * small sidebar
   */
  smallSidebar() {
    document.body.classList.add('left-side-menu-sm');
    document.body.classList.remove('left-side-menu-dark');
    document.body.classList.remove('topbar-light');
  }

  /**
   * Dark sidebar
   */
  darkSidebar() {
    document.body.classList.remove('left-side-menu-sm');
    document.body.classList.toggle('left-side-menu-dark');
  }

  /**
   * Light Topbar
   */
  lightTopbar() {
    document.body.classList.add('left-side-menu-dark');
    document.body.classList.add('topbar-light');
    document.body.classList.remove('left-side-menu-sm');
    document.body.classList.remove('enlarged');

  }

  /**
   * Sidebar collapsed
   */
  sidebarCollapsed() {
    document.body.classList.add('enlarged');
    document.body.classList.remove('left-side-menu-dark');
    document.body.classList.remove('left-side-menu-sm');
    document.body.classList.remove('boxed-layout');

  }

  /**
   * Boxed Layout
   */
  boxedLayout() {
    document.body.classList.toggle('boxed-layout');
    document.body.classList.remove('left-side-menu-dark');
    document.body.classList.add('enlarged');
  }

  /**
   * Activates the menu dropdown
   */
  _activateMenuDropdown() {
    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
        // tslint:disable-next-line: no-string-literal
        if (window.location.pathname === links[i]['pathname']) {
            menuItemEl = links[i];
            break;
        }
    }

    if (menuItemEl) {
        menuItemEl.classList.add('active');

        const parentEl = menuItemEl.parentElement;
        if (parentEl) {
            parentEl.classList.add('active');

            const parent2El = parentEl.parentElement;
            if (parent2El) {
                parent2El.classList.add('in');
            }

            const parent3El = parent2El.parentElement;
            if (parent3El) {
                parent3El.classList.add('active');
                parent3El.firstChild.classList.add('active');
            }
        }
    }
  }

}
