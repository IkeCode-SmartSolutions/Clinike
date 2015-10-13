using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using IkeCode.Clinike.Data.Models;
using IkeCode.Clinike.Data;
using IkeCode.Web.Core.Model.Interfaces;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class ManageUserViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Senha atual")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "A {0} deve ter pelo menos {2} caracteres.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Nova senha")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirme a nova senha")]
        [Compare("NewPassword", ErrorMessage = "As senhas não conferem.")]
        public string ConfirmPassword { get; set; }
    }


    public class LoginViewModel
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
    }


    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "Nome de usuário")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "A {0} deve ter pelo menos {2} caracteres.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Senha")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirme a senha")]
        [Compare("Password", ErrorMessage = "As senhas não conferem.")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Email { get; set; }

        // Return a pre-poulated instance of AppliationUser:
        public ClinikeUser GetUser()
        {
            var user = new ClinikeUser()
            {
                UserName = UserName,
                Email = Email,
            };
            return user;
        }
    }


    public class EditUserViewModel
    {
        public EditUserViewModel() { }

        // Allow Initialization with an instance of ApplicationUser:
        public EditUserViewModel(ClinikeUser user)
        {
            Id = user.Id;
            UserName = user.UserName;
            Email = user.Email;
        }

        public string Id { get; set; }

        [Required]
        [Display(Name = "Nome de usuário")]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }
    }


    public class SelectUserRolesViewModel
    {
        public SelectUserRolesViewModel()
        {
            Roles = new List<SelectRoleEditorViewModel>();
        }
        
        // Enable initialization with an instance of ApplicationUser:
        public SelectUserRolesViewModel(ClinikeUser user)
            : this()
        {
            UserName = user.UserName;
            Id = user.Id;

            var Db = new ClinikeContext();

            // Add all available roles to the list of EditorViewModels:
            var allRoles = ClinikeIdentityRoleEx.GetAll();
            foreach (var role in allRoles)
            {
                // An EditorViewModel will be used by Editor Template:
                var rvm = new SelectRoleEditorViewModel(role);
                Roles.Add(rvm);
            }

            // Set the Selected property to true for those roles for 
            // which the current user is a member:
            foreach (var userRole in user.Roles)
            {
                var checkUserRole =
                    Roles.Find(r => r.Id == userRole.RoleId);
                checkUserRole.Selected = true;
            }
        }

        public string Id { get; set; }
        public string UserName { get; set; }
        public List<SelectRoleEditorViewModel> Roles { get; set; }
    }

    // Used to display a single role with a checkbox, within a list structure:
    public class SelectRoleEditorViewModel : IIkeCodeCheckBoxModel
    {
        public SelectRoleEditorViewModel() { }
        public SelectRoleEditorViewModel(ClinikeIdentityRole role)
        {
            Name = role.Name;
            Id = role.Id;
            Title = role.Title;
        }

        public bool Selected { get; set; }

        [Required]
        public string Name { get; set; }

        public string Title { get; set; }

        public string Id { get; set; }
    }
}