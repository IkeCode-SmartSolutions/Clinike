This project use MySql 5x  as default database, please install it on your local machine.

hosts entries:
127.0.0.1 local.clinike.com.br
127.0.0.1 local.scheduleapi.clinike.com.br
127.0.0.1 local.personapi.clinike.com.br

Example of command to enable migration on domain projects:
Enable-Migrations -ContextProjectName IkeCode.Clinike.DataContext -StartUpProjectName IkeCode.Clinike.Person.Api -ContextTypeName IkeCode.Clinike.DataContext.ClinikeContext -ProjectName IkeCode.Clinike.Person.Migrations