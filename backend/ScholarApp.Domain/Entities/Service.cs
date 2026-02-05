using System.ComponentModel.DataAnnotations;

namespace ScholarApp.Domain.Entities
{
    public class Service
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public string? Link { get; set; }
    }
}
