using System;
using System.Collections.Generic;

namespace PETS.Models;

public partial class TblMascota
{
    public int IdMascota { get; set; }

    public string NombreMascota { get; set; } = null!;

    public int EdadMascota { get; set; }

    public decimal PesoMascota { get; set; }

    public string? ClienteCedula { get; set; } = null;

    public int? IdRaza { get; set; }

    public virtual TblCliente? ClienteCedulaNavigation { get; set; }

    public virtual TblRaza? IdRazaNavigation { get; set; }
}
