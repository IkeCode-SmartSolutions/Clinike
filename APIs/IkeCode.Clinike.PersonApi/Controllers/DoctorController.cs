using IkeCode.Clinike.Data.Models;
using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IkeCode.Clinike.PersonApi.Controllers
{
    public class DoctorController : ApiController
    {
        /// <summary>
        /// GET api/doctor?children=foo,bar&offset=0&limit=10
        /// </summary>
        /// <param name="children"></param>
        /// <param name="offset"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public PagedResult<Doctor> Get(string children = "", int offset = 0, int limit = 10)
        {
            string[] childrenArray = null;

            if (!string.IsNullOrWhiteSpace(children))
            {
                childrenArray = children.Split(',');
            }

            var doctors = Doctor.GetAll(offset, limit, childrenArray);

            return doctors.ToPagedResult();
        }

        /// <summary>
        /// GET api/doctor/5?includeChildren=true
        /// </summary>
        /// <param name="id"></param>
        /// <param name="children"></param>
        /// <returns></returns>
        public Doctor Get(int id, string children = "")
        {
            string[] childrenArray = null;

            if (!string.IsNullOrWhiteSpace(children))
            {
                childrenArray = children.Split(',');
            }

            var person = Doctor.Find(i => i.Id == id, includes: childrenArray);

            return person;
        }

        /// <summary>
        /// POST api/doctor
        /// </summary>
        /// <param name="doctor"></param>
        public void Post([FromBody]Doctor doctor)
        {
            Doctor.AddOrUpdate(i => i.Id, doctor);
        }

        /// <summary>
        /// PUT api/doctor/5
        /// </summary>
        /// <param name="id"></param>
        /// <param name="doctor"></param>
        public void Put(int id, [FromBody]Doctor doctor)
        {
            Doctor.Update(doctor, id);
        }

        /// <summary>
        /// DELETE api/doctor/5
        /// </summary>
        /// <param name="id"></param>
        public void Delete(int id)
        {
            Doctor.Delete(id);
        }
    }
}
