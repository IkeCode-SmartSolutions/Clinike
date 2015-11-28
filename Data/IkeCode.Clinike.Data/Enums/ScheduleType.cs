using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Enums
{
    public enum ScheduleType
    {
        [Display(Name = "Médico")]
        Doctor = 0,

        [Display(Name = "Paciente")]
        Patient = 1
    }
}
