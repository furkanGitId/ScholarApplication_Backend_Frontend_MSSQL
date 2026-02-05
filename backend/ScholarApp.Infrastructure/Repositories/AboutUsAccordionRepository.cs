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
    public class AboutUsAccordionRepository : IAboutUsAccordionRepository
    {
        private readonly AppDbContext _context;
        public AboutUsAccordionRepository(AppDbContext context)
        {
            _context = context;
        }
        public List<AboutUsAccordion> GetAllAccordions()
        {
            return _context.AboutUsAccordions.ToList();
        }

        public AboutUsAccordion? GetById(int id)
        {
            return _context.AboutUsAccordions.Find(id);
        }

        public void Add(AboutUsAccordion aboutUsAccordion)
        {
            _context.AboutUsAccordions.Add(aboutUsAccordion);
        }

        public void Update(AboutUsAccordion aboutUsAccordion)
        {
            _context.AboutUsAccordions.Update(aboutUsAccordion);
        }

        public void Delete(AboutUsAccordion aboutUsAccordion)
        {
            _context.AboutUsAccordions.Remove(aboutUsAccordion);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
