using System.Threading.Tasks;

namespace API.Abstract
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        IFollowsRepository FollowsRepository { get; }
        IEducationRespository EducationRespository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}