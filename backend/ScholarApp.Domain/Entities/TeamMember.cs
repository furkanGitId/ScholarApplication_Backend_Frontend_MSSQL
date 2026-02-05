using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScholarApp.Domain.Entities
{
    public class TeamMember
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }
        public string? Image { get; set; }

        public List<TeamMemberSocial>? Social { get; set; }
    }
}
