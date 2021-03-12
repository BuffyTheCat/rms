import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rms-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent implements OnInit {
  @Input() title: string = 'Remove';
  @Input() question: string = 'Do you want to delite this?';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.question = data.question;
  }

  ngOnInit(): void {

  }
}
