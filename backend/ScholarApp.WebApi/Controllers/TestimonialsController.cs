using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;
using ScholarApp.Domain.Entities;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestimonialsController : ControllerBase
    {
        private readonly TestimonialService _testimonialService;
        public TestimonialsController(TestimonialService testimonialService)
        {
            _testimonialService = testimonialService;
        }
        [HttpGet]
        public IActionResult GetTestimonials()
        {
            var testimonials = _testimonialService.GetTestimonials();
            return Ok(testimonials);
        }

        [HttpPost]
        public IActionResult AddTestimonial([FromBody] Testimonial testimonial)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (testimonial == null) return BadRequest();
            _testimonialService.AddTestimonial(testimonial);
            return Ok(new { message = "Testimonial created successfully" });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var testimonial = _testimonialService.GetTestimonials().FirstOrDefault(t => t.Id == id);
            if (testimonial == null) return NotFound();
            return Ok(testimonial);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTestimonial(int id, [FromBody] Testimonial testimonial)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != testimonial.Id) return BadRequest("ID mismatch");
            _testimonialService.UpdateTestimonial(testimonial);
            return Ok(new { message = "Testimonial updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTestimonial(int id)
        {
            var testimonial = _testimonialService.GetTestimonials().FirstOrDefault(t => t.Id == id);
            if (testimonial == null) return NotFound();
            _testimonialService.DeleteTestimonial(testimonial);
            return Ok(new { message = "Testimonial deleted successfully" });
        }
    }
}
