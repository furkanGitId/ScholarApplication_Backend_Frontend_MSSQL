using Microsoft.EntityFrameworkCore;
using ScholarApp.Domain.Entities;

namespace ScholarApp.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<AboutUsAccordion> AboutUsAccordions { get; set; }
        public DbSet<FunFact> FunFacts { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<TeamMemberSocial> TeamMemberSocials { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<ContactSectionContent> ContactSectionContents { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
    }
}
