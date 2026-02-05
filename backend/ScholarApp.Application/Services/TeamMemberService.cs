using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class TeamMemberService
    {
        private readonly ITeamMemberRepository _teamMemberRepository;
        public TeamMemberService(ITeamMemberRepository teamMemberRepository)
        {
            _teamMemberRepository = teamMemberRepository;
        }
        public List<TeamMember> GetTeamMembers()
        {
            return _teamMemberRepository.GetAllTeamMembers();
        }

        public void AddTeamMember(TeamMember teamMember)
        {
            _teamMemberRepository.Add(teamMember);
            _teamMemberRepository.SaveChanges();
        }

        public void UpdateTeamMember(TeamMember teamMember)
        {
            var existing = _teamMemberRepository.GetById(teamMember.Id);
            if (existing != null)
            {
                existing.Name = teamMember.Name;
                existing.Role = teamMember.Role;
                existing.Image = teamMember.Image;
                existing.Social?.Clear();
                if (teamMember.Social != null)
                {
                    existing.Social = teamMember.Social;
                }

                _teamMemberRepository.SaveChanges();
            }
        }

        public void DeleteTeamMember(TeamMember teamMember)
        {
            var existing = _teamMemberRepository.GetById(teamMember.Id);
            if (existing != null)
            {
                _teamMemberRepository.Delete(existing);
                _teamMemberRepository.SaveChanges();
            }
        }
    }
}
