using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Interfaces
{
    public interface ICourseRepository
    {
        List<Course> GetAllCourses();
        Course? GetById(int id);
        void Add(Course course);
        void Update(Course course);
        void Delete(Course course);
        void SaveChanges();
    }
}
