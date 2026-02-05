using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using ScholarApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Infrastructure.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        private readonly AppDbContext _context;
        public EventsRepository(AppDbContext context)
        {
            _context = context;
        }
        public List<Events> GetAllEvents()
        {
            return _context.Events.ToList();
        }

        public Events? GetById(int id)
        {
            return _context.Events.Find(id);
        }

        public void Add(Events events)
        {
            _context.Events.Add(events);
        }

        public void Update(Events events)
        {
            _context.Events.Update(events);
        }

        public void Delete(Events events)
        {
            _context.Events.Remove(events);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
