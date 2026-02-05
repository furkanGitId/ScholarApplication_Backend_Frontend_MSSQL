using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactSectionContentsController : ControllerBase
    {
        private readonly ContactSectionContentService _contactSectionContentService;
        public ContactSectionContentsController(ContactSectionContentService contactSectionContentService)
        {
            _contactSectionContentService = contactSectionContentService;
        }
        [HttpGet]
        public IActionResult GetContactSectionContents()
        {
            var contents = _contactSectionContentService.GetContactSectionContents();
            return Ok(contents);
        }
    }
}
