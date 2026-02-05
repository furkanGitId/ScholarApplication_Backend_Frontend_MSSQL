using Microsoft.EntityFrameworkCore;
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
    public class TeamMemberRepository : ITeamMemberRepository
    {
        private readonly AppDbContext _context;
        public TeamMemberRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<TeamMember> GetAllTeamMembers()
        {
            return _context.TeamMembers.Include(t => t.Social).ToList();
        }

        public TeamMember? GetById(int id)
        {
            return _context.TeamMembers.Find(id);
        }

        public void Add(TeamMember teamMember)
        {
            _context.TeamMembers.Add(teamMember);
        }

        public void Update(TeamMember teamMember)
        {
            _context.TeamMembers.Update(teamMember);
        }

        public void Delete(TeamMember teamMember)
        {
            _context.TeamMembers.Remove(teamMember);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
