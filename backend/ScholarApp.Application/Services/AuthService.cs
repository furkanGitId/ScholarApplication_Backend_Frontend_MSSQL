using ScholarApp.Application.DTOs;
using ScholarApp.Application.Interfaces;
using ScholarApp.Domain.Entities;

namespace ScholarApp.Application.Services
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<User> GetAllUsers()
        {
            return _userRepository.GetAll();
        }

        //public User? GetUserById(int id)
        //{
        //    return _userRepository.GetById(id);
        //}

        public void AddUser(User user)
        {
            _userRepository.Add(user);
            _userRepository.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            var existingUser = _userRepository.GetById(user.Id);
            if (existingUser != null)
            {
                existingUser.FullName = user.FullName;
                existingUser.Email = user.Email;
                existingUser.Password = user.Password;
                _userRepository.Update(existingUser);
                _userRepository.SaveChanges();
            }
        }

        public string Register(RegisterDto dto)
        {
            if (_userRepository.EmailExists(dto.Email))
                return "Email already exists";

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Password = dto.Password
            };

            _userRepository.Add(user);
            _userRepository.SaveChanges();

            return "Account created successfully";
        }

        public object? Login(LoginDto dto)
        {
            var user = _userRepository.LoginUser(dto.Email,dto.Password);
            if (user == null)
                return null;
            return new
            {
                message = "Login successful",
                fullName = user.FullName,
                email = user.Email
            };
        }
    }
}
