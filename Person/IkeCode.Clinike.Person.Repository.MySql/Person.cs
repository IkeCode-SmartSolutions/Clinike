using IkeCode.Clinike.DataContext;
using IkeCode.Web.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace IkeCode.Clinike.Person.Repository.MySql
{
    internal class Person : IkeCodeModel<Person, ClinikeContext, int>
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
