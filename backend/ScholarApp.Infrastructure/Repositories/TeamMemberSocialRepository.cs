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
    public class TeamMemberSocialRepository: ITeamMemberSocialRepository
    {
        private readonly AppDbContext _context;
        public TeamMemberSocialRepository(AppDbContext context)
        {
            _context = context;
        }
        public List<TeamMemberSocial> GetAllTeamMemberSocials()
        {
            return _context.TeamMemberSocials.ToList();
        }
    }
}
