<b>Softwares</b>
<ul>
	<li><a target="_blank" href="https://dev.mysql.com/downloads/mysql/">MySql 5x</a> (This project use MySql 5x  as default database, please install it on your local machine.)</li>
	<li><a target="_blank" href="http://mongodb.com">MongoDB</a> (in the future -> AspNetIdentity)</li>
</ul>

<hr/>

<b>Libraries</b>
<ul>
	<li><a target="_blank" href="https://github.com/castleproject/Windsor/blob/master/docs/README.md">Castle.Windsor</a> (IoC)</li>
	<li><a target="_blank" href="http://www.asp.net/entity-framework">Entity Framework</a></li>
	<li><a target="_blank" href="http://getbootstrap.com">Bootstrap CSS</a></li>
	<li><a target="_blank" href="http://jquery.com">jQuery</a></li>
	<li><a target="_blank" href="http://knockoutjs.com">KnockoutJs</a></li>
	<li><a target="_blank" href="http://datatables.net/">DataTables</a></li>
</ul>

<hr/>

<b>Migrations</b>
<ul>
	<li>Example of command to enable migration on domain projects
		<ul style="list-style-type:square">
			<li>
				<pre>Enable-Migrations -ContextProjectName IkeCode.Clinike.[Domain].DataContext -StartUpProjectName IkeCode.Clinike.[Domain].Api -ContextTypeName IkeCode.Clinike.[Domain].DataContext.PersonContext -ProjectName IkeCode.Clinike.[Domain].Migrations</pre>
			</li>
		</ul>
	</li>
	<li>Example of Add-Migration
		<ul style="list-style-type:square">
			<li>
				<pre>Add-Migration V100_Nome -ProjectName IkeCode.Clinike.[Domain].Migrations -StartUpProjectName IkeCode.Clinike.[Domain].Api</pre>
			</li>
		</ul>
	</li>
	<li>Example Update-Database
		<ul style="list-style-type:square">
			<li>
				<pre>Update-Database -ProjectName IkeCode.Clinike.[Domain].Migrations -StartUpProjectName IkeCode.Clinike.[Domain].Api</pre>
			</li>
		</ul>
	</li>
</ul>

<hr/>

<b>Urls</b>
<ul>
	<li>
		<a target="_blank" href="https://www.nuget.org/profiles/IkeCode">IkeCode Nuget</a>
	</li>
</ul>

<hr/>

<b>hosts entries:</b>
<pre>
127.0.0.1 local.clinike.com.br<br/>
127.0.0.1 local.scheduleapi.clinike.com.br<br/>
127.0.0.1 local.personapi.clinike.com.br<br/>
</pre>