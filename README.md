This project use MySql 5x  as default database, please install it on your local machine.
<br/>
<br/>
hosts entries:<br/>
127.0.0.1 local.clinike.com.br<br/>
127.0.0.1 local.scheduleapi.clinike.com.br<br/>
127.0.0.1 local.personapi.clinike.com.br<br/>
<br/>
<br/>
Example of command to enable migration on domain projects:<br/>
Enable-Migrations -ContextProjectName IkeCode.Clinike.Person.DataContext -StartUpProjectName IkeCode.Clinike.Person.Api -ContextTypeName IkeCode.Clinike.Person.DataContext.PersonContext -ProjectName IkeCode.Clinike.Person.Migrations
<br/>
<br/>
Example of Add-Migration:<br/>
Add-Migration V100_PersonInitialMigration -ProjectName IkeCode.Clinike.Person.Migrations -StartUpProjectName IkeCode.Clinike.Person.Api
<br/>
<br/>
Example Update-Database:<br/>
Update-Database -ProjectName IkeCode.Clinike.Person.Migrations -StartUpProjectName IkeCode.Clinike.Person.Api