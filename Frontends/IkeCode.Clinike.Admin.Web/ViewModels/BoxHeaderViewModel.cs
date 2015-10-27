using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class BoxHeaderViewModel
    {
        public string IconClass { get; private set; }
        public bool HasIconClass { get { return !string.IsNullOrWhiteSpace(IconClass); } }

        public string Title { get; private set; }

        public bool Collapsed { get; private set; }
        public string CollapsedIconClass { get { return Collapsed ? "fa fa-chevron-down" : "fa fa-chevron-up"; } }

        public bool ShowExpandButton { get; private set; }

        public BoxHeaderViewModel(string title, string iconClass = "", bool collapsed = false, bool showExpandButton = true)
        {
            Title = title;
            IconClass = iconClass;
            Collapsed = collapsed;
            ShowExpandButton = showExpandButton;
        }
    }
}