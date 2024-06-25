using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PETS.Models;

namespace PETS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {

        private readonly DbPetsContext _dbContext;

        public MedicosController(DbPetsContext contex)
        {
            _dbContext = contex;
        }


        [HttpGet]
        [Route("BuscarMedicos/{id}")]
        public async Task<IActionResult> BuscarMedicos(int id)
        {
            try
            {
                TblMedico listMedicos = _dbContext.TblMedicos.Find(id);
                if (listMedicos == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, listMedicos);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("BuscarMascota/{id}")]
        public async Task<IActionResult> BuscarMascota(string id)
        {
            try
            {
                var registrosAEliminar = _dbContext.TblMascotas.Where(m => m.ClienteCedula == id);

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

               
                TblMedico medico = _dbContext.TblMedicos.Find(id);

                _dbContext.TblMedicos.Remove(medico);
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
        public async Task<IActionResult> Guardar([FromBody] TblMedico request)
        {
            try
            {
                await _dbContext.TblMedicos.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("Token/{cedula}/{token}/{id}")]
        public async Task<IActionResult> Token(int cedula,string token,int id)
        {
            try
            {
                TblMedico med= new TblMedico();
                med.IdMedico = id;
                med.cedulaMedico = cedula;
                med.TokenMedico = token;
                med.NombreMedico = "";
                med.ApellidoMedico = "";
                med.CorreoMedico = "";
                med.ContraseniaMedico = "";
                med.TelefonoMedico = ""; 
                await _dbContext.TblMedicos.AddAsync(med);
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
        public async Task<IActionResult> Modificar([FromBody] TblMedico request)
        {
            try
            {
                TblMedico Medicos = _dbContext.TblMedicos.Find(request.IdMedico);
                Medicos.NombreMedico = request.NombreMedico;
                Medicos.ApellidoMedico = request.ApellidoMedico;
                Medicos.CorreoMedico = request.CorreoMedico;
                Medicos.ContraseniaMedico = request.ContraseniaMedico;
                Medicos.TelefonoMedico = request.TelefonoMedico; 
                Medicos.ContraseniaMedico = request.ContraseniaMedico;
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
