using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;

namespace ScholarApp.Application.Services
{
    public class ServiceService
    {
        private readonly IServiceRepository _serviceRepository;
        public ServiceService(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }
        public List<Service> GetServices()
        {
            return _serviceRepository.GetAllServices();
        }

        public void AddService(Service service)
        {
            _serviceRepository.Add(service);
            _serviceRepository.SaveChanges();
        }

        public void UpdateService(Service service)
        {
            var existing = _serviceRepository.GetById(service.Id);
            if (existing != null)
            {
                existing.Title = service.Title;
                existing.Description = service.Description;
                existing.Icon = service.Icon;
                existing.Link = service.Link;
                _serviceRepository.SaveChanges();
            }
        }

        public void DeleteService(Service service)
        {
            var existing = _serviceRepository.GetById(service.Id);
            if (existing != null)
            {
                _serviceRepository.Delete(existing);
                _serviceRepository.SaveChanges();
            }
        }

    }
}
