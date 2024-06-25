using System;
using System.Collections.Generic;

namespace PETS.Models;

public partial class TblCliente
{
    public string Cedula { get; set; } = null!;

    public string NombreCliente { get; set; } = null!;

    public string ApellidoCliente { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public virtual ICollection<TblMascota> TblMascota { get; set; } = new List<TblMascota>();
}
