using IkeCode.Clinike.DataContext;
using IkeCode.Web.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace IkeCode.Clinike.Person.Repository.MySql
{
    internal class Person : IkeCodeModel<Person, ClinikeContext, int>
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
