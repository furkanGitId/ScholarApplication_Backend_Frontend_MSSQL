using System.ComponentModel.DataAnnotations;

namespace ScholarApp.Domain.Entities
{
    public class Banner
    {
        [Key]
        public int Id { get; set; }
        public string? Class { get; set; }
        public string? Category { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PlayText { get; set; }
        public bool? IsActive { get; set; }
    }
}
