using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository.Contracts;

namespace ProAgil.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PalestranteController : ControllerBase
    {
        private readonly IProAgilRepository _repository;

        public PalestranteController(IProAgilRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _repository.GetAllPalestrantesAsync(true));
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Falha ao realizar operação");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _repository.GetPalestranteAsyncById(id, true));
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Falha ao realizar operação");
            }
        }

        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                return Ok(await _repository.GetPalestrantesAsyncByName(nome, true));
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Falha ao realizar operação");
            }
        }  
        
        [HttpPost]
        public async Task<IActionResult> Post(Palestrante model)
        {
            try
            {
                _repository.Add(model);

                if(await _repository.SaveChangesAsync())
                {
                    return Created($"/api/palestrante/{model.Id}", model);
                }
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Falha ao realizar operação");
            }

            return BadRequest("Houve um erro na inclusão do evento.");
        }     

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Palestrante model)
        {
            try
            {
                var palestrante = await _repository.GetPalestranteAsyncById(id, false);

                if(palestrante == null)
                    return NotFound();

                model.Id = palestrante.Id;
                _repository.Update(model);

                if(await _repository.SaveChangesAsync())
                {
                    return Created($"/api/palestrante/{model.Id}", model);
                }
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Falha ao realizar operação");
            }

            return BadRequest("Houve um erro na operação.");
        }    

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var palestrante = await _repository.GetPalestranteAsyncById(id, false);

                if(palestrante == null)
                    return NotFound();
                    
                _repository.Delete(palestrante);

                if(await _repository.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    "Falha ao realizar operação");
            }

            return BadRequest("Houve um erro na operação.");
        }    
    }
}