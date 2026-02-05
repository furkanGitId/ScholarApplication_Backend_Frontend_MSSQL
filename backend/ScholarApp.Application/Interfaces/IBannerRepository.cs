using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Interfaces
{
    public interface IBannerRepository
    {
        List<Banner> GetAllBanners();
        Banner? GetById(int id);
        void Add(Banner banner);
        void Update(Banner banner);
        void SaveChanges();
    }
}
