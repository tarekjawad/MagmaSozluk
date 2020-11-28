using System.Threading.Tasks;
using API.Entities;

namespace API.Abstract
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);

    }
}