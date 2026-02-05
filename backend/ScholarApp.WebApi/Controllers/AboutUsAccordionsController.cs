using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;
using ScholarApp.Domain.Entities;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutUsAccordionsController : ControllerBase
    {
        private readonly AboutUsAccordionService _aboutUsAccordionService;
        public AboutUsAccordionsController(AboutUsAccordionService aboutUsAccordionService)
        {
            _aboutUsAccordionService = aboutUsAccordionService;
        }
        [HttpGet]
        public IActionResult GetAccordions()
        {
            var accordions = _aboutUsAccordionService.GetAccordions();
            return Ok(accordions);
        }

        [HttpPost]
        public IActionResult AddAboutUsAccordion([FromBody] AboutUsAccordion aboutUsAccordion)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (aboutUsAccordion == null) return BadRequest();
            _aboutUsAccordionService.AddAboutUsAccordion(aboutUsAccordion);
            return Ok(new { message = "AboutUsAccordion Section created successfully" });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var service = _aboutUsAccordionService.GetAccordions().FirstOrDefault(s => s.Id == id);
            if (service == null) return NotFound();
            return Ok(service);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAboutUsAccordion(int id, [FromBody] AboutUsAccordion aboutUsAccordion)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != aboutUsAccordion.Id) return BadRequest("ID mismatch");
            _aboutUsAccordionService.UpdateAboutUsAccordion(aboutUsAccordion);
            return Ok(new { message = "AboutUsAccordion Section updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAboutUsAccordion(int id)
        {
            var aboutUsAccordion = _aboutUsAccordionService.GetAccordions().FirstOrDefault(a => a.Id == id);
            if (aboutUsAccordion == null) return NotFound();
           _aboutUsAccordionService.DeleteAboutUsAccordion(aboutUsAccordion);
            return Ok(new { message = "AboutUsAccordion Section deleted successfully" });
        }
    }
}
