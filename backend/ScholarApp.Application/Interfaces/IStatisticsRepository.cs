using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Interfaces
{
    public interface IStatisticsRepository
    {
        Task<int> GetServiceCountAsync();
        Task<int> GetCourseCountAsync();
        Task<int> GetBannerCountAsync();
        Task<int> GetTeamMemberCountAsync();
        Task<int> GetEventCountAsync();
        Task<int> GetUserCountAsync();
    }
}
