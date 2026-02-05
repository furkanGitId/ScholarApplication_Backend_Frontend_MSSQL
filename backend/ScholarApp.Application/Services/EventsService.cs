using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class EventsService
    {
        private readonly IEventsRepository _eventsRepository;
        public EventsService(IEventsRepository eventsRepository)
        {
            _eventsRepository = eventsRepository;
        }
        public List<Events> GetEvents()
        {
            return _eventsRepository.GetAllEvents();
        }

        public void AddEvent(Events events)
        {
            _eventsRepository.Add(events);
            _eventsRepository.SaveChanges();
        }

        public void UpdateEvent(Events events)
        {
            var existing = _eventsRepository.GetById(events.Id);
            if (existing != null)
            {
                existing.Image = events.Image;
                existing.Category = events.Category;
                existing.Title = events.Title;
                existing.EventDate = events.EventDate;
                existing.DurationHours = events.DurationHours;
                existing.Price = events.Price;
                _eventsRepository.SaveChanges();
            }
        }

        public void DeleteEvent(Events events)
        {
            var existing = _eventsRepository.GetById(events.Id);
            if (existing != null)
            {
                _eventsRepository.Delete(existing);
                _eventsRepository.SaveChanges();
            }
        }
    }
}
