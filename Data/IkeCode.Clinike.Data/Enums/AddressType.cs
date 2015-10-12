using System.ComponentModel.DataAnnotations;

namespace IkeCode.Clinike.Data.Enums
{
    public enum AddressType
    {
        [Display(Name = "Desconhecido")]
        Unknown = 0,
        [Display(Name = "Residencial")]
        Residential = 1,
        [Display(Name = "Comercial")]
        Commercial = 2,
        [Display(Name = "Entrega")]
        Delivery = 3,
    }
}
