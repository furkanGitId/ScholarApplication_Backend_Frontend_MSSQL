using ScholarApp.Application.DTOs;
using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class ContactMessageService
    {
        private readonly IContactMessageRepository _contactMessageRepository;
        public ContactMessageService(IContactMessageRepository contactMessageRepository)
        {
            _contactMessageRepository = contactMessageRepository;
        }

        public async Task SendContactMessageAsync(ContactMessageDto contactMessageDto)
        {
            var contactMessage = new ContactMessage
            {
                Name = contactMessageDto.Name,
                Email = contactMessageDto.Email,
                Message = contactMessageDto.Message,
                CreatedAt = DateTime.UtcNow
            };
            await _contactMessageRepository.SendContactMessageAsync(contactMessage);
        }
    }
}
