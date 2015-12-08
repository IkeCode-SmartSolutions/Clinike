using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using System.Linq;
using System.Web.Mvc;
using Clinike.Admin.Base;
using IkeCode.Clinike.Data.Models;
using IkeCode.Clinike.Admin.Web.ViewModels;
using System.Web.UI;

namespace Clinike.Admin.Controllers
{
    [Authorize]
    public class AccountController : BaseAuthController
    {
        [Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            var users = ClinikeUserEx.GetAll();
            var model = new List<EditUserViewModel>();
            foreach (var user in users)
            {
                var u = new EditUserViewModel(user);
                model.Add(u);
            }
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl, string actionPerformed)
        {
            ViewBag.ReturnUrl = returnUrl;
            var model = new LoginViewModel();
            model.ActionPerformed = !string.IsNullOrWhiteSpace(actionPerformed);
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            model.CleanModelState(ModelState);

            if (ModelState.IsValid)
            {
                var user = await UserManager.FindAsync(model.UserName, model.Password);
                if (user != null)
                {
                    AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                    var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                    AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = model.RememberMe }, identity);

                    if (Url.IsLocalUrl(returnUrl))
                    {
                        return Redirect(returnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    model.ValidationSummary.AddMessage("Nome de usuário e/ou senha inválido(s).");
                }
            }
            else
            {

                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(i => i.ErrorMessage)).ToList();
                model.ValidationSummary.AddMessages(errors);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = model.GetUser();
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Account");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult LostPassword()
        {
            var model = new LostPasswordViewModel(true);
            return View("_LostPassword", model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult LostPassword(LostPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.IncludeLayout = true;

                if (string.IsNullOrWhiteSpace(model.Email) && string.IsNullOrWhiteSpace(model.UniqueCode))
                {
                    model.ValidationSummary.AddMessage("Insira ao menos uma das informações solicitadas para continuar");
                }
                else
                {
                    ClinikeUser user = null;

                    if (!string.IsNullOrWhiteSpace(model.UniqueCode))
                    {
                        user = ClinikeUserEx.Find(i => i.UniqueId == model.UniqueCode);
                    }
                    else if (!string.IsNullOrWhiteSpace(model.Email))
                    {
                        user = ClinikeUserEx.Find(i => i.Email == model.Email);
                    }

                    if (user == null)
                    {
                        model.ValidationSummary.AddMessage("Email ou Código Unico invalido. Revise as informações, se o erro persisitir contate seu Médico.");
                    }
                    else
                    {
                        return RedirectToRoute("AccountLogin", new { actionPerformed = "senha-requisitada" });
                    }
                }

                return View("_LostPassword", model);
            }

            return RedirectToRoute("AccountLogin");
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult RequestLogin()
        {
            var model = new LostPasswordViewModel(true);
            return View("_RequestLogin", model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult RequestLogin(LostPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.IncludeLayout = true;

                if (string.IsNullOrWhiteSpace(model.Email) && string.IsNullOrWhiteSpace(model.UniqueCode))
                {
                    model.ValidationSummary.AddMessage("Insira ao menos uma das informações solicitadas para continuar");
                }
                else
                {
                    return RedirectToRoute("AccountLogin", new { actionPerformed = "login-requisitado" });
                }

                return View("_RequestLogin", model);
            }

            // If we got this far, something failed, redisplay form
            return RedirectToRoute("AccountLogin");
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Manage(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.ChangePasswordSuccess ? "Senha modificada com sucesso."
                : message == ManageMessageId.SetPasswordSuccess ? "Senha setada com sucesso."
                : message == ManageMessageId.RemoveLoginSuccess ? "O Login Externo foi removido com sucesso."
                : message == ManageMessageId.Error ? "Ocorreu um erro. Se persistir contate o administrador do sistema."
                : "";

            ViewBag.HasLocalPassword = HasPassword();
            ViewBag.ReturnUrl = Url.Action("Manage");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Manage(ManageUserViewModel model)
        {
            bool hasPassword = HasPassword();
            ViewBag.HasLocalPassword = hasPassword;
            ViewBag.ReturnUrl = Url.RouteUrl("AccountIndex");
            if (hasPassword)
            {
                if (ModelState.IsValid)
                {
                    IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Manage", new { Message = ManageMessageId.ChangePasswordSuccess });
                    }
                    else
                    {
                        AddErrors(result);
                    }
                }
            }
            else
            {
                // User does not have a password so remove any validation errors caused by a missing OldPassword field
                ModelState state = ModelState["OldPassword"];
                if (state != null)
                {
                    state.Errors.Clear();
                }

                if (ModelState.IsValid)
                {
                    IdentityResult result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Manage", new { Message = ManageMessageId.SetPasswordSuccess });
                    }
                    else
                    {
                        AddErrors(result);
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Edit(string id, ManageMessageId? Message = null)
        {
            var user = ClinikeUserEx.Find(u => u.Id == id);
            var model = new EditUserViewModel(user);
            ViewBag.MessageId = Message;
            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(EditUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = ClinikeUserEx.Find(u => u.Id == model.Id);
                user.Email = model.Email;
                await ClinikeUserEx.UpdateAsync(user.Id, user);
                return RedirectToRoute("AccountIndex");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Delete(string id)
        {
            var user = ClinikeUserEx.Find(u => u.Id == id);
            var model = new EditUserViewModel(user);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(model);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteConfirmed(string id)
        {
            ClinikeUserEx.Delete(id);
            return RedirectToRoute("AccountIndex");
        }

        [Authorize(Roles = "Admin")]
        public ActionResult UserRoles(string id)
        {
            var user = ClinikeUserEx.Find(u => u.Id == id, includes: new List<string> { "Roles" });
            var model = new SelectUserRolesViewModel(user);
            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public ActionResult UserRoles(SelectUserRolesViewModel model)
        {
            if (ModelState.IsValid)
            {
                var idManager = new ClinikeIdentityManager();
                var user = ClinikeUserEx.Find(u => u.UserName == model.UserName);
                idManager.ClearUserRoles(user.Id);
                foreach (var role in model.Roles)
                {
                    if (role.Selected)
                    {
                        idManager.AddUserToRole(user.Id, role.Name);
                    }
                }
                return RedirectToRoute("AccountIndex");
            }
            return View();
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private bool HasPassword()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                return user.PasswordHash != null;
            }
            return false;
        }

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            Error
        }

        #endregion
    }
}