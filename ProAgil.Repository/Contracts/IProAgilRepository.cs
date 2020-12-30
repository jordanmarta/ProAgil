using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository.Contracts
{
    public interface IProAgilRepository
    {
        //GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveChangesAsync();

         //EVENTOS
         Task<Evento[]> GetAllEventosAsync(bool includePalestrantes);
         Task<Evento[]> GetEventosAsyncByTema(string tema, bool includePalestrantes);
         Task<Evento> GetEventoAsyncById(int eventoId, bool includePalestrantes);

         //PALESTRANTES
         Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);         
         Task<Palestrante[]> GetPalestrantesAsyncByName(string nome, bool includeEventos);
         Task<Palestrante> GetPalestranteAsyncById(int palestranteId, bool includeEventos);
    }
}