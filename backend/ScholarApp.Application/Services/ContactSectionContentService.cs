using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class ContactSectionContentService
    {
        private readonly IContactSectionContentRepository _contactSectionContentRepository;
        public ContactSectionContentService(IContactSectionContentRepository contactSectionContentRepository)
        {
            _contactSectionContentRepository = contactSectionContentRepository;
        }
        public ContactSectionContent GetContactSectionContents()
        {
            return _contactSectionContentRepository.GetContactSectionContents();
        }
    }
}
