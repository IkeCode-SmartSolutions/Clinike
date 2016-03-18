namespace IkeCode.Clinike.Person.Repository
{
    using IkeCode.Clinike.Person.Domain.Entities;
    using IkeCode.Data.Core.Model;

    public class Person : IkeCodeModel<int>, IPerson
    {
        public Person()
        {
        }

        public string Name { get; set; }

        public string Email { get; set; }
    }
}
