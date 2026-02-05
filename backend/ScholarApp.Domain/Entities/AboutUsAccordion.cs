using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Domain.Entities
{
    public class AboutUsAccordion
    {
        [Key]
        public int Id { get; set; }
        public string? AccordionKey { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
    }
}
