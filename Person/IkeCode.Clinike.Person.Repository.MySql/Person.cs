using IkeCode.Web.Core.Model;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;

namespace IkeCode.Clinike.Person.Repository.MySql
{
    internal class Person : IkeCodeModel<Person, int>
    {
        public Person(DbContext context)
            : base(context)
        {

        }

        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
