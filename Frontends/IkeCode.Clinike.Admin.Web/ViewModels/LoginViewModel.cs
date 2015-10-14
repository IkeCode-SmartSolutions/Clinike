using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class LoginViewModel : BaseViewModel
    {
        [Required]
        [Display(Name = "Nome de usuário")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Senha")]
        public string Password { get; set; }

        [Display(Name = "Lembrar?")]
        public bool RememberMe { get; set; }

        public LostPasswordViewModel LostPassword { get; set; }
        public LostPasswordViewModel RequestLogin { get; set; }

        public bool ActionPerformed { get; set; }

        public LoginViewModel()
        {
            LostPassword = new LostPasswordViewModel();
            RequestLogin = new LostPasswordViewModel();
        }

        public override void CleanModelState(System.Web.Mvc.ModelStateDictionary modelState)
        {
            base.CleanModelState(modelState);
            
            modelState.Remove("ValidationSummary");
            modelState.Remove("ActionPerformed");

            ValidationSummary = ValidationSummary ?? new ValidationSummaryEditorViewModel();
        }
    }
}