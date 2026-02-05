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
    public class ContactSectionContentRepository: IContactSectionContentRepository
    {
        private readonly AppDbContext _context;
        public ContactSectionContentRepository(AppDbContext context)
        {
            _context = context;
        }
        public ContactSectionContent GetContactSectionContents()
        {
            return _context.ContactSectionContents.FirstOrDefault();
        }
    }
}
