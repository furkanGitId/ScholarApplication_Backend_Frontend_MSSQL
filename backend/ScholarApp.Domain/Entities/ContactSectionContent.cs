using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Domain.Entities
{
    public class ContactSectionContent
    {
        [Key]
        public int Id { get; set; }
        public string? SmallTitle { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? OfferTitle { get; set; }
        public string? OfferPercentage { get; set; }
        public DateTime ValidityDate { get; set; }
    }
}
