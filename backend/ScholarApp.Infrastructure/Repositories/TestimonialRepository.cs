using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using ScholarApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Infrastructure.Repositories
{
    public class TestimonialRepository : ITestimonialRepository
    {
        private readonly AppDbContext _context;
        public TestimonialRepository(AppDbContext context)
        {
            _context = context;
        }
        public List<Testimonial> GetAllTestimonials()
        {
            return _context.Testimonials.ToList();
        }

        public Testimonial? GetById(int id)
        {
            return _context.Testimonials.Find(id);
        }

        public void Add(Testimonial testimonial)
        {
            _context.Testimonials.Add(testimonial);
        }

        public void Update(Testimonial testimonial)
        {
            _context.Testimonials.Update(testimonial);
        }

        public void Delete(Testimonial testimonial)
        {
            _context.Testimonials.Remove(testimonial);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
