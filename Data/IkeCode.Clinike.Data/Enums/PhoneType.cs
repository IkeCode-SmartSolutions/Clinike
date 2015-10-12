using System.ComponentModel.DataAnnotations;

namespace IkeCode.Clinike.Data.Enums
{
    public enum PhoneType
    {
        [Display(Name = "Celular")]
        Mobile = 0,
        [Display(Name = "Residencial")]
        Residential = 1,
        [Display(Name = "Comercial")]
        Business = 2
    }
}
