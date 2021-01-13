using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser informado")]
        public string Local { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser informado")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser informado")]
        public string Tema { get; set; }

        [Range(2, 5000, ErrorMessage = "A quantidade de pessoas é entre 2 e 5000.")]
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }

        [Phone]
        public string Telefone { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public string Lote { get; set; }
        public List<LoteDto> Lotes {get; set;}
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}