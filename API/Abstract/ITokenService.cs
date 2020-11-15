using API.Entities;

namespace API.Abstract
{
    public interface ITokenService
    {
         string CreateToken(AppUser user);
    }
}