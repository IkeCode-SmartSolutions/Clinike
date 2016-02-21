namespace IkeCode.Clinike.Person.Domain.Repository
{
    public interface IPersonRepository
    {
        int Save(int id, string email, string name);
    }
}
