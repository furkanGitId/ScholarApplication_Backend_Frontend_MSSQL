using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;
using ScholarApp.Domain.Entities;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannersController : ControllerBase
    {
        private readonly BannerService _bannerService;
        public BannersController(BannerService bannerService)
        {
            _bannerService = bannerService;
        }
        [HttpGet]
        public IActionResult GetBanners()
        {
            var banners = _bannerService.GetBanners();
            return Ok(banners);
        }

        [HttpPost]
        public IActionResult AddBanner([FromBody] Banner banner)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (banner == null) return BadRequest();

            _bannerService.AddBanner(banner);
            return Ok(new { message = "Banner created successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBanner(int id, [FromBody] Banner banner)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != banner.Id) return BadRequest("ID mismatch");

            _bannerService.UpdateBanner(banner);
            return Ok(new { message = "Banner updated successfully" });
        }


    }
}
