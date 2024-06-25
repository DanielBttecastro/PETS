using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PETS.Models;

namespace PETS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DbPetsContext _dbContext;

        public LoginController(DbPetsContext contex)
        {
            _dbContext = contex;
        }

        [HttpGet]
        [Route("Login/{correo}/{pass}")]
        public async Task<IActionResult> Login(string correo, string pass)
        {
            try
            {
                TblMedico md = await _dbContext.TblMedicos.FirstOrDefaultAsync(m => m.CorreoMedico == correo && m.ContraseniaMedico == pass);
                if (md == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Correo o contraseña incorrectos"});
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, new { message = "OK", nombre = md.NombreMedico, Cedula = md.cedulaMedico, Correo = md.CorreoMedico });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("Validar/{cedula}/{token}")]
        public async Task<IActionResult> Validar(int cedula, string token)
        {
            try
            {
                TblMedico md = await _dbContext.TblMedicos.FirstOrDefaultAsync(m => m.cedulaMedico == cedula && m.TokenMedico == token);
                if (md == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "El usuraio no tiene permitido registrarse" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, new { message = "OK", nombre = md.NombreMedico, Cedula = md.cedulaMedico, Correo = md.CorreoMedico });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("Registrar")]
        public async Task<IActionResult> Registrar([FromBody] TblMedico request)
        {
            try
            {
                TblMedico md = await _dbContext.TblMedicos.FirstOrDefaultAsync(m => m.cedulaMedico == request.cedulaMedico && m.TokenMedico == request.TokenMedico);
                if (md == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "El usuraio no tiene permitido registrarse" });
                }
                else
                {
                    md.NombreMedico = request.NombreMedico;
                    md.ApellidoMedico= request.ApellidoMedico;
                    md.TelefonoMedico= request.TelefonoMedico;
                    md.CorreoMedico= request.CorreoMedico;
                    md.ContraseniaMedico= request.ContraseniaMedico;
                    await _dbContext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, new { message = "OK" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }   
}
