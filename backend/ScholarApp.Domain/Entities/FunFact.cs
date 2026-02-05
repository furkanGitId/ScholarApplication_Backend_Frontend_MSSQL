using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Domain.Entities
{
    public class FunFact
    {
        [Key]
        public int Id { get; set; }
        public string? Label { get; set; }
        public int Value { get; set; }
        public int Speed { get; set; }
    }
}
