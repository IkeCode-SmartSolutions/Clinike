using IkeCode.Web.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class CheckBoxEditorViewModel : IIkeCodeCheckBoxModel
    {
        public CheckBoxEditorViewModel()
        {
        }

        public bool Selected { get; set; }

        [Required]
        public string Name { get; set; }

        public string Title { get; set; }

        public string Id { get; set; }
    }
}