import { Component, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gifTitle = 'Gif Search';
  apiUrl = 'http://api.giphy.com/v1/gifs/search?api_key=MvimvJyF5aIuTa1mV6XBNotBZWBbHoqm&limit=25&q=';
  http: Http;
  gifImageResults = [];
  footerList = [{'name': 'Graphics'},{'name': 'Addons'},{'name': 'Icons'},{'name': 'Thames'},{'name': 'Background'},{'name': 'Navigations'},{'name': 'GUI'},{'name': 'Business Cards'},{'name': 'Logos'},{'name': 'Forms'},{'name': 'Buttons'},{'name': 'UI Kits'}]
  @ViewChild('gifResultsContainer', { read: ViewContainerRef , static: false}) gifResultsContainerRef: ViewContainerRef;
  @ViewChild('gifResultsTemplate', { read:  TemplateRef, static: false}) gifResultsTemplateRef: TemplateRef<any>;
  @ViewChild('gifNoResultsFoundTemplate', { read: TemplateRef, static: false}) gifNoResultsFoundTemplateRef: TemplateRef<any>;
  @ViewChild('searchTerm',{read: ElementRef, static: false}) searchInput:ElementRef;

  constructor(http: Http) {
    this.http = http;
  }

  ngOnInit(){}

  performSearch(searchTerm: HTMLInputElement): void {
      var apiLink = this.apiUrl + searchTerm.value;
      this.http.request(apiLink)
        .subscribe((res: Response) => {
          this.gifImageResults = res.json().data;
          if(this.gifImageResults.length > 0){
            this.gifResultsContainerRef.clear();
            this.gifResultsContainerRef.createEmbeddedView(this.gifResultsTemplateRef);
            this.searchInput.nativeElement.value = '';
          } else {
            this.gifResultsContainerRef.clear();
            this.gifResultsContainerRef.createEmbeddedView(this.gifNoResultsFoundTemplateRef);
          }
      });
  }
}