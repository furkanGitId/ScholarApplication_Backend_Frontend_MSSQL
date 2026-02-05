using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class BannerService
    {
        private readonly IBannerRepository _bannerRepository;

        public BannerService(IBannerRepository bannerRepository)
        {
            _bannerRepository = bannerRepository;
        }

        public List<Banner> GetBanners()
        {
            return _bannerRepository.GetAllBanners();
        }

        public void AddBanner(Banner banner)
        {
            _bannerRepository.Add(banner);
            _bannerRepository.SaveChanges();
        }

        public void UpdateBanner(Banner banner)
        {
            var existing = _bannerRepository.GetById(banner.Id);
            if (existing != null)
            {
                existing.Class = banner.Class;
                existing.Category = banner.Category;
                existing.Title = banner.Title;
                existing.Description = banner.Description;
                existing.PlayText = banner.PlayText;
                existing.IsActive = banner.IsActive;

                _bannerRepository.SaveChanges();
            }
        }
    }
}
