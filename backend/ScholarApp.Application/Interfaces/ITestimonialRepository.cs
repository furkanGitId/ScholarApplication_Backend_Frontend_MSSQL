using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Interfaces
{
    public interface ITestimonialRepository
    {
        List<Testimonial> GetAllTestimonials();
        Testimonial? GetById(int id);
        void Add(Testimonial testimonial);
        void Update(Testimonial testimonial);
        void Delete(Testimonial testimonial);
        void SaveChanges();
    }
}
