using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.DTOs;
using ScholarApp.Application.Services;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactMessagesController : ControllerBase
    {
        private readonly ContactMessageService _contactMessageService;
        public ContactMessagesController(ContactMessageService contactMessageService)
        {
            _contactMessageService = contactMessageService;
        }
        [HttpPost]
        public async Task<IActionResult> SendContactMessage([FromBody] ContactMessageDto contactMessageDto)
        {
            await _contactMessageService.SendContactMessageAsync(contactMessageDto);
            return Ok(new { Message = "Contact message sent successfully." });
        }
    }
}
