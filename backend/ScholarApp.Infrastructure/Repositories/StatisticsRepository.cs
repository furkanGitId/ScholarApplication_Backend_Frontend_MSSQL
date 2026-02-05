using Microsoft.EntityFrameworkCore;
using ScholarApp.Application.Interfaces;
using ScholarApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Infrastructure.Repositories
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly AppDbContext _context;
        public StatisticsRepository(AppDbContext context)
        {
            _context = context;
        }

        public Task<int> GetServiceCountAsync() => _context.Services.CountAsync();
        public Task<int> GetCourseCountAsync() => _context.Courses.CountAsync();
        public Task<int> GetBannerCountAsync() => _context.Banners.CountAsync();
        public Task<int> GetTeamMemberCountAsync() => _context.TeamMembers.CountAsync();
        public Task<int> GetEventCountAsync() => _context.Events.CountAsync();
        public Task<int> GetUserCountAsync() => _context.Users.CountAsync();
    }
}
