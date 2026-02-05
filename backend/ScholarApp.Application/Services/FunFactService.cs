using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Application.Services
{
    public class FunFactService
    {
        private readonly IFunFactRepository _funFactRepository;
        public FunFactService(IFunFactRepository funFactRepository)
        {
            _funFactRepository = funFactRepository;
        }
        public List<FunFact> GetFunFacts()
        {
            return _funFactRepository.GetAllFunFacts();
        }
    }
}
