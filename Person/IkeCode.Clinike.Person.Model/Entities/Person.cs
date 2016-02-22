using IkeCode.Data.Core.Model;

namespace IkeCode.Clinike.Person.Domain.Entities
{
    public class Person : IkeCodeModel<int>
    {
        public Person()
        {
        }

        public string Name { get; set; }

        public string Email { get; set; }
    }
}
