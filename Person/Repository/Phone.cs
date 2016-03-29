namespace IkeCode.Clinike.Person.Repository
{
    using IkeCode.Clinike.Person.Domain.Entities;
    using Domain.Enums;
    using IkeCode.Data.Core.Model;

    public class Phone : IkeCodeModel<int>, IPhone
    {
        public Phone()
        {
        }

        public bool AcceptSMS { get; set; }

        public string Contact { get; set; }

        public string Number { get; set; }

        public PhoneType PhoneType { get; set; }

        public int PersonId { get; set; }

        public virtual Person Person { get; set; }

        IPerson IPhone.Person { get { return Person; } }
    }
}
