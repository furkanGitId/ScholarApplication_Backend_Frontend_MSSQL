using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class TestimonialService
    {
        private readonly ITestimonialRepository _testimonialRepository;
        public TestimonialService(ITestimonialRepository testimonialRepository)
        {
            _testimonialRepository = testimonialRepository;
        }
        public List<Testimonial> GetTestimonials()
        {
            return _testimonialRepository.GetAllTestimonials();
        }

        public void AddTestimonial(Testimonial testimonial)
        {
            _testimonialRepository.Add(testimonial);
            _testimonialRepository.SaveChanges();
        }

        public void UpdateTestimonial(Testimonial testimonial)
        {
            var existing = _testimonialRepository.GetById(testimonial.Id);
            if (existing != null)
            {
                existing.Message = testimonial.Message;
                existing.Name = testimonial.Name;
                existing.Role = testimonial.Role;
                existing.Image = testimonial.Image;
                _testimonialRepository.SaveChanges();
            }
        }

        public void DeleteTestimonial(Testimonial testimonial)
        {
            var existing = _testimonialRepository.GetById(testimonial.Id);
            if (existing != null)
            {
                _testimonialRepository.Delete(existing);
                _testimonialRepository.SaveChanges();
            }
        }
    }
}
