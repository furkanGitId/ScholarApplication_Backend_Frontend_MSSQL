using ScholarApp.Domain.Entities;

namespace ScholarApp.Application.Interfaces
{
    public interface IServiceRepository
    {
        List<Service> GetAllServices();
        Service? GetById(int id);
        void Add(Service service);
        void Update(Service service);
        void Delete(Service service);
        void SaveChanges();
    }
}
