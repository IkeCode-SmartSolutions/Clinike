using System.Web;
using System.Web.Mvc;

namespace IkeCode.Clinike.ScheduleApi
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
