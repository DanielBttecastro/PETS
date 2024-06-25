using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PETS.Models;

namespace PETS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RazasController : ControllerBase
    {
        private readonly DbPetsContext _dbContext;

        public RazasController(DbPetsContext contex)
        {
            _dbContext = contex;
        }


        [HttpGet]
        [Route("BuscarRazas/{id}")]
        public async Task<IActionResult> BuscarRazas(int id)
        {
            try
            {
                TblRaza  list = _dbContext.TblRazas.Find(id);
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
                var registrosEliminar = _dbContext.IntMascotaMedicamentos.Where(i => i.IdMascota == id);
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

                TblRaza raza = _dbContext.TblRazas.Find(id);

                _dbContext.TblRazas.Remove(raza);
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
        public async Task<IActionResult> Guardar([FromBody] TblRaza request)
        {
            try
            {
                await _dbContext.TblRazas.AddAsync(request);
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
        public async Task<IActionResult> Modificar([FromBody] TblRaza request)
        {
            try
            {
                TblRaza raza = _dbContext.TblRazas.Find(request.IdRaza);
                raza.IdRaza = request.IdRaza;
                raza.Nombre = request.Nombre; 
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
