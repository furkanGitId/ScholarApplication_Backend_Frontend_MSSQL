using ScholarApp.Domain.Entities;

namespace ScholarApp.Application.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetAll();

        User? GetById(int id);
        bool EmailExists(string email);
        void Add(User user);
        void Update(User user);
        void SaveChanges();
        User? LoginUser(string email, string password);
    }
}
