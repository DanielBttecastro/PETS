using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PETS.Models;

namespace PETS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {

        private readonly DbPetsContext _dbContext;

        public ClientesController(DbPetsContext contex)
        {
            _dbContext = contex;
        }


        [HttpGet]
        [Route("BuscarCliente/{id}")]
        public async Task<IActionResult> BuscarCliente(string id)
        {
            try
            {
                TblCliente LisClientes =  _dbContext.TblClientes.Find(id);
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
        public async Task<IActionResult> Eliminar(string id)
        {
            try
            {
               
                var registrosAEliminar = _dbContext.TblMascotas.Where(m => m.ClienteCedula == id);               
                _dbContext.TblMascotas.RemoveRange(registrosAEliminar);
                await _dbContext.SaveChangesAsync(); 
                TblCliente cliente = _dbContext.TblClientes.Find(id);

                _dbContext.TblClientes.Remove(cliente);
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
        public async Task<IActionResult> Guardar([FromBody] TblCliente request)
        {
            try
            {
                await _dbContext.TblClientes.AddAsync(request);
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
        public async Task<IActionResult> Modificar([FromBody] TblCliente request)
        {
            try
            {
                TblCliente cliente = _dbContext.TblClientes.Find(request.Cedula);
                cliente.NombreCliente = request.NombreCliente;
                cliente.ApellidoCliente=request.ApellidoCliente;
                cliente.Direccion= request.Direccion;   
                cliente.Telefono=  request.Telefono; 
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
