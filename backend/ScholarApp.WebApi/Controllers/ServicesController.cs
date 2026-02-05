using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;
using ScholarApp.Domain.Entities;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly ServiceService _serviceService;
        public ServicesController(ServiceService serviceService)
        {
            _serviceService = serviceService;
        }
        [HttpGet]
        public IActionResult GetServices()
        {
            var services = _serviceService.GetServices();
            return Ok(services);
        }

        [HttpPost]
        public IActionResult AddService([FromBody] Service service)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (service == null) return BadRequest();
            _serviceService.AddService(service);
            return Ok(new { message = "Service created successfully" });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var service = _serviceService.GetServices().FirstOrDefault(s => s.Id == id);
            if (service == null) return NotFound();
            return Ok(service);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateService(int id, [FromBody] Service service)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != service.Id) return BadRequest("ID mismatch");
            _serviceService.UpdateService(service);
            return Ok(new { message = "Service updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteService(int id) {
            var service = _serviceService.GetServices().FirstOrDefault(s => s.Id == id);
            if (service == null) return NotFound();
            _serviceService.DeleteService(service);
            return Ok(new { message = "Service deleted successfully" });
        }
    }
}
