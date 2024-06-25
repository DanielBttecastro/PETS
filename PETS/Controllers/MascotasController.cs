using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PETS.Models;

namespace PETS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotasController : ControllerBase
    {

        private readonly DbPetsContext _dbContext;

        public MascotasController(DbPetsContext contex)
        {
            _dbContext = contex;
        }

        [HttpGet]
        [Route("ListarMascotas")]
        public async Task<IActionResult> ListarMascotas()
        {
            try
            {
                List<TblMascota> ListMacotas = await _dbContext.TblMascotas.ToListAsync();

                if (ListMacotas == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, ListMacotas);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("ListarMedico")]
        public async Task<IActionResult> ListarMedico()
        {
            try
            {
                List<TblMedico> ListMedicos = await _dbContext.TblMedicos.ToListAsync();
                if (ListMedicos == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, ListMedicos);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("ListarCliente")]
        public async Task<IActionResult> ListarCliente()
        {
            try
            {
                List<TblCliente> LisClientes = await _dbContext.TblClientes.ToListAsync();
                if (LisClientes == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, LisClientes);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("ListarIntermedia")]
        public async Task<IActionResult> ListarIntermedia()
        {
            try
            {
                List<IntMascotaMedicamento> ListIntermedia = await _dbContext.IntMascotaMedicamentos.ToListAsync();

                if (ListIntermedia == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, ListIntermedia);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("ListarMedicamento")]
        public async Task<IActionResult> ListarMedicamento()
        {
            try
            {
                List<TblMedicamento> ListMedicamento = await _dbContext.TblMedicamentos.ToListAsync();
                if (ListMedicamento == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, ListMedicamento);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("ListarRazas")]
        public async Task<IActionResult> ListarRazas()
        {
            try
            {
                List<TblRaza> ListRaza = await _dbContext.TblRazas.ToListAsync();
                if (ListRaza == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, ListRaza);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TblMascota request)
        {
            try
            {
                await _dbContext.TblMascotas.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("Guardarint")]
        public async Task<IActionResult> Guardarint([FromBody] IntMascotaMedicamento request)
        {
            try
            {
                await _dbContext.IntMascotaMedicamentos.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            try {
                var registrosAEliminar = _dbContext.IntMascotaMedicamentos.Where(mc => mc.IdMascota == id);

                _dbContext.IntMascotaMedicamentos.RemoveRange(registrosAEliminar);
                await _dbContext.SaveChangesAsync();

                TblMascota mc = _dbContext.TblMascotas.Find(id);
                _dbContext.TblMascotas.Remove(mc);
                await _dbContext.SaveChangesAsync();

                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "OK");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("BuscarMascota/{id:int}")]
        public async Task<IActionResult> BuscarMascota (int id)
        {
            try
            {
                TblMascota masco = _dbContext.TblMascotas.Find(id);
                if (masco == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                else
                {

                return StatusCode(StatusCodes.Status200OK, masco);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("EliminarIntermedia/{id:int}")]
        public async Task<IActionResult> EliminarIntermedia(int id)
        {
            try
            {
                var registrosAEliminar = _dbContext.IntMascotaMedicamentos.Where(mc => mc.IdMascota == id);

                _dbContext.IntMascotaMedicamentos.RemoveRange(registrosAEliminar);
                await _dbContext.SaveChangesAsync();  
                return StatusCode(StatusCodes.Status200OK, "OK");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpPut]
        [Route("ModificarMascota/{id:int}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] TblMascota request)
        {
            try
            {
                TblMascota Existente = await _dbContext.TblMascotas.FindAsync(id);
                if (Existente == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

                Existente.ClienteCedula = request.ClienteCedula;
                Existente.NombreMascota = request.NombreMascota;
                Existente.PesoMascota = request.PesoMascota;
                Existente.EdadMascota = request.EdadMascota;
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
