namespace IkeCode.Clinike.Person.Api.ServiceInstallers
{
    using Castle.MicroKernel.Registration;
    using Castle.MicroKernel.SubSystems.Configuration;
    using Castle.Windsor;
    using DataContext;
    using Domain.Repository;
    using Repository;
    using System.Data.Entity;

    public class PersonDomainInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component.For<DbContext>().ImplementedBy<PersonContext>().LifestylePerWebRequest());
            container.Register(Component.For<IPersonRepository>().ImplementedBy<PersonRepository>().LifestylePerWebRequest());
            container.Register(Component.For<IPhoneRepository>().ImplementedBy<PhoneRepository>().LifestylePerWebRequest());
            container.Register(Component.For<IAddressRepository>().ImplementedBy<AddressRepository>().LifestylePerWebRequest());
        }
    }
}
