using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ScholarApp.Domain.Entities
{
    public class TeamMemberSocial
    {
        [Key]
        public int Id { get; set; }
        public string? Platform { get; set; }
        public string? Url { get; set; }
        public string? IconClass { get; set; }

        public int TeamMemberId { get; set; }

        [JsonIgnore]
        public TeamMember? TeamMember { get; set; }
    }
}
