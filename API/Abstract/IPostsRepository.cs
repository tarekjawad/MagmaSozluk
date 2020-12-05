using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Abstract
{
    public interface IPostsRepository
    {
        Task<PagedList<UserPost>> GetPostsAsync(PostParams postParams);
        Task<UserPost> GetPostByIdAsync(int id);
        Task<PagedList<UserPost>> GetUserPostsAsync(UserParams userParams);
        void Update(UserPost post);
        void Add(UserPost post);
    }
}