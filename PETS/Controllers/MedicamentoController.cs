using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PETS.Models;

namespace PETS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicamentoController : ControllerBase
    {
        private readonly DbPetsContext _dbContext;

        public MedicamentoController(DbPetsContext contex)
        {
            _dbContext = contex;
        }


        [HttpGet]
        [Route("BuscarMedicamento/{id}")]
        public async Task<IActionResult> BuscarMedicamento(int id)
        {
            try
            {
                TblMedicamento list = _dbContext.TblMedicamentos.Find(id);
                if (list == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, list);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("BuscarMascota/{id}")]
        public async Task<IActionResult> BuscarMascota(int id)
        {
            try
            {
                var registrosAEliminar = _dbContext.TblMascotas.Where(m => m.IdRaza == id);

                return StatusCode(StatusCodes.Status200OK, registrosAEliminar);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpDelete]
        [Route("EliminarInt/{id}")]
        public async Task<IActionResult> EliminarInt(int id)
        {
            try
            {
                var registrosEliminar = _dbContext.IntMascotaMedicamentos.Where(i => i.IdMedicamento == id);
                _dbContext.IntMascotaMedicamentos.RemoveRange(registrosEliminar);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }


        [HttpDelete]
        [Route("Eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                var registrosAEliminar = _dbContext.TblMascotas.Where(m => m.IdRaza == id);
                _dbContext.TblMascotas.RemoveRange(registrosAEliminar);
                await _dbContext.SaveChangesAsync();

                TblMedicamento raza = _dbContext.TblMedicamentos.Find(id);

                _dbContext.TblMedicamentos.Remove(raza);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TblMedicamento request)
        {
            try
            {
                await _dbContext.TblMedicamentos.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }




        [HttpPost]
        [Route("Modificar")]
        public async Task<IActionResult> Modificar([FromBody] TblMedicamento request)
        {
            try
            {
                TblMedicamento med = _dbContext.TblMedicamentos.Find(request.IdMedicamento); 
                med.NombreMedicamento = request.NombreMedicamento;
                med.Descripcion = request.Descripcion;
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }
}
