import { Component, OnInit } from '@angular/core';
import { EventItem, EventsService } from '../../services/events';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [FormsModule,CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class EventsComponent implements OnInit {
  events: EventItem[] = [];

  showModal = false;
  isEditMode = false;
  selectedEvent: EventItem = this.emptyEvent();

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe({
      next: data => (this.events = data),
      error: err => console.error(err),
    });
  }

  emptyEvent(): EventItem {
    return {
      id: 0,
      image: '',
      category: '',
      title: '',
      eventDate: '',
      durationHours: 0,
      price: 0,
    };
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedEvent = this.emptyEvent();
    this.showModal = true;
  }

  // openEditModal(event: EventItem) {
  //   this.isEditMode = true;
  //   this.selectedEvent = { ...event };
  //   this.showModal = true;
  // }

  openEditModal(event: EventItem) {
    console.log('RAW eventDate:', event.eventDate, typeof event.eventDate);

    this.isEditMode = true;

    this.selectedEvent = {
      ...event,
      eventDate: event.eventDate
        ? event.eventDate.split('T')[0]
        : ''
    };

    // IMPORTANT: open modal in next tick
    setTimeout(() => {
      this.showModal = true;
    });
  }


  closeModal() {
    this.showModal = false;
  }

  saveEvent() {
    if (this.isEditMode) {
      this.eventsService
        .updateEvent(this.selectedEvent.id, this.selectedEvent)
        .subscribe(() => {
          this.loadEvents();
          this.closeModal();
        });
    } else {
      this.eventsService.addEvent(this.selectedEvent).subscribe(() => {
        this.loadEvents();
        this.closeModal();
      });
    }
  }

  deleteEvent(id: number) {
    if (!confirm('Delete this event?')) return;

    this.eventsService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter(e => e.id !== id);
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedEvent.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
