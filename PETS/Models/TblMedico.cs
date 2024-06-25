using System;
using System.Collections.Generic;

namespace PETS.Models;

public partial class TblMedico
{
    public int IdMedico { get; set; }

    public string NombreMedico { get; set; } = null!;

    public string ApellidoMedico { get; set; } = null!;

    public string CorreoMedico { get; set; } = null!;

    public string ContraseniaMedico { get; set; } = null!;

    public string TelefonoMedico { get; set; } = null!;

    public string TokenMedico { get; set; } = null!;

    public int cedulaMedico { get; set; } = 0;
}
