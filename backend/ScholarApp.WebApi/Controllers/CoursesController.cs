using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScholarApp.Application.Services;
using ScholarApp.Domain.Entities;

namespace ScholarApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly CourseService _courseService;
        public CoursesController(CourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public IActionResult GetCourses()
        {
            var courses = _courseService.GetCourses();
            return Ok(courses);
        }

        [HttpPost]
        public IActionResult AddCourse([FromBody] Course course)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (course == null) return BadRequest();
            _courseService.AddCourse(course);
            return Ok(new { message = "Course created successfully" });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var course = _courseService.GetCourses().FirstOrDefault(c => c.Id == id);
            if (course == null) return NotFound();
            return Ok(course);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCourse(int id, [FromBody] Course course)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != course.Id) return BadRequest("ID mismatch");
            _courseService.UpdateCourse(course);
            return Ok(new { message = "Course updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(int id)
        {
            var course = _courseService.GetCourses().FirstOrDefault(c => c.Id == id);
            if (course == null) return NotFound();
            _courseService.DeleteCourse(course);
            return Ok(new { message = "Course deleted successfully" });
        }
    }
}
