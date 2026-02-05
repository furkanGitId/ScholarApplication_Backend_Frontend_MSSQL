using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly StatisticsService _statisticsService;
        public StatisticsController(StatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }
        [HttpGet("GetStatistics")]
        public async Task<IActionResult> GetStatistics()
        {
            var statistics = await _statisticsService.GetStatisticsAsync();
            return Ok(statistics);
        }
    }
}
