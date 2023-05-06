import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anywr-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private _titleService: Title,private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this._titleService.setTitle(this._route.snapshot?.data['title']);

  }

}
