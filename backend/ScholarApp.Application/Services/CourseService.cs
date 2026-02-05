using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class CourseService 
    {
        private readonly ICourseRepository _courseRepository;
        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public List<Course> GetCourses()
        {
            return _courseRepository.GetAllCourses();
        }

        public void AddCourse(Course course)
        {
            _courseRepository.Add(course);
            _courseRepository.SaveChanges();
        }

        public void UpdateCourse(Course course)
        {
            var existing = _courseRepository.GetById(course.Id);
            if (existing != null)
            {
                existing.Image = course.Image;
                existing.Category = course.Category;
                existing.CategoryClass = course.CategoryClass;
                existing.Title = course.Title;
                existing.Author = course.Author;
                existing.Price = course.Price;
                _courseRepository.SaveChanges();
            }
        }

        public void DeleteCourse(Course course)
        {
            var existing = _courseRepository.GetById(course.Id);
            if (existing != null)
            {
                _courseRepository.Delete(existing);
                _courseRepository.SaveChanges();
            }
        }
    }
}
