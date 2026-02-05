using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Interfaces
{
    public interface ITeamMemberRepository
    {
        List<TeamMember> GetAllTeamMembers();
        TeamMember? GetById(int id);
        void Add(TeamMember teamMember);
        void Update(TeamMember teamMember);
        void Delete(TeamMember teamMember);
        void SaveChanges();
    }
}
