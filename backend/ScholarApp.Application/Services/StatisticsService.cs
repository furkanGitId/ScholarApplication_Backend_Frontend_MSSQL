using ScholarApp.Application.DTOs;
using ScholarApp.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class StatisticsService
    {
        private readonly IStatisticsRepository _statisticsRepository;
        public StatisticsService(IStatisticsRepository statisticsRepository)
        {
            _statisticsRepository = statisticsRepository;
        }
        public async Task<StatisticsDto> GetStatisticsAsync()
        {
            var statisticsDto = new StatisticsDto
            {
                TotalService = await _statisticsRepository.GetServiceCountAsync(),
                TotalCourse = await _statisticsRepository.GetCourseCountAsync(),
                TotalBanner = await _statisticsRepository.GetBannerCountAsync(),
                TotalTeamMember = await _statisticsRepository.GetTeamMemberCountAsync(),
                TotalEvent = await _statisticsRepository.GetEventCountAsync(),
                TotalUser = await _statisticsRepository.GetUserCountAsync()
            };
            return statisticsDto;
        }
    }
}
