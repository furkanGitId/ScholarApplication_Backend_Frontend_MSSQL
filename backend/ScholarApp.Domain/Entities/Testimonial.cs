using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Domain.Entities
{
    public class Testimonial
    {
        [Key]
        public int Id { get; set; }
        public string? Message { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }
        public string? Image { get; set; }
    }
}
