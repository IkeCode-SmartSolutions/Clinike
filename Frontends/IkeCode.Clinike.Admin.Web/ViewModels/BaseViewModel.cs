using IkeCode.Web.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class BaseViewModel
    {
        public BaseViewModel()
        {
            ValidationSummary = new ValidationSummaryEditorViewModel();
        }

        public ValidationSummaryEditorViewModel ValidationSummary { get; set; }

        public virtual void CleanModelState(ModelStateDictionary modelState)
        {
            modelState.Remove("ValidationSummary");
            modelState.Remove("ActionPerformed");

            ValidationSummary = ValidationSummary ?? new ValidationSummaryEditorViewModel();
        }
    }
}