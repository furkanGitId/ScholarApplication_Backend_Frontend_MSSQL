using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using ScholarApp.Infrastructure.Data;

namespace ScholarApp.Infrastructure.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly AppDbContext _context;
        public ServiceRepository(AppDbContext context)
        {
            _context = context;
        }
        public List<Service> GetAllServices()
        {
            return _context.Services.ToList();
        }

        public Service? GetById(int id)
        {
            return _context.Services.Find(id);
        }

        public void Add(Service service)
        {
            _context.Services.Add(service);
        }

        public void Update(Service service)
        {
            _context.Services.Update(service);
        }

        public void Delete(Service service)
        {
            _context.Services.Remove(service);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

    }
}
