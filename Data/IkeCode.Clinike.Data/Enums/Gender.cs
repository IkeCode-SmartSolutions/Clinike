using System.ComponentModel.DataAnnotations;

namespace IkeCode.Clinike.Data.Enums
{
    public enum Gender
    {
        [Display(Name = "Nenhum")]
        None = 0,
        [Display(Name = "Masculino")]
        Male = 1,
        [Display(Name = "Feminino")]
        Female = 2
    }
}
