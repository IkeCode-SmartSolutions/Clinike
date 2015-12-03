using IkeCode.Core.Crypto;
using IkeCode.Core.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public enum NotificationIconType
    {
        None = 0,
        Success = 1,
        Warning = 2,
        Error = 3
    }

    public class NotificationViewModel
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("timeout")]
        public int Timeout { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonIgnore]
        private NotificationIconType IconType { get; set; }

        [JsonIgnore]
        private string CustomIconTypeClass { get; set; }

        [JsonIgnore]
        public bool Expired { get; set; }
        
        public NotificationViewModel()
        {

        }

        public NotificationViewModel(string text, string title = null, int timeout = 5000, NotificationIconType iconType = NotificationIconType.None, string customIconTypeClass = "", bool addToCookie = true)
        {
            Text = text;
            Title = title;
            Timeout = timeout;
            IconType = iconType;
            CustomIconTypeClass = customIconTypeClass;
            Icon = GetHtmlForIconType();

            if (addToCookie)
            {
                this.AddToCookie();
            }
        }
        
        public static void AddToCookie(string text, string title = null, int timeout = 5000, NotificationIconType iconType = NotificationIconType.None, string customIconTypeClass = "")
        {
            new NotificationViewModel(text, title, timeout, iconType, customIconTypeClass);
        }

        public static NotificationViewModel ExtractFromCookie(bool expireAfterGet = true)
        {
            NotificationViewModel result = null;

            var context = HttpContext.Current;

            var cookie = context.Request.Cookies.Get("ikecodeNotification");
            if (cookie != null && !string.IsNullOrWhiteSpace(cookie.Value))
            {
                var decrypted = IkeCodeCrypto.DecryptAES(cookie.Value, "ikecodeNotificationKey");
                var obj = JsonConvert.DeserializeObject<NotificationViewModel>(decrypted);
                if (obj.Expired)
                {
                    return result;
                }

                obj.Expired = expireAfterGet;

                result = obj;
            }

            return result;
        }

        public static string ExtractStringFromCookie(bool expireAfterGet = true)
        {
            string result = "{}";

            var vm = ExtractFromCookie(expireAfterGet);
            result = vm != null ? vm.ToJsonString() : result;

            return result;
        }

        public void AddToCookie()
        {
            var obj = JsonConvert.SerializeObject(this, new JsonSerializerSettings() { Formatting = Formatting.None, NullValueHandling = NullValueHandling.Ignore });

            var encryptedValue = IkeCodeCrypto.EncryptAES(obj, "ikecodeNotificationKey");

            HttpCookie cookie = new HttpCookie("ikecodeNotification");
            cookie.Value = encryptedValue;
            cookie.Path = "/";

            DateTime dtNow = DateTime.Now;
            TimeSpan tsMinute = new TimeSpan(0, 0, 5, 0);
            cookie.Expires = dtNow + tsMinute;

            HttpContext.Current.Request.Cookies.Remove("ikecodeNotification");
            HttpContext.Current.Response.Cookies.Remove("ikecodeNotification");

            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        private string GetHtmlForIconType()
        {
            string result = string.Empty;
            string pattern = "<i class=\"{0}\"></i>";

            if (string.IsNullOrWhiteSpace(CustomIconTypeClass))
            {
                switch (IconType)
                {
                    case NotificationIconType.Success:
                        result = string.Format(pattern, "glyphicon glyphicon-ok");
                        break;
                    case NotificationIconType.Warning:
                        result = string.Format(pattern, "glyphicon glyphicon-warning-sign");
                        break;
                    case NotificationIconType.Error:
                        result = string.Format(pattern, "glyphicon glyphicon-remove");
                        break;
                }
            }
            else
            {
                result = string.Format(pattern, CustomIconTypeClass);
            }

            return result;
        }
    }
}