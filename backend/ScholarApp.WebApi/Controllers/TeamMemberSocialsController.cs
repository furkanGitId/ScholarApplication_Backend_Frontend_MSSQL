using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMemberSocialsController : ControllerBase
    {
        private readonly TeamMemberSocialService _teamMemberSocialService;
        public TeamMemberSocialsController(TeamMemberSocialService teamMemberSocialService)
        {
            _teamMemberSocialService = teamMemberSocialService;
        }
        [HttpGet]
        public IActionResult GetTeamMemberSocials()
        {
            var teamMemberSocials = _teamMemberSocialService.GetTeamMemberSocials();
            return Ok(teamMemberSocials);
        }
    }
}
