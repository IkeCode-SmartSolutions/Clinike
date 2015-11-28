using IkeCode.Clinike.Data.Enums;
using IkeCode.Core.CustomAttributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Models
{
    public class Schedule : BaseModel<Schedule>
    {
        public Schedule()
            : base()
        {

        }

        public Schedule(Schedule model)
            : base(model)
        {
            ScheduleDate = model.ScheduleDate;
            ScheduleType = model.ScheduleType;
            ScheduleTypeId = model.ScheduleTypeId;
            PersonId = model.PersonId;
        }

        public DateTime ScheduleDate { get; set; }

        public ScheduleType ScheduleType { get; set; }

        [NotMapped]
        [ExportToJavascript]
        public int ScheduleTypeId
        {
            get { return (int)ScheduleType; }
            set { ScheduleType = (ScheduleType)value; }
        }

        public int PersonId { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
