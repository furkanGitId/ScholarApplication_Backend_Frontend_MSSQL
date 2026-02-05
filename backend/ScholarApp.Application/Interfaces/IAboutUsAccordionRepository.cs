using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Interfaces
{
    public interface IAboutUsAccordionRepository
    {
        List<AboutUsAccordion> GetAllAccordions();

        AboutUsAccordion? GetById(int id);
        void Add(AboutUsAccordion aboutUsAccordion);
        void Update(AboutUsAccordion aboutUsAccordion);
        void Delete(AboutUsAccordion aboutUsAccordion);
        void SaveChanges();
    }
}
