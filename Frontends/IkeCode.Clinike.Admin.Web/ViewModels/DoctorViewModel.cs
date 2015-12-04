using Clinike.Admin.Controllers.Base;
using IkeCode.Clinike.Data.Models;
using IkeCode.Web.Core.Xml;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class DoctorViewModel : BaseViewModel
    {
        private Doctor doctor;
        public Doctor Doctor
        {
            get { return doctor; }
            set { if (value == null) return; doctor = value; }
        }

        public int PersonId { get; set; }
        
        public DoctorViewModel(Doctor doctor, int personId)
        {
            Doctor = doctor ?? new Doctor();
            PersonId = personId;
        }
    }
}