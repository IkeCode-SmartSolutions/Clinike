using IkeCode.Web.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class LostPasswordViewModel : BaseViewModel
    {
        public LostPasswordViewModel()
        {
        }

        public LostPasswordViewModel(bool includeLayout) 
            :this()
        {
            IncludeLayout = includeLayout;
        }

        public bool IncludeLayout { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Seu código unico")]
        public string UniqueCode { get; set; }
    }
}