using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Interfaces
{
    public interface IEventsRepository
    {
        List<Events> GetAllEvents();

        Events? GetById(int id);
        void Add(Events events);
        void Update(Events events);
        void Delete(Events events);
        void SaveChanges();
    }
}
