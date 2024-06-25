using System;
using System.Collections.Generic;

namespace PETS.Models;

public partial class TblRaza
{
    public int IdRaza { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<TblMascota> TblMascota { get; set; } = new List<TblMascota>();
}
