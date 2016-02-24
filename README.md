This project use MySql 5x  as default database, please install it on your local machine.

<br/>
<br/>

<b>Libraries</b>
<br/>
Castle Windsor (IoC) -> https://github.com/castleproject/Windsor/blob/master/docs/README.md <br/>
Entity Framework -> http://www.asp.net/entity-framework <br/>
Bootstrap -> http://getbootstrap.com <br/>
jQuery -> http://jquery.com <br/>
KnockoutJs -> http://knockoutjs.com <br/>

<br/>

<b>hosts entries:</b><br/>
127.0.0.1 local.clinike.com.br<br/>
127.0.0.1 local.scheduleapi.clinike.com.br<br/>
127.0.0.1 local.personapi.clinike.com.br<br/>

<br/>

<b>Migrations</b>
<br/>
<br/>

Example of command to enable migration on domain projects:<br/>
Enable-Migrations -ContextProjectName IkeCode.Clinike.[Domain].DataContext -StartUpProjectName IkeCode.Clinike.[Domain].Api -ContextTypeName IkeCode.Clinike.[Domain].DataContext.PersonContext -ProjectName IkeCode.Clinike.[Domain].Migrations

<br/>
<br/>

Example of Add-Migration:<br/>
Add-Migration V100_Nome -ProjectName IkeCode.Clinike.[Domain].Migrations -StartUpProjectName IkeCode.Clinike.[Domain].Api

<br/>
<br/>

Example Update-Database:<br/>
Update-Database -ProjectName IkeCode.Clinike.[Domain].Migrations -StartUpProjectName IkeCode.Clinike.[Domain].Api