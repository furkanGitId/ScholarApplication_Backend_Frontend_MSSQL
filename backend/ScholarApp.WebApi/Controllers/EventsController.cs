using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;
using ScholarApp.Domain.Entities;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventsService _eventsService;
        public EventsController(EventsService eventsService)
        {
            _eventsService = eventsService;
        }
        [HttpGet]
        public IActionResult GetEvents()
        {
            var events = _eventsService.GetEvents();
            return Ok(events);
        }

        [HttpPost]
        public IActionResult AddEvent([FromBody] Events events)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (events == null) return BadRequest();
            _eventsService.AddEvent(events);
            return Ok(new { message = "Event created successfully" });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var events = _eventsService.GetEvents().FirstOrDefault(e => e.Id == id);
            if (events == null) return NotFound();
            return Ok(events);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEvent(int id, [FromBody] Events events)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != events.Id) return BadRequest("ID mismatch");
            _eventsService.UpdateEvent(events);
            return Ok(new { message = "Event updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var events = _eventsService.GetEvents().FirstOrDefault(e => e.Id == id);
            if (events == null) return NotFound();
            _eventsService.DeleteEvent(events);
            return Ok(new { message = "Event deleted successfully" });
        }
    }
}
