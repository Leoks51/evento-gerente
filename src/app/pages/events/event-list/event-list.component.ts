import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EventDetailModalComponent } from '../event-detail-modal/event-detail-modal.component';
import { Events } from '../../../models/events.model';
import { EventService } from '../../services/event.service';
import { CreateEventsComponent } from '../create-events/create-events.component';
import { EditEventsComponent } from '../edit-events/edit-events.component';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [DatePipe],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  dialog = inject(MatDialog);
  viewMode: 'cards' | 'table' = 'cards'; 
  searchTerm: string = ''; 
  event: Events[] = [];
  filteredEvents: Events[] = [];
  
  displayedColumns: string[] = ['title', 'description', 'status']; 


  constructor( private eventService: EventService){
  }

  ngOnInit(): void {
      this.getAllEvents();  
      
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredEvents = this.event;
      return;
    }
  
    this.filteredEvents = this.event.filter(
      e => e?.title.toLowerCase().includes(text.toLowerCase())
    );
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe((result) => {
        this.event = result;
        this.filteredEvents = result;  
    })
  }

  addEvent(){
      const dialogRef = this.dialog.open(CreateEventsComponent, {
        width: '400px',
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.eventService.createEvent(result).subscribe(() => {
            this.getAllEvents();
          });
        }
      });
  }

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.getAllEvents();
    });
  }

  toggleView(mode: 'cards' | 'table') {
    this.viewMode = mode;
  }

  editEvent(event: Events) {
    const dialogRef = this.dialog.open(EditEventsComponent, {
      width: '400px',
      data: event,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.updateEvent(result).subscribe(() => {
          this.getAllEvents(); 
        });
      }
    });
  }

  applyFilter() {
    this.filteredEvents = this.event.filter(event =>
      event.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

  visualizeEvent(event: Events) {
      this.dialog.open(EventDetailModalComponent, {
        data: event
      });
    console.log('Editar evento:', event);
  }
  
}
