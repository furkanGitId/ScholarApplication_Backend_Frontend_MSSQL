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
    public class ContactMessageRepository: IContactMessageRepository
    {
        private readonly AppDbContext _context;
        public ContactMessageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendContactMessageAsync(ContactMessage contactMessage)
        {
            _context.ContactMessages.Add(contactMessage);
            await  _context.SaveChangesAsync();
        }
    }
}
