using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;
using ScholarApp.Domain.Entities;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMembersController : ControllerBase
    {
        private readonly TeamMemberService _teamMemberService;
        public TeamMembersController(TeamMemberService teamMemberService)
        {
            _teamMemberService = teamMemberService;
        }
        [HttpGet]
        public IActionResult GetTeamMembers()
        {
            var teamMembers = _teamMemberService.GetTeamMembers();
            return Ok(teamMembers);
        }

        [HttpPost]
        public IActionResult AddTeamMember([FromBody] TeamMember teamMember)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (teamMember == null) return BadRequest();
            _teamMemberService.AddTeamMember(teamMember);
            return Ok(new { message = "Team member created successfully" });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var teamMember = _teamMemberService.GetTeamMembers().FirstOrDefault(tm => tm.Id == id);
            if (teamMember == null) return NotFound();
            return Ok(teamMember);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTeamMember(int id, [FromBody] TeamMember teamMember)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != teamMember.Id) return BadRequest("ID mismatch");
            _teamMemberService.UpdateTeamMember(teamMember);
            return Ok(new { message = "Team member updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTeamMember(int id)
        {
            var teamMember = _teamMemberService.GetTeamMembers().FirstOrDefault(tm => tm.Id == id);
            if (teamMember == null) return NotFound();
            _teamMemberService.DeleteTeamMember(teamMember);
            return Ok(new { message = "Team member deleted successfully" });
        }
    }
}
