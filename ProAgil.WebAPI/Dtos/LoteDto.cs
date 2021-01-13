using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} deve ser informado")]
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public string DataInicio { get; set; }
        public string DataFim { get; set; }
        public int Quantidade { get; set; }
    }
}