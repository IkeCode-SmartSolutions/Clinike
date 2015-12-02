using IkeCode.Clinike.Data.Enums;
using IkeCode.Clinike.Data.Interfaces;
using IkeCode.Core.CustomAttributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Models
{
    [ExportToJavascript]
    public class Schedule : BaseModel<Schedule>, ISchedule
    {
        public Schedule()
            : base()
        {

        }

        public Schedule(Schedule model)
            : base(model)
        {
            ScheduleType = model.ScheduleType;
            ScheduleTypeId = model.ScheduleTypeId;
            StartDate = model.StartDate;
            EndDate = model.EndDate;
            AllDay = model.AllDay;
            PatientId = model.PatientId;
            DoctorId = model.DoctorId;
        }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public bool AllDay { get; set; }

        [Required]
        public ScheduleType ScheduleType { get; set; }

        [NotMapped]
        [ExportToJavascript]
        public int ScheduleTypeId
        {
            get { return (int)ScheduleType; }
            set { ScheduleType = (ScheduleType)value; }
        }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [JsonIgnore]
        public virtual Person Patient { get; set; }

        [JsonIgnore]
        public virtual Doctor Doctor { get; set; }
    }
}
