using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FunFactsController : ControllerBase
    {
        private readonly FunFactService _funFactService;
        public FunFactsController(FunFactService funFactService)
        {
            _funFactService = funFactService;
        }
        [HttpGet]
        public IActionResult GetFunFacts()
        {
            var funFacts = _funFactService.GetFunFacts();
            return Ok(funFacts);
        }
    }
}
