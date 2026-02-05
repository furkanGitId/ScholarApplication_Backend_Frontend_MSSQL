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
    public class BannerRepository: IBannerRepository
    {
        private readonly AppDbContext _context;
        public BannerRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Banner> GetAllBanners()
        {
            return _context.Banners.ToList();
        }

        public Banner GetById(int id)
        {
            return _context.Banners.Find(id);
        }

        public void Add(Banner banner)
        {
            _context.Banners.Add(banner);
        }

        public void Update(Banner banner)
        {
            _context.Banners.Update(banner);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
