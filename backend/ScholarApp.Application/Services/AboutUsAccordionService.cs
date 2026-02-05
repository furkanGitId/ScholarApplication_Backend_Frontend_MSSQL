using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class AboutUsAccordionService
    {
        private readonly IAboutUsAccordionRepository _aboutUsAccordionRepository;
        public AboutUsAccordionService(IAboutUsAccordionRepository aboutUsAccordionRepository)
        {
            _aboutUsAccordionRepository = aboutUsAccordionRepository;
        }
        public List<AboutUsAccordion> GetAccordions()
        {
            return _aboutUsAccordionRepository.GetAllAccordions();
        }

        public void AddAboutUsAccordion(AboutUsAccordion aboutUsAccordion)
        {
            _aboutUsAccordionRepository.Add(aboutUsAccordion);
            _aboutUsAccordionRepository.SaveChanges();
        }

        public void UpdateAboutUsAccordion(AboutUsAccordion aboutUsAccordion)
        {
            var existing = _aboutUsAccordionRepository.GetById(aboutUsAccordion.Id);
            if (existing != null)
            {
                existing.AccordionKey = aboutUsAccordion.AccordionKey;
                existing.Title = aboutUsAccordion.Title;
                existing.Content = aboutUsAccordion.Content;
                _aboutUsAccordionRepository.SaveChanges();
            }
        }

        public void DeleteAboutUsAccordion(AboutUsAccordion aboutUsAccordion)
        {
            var existing = _aboutUsAccordionRepository.GetById(aboutUsAccordion.Id);
            if (existing != null)
            {
                _aboutUsAccordionRepository.Delete(existing);
                _aboutUsAccordionRepository.SaveChanges();
            }
        }
    }
}
