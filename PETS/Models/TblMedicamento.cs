using System;
using System.Collections.Generic;

namespace PETS.Models;

public partial class TblMedicamento
{
    public int IdMedicamento { get; set; }

    public string NombreMedicamento { get; set; } = null!;

    public string Descripcion { get; set; } = null!;
}
