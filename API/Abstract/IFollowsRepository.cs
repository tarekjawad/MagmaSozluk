using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Abstract
{
    public interface IFollowsRepository
    {
        Task<UserFollow> GetUserFollow(int sourceUserId, int followedUserId);
        Task<AppUser> GetUsersWithFollows(int userId);
        Task<PagedList<FollowDto>> GetUserFollows(FollowsParams followsParams);


    }
}