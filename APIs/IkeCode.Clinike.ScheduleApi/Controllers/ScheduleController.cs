using IkeCode.Clinike.Data.Enums;
using IkeCode.Clinike.Data.Models;
using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IkeCode.Clinike.ScheduleApi.Controllers
{
    public class ScheduleController : ApiController
    {
        /// <summary>
        /// GET api/Schedule?scheduleTypeId=0&offset=0&limit=10
        /// </summary>
        /// <param name="scheduleTypeId"></param>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <returns>PagedResult<Schedule></returns>
        public PagedResult<Schedule> Get(int scheduleTypeId, int offset, int limit)
        {
            return Schedule.FindAll(i => i.ScheduleType == (ScheduleType)scheduleTypeId, offset, limit).ToPagedResult();
        }

        /// <summary>
        /// GET api/Schedule/1
        /// Get Schedule Detail
        /// </summary>
        /// <param name="id">ScheduleId</param>
        /// <returns>Schedule</returns>
        public Schedule Get(int id)
        {
            return Schedule.Get(id);
        }

        /// <summary>
        /// // POST api/schedule
        /// </summary>
        /// <param name="schedule">Schedule object to be added</param>
        /// <returns>Schedule object</returns>
        public Schedule Post([FromBody]Schedule schedule)
        {
            return Schedule.AddOrUpdate(i => i.Id, schedule);
        }

        /// <summary>
        /// // PUT api/schedule/1
        /// </summary>
        /// <param name="id">Schedule Id</param>
        /// <param name="schedule">Schedule object to be updated</param>
        public void Put(int id, [FromBody]Schedule schedule)
        {
            Schedule.AddOrUpdate(i => i.Id, schedule);
        }

        /// <summary>
        /// // DELETE api/schedule/1
        /// </summary>
        /// <param name="id">Schedule Id</param>
        public void Delete(int id)
        {
            Schedule.Delete(id);
        }
    }
}
