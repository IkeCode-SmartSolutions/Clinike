namespace IkeCode.Core.IoC.Installers
{
    using Castle.MicroKernel.Registration;
    using Castle.MicroKernel.SubSystems.Configuration;
    using Castle.Windsor;

    public class IkeCodeWindsorDefaultInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Classes.FromThisAssembly()
                                            .Pick()
                                            .WithServiceDefaultInterfaces()
                                            .Configure(c => c.LifestyleTransient()));
        }
    }
}
