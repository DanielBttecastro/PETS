using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PETS.Models;

public partial class IntMascotaMedicamento
{
    public int? idIntermedia { get; set; }
    public int? IdMedicamento { get; set; }

    public int? IdMascota { get; set; }

    public string? Dosis { get; set; }

    public int? IdMedico { get; set; }
     

    public virtual TblMascota? IdMascotaNavigation { get; set; }

    public virtual TblMedicamento? IdMedicamentoNavigation { get; set; }

    public virtual TblMedico? IdMedicoNavigation { get; set; }
}
