import { Component, OnInit } from '@angular/core';

import { Inbox } from './rightsidebar.model';

import { inboxData } from './data';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})
export class RightsidebarComponent implements OnInit {

  inboxData: Inbox[];

  constructor() { }

  ngOnInit() {
    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }

  /**
   * fetches the inbox value
   */
  private _fetchData() {
    this.inboxData = inboxData;
  }
}
