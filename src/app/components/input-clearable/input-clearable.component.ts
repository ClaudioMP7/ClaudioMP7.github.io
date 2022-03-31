import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-clearable',
  templateUrl: './input-clearable.component.html',
  styleUrls: ['./input-clearable.component.css']
})
export class InputClearableComponent implements OnInit {

  value = '';
  constructor() { }

  ngOnInit(): void {
  }

}
