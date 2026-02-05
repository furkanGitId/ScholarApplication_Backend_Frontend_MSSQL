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
    public class FunFactRepository : IFunFactRepository
    {
        private readonly AppDbContext _context;
        public FunFactRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<FunFact> GetAllFunFacts()
        {
            return _context.FunFacts.ToList();
        }
    }
}
