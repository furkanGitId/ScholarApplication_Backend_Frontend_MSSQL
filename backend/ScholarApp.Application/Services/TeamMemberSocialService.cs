using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class TeamMemberSocialService
    {
        private readonly ITeamMemberSocialRepository _teamMemberSocialRepository;
        public TeamMemberSocialService(ITeamMemberSocialRepository teamMemberSocialRepository)
        {
            _teamMemberSocialRepository = teamMemberSocialRepository;
        }
        public List<TeamMemberSocial> GetTeamMemberSocials()
        {
            return _teamMemberSocialRepository.GetAllTeamMemberSocials();
        }
    }
}
