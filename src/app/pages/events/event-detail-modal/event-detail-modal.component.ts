import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Events } from '../../../models/events.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-detail-modal',
  standalone: true,
  providers: [DatePipe],
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './event-detail-modal.component.html',
  styleUrl: './event-detail-modal.component.scss'
})
export class EventDetailModalComponent implements OnInit{
  data = inject(MAT_DIALOG_DATA);
  event!: Events;

  ngOnInit(){
    this.event = this.data;
  }
}
