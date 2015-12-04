﻿using Clinike.Admin.Controllers.Base;
using IkeCode.Clinike.Data.Models;
using IkeCode.Web.Core.Xml;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class PersonViewModel : BaseViewModel
    {
        public Person Person { get; set; }

        private DoctorViewModel doctorViewModel;
        public DoctorViewModel DoctorViewModel
        {
            get { return doctorViewModel; }
            set { if (value == null) return; doctorViewModel = value; }
        }

        private LegalPerson legalPerson;
        public LegalPerson LegalPerson
        {
            get { return legalPerson; }
            set { if (value == null) return; legalPerson = value; }
        }

        private NaturalPerson naturalPerson;
        public NaturalPerson NaturalPerson
        {
            get { return naturalPerson; }
            set { if (value == null) return; naturalPerson = value; }
        }

        [Display(Name = "Imagem de Perfil")]
        public HttpPostedFileWrapper ProfileImage { get; set; }

        internal void SaveProfileImage()
        {
            try
            {
                if (this.ProfileImage != null)
                {
                    var config = new IkeCodeConfig("General");
                    var uploadPath = config.GetString("uploadPath");

                    var path = Path.Combine(HttpContext.Current.Server.MapPath(uploadPath), this.ProfileImage.FileName);
                    this.ProfileImage.SaveAs(path);
                    var uri = "";
                    if (!uploadPath.EndsWith("/"))
                    {
                        uploadPath = uploadPath + "/";
                    }
                    uri = string.Format("{0}{1}", uploadPath, this.ProfileImage.FileName);

                    this.Person.ProfileImageUrl = uri;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public PersonViewModel()
            : base()
        {
            Person = new Person();
            LegalPerson = new LegalPerson();
            NaturalPerson = new NaturalPerson();
        }

        public PersonViewModel(Person person)
            : this()
        {
            Person = person;
            DoctorViewModel = new DoctorViewModel(person.Doctor, person.Id);
            LegalPerson = person.LegalPerson;
            NaturalPerson = person.NaturalPerson;
        }
    }
}