import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
    myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();
    breadcrumb$: Observable<any>;
    private breadcrumbSubject = new Subject<any>();
    topbarMethod$: Observable<any>;
    private topbarSubject = new Subject<any>();
    shareLangMethod$: Observable<any>;
    private langSubject = new Subject<any>();
    shareMenuMobile$: Observable<any>;
    private menuMobileSubject = new Subject<any>();
    // Other user login make conflict session
    conflictSession$: Observable<any>;
    private conflictSessionSubject = new Subject<any>();

    // offline soft otp
    totalTranWatingApprove$: Observable<any>;
    private shareAppTranSubject = new Subject<any>();

    //so giao dich cho duyet
    totalMethod$: Observable<any>;
    private totalSubject = new Subject<any>();
    
    constructor() {
        this.myMethod$ = this.myMethodSubject.asObservable();
        this.breadcrumb$ = this.breadcrumbSubject.asObservable();
        this.topbarMethod$ = this.topbarSubject.asObservable();
        this.shareLangMethod$ = this.langSubject.asObservable();
        this.shareMenuMobile$ = this.menuMobileSubject.asObservable();
        this.conflictSession$ = this.conflictSessionSubject.asObservable();
        this.totalTranWatingApprove$ = this.shareAppTranSubject.asObservable();
        this.totalMethod$ = this.totalSubject.asObservable();
    }

    shareData(data: any) {
        this.myMethodSubject.next(data);
    }

    shareBreadCrumbs(data: any) {
        this.breadcrumbSubject.next(data);
    }

    shareDataTopbar(data: any) {
        this.topbarSubject.next(data);
    }

    shareDataTotalRecord(data: any) {
        this.totalSubject.next(data);
    }

    shareLang(data: any) {
        this.langSubject.next(data);
    }

    shareOnOffMenu(data: any) {
        this.menuMobileSubject.next(data);
    }

    shareTotalAppTran(data: any) {
        this.shareAppTranSubject.next(data);
    }

    shareConflictSession(data: any) {
        this.conflictSessionSubject.next(data);
    }
}
