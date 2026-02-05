import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../services/events';

@Component({
  selector: 'app-events-section',
  imports: [CommonModule],
  templateUrl: './events-section.html',
  styleUrl: './events-section.css',
})
export class EventsSectionComponent implements OnInit {
  events: any[] = [];
  constructor(private eventsService: EventsService) { }

  // ngOnInit(): void {
  //   this.eventsService.getEvents().subscribe(data => {
  //     this.events = data.map(event => ({
  //       ...event,
  //       eventDate: event.eventDate
  //         ? event.eventDate.split('T')[0]
  //         : ''
  //     }));
  //   });
  // }
  ngOnInit(): void {
    this.eventsService.getEvents().subscribe(data => {
      this.events = data.map(event => {
        if (!event.eventDate) return { ...event, eventDate: '' };

        const dateParts = event.eventDate.split('T')[0].split('-'); // ["2036", "02", "17"]
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // "17-02-2036"

        return {
          ...event,
          eventDate: formattedDate
        };
      });
    });
  }

}
