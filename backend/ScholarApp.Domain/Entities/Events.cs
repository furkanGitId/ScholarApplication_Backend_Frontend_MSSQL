using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Domain.Entities
{
    public class Events
    {
        [Key]
        public int Id { get; set; }
        public string? Image { get; set; }
        public string? Category { get; set; }
        public string? Title { get; set; }
        public DateTime EventDate { get; set; }
        public int DurationHours { get; set; }
        public decimal Price { get; set; }
    }
}
